import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles, 
  Quote, 
  MessageSquareShare,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { CASE_STUDIES_DATA } from '../data/caseStudiesData';
import { AGENCY_CONFIG } from '../data/agencyData';

interface CaseStudiesSectionProps {
  onOpenAudit: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenAudit }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES_DATA[0].id);

  const activeCase = CASE_STUDIES_DATA.find(c => c.id === selectedCaseId) || CASE_STUDIES_DATA[0];

  return (
    <section id="case-studies" className="py-20 lg:py-28 bg-[#071438] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-3">
            Real eCommerce Results
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Before vs. After Tracking Case Studies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            See how fixing tracking infrastructure and restoring signal accuracy turns struggling campaigns into scaled profit machines.
          </p>
        </div>

        {/* Case Study Tab Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {CASE_STUDIES_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                selectedCaseId === item.id
                  ? 'bg-[#0B1F4D] border-[#0066FF] shadow-lg shadow-blue-900/40 text-white'
                  : 'bg-[#0B1F4D]/50 border-blue-900/40 text-slate-400 hover:text-slate-200 hover:bg-[#0B1F4D]/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FF8A00]">{item.industry}</span>
                <span className="text-[11px] font-mono text-slate-400">{item.platform}</span>
              </div>
              <div className="text-base font-bold text-white mt-1">{item.clientName}</div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">
                {item.after.roas} • {item.after.revenueUplift}
              </div>
            </button>
          ))}
        </div>

        {/* Main Active Case Study Card */}
        <div className="rounded-2xl bg-[#0B1F4D] border border-blue-900/60 p-6 sm:p-8 lg:p-10 shadow-2xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-blue-900/50">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeCase.clientName}
                </h3>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#0066FF]/20 text-blue-300 border border-[#0066FF]/40">
                  {activeCase.platform}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {activeCase.timeframe}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                {activeCase.summary}
              </p>
            </div>

            <button
              onClick={onOpenAudit}
              className="self-start lg:self-auto shrink-0 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-600 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/30"
            >
              <span>Get Similar Results</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Before vs After Comparison Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            
            {/* Before Setup Card */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                  <h4 className="text-base font-bold text-rose-300 uppercase tracking-wider">
                    Before Options IT Setup
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                  Lost Conversions
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#071438]/80 border border-rose-950">
                  <div className="text-xs text-slate-400">Signal & Data Loss:</div>
                  <div className="text-sm font-bold text-rose-300 mt-0.5">{activeCase.before.dataLoss}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#071438]/80 border border-rose-950">
                    <div className="text-xs text-slate-400">Baseline ROAS:</div>
                    <div className="text-lg font-extrabold text-slate-200 mt-0.5">{activeCase.before.roas}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071438]/80 border border-rose-950">
                    <div className="text-xs text-slate-400">Attribution Health:</div>
                    <div className="text-sm font-bold text-rose-400 mt-0.5">{activeCase.before.attributionScore}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#071438]/80 border border-rose-950">
                  <div className="text-xs text-slate-400">Root Technical Issue:</div>
                  <div className="text-xs text-slate-300 mt-0.5">{activeCase.before.trackingIssue}</div>
                </div>
              </div>
            </div>

            {/* After Setup Card */}
            <div className="p-6 rounded-2xl bg-emerald-950/25 border-2 border-emerald-500/50 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-emerald-300 uppercase tracking-wider">
                    After Options IT Setup
                  </h4>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-600/50">
                  Optimized & Scaled
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#071438] border border-emerald-900/50">
                  <div className="text-xs text-slate-400">Verified Revenue Uplift:</div>
                  <div className="text-base font-extrabold text-emerald-400 mt-0.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF8A00]" />
                    <span>{activeCase.after.revenueUplift}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#071438] border border-emerald-900/50">
                    <div className="text-xs text-slate-400">New Verified ROAS:</div>
                    <div className="text-xl font-extrabold text-white mt-0.5">{activeCase.after.roas}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#071438] border border-emerald-900/50">
                    <div className="text-xs text-slate-400">Event Match Quality:</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">{activeCase.after.eventMatchQuality}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#071438] border border-emerald-900/50">
                  <div className="text-xs text-slate-400">Capture & Compliance Rate:</div>
                  <div className="text-sm font-bold text-blue-300 mt-0.5">{activeCase.after.attributionScore}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Solutions Implemented Breakdown */}
          <div className="p-5 rounded-xl bg-[#071438] border border-blue-900/50 mb-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Technical Roadmap Implemented:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeCase.solutionDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-blue-600/20 text-[#0066FF] font-bold flex items-center justify-center shrink-0 text-[11px] border border-blue-500/30">
                    {idx + 1}
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Testimonial Quote */}
          {activeCase.clientQuote && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#0F2766] to-[#0B1F4D] border border-blue-800/40 relative">
              <Quote className="w-8 h-8 text-blue-500/20 absolute top-3 right-3" />
              <p className="text-sm italic text-slate-200 leading-relaxed pr-8">
                "{activeCase.clientQuote.text}"
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-bold text-white">{activeCase.clientQuote.author}</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-[#FF8A00] font-medium">{activeCase.clientQuote.role}</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
