import React, { useState, useEffect } from 'react';
import { MessageSquareShare, X, Sparkles, PhoneCall } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const StickyWhatsAppFloat: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      
      {/* Floating Prompt Notification Bubble */}
      {showTooltip && (
        <div className="relative bg-[#071438] border border-emerald-500/50 text-white rounded-2xl p-3.5 shadow-2xl shadow-black/50 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-0.5"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Options IT Ltd Online
            </span>
          </div>
          <p className="text-xs text-slate-200 pr-3">
            Have tracking issues or need a free store audit? Chat with us on WhatsApp!
          </p>
          <div className="mt-2 text-[10px] font-mono text-slate-400">
            Hotline: <strong className="text-white">{AGENCY_CONFIG.whatsappNumber}</strong>
          </div>
        </div>
      )}

      {/* Main WhatsApp Float Button */}
      <a
        href={AGENCY_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-2xl shadow-emerald-950/80 transition-all transform hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF8A00] rounded-full border-2 border-[#0B1F4D] animate-ping-slow"></span>
        <MessageSquareShare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline font-semibold">WhatsApp ({AGENCY_CONFIG.whatsappNumber})</span>
      </a>

    </div>
  );
};
