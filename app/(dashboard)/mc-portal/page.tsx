'use client';
import React from 'react';
import { LayoutDashboard } from 'lucide-react';

interface OverviewProps {
  onNavigateTab?: (tabId: string) => void;
}

export default function AdminOverviewPage({ onNavigateTab }: OverviewProps) {
  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px 0', color: 'var(--mc-text-main)' }}>
          Dashboard Overview
        </h1>
        <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
          Welcome to ExpenseX Management Console
        </p>
      </div>

      {/* Clean Placeholder Container */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1.5px dashed var(--mc-border)',
          borderRadius: 14,
          padding: '60px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 360,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.12), rgba(139, 92, 246, 0.06))',
            color: 'var(--mc-brand-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <LayoutDashboard size={26} />
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--mc-text-main)', margin: '0 0 6px 0' }}>
          Dashboard Ready
        </h3>
        <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0, maxWidth: 440, lineHeight: 1.5 }}>
          Dashboard content cleared. You can now provide the new data and structure whenever you are ready.
        </p>
      </div>
    </div>
  );
}

export { AdminOverviewPage as Overview };
