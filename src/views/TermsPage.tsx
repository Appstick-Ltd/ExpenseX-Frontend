import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Scale, Building2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { playMicroClick } from '../utils/audio';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service — ExpenseX AI & Appstick';
    window.scrollTo(0, 0);
  }, []);

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    playMicroClick();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.18) 0%, rgba(255, 90, 54, 0.05) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>

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

          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Scale size={14} style={{ marginRight: '6px' }} />
              <span>LEGAL OPERATING AGREEMENT</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Terms of Service
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
              Effective Date: October 1, 2026 &bull; Published by Appstick &bull; Last Revised: October 6, 2026
            </p>
          </div>

          {/* Important Financial Advisory Disclaimer Banner */}
          <div
            style={{
              background: 'rgba(255, 90, 54, 0.08)',
              border: '1px solid rgba(255, 90, 54, 0.3)',
              borderRadius: '20px',
              padding: '28px 32px',
              marginBottom: '40px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ color: 'var(--coral-accent)', marginTop: '2px', flexShrink: 0 }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                Important Financial Disclaimer
              </h3>
              <p style={{ fontSize: '14.5px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                ExpenseX AI is an algorithmic organization and expense tracking platform. ExpenseX AI and Appstick are not licensed financial planners, brokers, or tax advisors. Predictions (such as the Safe-to-Spend™ metric) are computational projections and should not be considered fiduciary advice.
              </p>
            </div>
          </div>

          {/* Legal Body Container */}
          <div
            className="glass-card"
            style={{
              padding: '44px 40px',
              borderRadius: '24px',
              background: 'rgba(14, 20, 38, 0.75)',
              display: 'flex',
              flexDirection: 'column',
              gap: '36px',
              color: 'var(--text-secondary)',
              fontSize: '15.5px',
              lineHeight: 1.75,
            }}
          >
            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="var(--purple-light)" />
                1. Acceptance of Binding Agreement
              </h2>
              <p>
                By creating an account, accessing <a href="https://expensexai.com" style={{ color: 'var(--purple-light)' }}>https://expensexai.com</a>, or utilizing ExpenseX AI mobile applications, you agree to comply with and be bound by these Terms of Service between you and <strong>Appstick</strong>
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="var(--purple-light)" />
                2. Scope of Service &amp; Availability
              </h2>
              <p>
                ExpenseX AI provides an automated software service that categorizes expenditures through machine vision OCR, voice processing, and transaction parsing. We strive for 99.9% uptime; however, services may occasionally undergo scheduled maintenance or cloud infrastructure upgrades.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={20} color="var(--purple-light)" />
                3. Intellectual Property Ownership
              </h2>
              <p>
                All brand marks, logos, user experience designs, computer vision algorithms, and backend software systems associated with ExpenseX AI are the exclusive intellectual property of Appstick You are granted a personal, non-transferable license to access the platform.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={20} color="var(--purple-light)" />
                4. Governing Jurisdiction
              </h2>
              <p>
                These Terms shall be interpreted in accordance with the laws of Bangladesh. Any dispute arising under these terms shall be resolved exclusively within the competent judicial courts of Khulna or Dhaka, Bangladesh.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={20} color="var(--purple-light)" />
                5. Legal Contact Information
              </h2>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '16px', marginBottom: '4px' }}>Appstick (Legal Affairs)</div>
                <div>50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh</div>
                <div>Official Email: <a href="mailto:info@expensexai.com" style={{ color: 'var(--purple-light)' }}>info@expensexai.com</a></div>
                <div>Telephone / WhatsApp: +880 1404-049797</div>
              </div>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
export default TermsPage;
