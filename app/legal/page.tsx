"use client";

import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, Scale, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12 selection:bg-gray-700/30">
      
      {/* Header with "Go Back to Menu" */}
      <div className="max-w-4xl mx-auto mb-10">
        <Link href="/">
           <Button variant="ghost" className="text-gray-500 hover:text-white hover:bg-gray-800 pl-0 gap-2 transition-all">
              <ArrowLeft className="w-4 h-4" /> Go Back to Menu
           </Button>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 text-white tracking-tight">Legal Disclaimers & Terms</h1>
        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-medium">Last updated: December 2025</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 1. AI Disclaimer */}
        <section className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl hover:border-[#333] transition-colors">
            <div className="flex items-start gap-5">
                {/* GREY ICON */}
                <div className="p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <AlertTriangle className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">AI Legal Disclaimer</h2>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        <strong>Nyaya Sahayak</strong> and <strong>Bharat Juris</strong> are Artificial Intelligence systems designed for informational and educational purposes only. 
                        <br/><br/>
                        The information provided by this platform <strong>does not constitute official legal advice</strong>, nor does it create an attorney-client relationship. While we strive to align with the <em>Bharatiya Nyaya Sanhita (BNS)</em> and Indian Constitution, AI models can make errors. Always consult a qualified Advocate for serious legal matters.
                    </p>
                </div>
            </div>
        </section>

        {/* 2. Privacy Policy */}
        <section className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl hover:border-[#333] transition-colors">
            <div className="flex items-start gap-5">
                {/* GREY ICON */}
                <div className="p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Privacy & Data Policy</h2>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        We prioritize your privacy. Bharat Juris operates in a <strong>"Guest Mode"</strong> environment by default.
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-500 space-y-2 text-sm">
                        <li>We do not permanently store your voice recordings.</li>
                        <li>Document uploads are processed in real-time and are not retained on our servers.</li>
                        <li>Chat history is stored locally in your browser and cleared upon refresh unless downloaded.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* 3. Terms of Use */}
        <section className="bg-[#0a0a0a] border border-[#222] p-8 rounded-2xl hover:border-[#333] transition-colors">
            <div className="flex items-start gap-5">
                {/* GREY ICON */}
                <div className="p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                    <Scale className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-3">Terms of Service</h2>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                        By using Bharat Juris, you agree to:
                    </p>
                    <ul className="list-disc list-inside mt-4 text-gray-500 space-y-2 text-sm">
                        <li>Verify all AI-generated drafts (Rent Agreements, Affidavits) with a legal professional.</li>
                        <li>Not use this platform for any illegal activities or to generate fraudulent documents.</li>
                        <li>Accept that Bharat Juris is not liable for any outcomes resulting from generated content.</li>
                    </ul>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}