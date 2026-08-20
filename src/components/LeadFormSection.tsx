import React, { useState } from 'react';
import { 
  Send, 
  MessageSquareShare, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Building2, 
  Globe, 
  DollarSign, 
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AGENCY_CONFIG } from '../data/agencyData';
import { SERVICES_DATA } from '../data/servicesData';
import { LeadFormData } from '../types';
import { apiClient } from '../services/apiClient';

interface LeadFormSectionProps {
  preSelectedService?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ preSelectedService }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    businessName: '',
    websiteUrl: '',
    whatsappNumber: '',
    services: preSelectedService ? [preSelectedService] : ['Server-Side Tracking (SST)', 'Meta Pixel & Conversions API (CAPI)'],
    monthlyAdBudget: '$2,000 - $5,000 / month',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const availableServices = [
    'Server-Side Tracking (SST)',
    'Meta Pixel & Conversions API (CAPI)',
    'Google Tag Manager (GTM) Setup',
    'GA4 Ecommerce Tracking',
    'Google Merchant Center (GMC) Fix & Approval',
    'Meta Ads Management',
    'Google Ads Management',
    'E-commerce Website Development'
  ];

  const budgetOptions = [
    'Less than $1,000 / month',
    '$1,000 - $2,500 / month',
    '$2,500 - $5,000 / month',
    '$5,000 - $15,000 / month',
    '$15,000 - $50,000+ / month',
    'Not currently running ads (Setup only)'
  ];

  const toggleService = (service: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists 
          ? prev.services.filter(s => s !== service)
          : [...prev.services, service]
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setErrorMessage('Please provide your WhatsApp number for audit delivery.');
      return;
    }
    if (!formData.websiteUrl.trim()) {
      setErrorMessage('Please provide your store website URL.');
      return;
    }
    if (formData.services.length === 0) {
      setErrorMessage('Please select at least one service required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to REST API backend
      await apiClient.submitLead({
        name: formData.fullName,
        companyName: formData.businessName,
        websiteURL: formData.websiteUrl,
        phone: formData.whatsappNumber,
        serviceRequired: formData.services.join(', '),
        budget: formData.monthlyAdBudget,
        message: formData.notes
      });

      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Error submitting request. Please try again or message via WhatsApp.');
    }
  };

  const handleSendViaWhatsApp = () => {
    if (!formData.fullName.trim() || !formData.websiteUrl.trim()) {
      setErrorMessage('Please enter your Name and Website URL before sending on WhatsApp.');
      return;
    }

    const servicesList = formData.services.length > 0 ? formData.services.join(', ') : 'Free Tracking Audit';
    const message = `Hello Options IT Ltd!
I would like to request a Free Tracking & Ads Audit.

*Client Details:*
• Name: ${formData.fullName}
• Business: ${formData.businessName || 'N/A'}
• Website: ${formData.websiteUrl}
• WhatsApp Contact: ${formData.whatsappNumber || 'N/A'}
• Services Required: ${servicesList}
• Monthly Ad Spend: ${formData.monthlyAdBudget}
• Additional Notes: ${formData.notes || 'None'}

Please review my store and let me know the roadmap!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/8801806301888?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#071438] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#FF8A00] uppercase tracking-wider mb-3">
            Book Free Audit
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Get Your Free Tracking & Ads Audit
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Tell us about your store. Our tracking engineers will inspect your pixel health, dataLayer, and GMC status, then deliver an actionable audit report.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct WhatsApp Contact & Promises */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick WhatsApp Contact Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1F4D] to-[#071438] border-2 border-emerald-500/40 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <MessageSquareShare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Fast-Track WhatsApp</h3>
                  <p className="text-[11px] text-emerald-400 font-semibold">Online & Ready to Chat</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Prefer immediate messaging? Chat directly with our senior tracking architect on WhatsApp right now.
              </p>

              <a
                href={AGENCY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-900/40 flex items-center justify-center gap-2 transition-colors mb-3"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>WhatsApp: {AGENCY_CONFIG.whatsappNumber}</span>
              </a>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 font-mono">
                  Official Website: <strong className="text-white">optionitld.com</strong>
                </span>
              </div>
            </div>

            {/* Audit Checklist Box */}
            <div className="p-6 rounded-2xl bg-[#0B1F4D] border border-blue-900/50 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                What’s Included in Your Free Audit:
              </h4>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Meta Pixel Event Match Quality (EMQ) deep inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>GA4 e-commerce funnel & duplicate purchase check</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>iOS 14.5 Safari ITP cookie leakage estimate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Google Merchant Center (GMC) policy & feed review</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Step-by-step fix roadmap with guaranteed timeline</span>
                </li>
              </ul>
            </div>

            {/* Privacy & Guarantee */}
            <div className="p-4 rounded-xl bg-[#0B1F4D]/60 border border-blue-900/40 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0066FF] shrink-0" />
              <span>100% Confidential. We never share your store data or credentials.</span>
            </div>

          </div>

          {/* Right Column: Interactive Lead Capture Form */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0B1F4D] border border-blue-900/60 p-6 sm:p-10 shadow-2xl">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Audit Request Received Successfully!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Our senior tracking team has queued your website (<span className="text-[#0066FF] font-mono">{formData.websiteUrl}</span>) for deep technical diagnostics.
                </p>
                <div className="p-4 rounded-xl bg-[#071438] border border-emerald-500/30 max-w-md mx-auto text-xs text-slate-300">
                  ⚡ We will reach out to you on WhatsApp at <strong className="text-emerald-400 font-mono">{formData.whatsappNumber}</strong> within 15-30 minutes.
                </div>
                
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-[#071438] hover:text-white border border-slate-700"
                  >
                    Submit Another Store
                  </button>
                  <a
                    href={AGENCY_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2"
                  >
                    <MessageSquareShare className="w-4 h-4" />
                    <span>Open Direct WhatsApp Now</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="border-b border-blue-900/50 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Store & Contact Information</h3>
                    <p className="text-xs text-slate-400">Fill in the details below to request your technical audit.</p>
                  </div>
                  <span className="text-xs font-mono text-[#FF8A00]">⚡ Turnaround: 24h</span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-xs text-rose-300 font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Grid 1: Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Name <span className="text-[#FF8A00]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#071438] border border-blue-900/60 focus:border-[#0066FF] focus:outline-none text-sm text-white placeholder-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Business / Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lumina Activewear"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#071438] border border-blue-900/60 focus:border-[#0066FF] focus:outline-none text-sm text-white placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Grid 2: Website URL & WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Website / Store URL <span className="text-[#FF8A00]">*</span>
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="https://yourstore.com"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071438] border border-blue-900/60 focus:border-[#0066FF] focus:outline-none text-sm text-white placeholder-slate-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      WhatsApp Number <span className="text-[#FF8A00]">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquareShare className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="+1 (555) 000-0000 or 01800..."
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071438] border border-blue-900/60 focus:border-[#0066FF] focus:outline-none text-sm text-white placeholder-slate-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Service Required Multi-select */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Services Required <span className="text-[#FF8A00]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableServices.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0066FF]/20 border border-[#0066FF] text-white'
                              : 'bg-[#071438] border border-blue-900/50 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span>{service}</span>
                          <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-[#0066FF] text-white' : 'bg-slate-800 text-transparent'
                          }`}>
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Monthly Ad Budget Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Monthly Advertising Budget
                  </label>
                  <select
                    value={formData.monthlyAdBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyAdBudget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#071438] border border-blue-900/60 focus:border-[#0066FF] focus:outline-none text-sm text-white"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0B1F4D] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tell us your main challenge (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Meta purchases don't match Shopify, GMC Misrepresentation ban, low ROAS..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#071438] border border-blue-900/60 focus:border-[#0066FF] focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>

                {/* Dual Action Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Standard Form Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-lg shadow-[#FF8A00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Queueing Audit...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Submit Free Audit Request</span>
                      </>
                    )}
                  </button>

                  {/* Send via WhatsApp Button */}
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-[#071438] hover:bg-[#0F2766] border border-emerald-500/50 hover:border-emerald-400 text-slate-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquareShare className="w-4 h-4 text-emerald-400" />
                    <span>Send Details on WhatsApp</span>
                  </button>

                </div>

                <div className="text-center text-[11px] text-slate-400">
                  🔒 We respect your privacy. No spam. Fast human review by Options IT Ltd engineers.
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
