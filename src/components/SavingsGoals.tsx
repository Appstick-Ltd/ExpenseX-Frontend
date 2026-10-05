import React from 'react';
import { SAVINGS_GOALS_DATA } from '../utils/constants';
import { Compass } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const SavingsGoals: React.FC = () => {
  return (
    <section
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: '80px',
        paddingBottom: '120px',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>AUTONOMOUS GOALS</span>
          </div>

          <h2 className="section-headline">
            Turn goals <br />
            <span className="text-gradient-purple">into a plan.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            Set a target and deadline. ExpenseX AI computes the exact daily and monthly pacing required to arrive without financial strain.
          </p>
        </div>

        {/* Goals Grid with 3D Tilt */}
        <div
          className="goals-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '28px',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {SAVINGS_GOALS_DATA.map((goal) => (
            <Card3DTilt
              key={goal.title}
              className="glass-card goal-card"
              style={{
                padding: '32px',
                borderRadius: '20px',
                border: '1px solid rgba(139, 92, 246, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'rgba(109, 61, 245, 0.18)',
                      color: 'var(--purple-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Compass size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{goal.title}</h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target: {goal.deadline}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>{goal.saved}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>of {goal.target}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: '10px',
                  borderRadius: '5px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${goal.percentage}%`,
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #8B5CF6, #6D3DF5, #FF5A36)',
                    boxShadow: '0 0 12px rgba(109, 61, 245, 0.5)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Monthly target: <strong style={{ color: '#FFFFFF' }}>{goal.monthlyTarget}</strong>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--purple-light)' }}>
                  {goal.percentage}% complete
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .goals-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .goal-card {
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};
