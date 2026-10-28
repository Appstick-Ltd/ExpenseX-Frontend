'use client';
import React from 'react';
import { Building2, Users, CheckCircle2, Clock, Sparkles, Globe2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Card3DTilt } from '../ui/Card3DTilt';
import { TeamSection } from '../common/TeamSection';

export const ProductStage: React.FC = () => {
  const featureStatus = [
    {
      feature: 'AI Receipt & Invoice Vision OCR',
      description: 'Instant multi-modal extraction of merchant, tax, currency, and total amount from paper receipts.',
      status: 'Live',
      platform: 'Android & Web',
    },
    {
      feature: 'Bank Notification SMS Parsing',
      description: 'Automated recognition of incoming financial credit/debit alerts with user consent.',
      status: 'Live',
      platform: 'Android',
    },
    {
      feature: 'Conversational Voice Entry',
      description: 'Hands-free voice transcription and NLP parameter extraction ("Spent $42 on dinner").',
      status: 'Live',
      platform: 'Android & Web',
    },
    {
      feature: 'Dynamic Envelope Budgeting',
      description: 'Automated allocation across essential living, discretionary, and savings categories.',
      status: 'Live',
      platform: 'Android & Web',
    },
    {
      feature: 'Safe-to-Spend™ Cashflow Metric',
      description: 'Predictive daily velocity calculations factoring upcoming recurring bills and savings targets.',
      status: 'In Development',
      platform: 'Android & Web',
    },
    {
      feature: 'Digital Email Invoice Detection',
      description: 'Automated parsing of digital receipts forwarded from rides, delivery, and online orders.',
      status: 'In Development',
      platform: 'Cloud Pipeline',
    },
    {
      feature: 'WhatsApp AI Financial Assistant',
      description: 'Forward paper bills or text casual transactions via WhatsApp without opening the app.',
      status: 'In Development',
      platform: 'Cross-Platform Bot',
    },
    {
      feature: 'Long-Context Conversational Insights',
      description: 'Deep historical spend reasoning and conversational question answering on past trends.',
      status: 'In Development',
      platform: 'Vertex AI Pipeline',
    },
  ];

  return (
    <section id="product-stage" className="section-wrapper" style={{ position: 'relative', padding: '100px 0' }}>
      <div className="container">
        {/* Section 1: Our Business & Target Market */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Building2 size={14} style={{ marginRight: '6px' }} />
              <span>OUR BUSINESS &amp; MISSION</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(30px, 4.5vw, 46px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              Autonomous financial intelligence <br />
              <span className="text-gradient-purple">for the modern consumer.</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              ExpenseX AI is an intelligent financial automation software product developed, operated, and wholly owned by <strong>Appstick</strong>, an established software engineering company based in Khulna, Bangladesh.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <Card3DTilt
              className="glass-card"
              maxTilt={5}
              style={{ padding: '36px', borderRadius: '22px', background: 'rgba(14, 20, 38, 0.7)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(109, 61, 245, 0.15)', color: 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={20} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Business Description</h3>
              </div>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                Traditional personal finance software forces users into manual accounting labor—demanding that every purchase, receipt, and date be hand-typed. ExpenseX AI transforms this experience into ambient automation through multimodal machine perception. By leveraging Google Cloud infrastructure, Vertex AI, and secure client-side capture pipelines, ExpenseX AI converts noisy physical bills, speech memos, and alerts into verified financial records.
              </p>
            </Card3DTilt>

            <Card3DTilt
              className="glass-card"
              maxTilt={5}
              style={{ padding: '36px', borderRadius: '22px', background: 'rgba(14, 20, 38, 0.7)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255, 90, 54, 0.15)', color: 'var(--coral-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe2 size={20} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Target Market</h3>
              </div>
              <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                ExpenseX AI serves busy professionals, freelancers, self-employed creators, and everyday consumers who manage active spending across diverse channels. Built in English with multi-currency foundations, the product addresses both international digital users and South Asian markets, providing clear cashflow visibility, automated budget envelope tracking, and proactive overspending alerts without manual administrative overhead.
              </p>
            </Card3DTilt>
          </div>
        </div>

        {/* Section 2: Our Product & Current Stage */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
            <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              <Sparkles size={14} style={{ marginRight: '6px' }} />
              <span>CURRENT STATUS &amp; CAPABILITIES</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: '14px',
              }}
            >
              Product Capabilities &amp; Deployment Stage
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Transparent breakdown of core features that are currently operational versus features in active pipeline engineering.
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
                  <th style={{ padding: '14px 16px' }}>Scope &amp; Description</th>
                  <th style={{ padding: '14px 16px' }}>Platform</th>
                  <th style={{ padding: '14px 16px' }}>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {featureStatus.map((item) => (
                  <tr
                    key={item.feature}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '14px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <td style={{ padding: '16px', fontWeight: 700, color: '#FFFFFF' }}>{item.feature}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '13.5px', maxWidth: '340px', lineHeight: 1.5 }}>
                      {item.description}
                    </td>
                    <td style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>{item.platform}</td>
                    <td style={{ padding: '16px' }}>
                      {item.status === 'Live' ? (
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

        {/* Section 3: Meet the Team */}
        <TeamSection titleBadge="LEADERSHIP & PRODUCT TEAM" />
      </div>
    </section>
  );
};
