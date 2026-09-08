import React from 'react';
import { HeroPhone3D } from './HeroPhone3D';
import { TypewriterText } from './TypewriterText';
import { ParticleField } from './3d/ParticleField';
import { HERO_DATA } from '../utils/constants';
import { ChevronRight, Users, Star, Heart, Globe, ArrowRight } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick } from '../utils/audio';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '120px',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* Interactive Three.js 3D Particle Cloud */}
      <ParticleField />

      {/* Cinematic Ambient Atmosphere Light */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
          <div style={{ maxWidth: '620px', zIndex: 2 }}>
            {/* Top Pill / Badge */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              <span>{HERO_DATA.eyebrow}</span>
            </div>

            {/* Impact Headline */}
            <h1
              style={{
                fontSize: 'clamp(44px, 5.2vw, 76px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.04,
                marginBottom: '20px',
              }}
            >
              <span style={{ color: '#FFFFFF', display: 'block' }}>{HERO_DATA.headlinePart1}</span>
              <span className="text-gradient-purple" style={{ display: 'block' }}>
                {HERO_DATA.headlinePart2}
              </span>
            </h1>

            {/* Typewriter Subtitle */}
            <TypewriterText />

            {/* Call to Actions (Removed Download App, focused on Interactive Tour & Features) */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <a
                href="#tour"
                onClick={playMicroClick}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Take a Quick Tour</span>
                <ChevronRight size={16} />
              </a>

              <a
                href="#features"
                onClick={playMicroClick}
                className="btn-secondary"
                style={{
                  padding: '14px 26px',
                  fontSize: '15px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Explore AI Features</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Zero Manual Friction Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#34D399',
                  boxShadow: '0 0 8px #34D399',
                }}
              />
              <span>Zero manual typing • 100% automated personal finance</span>
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
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-phone-stage {
            height: 480px !important;
            order: 2;
          }
        }
      `}</style>
    </section>
  );
};
