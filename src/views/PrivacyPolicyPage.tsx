import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, CheckCircle2, FileText, Database, KeyRound, Building2, Trash2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { playMicroClick } from '../utils/audio';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy & Data Rights — ExpenseX AI & Appstick';
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

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.18) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 75%)',
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

          {/* Heading */}
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Shield size={14} style={{ marginRight: '6px' }} />
              <span>DATA AUTONOMY &bull; GLOBAL PRIVACY CHARTER</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Privacy Policy &amp; Security Charter
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
              Effective Date: October 1, 2026 &bull; Published by Appstick &bull; Last Audited: October 6, 2026
            </p>
          </div>

          {/* Executive Security Highlights Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            <div className="glass-card" style={{ padding: '24px 20px', borderRadius: '18px', background: 'rgba(14, 20, 38, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10B981', marginBottom: '10px' }}>
                <Lock size={20} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>Zero Data Selling</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                We never monetize, broker, or sell personal records or receipts to third-party advertisers.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '24px 20px', borderRadius: '18px', background: 'rgba(14, 20, 38, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--purple-light)', marginBottom: '10px' }}>
                <KeyRound size={20} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>AES-256 Encryption</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Transactions are protected with hardware-isolated KMS keys and encrypted TLS 1.3 pipes.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '24px 20px', borderRadius: '18px', background: 'rgba(14, 20, 38, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38BDF8', marginBottom: '10px' }}>
                <Database size={20} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>Isolated AI Sessions</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                OCR and voice extractions occur in ephemeral, stateless sessions. No public training.
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
                <Building2 size={20} color="var(--purple-light)" />
                1. Data Controller &amp; Legal Entity
              </h2>
              <p>
                ExpenseX AI (&ldquo;ExpenseX AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by <strong>Appstick</strong>, an incorporated software engineering organization headquartered at 50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh. This policy governs data collected through <a href="https://expensexai.com" style={{ color: 'var(--purple-light)' }}>https://expensexai.com</a>, our iOS and Android mobile software, and backend APIs.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="var(--purple-light)" />
                2. Categories of Information Collected
              </h2>
              <p>To enable automated personal finance tracking, ExpenseX AI captures specific categories of transactional input:</p>
              <ul style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><strong>Account Identifiers:</strong> Name, verified business/personal email, authentication credentials, and beta referral codes.</li>
                <li><strong>Multi-Modal Receipt Images:</strong> Camera captures and uploaded image files of merchant receipts. Our vision OCR pipeline extracts line items, taxes, currency codes, and merchant metadata.</li>
                <li><strong>Audio Spoken Notes:</strong> Temporary audio voice logs recorded when utilizing hands-free voice logging. Audio files are converted into structured text and deleted immediately after intent resolution.</li>
                <li><strong>Financial Transaction Messages:</strong> Text excerpts from incoming bank SMS alerts and digital invoice confirmation emails when authorized by the user. Unrelated private messages are never accessed or stored.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lock size={20} color="var(--purple-light)" />
                3. Multi-Modal AI &amp; Cloud Infrastructure Standards
              </h2>
              <p>
                ExpenseX AI utilizes Google Cloud Platform (GCP) infrastructure, including Google Vertex AI and Gemini multimodal APIs for computational intelligence. Under our strict zero-retention policy:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Your private expense scans and voice notes are <strong>never used to train public third-party foundation models</strong>.</li>
                <li>Inference queries are processed in dedicated, secure virtual private clouds (VPC).</li>
                <li>All data at rest is encrypted with AES-256 using Google Cloud Key Management Service (KMS).</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} color="#10B981" />
                4. Data Retention Lifecycle &amp; Statutory Compliance
              </h2>
              <p>
                Continuous financial tracking requires historical records to compute your spending analytics and Safe to Spend margins while your account remains active. However, we uphold strict retention limitations:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Active Ledgers:</strong> Transaction records and custom categories are maintained securely while your account is active.</li>
                <li><strong>Ephemeral Audio Files:</strong> Voice notes recorded during hands-free logging are held in temporary memory and purged immediately upon transcription.</li>
                <li><strong>Statutory Retention (NBR &amp; Accounting Standards):</strong> In accordance with statutory legal and tax obligations, commercial subscription invoicing metadata is maintained for the duration mandated by applicable law, isolated and encrypted from active application databases.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trash2 size={20} color="#EF4444" />
                5. User Data Deletion &amp; Account Erasure
              </h2>
              <p>
                In compliance with global data privacy principles and app store data safety requirements (including Google Play and Apple App Store policies), you have the permanent right to delete your data and account:
              </p>

              <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                    How to Request Deletion:
                  </h3>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong>In-App:</strong> Open ExpenseX &rarr; Settings &rarr; Privacy &amp; Security &rarr; Tap &ldquo;Delete Account &amp; Data&rdquo;.</li>
                    <li><strong>Web / Email Request:</strong> Send an email to <a href="mailto:privacy@expensexai.com" style={{ color: 'var(--purple-light)' }}>privacy@expensexai.com</a> with the subject &ldquo;Data Deletion Request&rdquo; from your registered email.</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                    What Data is Deleted:
                  </h3>
                  <p style={{ margin: 0 }}>
                    All profile information, login credentials, transaction ledgers, uploaded receipt photos, OCR extracts, SMS parses, and conversational AI history are permanently erased. Active databases are cleared within 48–72 hours, and encrypted backup snapshots are expunged within 30 days.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={20} color="var(--purple-light)" />
                6. Privacy Inquiries &amp; Governance
              </h2>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '16px', marginBottom: '4px' }}>Appstick (ExpenseX AI Privacy Governance)</div>
                <div>50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh</div>
                <div>Official Contact: <a href="mailto:info@expensexai.com" style={{ color: 'var(--purple-light)' }}>info@expensexai.com</a> | <a href="mailto:privacy@expensexai.com" style={{ color: 'var(--purple-light)' }}>privacy@expensexai.com</a></div>
                <div>Direct Telephone / WhatsApp: +880 1404-049797</div>
              </div>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
export default PrivacyPolicyPage;
