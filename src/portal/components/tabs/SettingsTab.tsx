import React, { useEffect, useState } from 'react';
import {
  getSettings,
  updateSystemSettings,
  getCurrencyRates,
  getLanguages,
} from '../../services/portalApi';
import {
  DollarSign,
  Globe,
  RefreshCw,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  MessageSquare,
  Mail,
  Share2,
  // Code,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sliders,
} from 'lucide-react';
import { Shimmer } from '../common/Shimmer';

type SettingsSubTab = 'general' | 'stripe' | 'twilio' | 'email' | 'social'; // | 'json';

export const SettingsTab: React.FC = () => {
  const [originalSettings, setOriginalSettings] = useState<any>(null);
  const [currencyRates, setCurrencyRates] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>('general');

  // Saving State
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  // const [copiedJson, setCopiedJson] = useState(false);

  // Secret Visibility Toggles
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showStripeWebhook, setShowStripeWebhook] = useState(false);
  const [showTwilioToken, setShowTwilioToken] = useState(false);
  const [showSgPassword, setShowSgPassword] = useState(false);
  const [showGmailPassword, setShowGmailPassword] = useState(false);
  const [showBrevoKey, setShowBrevoKey] = useState(false);
  const [showExchangeKey, setShowExchangeKey] = useState(false);

  // ===================== FORM STATE =====================
  // 1. General & Site
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [siteEmail, setSiteEmail] = useState('');
  const [sitePhone, setSitePhone] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [siteLogo, setSiteLogo] = useState('');
  const [siteFooter, setSiteFooter] = useState('');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [clientSideUrl, setClientSideUrl] = useState('');
  const [serverSideUrl, setServerSideUrl] = useState('');
  const [otpVerificationType, setOtpVerificationType] = useState<'email' | 'phone'>('email');
  const [maxFreeAmountLimit, setMaxFreeAmountLimit] = useState<number | string>(0);
  const [exchangeRateAPIKey, setExchangeRateAPIKey] = useState('');
  const [discordChannel, setDiscordChannel] = useState('');

  // 2. Stripe
  const [stripeActive, setStripeActive] = useState(false);
  const [stripeName, setStripeName] = useState('Stripe');
  const [stripeLogo, setStripeLogo] = useState('');
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [stripeSecretKey, setStripeSecretKey] = useState('');
  const [stripeWebhookSecret, setStripeWebhookSecret] = useState('');

  // 3. Twilio SMS
  const [twilioActive, setTwilioActive] = useState(false);
  const [twilioAccountSid, setTwilioAccountSid] = useState('');
  const [twilioAuthToken, setTwilioAuthToken] = useState('');
  const [twilioSenderNumber, setTwilioSenderNumber] = useState('');

  // 4. Email Config
  const [emailProvider, setEmailProvider] = useState<'sendgrid' | 'gmail' | 'brevo'>('sendgrid');
  // Sendgrid
  const [sgHost, setSgHost] = useState('');
  const [sgPort, setSgPort] = useState<number | string>(587);
  const [sgUsername, setSgUsername] = useState('');
  const [sgPassword, setSgPassword] = useState('');
  const [sgSenderEmail, setSgSenderEmail] = useState('');
  // Gmail
  const [gmailAuthEmail, setGmailAuthEmail] = useState('');
  const [gmailPassword, setGmailPassword] = useState('');
  const [gmailServiceProvider, setGmailServiceProvider] = useState('gmail');
  // Brevo
  const [brevoSenderEmail, setBrevoSenderEmail] = useState('');
  const [brevoApiKey, setBrevoApiKey] = useState('');

  // 5. Social Links
  const [socialLinks, setSocialLinks] = useState<Array<{ name: string; link: string }>>([]);

  // Populate form from API response
  const populateForm = (raw: any) => {
    if (!raw) return;

    // Site & General
    setSiteName(raw.siteName || '');
    setSiteDescription(raw.siteDescription || '');
    setSiteEmail(raw.siteEmail || '');
    setSitePhone(raw.sitePhone || '');
    setSiteAddress(raw.siteAddress || '');
    setSiteLogo(raw.siteLogo || '');
    setSiteFooter(raw.siteFooter || '');
    setCurrencyCode(raw.currencyCode || 'USD');
    setCurrencySymbol(raw.currencySymbol || '$');
    setClientSideUrl(raw.clientSideUrl || '');
    setServerSideUrl(raw.serverSideUrl || '');
    setOtpVerificationType(raw.otpVerificationType === 'phone' ? 'phone' : 'email');
    setMaxFreeAmountLimit(raw.maxFreeAmountLimit !== undefined ? raw.maxFreeAmountLimit : 0);
    setExchangeRateAPIKey(raw.exchangeRateAPIKey || '');
    setDiscordChannel(raw.discordChannel || '');

    // Stripe
    const stripe = raw.stripe || {};
    const creds = stripe.credentials || {};
    setStripeActive(Boolean(stripe.isActive));
    setStripeName(stripe.name || 'Stripe');
    setStripeLogo(stripe.logo || '');
    setStripePublishableKey(creds.publishableKey || '');
    setStripeSecretKey(creds.secretKey || '');
    setStripeWebhookSecret(creds.webhookSecret || '');

    // Twilio
    const phone = raw.phoneConfig || {};
    setTwilioActive(Boolean(phone.isActive));
    setTwilioAccountSid(phone.twilioAccountSid || '');
    setTwilioAuthToken(phone.twilioAuthToken || '');
    setTwilioSenderNumber(phone.twilioSenderNumber || '');

    // Email
    const email = raw.emailConfig || {};
    setEmailProvider(
      email.default === 'gmail' || email.default === 'brevo' ? email.default : 'sendgrid'
    );
    const sg = email.sendgrid || {};
    setSgHost(sg.host || '');
    setSgPort(sg.port !== undefined ? sg.port : 587);
    setSgUsername(sg.username || '');
    setSgPassword(sg.password || '');
    setSgSenderEmail(sg.senderEmail || '');

    const gm = email.gmail || {};
    setGmailAuthEmail(gm.authEmail || '');
    setGmailPassword(gm.password || '');
    setGmailServiceProvider(gm.serviceProvider || 'gmail');

    const br = email.brevo || {};
    setBrevoSenderEmail(br.senderEmail || '');
    setBrevoApiKey(br.apiKey || '');

    // Social Links
    if (Array.isArray(raw.socialMediaLink)) {
      setSocialLinks(raw.socialMediaLink.map((s: any) => ({ name: s?.name || '', link: s?.link || '' })));
    } else {
      setSocialLinks([]);
    }
  };

  const fetchAllSettings = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, lRes] = await Promise.allSettled([
        getSettings(),
        getCurrencyRates(),
        getLanguages(),
      ]);

      if (sRes.status === 'fulfilled') {
        const sVal = sRes.value?.data || sRes.value;
        setOriginalSettings(sVal);
        populateForm(sVal);
      }
      if (cRes.status === 'fulfilled') {
        const cVal = cRes.value;
        setCurrencyRates(Array.isArray(cVal?.data) ? cVal.data : Array.isArray(cVal) ? cVal : []);
      }
      if (lRes.status === 'fulfilled') {
        const lVal = lRes.value;
        setLanguages(Array.isArray(lVal?.data) ? lVal.data : Array.isArray(lVal) ? lVal : []);
      }
    } catch (err) {
      console.error('Failed to load system settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSettings();
  }, []);

  // Discard changes
  const handleDiscard = () => {
    if (originalSettings) {
      populateForm(originalSettings);
      setSaveSuccess(null);
      setSaveError(null);
    }
  };

  // Submit / Save settings
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      // Build strictly according to backend Swagger schema (no spreading of originalSettings)
      const payload: any = {
        siteName: siteName.trim(),
        siteDescription: siteDescription.trim(),
        siteEmail: siteEmail.trim(),
        sitePhone: sitePhone.trim(),
        siteAddress: siteAddress.trim(),
        siteLogo: siteLogo.trim(),
        siteFooter: siteFooter.trim(),
        currencyCode: currencyCode.trim() || 'USD',
        currencySymbol: currencySymbol.trim() || '$',
        clientSideUrl: clientSideUrl.trim(),
        serverSideUrl: serverSideUrl.trim(),
        otpVerificationType,
        maxFreeAmountLimit: Number(maxFreeAmountLimit) || 0,
        exchangeRateAPIKey: exchangeRateAPIKey.trim(),
        discordChannel: discordChannel.trim(),
        stripe: {
          isActive: stripeActive,
          name: stripeName.trim() || 'Stripe',
          logo: stripeLogo.trim(),
          credentials: {
            publishableKey: stripePublishableKey.trim(),
            secretKey: stripeSecretKey.trim(),
            webhookSecret: stripeWebhookSecret.trim(),
          },
        },
        phoneConfig: {
          isActive: twilioActive,
          twilioAccountSid: twilioAccountSid.trim(),
          twilioAuthToken: twilioAuthToken.trim(),
          twilioSenderNumber: twilioSenderNumber.trim(),
        },
        emailConfig: {
          default: emailProvider,
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
        socialMediaLink: socialLinks.filter((s) => s.name.trim() || s.link.trim()),
      };

      // Only include withdrawMethodsInfo if present and is array
      if (Array.isArray(originalSettings?.withdrawMethodsInfo)) {
        payload.withdrawMethodsInfo = originalSettings.withdrawMethodsInfo;
      }

      await updateSystemSettings(payload);

      // Re-fetch fresh settings from the server database so all fields and top cards refresh
      try {
        const fresh = await getSettings();
        const freshData = fresh?.data || fresh;
        if (freshData && typeof freshData === 'object' && (freshData._id || freshData.currencyCode || freshData.siteName)) {
          setOriginalSettings(freshData);
          populateForm(freshData);
        } else {
          // Fallback: keep user's submitted payload so inputs don't get wiped into empty placeholders
          setOriginalSettings({ ...(originalSettings || {}), ...payload });
          populateForm({ ...(originalSettings || {}), ...payload });
        }
      } catch (refreshErr) {
        console.warn('Could not re-fetch settings after save:', refreshErr);
        setOriginalSettings({ ...(originalSettings || {}), ...payload });
        populateForm({ ...(originalSettings || {}), ...payload });
      }

      // Background refresh currency rates and languages
      getCurrencyRates().then((cVal) => {
        setCurrencyRates(Array.isArray(cVal?.data) ? cVal.data : Array.isArray(cVal) ? cVal : []);
      }).catch(() => {});
      getLanguages().then((lVal) => {
        setLanguages(Array.isArray(lVal?.data) ? lVal.data : Array.isArray(lVal) ? lVal : []);
      }).catch(() => {});

      setSaveSuccess('System environment settings updated and saved successfully!');
      setTimeout(() => setSaveSuccess(null), 5000);
    } catch (err: any) {
      console.error('Update settings failed:', err);
      setSaveError(err?.message || 'Failed to update system settings. Check backend connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { name: '', link: '' }]);
  };

  const updateSocialLink = (index: number, field: 'name' | 'link', val: string) => {
    const updated = [...socialLinks];
    updated[index][field] = val;
    setSocialLinks(updated);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  // const handleCopyJson = () => {
  //   if (originalSettings) {
  //     navigator.clipboard.writeText(JSON.stringify(originalSettings, null, 2));
  //     setCopiedJson(true);
  //     setTimeout(() => setCopiedJson(false), 2000);
  //   }
  // };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Top Title & Refresh */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
            System Settings & Telemetry
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Configure live environment variables, payment credentials, SMS/Email gateways, and global settings.
          </p>
        </div>

        <button
          onClick={fetchAllSettings}
          disabled={loading || isSaving}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            background: '#FFFFFF',
            border: '1px solid var(--mc-border)',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            color: 'var(--mc-text-main)',
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Top 2 Cards: Currencies & Languages */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Currencies Card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--mc-border)',
            borderRadius: 12,
            padding: 18,
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <DollarSign size={18} color="var(--mc-primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>
              Supported Currencies & Rates
            </h3>
          </div>
          {currencyRates.length === 0 ? (
            loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#F8FAFC', borderRadius: 6 }}>
                  <Shimmer width={70} height={14} />
                  <Shimmer width={50} height={14} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: '#F8FAFC', borderRadius: 6 }}>
                  <Shimmer width={80} height={14} />
                  <Shimmer width={50} height={14} />
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
                Base: {currencyCode || 'USD'} ({currencySymbol || '$'})
              </div>
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 110, overflowY: 'auto' }}>
              {currencyRates.map((cr, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    background: '#F8FAFC',
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{cr.toCurrency || cr.code || cr.currency || 'Currency'}</span>
                  <span>Rate: {cr.rate || '1.00'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Languages Card */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--mc-border)',
            borderRadius: 12,
            padding: 18,
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Globe size={18} color="#2563EB" />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>
              Supported Locales
            </h3>
          </div>
          {languages.length === 0 ? (
            loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: '#F8FAFC', borderRadius: 6 }}>
                  <Shimmer width={85} height={14} />
                  <Shimmer width={40} height={16} className="mc-shimmer-pill" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: '#F8FAFC', borderRadius: 6 }}>
                  <Shimmer width={75} height={14} />
                  <Shimmer width={40} height={16} className="mc-shimmer-pill" />
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
                English (en) • বাংলা (bn)
              </div>
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 110, overflowY: 'auto' }}>
              {languages.map((l, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 10px',
                    background: '#F8FAFC',
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {l.flag ? `${l.flag} ` : ''}
                    {l.name || l.title || 'Language'}
                  </span>
                  <span className="mc-badge mc-badge-tag">{l.code || 'locale'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          GRAPHICAL SYSTEM SETTINGS MANAGEMENT CARD
          ========================================================================= */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--mc-border)',
          borderRadius: 12,
          boxShadow: 'var(--mc-shadow-sm)',
          overflow: 'hidden',
          marginBottom: 32,
        }}
      >
        {/* Card Header with Live Status & Action Buttons */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--mc-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            background: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: 'rgba(109, 61, 245, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mc-brand-purple)',
              }}
            >
              <Sliders size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                System Configuration Editor
              </h2>
              <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                Live environment controls & service integration credentials
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={handleDiscard}
              disabled={isSaving || loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                background: '#F8FAFC',
                border: '1px solid var(--mc-border)',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--mc-text-muted)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Discard</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveSettings()}
              disabled={isSaving || loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                background: 'var(--mc-primary-gradient)',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(109, 61, 245, 0.25)',
              }}
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {saveSuccess && (
          <div
            style={{
              padding: '12px 20px',
              background: '#ECFDF5',
              borderBottom: '1px solid #A7F3D0',
              color: '#065F46',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 500,
            }}
          >
            <CheckCircle2 size={16} color="#10B981" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {saveError && (
          <div
            style={{
              padding: '12px 20px',
              background: 'var(--mc-danger-light)',
              borderBottom: '1px solid var(--mc-danger-border)',
              color: 'var(--mc-danger)',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 500,
            }}
          >
            <AlertCircle size={16} />
            <span>{saveError}</span>
          </div>
        )}

        {/* Sub-navigation Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--mc-border)',
            background: '#F8FAFC',
            overflowX: 'auto',
            padding: '4px 12px 0 12px',
            gap: 4,
          }}
        >
          {[
            { id: 'general', label: 'General & Site', icon: Globe },
            { id: 'stripe', label: 'Stripe Gateway', icon: CreditCard },
            { id: 'twilio', label: 'SMS (Twilio)', icon: MessageSquare },
            { id: 'email', label: 'Email Gateway', icon: Mail },
            { id: 'social', label: 'Social & Community', icon: Share2 },
            // { id: 'json', label: 'Raw JSON Telemetry', icon: Code },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id as SettingsSubTab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  borderTop: isActive ? '2px solid var(--mc-brand-purple)' : '2px solid transparent',
                  borderLeft: isActive ? '1px solid var(--mc-border)' : '1px solid transparent',
                  borderRight: isActive ? '1px solid var(--mc-border)' : '1px solid transparent',
                  borderBottom: isActive ? '1px solid #FFFFFF' : '1px solid transparent',
                  borderRadius: '8px 8px 0 0',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                  cursor: 'pointer',
                  marginBottom: -1,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ===================== SUB-TAB CONTENT ===================== */}
        <div style={{ padding: 24 }}>
          {loading ? (
            <div>
              <div style={{ marginBottom: 24 }}>
                <Shimmer width={240} height={18} style={{ marginBottom: 8 }} />
                <Shimmer width={380} height={13} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Shimmer width={100} height={12} style={{ marginBottom: 8 }} />
                    <Shimmer width="100%" height={40} borderRadius={8} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <Shimmer width={180} height={16} style={{ marginBottom: 10 }} />
                <Shimmer width="100%" height={80} borderRadius={8} />
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: GENERAL & SITE */}
          {activeSubTab === 'general' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  General Platform & Site Configuration
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Brand details, default currency, application URLs, and authentication verification rules.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="mc-label">Site Name</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="ExpenseX AI"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Official Contact Email</label>
                  <input
                    type="text"
                    inputMode="email"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    data-lpignore="true"
                    data-form-type="other"
                    className="mc-input"
                    placeholder="support@expensex.ai"
                    value={siteEmail}
                    onChange={(e) => setSiteEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Contact Phone</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="+8801700000000"
                    value={sitePhone}
                    onChange={(e) => setSitePhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Physical Address</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="Dhaka, Bangladesh"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="mc-label">Client-Side Web URL</label>
                  <input
                    type="url"
                    className="mc-input"
                    placeholder="https://expensex.ai"
                    value={clientSideUrl}
                    onChange={(e) => setClientSideUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Server-Side API Base URL</label>
                  <input
                    type="url"
                    className="mc-input"
                    placeholder="https://api.xpenstick.appstick.com.bd/api/v1"
                    value={serverSideUrl}
                    onChange={(e) => setServerSideUrl(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="mc-label">Site Meta Description</label>
                <textarea
                  className="mc-input"
                  style={{ height: 70, padding: 10, resize: 'vertical' }}
                  placeholder="Comprehensive financial and expense management platform powered by AI..."
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="mc-label">Base Currency Code</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="USD"
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())}
                  />
                  <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>e.g. USD, BDT, EUR, GBP</span>
                </div>

                <div>
                  <label className="mc-label">Base Currency Symbol</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="$"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                  />
                  <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>e.g. $, ৳, €, £</span>
                </div>

                <div>
                  <label className="mc-label">Default OTP Method</label>
                  <select
                    className="mc-input"
                    value={otpVerificationType}
                    onChange={(e) => setOtpVerificationType(e.target.value as 'email' | 'phone')}
                  >
                    <option value="email">Email Verification</option>
                    <option value="phone">Phone / SMS Verification</option>
                  </select>
                  <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>Preferred channel for user 2FA & signups</span>
                </div>

                <div>
                  <label className="mc-label">Max Free Amount Limit</label>
                  <input
                    type="number"
                    className="mc-input"
                    placeholder="0"
                    value={maxFreeAmountLimit}
                    onChange={(e) => setMaxFreeAmountLimit(e.target.value)}
                  />
                  <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>Set to 0 for unlimited</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="mc-label">Exchange Rate API Key</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showExchangeKey ? 'text' : 'password'}
                      className="mc-input"
                      placeholder="e.g. 80b4608c7ab833f4c9a0cf82"
                      value={exchangeRateAPIKey}
                      onChange={(e) => setExchangeRateAPIKey(e.target.value)}
                      style={{ paddingRight: 40 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowExchangeKey(!showExchangeKey)}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--mc-text-muted)',
                        cursor: 'pointer',
                      }}
                    >
                      {showExchangeKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mc-label">Footer Copyright Text</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="© 2026 ExpenseX. All rights reserved."
                    value={siteFooter}
                    onChange={(e) => setSiteFooter(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mc-label">Site Logo URL</label>
                <input
                  type="url"
                  className="mc-input"
                  placeholder="https://example.com/logo.png"
                  value={siteLogo}
                  onChange={(e) => setSiteLogo(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* TAB 2: STRIPE PAYMENT */}
          {activeSubTab === 'stripe' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  Stripe Payment Gateway Configuration
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Manage payment credentials, API keys, webhooks, and toggle the Stripe gateway on or off.
                </p>
              </div>

              {/* Active Toggle Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: stripeActive ? 'rgba(16, 185, 129, 0.08)' : '#F8FAFC',
                  border: stripeActive ? '1.5px solid #10B981' : '1px solid var(--mc-border)',
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--mc-text-main)' }}>
                    Stripe Payment Gateway Status
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    {stripeActive
                      ? 'Gateway is ACTIVE and processing transactions.'
                      : 'Gateway is INACTIVE. Users cannot make card payments.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStripeActive(!stripeActive)}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    background: stripeActive ? '#10B981' : '#CBD5E1',
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      background: '#FFFFFF',
                      position: 'absolute',
                      top: 3,
                      left: stripeActive ? 25 : 3,
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                    }}
                  />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label className="mc-label">Gateway Display Name</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="Stripe"
                    value={stripeName}
                    onChange={(e) => setStripeName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Gateway Logo URL</label>
                  <input
                    type="url"
                    className="mc-input"
                    placeholder="https://..."
                    value={stripeLogo}
                    onChange={(e) => setStripeLogo(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="mc-label">Stripe Publishable Key (Client Key)</label>
                <input
                  type="text"
                  className="mc-input"
                  placeholder="pk_test_... or pk_live_..."
                  value={stripePublishableKey}
                  onChange={(e) => setStripePublishableKey(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="mc-label">Stripe Secret Key (Backend Only)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showStripeSecret ? 'text' : 'password'}
                    className="mc-input"
                    placeholder="sk_test_... or sk_live_..."
                    value={stripeSecretKey}
                    onChange={(e) => setStripeSecretKey(e.target.value)}
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowStripeSecret(!showStripeSecret)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--mc-text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    {showStripeSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mc-label">Stripe Webhook Signing Secret</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showStripeWebhook ? 'text' : 'password'}
                    className="mc-input"
                    placeholder="whsec_..."
                    value={stripeWebhookSecret}
                    onChange={(e) => setStripeWebhookSecret(e.target.value)}
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowStripeWebhook(!showStripeWebhook)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--mc-text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    {showStripeWebhook ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SMS (TWILIO) */}
          {activeSubTab === 'twilio' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  Twilio SMS Gateway Configuration
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Configure Twilio credentials for sending OTP verification codes, SMS alerts, and notifications.
                </p>
              </div>

              {/* Active Toggle Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: twilioActive ? 'rgba(37, 99, 235, 0.08)' : '#F8FAFC',
                  border: twilioActive ? '1.5px solid #2563EB' : '1px solid var(--mc-border)',
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--mc-text-main)' }}>
                    Twilio SMS Service Status
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    {twilioActive
                      ? 'SMS Gateway is ENABLED and dispatching messages.'
                      : 'SMS Gateway is DISABLED. OTPs will not be sent via SMS.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTwilioActive(!twilioActive)}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 13,
                    background: twilioActive ? '#2563EB' : '#CBD5E1',
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      background: '#FFFFFF',
                      position: 'absolute',
                      top: 3,
                      left: twilioActive ? 25 : 3,
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                    }}
                  />
                </button>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="mc-label">Twilio Account SID</label>
                <input
                  type="text"
                  className="mc-input"
                  placeholder="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  value={twilioAccountSid}
                  onChange={(e) => setTwilioAccountSid(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="mc-label">Twilio Auth Token</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showTwilioToken ? 'text' : 'password'}
                    className="mc-input"
                    placeholder="Auth Token"
                    value={twilioAuthToken}
                    onChange={(e) => setTwilioAuthToken(e.target.value)}
                    style={{ paddingRight: 40 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowTwilioToken(!showTwilioToken)}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--mc-text-muted)',
                      cursor: 'pointer',
                    }}
                  >
                    {showTwilioToken ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mc-label">Twilio Sender Number / Alphanumeric ID</label>
                <input
                  type="text"
                  className="mc-input"
                  placeholder="+1234567890"
                  value={twilioSenderNumber}
                  onChange={(e) => setTwilioSenderNumber(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* TAB 4: EMAIL GATEWAY */}
          {activeSubTab === 'email' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  Email Delivery Gateway Configuration
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Select your primary SMTP email delivery service and configure host, port, credentials, and sender address.
                </p>
              </div>

              {/* Provider Selection Cards */}
              <div style={{ marginBottom: 20 }}>
                <label className="mc-label">Default Email Provider</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  {[
                    { id: 'sendgrid', title: 'SendGrid', desc: 'Cloud SMTP & Web API' },
                    { id: 'gmail', title: 'Gmail SMTP', desc: 'Google Workspace / App Passwords' },
                    { id: 'brevo', title: 'Brevo (Sendinblue)', desc: 'Transactional API & SMTP' },
                  ].map((p) => {
                    const isSelected = emailProvider === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setEmailProvider(p.id as any)}
                        style={{
                          padding: '14px 16px',
                          borderRadius: 10,
                          border: isSelected ? '2px solid var(--mc-brand-purple)' : '1px solid var(--mc-border)',
                          background: isSelected ? 'rgba(109, 61, 245, 0.05)' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 700, fontSize: 14, color: isSelected ? 'var(--mc-brand-purple)' : 'var(--mc-text-main)' }}>
                            {p.title}
                          </span>
                          {isSelected && <CheckCircle2 size={16} color="var(--mc-brand-purple)" />}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', marginTop: 4 }}>{p.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SENDGRID FIELDS */}
              {emailProvider === 'sendgrid' && (
                <div style={{ padding: 18, background: '#F8FAFC', borderRadius: 10, border: '1px solid var(--mc-border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--mc-text-main)' }}>
                    SendGrid Credentials
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="mc-label">Host</label>
                      <input
                        type="text"
                        className="mc-input"
                        placeholder="smtp.sendgrid.net"
                        value={sgHost}
                        onChange={(e) => setSgHost(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mc-label">Port</label>
                      <input
                        type="number"
                        className="mc-input"
                        placeholder="587"
                        value={sgPort}
                        onChange={(e) => setSgPort(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="mc-label">Username</label>
                      <input
                        type="text"
                        className="mc-input"
                        placeholder="apikey"
                        value={sgUsername}
                        onChange={(e) => setSgUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mc-label">Password / API Key</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showSgPassword ? 'text' : 'password'}
                          className="mc-input"
                          placeholder="SG.xxxxxxxxxxxx"
                          value={sgPassword}
                          onChange={(e) => setSgPassword(e.target.value)}
                          style={{ paddingRight: 40 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowSgPassword(!showSgPassword)}
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--mc-text-muted)',
                            cursor: 'pointer',
                          }}
                        >
                          {showSgPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mc-label">Verified Sender Email</label>
                    <input
                      type="text"
                      inputMode="email"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      data-lpignore="true"
                      data-form-type="other"
                      className="mc-input"
                      placeholder="no-reply@expensex.ai"
                      value={sgSenderEmail}
                      onChange={(e) => setSgSenderEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* GMAIL FIELDS */}
              {emailProvider === 'gmail' && (
                <div style={{ padding: 18, background: '#F8FAFC', borderRadius: 10, border: '1px solid var(--mc-border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--mc-text-main)' }}>
                    Google / Gmail SMTP Settings
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label className="mc-label">Auth Email Address</label>
                      <input
                        type="text"
                        inputMode="email"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        data-lpignore="true"
                        data-form-type="other"
                        className="mc-input"
                        placeholder="yourname@gmail.com"
                        value={gmailAuthEmail}
                        onChange={(e) => setGmailAuthEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mc-label">Google App Password (16 characters)</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showGmailPassword ? 'text' : 'password'}
                          className="mc-input"
                          placeholder="xxxx xxxx xxxx xxxx"
                          value={gmailPassword}
                          onChange={(e) => setGmailPassword(e.target.value)}
                          style={{ paddingRight: 40 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowGmailPassword(!showGmailPassword)}
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--mc-text-muted)',
                            cursor: 'pointer',
                          }}
                        >
                          {showGmailPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mc-label">Service Provider</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="gmail"
                      value={gmailServiceProvider}
                      onChange={(e) => setGmailServiceProvider(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* BREVO FIELDS */}
              {emailProvider === 'brevo' && (
                <div style={{ padding: 18, background: '#F8FAFC', borderRadius: 10, border: '1px solid var(--mc-border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: 'var(--mc-text-main)' }}>
                    Brevo (Sendinblue) Credentials
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="mc-label">Sender Email</label>
                      <input
                        type="text"
                        inputMode="email"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        data-lpignore="true"
                        data-form-type="other"
                        className="mc-input"
                        placeholder="noreply@domain.com"
                        value={brevoSenderEmail}
                        onChange={(e) => setBrevoSenderEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mc-label">Brevo API Key (xkeysib-...)</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showBrevoKey ? 'text' : 'password'}
                          className="mc-input"
                          placeholder="xkeysib-..."
                          value={brevoApiKey}
                          onChange={(e) => setBrevoApiKey(e.target.value)}
                          style={{ paddingRight: 40 }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowBrevoKey(!showBrevoKey)}
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--mc-text-muted)',
                            cursor: 'pointer',
                          }}
                        >
                          {showBrevoKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SOCIAL MEDIA & COMMUNITY */}
          {activeSubTab === 'social' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
                  Social Channels & Community Links
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
                  Manage links to Discord, Facebook, Twitter/X, LinkedIn, and official support communities.
                </p>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="mc-label">Discord Channel / Community Invite URL</label>
                <input
                  type="url"
                  className="mc-input"
                  placeholder="https://discord.gg/expensexai"
                  value={discordChannel}
                  onChange={(e) => setDiscordChannel(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="mc-label" style={{ margin: 0 }}>Social Media Links</label>
                <button
                  type="button"
                  onClick={addSocialLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    background: '#FFFFFF',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--mc-brand-purple)',
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={14} />
                  <span>Add Social Link</span>
                </button>
              </div>

              {socialLinks.length === 0 ? (
                <div
                  style={{
                    padding: 24,
                    textAlign: 'center',
                    background: '#F8FAFC',
                    borderRadius: 8,
                    border: '1px dashed var(--mc-border)',
                    fontSize: 13,
                    color: 'var(--mc-text-muted)',
                  }}
                >
                  No social media links added yet. Click &quot;Add Social Link&quot; above to add Facebook, Twitter, LinkedIn, etc.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {socialLinks.map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '160px 1fr 40px',
                        gap: 12,
                        alignItems: 'center',
                      }}
                    >
                      <input
                        type="text"
                        className="mc-input"
                        placeholder="Platform (e.g. Facebook)"
                        value={s.name}
                        onChange={(e) => updateSocialLink(idx, 'name', e.target.value)}
                      />
                      <input
                        type="url"
                        className="mc-input"
                        placeholder="https://facebook.com/yourpage"
                        value={s.link}
                        onChange={(e) => updateSocialLink(idx, 'link', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeSocialLink(idx)}
                        style={{
                          width: 36,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--mc-danger-light)',
                          border: '1px solid var(--mc-danger-border)',
                          borderRadius: 8,
                          color: 'var(--mc-danger)',
                          cursor: 'pointer',
                        }}
                        title="Remove link"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: RAW JSON TELEMETRY - Commented out per request
          {activeSubTab === 'json' && (
            <div>
              ...
            </div>
          )}
          */}
            </>
          )}
        </div>

        {/* Bottom Save Bar */}
        <div
          style={{
            padding: '14px 20px',
            background: '#F8FAFC',
            borderTop: '1px solid var(--mc-border)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 10,
          }}
        >
            <button
              type="button"
              onClick={handleDiscard}
              disabled={isSaving || loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                background: '#FFFFFF',
                border: '1px solid var(--mc-border)',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--mc-text-muted)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Values</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveSettings()}
              disabled={isSaving || loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 22px',
                background: 'var(--mc-primary-gradient)',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(109, 61, 245, 0.25)',
              }}
            >
              {isSaving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
      </div>
    </div>
  );
};
