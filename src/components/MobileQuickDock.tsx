import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, ArrowUp, Zap } from 'lucide-react';
import { playMicroClick } from '../utils/audio';
import { triggerHaptic } from '../utils/haptics';
import { openEarlyAccessModal } from '../utils/modalEvents';

export const MobileQuickDock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let currentlyVisible = false;

    const checkScroll = () => {
      const shouldBeVisible = window.scrollY > 320;
      if (shouldBeVisible !== currentlyVisible) {
        currentlyVisible = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playMicroClick();
    triggerHaptic('medium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playMicroClick();
    triggerHaptic('selection');
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - 32),
        behavior: 'smooth',
      });
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="mobile-quick-dock">
        <div className="dock-container">
          <a
            href="#tour"
            onClick={(e) => handleNavClick(e, '#tour')}
            className="dock-item"
            title="Quick Tour"
          >
            <Compass size={17} />
            <span>Tour</span>
          </a>

          <a
            href="#features"
            onClick={(e) => handleNavClick(e, '#features')}
            className="dock-item"
            title="AI Features"
          >
            <Sparkles size={17} />
            <span>AI Core</span>
          </a>

          <button
            type="button"
            onClick={() => {
              playMicroClick();
              triggerHaptic('medium');
              openEarlyAccessModal('both');
            }}
            className="dock-cta-btn"
            style={{ border: 'none', cursor: 'pointer' }}
          >
            <Zap size={15} fill="#FFFFFF" />
            <span>Get App</span>
          </button>

          <button
            onClick={scrollToTop}
            className="dock-top-btn"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>

      <style>{`
        .mobile-quick-dock {
          position: fixed;
          bottom: 20px;
          left: 0;
          right: 0;
          z-index: 998;
          display: flex;
          justify-content: center;
          padding: 0 14px;
          pointer-events: none;
          animation: dockSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dockSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .dock-container {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px 6px 12px;
          border-radius: 9999px;
          background: rgba(14, 18, 38, 0.96);
          border: 1px solid rgba(139, 92, 246, 0.45);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.85), 0 0 28px rgba(109, 61, 245, 0.3);
          white-space: nowrap !important;
          flex-shrink: 0;
          max-width: fit-content;
          margin: 0 auto;
        }

        .dock-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap !important;
          flex-shrink: 0;
          line-height: 1;
        }

        .dock-item svg,
        .dock-cta-btn svg,
        .dock-top-btn svg {
          flex-shrink: 0;
        }

        .dock-item span {
          white-space: nowrap !important;
        }

        .dock-item:active {
          transform: scale(0.94);
          background: rgba(109, 61, 245, 0.2);
          color: #FFFFFF;
        }

        .dock-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
          text-decoration: none;
          background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 50%, #FF5A36 100%);
          box-shadow: 0 4px 16px rgba(109, 61, 245, 0.55);
          transition: transform 0.2s ease;
          white-space: nowrap !important;
          flex-shrink: 0;
          line-height: 1;
        }

        .dock-cta-btn span {
          white-space: nowrap !important;
        }

        .dock-cta-btn:active {
          transform: scale(0.94);
          filter: brightness(1.15);
        }

        .dock-top-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .dock-top-btn:active {
          transform: scale(0.92);
          background: rgba(139, 92, 246, 0.3);
          color: #FFFFFF;
        }

        /* Ultra-compact screens like 320px - 340px */
        @media (max-width: 345px) {
          .mobile-quick-dock {
            padding: 0 6px;
            bottom: 14px;
          }
          .dock-container {
            padding: 5px 6px 5px 8px;
            gap: 4px;
          }
          .dock-item {
            padding: 6px 8px;
            font-size: 11.5px;
            gap: 4px;
          }
          .dock-cta-btn {
            padding: 6px 12px;
            font-size: 12px;
            gap: 4px;
          }
          .dock-top-btn {
            width: 32px;
            height: 32px;
          }
        }

        /* Hide on desktop/large screens so it is an exclusive mobile/tablet experience */
        @media (min-width: 769px) {
          .mobile-quick-dock {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
