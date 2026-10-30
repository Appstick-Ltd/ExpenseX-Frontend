'use client';
import React from 'react';
import { HeroPhone3D } from './HeroPhone3D';
import { TypewriterText } from '../ui/TypewriterText';
import { Card3DTilt } from '../ui/Card3DTilt';
import { ParticleField } from '../ui/3d/ParticleField';
import { HERO_DATA, STORE_LINKS } from '../../helpers/constants';
import { ChevronRight, Users, ArrowRight, Cpu, Shield, Lock, Smartphone } from 'lucide-react';
import { playMicroClick } from '../../helpers/audio';
import { openEarlyAccessModal } from '../../helpers/modalEvents';

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
                ExpenseX AI — Smart AI Expense Tracker &amp; Personal Finance Companion
              </span>
              <span style={{ color: '#FFFFFF', display: 'block' }}>{HERO_DATA.headlinePart1}</span>
              <span className="text-gradient-purple" style={{ display: 'block' }}>
                {HERO_DATA.headlinePart2}
              </span>
            </h1>

            {/* Typewriter Subtitle */}
            <TypewriterText />

            {/* Compelling Value Proposition Copy */}
            <p
              style={{
                fontSize: 'clamp(15px, 1.35vw, 17px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginTop: '16px',
                marginBottom: '24px',
                maxWidth: '540px',
              }}
            >
              Track expenses smarter without tedious manual typing. ExpenseX AI turns your natural voice, receipt scans, and bank SMS into structured financial intelligence — available now on Android and iOS.
            </p>

            {/* Call to Actions with Direct App Store & Play Store Options */}
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              {/* Google Play Button */}
              <a
                href={STORE_LINKS.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-store-btn"
                onClick={() => playMicroClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: '#000000',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                }}
              >
                <img
                  src="/Google_Play_2022_icon.svg"
                  alt="Google Play"
                  style={{ width: '20px', height: '22px', objectFit: 'contain', display: 'block' }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '9px', color: '#A1A1AA', letterSpacing: '0.04em' }}>GET IT ON</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Google Play</div>
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href={STORE_LINKS.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-store-btn"
                onClick={() => playMicroClick()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  background: '#000000',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                }}
              >
                <svg width="20" height="22" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.41-6.08-3.69-3.08-7.83-8.03-12.43-14.86-6.66-9.88-11.85-20.94-15.56-33.17-3.71-12.23-5.57-23.95-5.57-35.17 0-14.18 3.57-26.01 10.72-35.48 7.15-9.47 16.27-14.31 27.35-14.52 4.79 0 10.23 1.25 16.32 3.75 6.09 2.5 10.02 3.85 11.8 4.07 2.37-.43 6.64-1.89 12.82-4.38 6.17-2.49 11.45-3.62 15.83-3.4 12.18.63 21.94 4.88 29.28 12.73-10.66 6.42-15.89 15.35-15.69 26.79.2 8.91 3.64 16.33 10.33 22.26 6.69 5.93 14.65 9.38 23.88 10.35-2.36 6.96-5.18 13.91-8.46 20.84zM119.22 33.09c0-7.39 2.66-14.4 7.98-21.03 5.32-6.63 12.01-11.08 20.07-13.34-.14 1.48-.37 3.01-.69 4.59-.32 1.58-.87 3.27-1.65 5.08-1.54 3.63-3.8 7.15-6.78 10.56-2.98 3.41-6.52 5.98-10.62 7.71-2.45 1.05-4.87 1.83-7.26 2.34-.33-1.63-.61-3.26-.85-4.9-.24-1.64-.36-3.13-.36-4.47z" fill="#FFFFFF"/>
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '9px', color: '#A1A1AA', letterSpacing: '0.04em' }}>DOWNLOAD ON THE</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>App Store</div>
                </div>
              </a>

              {/* Secondary Explore Features Button */}
              <a
                href="#tour"
                onClick={(e) => handleScrollTo(e, '#tour')}
                className="btn-secondary hero-btn-secondary"
                style={{
                  padding: '11px 20px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>Explore Features</span>
                <ChevronRight size={15} />
              </a>
            </div>

            {/* Zero Manual Friction Reassurance Line */}
            <div className="hero-friction-line">
              <span className="friction-pulse-dot" />
              <span>Available Now on Android &amp; iOS • Zero manual typing required</span>
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
                Safe to Spend: $18,500 <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 400 }}>(Demo)</span>
              </span>
            </div>

            <HeroPhone3D />
            <div style={{ position: 'absolute', bottom: '-26px', left: 0, right: 0, textAlign: 'center', fontSize: '11.5px', color: '#94A3B8', pointerEvents: 'none' }}>
              * Illustrative demo interface • Live Production Preview
            </div>
          </div>
        </div>

        {/* Bottom Trust & Metrics Strip (Verified Feature Highlights) */}
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
              <Cpu size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Multi-Modal</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Voice, OCR &amp; SMS</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399', flexShrink: 0 }}>
              <Users size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Official Apps</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Android &amp; iOS</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>AES-256</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cloud KMS Encrypted</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8', flexShrink: 0 }}>
              <Lock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Zero Ads</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No Model Training</div>
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
          onClick={(e) => handleScrollTo(e, '#tour')}
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
          border: none !important;
          cursor: pointer !important;
          font-family: inherit !important;
          outline: none;
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
          cursor: pointer !important;
          font-family: inherit !important;
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
          .hero-cta-group a,
          .hero-cta-group button {
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
          .hero-cta-group a,
          .hero-cta-group button {
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
