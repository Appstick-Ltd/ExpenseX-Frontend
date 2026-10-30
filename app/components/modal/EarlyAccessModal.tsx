'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { subscribeToEarlyAccessModal, type EarlyAccessEventDetail } from '../../helpers/modalEvents';
import { playMicroClick } from '../../helpers/audio';
import { triggerHaptic } from '../../helpers/haptics';
import { Logo } from '../common/Logo';

const googlePlaySrc = '/Google_Play_2022_icon.svg';
const logoSrc = '/logo.png';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.expensexai.app';
const APP_STORE_URL = 'https://apps.apple.com/app/expensex-ai/id6742358055';

export const EarlyAccessModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [_modalData, setModalData] = useState<EarlyAccessEventDetail | null>(null);
  const closeModalRef = useRef<() => void>(() => {});

  const closeModal = () => {
    playMicroClick();
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    closeModalRef.current = closeModal;
  });

  useEffect(() => {
    const unsubscribe = subscribeToEarlyAccessModal((detail) => {
      setModalData(detail);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModalRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="download-modal-overlay"
      onClick={closeModal}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 16, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeInOverlay 0.25s ease-out',
      }}
    >
      <div
        className="download-modal-card glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '860px',
          borderRadius: '28px',
          background: 'radial-gradient(ellipse at 85% 30%, rgba(26, 20, 58, 0.98), rgba(8, 10, 22, 0.99))',
          border: '1.5px solid rgba(167, 139, 250, 0.38)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(109, 61, 245, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          padding: '48px 52px',
          color: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {/* Golden Lens Flare on Top-Right of Card */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '180px',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 186, 68, 0.7) 0%, rgba(255, 90, 54, 0.3) 45%, transparent 75%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient Violet Glow on Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '-40px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#CBD5E1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = '#CBD5E1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={18} />
        </button>

        {/* 2-Column Luxury Layout */}
        <div
          className="modal-content-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 0.85fr',
            alignItems: 'center',
            gap: '40px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Left Column: Information, Selected Plan Badge, and Store Badges */}
          <div>
            {/* Top Eyebrow with Brand Mark */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
              }}
            >
              <Logo size="sm" showText={false} />
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#C4B5FD',
                  textTransform: 'uppercase',
                }}
              >
                DOWNLOAD NOW • OFFICIAL APP STORES
              </span>
            </div>

            {/* Main Headline */}
            <h2
              style={{
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '14px',
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
              >X</span> AI on Play Store &amp; App Store
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '14.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '28px',
                maxWidth: '460px',
              }}
            >
              Download ExpenseX AI today. Track income, scan receipts, parse bank SMS, and gain complete clarity over your financial health.
            </p>

            {/* Official Store Badge Buttons */}
            <div
              className="modal-store-buttons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              {/* Google Play Store Badge */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playMicroClick();
                  triggerHaptic('medium');
                }}
                className="store-badge-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 20px',
                  borderRadius: '14px',
                  background: '#000000',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)';
                }}
              >
                <img
                  src={googlePlaySrc}
                  alt="Google Play"
                  style={{
                    width: '24px',
                    height: '26px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '10px', color: '#A1A1AA', letterSpacing: '0.04em' }}>GET IT ON</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Google Play</div>
                </div>
              </a>

              {/* Apple App Store Badge */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playMicroClick();
                  triggerHaptic('medium');
                }}
                className="store-badge-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 20px',
                  borderRadius: '14px',
                  background: '#000000',
                  border: '1.5px solid rgba(255, 255, 255, 0.22)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(167, 139, 250, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.15)';
                }}
              >
                {/* Official Apple Icon (Crisp White Vector) */}
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 170 170"
                  fill="#FFFFFF"
                  style={{ display: 'block', flexShrink: 0 }}
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.91-12-14.61-5.77-9.02-10.19-19.53-13.26-31.53-3.07-12-4.61-23.2-4.61-33.6 0-14.35 3.65-26.04 10.95-35.08 7.3-9.04 16.35-13.68 27.15-13.91 4.79 0 10.12 1.25 15.99 3.75 5.87 2.5 9.77 3.86 11.69 4.08 2.39-.43 6.64-1.96 12.74-4.58 6.1-2.62 11.59-3.8 16.48-3.56 12.63.63 22.84 4.89 30.63 12.77-10.99 6.63-16.37 15.65-16.14 27.05.23 8.91 3.65 16.34 10.26 22.29 6.61 5.95 14.53 9.4 23.77 10.35-2.07 6.31-4.63 12.73-7.68 19.26zm-32.32-107.12c0 5.66-2.07 11.16-6.21 16.5-4.14 5.34-9.28 8.96-15.42 10.87-.24-.76-.36-1.63-.36-2.61 0-5.65 2.18-11.2 6.54-16.64 4.36-5.44 9.68-8.89 15.97-10.35.32 1.2.48 2.01.48 2.23z" />
                </svg>
                <div style={{ textAlign: 'left', lineHeight: 1.15 }}>
                  <div style={{ fontSize: '10px', color: '#A1A1AA', letterSpacing: '0.04em' }}>Download on the</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>App Store</div>
                </div>
              </a>
            </div>

            {/* Reassurance Footer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="#10B981" />
              <span>Official Google Play &amp; Apple Store in-app billing &bull; Free starter plan included</span>
            </div>
          </div>

          {/* Right Column: 3D App Tile & Whimsical Script with Arrow */}
          <div
            className="modal-right-col"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              {/* Amber Corner Flare */}
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
              {/* Coral Corner Flare */}
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
                  src={logoSrc}
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
                right: '-24px',
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
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
                  transform: 'rotate(8deg)',
                  whiteSpace: 'nowrap',
                }}
              >
                A Smarter You.
                <br />
                A Brighter Tomorrow.
              </div>
              {/* Hand-drawn style curving arrow pointing down-left to tile */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  transform: 'rotate(-10deg) translate(-10px, 4px)',
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6))' }}
                >
                  <path
                    d="M30 6 C28 16, 20 24, 10 28"
                    stroke="#FFBA44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="1 0"
                  />
                  <path
                    d="M10 28 L18 27 M10 28 L14 20"
                    stroke="#FFBA44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

        @keyframes fadeInOverlay {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 820px) {
          .download-modal-card {
            padding: 38px 26px !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          .modal-content-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .modal-right-col {
            order: -1 !important;
            margin-bottom: 8px !important;
          }
          .final-cta-app-tile {
            width: 140px !important;
            height: 140px !important;
            border-radius: 32px !important;
          }
          .final-cta-script {
            top: -12px !important;
            right: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};
