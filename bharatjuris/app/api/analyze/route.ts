import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // 1. CHECK FOR IMAGE TYPE
    // Groq Vision models DO NOT accept PDFs directly.
    if (file.type === 'application/pdf') {
      return NextResponse.json(
        { error: "PDFs are not supported by this Vision model. Please take a screenshot or upload a JPG/PNG." }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 2. CHECK SIZE (Max 4MB for Groq)
    if (base64Image.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image too large. Please upload an image under 4MB." }, { status: 400 });
    }

    // 3. CALL LLAMA 4 SCOUT (Vision)
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this legal document image. Return JSON with title, summaryPoints (label, text, iconType)." },
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct", 
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Groq returned empty content");

    return NextResponse.json(JSON.parse(content));

  } catch (error: any) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}