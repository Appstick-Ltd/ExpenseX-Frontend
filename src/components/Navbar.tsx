import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../utils/constants';
import { Menu, X, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { isSoundEnabled, setSoundMuted, playMicroClick } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(isSoundEnabled());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundMuted(!next);
    if (next) {
      setTimeout(() => playMicroClick(), 50);
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container">
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '56px',
              padding: '0 20px',
              borderRadius: isScrolled ? '9999px' : '16px',
              background: isScrolled ? 'rgba(8, 11, 21, 0.82)' : 'transparent',
              backdropFilter: isScrolled ? 'blur(16px)' : 'none',
              WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
              border: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
              boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(109, 61, 245, 0.08)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Logo */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center' }}>
              <Logo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <div
              className="desktop-nav-links"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Action */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Audio Toggle (Prographers & 0110 Studio benchmark) */}
              <button
                onClick={toggleSound}
                title={soundActive ? 'Sound Effects Enabled' : 'Enable Tactile Sound FX'}
                aria-label="Toggle sound effects"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: '9999px',
                  background: soundActive ? 'rgba(109, 61, 245, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                  border: soundActive ? '1px solid #8B5CF6' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: soundActive ? '#FFFFFF' : 'var(--text-muted)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {soundActive ? <Volume2 size={14} color="#A78BFA" /> : <VolumeX size={14} />}
                <span className="sound-toggle-label" style={{ fontSize: '11px' }}>
                  {soundActive ? 'FX ON' : 'FX OFF'}
                </span>
              </button>

              <a
                href="#download"
                className="btn-primary desktop-cta"
                style={{
                  padding: '9px 18px',
                  fontSize: '13px',
                  borderRadius: '9999px',
                }}
              >
                <span>Get Started</span>
              </a>

              {/* Mobile Hamburger Toggle */}
              <button
                className="mobile-hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                style={{
                  display: 'none',
                  color: '#FFFFFF',
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            left: '16px',
            right: '16px',
            background: 'rgba(8, 11, 21, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '24px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(109, 61, 245, 0.2)',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{item.label}</span>
              <ArrowRight size={16} color="var(--purple-light)" />
            </a>
          ))}
          <a
            href="#download"
            className="btn-primary"
            onClick={() => setMobileMenuOpen(false)}
            style={{ width: '100%', marginTop: '8px' }}
          >
            <span>Get Started</span>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav-links, .desktop-cta {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
