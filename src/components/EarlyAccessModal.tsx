import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, CheckCircle2, User, Mail, MapPin, Smartphone } from 'lucide-react';
import { subscribeToEarlyAccessModal } from '../utils/modalEvents';
import { playMicroClick, playSuccessChime } from '../utils/audio';
import { triggerHaptic } from '../utils/haptics';

const FEATURES_LIST = [
  { id: 'receipt', label: 'Receipt OCR Scan', icon: '🧾' },
  { id: 'sms', label: 'Bank SMS Detection', icon: '💬' },
  { id: 'voice', label: 'Hands-Free Voice AI', icon: '🎙️' },
  { id: 'whatsapp', label: 'WhatsApp AI Bot', icon: '🤖' },
  { id: 'safe_spend', label: 'Safe-to-Spend Limit', icon: '🛡️' },
  { id: 'budgets', label: 'Smart Budget Envelopes', icon: '🎯' },
];

export const EarlyAccessModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'both'>('ios');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'receipt',
    'sms',
    'safe_spend',
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    const unsubscribe = subscribeToEarlyAccessModal((detail) => {
      if (detail.platform === 'ios') setPlatform('ios');
      else if (detail.platform === 'android') setPlatform('android');
      else setPlatform('both');
      setIsSubmitted(false);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeModal = () => {
    playMicroClick();
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const toggleFeature = (id: string) => {
    playMicroClick();
    triggerHaptic('light');
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) newErrors.name = 'Please enter your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerHaptic('medium');
      return;
    }

    setErrors({});
    playSuccessChime();
    triggerHaptic('heavy');

    const generatedTicket = `EXP-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);

    // Save to localStorage
    const newEntry = {
      ticketId: generatedTicket,
      name,
      email,
      location,
      platform,
      features: selectedFeatures,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem('expensex_early_bird_users') || '[]'
      );
      existing.push(newEntry);
      localStorage.setItem('expensex_early_bird_users', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }

    // Fire luxury confetti celebration
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6D3DF5', '#8B5CF6', '#34D399', '#FFAA33', '#FFFFFF'],
      });
    } catch {
      // Fallback
    }

    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="early-access-overlay" onClick={closeModal}>
      <div
        className="early-access-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={closeModal}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="modal-header">
              <div className="modal-eyebrow">
                <Sparkles size={13} />
                <span>EARLY BIRD VIP ACCESS</span>
              </div>
              <h2 className="modal-title">
                Experience ExpenseX AI <span className="text-gradient-purple">First.</span>
              </h2>
              <p className="modal-description">
                Join our exclusive priority waitlist to get early beta builds on the Apple App Store &amp; Google Play Store before official launch.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="modal-form">
              {/* Platform Selector Chips */}
              <div className="form-group">
                <label className="form-label">
                  <Smartphone size={14} />
                  <span>Choose Your Target Platform</span>
                </label>
                <div className="platform-toggle-group">
                  <button
                    type="button"
                    className={`platform-chip ${platform === 'ios' ? 'active' : ''}`}
                    onClick={() => {
                      playMicroClick();
                      setPlatform('ios');
                    }}
                  >
                    <span> Apple iOS (App Store)</span>
                  </button>
                  <button
                    type="button"
                    className={`platform-chip ${platform === 'android' ? 'active' : ''}`}
                    onClick={() => {
                      playMicroClick();
                      setPlatform('android');
                    }}
                  >
                    <span>▶ Android (Google Play)</span>
                  </button>
                  <button
                    type="button"
                    className={`platform-chip ${platform === 'both' ? 'active' : ''}`}
                    onClick={() => {
                      playMicroClick();
                      setPlatform('both');
                    }}
                  >
                    <span>Both Platforms</span>
                  </button>
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">
                    <User size={14} />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="input-error">{errors.name}</span>}
                </div>

                <div className="form-group flex-1">
                  <label className="form-label">
                    <Mail size={14} />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="input-error">{errors.email}</span>}
                </div>
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={14} />
                  <span>City / Country (Optional)</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dhaka, Bangladesh or California, USA"
                  className="form-input"
                />
              </div>

              {/* Multi-Select Feature Interests */}
              <div className="form-group">
                <label className="form-label">
                  <Sparkles size={14} />
                  <span>Which Features Excite You Most?</span>
                </label>
                <div className="features-chip-grid">
                  {FEATURES_LIST.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        type="button"
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`feature-chip ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="feature-icon">{feat.icon}</span>
                        <span className="feature-label">{feat.label}</span>
                        {isSelected && <Check size={12} className="check-icon" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="modal-submit-btn">
                <span>⚡ Reserve My Early Bird Spot</span>
              </button>

              <p className="privacy-note">
                🔒 We respect your privacy. No spam, ever. Unsubscribe with 1 click.
              </p>
            </form>
          </>
        ) : (
          /* Celebratory Confirmation Screen */
          <div className="success-state">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={42} className="success-check-icon" />
            </div>

            <div className="vip-ticket-badge">
              <span>VIP PASS ISSUED</span>
            </div>

            <h3 className="success-title">You're on the Priority List!</h3>
            <p className="success-subtitle">
              Welcome aboard, <strong>{name}</strong>! Your ticket number is:
            </p>

            <div className="ticket-box">
              <span className="ticket-label">TICKET ID</span>
              <span className="ticket-code">{ticketId}</span>
              <span className="ticket-sub">Platform: {platform.toUpperCase()}</span>
            </div>

            <p className="success-message">
              We've logged your preferences for <strong>{selectedFeatures.length} core features</strong>. As soon as the App Store &amp; Play Store early builds drop, you will receive an invitation link at <strong>{email}</strong>.
            </p>

            <button onClick={closeModal} className="modal-submit-btn success-btn">
              <span>Back to ExpenseX AI</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .early-access-overlay {
          position: fixed;
          inset: 0;
          z-index: 1050;
          background: rgba(3, 6, 15, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: overlayFadeIn 0.25s ease-out forwards;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .early-access-modal {
          position: relative;
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
          background: linear-gradient(180deg, rgba(17, 21, 44, 0.98) 0%, rgba(8, 10, 24, 0.98) 100%);
          border: 1px solid rgba(139, 92, 246, 0.4);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.85), 0 0 45px rgba(109, 61, 245, 0.35);
          border-radius: 28px;
          padding: 36px 32px;
          color: #FFFFFF;
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
        }

        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.93) translateY(14px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          transform: rotate(90deg);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .modal-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(109, 61, 245, 0.14);
          border: 1px solid rgba(139, 92, 246, 0.35);
          color: #C084FC;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .modal-title {
          font-size: clamp(22px, 3.5vw, 28px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 10px 0;
          line-height: 1.2;
        }

        .modal-description {
          font-size: 13.5px;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: flex;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .flex-1 {
          flex: 1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #E2E8F0;
        }

        .form-input {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-input:focus {
          border-color: #8B5CF6;
          background: rgba(109, 61, 245, 0.08);
          box-shadow: 0 0 16px rgba(109, 61, 245, 0.35);
        }

        .form-input.error {
          border-color: #EF4444;
          background: rgba(239, 68, 68, 0.08);
        }

        .input-error {
          font-size: 11px;
          color: #F87171;
          margin-top: 2px;
        }

        .platform-toggle-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .platform-chip {
          flex: 1;
          min-width: 130px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94A3B8;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .platform-chip.active {
          background: rgba(109, 61, 245, 0.25);
          border-color: #A78BFA;
          color: #FFFFFF;
          box-shadow: 0 0 16px rgba(109, 61, 245, 0.35);
        }

        .features-chip-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .feature-chip {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .feature-chip.selected {
          background: rgba(52, 211, 153, 0.12);
          border-color: rgba(52, 211, 153, 0.45);
          color: #FFFFFF;
        }

        .feature-chip .check-icon {
          color: #34D399;
          margin-left: auto;
        }

        .modal-submit-btn {
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 50%, #FF5A36 100%);
          border: none;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(109, 61, 245, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          margin-top: 6px;
        }

        .modal-submit-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.1);
          box-shadow: 0 12px 30px rgba(109, 61, 245, 0.65);
        }

        .modal-submit-btn:active {
          transform: scale(0.98);
        }

        .privacy-note {
          font-size: 11px;
          color: #64748B;
          text-align: center;
          margin: 0;
        }

        /* Success State */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 8px;
        }

        .success-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.15);
          border: 1px solid rgba(52, 211, 153, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34D399;
          box-shadow: 0 0 30px rgba(52, 211, 153, 0.4);
          margin-bottom: 16px;
        }

        .vip-ticket-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(109, 61, 245, 0.25);
          border: 1px solid #8B5CF6;
          color: #E2E8F0;
          margin-bottom: 12px;
        }

        .success-title {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 8px 0;
        }

        .success-subtitle {
          font-size: 14px;
          color: #94A3B8;
          margin: 0 0 18px 0;
        }

        .ticket-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 18px 36px;
          border-radius: 16px;
          background: rgba(109, 61, 245, 0.12);
          border: 1px dashed rgba(167, 139, 250, 0.5);
          margin-bottom: 20px;
        }

        .ticket-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #A78BFA;
        }

        .ticket-code {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          text-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
          margin: 4px 0;
        }

        .ticket-sub {
          font-size: 11px;
          color: #34D399;
          font-weight: 600;
        }

        .success-message {
          font-size: 13.5px;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0 0 24px 0;
          max-width: 440px;
        }

        .success-btn {
          width: 100%;
          max-width: 280px;
        }

        @media (max-width: 540px) {
          .early-access-modal {
            padding: 24px 18px;
            border-radius: 22px;
          }
          .form-row {
            flex-direction: column;
            gap: 14px;
          }
          .features-chip-grid {
            grid-template-columns: 1fr;
          }
          .platform-chip {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
