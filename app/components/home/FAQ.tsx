'use client';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { playMicroClick } from '../../helpers/audio';

interface FAQItem {
  question: string;
  answer: string;
  keywords: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is ExpenseX AI and how does it track expenses automatically?',
    answer:
      'ExpenseX AI is an autonomous personal finance platform and expense companion developed by Appstick. Unlike traditional manual budget apps, ExpenseX AI captures and categorizes transactions across camera receipt scans, bank SMS transaction alerts, natural language voice memos, and digital email invoices—eliminating manual typing friction.',
    keywords: 'AI expense tracker, automatic finance, receipt scanner',
  },
  {
    question: 'How does ExpenseX AI compare to traditional manual expense trackers?',
    answer:
      'Manual expense tracker apps require you to type every single merchant name, amount, date, and category, leading to tracker fatigue within weeks. ExpenseX AI operates on autopilot: our neural vision and NLP engine automatically extracts merchant data, taxes, currencies, and line items from receipts, audio, and messages, eliminating tedious manual typing.',
    keywords: 'Best expense tracker app, manual vs automatic, AI OCR',
  },
  {
    question: 'How does the Safe-to-Spend algorithm work?',
    answer:
      'Safe-to-Spend is a predictive financial health metric calculated by ExpenseX AI. It projects your recurring subscription bills, active savings goal commitments, and typical spending velocity to give you a single, clear daily and weekly spending ceiling so you never overdraft or fall short of your savings.',
    keywords: 'Safe to spend, smart budgets, financial health score',
  },
  {
    question: 'Is my financial data secure and private with ExpenseX AI?',
    answer:
      'Security is our highest priority. All data in transit and at rest is protected with enterprise AES-256 encryption via Google Cloud Key Management Service (KMS). Multi-modal extraction occurs in isolated enterprise cloud environments under strict confidentiality guarantees: we never sell your data, never broker transaction history to advertisers, and your personal financial information is never used to train public foundation models.',
    keywords: 'Enterprise cloud security, data privacy, AES-256 encryption',
  },
  {
    question: 'Which platforms and operating systems are supported?',
    answer:
      'ExpenseX AI is supported across Android mobile devices and all modern desktop web browsers. Your financial insights, budgets, and categorized transactions synchronize securely across all your authorized devices.',
    keywords: 'Android expense tracker, web budget dashboard, personal finance app',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    playMicroClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-wrapper faq-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 48px auto' }}>
          <div className="section-eyebrow">
            <Sparkles size={12} style={{ color: '#A78BFA' }} />
            <span>KNOWLEDGE BASE &amp; FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2
            className="section-headline faq-headline"
            style={{
              margin: '0 auto 16px auto',
              lineHeight: 1.22,
            }}
          >
            <span className="faq-line-1">Everything you need to know</span>
            <br />
            <span className="faq-line-2">
              about{' '}
              <span className="text-gradient-purple">ExpenseX AI.</span>
            </span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto', maxWidth: '640px' }}>
            Learn how autonomous expense tracking, multi-channel capture, and AI financial intelligence empower ExpenseX — Meet Your AI Money Assistant.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="faq-accordion-list" style={{ maxWidth: '820px', margin: '0 auto' }}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item-card ${isOpen ? 'active' : ''}`}
                onClick={() => toggleItem(index)}
                style={{
                  marginBottom: '14px',
                  borderRadius: '16px',
                  background: isOpen ? 'rgba(109, 61, 245, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isOpen
                    ? '1px solid rgba(139, 92, 246, 0.4)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {/* Accordion Header */}
                <div
                  className="faq-question-row"
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    gap: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      className="faq-icon-bubble"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        background: isOpen ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isOpen ? '#C084FC' : '#94A3B8',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <HelpCircle size={16} />
                    </div>
                    <h3
                      className="faq-question-text"
                      style={{
                        margin: 0,
                        fontSize: '16.5px',
                        fontWeight: 600,
                        color: isOpen ? '#FFFFFF' : '#E2E8F0',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.35,
                      }}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: isOpen ? '#C084FC' : '#64748B',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </div>

                {/* Accordion Body - Always kept in DOM for crawler indexation */}
                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer-body"
                  style={{
                    display: isOpen ? 'block' : 'none',
                    padding: '0 24px 22px 70px',
                    color: '#94A3B8',
                    fontSize: '14.5px',
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ margin: 0 }}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* End of FAQ Accordion */}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .faq-headline {
          font-size: clamp(24px, 4.4vw, 48px) !important;
          max-width: 880px;
          margin: 0 auto;
        }
        .faq-line-1 {
          display: inline-block;
          white-space: nowrap;
        }
        .faq-line-2 {
          display: inline-block;
          white-space: nowrap;
        }
        .faq-item-card:hover {
          border-color: rgba(139, 92, 246, 0.35) !important;
          background: rgba(109, 61, 245, 0.05) !important;
        }
        @media (max-width: 640px) {
          .faq-headline {
            font-size: clamp(20px, 5.5vw, 26px) !important;
          }
          .faq-question-row {
            padding: 16px 16px !important;
            gap: 12px !important;
          }
          .faq-question-text {
            font-size: 14.5px !important;
          }
          .faq-answer-body {
            padding: 0 16px 16px 16px !important;
            font-size: 13.5px !important;
            line-height: 1.55 !important;
          }
        }
      `}</style>
    </section>
  );
};
