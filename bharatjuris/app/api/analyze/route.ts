import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Server Error: Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    // 1. Strict Image Check
    if (file.type === 'application/pdf') {
      return NextResponse.json(
        { error: "This AI model supports Images only. Please upload a Screenshot (JPG/PNG)." }, 
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 2. Call Groq (UPDATED: Llama 4 Scout)
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this legal document image. Return valid JSON with: title, summaryPoints (label, text, iconType)." },
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
      // NEW ACTIVE MODEL for 2025
      model: "meta-llama/llama-4-scout-17b-16e-instruct", 
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