import React, { useState } from 'react';
import { 
  Server, 
  Share2, 
  Code2, 
  BarChart3, 
  Target, 
  Zap, 
  ShieldCheck, 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  MessageSquareShare, 
  Sparkles,
  Layers,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { AGENCY_CONFIG } from '../data/agencyData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForAudit: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForAudit }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server': return <Server className="w-6 h-6 text-[#0066FF]" />;
      case 'Share2': return <Share2 className="w-6 h-6 text-[#0066FF]" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-[#0066FF]" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-[#0066FF]" />;
      case 'Target': return <Target className="w-6 h-6 text-[#FF8A00]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#FF8A00]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#0066FF]" />;
      default: return <Cpu className="w-6 h-6 text-[#0066FF]" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter(service => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'tracking') return ['server-side-tracking', 'meta-pixel-capi', 'gtm-setup', 'ga4-tracking'].includes(service.id);
    if (selectedFilter === 'ads') return ['meta-ads-management', 'google-ads-management'].includes(service.id);
    if (selectedFilter === 'gmc') return service.id === 'gmc-fix';
    if (selectedFilter === 'dev') return service.id === 'ecommerce-dev';
    return true;
  });

  const generateWhatsAppServiceLink = (serviceTitle: string) => {
    const text = encodeURIComponent(`Hello Options IT Ltd, I need help with "${serviceTitle}". Please share your pricing and implementation roadmap.`);
    return `https://wa.me/8801806301888?text=${text}`;
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#071438] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-3">
            Core Agency Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Advanced Tracking & High-ROAS Ads Solutions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From first-party Server-Side CAPI to GMC suspension unbanning and profitable media buying, we engineer end-to-end eCommerce growth.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Services (8)' },
              { id: 'tracking', label: 'Server & GTM Tracking' },
              { id: 'ads', label: 'Ads Management' },
              { id: 'gmc', label: 'Google Merchant Center Fix' },
              { id: 'dev', label: 'E-commerce Dev' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/30'
                    : 'bg-[#0B1F4D] text-slate-400 hover:text-slate-200 border border-blue-900/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                className="group rounded-2xl bg-[#0B1F4D]/90 border border-blue-900/60 hover:border-blue-500/60 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/60 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle card top glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#071438] border border-blue-900/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#071438] text-[#FF8A00] border border-[#FF8A00]/30 uppercase tracking-wide">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* ROI Highlight Tag */}
                  <div className="mt-4 p-2.5 rounded-lg bg-[#071438]/80 border border-blue-900/40 text-xs font-semibold text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-[#FF8A00]" />
                    <span>{service.roiBenefit}</span>
                  </div>

                  {/* Expandable Technical Deliverables */}
                  <div className="mt-5 pt-4 border-t border-blue-900/40">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>Key Technical Deliverables</span>
                      <button
                        onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                        className="text-[11px] text-[#0066FF] hover:underline normal-case font-medium"
                      >
                        {isExpanded ? 'Show less' : 'View all'}
                      </button>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {(isExpanded ? service.deliverables : service.deliverables.slice(0, 3)).map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#071438] text-slate-400 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="mt-6 pt-4 border-t border-blue-900/40 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServiceForAudit(service.title)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
                  >
                    <span>Book Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={generateWhatsAppServiceLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-[#071438] hover:bg-[#0F2766] border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquareShare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner for Custom Consultation */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0B1F4D] via-[#0F2766] to-[#0B1F4D] border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FF8A00]/20 text-[#FF8A00] flex items-center justify-center shrink-0 border border-[#FF8A00]/30">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Need a Custom Tracking Architecture or Urgent GMC Unban?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                We handle enterprise custom setups, headless Next.js data layers, and multi-country tax/feed compliance.
              </p>
            </div>
          </div>

          <a
            href={AGENCY_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-lg shadow-[#FF8A00]/30 flex items-center gap-2"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Chat on WhatsApp ({AGENCY_CONFIG.whatsappNumber})</span>
          </a>
        </div>

      </div>
    </section>
  );
};
