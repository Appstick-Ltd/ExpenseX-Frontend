import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, Cpu, GitMerge } from 'lucide-react';
import { AI_PIPELINE_STAGES, RAW_MERCHANT_EXAMPLES } from '../utils/constants';
import { NeuralCore3D } from './3d/NeuralCore3D';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick } from '../utils/audio';

export const AIEngine: React.FC = () => {
  const [selectedMerchantIndex, setSelectedMerchantIndex] = useState(0);
  const currentExample = RAW_MERCHANT_EXAMPLES[selectedMerchantIndex];

  return (
    <section
      id="ai-engine"
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        overflow: 'hidden',
      }}
    >
      {/* Background glow lines */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.12) 0%, rgba(255, 90, 54, 0.04) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow & Headline */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
            <span className="section-eyebrow-dot" />
            <span>FINANCIAL INTELLIGENCE ENGINE</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            From raw signals <br />
            to financial <span className="text-gradient-purple">intelligence.</span>
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A high-speed neural pipeline that extracts, normalizes, deduplicates, and derives actionable clarity from unstructured financial noise.
          </p>
        </div>

        {/* Pipeline Architecture Box */}
        <div
          className="glass-card ai-pipeline-card"
          style={{
            padding: '36px',
            marginBottom: '36px',
            borderRadius: '24px',
          }}
        >
          {/* Autonomous Pipeline Architecture Header */}
          <div className="pipeline-header" style={{ marginBottom: '24px' }}>
            <div
              className="pipeline-meta-bar"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--purple-light)',
                  textTransform: 'uppercase',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'rgba(109, 61, 245, 0.2)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--purple-light)',
                    flexShrink: 0,
                  }}
                >
                  <Cpu size={15} />
                </div>
                <span>CORE AI ENGINE</span>
              </div>

              <div className="badge-live">
                <span>ACTIVE SYSTEM</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <h3
                style={{
                  fontSize: 'clamp(18px, 3.2vw, 22px)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: 0,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                }}
              >
                Autonomous Pipeline Architecture
              </h3>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#34D399',
                    boxShadow: '0 0 8px #34D399',
                    flexShrink: 0,
                  }}
                />
                <span>Average latency: ~140ms end-to-end</span>
              </div>
            </div>
          </div>

          {/* Horizontal Stepper Grid with glowing stream beam */}
          <div
            className="pipeline-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden',
              padding: '6px 0',
            }}
          >
            {/* Glowing Pipeline Data Beam */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '160px',
                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.35), rgba(255, 90, 54, 0.35), transparent)',
                filter: 'blur(14px)',
                animation: 'pipelinePulse 4s infinite linear',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {AI_PIPELINE_STAGES.map((stage) => (
              <div
                key={stage.step}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '14px',
                  padding: '18px 14px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'var(--purple-light)',
                    marginBottom: '8px',
                    letterSpacing: '0.1em',
                  }}
                >
                  STEP {stage.step}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{stage.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{stage.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Neural Core Interactive Showcase */}
        <div
          className="glass-card neural-core-showcase"
          style={{
            padding: '36px',
            marginBottom: '36px',
            borderRadius: '24px',
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '36px',
            alignItems: 'center',
            background: 'radial-gradient(ellipse at left, rgba(109, 61, 245, 0.22) 0%, rgba(8, 11, 21, 0.95) 70%)',
            border: '1px solid rgba(139, 92, 246, 0.35)',
          }}
        >
          {/* Interactive Three.js 3D Neural Core */}
          <NeuralCore3D />

          <div>
            <div className="section-eyebrow" style={{ marginBottom: '14px' }}>
              <span className="section-eyebrow-dot" />
              <span>PROPRIETARY COGNITIVE LAYER</span>
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '14px', lineHeight: 1.2 }}>
              Beyond simple rules. <br />
              <span className="text-gradient-purple">Continuous financial comprehension.</span>
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              ExpenseX AI does not rely on rigid keywords. Our multi-modal reasoning engine continuously cross-references spoken phrases, scanned paper slips, SMS debits, and email receipts to maintain a self-healing, truthful ledger of your wealth.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MERCHANT GRAPH</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                  120,000+ Brands
                </div>
              </div>
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DEDUPLICATION ACCURACY</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>
                  99.8% Precision
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Features Grid */}
        <div
          className="ai-features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '28px',
          }}
        >
          {/* Section 30: AI Merchant Recognition & Consolidation */}
          <Card3DTilt className="glass-card ai-feature-card" style={{ padding: '36px', borderRadius: '24px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--purple-light)',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              <Layers size={15} />
              <span>MERCHANT RECOGNITION</span>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              Messy descriptors, resolved cleanly.
            </h3>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Whether your statement reads "AMZN Mktp", "AMAZON.COM", or "AMZN", ExpenseX AI resolves them into one normalized brand entity with verified logos.
            </p>

            {/* Interactive demo selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {RAW_MERCHANT_EXAMPLES.map((ex, idx) => (
                <button
                  key={ex.clean}
                  onClick={() => {
                    setSelectedMerchantIndex(idx);
                    playMicroClick();
                  }}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    background: selectedMerchantIndex === idx ? 'rgba(109, 61, 245, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: selectedMerchantIndex === idx ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: selectedMerchantIndex === idx ? '#FFFFFF' : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {ex.clean}
                </button>
              ))}
            </div>

            {/* Transformation stage */}
            <div
              style={{
                background: 'rgba(5, 7, 13, 0.8)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: '11px', color: '#F87171', fontWeight: 700, marginBottom: '6px' }}>
                RAW INCOMING STRING:
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                "{currentExample.raw}"
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  color: 'var(--purple-light)',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                <Sparkles size={14} />
                <span>RESOLVED VIA ENTITY GRAPH</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  background: 'rgba(109, 61, 245, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#1F2937',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      color: '#FFFFFF',
                    }}
                  >
                    {currentExample.clean.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>{currentExample.clean}</div>
                    <div style={{ fontSize: '12px', color: '#34D399' }}>{currentExample.category}</div>
                  </div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{currentExample.amount}</div>
              </div>
            </div>
          </Card3DTilt>

          {/* Section 31: Cross-Channel Duplicate Detection */}
          <Card3DTilt className="glass-card ai-feature-card" style={{ padding: '36px', borderRadius: '24px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#FF9A7B',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              <GitMerge size={15} />
              <span>DUPLICATE SUPPRESSION</span>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              Zero multi-channel double counting.
            </h3>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              When you pay at a restaurant, you might receive a paper receipt, an SMS charge alert, and an email invoice. AI fuses them into one single truthful transaction.
            </p>

            {/* Tri-signal fusion box */}
            <div
              style={{
                background: 'rgba(5, 7, 13, 0.8)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>📄 Receipt Camera</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>$2,450 • Agora Superstore</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>💬 Bank SMS Alert</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>$2,450 • Agora POS</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>✉️ Email Digital Receipt</span>
                  <span style={{ color: '#FFFFFF', fontWeight: 600 }}>$2,450 • Agora Gulshan</span>
                </div>
              </div>

              {/* Deduplication result */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 90, 54, 0.12)',
                  border: '1px solid rgba(255, 90, 54, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#FF7A59" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                    Potential Duplicate Detected
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255, 90, 54, 0.2)',
                    color: '#FFA07A',
                    fontWeight: 700,
                  }}
                >
                  Consolidated
                </span>
              </div>
            </div>
          </Card3DTilt>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pipeline-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .ai-features-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .neural-core-showcase {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .ai-pipeline-card, .neural-core-showcase, .ai-feature-card {
            padding: 20px 16px !important;
            border-radius: 18px !important;
            margin-bottom: 24px !important;
          }
          .pipeline-header {
            margin-bottom: 18px !important;
          }
          .pipeline-header-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .pipeline-header-inner h3 {
            font-size: 16px !important;
            line-height: 1.3 !important;
          }
          .pipeline-badge {
            margin-left: 50px !important;
          }
          .pipeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
        }
        @media (max-width: 420px) {
          .pipeline-badge {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 400px) {
          .pipeline-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
