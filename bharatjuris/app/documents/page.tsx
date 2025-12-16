"use client";

import React, { useState, useRef } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  Activity,
  Shield,
  ScanEye,
  X,
  Play,
  ImageIcon // Changed icon to represent Image
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentAnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return <FileText className="w-5 h-5 text-blue-400" />;
      case 'clock': return <Clock className="w-5 h-5 text-red-400" />;
      case 'action': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      default: return <Activity className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'file': return "border-blue-500/20 bg-blue-500/10";
      case 'clock': return "border-red-500/20 bg-red-500/10";
      case 'action': return "border-emerald-500/20 bg-emerald-500/10";
      default: return "border-gray-500/20 bg-gray-500/10";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server Error: ${response.status}`);
      }

      setResult(data);
    } catch (error: any) {
      console.error(error);
      alert(`Analysis Failed: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="h-16 border-b border-[#1f1f1f] flex items-center px-6 md:px-12 justify-between bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
           <Link href="/" className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
           </Link>
           <div className="flex items-center gap-3">
              <ScanEye className="w-5 h-5 text-blue-500" />
              <h1 className="font-bold text-white text-lg tracking-wide">Document Analyzer</h1>
           </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Vision System Online</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-3xl relative z-10">
            
            {/* STATE 1: UPLOAD BOX */}
            {!selectedFile && !result && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent pb-2">
                    Visual Legal Analysis.
                  </h2>
                  <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                    Upload a <strong>photo or screenshot</strong> of any legal notice. Our AI vision system will extract the key details instantly.
                  </p>
                </div>

                {/* INPUT RESTRICTED TO IMAGES ONLY */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/png, image/jpeg, image/jpg" 
                  className="hidden" 
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative border border-dashed border-[#333] bg-[#0a0a0a] hover:border-blue-500/50 hover:bg-[#111] rounded-3xl p-12 md:p-20 text-center cursor-pointer transition-all duration-300 shadow-2xl"
                >
                   <div className="w-20 h-20 bg-[#151515] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-300 border border-[#222] group-hover:border-blue-500/30">
                     <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-400" />
                   </div>
                   <h3 className="text-xl font-semibold text-white">Upload Image or Screenshot</h3>
                   <p className="text-sm text-gray-500 mt-2">JPG, PNG (Max 4MB)</p>
                </div>

                <div className="flex justify-center gap-8 text-xs text-gray-600 font-mono uppercase tracking-widest opacity-70">
                  <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> Secure Analysis</span>
                  <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> Vision AI Active</span>
                </div>
              </div>
            )}

            {/* STATE 2: PREVIEW */}
            {selectedFile && !result && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
                 <div className="bg-[#111] border border-[#333] p-8 rounded-3xl text-center space-y-6 shadow-2xl">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto">
                      {/* Show preview of the actual image if possible, or just the icon */}
                      <ImageIcon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedFile.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Ready for Vision Analysis</p>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={clearSelection}
                        className="flex-1 border-[#333] bg-transparent text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                      >
                        Cancel
                      </Button>
                      
                      <Button 
                        onClick={handleStartAnalysis} 
                        disabled={isAnalyzing}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                             <Activity className="w-5 h-5 animate-spin" /> Scanning...
                          </>
                        ) : (
                          <>
                             <Play className="w-5 h-5 fill-current" /> Analyze Image
                          </>
                        )}
                      </Button>
                    </div>
                 </div>
              </div>
            )}

            {/* STATE 3: RESULTS */}
            {result && (
              <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
                 <div className="flex items-center justify-between bg-[#111] border border-[#333] p-4 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-white">{result.title || "Image Analysis Complete"}</p>
                        <p className="text-xs text-gray-500">Insights Generated</p>
                      </div>
                    </div>
                    <Button variant="ghost" onClick={clearSelection} className="text-gray-400 hover:text-white hover:bg-[#222]">
                      <X className="w-4 h-4 mr-2" /> Close
                    </Button>
                 </div>

                 <div className="grid gap-4">
                   {result.summaryPoints?.map((point: any, idx: number) => (
                     <div key={idx} className={`p-6 rounded-2xl border ${getColor(point.iconType)} bg-opacity-5 backdrop-blur-xl flex items-start gap-5 transition-transform hover:scale-[1.01]`}>
                       <div className="mt-1 p-2 bg-black/40 rounded-full border border-white/5">
                         {getIcon(point.iconType)}
                       </div>
                       <div>
                         <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">{point.label}</h4>
                         <p className="text-xl text-white font-medium leading-relaxed">{point.text}</p>
                       </div>
                     </div>
                   ))}
                 </div>
                 
                 <Button onClick={clearSelection} className="w-full bg-[#1a1a1a] hover:bg-[#222] text-gray-300 py-6 rounded-xl mt-4">
                   Scan Another Image
                 </Button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}