import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TrackingArchitectureSection } from './components/TrackingArchitectureSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { RoasCalculatorSection } from './components/RoasCalculatorSection';
import { AboutSection } from './components/AboutSection';
import { LeadFormSection } from './components/LeadFormSection';
import { TestimonialsFaqSection } from './components/TestimonialsFaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StickyWhatsAppFloat } from './components/StickyWhatsAppFloat';
import { AuditModal } from './components/AuditModal';
import { AuthModal } from './components/admin/AuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ClientPortalModal } from './components/admin/ClientPortalModal';
import { apiClient } from './services/apiClient';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedAuditService, setSelectedAuditService] = useState<string | undefined>(undefined);
  
  // Auth & Management states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Record page view for agency analytics
    apiClient.recordPageView().catch(() => {});

    // Check stored user session
    const storedUser = apiClient.getUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleOpenAuditModal = (serviceTitle?: string) => {
    setSelectedAuditService(serviceTitle);
    setIsAuditModalOpen(true);
  };

  const handleSelectServiceForAudit = (serviceTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenAuditModal(serviceTitle);
    }
  };

  const handleOpenAuth = () => {
    if (currentUser) {
      if (currentUser.role === 'Client') {
        setIsClientPortalOpen(true);
      } else {
        setIsAdminDashboardOpen(true);
      }
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginSuccess = (user: any, token: string) => {
    setCurrentUser(user);
    if (user.role === 'Client') {
      setIsClientPortalOpen(true);
    } else {
      setIsAdminDashboardOpen(true);
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    setCurrentUser(null);
    setIsAdminDashboardOpen(false);
    setIsClientPortalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1F4D] text-slate-100 flex flex-col selection:bg-[#FF8A00] selection:text-white">
      
      {/* Sticky Header */}
      <Navbar 
        onOpenAudit={() => handleOpenAuditModal()} 
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section with Live Analytics Dashboard & CAPI Simulation */}
        <HeroSection onOpenAudit={() => handleOpenAuditModal()} />

        {/* 2. Services Section with all 8 core services */}
        <ServicesSection onSelectServiceForAudit={handleSelectServiceForAudit} />

        {/* 3. Why Choose Us with 5 pillars & Side-by-Side Comparison */}
        <WhyChooseUsSection onOpenAudit={() => handleOpenAuditModal()} />

        {/* 4. Technical Architecture: How Server-Side Tracking Works */}
        <TrackingArchitectureSection />

        {/* 5. Case Studies: Before & After Tracking Metrics */}
        <CaseStudiesSection onOpenAudit={() => handleOpenAuditModal()} />

        {/* 6. Interactive ROAS & Tracking Loss Recovery Calculator */}
        <RoasCalculatorSection onOpenAudit={() => handleOpenAuditModal()} />

        {/* 7. About Options IT Ltd */}
        <AboutSection onOpenAudit={() => handleOpenAuditModal()} />

        {/* 8. Lead Capture & Audit Booking Form */}
        <LeadFormSection preSelectedService={selectedAuditService} />

        {/* 9. Client Testimonials & Comprehensive FAQ */}
        <TestimonialsFaqSection />

        {/* 10. Official Agency Contacts */}
        <ContactSection onOpenAudit={() => handleOpenAuditModal()} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Button */}
      <StickyWhatsAppFloat />

      {/* Quick Booking Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        preSelectedService={selectedAuditService}
      />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Full-Screen Admin Dashboard */}
      {isAdminDashboardOpen && (
        <AdminDashboard
          user={currentUser}
          onLogout={handleLogout}
          onClose={() => setIsAdminDashboardOpen(false)}
        />
      )}

      {/* Dedicated Client Portal Modal */}
      {isClientPortalOpen && (
        <ClientPortalModal
          isOpen={isClientPortalOpen}
          onClose={() => setIsClientPortalOpen(false)}
          user={currentUser}
        />
      )}

    </div>
  );
}
