import React from 'react';
import { ROADMAP_PHASES } from '../utils/constants';
import { CheckCircle2, Clock } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const Roadmap: React.FC = () => {
  return (
    <section
      id="roadmap"
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>PRODUCT ROADMAP</span>
          </div>

          <h2 className="section-headline">
            The future of personal finance, <br />
            <span className="text-gradient-purple">unfolding in phases.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            We're building more than an expense tracker. Here is our deliberate path toward fully autonomous financial intelligence.
          </p>
        </div>

        {/* 3 Horizontal Roadmap Phases Grid with 3D Tilt */}
        <div
          className="roadmap-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {ROADMAP_PHASES.map((p) => (
            <Card3DTilt
              key={p.phase}
              className="glass-card"
              style={{
                padding: '36px 28px',
                borderRadius: '22px',
                border: p.isLive ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                background: p.isLive
                  ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.06) 0%, rgba(14, 20, 38, 0.8) 100%)'
                  : 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--purple-light)' }}>
                    {p.phase}
                  </span>
                  {p.isLive ? (
                    <span className="badge-live">
                      <CheckCircle2 size={12} />
                      <span>LIVE</span>
                    </span>
                  ) : (
                    <span className="badge-coming-soon">
                      <Clock size={12} />
                      <span>COMING SOON</span>
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '20px', color: '#FFFFFF' }}>
                  {p.title}
                </h3>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {p.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13px',
                        color: p.isLive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: p.isLive ? '#34D399' : 'var(--text-dim)',
                        }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  marginTop: '32px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                {p.isLive ? 'Active in current app release' : 'In active research and engineering'}
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .roadmap-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
