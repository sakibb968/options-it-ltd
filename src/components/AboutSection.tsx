import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquareShare,
  Cpu,
  Target,
  Sparkles
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface AboutSectionProps {
  onOpenAudit: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAudit }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#0B1F4D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-4">
              About Options IT Ltd
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The Specialized Tracking & Performance Engine for eCommerce
            </h2>

            <div className="mt-6 space-y-4 text-base text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white font-semibold">Options IT Ltd</strong> was founded with a single mission: to eliminate the black hole of data loss in modern eCommerce advertising. In a post-iOS 14.5 world where browser pixels lose up to 40% of conversion events, standard marketing agencies guess while smart brands engineer their data.
              </p>
              <p>
                We are a dedicated team of certified Google Tag Manager engineers, Meta Conversions API architects, and high-performance media buyers. We don’t just run ads—we build the bulletproof first-party data infrastructure that powers ad algorithms to scale profitably.
              </p>
              <p>
                Whether you need enterprise Server-Side tracking via Stape/Google Cloud, a critical Google Merchant Center suspension unbanned, or high-ROAS Meta & Google Ads management, Options IT Ltd delivers measurable results in days, not months.
              </p>
            </div>

            {/* Core Values / Commitments */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-[#0066FF] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Data Privacy & GDPR</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Consent Mode v2 compliance with SHA-256 encrypted hashing.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#071438] border border-blue-900/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF8A00]/20 text-[#FF8A00] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">24-48h Delivery Guarantee</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Fast-track setup with live event deduplication verification.</p>
                </div>
              </div>
            </div>

            {/* Dual CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onOpenAudit}
                className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-600 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <span>Book Free Technical Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={AGENCY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-[#071438] hover:bg-[#0F2766] border border-emerald-500/30 flex items-center gap-2 transition-all"
              >
                <MessageSquareShare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {AGENCY_CONFIG.whatsappNumber}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Execution Methodology Framework */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-[#071438] border border-blue-900/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blue-900/50">
                <h3 className="text-lg font-bold text-white">Our 5-Step Execution Blueprint</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF8A00]/20 text-[#FF8A00] uppercase">
                  Proven System
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: '01',
                    title: 'Deep Diagnostic Audit',
                    desc: 'We inspect your GTM dataLayer, Meta Pixel EMQ, and GA4 events to pinpoint exact leakage.'
                  },
                  {
                    step: '02',
                    title: 'Server Container Provisioning',
                    desc: 'Deploy first-party custom subdomain server (Stape.io / Google Cloud Platform).'
                  },
                  {
                    step: '03',
                    title: 'DataLayer & CAPI Engineering',
                    desc: 'Inject bulletproof e-commerce events with event_id deduplication and SHA256 hashed user data.'
                  },
                  {
                    step: '04',
                    title: 'Real-Time Verification & Debugging',
                    desc: 'Live testing across Meta Test Events, GA4 DebugView, and Google Tag Assistant.'
                  },
                  {
                    step: '05',
                    title: 'Ad Optimization & ROAS Scaling',
                    desc: 'Feed clean first-party signals to Meta Advantage+ and Google PMax for lower CPA.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#0B1F4D]/60 border border-blue-900/40">
                    <div className="w-7 h-7 rounded-lg bg-[#0066FF]/20 text-[#0066FF] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-blue-500/30">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
