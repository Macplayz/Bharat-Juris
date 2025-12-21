import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import pdf from "pdf-parse"; // Import PDF parser

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Server Error: Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    let model = "meta-llama/llama-4-scout-17b-16e-instruct"; // Default Vision Model
    let userContent: any[] = [];

    // --- CASE A: PDF DOCUMENT (Text Extraction) ---
    if (file.type === 'application/pdf') {
      
      // 1. Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 2. Extract Text from PDF
      try {
        const pdfData = await pdf(buffer);
        const extractedText = pdfData.text.trim();

        // Check if PDF is a scan (empty text)
        if (extractedText.length < 50) {
          return NextResponse.json(
            { error: "This PDF appears to be a scanned image (no selectable text). Please convert it to an Image (JPG/PNG) and upload again." },
            { status: 400 }
          );
        }

        // 3. Switch to a Powerful Text Model
        model = "llama-3.3-70b-versatile";
        
        // 4. Prepare Text Content
        userContent = [
          {
            type: "text",
            text: `DOCUMENT CONTENT:\n${extractedText.slice(0, 30000)}... [Truncated if too long]` 
          }
        ];

      } catch (e) {
        return NextResponse.json({ error: "Failed to parse PDF text." }, { status: 400 });
      }

    } 
    // --- CASE B: IMAGE (Vision Analysis) ---
    else if (file.type.startsWith('image/')) {
      
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

      // Keep Vision Model (Llama 4 Scout)
      userContent = [
        { 
          type: "image_url", 
          image_url: { url: base64Image } 
        }
      ];

    } else {
      return NextResponse.json({ error: "Unsupported file type. Please upload PDF, JPG, or PNG." }, { status: 400 });
    }


    // --- SHARED PROMPT (Used for both Text and Vision) ---
    const systemPrompt = `
      You are an elite Legal Summarizer.
      Identify the core legal intent and return ONLY this JSON structure:
      {
        "title": "A short 3-5 word title (e.g., 'Rental Agreement Renewal')",
        "summaryPoints": [
          { 
            "label": "Document Type", 
            "text": "What is this legally? (e.g., Court Summons / Affidavit / Contract)", 
            "iconType": "file" 
          },
          { 
            "label": "Key Dates & Urgency", 
            "text": "Extract specific deadlines or dates. If none, state 'No immediate deadline'.", 
            "iconType": "clock" 
          },
          { 
            "label": "Action Required", 
            "text": "What must the user do next? (e.g., 'Sign and return' or 'Appear in court').", 
            "iconType": "action" 
          }
        ]
      }
    `;

    // 3. CALL GROQ API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userContent
        },
      ],
      model: model,
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("AI returned empty response");

    return NextResponse.json(JSON.parse(content));

  } catch (error: any) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}