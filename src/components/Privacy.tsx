import React from 'react';
import { PRIVACY_POINTS } from '../utils/constants';
import { Shield, ToggleRight, Download, CheckCircle2 } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const Privacy: React.FC = () => {
  return (
    <section
      id="privacy"
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
            <span>DATA AUTONOMY</span>
          </div>

          <h2 className="section-headline">
            Your money. Your data. <br />
            <span className="text-gradient-purple">Your control.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            We believe intelligent financial tracking should never require sacrificing personal sovereignty. You hold the keys to every single byte.
          </p>
        </div>

        {/* 4 Points Grid with 3D Tilt */}
        <div
          className="privacy-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {PRIVACY_POINTS.map((pt, idx) => (
            <Card3DTilt
              key={pt.title}
              className="glass-card privacy-card"
              style={{
                padding: '32px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(109, 61, 245, 0.15)',
                  color: 'var(--purple-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px',
                }}
              >
                {idx === 0 && <Shield size={20} />}
                {idx === 1 && <ToggleRight size={20} />}
                {idx === 2 && <CheckCircle2 size={20} />}
                {idx === 3 && <Download size={20} />}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{pt.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{pt.desc}</p>
            </Card3DTilt>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .privacy-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .privacy-card {
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
