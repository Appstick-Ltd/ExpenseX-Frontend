import React from 'react';
import { BUDGETS_DATA } from '../utils/constants';
import { Utensils, Car, ShoppingBag, Zap } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const Budgets: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils size={18} />;
      case 'car':
        return <Car size={18} />;
      case 'shopping-bag':
        return <ShoppingBag size={18} />;
      default:
        return <Zap size={18} />;
    }
  };

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
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>DYNAMIC ENVELOPES</span>
          </div>

          <h2 className="section-headline">
            Give every dollar <br />
            <span className="text-gradient-purple">a direction.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            Budgets that automatically adjust based on recurring obligations, salary schedules, and everyday habits.
          </p>
        </div>

        {/* Minimal Budget Grid with 3D Tilt */}
        <div
          className="budgets-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {BUDGETS_DATA.map((b) => (
            <Card3DTilt
              key={b.category}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: '18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(109, 61, 245, 0.15)',
                      color: 'var(--purple-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIcon(b.icon)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{b.category}</h3>
                    <span style={{ fontSize: '11px', color: '#34D399', fontWeight: 600 }}>
                      ✨ AI Recommended
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF' }}>
                    ${b.spent.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    of ${b.limit.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${b.percentage}%`,
                    borderRadius: '4px',
                    background:
                      b.percentage > 85
                        ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
                        : 'linear-gradient(90deg, #8B5CF6, #6D3DF5)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '10px',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>{b.percentage}% utilized</span>
                <span>${(b.limit - b.spent).toLocaleString()} remaining</span>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .budgets-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
