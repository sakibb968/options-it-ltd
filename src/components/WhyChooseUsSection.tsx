import React, { useState } from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  Layers, 
  Zap, 
  Cpu, 
  XCircle, 
  ShieldCheck, 
  ArrowRight,
  Server,
  Activity,
  Award
} from 'lucide-react';
import { WHY_CHOOSE_US_DATA, AGENCY_CONFIG } from '../data/agencyData';

interface WhyChooseUsSectionProps {
  onOpenAudit: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#0066FF]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#FF8A00]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-blue-400" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
    }
  };

  const comparisonRows = [
    {
      feature: 'iOS 14.5+ & Safari ITP Survival',
      traditional: 'Blocked after 24h; drops 40%+ events',
      optionsIt: 'First-party cookie extended up to 2 years (99.4% capture)',
      highlight: true
    },
    {
      feature: 'Ad Blocker Resilience',
      traditional: '100% blocked by Brave, uBlock, AdGuard',
      optionsIt: 'Custom DNS subdomain completely bypasses ad blockers',
      highlight: true
    },
    {
      feature: 'Meta Event Match Quality (EMQ)',
      traditional: 'Low (3.5 - 5.0/10) with missing parameters',
      optionsIt: 'High (8.5 - 9.8/10) with SHA256 hashed user data',
      highlight: true
    },
    {
      feature: 'Event Deduplication',
      traditional: 'Double-counts purchases or drops client events',
      optionsIt: 'Robust event_id deduplication across Web & Server',
      highlight: false
    },
    {
      feature: 'Page Speed & Core Web Vitals',
      traditional: 'Heavy 3rd-party JS scripts slow down checkout',
      optionsIt: 'Offloaded to cloud edge; sub-second page speed',
      highlight: false
    },
    {
      feature: 'Google Merchant Center Compliance',
      traditional: 'Constant misrepresentation risk & feed bans',
      optionsIt: '100% approved structured feeds & policy compliance',
      highlight: true
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#0B1F4D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#FF8A00] uppercase tracking-wider mb-3">
            Why Partner With Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for Flawless Attribution & Maximized ROAS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            We don’t rely on default plugin tracking. We build enterprise-grade server infrastructure that gives your ad accounts the unfair advantage.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_US_DATA.map((item, idx) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl bg-[#071438] border transition-all duration-300 flex flex-col justify-between ${
                idx === 0 
                  ? 'border-[#0066FF] shadow-lg shadow-blue-900/30 lg:col-span-1' 
                  : 'border-blue-900/40 hover:border-blue-700/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F4D] border border-blue-900/60 flex items-center justify-center">
                    {getIcon(item.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-white">{item.metric}</span>
                    <p className="text-[10px] uppercase font-bold text-[#FF8A00] tracking-wider">{item.metricLabel}</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs font-semibold text-blue-300 mb-2">{item.shortDesc}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{item.fullDesc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-900/40 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Included in every tracking audit & deployment</span>
              </div>
            </div>
          ))}

          {/* Special CTA Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F2766] to-[#071438] border-2 border-[#FF8A00]/50 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FF8A00]/20 border border-[#FF8A00]/40 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#FF8A00]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Stop Losing 40% of Your Sales Data?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Get our certified tracking engineers to inspect your store’s dataLayer and pixel health today for zero upfront cost.
              </p>
            </div>

            <button
              onClick={onOpenAudit}
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-md shadow-[#FF8A00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request Free Store Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="rounded-2xl bg-[#071438] border border-blue-900/60 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 bg-[#0B1F4D] border-b border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">
                Traditional Client Tracking vs. Options IT Server Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                See why leading eCommerce brands upgrade their tracking infrastructure with Options IT Ltd.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0 self-start sm:self-auto">
              Enterprise Grade
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-blue-900/40 text-xs uppercase font-bold text-slate-400 bg-[#071438]">
                  <th className="py-4 px-6">Tracking Feature / Metric</th>
                  <th className="py-4 px-6 text-rose-400">Default Browser Plugins</th>
                  <th className="py-4 px-6 text-emerald-400 bg-blue-950/40">Options IT Ltd (Server-Side)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/40 text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-950/20 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      <div className="flex items-center gap-2 text-rose-300">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 bg-blue-950/30">
                      <div className="flex items-center gap-2 font-semibold text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{row.optionsIt}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
