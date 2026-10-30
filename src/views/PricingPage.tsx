import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card3DTilt } from '../components/Card3DTilt';
import { playMicroClick } from '../utils/audio';
import { openEarlyAccessModal } from '../utils/modalEvents';

export const PricingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Transparent Plans & Beta Access — ExpenseX AI';
    window.scrollTo(0, 0);
  }, []);

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    playMicroClick();
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleClaimBeta = () => {
    playMicroClick();
    openEarlyAccessModal();
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Background radial atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.2) 0%, rgba(255, 90, 54, 0.06) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1060px', margin: '0 auto', padding: '0 24px' }}>
          
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

          {/* Heading */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                <Sparkles size={14} style={{ marginRight: '6px' }} />
                <span>TRANSPARENT VALUE • ZERO HIDDEN FEES</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: 'clamp(34px, 5.5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '20px',
              }}
            >
              Simple, Predictable <span className="text-gradient-purple">Pricing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6 }}
            >
              Start for free today during our global public beta rollout. All founding pioneers secure permanent access benefits and early feature privileges.
            </motion.p>
          </div>

          {/* Pricing Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '72px',
              alignItems: 'stretch',
            }}
          >
            {/* Pioneer Tier (Active Live Plan) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card3DTilt
                maxTilt={6}
                style={{
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(17, 24, 48, 0.98) 0%, rgba(28, 18, 50, 0.95) 100%)',
                  border: '2px solid rgba(139, 92, 246, 0.6)',
                  borderRadius: '26px',
                  padding: '44px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 25px 60px -15px rgba(109, 61, 245, 0.3), 0 0 30px rgba(139, 92, 246, 0.2)',
                  position: 'relative',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #6D3DF5 100%)',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '6px 14px',
                      borderRadius: '999px',
                      marginBottom: '20px',
                      boxShadow: '0 4px 14px rgba(109, 61, 245, 0.4)',
                    }}
                  >
                    <Zap size={13} /> FREE TIER
                  </div>

                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Free Plan</h2>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
                    Core automated personal expense tracking with multi-modal AI inputs.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '52px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>$0</span>
                    <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>/ free forever</span>
                  </div>

                  <button
                    onClick={handleClaimBeta}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      fontSize: '15.5px',
                      fontWeight: 700,
                      borderRadius: '14px',
                      marginBottom: '32px',
                      cursor: 'pointer',
                    }}
                  >
                    Get Started Free <ArrowRight size={17} />
                  </button>

                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px' }}>
                    What&apos;s Included:
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Instant Vision OCR Receipt Scans
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Natural Voice Expense Entry
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Automated Bank SMS Parser (Android)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Dynamic Envelope Budgeting &amp; Limits
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Multi-Currency Transaction Ledger
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Enterprise AES-256 KMS Cloud Encryption
                    </li>
                  </ul>
                </div>
              </Card3DTilt>
            </motion.div>

            {/* Pro Tier (Roadmap / Commercial Model) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card3DTilt
                maxTilt={6}
                className="glass-card"
                style={{
                  height: '100%',
                  borderRadius: '26px',
                  padding: '44px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'rgba(14, 20, 38, 0.65)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-secondary)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      marginBottom: '20px',
                    }}
                  >
                    UPCOMING ROADMAP &bull; Q4 2026
                  </div>

                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>ExpenseX Pro</h2>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                    Engineered for high-frequency professionals, international jetsetters, and collaborative household vaults.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '52px', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '-0.03em' }}>$4.99</span>
                    <span style={{ fontSize: '15px', color: 'var(--text-dim)' }}>/ month (estimated launch price)</span>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '14px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'center',
                      marginBottom: '32px',
                    }}
                  >
                    Available Upon Global Launch
                  </div>

                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px' }}>
                    Pro Additions:
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      <Check size={18} color="var(--purple-light)" /> Everything in Pioneer Tier
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      <Check size={18} color="var(--purple-light)" /> Real-Time Multi-Currency Arbitrage
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      <Check size={18} color="var(--purple-light)" /> Multi-User Shared Family Vaults
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      <Check size={18} color="var(--purple-light)" /> Extended Memory AI Conversational Chat
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      <Check size={18} color="var(--purple-light)" /> Dedicated GPU Vertex AI Priority Inference
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--text-secondary)' }}>
                      <Check size={18} color="var(--purple-light)" /> Automated Tax Preparation Export (PDF/CSV)
                    </li>
                  </ul>
                </div>
              </Card3DTilt>
            </motion.div>
          </div>

          {/* Privacy Guarantee Banner */}
          <div
            className="glass-card"
            style={{
              borderRadius: '20px',
              padding: '28px 36px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Zero-Ad, Zero-Sale Guarantee</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>We monetize strictly through software utility. Your financial records are never sold or rented.</p>
              </div>
            </div>

            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                playMicroClick();
                window.history.pushState(null, '', '/privacy-policy');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              style={{
                fontSize: '13px',
                color: '#10B981',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Read Data Rights &rarr;
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
export default PricingPage;
