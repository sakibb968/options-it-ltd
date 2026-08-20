import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  MessageSquareShare, 
  CheckCircle2, 
  TrendingUp, 
  Server, 
  Zap, 
  Database, 
  Eye, 
  RefreshCw,
  AlertTriangle,
  Lock,
  BarChart2,
  PieChart,
  Globe
} from 'lucide-react';
import { AGENCY_CONFIG, AGENCY_STATS } from '../data/agencyData';

interface HeroSectionProps {
  onOpenAudit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState<'server' | 'browser'>('server');
  const [liveEventCounter, setLiveEventCounter] = useState(1482);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Simulated live event feed
  const liveEvents = [
    { event: 'Purchase', val: '$249.00', platform: 'Meta CAPI', emq: '9.5/10', time: '1s ago', dedupe: 'deduped', id: 'ord_88219' },
    { event: 'AddToCart', val: '$89.00', platform: 'GA4 Server', emq: 'Verified', time: '3s ago', dedupe: 'first-party', id: 'cart_91204' },
    { event: 'InitiateCheckout', val: '$320.00', platform: 'Google Ads Enhanced', emq: 'Hashed', time: '6s ago', dedupe: 'g_conv_44', id: 'chk_10932' },
    { event: 'ViewContent', val: '$140.00', platform: 'Meta CAPI', emq: '9.2/10', time: '9s ago', dedupe: 'fbp_ok', id: 'vc_84102' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEventCounter(prev => prev + 1);
      setActiveEventIndex(prev => (prev + 1) % liveEvents.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [liveEvents.length]);

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28 bg-[#0B1F4D] bg-grid-pattern">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-[#FF8A00]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071438]/90 border border-blue-500/30 text-xs font-semibold text-blue-200 shadow-lg shadow-blue-950/50">
            <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-ping-slow"></span>
            <span className="text-[#FF8A00] font-bold">1st-Party Cloud Tracking</span>
            <span className="text-slate-500">|</span>
            <span>Meta CAPI • GTM • GA4 • GMC Fix</span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Fix Your Tracking.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#0066FF]">
              Optimize Your Ads.
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-amber-300">
              Scale Your Revenue.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            We help businesses get accurate data, better ad performance, and measurable growth through advanced tracking solutions.
          </p>

          {/* Dual Primary Call-to-Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Book Free Audit (WhatsApp / Form) */}
            <a
              href={AGENCY_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-xl shadow-[#FF8A00]/30 hover:shadow-2xl hover:shadow-[#FF8A00]/50 transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 group"
            >
              <Sparkles className="w-5 h-5 text-amber-100 group-hover:rotate-12 transition-transform" />
              <span>Book Free Audit via WhatsApp</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Direct WhatsApp Consultation */}
            <button
              onClick={onOpenAudit}
              className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-slate-100 bg-[#071438] hover:bg-[#0F2766] border border-blue-500/30 hover:border-blue-400/60 shadow-lg shadow-black/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageSquareShare className="w-5 h-5 text-emerald-400" />
              <span>Get Tracking Diagnostic</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24-48h Setup Turnaround
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#0066FF]" /> 99.4% Signal Capture Guarantee
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#FF8A00]" /> 100% GMC Approval Record
            </span>
          </div>
        </div>

        {/* Hero Visual Dashboard Component */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative outer glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0066FF]/40 via-[#FF8A00]/30 to-blue-600/40 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative rounded-2xl bg-[#071438] border border-blue-500/30 shadow-2xl overflow-hidden">
            
            {/* Dashboard Header Bar */}
            <div className="bg-[#0B1F4D] border-b border-blue-900/60 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>
                <div className="h-4 w-px bg-blue-900"></div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Server className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span className="text-blue-300">ssgtm.yourstore.com</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    LIVE EDGE 200 OK
                  </span>
                </div>
              </div>

              {/* Toggle Comparison View */}
              <div className="flex items-center gap-1 bg-[#071438] p-1 rounded-lg border border-blue-900/60 text-xs">
                <button
                  onClick={() => setActiveTab('server')}
                  className={`px-3 py-1 rounded font-semibold transition-all ${
                    activeTab === 'server' 
                      ? 'bg-[#0066FF] text-white shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Server-Side (Options IT)
                </button>
                <button
                  onClick={() => setActiveTab('browser')}
                  className={`px-3 py-1 rounded font-semibold transition-all ${
                    activeTab === 'browser' 
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50 shadow' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚠️ Standard Client (Broken)
                </button>
              </div>
            </div>

            {/* Dashboard Inner Canvas */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">
              
              {/* Top Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                <div className="p-4 rounded-xl bg-[#0B1F4D]/80 border border-blue-900/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Event Capture Rate</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeTab === 'server' ? '99.4%' : '58.2%'}
                    </span>
                    <span className={`text-xs font-semibold ${activeTab === 'server' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {activeTab === 'server' ? '+41.2% Uplift' : '-41.8% Lost'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {activeTab === 'server' ? 'Safari ITP & Adblocker Bypassed' : 'Blocked by iOS 14.5+ & Safari'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1F4D]/80 border border-blue-900/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Meta Event Match (EMQ)</span>
                    <Zap className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeTab === 'server' ? '9.4/10' : '4.1/10'}
                    </span>
                    <span className={`text-xs font-semibold ${activeTab === 'server' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {activeTab === 'server' ? 'Great' : 'Poor'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {activeTab === 'server' ? 'Full Hashed User Parameters' : 'Missing User Parameters'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1F4D]/80 border border-blue-900/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Average Client ROAS</span>
                    <BarChart2 className="w-4 h-4 text-[#FF8A00]" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeTab === 'server' ? '4.42x' : '1.85x'}
                    </span>
                    <span className={`text-xs font-semibold ${activeTab === 'server' ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {activeTab === 'server' ? '+138%' : 'Baseline'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {activeTab === 'server' ? 'Algorithm fed rich purchase data' : 'Blind ad algorithms scaling blindly'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0B1F4D]/80 border border-blue-900/50">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>GMC Compliance</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                      {activeTab === 'server' ? 'Approved' : 'Warning'}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      {activeTab === 'server' ? '100%' : '5 Disapproved'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {activeTab === 'server' ? 'Zero Misrepresentation Flags' : 'Risk of Account Suspension'}
                  </p>
                </div>

              </div>

              {/* Interactive Architecture Flow Visualizer */}
              <div className="p-5 rounded-xl bg-[#0B1F4D]/60 border border-blue-900/60 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  {/* Step 1: User Store */}
                  <div className="w-full md:w-1/4 p-3.5 rounded-lg bg-[#071438] border border-slate-700 text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center font-bold text-xs mb-1.5">
                      01
                    </div>
                    <div className="text-xs font-bold text-white">eCommerce Visitor</div>
                    <p className="text-[11px] text-slate-400">Safari iOS, Chrome, Brave</p>
                    <div className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      Purchase: $249.00
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-blue-500 to-[#FF8A00]"></div>
                    <span className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      {activeTab === 'server' ? 'First-Party SSL' : 'Third-Party Pixel'}
                    </span>
                  </div>

                  {/* Step 2: Options IT Server Container */}
                  <div className={`w-full md:w-1/3 p-4 rounded-lg text-center relative ${
                    activeTab === 'server'
                      ? 'bg-gradient-to-br from-[#0F2766] to-[#071438] border-2 border-[#0066FF] shadow-lg shadow-blue-600/20'
                      : 'bg-rose-950/40 border border-rose-800/40'
                  }`}>
                    {activeTab === 'server' && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#FF8A00] text-[9px] font-extrabold uppercase text-white tracking-wider">
                        Options IT Hub
                      </span>
                    )}
                    <div className="flex justify-center mb-1.5">
                      {activeTab === 'server' ? (
                        <Server className="w-6 h-6 text-emerald-400 animate-pulse" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-rose-400" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-white">
                      {activeTab === 'server' ? 'Server-Side GTM + Stape/GCP' : 'Direct Browser Pixel'}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {activeTab === 'server' 
                        ? 'SHA256 Hashing, Event Deduplication & 2-Year Cookie'
                        : 'Blocked by Adblock, 24h Safari Cookie Expire'}
                    </p>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-[#FF8A00] to-emerald-500"></div>
                    <span className="text-[10px] font-mono text-emerald-400 mt-0.5">
                      {activeTab === 'server' ? 'Server API' : 'Unreliable'}
                    </span>
                  </div>

                  {/* Step 3: Marketing Platforms */}
                  <div className="w-full md:w-1/4 p-3.5 rounded-lg bg-[#071438] border border-slate-700 text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-xs mb-1.5">
                      03
                    </div>
                    <div className="text-xs font-bold text-white">Ad Platform AI</div>
                    <div className="mt-2 flex flex-wrap justify-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-bold">Meta CAPI</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-bold">GA4</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 text-[10px] font-bold">Google Ads</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Live Real-Time Event Stream Log */}
              <div className="rounded-xl bg-[#071438] border border-blue-900/40 p-3 sm:p-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 pb-2 border-b border-blue-900/40 font-mono">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Live Tracking Stream ({liveEventCounter} events processed)
                  </span>
                  <span className="hidden sm:inline text-slate-400">
                    Domain: <strong className="text-slate-200">optionitld.com</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {liveEvents.map((evt, idx) => (
                    <div 
                      key={evt.id}
                      className={`p-2.5 rounded-lg text-xs font-mono transition-all ${
                        idx === activeEventIndex
                          ? 'bg-[#0F2766] border border-[#0066FF] shadow-md shadow-blue-500/20'
                          : 'bg-[#0B1F4D]/50 border border-blue-950'
                      }`}
                    >
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold text-white">{evt.event}</span>
                        <span className="text-[#FF8A00] font-bold">{evt.val}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                        <span className="text-blue-300">{evt.platform}</span>
                        <span className="text-emerald-400 font-semibold">{evt.emq}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Agency Stats Bar */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {AGENCY_STATS.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#071438]/80 border border-blue-900/40 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
