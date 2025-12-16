"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, 
  PenTool, 
  Home, 
  ChevronRight, 
  CheckCircle, 
  Download,
  FileText,
  Sparkles
} from "lucide-react";

export default function DocumentDrafterPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({ landlord: '', tenant: '', rent: '' });

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate Drafting Process
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      
      {/* --- HEADER --- */}
      <header className="h-16 border-b border-[#1f1f1f] flex items-center px-6 md:px-12 justify-between bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
           <Link href="/" className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
           </Link>
           <div className="flex items-center gap-3">
              <PenTool className="w-5 h-5 text-emerald-500" />
              <h1 className="font-bold text-white text-lg tracking-wide">Legal Drafter</h1>
           </div>
        </div>
        
        {/* Status Badge - Matching Analyzer Style */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">Template Engine</span>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        
        {/* Background Ambient Glow (Emerald) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-4xl relative z-10">
            
            {/* STEP 1: SELECT TEMPLATE */}
            {step === 1 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="text-center space-y-4">
                        {/* HERO TEXT: Emerald Gradient */}
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent pb-2">
                           Smart Document Creation.
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                            Select a verified legal template to generate a binding document in seconds.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        {/* Active Template Card */}
                        <div 
                           onClick={() => setStep(2)}
                           className="group p-8 bg-[#0a0a0a] border border-[#333] hover:border-emerald-500/50 hover:bg-[#111] rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4 shadow-2xl"
                        >
                            <div className="p-5 bg-[#151515] rounded-2xl text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 border border-[#222] group-hover:border-emerald-500/30">
                                <Home className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Rent Agreement</h3>
                                <p className="text-sm text-gray-500 mt-2">Standard 11-month format.</p>
                            </div>
                        </div>
                        
                        {/* Disabled Template Card */}
                        <div className="p-8 bg-[#0a0a0a] border border-[#333] rounded-3xl opacity-40 cursor-not-allowed flex flex-col items-center text-center gap-4">
                            <div className="p-5 bg-[#151515] rounded-2xl text-gray-500">
                                <FileText className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-400">Affidavit</h3>
                                <p className="text-sm text-gray-600 mt-2">Coming soon.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 2: FORM INPUTS */}
            {step === 2 && (
                <div className="max-w-2xl mx-auto animate-in slide-in-from-right-8 duration-500">
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                        <button onClick={() => setStep(1)} className="hover:text-emerald-400 transition">Templates</button>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">Rent Agreement</span>
                    </div>

                    <div className="bg-[#0a0a0a] border border-[#333] p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        {/* Decorative Top Gradient Border */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                        
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                           <Sparkles className="w-6 h-6 text-emerald-500" /> Fill Details
                        </h2>
                        
                        <div className="space-y-5">
                            <div className="group">
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block group-focus-within:text-emerald-500 transition-colors">Landlord Name</label>
                                <input 
                                    className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-700"
                                    placeholder="Ex: Ramesh Patil"
                                    autoFocus
                                    onChange={(e) => setFormData({...formData, landlord: e.target.value})}
                                />
                            </div>
                            <div className="group">
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block group-focus-within:text-emerald-500 transition-colors">Tenant Name</label>
                                <input 
                                    className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-700"
                                    placeholder="Ex: Suresh Kumar"
                                    onChange={(e) => setFormData({...formData, tenant: e.target.value})}
                                />
                            </div>
                            <div className="group">
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block group-focus-within:text-emerald-500 transition-colors">Monthly Rent (₹)</label>
                                <input 
                                    type="number"
                                    className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-gray-700"
                                    placeholder="15000"
                                    onChange={(e) => setFormData({...formData, rent: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? "Drafting Document..." : "Generate Draft PDF"}
                            {!isGenerating && <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: DOWNLOAD */}
            {step === 3 && (
                <div className="text-center animate-in zoom-in-95 duration-500">
                    <div className="w-28 h-28 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <CheckCircle className="w-14 h-14 text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4">Document Ready!</h2>
                    <p className="text-gray-400 mb-10 text-lg">Your <span className="text-white font-medium">Rent Agreement</span> has been professionally formatted.</p>
                    
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 mx-auto transition-all hover:scale-105 shadow-xl shadow-emerald-600/20">
                        <Download className="w-5 h-5" /> Download PDF
                    </button>

                    <button onClick={() => setStep(1)} className="mt-12 text-sm text-gray-500 hover:text-white transition-colors underline decoration-gray-800 underline-offset-4">
                        Draft Another Document
                    </button>
                </div>
            )}

        </div>
      </main>
    </div>
  );
}