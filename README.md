# Bharat Juris

> **Project Status: [COMPLETED / ARCHIVED]** > *This project has reached the end of its development lifecycle. It was built to democratize access to Indian legal information using AI featuring a multilingual legal assistant, an automated document drafter, and a vision-based notice analyzer and successfully achieved its architectural goals. I am no longer actively maintaining or updating this repository.*

---

(Leave the rest of your README below this line as a showcase of what the app does)


# Bharat Juris

**Bharat Juris** is a next-generation AI legal assistant designed to bridge the gap between complex Indian laws and the common citizen. Built with **Next.js** and **Llama-3 (via Groq)**, it acts as a virtual legal companion that democratizes access to justice.

Legal literacy in India is low, and professional legal advice is expensive. Bharat Juris solves this by providing instant, accurate, and simplified explanations of the **Constitution of India**, **Bharatiya Nyaya Sanhita (BNS)**, and the **Indian Penal Code (IPC)**. Whether you are a law student, a citizen seeking rights awareness, or someone confused by legal jargon, Bharat Juris is here to help.

## Features
1) Nyaya Sahayak (AI Legal Consultant)
A high-speed AI legal assistant trained on the Bharatiya Nyaya Sanhita (BNS) and IPC.
Contextual Understanding: Interprets colloquial queries like "Someone is building a wall in my land" and maps them to specific legal sections.
Multilingual Support: Asks and answers in Hindi, Marathi, English, and more.

2) Document Analyzer
Upload complex court notices or legal letters.
Simplification: Breaks down legalese into plain English.
Action Items: Tells you exactly what to do next and if the matter is urgent.

3) Instant Legal Drafter
Create legally binding documents without a lawyer.
Templates: Rent Agreements, Affidavits, and Notices.
Customizable: Fills in your details automatically.

## Why Bharat Juris? (Beyond Standard RAG)

Unlike typical **RAG (Retrieval-Augmented Generation)** chatbots that simply fetch and stitch database snippets, Bharat Juris utilizes a **Multi-Model Inference Engine** powered by **Groq**.

| Feature | Standard RAG Chatbot | Bharat Juris (Groq Inference) |
| :--- | :--- | :--- |
| **Speed** | High Latency (Search + Retrieve + Generate) | **Zero Latency** (Direct LPU Inference) |
| **Response Quality** | "Stitches" random paragraphs together | **Synthesizes** legal intent like a human expert |
| **Context** | Struggles with vague queries | Understands **situational context** & nuance |
| **Reliability** | Prone to retrieval errors | **Contextually Fluent** & consistent |

## Technology Stack

- **Framework:** NextJs
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide React
- **AI Inference:** Groq
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- A Groq API Key

### Installation

1. **Clone the repository**
 ```bash
 git clone [https://github.com/Macplayz/Bharat-Juris.git](https://github.com/Macplayz/Bharat-Juris.git)
 cd Bharat-Juris
  ```
2. **Install dependencies**

```Bash
npm install
Set up Environment Variables Create a .env.local file in the root directory:
```

3. Get Your Groq Api
```Bash
GROQ_API_KEY=your_groq_api_key_here
```
Run the development server
```Bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.

## Contributing
**Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.**

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

## Contact
**Neelay Machha**

Twitter: @PlayzMac

GitHub: Macplayz

Email: machhanilay@gmail.com

<p align="center"> Made with ❤️ in India 🇮🇳  </p>
  
