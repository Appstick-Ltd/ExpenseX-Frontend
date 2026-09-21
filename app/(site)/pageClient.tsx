'use client';
import React, { useEffect } from 'react';
import { captureReferralCodeFromUrl } from '../helpers/referral';
import { Hero } from '../components/home/Hero';
import { QuickTour } from '../components/home/QuickTour';
import { CaptureChannels } from '../components/home/CaptureChannels';
import { AIEngine } from '../components/home/AIEngine';
import { DashboardShowcase } from '../components/home/DashboardShowcase';
import { SafeToSpend } from '../components/home/SafeToSpend';
import { AIInsights } from '../components/home/AIInsights';
import { AskExpenseX } from '../components/home/AskExpenseX';
import { Budgets } from '../components/home/Budgets';
import { SavingsGoals } from '../components/home/SavingsGoals';
import { Roadmap } from '../components/home/Roadmap';
import { Privacy } from '../components/home/Privacy';
import { FAQ } from '../components/home/FAQ';
import { FinalCTA } from '../components/home/FinalCTA';

export default function PageClient() {
  useEffect(() => {
    // Automatically capture referral code if present in URL
    captureReferralCodeFromUrl();

    // Clean any hash from address bar so URL remains pure
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
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
    </>
  );
}
