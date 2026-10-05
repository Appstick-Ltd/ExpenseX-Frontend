import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASK_EXPENSEX_SAMPLES } from '../utils/constants';
import { Bot, User, Send, Sparkles } from 'lucide-react';
import { Card3DTilt } from './Card3DTilt';
import { playMicroClick } from '../utils/audio';

export const AskExpenseX: React.FC = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const activeSample = ASK_EXPENSEX_SAMPLES[selectedQuestionIndex];

  return (
    <section
      className="section-wrapper"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 50px auto' }}>
          <div className="section-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span className="section-eyebrow-dot" />
            <span>CONVERSATIONAL FINANCE</span>
            <span className="badge-coming-soon" style={{ marginLeft: '4px' }}>
              COMING SOON
            </span>
          </div>

          <h2 className="section-headline">
            Ask your money <br />
            <span className="text-gradient-purple">anything.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            No digging through filter menus or exporting CSVs. Simply talk to your financial companion and get immediate, nuanced answers.
          </p>
        </div>

        {/* Minimal Futuristic Chat Container with 3D Tilt */}
        <Card3DTilt
          className="glass-card ask-card"
          maxTilt={6}
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'radial-gradient(ellipse at top, rgba(16, 23, 46, 0.8), rgba(8, 11, 21, 0.98))',
          }}
        >
          {/* Interactive Prompt Pills */}
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              TRY ASKING:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ASK_EXPENSEX_SAMPLES.map((sample, idx) => (
                <button
                  key={sample.question}
                  onClick={() => {
                    setSelectedQuestionIndex(idx);
                    playMicroClick();
                  }}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    background:
                      selectedQuestionIndex === idx
                        ? 'rgba(109, 61, 245, 0.25)'
                        : 'rgba(255, 255, 255, 0.04)',
                    border:
                      selectedQuestionIndex === idx
                        ? '1px solid #8B5CF6'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    color: selectedQuestionIndex === idx ? '#FFFFFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  "{sample.question}"
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div
            className="ask-chat-feed"
            style={{
              background: 'rgba(5, 7, 13, 0.7)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              minHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedQuestionIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {/* User Bubble */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      maxWidth: '75%',
                      background: 'rgba(109, 61, 245, 0.2)',
                      border: '1px solid rgba(139, 92, 246, 0.4)',
                      padding: '12px 18px',
                      borderRadius: '16px 16px 4px 16px',
                      color: '#FFFFFF',
                      fontSize: '15px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span>{activeSample.question}</span>
                    <User size={16} color="var(--purple-light)" />
                  </div>
                </div>

                {/* AI Assistant Bubble */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8B5CF6, #6D3DF5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 14px rgba(109, 61, 245, 0.5)',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={18} color="#FFFFFF" />
                  </div>
                  <div
                    style={{
                      maxWidth: '82%',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                      padding: '16px 20px',
                      borderRadius: '16px 16px 16px 4px',
                      color: 'var(--text-primary)',
                      fontSize: '15px',
                      lineHeight: 1.6,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--purple-light)',
                        fontWeight: 700,
                        marginBottom: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Sparkles size={13} />
                      <span>EXPENSEX INTELLIGENCE</span>
                    </div>
                    {activeSample.answer}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fake Input field demonstrating future experience */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px',
              padding: '12px 18px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted)',
              fontSize: '13.5px',
              gap: '12px',
            }}
          >
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              Ask a question about your expenses, budgets, or savings goals...
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(109, 61, 245, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                flexShrink: 0,
              }}
            >
              <Send size={14} />
            </div>
          </div>
        </Card3DTilt>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ask-card {
            padding: 20px 16px !important;
            border-radius: 18px !important;
          }
          .ask-chat-feed {
            padding: 16px 12px !important;
          }
        }
      `}</style>
    </section>
  );
};
