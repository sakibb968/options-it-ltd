import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageSquareShare, 
  CheckCircle2, 
  Star 
} from 'lucide-react';
import { FAQS, AGENCY_CONFIG } from '../data/agencyData';

export const TestimonialsFaqSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Julian Hayes',
      role: 'CEO, Apex Performance Nutrition',
      content: 'We migrated our Shopify Plus store to Options IT Server-Side CAPI. Our Meta Event Match Quality jumped to 9.6 and our CPA dropped by 31% in the first 14 days. Truly enterprise quality.',
      rating: 5,
      platform: 'Shopify Plus'
    },
    {
      name: 'Fatima Al-Mansoor',
      role: 'Head of E-Commerce, Silk & Velvet D2C',
      content: 'We had an impossible GMC Misrepresentation suspension for 2 months. Options IT audited our site, identified 6 subtle compliance errors, and had our Google Merchant Center approved in 4 days.',
      rating: 5,
      platform: 'WooCommerce'
    },
    {
      name: 'Oliver Brandt',
      role: 'Founder, Nordic Lighting Studio',
      content: 'Finally, our GA4 e-commerce revenue reconciles 100% with our Shopify admin. No more duplicate payment events or missing Safari purchases. The best investment we made this quarter.',
      rating: 5,
      platform: 'Shopify 2.0'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0B1F4D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Merchant Reviews */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#FF8A00] uppercase tracking-wider mb-3">
              Trusted by 500+ eCommerce Brands
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Brand Owners Say About Options IT Ltd
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#071438] border border-blue-900/50 flex flex-col justify-between hover:border-blue-700/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-400 ml-2 font-mono">{item.platform}</span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-900/40">
                  <div className="text-sm font-bold text-white">{item.name}</div>
                  <div className="text-xs text-[#0066FF] font-medium mt-0.5">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-bold text-[#0066FF] uppercase tracking-wider mb-3">
              FAQ
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Everything you need to know about our tracking implementation & ads optimization services.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#071438] border border-blue-900/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-blue-950/40 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#0066FF] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-blue-900/40 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ footer CTA */}
          <div className="mt-8 text-center p-6 rounded-2xl bg-[#071438]/60 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">Have a question not listed here?</h4>
              <p className="text-xs text-slate-400">Ask us directly on WhatsApp for an immediate response.</p>
            </div>
            <a
              href={AGENCY_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-2 shrink-0 transition-colors"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>Ask on WhatsApp ({AGENCY_CONFIG.whatsappNumber})</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
