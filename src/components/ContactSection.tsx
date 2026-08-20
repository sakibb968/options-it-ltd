import React from 'react';
import { 
  MessageSquareShare, 
  Globe, 
  Mail, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Phone
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface ContactSectionProps {
  onOpenAudit: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAudit }) => {
  return (
    <section className="py-16 bg-[#071438] border-t border-blue-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1F4D] via-[#0F2766] to-[#071438] border-2 border-blue-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow"></span>
                Official Agency Contacts
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Connect With Options IT Ltd
              </h2>

              <p className="text-base text-slate-300 max-w-xl">
                Ready to stop data loss, get high-performing ad tracking, or solve GMC suspensions? Reach our certified engineers instantly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                
                {/* WhatsApp Box */}
                <a
                  href={AGENCY_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#071438] border border-emerald-500/40 hover:border-emerald-400 transition-all group flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquareShare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">WhatsApp Hotline</div>
                    <div className="text-base font-extrabold text-white font-mono mt-0.5">
                      {AGENCY_CONFIG.whatsappNumber}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                      {AGENCY_CONFIG.responsePromise}
                    </div>
                  </div>
                </a>

                {/* Website Box */}
                <a
                  href={AGENCY_CONFIG.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#071438] border border-blue-500/40 hover:border-blue-400 transition-all group flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Official Website</div>
                    <div className="text-base font-extrabold text-white font-mono mt-0.5">
                      {AGENCY_CONFIG.websiteDomain}
                    </div>
                    <div className="text-[11px] text-blue-300 font-medium mt-1">
                      24/7 Portal & Client Hub
                    </div>
                  </div>
                </a>

              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-[#071438] border border-blue-900/60 text-center w-full max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF8A00] to-[#EA580C] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#FF8A00]/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Book Free Technical Audit</h3>
                <p className="text-xs text-slate-300 mt-1 mb-4">
                  Get our engineers to review your store and send a 5-minute video diagnostic.
                </p>
                <button
                  onClick={onOpenAudit}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-md shadow-[#FF8A00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start Store Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
