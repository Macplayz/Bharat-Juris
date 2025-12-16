import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const language = formData.get("language") as string || "en";

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
    }

    // 1. Send Audio to Groq Whisper (State-of-the-art model)
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3", // The most accurate model available
      language: language, // 'hi' for Hindi, 'mr' for Marathi, etc.
      response_format: "json",
    });

    return new Response(JSON.stringify({ text: transcription.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Transcription Error:", error);
    return new Response(JSON.stringify({ error: "Transcription failed" }), { status: 500 });
  }
}