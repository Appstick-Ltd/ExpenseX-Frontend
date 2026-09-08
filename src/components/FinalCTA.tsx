import React from 'react';
import { Logo } from './Logo';
import { playSuccessChime } from '../utils/audio';

export const FinalCTA: React.FC = () => {
  const handleDownload = async () => {
    playSuccessChime();
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.75 },
      colors: ['#6D3DF5', '#8B5CF6', '#FF5A36', '#34D399', '#FFAA33', '#FFFFFF'],
    });
  };

  return (
    <section
      id="download"
      style={{
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '120px',
        backgroundColor: 'var(--bg-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.16) 0%, rgba(255, 90, 54, 0.05) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Luxury Download Banner Card (Image 2 style) */}
        <div
          className="download-banner-card"
          style={{
            position: 'relative',
            borderRadius: '28px',
            background: 'radial-gradient(ellipse at 85% 30%, rgba(24, 20, 56, 0.95), rgba(7, 9, 20, 0.98))',
            border: '1.5px solid rgba(167, 139, 250, 0.35)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.85), 0 0 50px rgba(109, 61, 245, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            padding: '56px 64px',
            display: 'grid',
            gridTemplateColumns: '1.3fr 0.9fr',
            alignItems: 'center',
            gap: '48px',
            overflow: 'hidden',
          }}
        >
          {/* Golden Lens Flare on Top-Right of Card */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '220px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 186, 68, 0.75) 0%, rgba(255, 90, 54, 0.35) 45%, transparent 75%)',
              filter: 'blur(35px)',
              pointerEvents: 'none',
            }}
          />

          {/* Left Column: Heading, Value Prop, Store Badges */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Top Eyebrow with Brand Mark */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <Logo size="sm" showText={false} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#C4B5FD',
                  textTransform: 'uppercase',
                }}
              >
                YOUR BETTER TOMORROW STARTS TODAY
              </span>
            </div>

            {/* Main Headline */}
            <h2
              style={{
                fontSize: 'clamp(34px, 4vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Download ExpenseX AI
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '460px',
              }}
            >
              Take control of your money. It's free, simple and powerful.
            </p>

            {/* Official App Store & Google Play Store Badge Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              {/* Apple App Store Badge */}
              <button
                onClick={handleDownload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 22px',
                  borderRadius: '14px',
                  background: '#000000',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)';
                }}
              >
                {/* Authentic Apple Icon */}
                <svg width="24" height="28" viewBox="0 0 170 170" fill="currentColor">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.91-12-14.6-6.19-9.68-11.06-20.91-14.6-33.69-3.55-12.78-5.33-24.36-5.33-34.73 0-14.13 3.65-25.99 10.95-35.58 7.3-9.59 16.48-14.49 27.54-14.71 4.79 0 10.35 1.25 16.69 3.75 6.34 2.5 10.16 3.8 11.46 3.91 1.63-.22 5.76-1.63 12.39-4.24 6.63-2.61 12.18-3.75 16.65-3.43 12.61.87 22.83 5.49 30.65 13.86-11.09 6.74-16.52 16.03-16.3 27.88.22 9.78 4.02 18.04 11.41 24.78 7.39 6.74 16.09 10.43 26.09 11.08-2.39 7.39-5.11 14.67-8.15 21.84zM119.22 33.7c0-7.39 2.66-14.34 7.99-20.87 5.33-6.52 11.79-10.76 19.39-12.72.65 1.74.98 3.59.98 5.54 0 7.39-2.77 14.45-8.32 21.19-5.54 6.74-12.06 10.76-19.56 12.06-.33-1.74-.48-3.48-.48-5.2z"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '10px', color: '#A1A1AA', letterSpacing: '0.04em' }}>Download on the</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>App Store</div>
                </div>
              </button>

              {/* Google Play Store Badge */}
              <button
                onClick={handleDownload}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 22px',
                  borderRadius: '14px',
                  background: '#000000',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)';
                }}
              >
                {/* Authentic Google Play 4-Color Icon */}
                <svg width="24" height="26" viewBox="0 0 512 512">
                  <path fill="#4285F4" d="M32.5 13.5C27 19.5 24 28.5 24 40.5v431c0 12 3 21 8.5 27l239-239L32.5 13.5z"/>
                  <path fill="#EA4335" d="M349.5 330.5l-78-78-239 239c8 8.5 21 9.5 35.5 1.5l281.5-162.5z"/>
                  <path fill="#FBBC05" d="M349.5 181.5L68 18c-14.5-8-27.5-7-35.5 1.5l281.5-162.5z"/>
                  <path fill="#34A853" d="M472.5 240.5c15.5 9 15.5 23 0 31.5l-123 71-78-78 78-77 123 72.5z"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '10px', color: '#A1A1AA', letterSpacing: '0.04em' }}>GET IT ON</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: 3D App Tile & Whimsical Handwritten Script (Image 2 style) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            {/* 3D Glossy App Tile with ambient glow & lens flare */}
            <div
              style={{
                position: 'relative',
                width: '180px',
                height: '180px',
                borderRadius: '42px',
                background: 'linear-gradient(145deg, #181c38 0%, #0c0f22 100%)',
                border: '2px solid rgba(167, 139, 250, 0.45)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 45px rgba(109, 61, 245, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-4deg)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(-4deg) scale(1)')}
            >
              {/* Corner Flares */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-16px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FFAA33 0%, rgba(255, 170, 51, 0.4) 40%, transparent 70%)',
                  filter: 'blur(8px)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '-16px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #FF5A36 0%, rgba(255, 90, 54, 0.4) 40%, transparent 70%)',
                  filter: 'blur(8px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Central Glowing Ribbon X Mark */}
              <div style={{ width: '96px', height: '96px', position: 'relative' }}>
                <svg width="96" height="96" viewBox="0 0 44 44" fill="none">
                  <defs>
                    <linearGradient id="finalCtaRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#6D3DF5" />
                    </linearGradient>
                    <linearGradient id="finalCtaRibbon2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF5A36" />
                      <stop offset="100%" stopColor="#FFAA33" />
                    </linearGradient>
                    <filter id="finalCtaGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Diagonal 1: Violet/Purple */}
                  <path
                    d="M 10 10 L 34 34"
                    stroke="url(#finalCtaRibbon1)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#finalCtaGlow)"
                  />
                  {/* Diagonal 2: Coral/Orange */}
                  <path
                    d="M 34 10 L 10 34"
                    stroke="url(#finalCtaRibbon2)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter="url(#finalCtaGlow)"
                    style={{ mixBlendMode: 'screen' }}
                  />
                  {/* Intersection Highlight */}
                  <circle cx="22" cy="22" r="3.5" fill="#FFFFFF" opacity="0.9" filter="url(#finalCtaGlow)" />
                </svg>
              </div>
            </div>

            {/* Playful Handwritten Script with Arrow (Image 2 style) */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-30px',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'Caveat, "Dancing Script", cursive, -apple-system, sans-serif',
                  fontSize: '21px',
                  color: '#E2E8F0',
                  lineHeight: 1.25,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 20px rgba(255, 170, 51, 0.5)',
                  transform: 'rotate(7deg)',
                  whiteSpace: 'nowrap',
                }}
              >
                A Smarter You.<br />A Brighter Tomorrow.
              </div>
              <svg width="42" height="30" viewBox="0 0 40 30" fill="none" style={{ margin: '4px auto 0 auto', opacity: 0.9 }}>
                <path
                  d="M 28 4 C 18 12, 10 18, 12 26 M 12 26 L 8 20 M 12 26 L 18 22"
                  stroke="#FFAA33"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .download-banner-card {
            grid-template-columns: 1fr !important;
            padding: 40px 28px !important;
            gap: 36px !important;
            text-align: center;
          }
          .download-banner-card > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};
