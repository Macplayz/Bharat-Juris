require('dotenv').config({ path: '.env' }); // Explicitly look for .env
// If you use .env.local, change the line above to: require('dotenv').config({ path: '.env.local' });

const { Pinecone } = require('@pinecone-database/pinecone');
const { PineconeStore } = require('@langchain/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');

const seed = async () => {
  // 1. Safety Check: Are keys loaded?
  if (!process.env.GOOGLE_API_KEY) {
    console.error("❌ ERROR: GOOGLE_API_KEY is missing. Code cannot generate embeddings.");
    console.error("👉 Tip: If your file is named '.env.local', change line 1 to: require('dotenv').config({ path: '.env.local' });");
    process.exit(1);
  }
  if (!process.env.PINECONE_API_KEY) {
    console.error("❌ ERROR: PINECONE_API_KEY is missing.");
    process.exit(1);
  }

  console.log("1. Connecting to Pinecone...");
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX); // Make sure this is 'bhart-juris' or 'bharat-juris' (check your .env)

  // 2. Test Google API Generation explicitly
  console.log("2. Testing Google Embedding Generation...");
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "text-embedding-004" // ✅ Updated to newer, more stable model
  });

  try {
    const testVector = await embeddings.embedQuery("Hello World");
    console.log(`   ✅ Google API works! Generated vector length: ${testVector.length}`);
    if (testVector.length !== 768) {
        console.error(`   ❌ CRITICAL MISMATCH: Google generated ${testVector.length} dimensions, but Pinecone expects 768.`);
        process.exit(1);
    }
  } catch (error) {
    console.error("   ❌ Google API Failed. Your API Key might be invalid or quota exceeded.");
    console.error("   Error details:", error.message);
    process.exit(1);
  }

  // 3. Define Data
  const docs = [
    { 
      pageContent: "Section 302 of the Indian Penal Code (IPC) states that whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.", 
      metadata: { section: "302", topic: "Murder" } 
    },
    { 
      pageContent: "Section 420 of the IPC deals with Cheating and dishonestly inducing delivery of property. The punishment can extend to 7 years imprisonment.", 
      metadata: { section: "420", topic: "Cheating" } 
    },
    {
      pageContent: "Section 378 defines Theft. Whoever, intending to take dishonestly any movable property out of the possession of any person without that person's consent, moves that property in order to such taking, is said to commit theft.",
      metadata: { section: "378", topic: "Theft" }
    }
  ];

  console.log("3. Uploading Laws to Pinecone...");
  
  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  console.log("✅ Success! Database seeded.");
};

seed().catch((err) => {
  console.error("❌ Script Failed:", err);
});