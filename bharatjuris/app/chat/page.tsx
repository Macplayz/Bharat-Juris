"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState, memo } from "react";
import Link from "next/link";
import { 
  Scale, 
  Shield, 
  Mic, 
  Send, 
  Bot, 
  User, 
  ChevronDown,
  Loader2,
  ArrowLeft
} from "lucide-react";

// --- COMPONENT: SMOOTH TEXT ANIMATION ---
// This handles the "Typewriter" effect for the AI response
const SmoothText = memo(({ content }: { content: string }) => {
  const [displayedContent, setDisplayedContent] = useState(content);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // If content resets (e.g. new chat), reset immediately
    if (content.length < displayedContent.length) {
      setDisplayedContent(content);
      return;
    }

    // If we are already caught up, stop
    if (displayedContent === content) {
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    // Calculate how far behind we are
    const diff = content.length - displayedContent.length;
    
    // Adaptive speed: If we are far behind (large chunk), type faster. 
    // If close, type slower for smoothness.
    const delay = diff > 50 ? 1 : diff > 20 ? 5 : 15;

    const timeout = setTimeout(() => {
      setDisplayedContent(content.slice(0, displayedContent.length + 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [content, displayedContent]);

  return (
    <div className="relative">
      <p className="whitespace-pre-wrap leading-relaxed">{displayedContent}</p>
      {/* Optional: Blinking Cursor while typing */}
      {isTyping && (
        <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-blue-400 animate-pulse rounded-full" />
      )}
    </div>
  );
});

SmoothText.displayName = "SmoothText";


// --- MAIN PAGE COMPONENT ---
export default function BharatJurisChat() {
  // 1. LANGUAGE CONFIGURATION
  const languages = [
    { code: 'en-IN', short: 'EN', label: 'English', prompt: 'Answer in professional English.' },
    { code: 'hi-IN', short: 'HI', label: 'Hindi', prompt: 'Answer in Hindi (Devanagari).' },
    { code: 'mr-IN', short: 'MR', label: 'Marathi', prompt: 'Answer in Marathi.' },
    { code: 'gu-IN', short: 'GU', label: 'Gujarati', prompt: 'Answer in Gujarati.' },
    { code: 'ta-IN', short: 'TA', label: 'Tamil', prompt: 'Answer in Tamil.' },
    { code: 'te-IN', short: 'TE', label: 'Telugu', prompt: 'Answer in Telugu.' },
  ];
  
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. CORE AI HOOK
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    body: { languagePrompt: selectedLang.prompt },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Namaste. I am Nyaya Sahayak. I can answer questions about the Bharatiya Nyaya Sanhita (BNS) or help you understand legal notices. How can I assist you today?"
      }
    ]
  });

  // 3. STATE FOR VOICE
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]); // Scroll on new messages or loading state

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang.code;
    recognition.interimResults = false;
    
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? " " : "") + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 border-r border-[#1f1f1f] flex flex-col bg-[#0a0a0a] hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <Scale className="w-7 h-7 text-white" />
          <span className="font-bold text-xl tracking-wide">BharatJuris</span>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center p-8 opacity-80">
            <Shield className="w-12 h-12 text-gray-600 mb-4 opacity-50" />
            <p className="text-sm text-gray-500 font-medium text-center">Conversations are private and secure.</p>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col relative bg-[#050505]">
        
        {/* Header */}
        <header className="h-16 border-b border-[#1f1f1f] flex items-center px-6 justify-between bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
             {/* BACK BUTTON */}
             <Link href="/" className="p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
             </Link>

             <div>
                <h1 className="font-bold text-white text-lg leading-tight">Nyaya Sahayak</h1>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Online • AI Legal Assistant</span>
                </div>
             </div>
          </div>

          {/* LANGUAGE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
             <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#333] bg-[#111] hover:border-gray-600 transition-all text-sm group"
             >
                <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-[10px] font-bold rounded text-white">
                    {selectedLang.short}
                </span>
                <span className="text-gray-200">{selectedLang.label}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
             </button>
             
             {isDropdownOpen && (
                 <div className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-[#333] rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                            setSelectedLang(lang);
                            setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-[#222] transition-colors flex items-center gap-3 ${
                          selectedLang.code === lang.code ? 'bg-[#1a1a1a]' : ''
                        }`}
                      >
                        <span className={`flex items-center justify-center w-6 h-6 text-[10px] font-bold rounded-full ${
                            selectedLang.code === lang.code 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-[#333] text-gray-400'
                        }`}>
                            {lang.short}
                        </span>
                        <span className={selectedLang.code === lang.code ? 'text-white font-medium' : 'text-gray-300'}>
                            {lang.label}
                        </span>
                      </button>
                    ))}
                 </div>
             )}
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
            {messages.map((m) => (
                <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    
                    {/* Bot Avatar */}
                    {m.role !== 'user' && (
                        <div className="w-8 h-8 rounded-lg border border-[#333] flex items-center justify-center bg-[#111] flex-shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-blue-400" />
                        </div>
                    )}
                    
                    {/* Message Bubble */}
                    <div className={`max-w-[80%] p-4 rounded-2xl text-[15px] shadow-sm ${
                        m.role === 'user' 
                        ? 'bg-[#2563eb] text-white rounded-br-none' 
                        : 'bg-[#1a1a1a] text-gray-200 border border-[#333] rounded-bl-none' 
                    }`}>
                        {/* Use SmoothText for Assistant, normal text for User */}
                        {m.role === 'user' ? (
                            <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                        ) : (
                            <SmoothText content={m.content} />
                        )}
                    </div>

                    {/* User Avatar */}
                    {m.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    )}
                </div>
            ))}
            
            {/* Loading State (Thinking Bubble) */}
            {isLoading && (
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg border border-[#333] flex items-center justify-center bg-[#111]">
                        <Bot className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="bg-[#1a1a1a] px-5 py-4 rounded-2xl border border-[#333] rounded-bl-none">
                        <div className="flex gap-1.5">
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-[#050505]">
            <div className="max-w-4xl mx-auto relative group">
                <form onSubmit={handleSubmit} className="relative flex items-center bg-[#111] border border-[#333] rounded-2xl focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600 transition-all shadow-lg">
                    <input 
                        value={input}
                        onChange={handleInputChange}
                        placeholder={`Ask in ${selectedLang.label}...`}
                        className="w-full bg-transparent text-white py-4 pl-6 pr-32 focus:outline-none placeholder-gray-600"
                        disabled={isLoading}
                    />
                    
                    <div className="absolute right-3 flex items-center gap-2">
                        {/* Voice Button */}
                        <button 
                          type="button" 
                          onClick={handleVoiceInput}
                          className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        >
                            {isListening ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                        </button>
                        
                        {/* Send Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading || !input}
                            className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
                
                <div className="text-center mt-3 flex justify-center items-center gap-2 opacity-60">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                        AI Generated • Verify with Article 39A
                    </p>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}