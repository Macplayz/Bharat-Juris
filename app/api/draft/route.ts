import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { type, partyA, partyB, startDate, amount, terms } = await req.json();

    // Construct a specific legal prompt based on the user's input
    const systemPrompt = `
      You are a Senior Advocate at the Supreme Court of India.
      Draft a professional, legally binding ${type} under Indian Law (Bharatiya Nyaya Sanhita/Contract Act).
      
      Details:
      - Party A (Landlord/Employer/First Party): ${partyA}
      - Party B (Tenant/Employee/Second Party): ${partyB}
      - Effective Date: ${startDate}
      - Financial Consideration (Rent/Salary): ₹${amount}
      - Specific Terms: ${terms || "Standard legal clauses apply."}

      Output Requirements:
      1. Use clear, formal legal language.
      2. Include standard clauses for Indemnity, Termination, and Dispute Resolution (Arbitration in India).
      3. Format with Markdown (Bold headings, bullet points).
      4. DO NOT include placeholders like "[Insert Date]"—use the data provided.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Draft the agreement now." }
      ],
      // Use the powerful text model for complex writing
      model: "llama-3.3-70b-versatile",
      temperature: 0.3, 
    });

    const content = completion.choices[0]?.message?.content;
    
    return NextResponse.json({ draft: content });

  } catch (error: any) {
    console.error("DRAFTING ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}