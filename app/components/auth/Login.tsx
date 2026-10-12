'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { Logo } from '../common/Logo';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { showErrorToast } from '../../helpers/notification';

export interface LoginProps {
  onSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const router = useRouter();
  const { login } = usePortalAuth();
  const [identifier, setIdentifier] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password) {
      setError('Please provide your admin email/identifier and password.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await login(identifier.trim(), password);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/mc-portal');
      }
    } catch (err: any) {
      const msg = err?.message || 'Invalid credentials or unauthorized access.';
      setError(msg);
      showErrorToast(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mc-login-container">
      {/* Ambient Landing Glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109, 61, 245, 0.12) 0%, rgba(255, 90, 54, 0.04) 50%, transparent 70%)',
          top: '15%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div className="mc-login-card">
        {/* Brand Header with Authentic Landing Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Logo size="md" variant="light" />
          </div>
          <div style={{ display: 'inline-flex', marginBottom: 12 }}>
            <span className="mc-brand-badge">
              Superadmin Mission Control
            </span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--mc-text-main)', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            System Gateway
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Sign in to access unified system telemetry & databases
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              background: 'var(--mc-danger-light)',
              border: '1px solid var(--mc-danger-border)',
              color: 'var(--mc-danger)',
              fontSize: 13,
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <span style={{ fontWeight: 600, display: 'block', marginBottom: 2 }}>Authentication Failed</span>
                <span>{error}</span>
              </div>
            </div>


          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Identifier field */}
          <div className="mc-input-group">
            <label className="mc-label">Identifier</label>
            <div className="mc-input-wrapper">
              <Mail size={16} className="mc-input-icon-left" />
              <input
                type="text"
                className="mc-input with-left-icon"
                placeholder="admin@gmail.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="mc-input-group" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="mc-label">Password</label>
            </div>
            <div className="mc-input-wrapper">
              <Lock size={16} className="mc-input-icon-left" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="mc-input with-left-icon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={isSubmitting}
                style={{ paddingRight: 42 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--mc-text-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  zIndex: 10,
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="mc-btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <span> Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const PortalLogin = Login;
export type PortalLoginProps = LoginProps;
export default Login;
