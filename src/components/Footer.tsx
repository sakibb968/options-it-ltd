import React from 'react';
import { Activity, MessageSquareShare, Globe, ShieldCheck, ArrowUp } from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050E26] border-t border-blue-950 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0B1F4D] border border-blue-400/40 flex items-center justify-center shadow-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-tight text-white">
                  OPTIONS <span className="text-[#0066FF]">IT</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/30 uppercase">
                  LTD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Options IT Ltd is a specialized digital marketing tracking and ads optimization agency helping eCommerce businesses fix data leaks, implement first-party Server-Side CAPI, and maximize ad performance.
            </p>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-300">WhatsApp: <strong className="text-emerald-400">{AGENCY_CONFIG.whatsappNumber}</strong></span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Domain: <strong className="text-[#0066FF]">{AGENCY_CONFIG.websiteDomain}</strong></span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Core Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Server-Side Tracking (SST)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Meta Pixel & CAPI</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Google Tag Manager Setup</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">GA4 Ecommerce Tracking</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Google Merchant Center Fix</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Meta & Google Ads Management</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">Before & After Case Studies</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Server Architecture</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">ROAS Loss Calculator</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Agency</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Book Free Audit</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Options IT Ltd. All rights reserved. Registered Digital Marketing & Tracking Agency.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-500">
              WhatsApp: <strong className="text-slate-300 font-mono">{AGENCY_CONFIG.whatsappNumber}</strong>
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#071438] hover:bg-[#0F2766] text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
