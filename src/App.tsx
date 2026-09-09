import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CursorGlow } from './components/CursorGlow';
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
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Interactive Cursor Spotlight Glow */}
      <CursorGlow />

      {/* Floating Glass Navbar */}
      <Navbar />

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

        {/* 13. Cinematic Final Call to Action */}
        <FinalCTA />
      </main>

      {/* Complete Footer */}
      <Footer />
    </div>
  );
};

export default App;
