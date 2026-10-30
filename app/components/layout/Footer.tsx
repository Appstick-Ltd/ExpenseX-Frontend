'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '../common/Logo';
import { Mail, MessageCircle, MapPin, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';
import { playMicroClick } from '../../helpers/audio';

export const Footer: React.FC = () => {
  const router = useRouter();

  const platformLinks = [
    { label: 'Home', href: '/', targetId: 'home' },
    { label: 'Voice AI', href: '/', targetId: 'voice-ai' },
    { label: 'How It Works', href: '/', targetId: 'tour' },
    { label: 'Capture Channels', href: '/', targetId: 'features' },
    { label: 'AI Financial Engine', href: '/', targetId: 'ai-engine' },
    { label: 'Roadmap', href: '/', targetId: 'roadmap' },
    { label: 'Frequently Asked Questions', href: '/', targetId: 'faq' },
  ];

  const companyLinks = [
    { label: 'Pricing & Plans', href: '/pricing', badge: 'PRO' },
    { label: 'About Us', href: '/about' },
    { label: 'Leadership & Team', href: '/about' },
    { label: 'Contact & Support', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId?: string,
    href: string = '/'
  ) => {
    e.preventDefault();
    playMicroClick();

    if (targetId) {
      if (typeof window !== 'undefined') {
        if (window.location.pathname === '/') {
          const el = document.getElementById(targetId);
          if (el) {
            const navOffset = 70;
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: Math.max(0, elementTop - navOffset),
              behavior: 'smooth',
            });
          }
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        } else {
          try {
            sessionStorage.setItem('scroll_to_section', targetId);
          } catch {}
          router.push('/');
        }
      }
      return;
    }

    router.push(href);
  };

  return (
    <footer className="expensex-footer">
      <div className="container">
        {/* ================= DESKTOP & TABLET 4-COLUMN VIEW ================= */}
        <div className="footer-desktop-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col-brand">
            <Logo size="md" />
            <p className="footer-brand-desc">
              Meet Your <span className="text-gradient-purple">AI Money Assistant.</span>
            </p>
            <p className="footer-brand-subtext">
              Turn your voice, receipts, and bank SMS into structured financial intelligence with zero manual typing.
            </p>

            {/* Official Store Download Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              <a
                href="https://play.google.com/store/apps/details?id=com.expensexai.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playMicroClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                <img src="/Google_Play_2022_icon.svg" alt="Google Play" style={{ width: '16px', height: '17px', objectFit: 'contain' }} />
                <span>Google Play</span>
              </a>

              <a
                href="https://apps.apple.com/app/expensex-ai/id6742358055"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playMicroClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="15" height="17" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.41-6.08-3.69-3.08-7.83-8.03-12.43-14.86-6.66-9.88-11.85-20.94-15.56-33.17-3.71-12.23-5.57-23.95-5.57-35.17 0-14.18 3.57-26.01 10.72-35.48 7.15-9.47 16.27-14.31 27.35-14.52 4.79 0 10.23 1.25 16.32 3.75 6.09 2.5 10.02 3.85 11.8 4.07 2.37-.43 6.64-1.89 12.82-4.38 6.17-2.49 11.45-3.62 15.83-3.4 12.18.63 21.94 4.88 29.28 12.73-10.66 6.42-15.89 15.35-15.69 26.79.2 8.91 3.64 16.33 10.33 22.26 6.69 5.93 14.65 9.38 23.88 10.35-2.36 6.96-5.18 13.91-8.46 20.84zM119.22 33.09c0-7.39 2.66-14.4 7.98-21.03 5.32-6.63 12.01-11.08 20.07-13.34-.14 1.48-.37 3.01-.69 4.59-.32 1.58-.87 3.27-1.65 5.08-1.54 3.63-3.8 7.15-6.78 10.56-2.98 3.41-6.52 5.98-10.62 7.71-2.45 1.05-4.87 1.83-7.26 2.34-.33-1.63-.61-3.26-.85-4.9-.24-1.64-.36-3.13-.36-4.47z" fill="#FFFFFF"/>
                </svg>
                <span>App Store</span>
              </a>
            </div>

            {/* Direct Channel Buttons */}
            <div className="footer-social-row">
              <a
                href="https://wa.me/8801404049797"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-pill-action"
                title="WhatsApp Support"
                aria-label="WhatsApp"
                onClick={playMicroClick}
              >
                <span className="live-dot" />
                <MessageCircle size={14} color="#25D366" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:support@expensexai.com"
                className="footer-pill-action"
                title="Email Support"
                aria-label="Email"
                onClick={playMicroClick}
              >
                <Mail size={14} color="#A78BFA" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-heading">PLATFORM</h4>
            <ul className="footer-clean-links">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link-item"
                    onClick={(e) => handleNavClick(e, link.targetId, link.href)}
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Plans (Moved from Navbar) */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-heading">COMPANY &amp; ACCESS</h4>
            <ul className="footer-clean-links">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link-item"
                    onClick={playMicroClick}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.35), rgba(255, 90, 54, 0.25))',
                          border: '1px solid rgba(167, 139, 250, 0.45)',
                          color: '#FDF4FF',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Contact */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">SUPPORT &amp; HEADQUARTERS</h4>
            <div className="footer-contact-list">
              {/* Corporate Inquiries */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(109, 61, 245, 0.16)', color: '#A78BFA', border: '1px solid rgba(139, 92, 246, 0.35)' }}
                >
                  <Mail size={16} />
                </div>
                <div>
                  <div className="footer-contact-label">CORPORATE &amp; PARTNERSHIPS</div>
                  <a
                    href="mailto:info@expensexai.com"
                    className="footer-contact-value"
                    onClick={playMicroClick}
                  >
                    info@expensexai.com
                  </a>
                </div>
              </div>

              {/* Customer Support */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(255, 90, 54, 0.16)', color: '#FF6B4A', border: '1px solid rgba(255, 90, 54, 0.35)' }}
                >
                  <Mail size={16} />
                </div>
                <div>
                  <div className="footer-contact-label">CUSTOMER &amp; USER SUPPORT</div>
                  <a
                    href="mailto:support@expensexai.com"
                    className="footer-contact-value"
                    onClick={playMicroClick}
                  >
                    support@expensexai.com
                  </a>
                </div>
              </div>

              {/* Privacy Office */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(56, 189, 248, 0.16)', color: '#38BDF8', border: '1px solid rgba(56, 189, 248, 0.35)' }}
                >
                  <Mail size={16} />
                </div>
                <div>
                  <div className="footer-contact-label">PRIVACY &amp; DATA DESK</div>
                  <a
                    href="mailto:privacy@expensexai.com"
                    className="footer-contact-value"
                    onClick={playMicroClick}
                  >
                    privacy@expensexai.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="footer-contact-row">
                <div
                  className="footer-icon-badge"
                  style={{ background: 'rgba(37, 211, 102, 0.16)', color: '#25D366', border: '1px solid rgba(37, 211, 102, 0.35)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.178-.175.2-.351.225-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.084-.176-.3-.019-.462.132-.612.136-.135.301-.35.451-.525.15-.176.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.588-.493-.508-.676-.517-.175-.009-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.053 1.028-1.053 2.508 0 1.48 1.078 2.908 1.228 3.109.15.2 2.121 3.24 5.138 4.544.718.31 1.278.496 1.715.635.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.303.176-1.429-.076-.125-.276-.2-.577-.35z" />
                    <path d="M12 2a10 10 0 0 0-8.62 15.08L2 22l5.08-1.33A10 10 0 1 0 12 2zm0 18.2a8.16 8.16 0 0 1-4.17-1.14l-.3-.18-3.09.81.82-3.01-.19-.31A8.2 8.2 0 1 1 12 20.2z" />
                  </svg>
                </div>
                <div>
                  <div className="footer-contact-label">WHATSAPP DIRECT</div>
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
                  style={{ background: 'rgba(109, 61, 245, 0.16)', color: '#A78BFA', border: '1px solid rgba(139, 92, 246, 0.35)' }}
                >
                  <MapPin size={16} />
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
              Meet Your <span className="text-gradient-purple">AI Money Assistant.</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#94A3B8', margin: '4px 0 14px 0', lineHeight: 1.45 }}>
              Track expenses automatically from voice, receipts, and bank SMS without manual typing.
            </p>

            <div className="footer-m-socials">
              <a
                href="https://wa.me/8801404049797"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-m-social-btn"
                onClick={playMicroClick}
              >
                <MessageCircle size={15} color="#25D366" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:support@expensexai.com"
                className="footer-m-social-btn"
                onClick={playMicroClick}
              >
                <Mail size={15} color="#A78BFA" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Mobile Company & Plans Card */}
          <div className="footer-m-card">
            <div className="footer-m-card-title">COMPANY &amp; PLANS</div>
            <div className="footer-m-grid-nav">
              {companyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-m-nav-item"
                  onClick={playMicroClick}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="footer-m-nav-text">{link.label}</span>
                    {link.badge && (
                      <span
                        style={{
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: '999px',
                          background: 'rgba(139, 92, 246, 0.35)',
                          color: '#C084FC',
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={13} className="footer-m-nav-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Platform Navigation */}
          <div className="footer-m-card">
            <div className="footer-m-card-title">EXPLORE PLATFORM</div>
            <div className="footer-m-grid-nav">
              {platformLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-m-nav-item"
                  onClick={(e) => handleNavClick(e, link.targetId, link.href)}
                >
                  <span className="footer-m-nav-text">{link.label}</span>
                  <ChevronRight size={13} className="footer-m-nav-arrow" />
                </a>
              ))}
            </div>
          </div>

          {/* Touch-Friendly Contact Details */}
          <div className="footer-m-card">
            <div className="footer-m-card-title">DIRECT CONTACT</div>
            <div className="footer-m-action-list">
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
                  <div className="footer-m-sub">WHATSAPP DIRECT</div>
                  <div className="footer-m-main">+880 1404-049797</div>
                </div>
                <ChevronRight size={16} className="footer-m-chevron" />
              </a>

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
            &copy; 2026 ExpenseX AI &bull; Developed &amp; operated by Appstick. All rights reserved.
          </div>
          <div className="footer-bottom-legal">
            <a href="/pricing" className="footer-legal-link">Pricing</a>
            <span className="footer-legal-dot">•</span>
            <a href="/about" className="footer-legal-link">About</a>
            <span className="footer-legal-dot">•</span>
            <a href="/contact" className="footer-legal-link">Contact</a>
            <span className="footer-legal-dot">•</span>
            <a href="/privacy-policy" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-legal-dot">•</span>
            <a href="/terms-of-service" className="footer-legal-link">Terms</a>
          </div>
          <div className="footer-powered-by">
            A Product of{' '}
            <a
              href="https://appstick.com.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-powered-by-link"
            >
              Appstick
            </a>
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

        /* Desktop 4-Column Layout */
        .footer-desktop-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr 1.1fr 1.35fr;
          gap: 44px;
          margin-bottom: 48px;
        }

        .footer-mobile-view {
          display: none;
        }

        .footer-brand-desc {
          font-size: 15px;
          font-weight: 500;
          line-height: 1.45;
          color: #CBD5E1;
          margin-top: 14px;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        .footer-brand-subtext {
          font-size: 13px;
          color: #64748B;
          line-height: 1.55;
          margin-bottom: 20px;
          max-width: 290px;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-pill-action {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          color: #CBD5E1;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-pill-action:hover {
          background: rgba(109, 61, 245, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #25D366;
          box-shadow: 0 0 8px #25D366;
        }

        .footer-heading {
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #E2E8F0;
          margin: 0 0 18px 0;
          text-transform: uppercase;
        }

        .footer-clean-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
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
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justifyContent: center;
          flex-shrink: 0;
          box-sizing: border-box;
          aspect-ratio: 1 / 1;
        }

        .footer-icon-badge svg {
          display: block;
          margin: auto;
          flex-shrink: 0;
        }

        .footer-contact-label {
          font-size: 10px;
          font-weight: 800;
          color: #64748B;
          letter-spacing: 0.08em;
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
          font-size: 12.5px;
          max-width: 240px;
          color: #94A3B8;
        }

        /* Mobile View Styles */
        .footer-m-card {
          border-radius: 18px;
          background: rgba(14, 20, 38, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.07);
          padding: 20px;
        }

        .footer-m-tagline {
          font-size: 14.5px;
          font-weight: 600;
          color: #CBD5E1;
          margin-top: 10px;
        }

        .footer-m-socials {
          display: flex;
          gap: 10px;
        }

        .footer-m-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
        }

        .footer-m-card-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #A78BFA;
          margin-bottom: 14px;
          text-transform: uppercase;
        }

        .footer-m-grid-nav {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .footer-m-nav-item {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          text-decoration: none;
          color: #CBD5E1;
          font-size: 13.5px;
        }

        .footer-m-nav-arrow {
          color: rgba(255, 255, 255, 0.3);
        }

        .footer-m-action-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-m-action-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          text-decoration: none;
          color: #FFFFFF;
        }

        .footer-m-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justifyContent: center;
          flex-shrink: 0;
        }

        .footer-m-sub {
          font-size: 9.5px;
          font-weight: 800;
          color: #64748B;
          letter-spacing: 0.08em;
        }

        .footer-m-main {
          font-size: 13px;
          color: #CBD5E1;
          font-weight: 600;
        }

        /* Bottom Copyright & Powered by Row - CSS Grid 3 Columns (Zero Overlap Guaranteed) */
        .footer-bottom-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          width: 100%;
          gap: 24px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 13px;
        }

        .footer-copyright {
          color: #64748B;
          text-align: left;
          white-space: nowrap;
          font-size: 12.5px;
        }

        .footer-bottom-legal {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 14px;
          text-align: center;
          white-space: nowrap;
          margin: 0 auto;
        }

        .footer-legal-link {
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.2s ease;
          font-size: 13px;
        }

        .footer-legal-link:hover {
          color: #FFFFFF;
        }

        .footer-legal-dot {
          color: #475569;
          font-size: 11px;
        }

        .footer-powered-by {
          color: #64748B;
          text-align: right;
          white-space: nowrap;
          font-size: 12.5px;
        }

        .footer-powered-by-link {
          color: #FFFFFF;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-powered-by-link:hover {
          color: #A78BFA;
        }

        @media (max-width: 1080px) {
          .footer-desktop-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 1150px) {
          .footer-bottom-row {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 14px;
          }
          .footer-copyright,
          .footer-powered-by {
            text-align: center;
            white-space: normal;
          }
          .footer-bottom-legal {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .footer-desktop-grid {
            display: none;
          }
          .footer-mobile-view {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
};
