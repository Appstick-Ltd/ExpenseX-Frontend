'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { TeamSection } from '../common/TeamSection';
import { playMicroClick } from '../../helpers/audio';

export const AboutView: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          background:
            'radial-gradient(ellipse, rgba(109, 61, 245, 0.22) 0%, rgba(255, 90, 54, 0.08) 45%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>
          {/* Back Navigation Pill */}
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

          {/* 1 & 3: Team Section (Heading, 1-line intro, and 7-member Grid) */}
          <div style={{ marginBottom: '48px' }}>
            <TeamSection titleBadge="OUR CORE PRODUCT TEAM" />
          </div>

          {/* 2: Company Snapshot Card (Appstick Overview + HQ Address) */}
          <div
            className="glass-card"
            style={{
              padding: '28px 32px',
              borderRadius: '20px',
              border: '1px solid var(--border-medium)',
              background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.85) 0%, rgba(20, 26, 52, 0.75) 100%)',
              marginBottom: '56px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px',
                borderRadius: '999px',
                background: 'rgba(109, 61, 245, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                color: 'var(--purple-light)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '14px',
              }}
            >
              <Building2 size={13} /> COMPANY SNAPSHOT
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
              Appstick — Software Engineering &amp; Product Studio
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.68, margin: '0 0 16px 0' }}>
              ExpenseX AI is developed, operated, and maintained by <strong>Appstick</strong>, an incorporated software engineering and digital product studio headquartered at <strong>50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh</strong>. The seven-member engineering and design team works on ExpenseX AI directly from our Khulna headquarters.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                fontSize: '13px',
                color: 'var(--text-muted)',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>📍 HQ:</span>
              <span>50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh</span>
              <span>•</span>
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
                Visit Appstick Corporate Site <ArrowUpRight size={13} />
              </a>
              <span>•</span>
              <span>Primary Business: Custom Software &amp; AI Products</span>
            </div>
          </div>

          {/* 4: Product Capabilities & Status Table */}
          <div style={{ marginBottom: '56px' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>
                <CheckCircle2 size={14} style={{ marginRight: '6px' }} />
                <span>PRODUCT STATUS &amp; CAPABILITIES</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(24px, 3.4vw, 36px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                }}
              >
                Operational Scope &amp; Engineering Status
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  maxWidth: '640px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Verified disclosure of live production capabilities versus features currently undergoing active engineering development.
              </p>
            </div>

            <div
              className="glass-card"
              style={{
                borderRadius: '22px',
                padding: '24px',
                overflowX: 'auto',
                background: 'rgba(14, 20, 38, 0.75)',
                border: '1px solid var(--border-medium)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-muted)',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <th style={{ padding: '14px 16px' }}>Feature Capability</th>
                    <th style={{ padding: '14px 16px' }}>Description</th>
                    <th style={{ padding: '14px 16px' }}>Platform</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: 'AI Receipt & Invoice Vision OCR',
                      desc: 'Extraction of merchant, tax, currency, and total from physical receipts and invoices.',
                      platform: 'Android & Web',
                      status: 'Live',
                    },
                    {
                      name: 'Bank Notification SMS Parsing',
                      desc: 'Recognition of incoming bank transaction SMS notifications with explicit user consent.',
                      platform: 'Android',
                      status: 'Live',
                    },
                    {
                      name: 'Conversational Voice Entry',
                      desc: 'Natural language speech transcription and automated parameter parsing.',
                      platform: 'Android & Web',
                      status: 'Live',
                    },
                    {
                      name: 'Dynamic Envelope Budgeting',
                      desc: 'Automated allocation across essential living, discretionary, and savings categories.',
                      platform: 'Android & Web',
                      status: 'Live',
                    },
                    {
                      name: 'Safe-to-Spend™ Cashflow Metric',
                      desc: 'Predictive daily velocity calculations factoring upcoming recurring bills and savings targets.',
                      platform: 'Android & Web',
                      status: 'In Development',
                    },
                    {
                      name: 'Digital Email Invoice Detection',
                      desc: 'Automated parsing of digital receipts forwarded from rides, delivery, and online orders.',
                      platform: 'Cloud Pipeline',
                      status: 'In Development',
                    },
                    {
                      name: 'WhatsApp AI Financial Assistant',
                      desc: 'Forward bills or dictate transactions via WhatsApp assistant bot.',
                      platform: 'Cross-Platform Bot',
                      status: 'In Development',
                    },
                    {
                      name: 'Long-Context Conversational Insights',
                      desc: 'Deep historical spend reasoning and conversational question answering on past trends.',
                      platform: 'Vertex AI Pipeline',
                      status: 'In Development',
                    },
                  ].map((row) => (
                    <tr
                      key={row.name}
                      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '14px' }}
                    >
                      <td style={{ padding: '16px', fontWeight: 700, color: '#FFFFFF' }}>{row.name}</td>
                      <td
                        style={{
                          padding: '16px',
                          color: 'var(--text-secondary)',
                          fontSize: '13.5px',
                          maxWidth: '340px',
                          lineHeight: 1.5,
                        }}
                      >
                        {row.desc}
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                        {row.platform}
                      </td>
                      <td style={{ padding: '16px' }}>
                        {row.status === 'Live' ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              background: 'rgba(16, 185, 129, 0.14)',
                              color: '#10B981',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              fontSize: '12px',
                              fontWeight: 700,
                            }}
                          >
                            <CheckCircle2 size={13} /> Live
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              background: 'rgba(255, 90, 54, 0.14)',
                              color: 'var(--coral-accent)',
                              border: '1px solid rgba(255, 90, 54, 0.3)',
                              fontSize: '12px',
                              fontWeight: 700,
                            }}
                          >
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

          {/* 5: Google Cloud Platform Infrastructure Section (Concise & Factual) */}
          <div
            className="glass-card"
            style={{
              borderRadius: '22px',
              padding: '32px',
              marginBottom: '56px',
              background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.9) 0%, rgba(18, 14, 38, 0.85) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(109, 61, 245, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--purple-light)',
                }}
              >
                <Cpu size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Google Cloud Infrastructure
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0 }}>
                  Cloud architecture and security services used by ExpenseX AI
                </p>
              </div>
            </div>

            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '20px' }}>
              ExpenseX AI is developed in Khulna, Bangladesh, and relies on Google Cloud services for secure infrastructure, machine intelligence, and encryption:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Cpu size={16} color="#A78BFA" />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Vertex AI</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Multimodal foundation models for invoice and receipt extraction, financial categorization, and natural language understanding.
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Server size={16} color="#38BDF8" />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Google Cloud Run</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Containerized serverless microservices for reliable backend API delivery and isolated execution environments.
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '14px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <ShieldCheck size={16} color="#10B981" />
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>Google Cloud KMS</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Hardware-backed AES-256 key management protecting user financial transactions in transit and at rest.
                </div>
              </div>
            </div>
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
              <Link
                href="/"
                onClick={() => {
                  playMicroClick();
                  try {
                    sessionStorage.setItem('scroll_to_section', 'download');
                  } catch {}
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
              </Link>
              <Link
                href="/contact"
                onClick={() => playMicroClick()}
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
