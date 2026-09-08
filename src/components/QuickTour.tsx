import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOUR_STEPS } from '../utils/constants';
import { Mic, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Calendar, Zap } from 'lucide-react';
import { playMicroClick } from '../utils/audio';

export const QuickTour: React.FC = () => {
  const [[activeTab, direction], setActiveTab] = useState([0, 0]);

  const handleTabChange = (newIdx: number) => {
    if (newIdx === activeTab) return;
    playMicroClick();
    const dir = newIdx > activeTab ? 1 : -1;
    setActiveTab([newIdx, dir]);
  };

  const handleNext = () => {
    playMicroClick();
    const nextIdx = (activeTab + 1) % TOUR_STEPS.length;
    setActiveTab([nextIdx, 1]);
  };

  const handlePrev = () => {
    playMicroClick();
    const prevIdx = (activeTab - 1 + TOUR_STEPS.length) % TOUR_STEPS.length;
    setActiveTab([prevIdx, -1]);
  };

  const currentStep = TOUR_STEPS[activeTab];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir >= 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir >= 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="tour"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        position: 'relative',
        paddingTop: '60px',
        paddingBottom: '120px',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109, 61, 245, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot" />
            <span>TAKE A QUICK TOUR</span>
          </div>

          <h2 className="section-headline">
            Your financial life — <br />
            <span className="text-gradient-purple">on autopilot.</span>
          </h2>

          <p className="section-description" style={{ margin: '0 auto' }}>
            See how ExpenseX AI captures, organizes and understands your money without manual friction.
          </p>
        </div>

        {/* Floating Capsule Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div
            className="tour-tabs-container"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(11, 15, 30, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '6px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
              gap: '4px',
              position: 'relative',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            {TOUR_STEPS.map((step, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => handleTabChange(idx)}
                  style={{
                    position: 'relative',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    zIndex: 1,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tourTabCapsule"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.35) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        border: '1px solid rgba(167, 139, 250, 0.55)',
                        boxShadow: '0 0 24px rgba(109, 61, 245, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span>{step.tab}</span>
                  {step.isComingSoon && <span className="badge-coming-soon">SOON</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Tour Content Stage */}
        <div
          className="glass-card"
          style={{
            minHeight: '520px',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'radial-gradient(ellipse at top left, rgba(20, 27, 56, 0.7), rgba(8, 11, 21, 0.95))',
            position: 'relative',
          }}
        >
          <div
            className="tour-card-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.15fr',
              gap: '48px',
              alignItems: 'center',
              width: '100%',
              minHeight: '440px',
            }}
          >
            {/* Left Column: Fixed layout with animated text and STATIONARY buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                minHeight: '420px',
              }}
            >
              {/* Animated Text Content Only (Headline & Description) */}
              <div style={{ position: 'relative', minHeight: '260px', overflow: 'hidden' }}>
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--purple-light)',
                        fontSize: '13px',
                        fontWeight: 700,
                        marginBottom: '16px',
                      }}
                    >
                      <span>STEP {currentStep.id} OF 05</span>
                      {currentStep.isComingSoon && <span className="badge-coming-soon">COMING SOON</span>}
                    </div>

                    <h3
                      style={{
                        fontSize: 'clamp(28px, 3.2vw, 44px)',
                        fontWeight: 800,
                        lineHeight: 1.15,
                        marginBottom: '20px',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {currentStep.headline}
                    </h3>

                    <p
                      style={{
                        fontSize: '17px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                      }}
                    >
                      {currentStep.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* FIXED & STATIONARY CONTROLS (Never jumps, never slides out!) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: 'auto',
                  paddingTop: '24px',
                  flexWrap: 'nowrap',
                }}
              >
                {/* Prev Button: always in DOM, dims gracefully on step 0 */}
                <button
                  onClick={handlePrev}
                  disabled={activeTab === 0}
                  className="btn-secondary"
                  style={{
                    width: '88px',
                    height: '44px',
                    padding: '0 14px',
                    fontSize: '14px',
                    flexShrink: 0,
                    opacity: activeTab === 0 ? 0.35 : 1,
                    cursor: activeTab === 0 ? 'default' : 'pointer',
                    pointerEvents: activeTab === 0 ? 'none' : 'auto',
                    transition: 'opacity 0.25s ease, border-color 0.2s ease, background 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                  title="Previous Step"
                >
                  <ArrowLeft size={16} />
                  <span>Prev</span>
                </button>

                {/* Next Button: STRICT FIXED width (218px), strictly stationary container! */}
                <button
                  onClick={handleNext}
                  className="btn-primary"
                  style={{
                    width: '218px',
                    height: '44px',
                    padding: '0 16px',
                    fontSize: '14px',
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  title="Next Step"
                >
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: '22px',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                      <motion.span
                        key={activeTab}
                        initial={{ y: direction >= 0 ? 16 : -16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: direction >= 0 ? -16 : 16, opacity: 0 }}
                        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] as const }}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          fontWeight: 600,
                          fontSize: '14px',
                        }}
                      >
                        Next: {TOUR_STEPS[(activeTab + 1) % TOUR_STEPS.length].tab}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <ArrowRight size={16} style={{ flexShrink: 0, marginLeft: '6px' }} />
                </button>

                {/* Step Progress Dots: 5 stationary slots at fixed coordinates, zero shifting! */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  {TOUR_STEPS.map((_, dotIdx) => {
                    const isActive = activeTab === dotIdx;
                    return (
                      <button
                        key={dotIdx}
                        onClick={() => handleTabChange(dotIdx)}
                        style={{
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                        }}
                        title={`Go to step ${dotIdx + 1}`}
                      >
                        <div
                          style={{
                            width: isActive ? '20px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: isActive
                              ? 'linear-gradient(90deg, #A78BFA, #8B5CF6)'
                              : 'rgba(255, 255, 255, 0.22)',
                            boxShadow: isActive ? '0 0 12px rgba(139, 92, 246, 0.85)' : 'none',
                            transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease',
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Mockup Visual (Directional Slide) */}
            <div style={{ position: 'relative', minHeight: '380px', overflow: 'hidden' }}>
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ width: '100%' }}
                >
                  <div
                    style={{
                      background: 'rgba(5, 7, 13, 0.85)',
                      borderRadius: '20px',
                      padding: '32px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.6)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                {/* STEP 1: CAPTURE VISUAL */}
                {activeTab === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Voice prompt representation */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px 20px',
                        borderRadius: '16px',
                        background: 'rgba(109, 61, 245, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                      }}
                    >
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8B5CF6, #6D3DF5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 20px rgba(109, 61, 245, 0.6)',
                        }}
                      >
                        <Mic size={22} color="#FFFFFF" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ fontSize: '11px', color: 'var(--purple-light)', fontWeight: 700 }}>
                            USER VOICE INPUT • RECORDING
                          </div>
                          {/* Animated Soundwave Visualizer */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                            {[0.2, 0.5, 0.8, 0.3, 0.9, 0.4, 0.7, 0.2, 0.6, 1.0, 0.4, 0.3].map((delay, i) => (
                              <div
                                key={i}
                                className="soundwave-bar"
                                style={{ animationDelay: `${delay}s` }}
                              />
                            ))}
                          </div>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF', marginTop: '4px' }}>
                          "I spent 450 taka at Chillox for dinner yesterday."
                        </div>
                      </div>
                    </div>

                    {/* Animated Conversion Arrow */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'var(--purple-light)',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                      }}
                    >
                      <Sparkles size={16} />
                      <span>NATURAL LANGUAGE EXTRACTION</span>
                    </div>

                    {/* Clean structured output */}
                    <div
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AMOUNT</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>৳450</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MERCHANT</div>
                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>Chillox Burgers</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>CATEGORY</div>
                        <div
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#A78BFA',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A78BFA' }} />
                          Food & Dining
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DATE</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          Yesterday (Auto-resolved)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: ORGANIZE VISUAL */}
                {activeTab === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Raw string */}
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRadius: '14px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '11px', color: '#F87171', fontWeight: 700 }}>RAW BANK STRING:</span>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', color: '#FFFFFF' }}>
                          AMZN Mktp US*892019 DBL
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>৳5,200</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <div
                        style={{
                          height: '2px',
                          flex: 1,
                          background: 'linear-gradient(90deg, transparent, rgba(109, 61, 245, 0.5), transparent)',
                        }}
                      />
                      <span style={{ fontSize: '12px', color: 'var(--purple-light)', fontWeight: 700 }}>
                        AI RESOLUTION ENGINE
                      </span>
                      <div
                        style={{
                          height: '2px',
                          flex: 1,
                          background: 'linear-gradient(90deg, transparent, rgba(109, 61, 245, 0.5), transparent)',
                        }}
                      />
                    </div>

                    {/* Cleaned record */}
                    <div
                      style={{
                        padding: '20px',
                        borderRadius: '14px',
                        background: 'rgba(52, 211, 153, 0.08)',
                        border: '1px solid rgba(52, 211, 153, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            background: '#1F2937',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FF9900',
                            fontWeight: 800,
                            fontSize: '18px',
                          }}
                        >
                          a
                        </div>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Amazon</div>
                          <div style={{ fontSize: '12px', color: '#34D399' }}>Verified Merchant • Shopping</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>৳5,200</div>
                    </div>

                    {/* Pipeline checklist */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '4px' }}>
                      {['AI Categorization', 'Merchant Recognition', 'Duplicate Detection', 'Confirmation Queue'].map(
                        (feat) => (
                          <div
                            key={feat}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '12px',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <CheckCircle2 size={14} color="#8B5CF6" />
                            <span>{feat}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: UNDERSTAND VISUAL */}
                {activeTab === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                      <div
                        style={{
                          padding: '18px',
                          borderRadius: '14px',
                          background: 'rgba(109, 61, 245, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.25)',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--purple-light)', fontWeight: 700 }}>
                          FINANCIAL HEALTH
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                          78 <span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/ 100</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#34D399', fontWeight: 600, marginTop: '2px' }}>
                          ↑ 4 pts this month
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '18px',
                          borderRadius: '14px',
                          background: 'rgba(255, 90, 54, 0.08)',
                          border: '1px solid rgba(255, 90, 54, 0.25)',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: '#FF9A7B', fontWeight: 700 }}>SAFE TO SPEND</div>
                        <div style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                          ৳18,500
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          After bills & targets
                        </div>
                      </div>
                    </div>

                    {/* AI Insight Card */}
                    <div
                      style={{
                        padding: '18px',
                        borderRadius: '14px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#A78BFA',
                          marginBottom: '6px',
                        }}
                      >
                        <Zap size={14} />
                        <span>AI SPENDING RADAR</span>
                      </div>
                      <div style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 600 }}>
                        "Your food spending increased 18% this month."
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Driven by 4 weekend dinners. Transportation & utilities remained 6% below forecast.
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: PREDICT VISUAL */}
                {activeTab === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '8px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                        UPCOMING PAYMENTS
                      </span>
                      <span className="badge-coming-soon">COMING SOON</span>
                    </div>

                    {[
                      { name: 'Netflix Premium', date: 'Sep 12', amount: '৳1,200', cat: 'Subscription' },
                      { name: 'Dot Internet 50Mbps', date: 'Sep 15', amount: '৳1,000', cat: 'Utilities' },
                      { name: 'Apartment Rent', date: 'Sep 20', amount: '৳15,000', cat: 'Housing' },
                    ].map((bill) => (
                      <div
                        key={bill.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 16px',
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <Calendar size={18} color="var(--purple-light)" />
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{bill.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              Due {bill.date} • {bill.cat}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#F87171' }}>{bill.amount}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* STEP 5: IMPROVE VISUAL */}
                {activeTab === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      <div
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          background: 'rgba(52, 211, 153, 0.1)',
                          border: '1px solid rgba(52, 211, 153, 0.25)',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: '#34D399', fontWeight: 700 }}>SPENDING</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                          ↓ 12%
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(139, 92, 246, 0.25)',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: 'var(--purple-light)', fontWeight: 700 }}>SAVINGS</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                          ↑ 18%
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          background: 'rgba(255, 90, 54, 0.1)',
                          border: '1px solid rgba(255, 90, 54, 0.25)',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: '11px', color: '#FF9A7B', fontWeight: 700 }}>BUDGET</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>92%</div>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: '18px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.15), rgba(8, 11, 21, 0.8))',
                        border: '1px solid rgba(139, 92, 246, 0.35)',
                      }}
                    >
                      <div style={{ fontSize: '11px', color: 'var(--purple-light)', fontWeight: 700, marginBottom: '6px' }}>
                        AI RECOMMENDATION
                      </div>
                      <div style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 600 }}>
                        "Try reducing weekend dining by ৳500."
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        This adjustment alone will cover your entire quarterly internet subscription.
                      </div>
                    </div>

                    <div
                      style={{
                        textAlign: 'center',
                        fontSize: '15px',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--purple-light)',
                        paddingTop: '8px',
                      }}
                    >
                      Track less. Know more.
                    </div>
                  </div>
                )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tour-card-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};
