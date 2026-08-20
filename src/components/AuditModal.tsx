import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MessageSquareShare, 
  CheckCircle2, 
  Globe, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AGENCY_CONFIG } from '../data/agencyData';
import { LeadFormData } from '../types';
import { apiClient } from '../services/apiClient';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose, preSelectedService }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    businessName: '',
    websiteUrl: '',
    whatsappNumber: '',
    services: preSelectedService ? [preSelectedService] : ['Server-Side Tracking (SST)'],
    monthlyAdBudget: '$2,500 - $5,000 / month',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

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

  const toggleService = (srv: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(srv);
      return {
        ...prev,
        services: exists ? prev.services.filter(s => s !== srv) : [...prev.services, srv]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.whatsappNumber.trim() || !formData.websiteUrl.trim()) {
      setErrorMessage('Please fill in Name, WhatsApp number, and Website URL.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await apiClient.submitAudit({
        name: formData.fullName,
        businessName: formData.businessName,
        website: formData.websiteUrl,
        phone: formData.whatsappNumber,
        trackingProblem: formData.services.join(', ') || 'Safari/iOS tracking & ROAS drop',
        adPlatform: 'Meta Ads + Google Ads'
      });

      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
      } catch (err) {
        // ignore
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Audit submission failed. Please try again.');
    }
  };

  const handleWhatsAppSend = () => {
    if (!formData.fullName.trim() || !formData.websiteUrl.trim()) {
      setErrorMessage('Please fill in your Name and Store URL.');
      return;
    }

    const message = `Hello Options IT Ltd!
I want to book a Free Tracking Audit.

• Name: ${formData.fullName}
• Store: ${formData.websiteUrl}
• Business: ${formData.businessName || 'N/A'}
• WhatsApp: ${formData.whatsappNumber || 'N/A'}
• Services: ${formData.services.join(', ') || 'All Services'}
• Budget: ${formData.monthlyAdBudget}

Please review my store!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/8801806301888?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-[#0B1F4D] border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#071438] text-slate-400 hover:text-white border border-blue-900/50 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Free Audit Queued!</h3>
            <p className="text-sm text-slate-300">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. Our senior engineers will inspect <strong className="text-[#0066FF] font-mono">{formData.websiteUrl}</strong> and reach out via WhatsApp at <strong className="text-emerald-400 font-mono">{formData.whatsappNumber}</strong>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-600"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-[11px] font-bold text-[#FF8A00] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Free Technical Audit (24h Delivery)
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                Book Your Store Tracking & Ads Audit
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Options IT Ltd helps identify missing pixel signals, duplicate events, and GMC violations.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 mb-4 rounded-xl bg-rose-950 text-xs text-rose-300 border border-rose-800">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071438] border border-blue-900/60 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Business / Brand
                  </label>
                  <input
                    type="text"
                    placeholder="Brand Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071438] border border-blue-900/60 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Store Website URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://yourbrand.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071438] border border-blue-900/60 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+8801806301888 or your number"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071438] border border-blue-900/60 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                  Select Services Needed
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-[#071438] rounded-xl border border-blue-900/50">
                  {availableServices.map((srv) => {
                    const isChecked = formData.services.includes(srv);
                    return (
                      <button
                        key={srv}
                        type="button"
                        onClick={() => toggleService(srv)}
                        className={`p-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors ${
                          isChecked ? 'bg-[#0066FF]/30 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate pr-2">{srv}</span>
                        <span className={`w-3.5 h-3.5 rounded text-[10px] flex items-center justify-center ${
                          isChecked ? 'bg-[#0066FF] text-white' : 'border border-slate-700'
                        }`}>
                          {isChecked ? '✓' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-md shadow-[#FF8A00]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Audit Request'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#071438] hover:bg-[#0F2766] border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquareShare className="w-4 h-4 text-emerald-400" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-400">
                Direct WhatsApp Helpline: <strong className="text-white">{AGENCY_CONFIG.whatsappNumber}</strong> | Domain: <strong className="text-[#0066FF]">{AGENCY_CONFIG.websiteDomain}</strong>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
