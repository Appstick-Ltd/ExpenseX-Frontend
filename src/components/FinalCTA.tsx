import React from 'react';
import { Logo } from './Logo';
import logoImg from '../assets/logo.png';
import appleLogoImg from '../assets/apple-logo.png';
import googlePlaySvg from '../assets/Google_Play_2022_icon.svg';
import { playMicroClick } from '../utils/audio';
import { openEarlyAccessModal, type PlatformType } from '../utils/modalEvents';

export const FinalCTA: React.FC = () => {
  const handleOpenEarlyAccess = (platform: PlatformType) => {
    playMicroClick();
    openEarlyAccessModal(platform);
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
        className="bg-ambient-blur"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) translateZ(0)',
          willChange: 'transform',
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
                EARLY BIRD ACCESS • LIMITED SPOTS
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
              Get Expense<span
                style={{
                  background: 'linear-gradient(135deg, #A78BFA 0%, #FF7A59 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  filter: 'drop-shadow(0 0 16px rgba(167, 139, 250, 0.45))',
                }}
              >X</span> AI on iOS &amp; Android
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '480px',
              }}
            >
              Reserve your exclusive Early Bird VIP pass. Be the first to get Beta builds on the Apple App Store and Google Play Store with priority access.
            </p>

            {/* Official App Store & Google Play Store Badge Buttons */}
            <div
              className="final-cta-store-buttons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              {/* Apple App Store Badge */}
              <button
                onClick={() => handleOpenEarlyAccess('ios')}
                className="store-badge-btn"
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
                <img
                  src={appleLogoImg}
                  alt="Apple Logo"
                  style={{
                    width: '24px',
                    height: '28px',
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                    display: 'block',
                  }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '10px', color: '#A1A1AA', letterSpacing: '0.04em' }}>Download on the</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>App Store</div>
                </div>
              </button>

              {/* Google Play Store Badge */}
              <button
                onClick={() => handleOpenEarlyAccess('android')}
                className="store-badge-btn"
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
                {/* Authentic Google Play Icon */}
                <img
                  src={googlePlaySvg}
                  alt="Google Play Logo"
                  style={{
                    width: '24px',
                    height: '26px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
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
              className="final-cta-app-tile"
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

              {/* Central Glowing Brand Logo */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '120px',
                  height: '100px',
                }}
              >
                <img
                  src={logoImg}
                  alt="ExpenseX AI App Icon"
                  style={{
                    width: '115px',
                    height: 'auto',
                    maxHeight: '92px',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 0 16px rgba(109, 61, 245, 0.75)) drop-shadow(0 6px 24px rgba(255, 90, 54, 0.45))',
                    transition: 'transform 0.3s ease',
                  }}
                  loading="eager"
                />
              </div>
            </div>

            {/* Playful Handwritten Script with Arrow (Image 2 style) */}
            <div
              className="final-cta-script"
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
            padding: 40px 24px !important;
            gap: 36px !important;
            text-align: center;
          }
          .download-banner-card > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .final-cta-store-buttons {
            justify-content: center !important;
          }
          .final-cta-script {
            right: 0px !important;
            top: -24px !important;
          }
        }
        @media (max-width: 540px) {
          .download-banner-card {
            padding: 28px 16px !important;
            border-radius: 20px !important;
          }
          .final-cta-store-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .store-badge-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .final-cta-script {
            position: static !important;
            margin-bottom: 14px !important;
            transform: none !important;
          }
          .final-cta-script > div {
            transform: none !important;
            font-size: 18px !important;
          }
          .final-cta-script svg {
            display: none !important;
          }
          .final-cta-app-tile {
            width: 140px !important;
            height: 140px !important;
            border-radius: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};
