import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { NAV_ITEMS } from '../utils/constants';
import { Menu, X, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { isSoundEnabled, setSoundMuted, playMicroClick } from '../utils/audio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#home');
  const [prevSection, setPrevSection] = useState<string>('#home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveSection = (newSection: string) => {
    setActiveSection((current) => {
      if (current !== newSection) {
        setPrevSection(current);
      }
      return newSection;
    });
  };

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    // Check initial hash on page load
    const initialHash = window.location.hash;
    if (initialHash && NAV_ITEMS.some((item) => item.href === initialHash)) {
      updateActiveSection(initialHash);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      if (isManualScrollRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Top of page check
      if (scrollY < 120) {
        updateActiveSection('#home');
        return;
      }

      // Bottom of page check
      if (scrollY + windowHeight >= docHeight - 80) {
        updateActiveSection('#privacy');
        return;
      }

      const checkPosition = scrollY + 220;

      // Sort sections by actual DOM top position so intermediate scroll regions map cleanly
      const sectionPositions = NAV_ITEMS.map((item) => {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        return {
          href: item.href,
          top,
          bottom: top + el.offsetHeight,
        };
      })
        .filter((s): s is { href: string; top: number; bottom: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      if (sectionPositions.length === 0) return;

      let current = sectionPositions[0].href;

      for (let i = 0; i < sectionPositions.length; i++) {
        const section = sectionPositions[i];
        const nextSection = sectionPositions[i + 1];

        if (nextSection) {
          if (checkPosition >= section.top && checkPosition < nextSection.top) {
            current = section.href;
            break;
          }
        } else {
          if (checkPosition >= section.top) {
            current = section.href;
          }
        }
      }

      updateActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundMuted(!next);
    if (next) {
      setTimeout(() => playMicroClick(), 50);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playMicroClick();
    updateActiveSection(href);
    isManualScrollRef.current = true;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Lock scroll spy while smooth scrolling takes place
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 850);

    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 76;
      const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: 'smooth',
      });
    }
  };

  // Rubber band physics calculations based on jump distance and direction
  const prevIdx = Math.max(0, NAV_ITEMS.findIndex((item) => item.href === prevSection));
  const currIdx = Math.max(0, NAV_ITEMS.findIndex((item) => item.href === activeSection));
  const distance = Math.abs(currIdx - prevIdx);
  const direction = currIdx >= prevIdx ? 1 : -1;

  // Dynamic stretch and squish factors: farther jumps stretch more!
  const stretchX = distance === 0 ? 1 : 1.15 + Math.min(distance * 0.08, 0.35);
  const squishY = distance === 0 ? 1 : Math.max(0.74, 1 - Math.min(distance * 0.06, 0.26));

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
              padding: '0 16px 0 20px',
              borderRadius: isScrolled ? '9999px' : '16px',
              background: isScrolled ? 'rgba(8, 11, 21, 0.84)' : 'rgba(8, 11, 21, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isScrolled ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: isScrolled
                ? '0 12px 36px -10px rgba(0, 0, 0, 0.6), 0 0 24px rgba(109, 61, 245, 0.12)'
                : '0 4px 20px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
              <Logo size="md" />
            </a>

            {/* Desktop Navigation Links with Elastic Rubber Band Pill */}
            <div
              className="desktop-nav-links"
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                padding: '4px 6px',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                position: 'relative',
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href;
                const isHovered = hoveredSection === item.href;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setHoveredSection(item.href)}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      position: 'relative',
                      fontSize: '13.5px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FFFFFF' : isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.62)',
                      padding: '7px 15px',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      zIndex: 1,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {/* Text Label with subtle 3D pop */}
                    <span
                      style={{
                        position: 'relative',
                        zIndex: 3,
                        letterSpacing: '-0.01em',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      {item.label}
                    </span>

                    {/* Elastic Rubber Band Active Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        initial={false}
                        animate={{
                          scaleX: [1, stretchX, 0.92, 1.05, 0.99, 1],
                          scaleY: [1, squishY, 1.09, 0.96, 1.01, 1],
                        }}
                        transition={{
                          layout: {
                            type: 'spring',
                            stiffness: 330,
                            damping: 17, // Hyper-elastic spring recoil!
                            mass: 0.72,
                          },
                          scaleX: {
                            duration: 0.52,
                            ease: [0.34, 1.56, 0.64, 1], // Elastic cubic bezier!
                          },
                          scaleY: {
                            duration: 0.52,
                            ease: [0.34, 1.56, 0.64, 1],
                          },
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          transformOrigin: direction > 0 ? 'left center' : 'right center',
                          background:
                            'linear-gradient(135deg, rgba(124, 58, 237, 0.38) 0%, rgba(109, 61, 245, 0.22) 100%)',
                          border: '1px solid rgba(167, 139, 250, 0.55)',
                          boxShadow:
                            '0 0 24px rgba(124, 58, 237, 0.48), inset 0 1px 1px rgba(255, 255, 255, 0.28)',
                          zIndex: 2,
                        }}
                      >
                        {/* Top glass gloss reflection edge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '18%',
                            right: '18%',
                            height: '1px',
                            background:
                              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75), transparent)',
                          }}
                        />

                        {/* Elastic bottom neon accent ray with stretch rebound */}
                        <motion.div
                          animate={{
                            width: ['16px', `${22 + distance * 6}px`, '13px', '21px', '18px'],
                          }}
                          transition={{
                            duration: 0.52,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                          style={{
                            position: 'absolute',
                            bottom: '-1px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: '2px',
                            borderRadius: '9999px',
                            background: 'linear-gradient(90deg, #A78BFA, #FF7A59)',
                            boxShadow: '0 0 10px rgba(167, 139, 250, 0.95), 0 0 4px #FF7A59',
                          }}
                        />
                      </motion.div>
                    )}

                    {/* Hover preview pill */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="hoverNavPill"
                        transition={{
                          type: 'spring',
                          stiffness: 460,
                          damping: 34,
                        }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          background: 'rgba(255, 255, 255, 0.055)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          zIndex: 1,
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
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
                onClick={(e) => handleNavClick(e, '#download')}
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

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 98,
          }}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '76px',
            left: '16px',
            right: '16px',
            maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            background: 'rgba(8, 11, 21, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '20px',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(109, 61, 245, 0.2)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(e, item.href);
                  setMobileMenuOpen(false);
                }}
                style={{
                  fontSize: '15px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(109, 61, 245, 0.12))'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(167, 139, 250, 0.35)'
                    : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{item.label}</span>
                <ArrowRight
                  size={16}
                  color={isActive ? '#A78BFA' : 'rgba(255, 255, 255, 0.3)'}
                />
              </a>
            );
          })}
          <a
            href="#download"
            className="btn-primary"
            onClick={(e) => {
              handleNavClick(e, '#download');
              setMobileMenuOpen(false);
            }}
            style={{ width: '100%', marginTop: '6px' }}
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
        @media (max-width: 480px) {
          .sound-toggle-label {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

