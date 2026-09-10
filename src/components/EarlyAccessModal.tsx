import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, CheckCircle2, User, Mail, MapPin, Smartphone, Tag, AlertCircle, Loader2 } from 'lucide-react';
import { subscribeToEarlyAccessModal } from '../utils/modalEvents';
import { playMicroClick, playSuccessChime } from '../utils/audio';
import { triggerHaptic } from '../utils/haptics';
import { submitBetaUser } from '../services/api';
import appleLogoImg from '../assets/apple-logo.png';
import googlePlaySvg from '../assets/Google_Play_2022_icon.svg';

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
  const [address, setAddress] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'receipt',
    'sms',
    'safe_spend',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    const unsubscribe = subscribeToEarlyAccessModal((detail) => {
      if (detail.platform === 'ios') setPlatform('ios');
      else if (detail.platform === 'android') setPlatform('android');
      else setPlatform('both');
      setIsSubmitted(false);
      setApiError(null);
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
    setApiError(null);
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
    setApiError(null);
    const newErrors: { name?: string; email?: string } = {};

    // 1. Mandatory Name Validation
    if (!name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // 2. Mandatory Valid Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerHaptic('medium');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Map selected feature keys to human-readable labels for the backend
    const likeFeatures = selectedFeatures.map((id) => {
      const match = FEATURES_LIST.find((f) => f.id === id);
      return match ? match.label : id;
    });

    try {
      // Call backend API: POST /users/bata-user
      const response = await submitBetaUser({
        name: name.trim(),
        email: email.trim(),
        referral_code: referralCode.trim() || undefined,
        target_platform: platform,
        address: address.trim() || undefined,
        like_features: likeFeatures.length > 0 ? likeFeatures : ['Expense tracking', 'Budgeting'],
      });

      // Successful registration
      playSuccessChime();
      triggerHaptic('heavy');

      const generatedTicket =
        response?.ticketId ||
        response?.ticket_id ||
        response?.data?.ticketId ||
        response?.data?.ticket_id ||
        `EXP-${Math.floor(1000 + Math.random() * 9000)}`;

      setTicketId(generatedTicket);

      // Store in local backup
      try {
        const newEntry = {
          ticketId: generatedTicket,
          name: name.trim(),
          email: email.trim(),
          address: address.trim(),
          referral_code: referralCode.trim(),
          platform,
          features: likeFeatures,
          submittedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(
          localStorage.getItem('expensex_early_bird_users') || '[]'
        );
        existing.push(newEntry);
        localStorage.setItem('expensex_early_bird_users', JSON.stringify(existing));
      } catch {
        // Ignore local storage quota errors
      }

      // Fire luxury celebration confetti
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
    } catch (err: any) {
      triggerHaptic('heavy');
      const message =
        err?.message ||
        'Something went wrong while connecting to the server. Please verify your connection.';
      setApiError(message);
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="platform-cards-grid">
                  {/* Apple iOS */}
                  <button
                    type="button"
                    className={`platform-select-card ${platform === 'ios' ? 'active' : ''}`}
                    onClick={() => {
                      playMicroClick();
                      triggerHaptic('light');
                      setPlatform('ios');
                    }}
                  >
                    <div className="platform-card-icon-wrap apple">
                      <img src={appleLogoImg} alt="Apple iOS" className="platform-card-logo" />
                    </div>
                    <span className="platform-name">Apple iOS</span>
                    {platform === 'ios' && <Check size={13} className="platform-check-icon" />}
                  </button>

                  {/* Android */}
                  <button
                    type="button"
                    className={`platform-select-card ${platform === 'android' ? 'active' : ''}`}
                    onClick={() => {
                      playMicroClick();
                      triggerHaptic('light');
                      setPlatform('android');
                    }}
                  >
                    <div className="platform-card-icon-wrap play">
                      <img src={googlePlaySvg} alt="Google Play" className="platform-card-logo" />
                    </div>
                    <span className="platform-name">Android</span>
                    {platform === 'android' && <Check size={13} className="platform-check-icon" />}
                  </button>

                  {/* Both Platforms */}
                  <button
                    type="button"
                    className={`platform-select-card ${platform === 'both' ? 'active' : ''}`}
                    onClick={() => {
                      playMicroClick();
                      triggerHaptic('light');
                      setPlatform('both');
                    }}
                  >
                    <div className="platform-card-icon-wrap both">
                      <Sparkles size={15} />
                    </div>
                    <span className="platform-name">Both</span>
                    {platform === 'both' && <Check size={13} className="platform-check-icon" />}
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

              {/* Address & Referral Code Row */}
              <div className="form-row">
                <div className="form-group flex-1">
                  <label className="form-label">
                    <MapPin size={14} />
                    <span>Address / Location (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 123 Main St, New York, USA"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group flex-1">
                  <label className="form-label">
                    <Tag size={14} />
                    <span>Referral Code (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BU123456"
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>
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
                        disabled={isSubmitting}
                      >
                        <span className="feature-icon">{feat.icon}</span>
                        <span className="feature-label">{feat.label}</span>
                        {isSelected && <Check size={12} className="check-icon" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* API Error Notification */}
              {apiError && (
                <div className="modal-api-error" role="alert">
                  <AlertCircle size={18} className="error-icon" />
                  <div className="error-text-content">
                    <span className="error-title">Submission Failed</span>
                    <span className="error-desc">{apiError}</span>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className={`modal-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="spin-loader" />
                    <span>Reserving VIP Spot...</span>
                  </>
                ) : (
                  <span>⚡ Reserve My Early Bird Spot</span>
                )}
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

        .platform-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .platform-select-card {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          padding: 0 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.09);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap !important;
          position: relative;
        }

        .platform-select-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(139, 92, 246, 0.35);
          transform: translateY(-1px);
        }

        .platform-select-card:active {
          transform: scale(0.97);
        }

        .platform-select-card.active {
          background: rgba(109, 61, 245, 0.18);
          border: 1.5px solid #8B5CF6;
          box-shadow: 0 4px 20px rgba(109, 61, 245, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15);
        }

        .platform-card-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .platform-card-logo {
          width: 18px;
          height: 18px;
          object-fit: contain;
          display: block;
        }

        .platform-card-icon-wrap.apple .platform-card-logo {
          filter: brightness(0) invert(1);
        }

        .platform-card-icon-wrap.both {
          color: #C084FC;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .platform-name {
          font-size: 13px;
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: -0.01em;
          white-space: nowrap !important;
        }

        .platform-check-icon {
          color: #34D399;
          margin-left: 2px;
          flex-shrink: 0;
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

        .modal-api-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #FECACA;
          font-size: 13px;
          line-height: 1.4;
          animation: shakeIn 0.3s ease-in-out forwards;
        }

        @keyframes shakeIn {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }

        .modal-api-error .error-icon {
          color: #EF4444;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .modal-api-error .error-text-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .modal-api-error .error-title {
          font-size: 12px;
          font-weight: 700;
          color: #F87171;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .modal-api-error .error-desc {
          font-size: 12.5px;
          color: #FCA5A5;
        }

        .spin-loader {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
          gap: 8px;
          transition: all 0.2s ease;
          margin-top: 6px;
        }

        .modal-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.1);
          box-shadow: 0 12px 30px rgba(109, 61, 245, 0.65);
        }

        .modal-submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .modal-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          filter: grayscale(0.2);
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
          .platform-cards-grid {
            gap: 6px;
          }
          .platform-select-card {
            height: 44px;
            padding: 0 6px;
            gap: 5px;
          }
          .platform-card-logo {
            width: 15px;
            height: 15px;
          }
          .platform-name {
            font-size: 11px;
          }
          .platform-check-icon {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
