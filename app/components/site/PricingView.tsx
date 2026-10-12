'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Card3DTilt } from '../ui/Card3DTilt';
import { playMicroClick } from '../../helpers/audio';
import { openEarlyAccessModal } from '../../helpers/modalEvents';

export const PricingView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', width: '100%' }}>
      {/* Ambient Spotlight */}
      <div
        style={{
          position: 'absolute',
          top: '3%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.22) 0%, rgba(255, 90, 54, 0.08) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Back Pill Button */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Link
              href="/"
              onClick={() => playMicroClick()}
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
            </Link>
          </motion.div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Zap size={14} style={{ marginRight: '6px' }} />
              <span>TRANSPARENT PIONEER TIERS</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(34px, 5vw, 52px)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '16px',
                letterSpacing: '-0.025em',
              }}
            >
              Start Free Today. <br />
              <span className="gradient-text-coral">Grandfathered Lifetime Perks.</span>
            </h1>
            <p
              style={{
                fontSize: '17px',
                color: 'var(--text-secondary)',
                maxWidth: '640px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              ExpenseX AI is currently onboarding select beta users. Join our Pioneer cohort today to secure permanent premium feature perks at zero cost.
            </p>
          </div>

          {/* Pricing Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '64px',
            }}
          >
            {/* Pioneer Tier (Active Beta) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
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
                  border: '1.5px solid rgba(255, 90, 54, 0.45)',
                  background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.85) 0%, rgba(26, 18, 38, 0.8) 100%)',
                  boxShadow: '0 20px 50px rgba(255, 90, 54, 0.12)',
                  position: 'relative',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 90, 54, 0.15)',
                      border: '1px solid rgba(255, 90, 54, 0.4)',
                      color: 'var(--coral-accent)',
                      fontSize: '11.5px',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '5px 12px',
                      borderRadius: '999px',
                      marginBottom: '20px',
                    }}
                  >
                    <Sparkles size={13} /> CURRENT BETA &bull; LIMITED SPOTS
                  </div>

                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>Pioneer Pass</h2>
                  <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
                    Full automated expense capture access for early adopters. No credit card required.
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '52px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em' }}>$0</span>
                    <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>/ forever during beta program</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playMicroClick();
                      openEarlyAccessModal();
                    }}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      fontSize: '15px',
                      fontWeight: 700,
                      borderRadius: '14px',
                      marginBottom: '32px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    Claim Pioneer Access <ArrowRight size={16} />
                  </button>

                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px' }}>
                    Included Capabilities:
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Unlimited AI Vision OCR Receipt Scanning
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Conversational Voice Entry &amp; Natural Audio
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Bank SMS &amp; Digital Invoice Deduplication
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Safe-to-Spend™ Real-Time Daily Velocity Limit
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Dynamic Envelope Budgeting Engine
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> Cross-Platform Sync (iOS, Android, Web)
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: '#FFFFFF' }}>
                      <Check size={18} color="#10B981" /> 256-Bit Bank-Grade AES Encryption
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
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--purple-light)' }}>
                      <Check size={18} color="var(--purple-light)" /> Dedicated GPU Vertex AI Priority Inference
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14.5px', color: 'var(--purple-light)' }}>
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

            <Link
              href="/privacy-policy"
              onClick={() => playMicroClick()}
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
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingView;
