'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Cpu, ShieldCheck, Mail, Building2, CheckCircle2, Award, Zap, Lock, Globe2, ArrowRight, Clock, ArrowUpRight, Users } from 'lucide-react';
import { Card3DTilt } from '../ui/Card3DTilt';
import { playMicroClick } from '../../helpers/audio';
import { openEarlyAccessModal } from '../../helpers/modalEvents';

export const AboutView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div style={{ position: 'relative', overflowX: 'hidden', width: '100%' }}>
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

          {/* Hero Header */}
          <div style={{ marginBottom: '56px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Building2 size={14} style={{ marginRight: '6px' }} />
              <span>THE EXPENSEX AI STORY</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(34px, 5.5vw, 54px)',
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.1,
                marginBottom: '20px',
                letterSpacing: '-0.025em',
              }}
            >
              Building the world&apos;s most <br />
              <span className="gradient-text-coral">effortless money assistant.</span>
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'var(--text-secondary)',
                maxWidth: '780px',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Manual expense logging is fundamentally broken. Humans shouldn&apos;t spend evenings typing numbers into spreadsheets. ExpenseX AI combines multimodal machine vision, speech inference, and predictive cashflow models so your finances manage themselves.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '64px',
            }}
          >
            {stats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '24px 22px',
                    borderRadius: '18px',
                    border: '1px solid var(--border-medium)',
                    background: 'rgba(14, 20, 38, 0.7)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{s.label}</span>
                    <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.04)' }}>
                      {s.icon}
                    </div>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission & Founding Story Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '64px',
            }}
          >
            {/* Mission Card */}
            <Card3DTilt
              maxTilt={6}
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '40px',
                background: 'rgba(14, 20, 38, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: 'rgba(255, 90, 54, 0.12)',
                    border: '1px solid rgba(255, 90, 54, 0.3)',
                    color: 'var(--coral-accent)',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '20px',
                  }}
                >
                  <Sparkles size={14} /> OUR CORE MISSION
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
                  Zero Manual Typing. 100% Peace of Mind.
                </h2>
                <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Most budgeting apps fail because they place the data-entry burden onto the consumer. Without automation, tedious manual expense logging leads to tracker fatigue.
                </p>
                <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  ExpenseX AI is engineered around the premise of ambient intelligence: snap a receipt picture, dictate a quick voice note while walking, or forward a digital invoice. Our AI resolves the rest in sub-second inference pipelines.
                </p>
              </div>

              <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Globe2 size={20} color="var(--purple-light)" />
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Multi-currency &bull; Automated Transaction Recognition</span>
                </div>
              </div>
            </Card3DTilt>

            {/* Corporate Profile Card */}
            <Card3DTilt
              maxTilt={6}
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '40px',
                background: 'rgba(14, 20, 38, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
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
                    marginBottom: '20px',
                  }}
                >
                  <Building2 size={14} /> CORPORATE GOVERNANCE
                </div>
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
                  A Flagship Product of Appstick
                </h2>
                <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                  ExpenseX AI is conceived, developed, and globally operated by <strong>Appstick</strong>, an incorporated software engineering organization headquartered in Khulna, Bangladesh. ExpenseX AI is an official software product of Appstick and is not a separately incorporated entity.
                </p>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '14px', padding: '16px 20px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: '4px' }}>FOUNDER &amp; CEO</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF' }}>Md. Riaz Mahmud</div>
                  <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Technologist, Startup Founder &amp; AI Systems Architect</div>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Operating out of 50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh, with distributed cloud infrastructure deployed across Google Cloud regions worldwide.
                </p>
              </div>

              <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '24px' }}>
                <a
                  href="https://appstick.com.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--purple-light)',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Visit Appstick Corporate Site &rarr;
                </a>
              </div>
            </Card3DTilt>
          </div>

          {/* AI Pillars Section */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>
                <Cpu size={14} style={{ marginRight: '6px' }} />
                <span>ARCHITECTURAL FOUNDATION</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                The Four Pillars of ExpenseX Intelligence
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
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

          {/* Google Cloud Platform Blueprint */}
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
              ExpenseX AI is built on Google Cloud services to utilize state-of-the-art AI models, high-performance computing, and zero-trust infrastructure:
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

          {/* Product Capabilities & Deployment Stage */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>
                <Sparkles size={14} style={{ marginRight: '6px' }} />
                <span>PRODUCT STATUS &amp; CAPABILITIES</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Operational Scope &amp; Engineering Pipeline
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
                Clear disclosure of live production features versus capabilities currently undergoing active pipeline development.
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                borderRadius: '22px',
                padding: '28px',
                overflowX: 'auto',
                background: 'rgba(14, 20, 38, 0.75)',
                border: '1px solid var(--border-medium)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ padding: '14px 16px' }}>Feature Capability</th>
                    <th style={{ padding: '14px 16px' }}>Description</th>
                    <th style={{ padding: '14px 16px' }}>Platform</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'AI Receipt & Invoice Vision OCR', desc: 'Instant extraction of merchant, tax, currency, and total from paper receipts.', platform: 'Android & Web', status: 'Live' },
                    { name: 'Bank Notification SMS Parsing', desc: 'Automated recognition of incoming financial credit/debit alerts with user consent.', platform: 'Android', status: 'Live' },
                    { name: 'Conversational Voice Entry', desc: 'Hands-free voice transcription and NLP parameter extraction.', platform: 'Android & Web', status: 'Live' },
                    { name: 'Dynamic Envelope Budgeting', desc: 'Automated allocation across essential living and discretionary categories.', platform: 'Android & Web', status: 'Live' },
                    { name: 'Safe-to-Spend™ Cashflow Metric', desc: 'Predictive daily velocity calculations factoring recurring bills and savings goals.', platform: 'Android & Web', status: 'Live' },
                    { name: 'Digital Email Invoice Detection', desc: 'Automated parsing of digital receipts forwarded from rides, delivery, and online orders.', platform: 'Cloud Pipeline', status: 'In Development' },
                    { name: 'WhatsApp AI Financial Assistant', desc: 'Forward paper bills or text casual transactions via WhatsApp without opening the app.', platform: 'Cross-Platform Bot', status: 'In Development' },
                    { name: 'Long-Context Conversational Insights', desc: 'Deep historical spend reasoning and conversational question answering on past trends.', platform: 'Vertex AI Pipeline', status: 'In Development' },
                  ].map((row) => (
                    <tr key={row.name} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '14px' }}>
                      <td style={{ padding: '16px', fontWeight: 700, color: '#FFFFFF' }}>{row.name}</td>
                      <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13.5px', maxWidth: '340px', lineHeight: 1.5 }}>{row.desc}</td>
                      <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>{row.platform}</td>
                      <td style={{ padding: '16px' }}>
                        {row.status === 'Live' ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(16, 185, 129, 0.14)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '12px', fontWeight: 700 }}>
                            <CheckCircle2 size={13} /> Live
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', background: 'rgba(255, 90, 54, 0.14)', color: 'var(--coral-accent)', border: '1px solid rgba(255, 90, 54, 0.3)', fontSize: '12px', fontWeight: 700 }}>
                            <Clock size={13} /> In Development
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dedicated Team Section */}
          <div id="team" style={{ marginBottom: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>
                <Users size={14} style={{ marginRight: '6px' }} />
                <span>EXECUTIVE LEADERSHIP</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3.8vw, 38px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Meet the Team
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
                ExpenseX AI is engineered and maintained by the software engineering team at Appstick.
              </p>
            </div>

            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <Card3DTilt
                className="glass-card"
                maxTilt={6}
                style={{
                  borderRadius: '24px',
                  padding: '36px',
                  background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.85) 0%, rgba(20, 26, 52, 0.8) 100%)',
                  border: '1px solid var(--border-medium)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--purple-light)', fontWeight: 700, marginBottom: '6px' }}>
                      FOUNDER &amp; CEO — APPSTICK
                    </div>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0' }}>
                      Md. Riaz Mahmud
                    </h3>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                      Technologist, Startup Founder &amp; AI Systems Architect
                    </div>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/riaz-mahmud-appstick/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      background: 'rgba(109, 61, 245, 0.15)',
                      border: '1px solid rgba(139, 92, 246, 0.35)',
                      color: 'var(--purple-light)',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 20px 0' }}>
                  With over eight years of hands-on experience in enterprise software architecture, full-stack systems engineering, and technology leadership, Md. Riaz Mahmud founded Appstick to build reliable, high-performance software products. He directs ExpenseX AI&apos;s product strategy, multi-modal pipeline engineering, and cloud infrastructure deployment.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '13px', color: 'var(--text-dim)' }}>
                  <span>Headquarters: Khulna, Bangladesh</span>
                  <span>•</span>
                  <span>Parent Organization: Appstick</span>
                </div>
              </Card3DTilt>
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
                Experience ExpenseX AI Today
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0, maxWidth: '580px' }}>
                Automate your daily expense tracking with multi-modal machine intelligence and real-time cashflow clarity.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/#download"
                onClick={() => playMicroClick()}
                className="btn-primary"
                style={{ padding: '14px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Download ExpenseX AI <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                onClick={() => playMicroClick()}
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
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutView;
