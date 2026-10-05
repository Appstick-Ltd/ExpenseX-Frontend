import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Check, CheckCircle2, User, Mail, MapPin, Smartphone, AlertCircle, Loader2, Copy, Share2, CheckCheck } from 'lucide-react';
import { subscribeToEarlyAccessModal } from '../utils/modalEvents';
import { playMicroClick, playSuccessChime } from '../utils/audio';
import { triggerHaptic } from '../utils/haptics';
import { submitBetaUser } from '../services/api';
import { getStoredReferralCode } from '../utils/referral';
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
  // Note: referralCode is read from storage, not from a form input
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'receipt',
    'sms',
    'safe_spend',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<{
    name: string;
    email: string;
    platform: 'ios' | 'android' | 'both';
    featureCount: number;
  } | null>(null);
  const [referralLink, setReferralLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const closeModalRef = useRef<() => void>(() => { });

  const resetFormFields = () => {
    setName('');
    setEmail('');
    setAddress('');
    setSelectedFeatures(['receipt', 'sms', 'safe_spend']);
    setErrors({});
    setApiError(null);
  };

  const closeModal = () => {
    playMicroClick();
    setIsOpen(false);
    setApiError(null);
    document.body.style.overflow = '';
    // If modal was submitted, cleanly reset submission state for next time
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedInfo(null);
        setIsCopied(false);
        setReferralLink('');
        resetFormFields();
      }, 250);
    }
  };

  closeModalRef.current = closeModal;

  useEffect(() => {
    // Check if referral code is in storage or URL
    const saved = getStoredReferralCode();
    if (saved) setReferralCode(saved);

    const unsubscribe = subscribeToEarlyAccessModal((detail) => {
      if (detail.platform === 'ios') setPlatform('ios');
      else if (detail.platform === 'android') setPlatform('android');
      else setPlatform('both');

      // Reset fields if previously submitted so user gets a fresh clean form
      setIsSubmitted((prev) => {
        if (prev) {
          resetFormFields();
          setSubmittedInfo(null);
          setReferralLink('');
          setIsCopied(false);
        }
        return false;
      });
      setApiError(null);

      // Re-check stored referral code on modal open
      const currentRef = getStoredReferralCode();
      if (currentRef) setReferralCode(currentRef);

      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModalRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
      const capturedReferral = getStoredReferralCode() || undefined;

      // Call backend API: POST /users/bata-user
      const response = await submitBetaUser({
        name: name.trim(),
        email: email.trim(),
        referral_code: capturedReferral,
        target_platform: platform,
        address: address.trim() || undefined,
        like_features: likeFeatures.length > 0 ? likeFeatures : ['Expense tracking', 'Budgeting'],
      });

      // Successful registration
      playSuccessChime();
      triggerHaptic('heavy');

      // Capture referral share link from API response
      const shareLink =
        response?.data?.link ||
        response?.link ||
        '';
      if (shareLink) setReferralLink(shareLink);

      // Store in local backup
      try {
        const newEntry = {
          name: name.trim(),
          email: email.trim(),
          address: address.trim(),
          referral_code: capturedReferral || '',
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

      setSubmittedInfo({
        name: name.trim(),
        email: email.trim(),
        platform,
        featureCount: likeFeatures.length,
      });
      resetFormFields();
      setIsSubmitted(true);
    } catch (err: any) {
      triggerHaptic('heavy');
      const rawMessage: string = err?.message || '';

      const isNetworkError =
        rawMessage.toLowerCase().includes('unable to reach') ||
        rawMessage.toLowerCase().includes('connection refused') ||
        rawMessage.toLowerCase().includes('failed to fetch') ||
        rawMessage.toLowerCase().includes('network');

      if (isNetworkError) {
        setApiError('Unable to reach server. Please check your internet connection and try again.');
      } else {
        const targetEmail = email.trim();
        setApiError(
          targetEmail
            ? `Each email address can only be used once. If you have already registered with (${targetEmail}), your early access spot is already secured!`
            : 'Each email address can only be used once for registration. If you already signed up, your spot is confirmed.'
        );
      }
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

              {/* VIP Referral Invite Badge */}
              {referralCode && (
                <div className="vip-invite-banner">
                  <div className="vip-invite-left">
                    <span className="vip-invite-pulse" />
                    <span className="vip-invite-text">
                      VIP Invite Code: <strong>{referralCode}</strong>
                    </span>
                  </div>
                  <span className="vip-invite-tag">✓ Priority Access</span>
                </div>
              )}
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
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      if (apiError) setApiError(null);
                    }}
                    placeholder="alex@example.com"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && <span className="input-error">{errors.email}</span>}
                </div>
              </div>

              {/* Address Field (Optional) */}
              <div className="form-group">
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
                    <span className="error-title">Notice: 1 Registration Per Email</span>
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
              Welcome aboard, <strong>{submittedInfo?.name || name}</strong>! Your spot is confirmed.
            </p>

            <p className="success-message">
              🎉 When early builds drop, you'll get an invite at <strong>{submittedInfo?.email || email}</strong> — covering your {submittedInfo?.featureCount ?? selectedFeatures.length} selected features on <strong>{(submittedInfo?.platform || platform) === 'both' ? 'iOS & Android' : (submittedInfo?.platform || platform) === 'ios' ? 'Apple iOS' : 'Android'}</strong>.
            </p>

            {/* Referral Share Section */}
            {referralLink && (
              <div className="referral-share-section">
                <p className="referral-share-label">🎁 Share your invite link &amp; earn rewards</p>
                <div className="referral-link-row">
                  <div className="referral-link-display">
                    <span className="referral-link-text">{referralLink}</span>
                  </div>
                  <button
                    className={`referral-copy-btn ${isCopied ? 'copied' : ''}`}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(referralLink);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2500);
                      } catch {
                        // Fallback for older browsers
                        const el = document.createElement('textarea');
                        el.value = referralLink;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2500);
                      }
                    }}
                    title="Copy link"
                  >
                    {isCopied ? <CheckCheck size={16} /> : <Copy size={16} />}
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  className="referral-share-btn"
                  onClick={async () => {
                    const shareData = {
                      title: 'Join me on ExpenseX AI!',
                      text: `I just got VIP early access to ExpenseX AI — the AI-powered expense tracker. Join me before launch! 🚀`,
                      url: referralLink,
                    };
                    if (navigator.share && navigator.canShare?.(shareData)) {
                      try {
                        await navigator.share(shareData);
                      } catch {
                        // User cancelled or error — ignore
                      }
                    } else {
                      // Fallback: open share options panel
                      const menu = document.getElementById('expensex-share-menu');
                      if (menu) {
                        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
                      }
                    }
                  }}
                >
                  <Share2 size={16} />
                  <span>Share Invite Link</span>
                </button>

                {/* Fallback share menu for browsers without Web Share API */}
                <div id="expensex-share-menu" className="share-menu-dropdown" style={{ display: 'none' }}>
                  {[
                    { label: '💬 WhatsApp', url: `https://wa.me/?text=${encodeURIComponent('I just got VIP early access to ExpenseX AI 🚀 Join me before launch!')}%20${encodeURIComponent(referralLink)}` },
                    { label: '✈️ Telegram', url: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('I just got VIP early access to ExpenseX AI 🚀')}` },
                    { label: '🐦 Twitter / X', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent('I just got VIP early access to ExpenseX AI 🚀')}&url=${encodeURIComponent(referralLink)}` },
                    { label: '📘 Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}` },
                    { label: '📧 Email', url: `mailto:?subject=${encodeURIComponent('Join ExpenseX AI Early Access!')}&body=${encodeURIComponent('I just got VIP early access to ExpenseX AI 🚀 Join me before launch! ' + referralLink)}` },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-menu-item"
                      onClick={() => {
                        const menu = document.getElementById('expensex-share-menu');
                        if (menu) menu.style.display = 'none';
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

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
          background: rgba(3, 6, 15, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: overlayFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
          animation: modalFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
          will-change: opacity, transform;
          transform: translateZ(0);
        }

        @keyframes modalFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          100% {
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

        /* VIP Referral Invite Badge */
        .vip-invite-banner {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 14px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(109, 61, 245, 0.16) 100%);
          border: 1px solid rgba(52, 211, 153, 0.4);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.12), 0 0 25px rgba(109, 61, 245, 0.15);
          width: 100%;
          max-width: 440px;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }

        .vip-invite-left {
          display: flex;
          align-items: center;
          gap: 9px;
          min-width: 0;
        }

        .vip-invite-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 10px #34D399, 0 0 18px rgba(52, 211, 153, 0.6);
          flex-shrink: 0;
          animation: pulseDot 1.8s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 0.6;
            transform: scale(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.18);
          }
        }

        .vip-invite-text {
          font-size: 12.5px;
          color: #E2E8F0;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vip-invite-text strong {
          color: #FFFFFF;
          font-family: var(--font-mono, monospace);
          letter-spacing: 0.05em;
          background: rgba(109, 61, 245, 0.4);
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(167, 139, 250, 0.35);
          margin-left: 4px;
        }

        .vip-invite-tag {
          font-size: 11px;
          font-weight: 700;
          color: #34D399;
          letter-spacing: 0.04em;
          white-space: nowrap;
          flex-shrink: 0;
          background: rgba(52, 211, 153, 0.12);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(52, 211, 153, 0.25);
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

        /* === Referral Share Section === */
        .referral-share-section {
          width: 100%;
          max-width: 480px;
          margin: 0 auto 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .referral-share-label {
          font-size: 13px;
          font-weight: 600;
          color: #C084FC;
          margin: 0;
          text-align: center;
          letter-spacing: 0.01em;
        }

        .referral-link-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 12px;
          padding: 6px 6px 6px 14px;
          overflow: hidden;
        }

        .referral-link-display {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }

        .referral-link-text {
          font-size: 12.5px;
          color: #A5B4FC;
          font-family: var(--font-mono, monospace);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }

        .referral-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 12px;
          border-radius: 8px;
          background: rgba(109, 61, 245, 0.25);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: #C4B5FD;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .referral-copy-btn:hover {
          background: rgba(109, 61, 245, 0.45);
          color: #FFFFFF;
          transform: scale(1.03);
        }

        .referral-copy-btn.copied {
          background: rgba(52, 211, 153, 0.2);
          border-color: rgba(52, 211, 153, 0.5);
          color: #34D399;
        }

        .referral-share-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 46px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(109, 61, 245, 0.3) 0%, rgba(52, 211, 153, 0.18) 100%);
          border: 1px solid rgba(139, 92, 246, 0.5);
          color: #E2E8F0;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .referral-share-btn:hover {
          background: linear-gradient(135deg, rgba(109, 61, 245, 0.5) 0%, rgba(52, 211, 153, 0.28) 100%);
          border-color: rgba(167, 139, 250, 0.7);
          color: #FFFFFF;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(109, 61, 245, 0.4);
        }

        .referral-share-btn:active {
          transform: scale(0.97);
        }

        /* Share Dropdown (fallback for non-mobile) */
        .share-menu-dropdown {
          flex-direction: column;
          gap: 6px;
          background: rgba(17, 21, 44, 0.98);
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 14px;
          padding: 8px;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7), 0 0 24px rgba(109, 61, 245, 0.25);
          animation: fadeInUp 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .share-menu-item {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid transparent;
          color: #E2E8F0;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .share-menu-item:hover {
          background: rgba(109, 61, 245, 0.2);
          border-color: rgba(139, 92, 246, 0.35);
          color: #FFFFFF;
          transform: translateX(3px);
        }

        @media (max-width: 640px) {
          .early-access-overlay {
            padding: 16px !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(3, 6, 15, 0.88) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            animation: overlayFadeIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
          }

          .early-access-modal {
            max-width: 440px !important;
            width: 100% !important;
            max-height: 90vh !important;
            border-radius: 24px !important;
            border: 1px solid rgba(139, 92, 246, 0.45) !important;
            padding: 26px 18px 24px 18px !important;
            animation: modalFadeIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(109, 61, 245, 0.3) !important;
            will-change: opacity, transform;
            transform: translateZ(0);
          }

          .modal-close-btn {
            top: 14px;
            right: 14px;
            width: 32px;
            height: 32px;
          }

          .modal-header {
            margin-bottom: 18px;
          }

          .vip-invite-banner {
            padding: 6px 12px;
            gap: 8px;
            margin-top: 10px;
          }

          .vip-invite-text {
            font-size: 11.5px;
          }

          .vip-invite-tag {
            font-size: 10px;
            padding: 2px 6px;
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
            height: 46px;
            padding: 0 8px;
            gap: 6px;
          }

          .platform-card-logo {
            width: 16px;
            height: 16px;
          }

          .platform-name {
            font-size: 12px;
          }

          .platform-check-icon {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
