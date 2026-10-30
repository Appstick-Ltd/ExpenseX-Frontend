import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  Cpu,
  ShieldCheck,
  Server,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Layers,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TeamSection } from '../../app/components/common/TeamSection';
import { playMicroClick } from '../utils/audio';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About ExpenseX AI — Autonomous Personal Finance by Appstick';
    window.scrollTo(0, 0);
  }, []);

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    playMicroClick();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateContact = (e: React.MouseEvent) => {
    e.preventDefault();
    playMicroClick();
    window.history.pushState(null, '', '/contact');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div
      className="app-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Cinematic Ambient Atmosphere Glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(109, 61, 245, 0.22) 0%, rgba(255, 90, 54, 0.08) 45%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>
          {/* Back Navigation Pill */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <a
              href="/"
              onClick={navigateHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--purple-light)',
                fontSize: '13.5px',
                fontWeight: 600,
                textDecoration: 'none',
                marginBottom: '32px',
                padding: '9px 18px',
                borderRadius: '999px',
                background: 'rgba(109, 61, 245, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(109, 61, 245, 0.22)';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(109, 61, 245, 0.12)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <ArrowLeft size={16} />
              Back to Overview
            </a>
          </motion.div>

          {/* Top Intro & Business Story */}
          <div style={{ marginBottom: '44px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Layers size={14} style={{ marginRight: '6px' }} />
              <span>ABOUT EXPENSEX AI &bull; MISSION &amp; ORIGIN</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Pioneering Autonomous Intelligence <br />
              <span className="text-gradient-purple">for Personal Cashflow Clarity.</span>
            </h1>
            <p style={{ fontSize: '16.5px', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
              ExpenseX AI was built on a foundational realization: traditional personal finance apps fail not because users lack financial discipline, but because manual bookkeeping creates continuous friction. Engineered by <strong>Appstick</strong>, ExpenseX AI replaces tedious form-filling with multi-modal AI perception—converting everyday spoken voice memos, physical camera receipts, and incoming bank SMS into verified financial intelligence.
            </p>
          </div>

          {/* Product Overview, Target Market & Production Deployment Stage */}
          <div
            className="glass-card"
            style={{
              padding: '36px 36px',
              borderRadius: '24px',
              border: '1px solid var(--border-medium)',
              background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.92) 0%, rgba(20, 26, 52, 0.82) 100%)',
              marginBottom: '48px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
            }}
          >
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '20px', letterSpacing: '-0.02em' }}>
              ExpenseX AI — Product Offering, Target Market &amp; Deployment Status
            </h3>

            {/* 3 Core Blocks: Business & Target Market, Product Offering, Current Stage */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px', marginBottom: '0' }}>
              {/* Block 1: Business Description & Target Market */}
              <div
                style={{
                  padding: '22px 24px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A78BFA', fontWeight: 700, fontSize: '15px', marginBottom: '10px' }}>
                  <Building2 size={16} /> Business &amp; Target Market
                </div>
                <p style={{ fontSize: '13.5px', color: 'rgba(226, 232, 240, 0.88)', lineHeight: 1.65, margin: 0, textAlign: 'justify' }}>
                  <strong>ExpenseX AI</strong> is an intelligent personal finance platform that eliminates manual financial data entry.
                  <br /><br />
                  <strong>Target Market:</strong> Built for digital professionals, freelancers, self-employed creators, remote workers, students, and busy consumers globally who need effortless, automated personal cashflow tracking, real-time receipt archiving, and budget control without manual spreadsheet maintenance.
                </p>
              </div>

              {/* Block 2: What We Offer (Product Capabilities) */}
              <div
                style={{
                  padding: '22px 24px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontWeight: 700, fontSize: '15px', marginBottom: '10px' }}>
                  <Cpu size={16} /> Specific Product Offering
                </div>
                <ul style={{ fontSize: '13px', color: 'rgba(226, 232, 240, 0.88)', lineHeight: 1.65, margin: 0, paddingLeft: '18px' }}>
                  <li style={{ marginBottom: '6px' }}><strong>Voice AI Logging:</strong> Natural speech-to-expense transcription and automated parameter parsing.</li>
                  <li style={{ marginBottom: '6px' }}><strong>Vision OCR Scanning:</strong> Instant receipt and invoice camera capture with merchant, tax, and item total extraction.</li>
                  <li style={{ marginBottom: '6px' }}><strong>Bank SMS Parsing:</strong> Automated transaction recognition from incoming bank SMS notifications on Android (with user consent).</li>
                  <li><strong>Envelope Budgeting:</strong> Multi-currency categorization and proactive spending alerts.</li>
                </ul>
              </div>

              {/* Block 3: Current Stage & Store Availability */}
              <div
                style={{
                  padding: '22px 24px',
                  borderRadius: '16px',
                  background: 'rgba(16, 185, 129, 0.04)',
                  border: '1px solid rgba(16, 185, 129, 0.22)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontWeight: 700, fontSize: '15px', marginBottom: '10px' }}>
                  <CheckCircle2 size={16} /> Current Stage: Live in Production
                </div>
                <p style={{ fontSize: '13.5px', color: 'rgba(226, 232, 240, 0.88)', lineHeight: 1.65, margin: '0 0 14px 0' }}>
                  ExpenseX AI is <strong>live in production</strong> on Google Play for Android, with the iOS release on the Apple App Store currently in review:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.expensexai.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#FFFFFF',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Google Play Store (Live)</span>
                    <ArrowUpRight size={14} color="#34D399" />
                  </a>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                    }}
                  >
                    <span>Apple App Store</span>
                    <span style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 700, padding: '2px 8px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                      COMING SOON &bull; IN REVIEW
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2: Company Snapshot Card (Appstick Overview + Products + Global Presence) */}
          <div
            className="glass-card"
            style={{
              padding: '36px 36px',
              borderRadius: '24px',
              border: '1px solid var(--border-medium)',
              background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.92) 0%, rgba(20, 26, 52, 0.82) 100%)',
              marginBottom: '56px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(109, 61, 245, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                color: 'var(--purple-light)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '16px',
              }}
            >
              <Building2 size={13} /> ABOUT APPSTICK
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Appstick — Software Engineering &amp; Digital Product Studio
            </h3>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.72, margin: '0 0 16px 0', textAlign: 'justify', textJustify: 'inter-word' }}>
              ExpenseX AI is ideated, engineered, and maintained by <strong>Appstick (Appstick Ltd.)</strong> — a full-cycle software company and digital product studio. Operating from our central headquarters in <strong>Khulna, Bangladesh</strong> with international presence in <strong>Colchester, Essex, United Kingdom</strong>, our multidisciplinary team of senior software engineers, mobile developers, and UI/UX designers delivers high-impact digital products built with strict processes, smart tools, and meticulous in-house oversight.
            </p>

            <p style={{ fontSize: '14.5px', color: 'rgba(226, 232, 240, 0.85)', lineHeight: 1.7, margin: '0 0 24px 0', textAlign: 'justify', textJustify: 'inter-word' }}>
              Beyond ExpenseX AI, Appstick empowers global brands and modern startups across SaaS development, cross-platform Android &amp; iOS mobile apps, custom AI/OCR integrations, high-concurrency cloud backends, and DevOps architectures. Appstick has successfully developed and shipped an extensive suite of enterprise platforms including <strong>Car2Go Pro</strong> (on-demand car sharing &amp; ride-sharing platform), <strong>Taxstick</strong> (tax filing &amp; compliance management), <strong>Gymstick</strong> (smart fitness &amp; gym management system), and <strong>Lawstick</strong> (law firm &amp; legal practice management system).
            </p>

            {/* 3 Core Capability Pillars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '26px',
              }}
            >
              <div
                style={{
                  padding: '20px 22px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A78BFA', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                  <Cpu size={16} /> Flagship AI Product
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  ExpenseX AI is built 100% in-house with dedicated model training, on-device OCR/voice parsing, and zero third-party vendor dependency.
                </div>
              </div>

              <div
                style={{
                  padding: '20px 22px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                  <Layers size={16} /> Proven Product Suite
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Creators of recognized production platforms including Car2Go Pro, Taxstick, Gymstick, and Lawstick deployed across global client markets.
                </div>
              </div>

              <div
                style={{
                  padding: '20px 22px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontWeight: 700, fontSize: '14px', marginBottom: '8px' }}>
                  <Globe size={16} /> Global Footprint
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Engineering headquarters in Khulna, Bangladesh, backed by international operational and corporate presence in Colchester, Essex, England.
                </div>
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                fontSize: '13px',
                color: 'var(--text-muted)',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>📍 Bangladesh HQ:</span>
                <span>50, KDA Outer Bypass Rd, Khulna 9100</span>
              </div>
              <span>&bull;</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>🇬🇧 UK Office:</span>
                <span>82 East Hill, Colchester, Essex</span>
              </div>
              <span>&bull;</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>📞 Phone:</span>
                <span>+88 014 0404 9797</span>
              </div>
              <span>&bull;</span>
              <a
                href="https://appstick.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--purple-light)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Visit appstick.com.bd <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* 4: Team Section (Heading, 1-line intro, and 7-member Grid) */}
          <div style={{ marginBottom: '56px' }}>
            <TeamSection titleBadge="OUR CORE PRODUCT TEAM" />
          </div>

          {/* 6: Bottom Action CTA Banner + Contact */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.25) 0%, rgba(255, 90, 54, 0.15) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              borderRadius: '24px',
              padding: '36px 40px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              boxShadow: '0 20px 50px rgba(109, 61, 245, 0.2)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '23px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                Experience ExpenseX AI Today
              </h3>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', margin: 0, maxWidth: '560px' }}>
                Automate your daily expense tracking with multi-modal machine intelligence and real-time cashflow clarity.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href="/"
                onClick={(e) => {
                  navigateHome(e);
                  try {
                    sessionStorage.setItem('scroll_to_section', 'download');
                  } catch { }
                }}
                className="btn-primary"
                style={{
                  padding: '13px 26px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Download ExpenseX AI <ArrowRight size={16} />
              </a>
              <a
                href="/contact"
                onClick={navigateContact}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '13px 22px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-medium)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Contact the Team
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
