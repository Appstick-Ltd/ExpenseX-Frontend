import React from 'react';
import { Logo } from './Logo';
import { Mail, MessageCircle, MapPin, ChevronRight } from 'lucide-react';
import { playMicroClick } from '../utils/audio';
import { openEarlyAccessModal } from '../utils/modalEvents';

export const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#tour' },
    { label: 'AI Engine', href: '#ai-engine' },
    { label: 'Safe to Spend', href: '#safe-to-spend' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' },
  ];

  const mobileNavLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#tour' },
    { label: 'AI Engine', href: '#ai-engine' },
    { label: 'Safe to Spend', href: '#safe-to-spend' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Early Access', href: '#', isVip: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      playMicroClick();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const navOffset = window.innerWidth <= 768 ? 36 : 24;
        const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, elementTop - navOffset),
          behavior: 'smooth',
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <footer className="expensex-footer">
      <div className="container">
        {/* ================= DESKTOP & TABLET VIEW ================= */}
        <div className="footer-desktop-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col-brand">
            <Logo size="md" />
            <p className="footer-brand-desc">
              Track less. <span className="text-gradient-purple">Know more.</span>
            </p>

            {/* Circular Social Badges */}
            <div className="footer-social-row">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-circle-social"
                title="Facebook"
                aria-label="Facebook"
                onClick={playMicroClick}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-circle-social"
                title="Instagram"
                aria-label="Instagram"
                onClick={playMicroClick}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-circle-social"
                title="YouTube"
                aria-label="YouTube"
                onClick={playMicroClick}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-circle-social"
                title="X (Twitter)"
                aria-label="X"
                onClick={playMicroClick}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <ul className="footer-clean-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link-item"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support & Contact */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">SUPPORT &amp; CONTACT</h4>
            <div className="footer-contact-list">
              {/* Email */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(255, 90, 54, 0.15)', color: '#FF5A36', border: '1px solid rgba(255, 90, 54, 0.3)' }}
                >
                  <Mail size={15} />
                </div>
                <div>
                  <div className="footer-contact-label">SUPPORT EMAIL</div>
                  <a
                    href="mailto:support@expensexai.com"
                    className="footer-contact-value"
                    onClick={playMicroClick}
                  >
                    support@expensexai.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', border: '1px solid rgba(37, 211, 102, 0.3)' }}
                >
                  <MessageCircle size={15} />
                </div>
                <div>
                  <div className="footer-contact-label">WHATSAPP CHAT</div>
                  <a
                    href="https://wa.me/8801404049797"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-value"
                    onClick={playMicroClick}
                  >
                    +880 1404-049797
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(109, 61, 245, 0.15)', color: '#A78BFA', border: '1px solid rgba(139, 92, 246, 0.3)' }}
                >
                  <MapPin size={15} />
                </div>
                <div>
                  <div className="footer-contact-label">OFFICE ADDRESS</div>
                  <div className="footer-contact-value address-text">
                    50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE EXCLUSIVE LUXURY UI ================= */}
        <div className="footer-mobile-view">
          {/* Mobile Brand Card */}
          <div className="footer-m-card footer-m-brand-card">
            <Logo size="md" />
            <div className="footer-m-tagline">
              Track less. <span className="text-gradient-purple">Know more.</span>
            </div>

            {/* Social Badges Row */}
            <div className="footer-m-socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-m-social-btn"
                title="Facebook"
                onClick={playMicroClick}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-m-social-btn"
                title="Instagram"
                onClick={playMicroClick}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-m-social-btn"
                title="YouTube"
                onClick={playMicroClick}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-m-social-btn"
                title="X (Twitter)"
                onClick={playMicroClick}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation 2-Column Balanced Grid */}
          <div className="footer-m-card">
            <div className="footer-m-card-title">EXPLORE PAGES</div>
            <div className="footer-m-grid-nav">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`footer-m-nav-item ${link.isVip ? 'footer-m-nav-vip' : ''}`}
                  onClick={(e) => {
                    if (link.isVip) {
                      e.preventDefault();
                      playMicroClick();
                      openEarlyAccessModal();
                    } else {
                      handleNavClick(e, link.href);
                    }
                  }}
                >
                  <span className="footer-m-nav-text">{link.label}</span>
                  {link.isVip ? (
                    <span className="footer-m-vip-badge">VIP</span>
                  ) : (
                    <ChevronRight size={13} className="footer-m-nav-arrow" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Touch-Friendly Action Rows for Contact */}
          <div className="footer-m-card">
            <div className="footer-m-card-title">DIRECT SUPPORT</div>
            <div className="footer-m-action-list">
              {/* WhatsApp Row */}
              <a
                href="https://wa.me/8801404049797"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-m-action-item"
                onClick={playMicroClick}
              >
                <div className="footer-m-icon-wrap" style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366' }}>
                  <MessageCircle size={16} />
                </div>
                <div className="footer-m-item-text">
                  <div className="footer-m-sub">WHATSAPP CHAT</div>
                  <div className="footer-m-main">+880 1404-049797</div>
                </div>
                <ChevronRight size={16} className="footer-m-chevron" />
              </a>

              {/* Email Row */}
              <a
                href="mailto:support@expensexai.com"
                className="footer-m-action-item"
                onClick={playMicroClick}
              >
                <div className="footer-m-icon-wrap" style={{ background: 'rgba(255, 90, 54, 0.15)', color: '#FF5A36' }}>
                  <Mail size={16} />
                </div>
                <div className="footer-m-item-text">
                  <div className="footer-m-sub">SUPPORT EMAIL</div>
                  <div className="footer-m-main">support@expensexai.com</div>
                </div>
                <ChevronRight size={16} className="footer-m-chevron" />
              </a>

              {/* Office Address Row */}
              <div className="footer-m-action-item" style={{ cursor: 'default' }}>
                <div className="footer-m-icon-wrap" style={{ background: 'rgba(109, 61, 245, 0.15)', color: '#A78BFA' }}>
                  <MapPin size={16} />
                </div>
                <div className="footer-m-item-text">
                  <div className="footer-m-sub">OFFICE HEADQUARTERS</div>
                  <div className="footer-m-main address-wrap">50, KDA Outer Bypass Rd, Khulna 9100, BD</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Powered by Row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © 2026 ExpenseX AI. All rights reserved.
          </div>
          <div className="footer-bottom-legal">
            <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-legal-dot">•</span>
            <a href="#terms" className="footer-legal-link">Terms of Service</a>
          </div>
          <div className="footer-powered-by">
            Powered by <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Appstick Ltd</strong>
          </div>
        </div>
      </div>

      <style>{`
        .expensex-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background-color: #070913;
          padding: 65px 0 40px 0;
          color: #94A3B8;
          position: relative;
        }

        /* Desktop Layout */
        .footer-desktop-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.3fr;
          gap: 60px;
          margin-bottom: 48px;
        }

        .footer-mobile-view {
          display: none;
        }

        .footer-brand-desc {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.5;
          color: #CBD5E1;
          margin-top: 14px;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-heading {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          margin: 0 0 18px 0;
          text-transform: uppercase;
        }

        .footer-clean-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .footer-link-item {
          font-size: 13.5px;
          color: #94A3B8;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-block;
        }

        .footer-link-item:hover {
          color: #FFFFFF;
          transform: translateX(3px);
        }

        .footer-circle-social {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #CBD5E1;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-circle-social:hover {
          background: rgba(109, 61, 245, 0.25);
          border-color: rgba(139, 92, 246, 0.5);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-contact-label {
          font-size: 10.5px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.07em;
          margin-bottom: 2px;
        }

        .footer-contact-value {
          font-size: 13.5px;
          color: #CBD5E1;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }

        .footer-contact-value:hover {
          color: #FFFFFF;
        }

        .address-text {
          line-height: 1.45;
          font-size: 13px;
          max-width: 240px;
        }

        .footer-bottom-row {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: #64748B;
          gap: 16px;
        }

        .footer-legal-link {
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-legal-link:hover {
          color: #94A3B8;
        }

        .footer-legal-dot {
          color: #334155;
        }

        /* Tablet Layout */
        @media (max-width: 992px) {
          .footer-desktop-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
          .footer-col-brand {
            grid-column: span 2;
          }
        }

        /* ================= MOBILE NATIVE UI ================= */
        @media (max-width: 640px) {
          .expensex-footer {
            padding: 32px 0 130px 0 !important; /* Clears floating dock */
          }

          .footer-desktop-grid {
            display: none !important;
          }

          .footer-mobile-view {
            display: flex !important;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 28px;
          }

          /* Glassmorphic Mobile Card Frame */
          .footer-m-card {
            background: rgba(18, 22, 42, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 20px;
            padding: 20px 18px;
          }

          .footer-m-brand-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 24px 20px;
            background: linear-gradient(180deg, rgba(23, 28, 56, 0.7) 0%, rgba(13, 16, 36, 0.8) 100%);
            border-color: rgba(139, 92, 246, 0.2);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          }

          .footer-m-tagline {
            font-size: 15px;
            font-weight: 500;
            color: #CBD5E1;
            margin-top: 10px;
            margin-bottom: 18px;
          }

          .footer-m-socials {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .footer-m-social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #CBD5E1;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .footer-m-social-btn:active {
            background: rgba(109, 61, 245, 0.3);
            border-color: rgba(139, 92, 246, 0.5);
            color: #FFFFFF;
            transform: scale(0.94);
          }

          .footer-m-card-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.09em;
            color: #A78BFA;
            margin-bottom: 14px;
            text-transform: uppercase;
          }

          /* 2-Column Balanced Grid Nav */
          .footer-m-grid-nav {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .footer-m-nav-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 11px 12px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.06);
            color: #CBD5E1;
            font-size: 13px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .footer-m-nav-item:active {
            background: rgba(109, 61, 245, 0.2);
            border-color: rgba(139, 92, 246, 0.4);
            color: #FFFFFF;
            transform: scale(0.98);
          }

          .footer-m-nav-text {
            font-size: 12.5px;
          }

          .footer-m-nav-arrow {
            color: #475569;
            flex-shrink: 0;
          }

          .footer-m-nav-vip {
            background: rgba(109, 61, 245, 0.12);
            border-color: rgba(139, 92, 246, 0.35);
            color: #E9D5FF;
          }

          .footer-m-vip-badge {
            font-size: 9.5px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 6px;
            background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 100%);
            color: #FFFFFF;
            letter-spacing: 0.04em;
          }

          /* Action Rows */
          .footer-m-action-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .footer-m-action-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 12px;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.05);
            text-decoration: none;
            color: inherit;
            transition: all 0.2s ease;
          }

          .footer-m-action-item:active {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.12);
            transform: scale(0.98);
          }

          .footer-m-icon-wrap {
            width: 34px;
            height: 34px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-right: 12px;
          }

          .footer-m-item-text {
            flex: 1;
            text-align: left;
          }

          .footer-m-sub {
            font-size: 9.5px;
            font-weight: 700;
            letter-spacing: 0.06em;
            color: #64748B;
            margin-bottom: 2px;
          }

          .footer-m-main {
            font-size: 13.5px;
            font-weight: 600;
            color: #F1F5F9;
          }

          .address-wrap {
            font-size: 12.5px;
            font-weight: 400;
            color: #CBD5E1;
            line-height: 1.35;
          }

          .footer-m-chevron {
            color: #475569;
            flex-shrink: 0;
          }

          /* Bottom Row */
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 10px !important;
            padding-top: 20px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
          }

          .footer-copyright {
            font-size: 12px;
            color: #64748B;
          }

          .footer-bottom-legal {
            font-size: 12.5px;
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .footer-legal-link {
            color: #94A3B8;
          }

          .footer-powered-by {
            font-size: 12px;
            color: #64748B;
            margin-top: 2px;
          }
        }
      `}</style>
    </footer>
  );
};
