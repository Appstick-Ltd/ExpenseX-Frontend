import React, { useState, useEffect } from 'react';
import { usePortalAuth } from '../context/PortalAuthContext';
import { getApiBaseUrl, setApiBaseUrl } from '../services/portalApi';
import { Logo } from '../../components/Logo';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, Server } from 'lucide-react';

interface PortalLoginProps {
  onSuccess?: () => void;
}

export const PortalLogin: React.FC<PortalLoginProps> = ({ onSuccess }) => {
  const { login } = usePortalAuth();
  const [identifier, setIdentifier] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeServer, setActiveServer] = useState<string>(getApiBaseUrl());

  useEffect(() => {
    setActiveServer(getApiBaseUrl());
  }, []);

  const handleSwitchServer = (newUrl: string) => {
    setApiBaseUrl(newUrl);
    setActiveServer(newUrl);
    setError(null);
  };

  const isLocalServer = activeServer.includes('192.168.0.179') || activeServer.includes('localhost');

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
        // Change URL to /mc-portal
        window.history.pushState(null, '', '/mc-portal');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } catch (err: any) {
      const msg = err?.message || 'Invalid credentials or unauthorized access.';
      setError(msg);
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

            {!isLocalServer && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 6px 0' }}>
                  Cloud server (<code>api.xpenstick.appstick.com.bd</code>) returned 502 Bad Gateway. Your local office backend is active and online.
                </p>
                <button
                  type="button"
                  onClick={() => handleSwitchServer('http://192.168.0.179:8080/api/v1')}
                  style={{
                    padding: '6px 12px',
                    background: 'var(--mc-brand-purple)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Server size={13} />
                  <span>Switch to Local Backend (192.168.0.179:8080) & Try</span>
                </button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Identifier field */}
          <div className="mc-input-group">
            <label className="mc-label">Admin Identifier / Email</label>
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
              <label className="mc-label">Master Password</label>
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
                <span>Access Management Portal</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Active Server Target Bar */}
          <div
            style={{
              marginTop: 14,
              padding: '8px 12px',
              background: '#F8FAFC',
              borderRadius: 8,
              border: '1px solid var(--mc-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 6,
              fontSize: 11,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--mc-text-muted)', flexWrap: 'wrap' }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: isLocalServer ? '#10B981' : '#F59E0B',
                  display: 'inline-block',
                }}
              />
              <span>Server:</span>
              <span style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>
                {isLocalServer ? 'Local Office (192.168.0.179)' : 'Cloud API (api.xpenstick)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleSwitchServer(isLocalServer ? 'https://api.xpenstick.appstick.com.bd/api/v1' : 'http://192.168.0.179:8080/api/v1')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--mc-brand-purple)',
                fontWeight: 600,
                fontSize: 11,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {isLocalServer ? 'Switch to Cloud' : 'Switch to Local'}
            </button>
          </div>
        </form>

        {/* Security watermark footer */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 18,
            borderTop: '1px solid var(--mc-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontSize: 11,
            color: 'var(--mc-text-subtle)',
          }}
        >
          <ShieldCheck size={14} color="var(--mc-primary)" />
          <span>Restricted Area • Authorized Personnel Only</span>
        </div>
      </div>
    </div>
  );
};
