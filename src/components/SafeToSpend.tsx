import React, { useState } from 'react';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick, playAIPulse } from '../utils/audio';
import { Sparkles, SlidersHorizontal, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';

interface Scenario {
  name: string;
  bankBalance: number;
  rentBills: number;
  savingsGoal: number;
  committedBudgets: number;
}

const SCENARIOS: Scenario[] = [
  {
    name: 'Standard Dhaka Runway',
    bankBalance: 63500,
    rentBills: 22000,
    savingsGoal: 15000,
    committedBudgets: 8000,
  },
  {
    name: 'Festival & Eid Month',
    bankBalance: 88000,
    rentBills: 24000,
    savingsGoal: 18000,
    committedBudgets: 14000,
  },
  {
    name: 'Mid-Month Lean Budget',
    bankBalance: 42000,
    rentBills: 19000,
    savingsGoal: 10000,
    committedBudgets: 6000,
  },
];

export const SafeToSpend: React.FC = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [customBalance, setCustomBalance] = useState<number | null>(null);

  const scenario = SCENARIOS[selectedScenarioIdx];
  const balance = customBalance !== null ? customBalance : scenario.bankBalance;
  const safeToSpend = Math.max(0, balance - scenario.rentBills - scenario.savingsGoal - scenario.committedBudgets);

  // SVG Radial Ring calculation
  const radius = 130;
  const circumference = 2 * Math.PI * radius; // ~816.8
  const safeRatio = Math.min(1, Math.max(0.08, safeToSpend / balance));
  const strokeOffset = circumference * (1 - safeRatio * 0.75); // display ~75% max arc for dramatic gauge

  const isHealthy = safeToSpend >= 14000;
  const isModerate = safeToSpend >= 8000 && safeToSpend < 14000;

  const handleScenarioChange = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setCustomBalance(null);
    playMicroClick();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomBalance(Number(e.target.value));
    playAIPulse();
  };

  return (
    <section
      id="safe-to-spend"
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container">
        <Card3DTilt
          className="glass-card safe-to-spend-card"
          maxTilt={5}
          style={{
            padding: '60px 48px',
            borderRadius: '28px',
            border: '1px solid rgba(139, 92, 246, 0.35)',
            background: 'radial-gradient(ellipse at 80% 50%, rgba(109, 61, 245, 0.18) 0%, rgba(11, 16, 32, 0.96) 75%)',
            boxShadow: '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(109, 61, 245, 0.15)',
          }}
        >
          <div
            className="safe-to-spend-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Narrative & Interactive Deductive Breakdown */}
            <div>
              <div className="section-eyebrow" style={{ marginBottom: '20px' }}>
                <span className="section-eyebrow-dot" />
                <span>PREDICTIVE CASHFLOW SIMULATOR</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(32px, 4.2vw, 54px)',
                  fontWeight: 800,
                  lineHeight: 1.08,
                  marginBottom: '18px',
                }}
              >
                Balance isn’t <br />
                <span className="text-gradient-purple">the whole story.</span>
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '28px',
                  maxWidth: '520px',
                }}
              >
                Traditional apps show your current bank balance. ExpenseX AI computes your true Safe to Spend by deducting pending bills, scheduled rent, savings goals, and everyday recurring expenses.
              </p>

              {/* Scenario Preset Selector */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '10px' }}>
                  <SlidersHorizontal size={14} color="var(--purple-light)" />
                  <span>INTERACTIVE LIVE SIMULATION:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {SCENARIOS.map((sc, idx) => (
                    <button
                      key={sc.name}
                      onClick={() => handleScenarioChange(idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: selectedScenarioIdx === idx ? 'rgba(109, 61, 245, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                        border: selectedScenarioIdx === idx ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                        color: selectedScenarioIdx === idx ? '#FFFFFF' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {sc.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Balance Slider */}
              <div
                style={{
                  padding: '14px 18px',
                  background: 'rgba(5, 7, 13, 0.6)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Simulate Bank Balance
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#34D399' }}>
                    ${balance.toLocaleString('en-US')}
                  </span>
                </div>
                <input
                  type="range"
                  min="25000"
                  max="140000"
                  step="1000"
                  value={balance}
                  onChange={handleSliderChange}
                  style={{
                    width: '100%',
                    accentColor: '#8B5CF6',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {/* Deductive Breakdown List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Bank balance item */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Bank Balance</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#34D399' }}>
                    ${balance.toLocaleString('en-US')}
                  </span>
                </div>

                {/* Upcoming rent & bills */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Upcoming Rent & Bills</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#F87171' }}>
                    -${scenario.rentBills.toLocaleString('en-US')}
                  </span>
                </div>

                {/* Savings Goal */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Savings Goal Allocation</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#F87171' }}>
                    -${scenario.savingsGoal.toLocaleString('en-US')}
                  </span>
                </div>

                {/* Committed Budgets */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Committed Budgets</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#F87171' }}>
                    -${scenario.committedBudgets.toLocaleString('en-US')}
                  </span>
                </div>

                {/* True Safe to Spend Highlight */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'rgba(109, 61, 245, 0.25)',
                    border: '1px solid rgba(139, 92, 246, 0.5)',
                    boxShadow: '0 4px 20px rgba(109, 61, 245, 0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="var(--purple-light)" />
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>True Safe to Spend</span>
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--purple-light)' }}>
                    ${safeToSpend.toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Radial Ring Gauge Visualizer */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Radial SVG Ring */}
              <div
                className="safe-gauge-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '300px',
                  aspectRatio: '1/1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 320 320"
                  style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
                >
                  {/* Background Track */}
                  <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="18"
                    fill="none"
                  />
                  {/* Active Safe Margin Gradient Arc with smooth transition */}
                  <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="url(#safeGaugeGrad)"
                    strokeWidth="18"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeOffset}
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      transition: 'stroke-dashoffset 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      filter: 'drop-shadow(0 0 16px rgba(109, 61, 245, 0.6))',
                    }}
                  />
                  <defs>
                    <linearGradient id="safeGaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="60%" stopColor="#6D3DF5" />
                      <stop offset="100%" stopColor="#FF5A36" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Ring Text Content */}
                <div
                  style={{
                    position: 'absolute',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      color: 'var(--purple-light)',
                      marginBottom: '4px',
                    }}
                  >
                    SAFE TO SPEND
                  </span>
                  <div
                    style={{
                      fontSize: 'clamp(28px, 7vw, 44px)',
                      fontWeight: 900,
                      letterSpacing: '-0.04em',
                      color: '#FFFFFF',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    ${safeToSpend.toLocaleString('en-US')}
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      marginTop: '6px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      background: isHealthy ? 'rgba(52, 211, 153, 0.15)' : isModerate ? 'rgba(109, 61, 245, 0.2)' : 'rgba(255, 90, 54, 0.2)',
                      color: isHealthy ? '#34D399' : isModerate ? '#A78BFA' : '#FF9A7B',
                      border: `1px solid ${isHealthy ? 'rgba(52, 211, 153, 0.3)' : isModerate ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 90, 54, 0.4)'}`,
                    }}
                  >
                    {isHealthy ? <ShieldCheck size={14} /> : isModerate ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span>{isHealthy ? 'Optimal Buffer' : isModerate ? 'Moderate Margin' : 'Tight Buffer'}</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginTop: '20px',
                  maxWidth: '360px',
                }}
              >
                Recalculated in real time after every single voice note, receipt, and debit SMS.
              </div>
            </div>
          </div>
        </Card3DTilt>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .safe-to-spend-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .safe-to-spend-card {
            padding: 24px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
