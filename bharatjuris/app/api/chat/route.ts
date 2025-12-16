import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { LangChainAdapter } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. Safe parsing of the request body
    const body = await req.json();
    
    // Debugging: This will show you exactly what the frontend is sending in your terminal
    console.log("Incoming Request Body:", body);

    // Extract messages, defaulting to an empty array if missing to prevent the crash
    const messages = Array.isArray(body.messages) ? body.messages : [];

    // 2. Initialize the Groq Model
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
    });

    // 3. Define the System Prompt
    const systemPrompt = new SystemMessage(`
      You are Bharat Juris, an AI Legal Assistant strictly for Indian Law.
      
      CORE KNOWLEDGE - CONSTITUTION OF INDIA:
      1. DRAFTING COMMITTEE:
         - Chairman: Dr. B.R. Ambedkar.
         - Adoption Date: November 26, 1949.
      
      2. IMPORTANT LEGAL TERMS:
         - Preamble, Fundamental Rights (Articles 12-35), Writ Jurisdiction (Art 32/226).
         - Article 39A: Equal Justice and Free Legal Aid.

      3. LEGAL AID SYSTEM:
         - NALSA, Lok Adalat.

      GUIDELINES:
      - Citations: Quote relevant Articles/Sections.
      - Tone: Professional, empathetic, and legally accurate.
      - Disclaimer: Always remind the user you are an AI.
    `);

    // 4. Convert raw frontend messages to LangChain Message Objects
    // This step is crucial. The frontend sends plain JSON objects, but LangChain 
    // works best when we explicitly convert them to HumanMessage or AIMessage.
    const conversationHistory = messages.map((m: any) => {
      if (m.role === 'user') {
        return new HumanMessage(m.content);
      } else if (m.role === 'assistant') {
        return new AIMessage(m.content);
      } else {
        // Fallback for system or other roles from frontend
        return new HumanMessage(m.content);
      }
    });

    // 5. Combine System Prompt with the converted History
    // Now both parts are valid arrays of LangChain objects
    const formattedMessages = [systemPrompt, ...conversationHistory];

    // 6. Stream the response
    const stream = await model.stream(formattedMessages);

    // 7. Return the stream
    return LangChainAdapter.toDataStreamResponse(stream);

  } catch (error) {
    console.error("Error in Chat Route:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}