"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export function GuestBadge() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-[320px] w-full hidden md:block animate-in slide-in-from-bottom-5 fade-in duration-1000">
      <div className="bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-start gap-4 relative group">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1 text-gray-500 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl shrink-0 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>
        
        {/* Content */}
        <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs font-bold text-white uppercase tracking-wider">Guest Mode</p>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                No login required. Data is not saved. Download your work before refreshing.
            </p>
        </div>
      </div>
    </div>
  );
}