import React from 'react';
import { HeroPhone3D } from './HeroPhone3D';
import { TypewriterText } from './TypewriterText';
import { ParticleField } from './3d/ParticleField';
import { HERO_DATA } from '../utils/constants';
import { ChevronRight, Users, Star, Heart, Globe, ArrowRight } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick } from '../utils/audio';

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playMicroClick();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = window.innerWidth <= 768 ? 32 : 24;
      const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: 'smooth',
      });
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'clamp(84px, 12vh, 120px)',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Three.js 3D Particle Cloud */}
      <ParticleField />

      {/* Cinematic Ambient Atmosphere Light */}
      <div
        className="bg-ambient-blur"
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translate(-50%, -50%) translateZ(0)',
          willChange: 'transform',
          width: '900px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.18) 0%, rgba(255, 90, 54, 0.06) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            alignItems: 'center',
            gap: '40px',
            minHeight: '680px',
            position: 'relative',
          }}
        >
          {/* Left Column: Focused Copy & Value Proposition */}
          <div className="hero-content" style={{ maxWidth: '620px', zIndex: 2 }}>
            {/* Top Pill / Badge */}
            <div className="section-eyebrow hero-eyebrow-pill">
              <span className="section-eyebrow-dot" />
              <span>{HERO_DATA.eyebrow}</span>
            </div>

            {/* Impact Headline */}
            <h1
              className="hero-headline"
              style={{
                fontSize: 'clamp(32px, 5.2vw, 76px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
                ExpenseX AI — #1 Smart AI Expense Tracker &amp; Personal Finance Companion
              </span>
              <span style={{ color: '#FFFFFF', display: 'block' }}>{HERO_DATA.headlinePart1}</span>
              <span className="text-gradient-purple" style={{ display: 'block' }}>
                {HERO_DATA.headlinePart2}
              </span>
            </h1>

            {/* Typewriter Subtitle */}
            <TypewriterText />

            {/* Call to Actions */}
            <div className="hero-cta-group">
              <a
                href="#tour"
                onClick={(e) => handleScrollTo(e, '#tour')}
                className="btn-primary hero-btn-primary"
              >
                <span>Take a Tour</span>
                <ChevronRight size={15} />
              </a>

              <a
                href="#features"
                onClick={(e) => handleScrollTo(e, '#features')}
                className="btn-secondary hero-btn-secondary"
              >
                <span>AI Features</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Zero Manual Friction Reassurance Line */}
            <div className="hero-friction-line">
              <span className="friction-pulse-dot" />
              <span>Zero manual typing • 100% automated finance</span>
            </div>
          </div>

          {/* Right Column: ONE Dominant 3D iPhone 17 Pro Max */}
          <div
            className="hero-phone-stage"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              overflow: 'visible',
            }}
          >
            {/* Floating Luxury Glass Card with 3D Tilt */}
            <div
              className="hero-floating-card"
              style={{
                position: 'absolute',
                bottom: '40px',
                left: '-30px',
                zIndex: 4,
                animation: 'floatSoft 4s infinite ease-in-out',
              }}
            >
              <Card3DTilt
                maxTilt={16}
                style={{
                  width: '210px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(109, 61, 245, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  transform: 'rotate(-7deg)',
                }}
              >
                <img
                  src="/assets/image/expensex_glass_card.jpg"
                  alt="ExpenseX AI Glass Card"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Card3DTilt>
            </div>

            {/* Floating Dynamic Safe to Spend Pill */}
            <div
              className="hero-floating-badge"
              style={{
                position: 'absolute',
                top: '50px',
                right: '-15px',
                padding: '10px 18px',
                borderRadius: '9999px',
                background: 'rgba(14, 20, 42, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(139, 92, 246, 0.45)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 20px rgba(109, 61, 245, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 4,
                animation: 'floatSoft 3.5s infinite ease-in-out 1.5s',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#34D399',
                  boxShadow: '0 0 10px #34D399',
                }}
              />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                Safe to Spend: $18,500
              </span>
            </div>

            <HeroPhone3D />
          </div>
        </div>

        {/* Bottom Trust & Metrics Strip (Image 1 style) */}
        <div
          className="hero-metrics-strip"
          style={{
            marginTop: '48px',
            padding: '20px 32px',
            borderRadius: '20px',
            background: 'rgba(11, 15, 30, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            alignItems: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(109, 61, 245, 0.2)', border: '1px solid rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A78BFA', flexShrink: 0 }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>50K+</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Happy Users</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255, 186, 68, 0.15)', border: '1px solid rgba(255, 186, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFBA44', flexShrink: 0 }}>
              <Star size={20} fill="#FFBA44" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>4.8 ★</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>App Rating</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', flexShrink: 0 }}>
              <Heart size={20} fill="#EC4899" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>100%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Focused on You</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', flexShrink: 0 }}>
              <Globe size={20} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Global</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Growing Everyday</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Bottom Curved Transition (Section 16) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Animated Scroll Indicator */}
        <a
          href="#tour"
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <span>SCROLL TO EXPLORE</span>
          <div
            style={{
              width: '24px',
              height: '38px',
              borderRadius: '12px',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: 'var(--purple-light)',
                animation: 'floatSoft 2s infinite ease-in-out',
              }}
            />
          </div>
        </a>

        {/* Large smooth curved surface SVG transition */}
        <div className="curved-separator">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
            <path
              d="M0,40 C360,110 1080,110 1440,40 L1440,120 L0,120 Z"
              fill="var(--bg-secondary)"
            />
          </svg>
        </div>
      </div>

      <style>{`
        .hero-eyebrow-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 9999px;
          background: rgba(109, 61, 245, 0.12);
          border: 1px solid rgba(139, 92, 246, 0.35);
          box-shadow: 0 0 16px rgba(109, 61, 245, 0.2);
          color: #C084FC;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          margin-bottom: 16px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .hero-btn-primary {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 13px 26px !important;
          font-size: 15px !important;
          background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 50%, #7C3AED 100%) !important;
          box-shadow: 0 8px 24px -4px rgba(109, 61, 245, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.35) !important;
          border-radius: 9999px !important;
          font-weight: 700 !important;
          color: #FFFFFF !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
          text-decoration: none !important;
        }
        .hero-btn-primary:hover {
          box-shadow: 0 12px 28px -4px rgba(109, 61, 245, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.45) !important;
          transform: translateY(-1px) !important;
        }
        .hero-btn-primary:active {
          transform: scale(0.96) !important;
        }
        .hero-btn-secondary {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 13px 24px !important;
          font-size: 15px !important;
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
          border-radius: 9999px !important;
          font-weight: 600 !important;
          color: #FFFFFF !important;
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease !important;
          text-decoration: none !important;
        }
        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.28) !important;
          transform: translateY(-1px) !important;
        }
        .hero-btn-secondary:active {
          transform: scale(0.96) !important;
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .hero-friction-line {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: #94A3B8;
          letter-spacing: 0.01em;
        }
        .friction-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          flex-shrink: 0;
        }
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 16px !important;
            min-height: auto !important;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-eyebrow-pill {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-group {
            justify-content: center !important;
          }
          .hero-phone-stage {
            width: 100% !important;
            height: 520px !important;
            min-height: 480px !important;
            margin: 12px 0 !important;
            order: 2;
          }
          .hero-metrics-strip {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            padding: 16px 20px !important;
            margin-top: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .hero-floating-card {
            left: 0px !important;
            bottom: 10px !important;
            transform: scale(0.85) rotate(-3deg) !important;
          }
          .hero-floating-badge {
            right: 10px !important;
            top: 20px !important;
            transform: scale(0.85) !important;
          }
        }
        @media (max-width: 540px) {
          .hero-section {
            padding-top: 104px !important;
          }
          .hero-headline {
            font-size: 38px !important;
            line-height: 1.05 !important;
            margin-bottom: 8px !important;
          }
          .hero-eyebrow-pill {
            font-size: 9.5px !important;
            padding: 4px 12px !important;
            letter-spacing: 0.12em !important;
            margin-bottom: 10px !important;
            background: rgba(109, 61, 245, 0.1) !important;
            border: 1px solid rgba(139, 92, 246, 0.28) !important;
          }
          .hero-cta-group {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            max-width: 330px !important;
            gap: 10px !important;
            margin: 0 auto 12px auto !important;
          }
          .hero-cta-group a {
            flex: 1 !important;
            width: auto !important;
            height: 42px !important;
            padding: 0 12px !important;
            font-size: 13.5px !important;
            font-weight: 600 !important;
            border-radius: 12px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            white-space: nowrap !important;
          }
          .hero-friction-line {
            font-size: 11.5px !important;
            color: rgba(255, 255, 255, 0.6) !important;
            margin: 0 auto !important;
            justify-content: center !important;
          }
          .hero-phone-stage {
            width: 100% !important;
            height: 470px !important;
            min-height: 440px !important;
            margin: 6px 0 !important;
          }
          .hero-floating-card {
            display: none !important;
          }
          .hero-floating-badge {
            display: none !important;
          }
          .hero-metrics-strip {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            padding: 12px 14px !important;
            margin-top: 14px !important;
          }
        }
        @media (max-width: 380px) {
          .hero-headline {
            font-size: 33px !important;
          }
          .hero-cta-group {
            max-width: 300px !important;
            gap: 8px !important;
          }
          .hero-cta-group a {
            font-size: 12.5px !important;
            padding: 0 8px !important;
            height: 40px !important;
          }
          .hero-phone-stage {
            height: 440px !important;
            min-height: 420px !important;
          }
          .hero-metrics-strip {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
};
