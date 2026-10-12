'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchSettings,
  postSettings,
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
  Zap,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';
import { showSuccessAlert, showErrorToast } from '../../../../helpers/notification';

type EmailTab = 'gmail' | 'sendgrid' | 'brevo';

interface ProviderTabDef {
  id: EmailTab;
  label: string;
  icon: React.ElementType;
  tag: string;
}

const PROVIDER_TABS: ProviderTabDef[] = [
  { id: 'gmail', label: 'Gmail Provider', icon: Mail, tag: 'OAuth / App Pass' },
  { id: 'sendgrid', label: 'SendGrid SMTP', icon: Send, tag: 'SMTP Relay' },
  { id: 'brevo', label: 'Brevo (Sendinblue)', icon: Zap, tag: 'REST / API Key' },
];

export default function AdminEmailSettingsPage() {
  const [activeTab, setActiveTab] = useState<EmailTab>('gmail');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Raw settings object
  const [settingId, setSettingId] = useState<string>('');
  const [defaultProvider, setDefaultProvider] = useState<EmailTab>('sendgrid');

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

  // Brevo State
  const [brevoSenderEmail, setBrevoSenderEmail] = useState('');
  const [brevoApiKey, setBrevoApiKey] = useState('');
  const [showBrevoApiKey, setShowBrevoApiKey] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchSettings();
      const raw = res?.data || res;
      if (raw) {
        setSettingId(raw._id || '');

        const config = raw.emailConfig || raw;
        if (config.default && ['gmail', 'sendgrid', 'brevo'].includes(config.default)) {
          setDefaultProvider(config.default as EmailTab);
          setActiveTab(config.default as EmailTab);
        }

        // SendGrid
        if (config.sendgrid) {
          setSgHost(config.sendgrid.host || 'smtp.sendgrid.net');
          setSgPort(config.sendgrid.port || 587);
          setSgUsername(config.sendgrid.username || 'apikey');
          setSgPassword(config.sendgrid.password || '');
          setSgSenderEmail(config.sendgrid.senderEmail || config.sendgrid.sender_email || '');
        }

        // Gmail
        if (config.gmail) {
          setGmailAuthEmail(config.gmail.authEmail || config.gmail.auth_email || '');
          setGmailPassword(config.gmail.password || '');
          setGmailServiceProvider(config.gmail.serviceProvider || config.gmail.service_provider || 'gmail');
        }

        // Brevo
        if (config.brevo) {
          setBrevoSenderEmail(config.brevo.senderEmail || config.brevo.sender_email || '');
          setBrevoApiKey(config.brevo.apiKey || config.brevo.api_key || '');
        }
      }
    } catch (err: any) {
      console.warn('Could not fetch email credentials:', err);
      showErrorToast(err?.message || 'Failed to load email settings.');
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

    const postData = {
      _id: settingId || undefined,
      emailConfig: {
        default: defaultProvider,
        sendgrid: {
          host: sgHost.trim(),
          port: Number(sgPort) || 587,
          username: sgUsername.trim(),
          password: sgPassword.trim(),
          senderEmail: sgSenderEmail.trim(),
        },
        gmail: {
          authEmail: gmailAuthEmail.trim(),
          password: gmailPassword.trim(),
          serviceProvider: gmailServiceProvider.trim() || 'gmail',
        },
        brevo: {
          senderEmail: brevoSenderEmail.trim(),
          apiKey: brevoApiKey.trim(),
        },
      },
    };

    try {
      const res = await postSettings(postData);
      showSuccessAlert(res?.msg || res?.message || 'Email credentials updated successfully!');
      loadData();
    } catch (err: any) {
      showErrorToast(err?.message || 'Failed to save email settings. Check backend connection.');
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
            Email Settings
          </h2>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div
          className="mc-card"
          style={{
            padding: '28px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Provider Selector Tabs: Gmail, SendGrid, Brevo */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              background: '#F8FAFC',
              padding: 6,
              borderRadius: 10,
              border: '1px solid var(--mc-border)',
            }}
          >
            {PROVIDER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDefault = defaultProvider === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: isActive ? 'var(--mc-brand-purple)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--mc-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  {isDefault && (
                    <span
                      style={{
                        fontSize: 10,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: isActive ? 'rgba(255,255,255,0.25)' : '#DCFCE7',
                        color: isActive ? '#FFFFFF' : '#15803D',
                        fontWeight: 700,
                      }}
                    >
                      Default
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '0 -28px' }} />

          {/* TAB 1: GMAIL */}
          {activeTab === 'gmail' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  Gmail SMTP Configuration
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Configure Google Workspace or Gmail App Password for SMTP delivery.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="mc-input-group">
                  <label className="mc-label">Email Username (Auth Email) *</label>
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
                    onClick={() => setDefaultProvider('gmail')}
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

          {/* TAB 2: SENDGRID */}
          {activeTab === 'sendgrid' && (
            <div>
              <div style={{ marginBottom: 20 }}>
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
                    onClick={() => setDefaultProvider('sendgrid')}
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

          {/* TAB 3: BREVO (SENDINBLUE) */}
          {activeTab === 'brevo' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  Brevo (Sendinblue) Configuration
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Configure your Brevo transactional email API key and verified sender address.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="mc-input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="mc-label">Sender Email *</label>
                  <div className="mc-input-wrapper">
                    <Mail size={16} className="mc-input-icon-left" />
                    <input
                      type="email"
                      required
                      className="mc-input with-left-icon"
                      placeholder="no-reply@expensexai.com"
                      value={brevoSenderEmail}
                      onChange={(e) => setBrevoSenderEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mc-input-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="mc-label">Brevo API Key *</label>
                  <div className="mc-input-wrapper">
                    <Key size={16} className="mc-input-icon-left" />
                    <input
                      type={showBrevoApiKey ? 'text' : 'password'}
                      required
                      className="mc-input with-left-icon"
                      placeholder="xkeysib-xxxxxxxxxxxxxxxxxxxxxxxx"
                      value={brevoApiKey}
                      onChange={(e) => setBrevoApiKey(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowBrevoApiKey(!showBrevoApiKey)}
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
                      {showBrevoApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
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
                      Set Brevo as Default Provider
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                      Route all application emails through the Brevo transactional email API.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDefaultProvider('brevo')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: defaultProvider === 'brevo' ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                    }}
                  >
                    {defaultProvider === 'brevo' ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{ height: '1px', background: '#F1F5F9', margin: '0 -28px' }} />

          {/* Submit Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
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
        </div>
      </form>
    </div>
  );
}
