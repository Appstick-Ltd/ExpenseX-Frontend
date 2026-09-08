import React from 'react';
import { PHONE_MOCKUP_DATA } from '../utils/constants';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const DashboardShowcase: React.FC = () => {
  return (
    <section
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: '100px',
        paddingBottom: '120px',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>UNIFIED DASHBOARD</span>
          </div>

          <h2 className="section-headline">
            One clear view <br />
            <span className="text-gradient-purple">of your financial life.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            No cluttered spreadsheets. Just intelligent hierarchy that tells you exactly where you stand in seconds.
          </p>
        </div>

        {/* High-Fidelity Large Dashboard Mockup Frame with 3D Tilt */}
        <Card3DTilt
          className="glass-card"
          maxTilt={3}
          style={{
            padding: '36px',
            borderRadius: '24px',
            background: 'linear-gradient(180deg, rgba(16, 23, 46, 0.9) 0%, rgba(8, 11, 21, 0.98) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(109, 61, 245, 0.15)',
          }}
        >
          {/* Top Bar of Mockup */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '32px',
            }}
          >
            <div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Good morning, Tanvir</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>September Financial Health</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '13px',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399' }} />
                <span>All 4 Channels Synced</span>
              </div>
            </div>
          </div>

          {/* 3 Metric Cards Grid */}
          <div
            className="dashboard-metrics-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '32px',
            }}
          >
            {/* Card 1: Safe to Spend Hero */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.25), rgba(15, 22, 45, 0.8))',
                border: '1px solid rgba(139, 92, 246, 0.4)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple-light)' }}>
                SAFE TO SPEND TODAY
              </div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', margin: '8px 0' }}>
                {PHONE_MOCKUP_DATA.safeToSpend}
              </div>
              <div style={{ fontSize: '12px', color: '#34D399', fontWeight: 600 }}>
                ✓ Calculated after all pending bills & goals
              </div>
            </div>

            {/* Card 2: Income & Expense */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
                MONTHLY CASHFLOW
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#34D399' }}>Income</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>{PHONE_MOCKUP_DATA.income}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#F87171' }}>Expenses</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>{PHONE_MOCKUP_DATA.expenses}</div>
                </div>
              </div>
              <div
                style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  marginTop: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                }}
              >
                <div style={{ width: '58%', background: '#8B5CF6' }} />
                <div style={{ width: '42%', background: '#FF5A36' }} />
              </div>
            </div>

            {/* Card 3: Financial Health Score */}
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
                  FINANCIAL HEALTH
                </div>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0' }}>
                  78 <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
                <div style={{ fontSize: '12px', color: '#34D399', fontWeight: 600 }}>Top 12% in discipline</div>
              </div>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(109, 61, 245, 0.15)',
                  border: '2px solid #8B5CF6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--purple-light)',
                  boxShadow: '0 0 16px rgba(109, 61, 245, 0.4)',
                }}
              >
                <ShieldCheck size={28} />
              </div>
            </div>
          </div>

          {/* Bottom Split: Recent Transactions + AI Assistant Insights */}
          <div
            className="dashboard-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '24px',
            }}
          >
            {/* Recent Transactions List */}
            <div
              style={{
                background: 'rgba(5, 7, 13, 0.6)',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '16px' }}>
                Recent Automated Captures
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PHONE_MOCKUP_DATA.recentTransactions.map((tx) => (
                  <div
                    key={tx.merchant}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: tx.amount.startsWith('+') ? 'rgba(52, 211, 153, 0.15)' : 'rgba(109, 61, 245, 0.2)',
                          color: tx.amount.startsWith('+') ? '#34D399' : 'var(--purple-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                        }}
                      >
                        {tx.merchant.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>{tx.merchant}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tx.category}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: tx.amount.startsWith('+') ? '#34D399' : '#FFFFFF' }}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Insight Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 90, 54, 0.1), rgba(109, 61, 245, 0.15))',
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 90, 54, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FF9A7B',
                    marginBottom: '12px',
                  }}
                >
                  <Sparkles size={14} />
                  <span>AI INTELLIGENCE BRIEF</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4, marginBottom: '8px' }}>
                  "{PHONE_MOCKUP_DATA.aiInsight}"
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Weekend dining reduced by $1,200. You've met 92% of your monthly budget milestones.
                </div>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--purple-light)', fontWeight: 600, marginTop: '16px' }}>
                Auto-updated 4 minutes ago via SMS sync
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dashboard-metrics-grid, .dashboard-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
