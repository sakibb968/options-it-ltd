import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Menu, 
  X, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquareShare,
  Sparkles,
  Lock,
  UserCheck
} from 'lucide-react';
import { AGENCY_CONFIG } from '../data/agencyData';

interface NavbarProps {
  onOpenAudit: (serviceId?: string) => void;
  onOpenAuth: () => void;
  currentUser?: any;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit, onOpenAuth, currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'ROAS Calculator', href: '#calculator' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#071438] border-b border-blue-900/40 text-xs py-2 px-4 text-center text-slate-300 flex items-center justify-center gap-3 relative z-50">
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Server-Side Tracking & GMC Fix Available
        </span>
        <span className="hidden md:inline text-slate-500">•</span>
        <span className="hidden md:inline text-slate-300">
          Direct WhatsApp Support: <strong className="text-white font-mono">{AGENCY_CONFIG.whatsappNumber}</strong>
        </span>
        <a 
          href={AGENCY_CONFIG.whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#FF8A00] hover:underline font-semibold flex items-center gap-1 ml-2"
        >
          Chat Now <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0B1F4D]/95 backdrop-blur-md border-b border-blue-500/20 shadow-xl shadow-black/20 py-3' 
            : 'bg-[#0B1F4D]/80 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0B1F4D] border border-blue-400/40 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-xl tracking-tight text-white">
                  OPTIONS <span className="text-[#0066FF]">IT</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FF8A00]/20 text-[#FF8A00] border border-[#FF8A00]/30 uppercase tracking-wider">
                  LTD
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
                Tracking & Ads Optimization
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#071438]/80 px-3 py-1.5 rounded-full border border-blue-900/50">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-blue-600/20 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Admin / Client Portal Button */}
            <button
              onClick={onOpenAuth}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentUser 
                  ? 'bg-blue-900/80 text-blue-200 border border-blue-400/40 hover:bg-blue-800' 
                  : 'bg-[#071438] text-slate-300 border border-blue-900/60 hover:bg-[#0F2766] hover:text-white'
              }`}
              title={currentUser ? `Logged in as ${currentUser.name}` : 'Login to Admin CRM / Client Portal'}
            >
              {currentUser ? <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-[#0066FF]" />}
              <span>{currentUser ? (currentUser.role === 'Client' ? 'Client Portal' : 'Admin CRM') : 'Portal Login'}</span>
            </button>

            {/* WhatsApp Consultation Link */}
            <a
              href={AGENCY_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-[#071438] hover:bg-[#0F2766] border border-emerald-500/30 flex items-center gap-2 transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping-slow"></span>
              <MessageSquareShare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>

            {/* Book Free Audit CTA */}
            <button
              onClick={() => onOpenAudit()}
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] hover:from-[#FFA02E] hover:to-[#FF8A00] shadow-md shadow-[#FF8A00]/25 hover:shadow-lg hover:shadow-[#FF8A00]/40 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Free Audit</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#071438] border border-blue-900/50 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071438] border-b border-blue-900/50 px-4 pt-3 pb-6 mt-3 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-blue-600/15"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-blue-900/40 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-900/60 border border-blue-700 flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{currentUser ? 'Open Dashboard / Portal' : 'Admin & Client Portal Login'}</span>
              </button>

              <a
                href={AGENCY_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-center text-sm font-semibold text-white bg-[#0F2766] border border-emerald-500/40 flex items-center justify-center gap-2"
              >
                <MessageSquareShare className="w-4 h-4 text-emerald-400" />
                WhatsApp: {AGENCY_CONFIG.whatsappNumber}
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full py-3 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#FF8A00] to-[#EA580C] shadow-lg shadow-[#FF8A00]/30"
              >
                Book Free Audit
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
