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
    question: 'What is ExpenseX AI?',
    answer:
      'ExpenseX AI is an intelligent personal finance platform developed by Appstick. It eliminates manual expense logging by using AI perception across voice memos, camera receipt scans, and bank alert SMS to automatically organize your spending into structured financial intelligence.',
    keywords: 'What is ExpenseX, personal finance assistant, AI money management',
  },
  {
    question: 'How does AI expense tracking work?',
    answer:
      'Instead of typing transaction forms by hand, ExpenseX captures raw financial signals from your everyday activities—such as spoken voice notes ("Spent $42 on dinner"), photographed physical receipts, or bank debit SMS alerts. Our neural pipeline extracts the merchant, amount, category, and date, normalizes the data, detects duplicates, and records the verified entry directly into your budget ledger.',
    keywords: 'How AI expense tracking works, automatic expense tracker, NLP extraction',
  },
  {
    question: 'Can I add expenses using my voice?',
    answer:
      'Yes! Voice-based expense logging is one of ExpenseX AI\'s core capabilities. You simply speak naturally in conversational sentences like "I spent $18 on an Uber to downtown". The system transcribes the speech, extracts the relevant financial parameters, and creates a categorized expense entry in seconds without manual typing. Spoken audio is processed in ephemeral memory and discarded immediately.',
    keywords: 'Voice expense tracking, speak expenses, speech to expense, audio logging',
  },
  {
    question: 'How does receipt scanning work?',
    answer:
      'ExpenseX uses multi-modal AI vision OCR. Just snap a photo of any grocery slip, restaurant bill, or payment invoice. The system extracts the merchant name, total amount, taxes, currency, and line items, cross-verifies the arithmetic, and auto-assigns it to the correct budget envelope.',
    keywords: 'Receipt scanner, bill scanner, invoice OCR, camera expense capture',
  },
  {
    question: 'How does SMS transaction detection work?',
    answer:
      'On Android devices, with your explicit user consent, ExpenseX detects incoming bank debit and transaction alert SMS messages in the background. The engine accurately distinguishes between purchase amounts and available account balances, and categorizes the transaction immediately. ExpenseX is not a default SMS handler and strictly requests permissions for financial tracking.',
    keywords: 'SMS expense detection, bank alert parser, Android SMS money management',
  },
  {
    question: 'Is ExpenseX AI available on Android and iOS?',
    answer:
      'Yes. ExpenseX AI is officially launched and available for download on both the Google Play Store (Android) and Apple App Store (iOS). You can install the application directly from your device\'s app store and begin tracking right away.',
    keywords: 'Android and iOS, Google Play Store, Apple App Store, app availability',
  },
  {
    question: 'Is ExpenseX AI free to use?',
    answer:
      'Yes, ExpenseX AI offers a generous free tier that lets you track income and expenses, set dynamic envelope budgets, and experience automated tracking. For high-volume AI usage, expanded multi-modal OCR credits, and deep pattern analysis, flexible monthly, quarterly, half-yearly, and annual subscription plans are available.',
    keywords: 'Free expense tracker, pricing, free plan, subscription',
  },
  {
    question: 'What are the premium subscription benefits?',
    answer:
      'Premium subscriptions unlock expanded AI credits for receipt OCR scans and voice entries, advanced spending trend analysis, personalized financial recommendations, multiple wallets and currency accounts, and priority processing on our cloud neural pipeline.',
    keywords: 'Premium subscription, benefits, AI credits, Pro features',
  },
  {
    question: 'How is my financial information protected?',
    answer:
      'Security and data privacy are foundational at ExpenseX AI. All data in transit and at rest is protected with enterprise AES-256 KMS cloud encryption on Google Cloud. Your data is isolated in secure VPC environments, never sold, never shared with third-party advertising brokers, and never used to train public foundation models.',
    keywords: 'Data security, AES-256 encryption, Google Cloud KMS, privacy policy',
  },
  {
    question: 'Can I delete my account and financial data?',
    answer:
      'Yes, absolutely. Under our data autonomy principles, you have complete control over your records. You can export your financial history to CSV/JSON at any time, or request complete account and data deletion directly from your app settings, which permanently wipes all records from our systems.',
    keywords: 'Delete account, data export, data autonomy, privacy rights',
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
