'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchEmailSettings,
  postEmailSettings,
} from '../../../../helpers/backend';
import {
  Mail,
  Send,
  Lock,
  Server,
  Key,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';

type EmailTab = 'sendgrid' | 'gmail' | 'other';

export default function AdminEmailSettingsPage() {
  const [activeTab, setActiveTab] = useState<EmailTab>('sendgrid');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Raw settings object
  const [settingId, setSettingId] = useState<string>('');
  const [defaultProvider, setDefaultProvider] = useState<string>('sendgrid');

  // SendGrid State
  const [sgHost, setSgHost] = useState('smtp.sendgrid.net');
  const [sgPort, setSgPort] = useState<number | string>(587);
  const [sgUsername, setSgUsername] = useState('apikey');
  const [sgPassword, setSgPassword] = useState('');
  const [sgSenderEmail, setSgSenderEmail] = useState('');
  const [showSgPassword, setShowSgPassword] = useState(false);

  // Gmail State
  const [gmailAuthEmail, setGmailAuthEmail] = useState('');
  const [gmailPassword, setGmailPassword] = useState('');
  const [gmailServiceProvider, setGmailServiceProvider] = useState('gmail');
  const [showGmailPassword, setShowGmailPassword] = useState(false);

  // Other Provider State
  const [otherHost, setOtherHost] = useState('');
  const [otherPort, setOtherPort] = useState<number | string>(587);
  const [otherAddress, setOtherAddress] = useState('');
  const [otherPassword, setOtherPassword] = useState('');
  const [otherProviderName, setOtherProviderName] = useState('other');
  const [showOtherPassword, setShowOtherPassword] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setSaveError(null);
    try {
      const res = await fetchEmailSettings();
      const d = res?.data || res;
      if (d) {
        setSettingId(d._id || '');
        if (d.default) setDefaultProvider(d.default);

        // Sendgrid
        if (d.sendgrid) {
          setSgHost(d.sendgrid.host || 'smtp.sendgrid.net');
          setSgPort(d.sendgrid.port || 587);
          setSgUsername(d.sendgrid.username || 'apikey');
          setSgPassword(d.sendgrid.password || '');
          setSgSenderEmail(d.sendgrid.sender_email || '');
        }

        // Gmail
        if (d.gmail) {
          setGmailAuthEmail(d.gmail.auth_email || '');
          setGmailPassword(d.gmail.password || '');
          setGmailServiceProvider(d.gmail.service_provider || 'gmail');
        }

        // Other
        if (d.other) {
          setOtherHost(d.other.host || '');
          setOtherPort(d.other.port || 587);
          setOtherAddress(d.other.address || '');
          setOtherPassword(d.other.password || '');
          setOtherProviderName(d.other.provider_name || 'other');
        }
      }
    } catch (err: any) {
      console.warn('Could not fetch email credentials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    const postData = {
      _id: settingId || undefined,
      default: defaultProvider,
      sendgrid: {
        host: sgHost.trim(),
        port: Number(sgPort) || 587,
        username: sgUsername.trim(),
        password: sgPassword.trim(),
        sender_email: sgSenderEmail.trim(),
      },
      gmail: {
        auth_email: gmailAuthEmail.trim(),
        password: gmailPassword.trim(),
        service_provider: gmailServiceProvider.trim() || 'gmail',
      },
      other: {
        host: otherHost.trim(),
        port: Number(otherPort) || 587,
        address: otherAddress.trim(),
        password: otherPassword.trim(),
        provider_name: otherProviderName.trim() || 'other',
      },
    };

    try {
      const res = await postEmailSettings(postData);
      setSaveSuccess(res?.msg || res?.message || 'Email credentials updated successfully!');
      setTimeout(() => setSaveSuccess(null), 4000);
      loadData();
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to save email settings. Check backend connection.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Shimmer height="44px" width="280px" borderRadius="8px" />
        <Shimmer height="60px" borderRadius="8px" />
        <Shimmer height="300px" borderRadius="12px" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="mc-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(109,61,245,0.12), rgba(139,92,246,0.06))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mc-brand-purple)',
            }}
          >
            <Mail size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
              Email Settings
            </h2>
            <p style={{ fontSize: 13, margin: 0, color: 'var(--mc-text-muted)' }}>
              Configure SMTP credentials for outgoing notifications, password resets, and user invites.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadData}
          className="mc-btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
        >
          <RefreshCw size={14} />
          <span>Reload</span>
        </button>
      </div>

      {saveSuccess && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={18} />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <AlertCircle size={18} />
          <span>{saveError}</span>
        </div>
      )}

      {/* Provider Selector Tabs matching roofstick */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          background: '#FFFFFF',
          padding: 6,
          borderRadius: 10,
          border: '1px solid var(--mc-border)',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('sendgrid')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeTab === 'sendgrid' ? 'var(--mc-brand-purple)' : 'transparent',
            color: activeTab === 'sendgrid' ? '#FFFFFF' : 'var(--mc-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Send size={15} />
          <span>SendGrid SMTP</span>
          {defaultProvider === 'sendgrid' && (
            <span
              style={{
                fontSize: 10,
                padding: '2px 6px',
                borderRadius: 4,
                background: activeTab === 'sendgrid' ? 'rgba(255,255,255,0.25)' : '#DCFCE7',
                color: activeTab === 'sendgrid' ? '#FFFFFF' : '#15803D',
                fontWeight: 700,
              }}
            >
              Default
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gmail')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeTab === 'gmail' ? 'var(--mc-brand-purple)' : 'transparent',
            color: activeTab === 'gmail' ? '#FFFFFF' : 'var(--mc-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Mail size={15} />
          <span>Gmail Provider</span>
          {defaultProvider === 'gmail' && (
            <span
              style={{
                fontSize: 10,
                padding: '2px 6px',
                borderRadius: 4,
                background: activeTab === 'gmail' ? 'rgba(255,255,255,0.25)' : '#DCFCE7',
                color: activeTab === 'gmail' ? '#FFFFFF' : '#15803D',
                fontWeight: 700,
              }}
            >
              Default
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('other')}
          style={{
            flex: 1,
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: activeTab === 'other' ? 'var(--mc-brand-purple)' : 'transparent',
            color: activeTab === 'other' ? '#FFFFFF' : 'var(--mc-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Server size={15} />
          <span>Other Provider</span>
          {defaultProvider === 'others' && (
            <span
              style={{
                fontSize: 10,
                padding: '2px 6px',
                borderRadius: 4,
                background: activeTab === 'other' ? 'rgba(255,255,255,0.25)' : '#DCFCE7',
                color: activeTab === 'other' ? '#FFFFFF' : '#15803D',
                fontWeight: 700,
              }}
            >
              Default
            </span>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* TAB 1: SENDGRID */}
        {activeTab === 'sendgrid' && (
          <div className="mc-card" style={{ padding: '24px' }}>
            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--mc-border-light)', paddingBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                SendGrid SMTP Configuration
              </h3>
              <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                Configure your SendGrid credentials to deliver reliable transactional emails.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="mc-input-group">
                <label className="mc-label">Email Host *</label>
                <div className="mc-input-wrapper">
                  <Server size={16} className="mc-input-icon-left" />
                  <input
                    type="text"
                    required
                    className="mc-input with-left-icon"
                    placeholder="smtp.sendgrid.net"
                    value={sgHost}
                    onChange={(e) => setSgHost(e.target.value)}
                  />
                </div>
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Port *</label>
                <input
                  type="text"
                  required
                  className="mc-input"
                  placeholder="587"
                  value={sgPort}
                  onChange={(e) => setSgPort(e.target.value)}
                />
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Username *</label>
                <input
                  type="text"
                  required
                  className="mc-input"
                  placeholder="apikey"
                  value={sgUsername}
                  onChange={(e) => setSgUsername(e.target.value)}
                />
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Password (API Key) *</label>
                <div className="mc-input-wrapper">
                  <Lock size={16} className="mc-input-icon-left" />
                  <input
                    type={showSgPassword ? 'text' : 'password'}
                    required
                    className="mc-input with-left-icon"
                    placeholder="SG.xxxxxxxx"
                    value={sgPassword}
                    onChange={(e) => setSgPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSgPassword(!showSgPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--mc-text-subtle)',
                    }}
                  >
                    {showSgPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mc-input-group" style={{ gridColumn: '1 / -1' }}>
                <label className="mc-label">Sender Email *</label>
                <div className="mc-input-wrapper">
                  <Mail size={16} className="mc-input-icon-left" />
                  <input
                    type="email"
                    required
                    className="mc-input with-left-icon"
                    placeholder="notifications@expensex.ai"
                    value={sgSenderEmail}
                    onChange={(e) => setSgSenderEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Set as default provider toggle */}
              <div
                style={{
                  gridColumn: '1 / -1',
                  background: '#F8FAFC',
                  padding: '16px 20px',
                  borderRadius: 10,
                  border: '1px solid var(--mc-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    Set SendGrid as Default Provider
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    All outgoing system emails will route through this SendGrid SMTP connection.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDefaultProvider(defaultProvider === 'sendgrid' ? '' : 'sendgrid')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: defaultProvider === 'sendgrid' ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                  }}
                >
                  {defaultProvider === 'sendgrid' ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GMAIL */}
        {activeTab === 'gmail' && (
          <div className="mc-card" style={{ padding: '24px' }}>
            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--mc-border-light)', paddingBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                Gmail SMTP Configuration
              </h3>
              <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                Configure Google Workspace or Gmail App Password for SMTP delivery.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="mc-input-group">
                <label className="mc-label">Email Username (Gmail Address) *</label>
                <div className="mc-input-wrapper">
                  <Mail size={16} className="mc-input-icon-left" />
                  <input
                    type="email"
                    required
                    className="mc-input with-left-icon"
                    placeholder="your-org@gmail.com"
                    value={gmailAuthEmail}
                    onChange={(e) => setGmailAuthEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Password (App Password) *</label>
                <div className="mc-input-wrapper">
                  <Key size={16} className="mc-input-icon-left" />
                  <input
                    type={showGmailPassword ? 'text' : 'password'}
                    required
                    className="mc-input with-left-icon"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={gmailPassword}
                    onChange={(e) => setGmailPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowGmailPassword(!showGmailPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--mc-text-subtle)',
                    }}
                  >
                    {showGmailPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mc-input-group" style={{ gridColumn: '1 / -1' }}>
                <label className="mc-label">Service Provider</label>
                <input
                  type="text"
                  className="mc-input"
                  placeholder="gmail"
                  value={gmailServiceProvider}
                  onChange={(e) => setGmailServiceProvider(e.target.value)}
                />
              </div>

              <div
                style={{
                  gridColumn: '1 / -1',
                  background: '#F8FAFC',
                  padding: '16px 20px',
                  borderRadius: 10,
                  border: '1px solid var(--mc-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    Set Gmail as Default Provider
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    Route all application emails using your authenticated Gmail address.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDefaultProvider(defaultProvider === 'gmail' ? '' : 'gmail')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: defaultProvider === 'gmail' ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                  }}
                >
                  {defaultProvider === 'gmail' ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OTHER PROVIDER */}
        {activeTab === 'other' && (
          <div className="mc-card" style={{ padding: '24px' }}>
            <div style={{ marginBottom: 20, borderBottom: '1px solid var(--mc-border-light)', paddingBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                Other Email Provider (Custom SMTP)
              </h3>
              <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                Configure a custom SMTP server or relay such as Mailgun, Postmark, or Amazon SES.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="mc-input-group">
                <label className="mc-label">Email Host *</label>
                <input
                  type="text"
                  required
                  className="mc-input"
                  placeholder="smtp.mailgun.org"
                  value={otherHost}
                  onChange={(e) => setOtherHost(e.target.value)}
                />
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Port *</label>
                <input
                  type="text"
                  required
                  className="mc-input"
                  placeholder="587"
                  value={otherPort}
                  onChange={(e) => setOtherPort(e.target.value)}
                />
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Address *</label>
                <input
                  type="email"
                  required
                  className="mc-input"
                  placeholder="postmaster@domain.com"
                  value={otherAddress}
                  onChange={(e) => setOtherAddress(e.target.value)}
                />
              </div>

              <div className="mc-input-group">
                <label className="mc-label">Email Password *</label>
                <div className="mc-input-wrapper">
                  <Lock size={16} className="mc-input-icon-left" />
                  <input
                    type={showOtherPassword ? 'text' : 'password'}
                    required
                    className="mc-input with-left-icon"
                    placeholder="SMTP Password"
                    value={otherPassword}
                    onChange={(e) => setOtherPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOtherPassword(!showOtherPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--mc-text-subtle)',
                    }}
                  >
                    {showOtherPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="mc-input-group" style={{ gridColumn: '1 / -1' }}>
                <label className="mc-label">Service Provider Name</label>
                <select
                  className="mc-input"
                  value={otherProviderName}
                  onChange={(e) => setOtherProviderName(e.target.value)}
                >
                  <option value="other">Custom SMTP Server</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="gmail">Gmail</option>
                </select>
              </div>

              <div
                style={{
                  gridColumn: '1 / -1',
                  background: '#F8FAFC',
                  padding: '16px 20px',
                  borderRadius: 10,
                  border: '1px solid var(--mc-border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    Set as Default Provider
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    Route all application emails through this custom SMTP server.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDefaultProvider(defaultProvider === 'others' ? '' : 'others')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: defaultProvider === 'others' ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                  }}
                >
                  {defaultProvider === 'others' ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            type="submit"
            disabled={saving}
            className="mc-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px' }}
          >
            {saving ? <RefreshCw size={16} className="mc-spin" /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
