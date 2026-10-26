'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, CheckCircle2, FileText, Database, KeyRound, Building2, Trash2 } from 'lucide-react';
import { playMicroClick } from '../../helpers/audio';

export const PrivacyPolicyView: React.FC = () => {
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
          background: 'radial-gradient(ellipse, rgba(109, 61, 245, 0.18) 0%, rgba(255, 90, 54, 0.05) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ paddingTop: '110px', paddingBottom: '90px', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>

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
          <div style={{ marginBottom: '48px' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Shield size={14} style={{ marginRight: '6px' }} />
              <span>DATA AUTONOMY &bull; ENTERPRISE CLOUD PRIVACY</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', letterSpacing: '-0.02em' }}>
              Privacy Policy &amp; Data Rights
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
              Effective Date: October 1, 2026 &bull; Published by Appstick &bull; Last Revised: October 12, 2026
            </p>
          </div>

          {/* Fast Privacy Summary Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginBottom: '40px',
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
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>AES-256 Cloud KMS</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Transactions are protected with hardware-isolated KMS keys and encrypted TLS 1.3 pipes.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '24px 20px', borderRadius: '18px', background: 'rgba(14, 20, 38, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38BDF8', marginBottom: '10px' }}>
                <Database size={20} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>No Public Model Training</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Enterprise Google Cloud APIs ensure user data is never used to train foundation models.
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
                ExpenseX AI (&ldquo;ExpenseX AI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a proprietary consumer finance software platform developed, owned, and globally operated by <strong>Appstick</strong>, an incorporated software engineering firm headquartered at 50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh. This policy governs data collected through <a href="https://expensexai.com" style={{ color: 'var(--purple-light)' }}>https://expensexai.com</a>, our iOS and Android mobile software, and backend cloud APIs.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="var(--purple-light)" />
                2. Categories of Information Collected &amp; Sources
              </h2>
              <p>To enable automated personal finance tracking and categorization, ExpenseX AI collects financial inputs solely from sources authorized by the user:</p>
              <ul style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><strong>Account Information:</strong> Name, verified email address, authentication credentials, and beta cohort status.</li>
                <li><strong>Receipt Photos &amp; Documents:</strong> Camera captures and uploaded digital images of receipts and invoices. Our vision processing pipeline extracts merchant name, total amount, taxes, currency, and line items.</li>
                <li><strong>Spoken Audio Logs:</strong> Temporary audio voice logs recorded when utilizing hands-free voice logging. Voice inputs are transcribed into structured financial parameters and discarded immediately after processing.</li>
                <li><strong>Bank Notification SMS Alerts:</strong> When users grant on-device SMS access permissions on supported mobile devices, our system parses incoming transactional debit/credit notifications. Personal text messages outside banking financial patterns are never inspected or uploaded.</li>
                <li><strong>Digital Invoices &amp; Email Receipts:</strong> Forwarded or synchronized purchase confirmation emails processed to extract merchant and billing data.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Lock size={20} color="var(--purple-light)" />
                3. Cloud Architecture &amp; Third-Party AI Providers
              </h2>
              <p>
                ExpenseX AI does not promise 100% on-device processing. To deliver high-accuracy multi-modal intelligence, data leaves the client device via encrypted TLS 1.3 transport to be processed in secure enterprise cloud environments:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><strong>Cloud Infrastructure:</strong> Hosted on Google Cloud Platform (GCP) with Virtual Private Clouds (VPC) and hardware-backed Key Management Service (KMS) AES-256 field encryption.</li>
                <li><strong>AI Inference Provider:</strong> Multi-modal document and speech recognition is powered by Google Cloud Vertex AI and Gemini enterprise APIs.</li>
                <li><strong>Zero Model Training:</strong> Under our enterprise agreements with Google Cloud, your personal transactions, receipt images, and voice prompts are <strong>never used to train or fine-tune public foundation models</strong>.</li>
                <li><strong>No Commercial Data Sharing:</strong> We do not sell, rent, monetize, or broker customer financial data to advertisers, data aggregators, or third parties.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} color="#10B981" />
                4. Data Retention &amp; Storage Lifecycle
              </h2>
              <p>
                We do not promise unrealistic &ldquo;zero retention&rdquo; while an account remains active, because continuous financial tracking requires historical records to compute your spending analytics, category breakdowns, and Safe to Spend margins:
              </p>
              <ul style={{ paddingLeft: '24px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><strong>Active Account Records:</strong> Categorized transactions, balances, custom category rules, and budgets are retained securely while your account remains open and active.</li>
                <li><strong>Ephemeral Voice Audio:</strong> Spoken audio recordings captured during voice logging are strictly ephemeral and processed in memory. Audio files are immediately discarded upon text transcription and intent extraction.</li>
                <li><strong>Statutory &amp; Accounting Records:</strong> In compliance with applicable legal, fiscal, and tax obligations (such as billing invoices or corporate accounting standards per NBR guidelines), certain subscription payment records and billing receipts may be retained for the mandatory statutory duration. Such records are strictly isolated and encrypted.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trash2 size={20} color="#EF4444" />
                5. User Data Deletion, Account Erasure &amp; Sovereignty Rights
              </h2>
              <p>
                You retain complete sovereign control over your personal and financial data. In adherence to global privacy regulations and mobile application platform policies (including Google Play and Apple App Store data deletion standards), we provide unambiguous, self-service, and support-assisted pathways to delete your data:
              </p>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 5.1 How to Request Deletion */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                    5.1 How to Request Account &amp; Data Deletion
                  </h3>
                  <p style={{ margin: '0 0 10px 0' }}>Users can initiate permanent account and data deletion through either of the following methods:</p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                      <strong>Direct In-App Deletion:</strong> Open the ExpenseX mobile app &rarr; Go to <strong>Settings / Profile</strong> &rarr; Select <strong>Privacy &amp; Security</strong> &rarr; Tap <strong>Delete Account &amp; Associated Data</strong> &rarr; Confirm your request with authentication (password or OTP).
                    </li>
                    <li>
                      <strong>Direct Web &amp; Email Deletion Request:</strong> If you no longer have access to the mobile application or prefer an external request, email our dedicated data desk at <a href="mailto:privacy@expensexai.com" style={{ color: 'var(--purple-light)', fontWeight: 600 }}>privacy@expensexai.com</a> with the subject <em>&ldquo;Data &amp; Account Deletion Request&rdquo;</em> from your registered email address. We verify your identity and process the deletion without requiring app re-installation.
                    </li>
                  </ul>
                </div>

                {/* 5.2 Scope of Data Permanently Deleted */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                    5.2 Scope of Data Permanently Deleted
                  </h3>
                  <p style={{ margin: '0 0 10px 0' }}>Upon processing your deletion request, the following records are permanently and irreversibly purged:</p>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Personal Identity:</strong> Full name, registered email address, phone number, profile preferences, and login credentials/authentication tokens.</li>
                    <li><strong>Financial Transactions:</strong> All logged income, expenses, custom merchant entries, category histories, payment tags, and personal notes.</li>
                    <li><strong>Captured Receipts &amp; Signals:</strong> All uploaded receipt images, camera captures, vision OCR tokens, parsed bank alert text, and synchronized digital invoice files.</li>
                    <li><strong>Budgets &amp; AI Intelligence:</strong> Savings goals, Safe to Spend parameters, financial health metrics, and conversational AI prompt history.</li>
                  </ul>
                </div>

                {/* 5.3 Timelines & SLA */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                    5.3 Deletion Execution Timelines
                  </h3>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Immediate Account Revocation:</strong> Your account is instantly deactivated, active sessions are invalidated, and you are signed out across all devices.</li>
                    <li><strong>Active Databases (Within 48–72 Hours):</strong> All personal and financial records are completely purged from active production databases and cloud object stores.</li>
                    <li><strong>Disaster Recovery Backups (Within 30 Days):</strong> Encrypted cyclical server backups rotate and permanently overwrite all residual snapshots within a maximum of 30 days.</li>
                  </ul>
                </div>

                {/* 5.4 Pre-Deletion Data Portability */}
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                    5.4 Data Portability Prior to Deletion
                  </h3>
                  <p style={{ margin: 0 }}>
                    Because data deletion is permanent and cannot be recovered, users have the right to download and export their complete financial ledger in open formats (standard CSV and JSON) directly from the application settings before requesting deletion.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Building2 size={20} color="var(--purple-light)" />
                6. Contact &amp; Governance Channels
              </h2>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-medium)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '16px', marginBottom: '4px' }}>Appstick (ExpenseX AI Privacy Governance)</div>
                <div>50, KDA Outer Bypass Rd, Khulna 9100, Bangladesh</div>
                <div style={{ marginTop: '8px' }}>
                  <strong>Corporate Inquiries:</strong> <a href="mailto:info@expensexai.com" style={{ color: 'var(--purple-light)' }}>info@expensexai.com</a>
                </div>
                <div>
                  <strong>User &amp; Technical Support:</strong> <a href="mailto:support@expensexai.com" style={{ color: 'var(--purple-light)' }}>support@expensexai.com</a>
                </div>
                <div>
                  <strong>Data Privacy Desk:</strong> <a href="mailto:privacy@expensexai.com" style={{ color: 'var(--purple-light)' }}>privacy@expensexai.com</a>
                </div>
                <div style={{ marginTop: '4px' }}><strong>Direct Telephone / WhatsApp:</strong> +880 1404-049797</div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyView;
