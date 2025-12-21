import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { type, partyA, partyB, startDate, amount, terms, state } = await req.json();

    // 1. STATE-SPECIFIC LEGAL CONTEXT LOGIC
    let applicableLaw = "Indian Contract Act, 1872 & Transfer of Property Act, 1882";
    let jurisdiction = "India (Central Acts)";

    // Define Rules for Specific States
    switch (state) {
        case "Maharashtra":
            applicableLaw = "Maharashtra Rent Control Act, 1999 & Maharashtra Stamp Act";
            jurisdiction = "Maharashtra Courts";
            break;
        case "Gujarat":
            applicableLaw = "Gujarat Rents, Hotel and Lodging House Rates Control Act, 1947";
            jurisdiction = "Gujarat Courts";
            break;
        case "Delhi":
            applicableLaw = "Delhi Rent Control Act, 1958";
            jurisdiction = "Delhi Courts";
            break;
        case "Karnataka":
            applicableLaw = "Karnataka Rent Control Act, 2001";
            jurisdiction = "Karnataka Courts";
            break;
        case "Tamil Nadu":
            applicableLaw = "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017";
            jurisdiction = "Tamil Nadu Courts";
            break;
        case "Telangana":
            applicableLaw = "Telangana Buildings (Lease, Rent and Eviction) Control Act, 1960";
            jurisdiction = "Telangana Courts";
            break;
        case "Kerala":
            applicableLaw = "Kerala Buildings (Lease and Rent Control) Act, 1965";
            jurisdiction = "Kerala Courts";
            break;
        default:
            // Fallback for general South India or unspecified states
            applicableLaw = "Transfer of Property Act, 1882 (Central Act)";
            jurisdiction = `${state || "India"} Courts`;
            break;
    }

    // 2. CONSTRUCT PRECISE SYSTEM PROMPT
    const systemPrompt = `
      You are a Senior Advocate at the High Court of ${state || "India"}.
      Draft a professional, legally binding ${type}.
      
      JURISDICTION & LAWS:
      - State: ${state}
      - Governing Laws: ${applicableLaw}
      - Jurisdiction for Disputes: ${jurisdiction}

      DETAILS:
      - Party A (Landlord/Owner/Deponent): ${partyA}
      - Party B (Tenant/Lessee/Second Party): ${partyB}
      - Effective Date: ${startDate}
      - Financial Consideration: ₹${amount}
      - Specific Terms: ${terms || "Standard protection clauses."}

      OUTPUT REQUIREMENTS:
      1. Start directly with the title (e.g., "RENT AGREEMENT").
      2. Include a "Governing Law" clause specifically mentioning "${applicableLaw}".
      3. Use formal legal language suitable for ${state}.
      4. Format with Markdown (Bold headings, bullet points).
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Draft the legal document now." }
      ],
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