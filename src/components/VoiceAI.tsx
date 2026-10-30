import React, { useState } from 'react';
import { Mic, Sparkles, CheckCircle2, Shield, Cpu, Utensils, Car, ShoppingBag, Briefcase } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick } from '../utils/audio';

interface VoiceScenario {
  id: string;
  label: string;
  spokenText: string;
  parsed: {
    merchant: string;
    amount: string;
    category: string;
    date: string;
    confidence: string;
    envelopeEffect: string;
  };
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
}

const VOICE_SCENARIOS: VoiceScenario[] = [
  {
    id: 'dinner',
    label: 'Dining Out',
    spokenText: '"I spent $42 on dinner at Sweetgreen yesterday evening."',
    parsed: {
      merchant: 'Sweetgreen',
      amount: '$42.00',
      category: 'Food & Dining',
      date: 'Yesterday, 8:15 PM',
      confidence: '99.4%',
      envelopeEffect: '$362 / $500 budget remaining',
    },
    icon: Utensils,
  },
  {
    id: 'commute',
    label: 'Ride Share',
    spokenText: '"Paid $18.50 for an Uber ride to the office this morning."',
    parsed: {
      merchant: 'Uber',
      amount: '$18.50',
      category: 'Transportation',
      date: 'Today, 9:20 AM',
      confidence: '99.8%',
      envelopeEffect: '$181.50 / $250 budget remaining',
    },
    icon: Car,
  },
  {
    id: 'groceries',
    label: 'Groceries',
    spokenText: '"Spent $78.30 on weekly groceries at Trader Joe\'s."',
    parsed: {
      merchant: "Trader Joe's",
      amount: '$78.30',
      category: 'Groceries',
      date: 'Today, 2:45 PM',
      confidence: '98.9%',
      envelopeEffect: '$221.70 / $400 budget remaining',
    },
    icon: ShoppingBag,
  },
  {
    id: 'freelance',
    label: 'Income Memo',
    spokenText: '"Received $1,250 freelance design retainer from client."',
    parsed: {
      merchant: 'Client Retainer',
      amount: '+$1,250.00',
      category: 'Income / Earnings',
      date: 'Today, 11:00 AM',
      confidence: '99.9%',
      envelopeEffect: 'Transferred to Safe-to-Spend cashflow',
    },
    icon: Briefcase,
  },
];

export const VoiceAI: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<VoiceScenario>(VOICE_SCENARIOS[0]);
  const [isListening, setIsListening] = useState(false);

  const handleSelectScenario = (scenario: VoiceScenario) => {
    playMicroClick();
    setActiveScenario(scenario);
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
    }, 1200);
  };

  const IconComponent = activeScenario.icon;
  const isIncome = activeScenario.parsed.amount.startsWith('+');

  return (
    <section
      id="voice-ai"
      className="section-wrapper voice-ai-section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
        paddingTop: '90px',
        paddingBottom: '100px',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="bg-ambient-blur"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%) translateZ(0)',
          willChange: 'transform',
          width: '900px',
          height: '420px',
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.16) 0%, rgba(255, 90, 54, 0.05) 50%, transparent 80%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 52px auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            <Mic size={13} style={{ marginRight: '6px', color: 'var(--purple-light)' }} />
            <span>VOICE FINANCIAL INTELLIGENCE</span>
          </div>

          <h2
            className="section-headline"
            style={{
              margin: '0 auto 18px auto',
              lineHeight: 1.18,
            }}
          >
            <span>Your Voice. Your Money.</span>
            <br />
            <span className="text-gradient-purple">One Conversation.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Simply speak naturally, and let AI help turn your everyday conversations into organized financial records. No manual typing, no complex category picking.
          </p>

          {/* Interactive Scenario Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '28px',
            }}
          >
            {VOICE_SCENARIOS.map((item) => {
              const isSelected = activeScenario.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectScenario(item)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected ? 'rgba(109, 61, 245, 0.28)' : 'rgba(255, 255, 255, 0.04)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    border: isSelected ? '1px solid rgba(167, 139, 250, 0.55)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected ? '0 0 16px rgba(109, 61, 245, 0.35)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <item.icon size={14} style={{ color: isSelected ? '#A78BFA' : 'var(--text-muted)' }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Stage Voice Transformation Showcase */}
        <div
          className="voice-showcase-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 1.1fr',
            alignItems: 'center',
            gap: '24px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* Stage 1: Spoken Voice Wave Input Card */}
          <Card3DTilt
            className="glass-card"
            maxTilt={4}
            style={{
              padding: '32px',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, rgba(17, 24, 48, 0.85) 0%, rgba(9, 12, 24, 0.95) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(109, 61, 245, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '360px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#FF7A59', textTransform: 'uppercase' }}>
                  STAGE 1 • NATURAL VOICE CAPTURE
                </span>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>Ephemeral Audio</span>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: 'rgba(5, 7, 16, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6D3DF5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 0 24px rgba(109, 61, 245, 0.65)',
                    flexShrink: 0,
                  }}
                >
                  <Mic size={26} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'var(--purple-light)', fontWeight: 700, letterSpacing: '0.06em' }}>
                    AUDIO BUFFER • LIVE STREAM
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px', marginTop: '6px' }}>
                    {[0.3, 0.7, 0.4, 0.9, 0.5, 1.0, 0.6, 0.8, 0.3, 0.9, 0.5, 0.7, 0.4, 0.8, 0.3, 0.6].map((delay, i) => (
                      <div
                        key={i}
                        className="soundwave-bar"
                        style={{
                          flex: 1,
                          animationDelay: `${delay}s`,
                          background: 'linear-gradient(180deg, #A78BFA, #FF5A36)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'rgba(109, 61, 245, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  fontSize: '15.5px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  lineHeight: 1.5,
                  fontStyle: 'italic',
                }}
              >
                {activeScenario.spokenText}
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Auto speech recognition</span>
              <span style={{ color: '#34D399', fontWeight: 600 }}>Zero typing needed</span>
            </div>
          </Card3DTilt>

          {/* Center Connection Indicator */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(109, 61, 245, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C084FC',
                boxShadow: '0 0 20px rgba(109, 61, 245, 0.4)',
              }}
            >
              <Cpu size={20} />
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
              NLP
            </span>
          </div>

          {/* Stage 2 & 3: Extracted Entity Ledger Entry */}
          <Card3DTilt
            className="glass-card"
            maxTilt={4}
            style={{
              padding: '32px',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, rgba(17, 24, 48, 0.85) 0%, rgba(9, 12, 24, 0.95) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(16, 185, 129, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '360px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', color: '#34D399', textTransform: 'uppercase' }}>
                  STAGE 2 &bull; STRUCTURED TRANSACTION ENTRY
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                  }}
                >
                  Confidence: {activeScenario.parsed.confidence}
                </span>
              </div>

              <div
                style={{
                  padding: '22px',
                  borderRadius: '16px',
                  background: 'rgba(5, 7, 16, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: 'rgba(109, 61, 245, 0.2)',
                        border: '1px solid rgba(139, 92, 246, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#A78BFA',
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                        {activeScenario.parsed.merchant}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <span>{activeScenario.parsed.category}</span>
                        <span>&bull;</span>
                        <span>{activeScenario.parsed.date}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '22px',
                        fontWeight: 900,
                        color: isIncome ? '#34D399' : '#FFFFFF',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {activeScenario.parsed.amount}
                    </div>
                    <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, marginTop: '2px' }}>
                      Auto Verified
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Sparkles size={14} color="#A78BFA" />
                  <span>{activeScenario.parsed.envelopeEffect}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <Shield size={14} color="#34D399" />
                <span>Audio is processed in ephemeral memory and discarded immediately upon transcription.</span>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', fontSize: '12px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Status</span>
              <span style={{ color: '#34D399', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <CheckCircle2 size={13} /> Active in Android &amp; iOS Apps
              </span>
            </div>
          </Card3DTilt>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .voice-showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
