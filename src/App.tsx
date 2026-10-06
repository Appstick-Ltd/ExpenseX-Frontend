import React, { useEffect, useState } from 'react';
import { captureReferralCodeFromUrl } from './utils/referral';
import { PortalRouter } from './portal/PortalRouter';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CursorGlow } from './components/CursorGlow';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MobileQuickDock } from './components/MobileQuickDock';
import { QuickTour } from './components/QuickTour';
import { CaptureChannels } from './components/CaptureChannels';
import { AIEngine } from './components/AIEngine';
import { DashboardShowcase } from './components/DashboardShowcase';
import { SafeToSpend } from './components/SafeToSpend';
import { AIInsights } from './components/AIInsights';
import { AskExpenseX } from './components/AskExpenseX';
import { Budgets } from './components/Budgets';
import { SavingsGoals } from './components/SavingsGoals';
import { Privacy } from './components/Privacy';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { EarlyAccessModal } from './components/EarlyAccessModal';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { PricingPage } from './pages/PricingPage';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Global interceptor for standard local anchor links like /privacy-policy, /about, etc.
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/#')) {
        // Local path route
        e.preventDefault();
        window.history.pushState(null, '', href);
        handleLocationChange();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // If on consumer landing page
    if (!window.location.pathname.startsWith('/mc-portal')) {
      captureReferralCodeFromUrl();

      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Superadmin Portal
  if (currentPath.startsWith('/mc-portal')) {
    return <PortalRouter />;
  }

  // Render the appropriate page content based on currentPath
  const renderPage = () => {
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/privacy-policy' || currentPath === '/privacy') {
      return <PrivacyPolicyPage />;
    }
    if (currentPath === '/terms-of-service' || currentPath === '/terms') {
      return <TermsPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/pricing') {
      return <PricingPage />;
    }

    return (
      <>
        {/* Floating Glass Navbar */}
        <Navbar />

        {/* Mobile-Exclusive Floating Quick Action Dock */}
        <MobileQuickDock />

        <main style={{ flex: 1 }}>
          {/* 1. Uncluttered Hero with 3D Phone & Studio Light */}
          <Hero />

          {/* 2. Interactive Quick Tour (5 Steps) */}
          <QuickTour />

          {/* 3. Multi-channel Capture (Receipt, SMS, Email, Manual) */}
          <CaptureChannels />

          {/* 4. Financial Intelligence Engine & Deduplication */}
          <AIEngine />

          {/* 5. Unified Product Dashboard Showcase */}
          <DashboardShowcase />

          {/* 6. Safe to Spend Radial Metric */}
          <SafeToSpend />

          {/* 7. Explainable AI Insights */}
          <AIInsights />

          {/* 8. Ask ExpenseX Conversational AI Preview */}
          <AskExpenseX />

          {/* 9. Dynamic Envelopes & Budgets */}
          <Budgets />

          {/* 10. Autonomous Savings Goals */}
          <SavingsGoals />

          {/* 11. Strategic Roadmap */}
          <Roadmap />

          {/* 12. Privacy, Permissions & Data Autonomy */}
          <Privacy />

          {/* 13. High-Authority SEO Knowledge Base & FAQs */}
          <FAQ />

          {/* 14. Cinematic Final Call to Action */}
          <FinalCTA />
        </main>

        {/* Complete Footer */}
        <Footer />
      </>
    );
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Top Neon Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Interactive Cursor Spotlight Glow */}
      <CursorGlow />

      {/* Early Bird Access Modal Dialogue (ALWAYS mounted and active for all routes) */}
      <EarlyAccessModal />

      {renderPage()}
    </div>
  );
};

export default App;
