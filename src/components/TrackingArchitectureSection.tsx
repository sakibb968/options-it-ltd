import React from 'react';
import { 
  Server, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Layers, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Database,
  EyeOff,
  Clock
} from 'lucide-react';
import { TECH_PARTNERS, AGENCY_CONFIG } from '../data/agencyData';

export const TrackingArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-20 lg:py-28 bg-[#0B1F4D] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#FF8A00] uppercase tracking-wider mb-3">
            Technical Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How First-Party Server-Side Tracking Protects Your Revenue
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Learn why moving from fragile browser pixels to an isolated First-Party Cloud Container is the only way to ensure 100% data fidelity in modern eCommerce.
          </p>
        </div>

        {/* 4 Architecture Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#071438] border border-blue-900/50 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-[#0066FF] flex items-center justify-center font-bold text-sm mb-4 border border-blue-500/30">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. First-Party Subdomain</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We map a custom subdomain (e.g. <code className="text-[#0066FF] font-mono">ssgtm.yourstore.com</code>) directly to your cloud server. Browser security considers this 100% first-party, bypassing adblockers and Safari ITP.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> First-Party DNS Mapping
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#071438] border border-blue-900/50 relative">
            <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/20 text-[#FF8A00] flex items-center justify-center font-bold text-sm mb-4 border border-[#FF8A00]/30">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Secure Edge Processing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Incoming customer events are intercepted at the server level. Customer data (email, phone, address) is cryptographically hashed with SHA-256 before delivery.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> SHA-256 Hashing & Security
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#071438] border border-blue-900/50 relative">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-[#0066FF] flex items-center justify-center font-bold text-sm mb-4 border border-blue-500/30">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Precise Deduplication</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every checkout generates a unique <code className="text-[#FF8A00] font-mono">event_id</code>. If both browser and server trigger the purchase, ad networks automatically merge them into one verified sale.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero Double-Counting
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#071438] border border-blue-900/50 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-500/30">
              04
            </div>
            <h3 className="text-lg font-bold text-white mb-2">4. Direct Server-to-Server</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clean event payloads are piped directly to Meta Graph API, Google Ads Enhanced Conversions, GA4, and TikTok Server APIs with 0ms client browser lag.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> 9.5+ Event Match Quality
            </div>
          </div>

        </div>

        {/* Tech Stack Ecosystem */}
        <div className="rounded-2xl bg-[#071438] border border-blue-900/60 p-8">
          <div className="text-center mb-6">
            <h3 className="text-base font-bold text-slate-300 uppercase tracking-wider">
              Certified Technologies & Platforms We Deploy
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {TECH_PARTNERS.map((tech, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0B1F4D] border border-blue-900/40 text-center hover:border-blue-500 transition-colors">
                <div className="text-xs font-bold text-white">{tech.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
