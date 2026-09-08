import React from 'react';
import { ROADMAP_PHASES } from '../utils/constants';
import { CheckCircle2, Clock, MapPin, Navigation, Flag, Milestone } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';

export const Roadmap: React.FC = () => {
  const phaseMetadata = [
    {
      routeNumber: 'ROUTE 01',
      roadName: 'Capture Foundation Highway',
      badgeText: 'PAVED & LIVE',
      statusColor: '#34D399',
      statusBg: 'rgba(16, 185, 129, 0.15)',
      statusBorder: 'rgba(52, 211, 153, 0.4)',
      progressPct: 100,
      progressLabel: '100% Deployed & Active',
      icon: MapPin,
      roadStatusDesc: 'Active in production release v2.4',
      laneClass: 'road-lane-active',
    },
    {
      routeNumber: 'ROUTE 02',
      roadName: 'Intelligence Expressway',
      badgeText: 'UNDER CONSTRUCTION',
      statusColor: '#A78BFA',
      statusBg: 'rgba(139, 92, 246, 0.15)',
      statusBorder: 'rgba(167, 139, 250, 0.4)',
      progressPct: 65,
      progressLabel: '65% In Active Engineering',
      icon: Navigation,
      roadStatusDesc: 'Slated for deployment in Q3-Q4',
      laneClass: 'road-lane-progress',
    },
    {
      routeNumber: 'ROUTE 03',
      roadName: 'Autonomous Frontier Route',
      badgeText: 'HORIZON EXPEDITION',
      statusColor: '#FF9A7B',
      statusBg: 'rgba(255, 90, 54, 0.15)',
      statusBorder: 'rgba(255, 154, 123, 0.4)',
      progressPct: 20,
      progressLabel: '20% Architecture & Design',
      icon: Flag,
      roadStatusDesc: 'Planned for future horizon release',
      laneClass: 'road-lane-future',
    },
  ];

  return (
    <section
      id="roadmap"
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>PRODUCT ROADMAP & HIGHWAY</span>
          </div>

          <h2 className="section-headline">
            The future of personal finance, <br />
            <span className="text-gradient-purple">mapped as a clear journey.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            We're building more than an expense tracker. Follow our highway toward fully autonomous financial intelligence.
          </p>
        </div>

        {/* Visual Highway Route Map Ribbon (Desktop & Tablet) */}
        <div
          className="roadmap-highway-strip"
          style={{
            marginBottom: '40px',
            padding: '16px 24px',
            borderRadius: '20px',
            background: 'rgba(12, 16, 34, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            {/* Waypoint 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(52, 211, 153, 0.2)',
                  border: '2px solid #34D399',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#34D399',
                  boxShadow: '0 0 16px rgba(52, 211, 153, 0.5)',
                }}
              >
                <MapPin size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#34D399', letterSpacing: '0.08em' }}>MILE 01 • LIVE</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>AI Capture Highway</div>
              </div>
            </div>

            {/* Connecting Road 1 -> 2 */}
            <div style={{ flex: 1, position: 'relative', height: '14px', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #34D399, #8B5CF6)',
                  boxShadow: '0 0 12px rgba(52, 211, 153, 0.4)',
                }}
              />
              <div
                className="road-car-pulse"
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  boxShadow: '0 0 12px #FFFFFF, 0 0 20px #8B5CF6',
                }}
              />
            </div>

            {/* Waypoint 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '2px solid #A78BFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A78BFA',
                  boxShadow: '0 0 16px rgba(139, 92, 246, 0.5)',
                }}
              >
                <Navigation size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#A78BFA', letterSpacing: '0.08em' }}>MILE 02 • IN PROGRESS</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Intelligence Expressway</div>
              </div>
            </div>

            {/* Connecting Road 2 -> 3 */}
            <div style={{ flex: 1, position: 'relative', height: '14px', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #8B5CF6 0%, #FF5A36 100%)',
                  opacity: 0.7,
                }}
              />
            </div>

            {/* Waypoint 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'rgba(255, 90, 54, 0.2)',
                  border: '2px solid #FF9A7B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF9A7B',
                  boxShadow: '0 0 16px rgba(255, 90, 54, 0.4)',
                }}
              >
                <Flag size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#FF9A7B', letterSpacing: '0.08em' }}>MILE 03 • HORIZON</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>Autonomous Frontier</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Horizontal Roadmap Phases Grid with 3D Tilt */}
        <div
          className="roadmap-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            position: 'relative',
          }}
        >
          {ROADMAP_PHASES.map((p, idx) => {
            const meta = phaseMetadata[idx] || phaseMetadata[0];
            const IconComponent = meta.icon;

            return (
              <Card3DTilt
                key={p.phase}
                className="glass-card"
                style={{
                  padding: '32px 28px',
                  borderRadius: '24px',
                  border: p.isLive ? '1.5px solid rgba(52, 211, 153, 0.45)' : '1px solid rgba(255, 255, 255, 0.09)',
                  background: p.isLive
                    ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 18, 38, 0.9) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(10, 14, 28, 0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: p.isLive ? '0 16px 40px rgba(52, 211, 153, 0.12)' : '0 16px 40px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative asphalt road marker at top of card */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: p.isLive
                      ? 'linear-gradient(90deg, #34D399, #10B981)'
                      : idx === 1
                      ? 'linear-gradient(90deg, #8B5CF6, #6D3DF5)'
                      : 'linear-gradient(90deg, #FF5A36, #F59E0B)',
                    boxShadow: `0 0 12px ${meta.statusColor}`,
                  }}
                />

                <div>
                  {/* Road Route & Checkpoint Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: meta.statusBg,
                          border: `1px solid ${meta.statusBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: meta.statusColor,
                        }}
                      >
                        <IconComponent size={14} />
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          color: meta.statusColor,
                        }}
                      >
                        {meta.routeNumber}
                      </span>
                    </div>

                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '10px',
                        fontWeight: 800,
                        letterSpacing: '0.06em',
                        color: meta.statusColor,
                        background: meta.statusBg,
                        border: `1px solid ${meta.statusBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      {p.isLive ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                      <span>{meta.badgeText}</span>
                    </span>
                  </div>

                  {/* Title & Route Subtitle */}
                  <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px', color: '#FFFFFF' }}>
                    {p.title}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                    🛣️ {meta.roadName}
                  </div>

                  {/* Progress Road Meter */}
                  <div style={{ marginBottom: '22px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: meta.statusColor,
                        marginBottom: '6px',
                      }}
                    >
                      <span>ROUTE COMPLETION</span>
                      <span>{meta.progressLabel}</span>
                    </div>
                    <div
                      style={{
                        height: '7px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${meta.progressPct}%`,
                          borderRadius: '9999px',
                          background: p.isLive
                            ? 'linear-gradient(90deg, #10B981, #34D399)'
                            : idx === 1
                            ? 'linear-gradient(90deg, #6D3DF5, #A78BFA)'
                            : 'linear-gradient(90deg, #EA580C, #FF9A7B)',
                          boxShadow: `0 0 10px ${meta.statusColor}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Feature Milestones List */}
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
                            width: '7px',
                            height: '7px',
                            borderRadius: '50%',
                            background: p.isLive ? '#34D399' : idx === 1 ? '#A78BFA' : '#FF9A7B',
                            boxShadow: p.isLive ? '0 0 8px #34D399' : 'none',
                            flexShrink: 0,
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Road Checkpoint Footer */}
                <div
                  style={{
                    marginTop: '28px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{meta.roadStatusDesc}</span>
                  <Milestone size={14} color={meta.statusColor} />
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes roadDrive {
          0% { left: 15%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 85%; opacity: 0; }
        }
        .road-car-pulse {
          animation: roadDrive 4.5s infinite ease-in-out;
        }
        @media (max-width: 992px) {
          .roadmap-grid {
            grid-template-columns: 1fr !important;
          }
          .roadmap-highway-strip {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
