import React from 'react';
import { AI_INSIGHTS_DATA } from '../utils/constants';
import { Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick } from '../utils/audio';

export const AIInsights: React.FC = () => {
  return (
    <section
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>EXPLAINABLE INTELLIGENCE</span>
          </div>

          <h2 className="section-headline">
            Numbers tell you what. <br />
            <span className="text-gradient-purple">AI tells you why.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            Traditional expense trackers flood you with static graphs. ExpenseX AI diagnoses the underlying habits and gives you actionable prescriptions.
          </p>
        </div>

        {/* 3 AI Insight Cards with 3D Tilt */}
        <div
          className="insights-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {AI_INSIGHTS_DATA.map((insight) => (
            <Card3DTilt
              key={insight.title}
              className="glass-card insight-card"
              style={{
                padding: '26px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '24px',
                border:
                  insight.severity === 'warning'
                    ? '1px solid rgba(255, 90, 54, 0.35)'
                    : '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <div>
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {insight.title}
                  </span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      background:
                        insight.severity === 'warning'
                          ? 'rgba(255, 90, 54, 0.15)'
                          : 'rgba(52, 211, 153, 0.15)',
                      color: insight.severity === 'warning' ? '#FF9A7B' : '#34D399',
                    }}
                  >
                    {insight.stat}
                  </span>
                </div>

                {/* Why explanation */}
                <div style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--purple-light)',
                      marginBottom: '6px',
                    }}
                  >
                    <HelpCircle size={13} />
                    <span>WHY DID THIS HAPPEN?</span>
                  </div>
                  <p style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.5 }}>
                    "{insight.why}"
                  </p>
                </div>

                {/* Action suggestion */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#34D399',
                      marginBottom: '6px',
                    }}
                  >
                    <Sparkles size={13} />
                    <span>AI PRESCRIPTION</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {insight.action}
                  </p>
                </div>
              </div>

              <div
                onClick={playMicroClick}
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: 'var(--purple-light)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <span>Automate this adjustment</span>
                <ArrowRight size={14} />
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .insights-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .insights-grid {
            gap: 16px !important;
          }
          .insight-card {
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
