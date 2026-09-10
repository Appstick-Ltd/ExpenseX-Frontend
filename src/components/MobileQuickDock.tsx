import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, ArrowUp, Zap } from 'lucide-react';
import { playMicroClick } from '../utils/audio';
import { triggerHaptic } from '../utils/haptics';

export const MobileQuickDock: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user scrolls past hero section (320px)
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playMicroClick();
    triggerHaptic('medium');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = () => {
    playMicroClick();
    triggerHaptic('selection');
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="mobile-quick-dock">
        <div className="dock-container">
          <a
            href="#tour"
            onClick={handleNavClick}
            className="dock-item"
            title="Quick Tour"
          >
            <Compass size={16} />
            <span>Tour</span>
          </a>

          <a
            href="#features"
            onClick={handleNavClick}
            className="dock-item"
            title="AI Features"
          >
            <Sparkles size={16} />
            <span>AI Core</span>
          </a>

          <a
            href="#cta"
            onClick={handleNavClick}
            className="dock-cta-btn"
          >
            <Zap size={14} fill="#FFFFFF" />
            <span>Get App</span>
          </a>

          <button
            onClick={scrollToTop}
            className="dock-top-btn"
            title="Back to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .mobile-quick-dock {
          position: fixed;
          bottom: 16px;
          left: 0;
          right: 0;
          z-index: 998;
          display: flex;
          justify-content: center;
          padding: 0 16px;
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
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 9999px;
          background: rgba(14, 18, 38, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.75), 0 0 24px rgba(109, 61, 245, 0.3);
        }

        .dock-item {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .dock-item:active {
          transform: scale(0.94);
          background: rgba(109, 61, 245, 0.2);
          color: #FFFFFF;
        }

        .dock-cta-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 9999px;
          font-size: 12.5px;
          font-weight: 700;
          color: #FFFFFF;
          text-decoration: none;
          background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 50%, #FF5A36 100%);
          box-shadow: 0 4px 14px rgba(109, 61, 245, 0.5);
          transition: transform 0.2s ease;
        }

        .dock-cta-btn:active {
          transform: scale(0.94);
          filter: brightness(1.15);
        }

        .dock-top-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dock-top-btn:active {
          transform: scale(0.92);
          background: rgba(139, 92, 246, 0.3);
          color: #FFFFFF;
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
