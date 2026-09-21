'use client';
import React, { type ReactNode } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ScrollProgressBar } from '../components/ui/ScrollProgressBar';
import { CursorGlow } from '../components/ui/CursorGlow';
import { MobileQuickDock } from '../components/layout/MobileQuickDock';
import { EarlyAccessModal } from '../components/modal/EarlyAccessModal';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="app-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Top Neon Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Interactive Cursor Spotlight Glow */}
      <CursorGlow />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Mobile-Exclusive Floating Quick Action Dock */}
      <MobileQuickDock />

      {/* Early Bird Access Modal Dialogue */}
      <EarlyAccessModal />

      <main style={{ flex: 1 }}>{children}</main>

      {/* Complete Footer */}
      <Footer />
    </div>
  );
}
