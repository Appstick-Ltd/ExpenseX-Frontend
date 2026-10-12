import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Cpu, ShieldCheck, Mail, Building2, CheckCircle2, Award, Zap, Lock, Globe2, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card3DTilt } from '../components/Card3DTilt';
import { playMicroClick } from '../utils/audio';
import { openEarlyAccessModal } from '../utils/modalEvents';

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

  const stats = [
    { value: 'Sub-Sec', label: 'AI Inference Speed', icon: <Zap size={18} color="#FF5A36" /> },
    { value: 'Multi-Modal', label: 'Vision, Voice & NLP', icon: <Award size={18} color="#A78BFA" /> },
    { value: 'Hands-Free', label: 'Autonomous Capture', icon: <Cpu size={18} color="#38BDF8" /> },
    { value: 'Zero Ads', label: 'No Model Training', icon: <Lock size={18} color="#10B981" /> },
  ];

  const aiPillars = [
    {
      icon: <Sparkles size={24} color="#FF5A36" />,
      tag: 'VISION OCR',
      title: 'Multi-Modal Receipt Intelligence',
      desc: 'Our proprietary vision pipeline extracts merchant names, tax breakdowns, itemized SKUs, and transaction totals from physical paper receipts and digital screenshots.',
      highlight: 'Sub-second parsing with high-accuracy neural vision models',
    },
    {
      icon: <Cpu size={24} color="#A78BFA" />,
      tag: 'SPEECH NLP',
      title: 'Conversational Voice Capture',
      desc: 'Speak your expenses naturally in any environment: "Spent $38 at Starbucks for team coffee". Our natural language inference extracts financial parameters without tedious form filling.',
      highlight: 'Zero manual typing required across mobile & desktop',
    },
    {
      icon: <CheckCircle2 size={24} color="#10B981" />,
      tag: 'BANK SYNC',
      title: 'Automated SMS & Invoice Parser',
      desc: 'Seamlessly recognizes incoming bank notification SMS alerts and digital receipt emails. Cross-checks payment methods and eliminates double-counted transactions in real time.',
      highlight: 'Smart deduplication with automatic envelope allocation',
    },
    {
      icon: <ShieldCheck size={24} color="#38BDF8" />,
      tag: 'PREDICTIVE AI',
      title: 'Safe-to-Spend™ Velocity Forecasting',
      desc: 'Combines historical cashflow velocity, upcoming recurring subscriptions, and active savings targets to give users a dynamic, real-time daily spending safety ceiling.',
      highlight: 'Continuous probabilistic cashflow protection',
    },
  ];

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>

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
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.22) 0%, rgba(255, 90, 54, 0.08) 45%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Navbar />

      <main style={{ flex: 1, paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>

          {/* Back Pill Button */}
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

          {/* Hero Header */}
          <div style={{ marginBottom: '56px', textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px auto' }}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
                <span className="section-eyebrow-dot" />
                <span>EXPENSEX AI • POWERED BY Appstick</span>
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
                marginBottom: '22px',
              }}
            >
              Building the Future of <br />
              <span className="text-gradient-purple">Autonomous Personal Finance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.65 }}
            >
              ExpenseX AI is an AI-first fintech platform founded to eliminate 100% of the manual labor behind personal bookkeeping. Developed with bank-grade encryption and multimodal AI, we transform scattered receipts, voice notes, and bank alerts into actionable financial clarity.
            </motion.p>
          </div>

          {/* Real-time Metric Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
              marginBottom: '56px',
            }}
          >
            {stats.map((st, i) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '24px 20px',
                    borderRadius: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '8px',
                    background: 'rgba(14, 20, 38, 0.7)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {st.icon}
                    <span style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{st.value}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>{st.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Official Startup & Founder Card with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: '64px' }}
          >
            <Card3DTilt
              maxTilt={6}
              style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 48, 0.95) 0%, rgba(26, 17, 46, 0.9) 100%)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '26px',
                padding: '40px',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(109, 61, 245, 0.18)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '32px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.3) 0%, rgba(255, 90, 54, 0.2) 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--purple-light)',
                    }}
                  >
                    <Building2 size={28} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Appstick</h2>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        VERIFIED ENTITY
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                      Incorporated Software Technology Firm &bull; Legal Owner of ExpenseX AI
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="https://appstick.com.bd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playMicroClick()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-medium)',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <Globe2 size={14} color="#A78BFA" /> Corporate Site
                  </a>
                  <a
                    href="mailto:info@expensexai.com"
                    onClick={() => playMicroClick()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: 'var(--purple-primary)',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <Mail size={14} /> info@expensexai.com
                  </a>
                </div>
              </div>

              {/* Grid of Verified Facts (Balanced 3x2 on desktop) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                }}
              >
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>PRODUCT NAME</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>ExpenseX AI</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Autonomous Money Assistant</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>FOUNDER &amp; LEADERSHIP</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Md. Riaz Mahmud</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Founder &amp; Chief Executive Officer</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>HEADQUARTERS LOCATION</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>Khulna 9100, Bangladesh</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>50, KDA Outer Bypass Rd</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>DEVELOPMENT STAGE</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981' }}>Public Beta &bull; Bootstrapped</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Global Multiplatform Launch</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>TARGET PLATFORMS</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>iOS, Android &amp; Web</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Real-Time Cloud Synchronization</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '18px 20px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>PRIMARY CLOUD STACK</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--purple-light)' }}>Google Cloud Platform</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Vertex AI, Cloud Run &amp; KMS</div>
                </div>
              </div>
            </Card3DTilt>
          </motion.div>

          {/* AI-First Technological Pillars */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px auto' }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '14px' }}>
                <Cpu size={14} style={{ marginRight: '6px' }} />
                <span>FOUNDATIONAL ARCHITECTURE</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
                Engineered from Day One as an <br />
                <span className="text-gradient-purple">AI-Native System</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
                We do not bolt AI on as a gimmicky feature. Every layer of the ExpenseX stack relies on multi-modal models to replace manual data entry with autonomous comprehension.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
              {aiPillars.map((pillar) => (
                <Card3DTilt
                  key={pillar.title}
                  maxTilt={8}
                  className="glass-card"
                  style={{
                    padding: '32px 28px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-medium)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {pillar.icon}
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', padding: '4px 10px', borderRadius: '6px', background: 'rgba(109, 61, 245, 0.15)', color: 'var(--purple-light)' }}>
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>{pillar.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px' }}>{pillar.desc}</p>
                  </div>

                  <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '12.5px', color: 'var(--purple-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>✦</span> {pillar.highlight}
                  </div>
                </Card3DTilt>
              ))}
            </div>
          </div>

          {/* Google Cloud Platform Integration & Infrastructure Blueprint */}
          <div
            className="glass-card"
            style={{
              borderRadius: '24px',
              padding: '40px',
              marginBottom: '64px',
              background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.9) 0%, rgba(18, 14, 38, 0.85) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(109, 61, 245, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple-light)' }}>
                <Cpu size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Google Cloud Platform Infrastructure Blueprint</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>Why ExpenseX AI relies on Google Cloud services</p>
              </div>
            </div>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              As a participant in the Google for Startups Cloud Program, ExpenseX AI is architected to utilize Google Cloud&apos;s state-of-the-art AI and distributed compute infrastructure:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>Vertex AI &amp; Gemini 1.5 / 2.0</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Multi-modal reasoning for complex invoice comprehension, financial categorization, and conversational assistance.</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>Google Cloud Run &amp; Serverless</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Auto-scaling microservices with sub-50ms cold starts to handle high-concurrency mobile user spikes worldwide.</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '14px', padding: '18px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>Google Cloud KMS &amp; Zero-Trust</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Hardware-backed AES-256 field-level key management ensuring user financial transactions remain confidential.</div>
              </div>
            </div>
          </div>

          {/* Action CTA Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.25) 0%, rgba(255, 90, 54, 0.15) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
              borderRadius: '24px',
              padding: '40px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              boxShadow: '0 20px 50px rgba(109, 61, 245, 0.2)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                Join the ExpenseX AI Pioneer Cohort
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, maxWidth: '580px' }}>
                Be among the first to experience automated expense intelligence with lifetime founding perks.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  playMicroClick();
                  openEarlyAccessModal();
                }}
                className="btn-primary"
                style={{ padding: '14px 28px', cursor: 'pointer' }}
              >
                Claim Free Early Access <ArrowRight size={16} />
              </button>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  playMicroClick();
                  window.history.pushState(null, '', '/contact');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-medium)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Contact Founders
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
