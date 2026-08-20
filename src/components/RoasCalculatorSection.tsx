import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface RoasCalculatorProps {
  onOpenAudit: () => void;
}

export const RoasCalculatorSection: React.FC<RoasCalculatorProps> = ({ onOpenAudit }) => {
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);
  const [currentRoas, setCurrentRoas] = useState<number>(2.2);
  const [iosTrafficPercent, setIosTrafficPercent] = useState<number>(55);

  // Calculations
  const currentReportedRevenue = monthlySpend * currentRoas;
  const estimatedLostSignalRate = (iosTrafficPercent / 100) * 0.45; // ~45% of iOS is lost on browser pixels
  const estimatedUntrackedSales = currentReportedRevenue * estimatedLostSignalRate;
  const potentialRecoveredRoas = Number((currentRoas * 1.55).toFixed(2));
  const newProjectedRevenue = monthlySpend * potentialRecoveredRoas;
  const monthlyProfitUplift = newProjectedRevenue - currentReportedRevenue;

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#071438] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#FF8A00] uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            ROI & Revenue Loss Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How Much Ad Revenue Are You Losing to Broken Tracking?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Adjust the sliders below to see your estimated untracked sales and the immediate profit unlock from Options IT Server-Side CAPI.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0B1F4D] border-2 border-blue-600/30 p-6 sm:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Monthly Ad Budget */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Monthly Ad Spend ($USD)
                  </label>
                  <span className="text-base font-extrabold text-[#0066FF] font-mono">
                    ${monthlySpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-[#071438] rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$500</span>
                  <span>$25,000</span>
                  <span>$50,000+</span>
                </div>
              </div>

              {/* Slider 2: Current Reported ROAS */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Current Reported ROAS
                  </label>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    {currentRoas.toFixed(1)}x ROAS
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="6.0"
                  step="0.1"
                  value={currentRoas}
                  onChange={(e) => setCurrentRoas(Number(e.target.value))}
                  className="w-full h-2 bg-[#071438] rounded-lg appearance-none cursor-pointer accent-[#FF8A00]"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1.0x</span>
                  <span>3.5x</span>
                  <span>6.0x</span>
                </div>
              </div>

              {/* Slider 3: Estimated iOS / Safari Visitors */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Estimated iOS / Safari Traffic
                  </label>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">
                    {iosTrafficPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="5"
                  value={iosTrafficPercent}
                  onChange={(e) => setIosTrafficPercent(Number(e.target.value))}
                  className="w-full h-2 bg-[#071438] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>20%</span>
                  <span>55% (Avg eCommerce)</span>
                  <span>90%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#071438] border border-blue-900/40 text-xs text-slate-400 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Safari 14+ cuts cookie life to 24 hours. Without Server-Side GTM, up to {(estimatedLostSignalRate * 100).toFixed(0)}% of your purchasers are marked as "Direct" or "Unknown".
                </span>
              </div>

            </div>

            {/* Results Output Column */}
            <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-[#0F2766] to-[#071438] border-2 border-emerald-500/40 p-6 sm:p-8 relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Estimated Tracking Impact
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  99.4% Signal Recovery
                </span>
              </div>

              <div className="space-y-4 my-6">
                <div>
                  <div className="text-xs text-slate-400">Estimated Uncaptured Monthly Sales:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
                    -${Math.round(estimatedUntrackedSales).toLocaleString()} <span className="text-xs font-normal text-rose-300">/mo untracked</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-900/50">
                  <div>
                    <div className="text-xs text-slate-400">Projected True ROAS:</div>
                    <div className="text-xl font-extrabold text-emerald-400 font-mono">
                      {potentialRecoveredRoas}x
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Monthly Revenue Uplift:</div>
                    <div className="text-xl font-extrabold text-[#FF8A00] font-mono">
                      +${Math.round(monthlyProfitUplift).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenAudit}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-lg shadow-[#FF8A00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Fix My Tracking & Claim This Revenue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center text-[11px] text-slate-400">
                ⚡ Direct consultation via WhatsApp: <strong className="text-slate-200">{AGENCY_CONFIG.whatsappNumber}</strong>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
