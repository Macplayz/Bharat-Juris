"use client";

import React, { useState } from 'react';
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, 
  PenTool, 
  Home, 
  ChevronRight, 
  CheckCircle, 
  Copy,
  Sparkles, 
  Printer,       
  Shield,        
  Scale,         
  AlertTriangle,
  FileText,
  MapPin // New Icon for State
} from "lucide-react";

export default function DocumentDrafterPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState("");
  
  // Form State
  const [docType, setDocType] = useState('Rent Agreement');
  const [formData, setFormData] = useState({ 
    partyA: '', 
    partyB: '', 
    financial: '', 
    startDate: new Date().toISOString().split('T')[0],
    purpose: '',
    state: '' // NEW STATE FIELD
  });

  const getLabels = () => {
    switch(docType) {
      case 'Rent Agreement':
        return { A: 'Landlord Name', B: 'Tenant Name', Money: 'Monthly Rent (₹)', ShowMoney: true, ShowB: true };
      case 'Affidavit':
        return { A: 'Deponent Name', B: '', Money: '', ShowMoney: false, ShowB: false };
      case 'NDA':
        return { A: 'Disclosing Party', B: 'Receiving Party', Money: '', ShowMoney: false, ShowB: true };
      default:
        return { A: 'Party A', B: 'Party B', Money: 'Amount', ShowMoney: true, ShowB: true };
    }
  };

  const labels = getLabels();

  const handleGenerate = async () => {
    if (!formData.state) {
        alert("Please select a State/Jurisdiction.");
        return;
    }

    setIsGenerating(true);
    setGeneratedDraft(""); 

    try {
      const payload = {
        type: docType,
        partyA: formData.partyA,
        partyB: formData.partyB || "N/A", 
        amount: formData.financial || "0",
        startDate: formData.startDate,
        state: formData.state, // Send State to API
        terms: docType === 'Affidavit' 
          ? `Statement of Truth: ${formData.purpose}` 
          : "Standard legal protection clauses apply."
      };

      const res = await fetch("/api/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Drafting failed");

      // --- CLEANUP LOGIC ---
      let cleanDraft = data.draft;
      cleanDraft = cleanDraft.replace(/^(Here is|This is|Below is).+(:|\n)/i, '');
      cleanDraft = cleanDraft.replace(/^#+ .+/gm, ''); 
      cleanDraft = cleanDraft.replace(/^\*\*[\w\s]+\*\*/gm, '');
      cleanDraft = cleanDraft.replace(/^[A-Z ]{5,}(\n|$)/gm, '');
      cleanDraft = cleanDraft.replace(/^[=\-_]{3,}/gm, '');

      setGeneratedDraft(cleanDraft.trim());
      setStep(3);

    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDraft);
    alert("Contract text copied!");
  };

  const handleDownloadWord = () => {
    const content = document.getElementById('legal-document');
    if (!content) return;

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${docType}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; color: #000000; }
        h1 { text-align: center; text-transform: uppercase; text-decoration: underline; font-size: 16pt; margin-bottom: 20px; font-weight: bold; }
        h2 { font-size: 14pt; text-transform: uppercase; margin-top: 20px; font-weight: bold; }
        p { text-align: justify; line-height: 150%; margin-bottom: 15px; }
        li { margin-bottom: 10px; }
      </style>
      </head><body>
    `;
    const footer = "</body></html>";
    const sourceHTML = header + content.innerHTML + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${docType.replace(/\s+/g, '_')}_${formData.state}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="h-16 border-b border-[#1f1f1f] flex items-center px-6 md:px-12 justify-between bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10 ui-controls">
        <div className="flex items-center gap-4">
           <Link href="/" className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
           </Link>
           <div className="flex items-center gap-3">
              <PenTool className="w-5 h-5 text-blue-500" />
              <h1 className="font-bold text-white text-lg tracking-wide">Professional Legal Drafter</h1>
           </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Multi-State Engine</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden ui-controls">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none glow-effect" />

        <div className="w-full max-w-5xl relative z-10">
            
            {/* STEP 1: SELECT TEMPLATE */}
            {step === 1 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent pb-2">
                           Draft Local. Legal. Instant.
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                            Select a template. We automatically apply the specific State Laws (e.g., Maharashtra Rent Control Act) based on your location.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        {[
                          { id: 'Rent Agreement', icon: Home, desc: 'State-Specific Rent Laws' },
                          { id: 'Affidavit', icon: Scale, desc: 'Court Admissible' },
                          { id: 'NDA', icon: Shield, desc: 'Corporate Protection' }
                        ].map((item) => (
                           <div 
                             key={item.id}
                             onClick={() => { setDocType(item.id); setStep(2); }}
                             className="group p-6 bg-[#0a0a0a] border border-[#333] hover:border-blue-500/50 hover:bg-[#111] rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4 shadow-xl"
                          >
                              <div className="p-4 bg-[#151515] rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all border border-[#222] group-hover:border-blue-500/30">
                                  <item.icon className="w-8 h-8" />
                              </div>
                              <div>
                                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{item.id}</h3>
                                  <p className="text-xs text-gray-500 mt-2">{item.desc}</p>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 2: FORM */}
            {step === 2 && (
                <div className="max-w-2xl mx-auto animate-in slide-in-from-right-8 duration-500">
                    <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                        <button onClick={() => setStep(1)} className="hover:text-blue-400 transition">Templates</button>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white font-medium">{docType}</span>
                    </div>

                    <div className="bg-[#0a0a0a] border border-[#333] p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                           <Sparkles className="w-6 h-6 text-blue-500" /> Enter Details
                        </h2>
                        
                        <div className="space-y-5">
                            {/* --- NEW: STATE SELECTION DROPDOWN --- */}
                            <div className="group">
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> State / Jurisdiction
                                </label>
                                <select 
                                    className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:border-blue-500 outline-none appearance-none"
                                    value={formData.state}
                                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                                >
                                    <option value="" disabled>Select State</option>
                                    <option value="Maharashtra">Maharashtra (MH)</option>
                                    <option value="Delhi">Delhi (DL)</option>
                                    <option value="Gujarat">Gujarat (GJ)</option>
                                    <option value="Karnataka">Karnataka (KA)</option>
                                    <option value="Tamil Nadu">Tamil Nadu (TN)</option>
                                    <option value="Telangana">Telangana (TS)</option>
                                    <option value="Kerala">Kerala (KL)</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh (AP)</option>
                                    <option value="Other">Other (Central Acts)</option>
                                </select>
                            </div>

                            <div className="group">
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block">{labels.A}</label>
                                <input 
                                    className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:border-blue-500 outline-none"
                                    placeholder="Enter Full Name"
                                    value={formData.partyA}
                                    onChange={(e) => setFormData({...formData, partyA: e.target.value})}
                                />
                            </div>

                            {labels.ShowB && (
                              <div className="group">
                                  <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block">{labels.B}</label>
                                  <input 
                                      className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:border-blue-500 outline-none"
                                      placeholder="Enter Full Name"
                                      value={formData.partyB}
                                      onChange={(e) => setFormData({...formData, partyB: e.target.value})}
                                  />
                              </div>
                            )}

                            {docType === 'Affidavit' && (
                                <div className="group">
                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block">Statement</label>
                                    <textarea 
                                        className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:border-blue-500 outline-none min-h-[100px]"
                                        placeholder="I declare that..."
                                        value={formData.purpose}
                                        onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {labels.ShowMoney && (
                                  <div className="group">
                                      <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block">{labels.Money}</label>
                                      <input 
                                          type="number"
                                          className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-white focus:border-blue-500 outline-none"
                                          placeholder="15000"
                                          value={formData.financial}
                                          onChange={(e) => setFormData({...formData, financial: e.target.value})}
                                      />
                                  </div>
                                )}
                                <div className="group w-full">
                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-bold ml-1 mb-1 block">Date</label>
                                    <input 
                                        type="date"
                                        className="w-full bg-[#111] border border-[#333] rounded-xl p-4 text-gray-300 focus:border-blue-500 outline-none"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating || !formData.partyA || !formData.state}
                            className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? "AI is Drafting..." : `Generate ${docType}`}
                            {!isGenerating && <ChevronRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3: PREVIEW */}
            {step === 3 && (
                <div className="animate-in zoom-in-95 duration-500 flex flex-col md:flex-row gap-8 h-[calc(100vh-140px)]">
                    
                    {/* Controls Side */}
                    <div className="md:w-1/3 flex flex-col justify-center items-center text-center space-y-4 ui-controls">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <CheckCircle className="w-10 h-10 text-blue-500" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Draft Ready!</h2>
                            <p className="text-gray-400 text-sm">
                                Compliance: <span className="text-blue-400 font-bold">{formData.state} Laws</span>
                            </p>
                        </div>
                        
                        {/* Download Buttons */}
                        <div className="flex flex-col gap-3 w-full">
                           <button 
                              onClick={handleDownloadWord}
                              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                           >
                               <FileText className="w-5 h-5" /> 
                               Download Word Doc
                           </button>
                           
                           <button 
                              onClick={copyToClipboard}
                              className="w-full bg-[#1a1a1a] hover:bg-[#222] text-white font-medium py-3 px-6 rounded-xl border border-[#333] flex items-center justify-center gap-2 transition-all"
                           >
                               <Copy className="w-4 h-4" /> Copy Text
                           </button>
                        </div>

                        <div className="mt-2 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl text-left shadow-inner w-full">
                            <div className="flex items-start gap-3">
                                 <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                 <div className="space-y-1">
                                    <p className="text-xs font-bold text-yellow-500 uppercase tracking-wide">Legal Validity</p>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">
                                        This draft is based on <strong>{formData.state}</strong> laws. Print on Non-Judicial Stamp Paper of appropriate value.
                                    </p>
                                 </div>
                            </div>
                        </div>
                        <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-white underline decoration-gray-800 underline-offset-4">Create New</button>
                    </div>

                    {/* PREVIEW CONTAINER */}
                    <div className="md:w-2/3 bg-gray-800/50 p-4 rounded-xl border border-gray-700 overflow-hidden flex flex-col ui-controls-container">
                        <div className="text-xs text-gray-400 mb-2 text-center uppercase tracking-widest ui-controls">A4 Preview • {formData.state}</div>
                        
                        <div className="flex-1 overflow-y-auto bg-gray-900/50 rounded-lg p-4 shadow-inner custom-scrollbar">
                           <div 
                              id="legal-document"
                              className="bg-white text-black mx-auto shadow-2xl"
                              style={{
                                width: '210mm',
                                minHeight: '297mm',
                                padding: '25mm',
                                fontFamily: '"Times New Roman", Times, serif',
                                fontSize: '12pt',
                                lineHeight: '1.6',
                                textAlign: 'justify',
                                color: '#000000',
                                backgroundColor: '#ffffff'
                              }}
                           >
                              <h1 style={{
                                textAlign: 'center', 
                                textTransform: 'uppercase', 
                                textDecoration: 'underline', 
                                marginBottom: '2rem', 
                                fontSize: '16pt', 
                                fontWeight: 'bold', 
                                color: 'black'
                              }}>
                                {docType}
                              </h1>

                              <ReactMarkdown 
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                      h1: ({node, ...props}) => (
                                        <h2 style={{ fontSize: '14pt', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', fontWeight: 'bold', color: 'black' }} {...props} />
                                      ),
                                      h2: ({node, ...props}) => (
                                        <h2 style={{ fontSize: '14pt', marginTop: '2rem', marginBottom: '1rem', textTransform: 'uppercase', borderBottom: '1px solid #ccc', paddingBottom: '5px', fontWeight: 'bold', color: 'black' }} {...props} />
                                      ),
                                      strong: ({node, ...props}) => (
                                        <span style={{ fontWeight: 'bold', color: 'black' }} {...props} />
                                      ),
                                      p: ({node, ...props}) => (
                                        <p style={{ marginBottom: '1rem', textAlign: 'justify', color: 'black' }} {...props} /> 
                                      ),
                                      ul: ({node, ...props}) => (
                                        <ul style={{ marginBottom: '1rem', paddingLeft: '2rem', listStyleType: 'disc', color: 'black' }} {...props} />
                                      ),
                                      li: ({node, ...props}) => (
                                        <li style={{ marginBottom: '0.5rem', color: 'black' }} {...props} />
                                      )
                                  }}
                              >
                                  {generatedDraft}
                              </ReactMarkdown>
                           </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}