'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchSettings,
  postSettings,
  postSingleImage,
} from '../../../helpers/backend';
import {
  Upload,
  Save,
  RefreshCw,
  Globe,
  Mail,
  Phone,
  MapPin,
  Image as ImageIcon,
  DollarSign,
  Server,
  Key,
  Coins,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Shimmer } from '../../../components/common/Shimmer';
import { Input, Select, Textarea } from '../../../components/common/form';
import { showSuccessAlert, showErrorToast } from '../../../helpers/notification';

const CURRENCY_OPTIONS = [
  { code: 'USD', symbol: '$', name: 'USD - US Dollar ($)' },
  { code: 'BDT', symbol: '৳', name: 'BDT - Bangladeshi Taka (৳)' },
  { code: 'EUR', symbol: '€', name: 'EUR - Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'GBP - British Pound (£)' },
  { code: 'INR', symbol: '₹', name: 'INR - Indian Rupee (₹)' },
  { code: 'CAD', symbol: 'CA$', name: 'CAD - Canadian Dollar ($)' },
  { code: 'AUD', symbol: 'AU$', name: 'AUD - Australian Dollar ($)' },
  { code: 'JPY', symbol: '¥', name: 'JPY - Japanese Yen (¥)' },
  { code: 'CNY', symbol: '¥', name: 'CNY - Chinese Yuan (¥)' },
  { code: 'AED', symbol: 'AED', name: 'AED - UAE Dirham (د.إ)' },
  { code: 'SAR', symbol: 'SAR', name: 'SAR - Saudi Riyal (﷼)' },
  { code: 'SGD', symbol: 'SG$', name: 'SGD - Singapore Dollar ($)' },
  { code: 'MYR', symbol: 'RM', name: 'MYR - Malaysian Ringgit (RM)' },
  { code: 'PKR', symbol: '₨', name: 'PKR - Pakistani Rupee (₨)' },
  { code: 'CHF', symbol: 'CHF', name: 'CHF - Swiss Franc (CHF)' },
  { code: 'BRL', symbol: 'R$', name: 'BRL - Brazilian Real (R$)' },
  { code: 'RUB', symbol: '₽', name: 'RUB - Russian Ruble (₽)' },
  { code: 'KRW', symbol: '₩', name: 'KRW - South Korean Won (₩)' },
  { code: 'TRY', symbol: '₺', name: 'TRY - Turkish Lira (₺)' },
  { code: 'THB', symbol: '฿', name: 'THB - Thai Baht (฿)' },
  { code: 'IDR', symbol: 'Rp', name: 'IDR - Indonesian Rupiah (Rp)' },
  { code: 'NGN', symbol: '₦', name: 'NGN - Nigerian Naira (₦)' },
  { code: 'EGP', symbol: 'E£', name: 'EGP - Egyptian Pound (E£)' },
  { code: 'PHP', symbol: '₱', name: 'PHP - Philippine Peso (₱)' },
  { code: 'VND', symbol: '₫', name: 'VND - Vietnamese Dong (₫)' },
  { code: 'ZAR', symbol: 'R', name: 'ZAR - South African Rand (R)' },
];

const CURRENCY_SYMBOLS = [
  { symbol: '$', label: '$ (Dollar)' },
  { symbol: '৳', label: '৳ (Taka)' },
  { symbol: '€', label: '€ (Euro)' },
  { symbol: '£', label: '£ (Pound)' },
  { symbol: '₹', label: '₹ (Rupee)' },
  { symbol: '¥', label: '¥ (Yen / Yuan)' },
  { symbol: '﷼', label: '﷼ (Riyal)' },
  { symbol: 'AED', label: 'AED (Dirham)' },
  { symbol: 'CHF', label: 'CHF (Franc)' },
  { symbol: 'RM', label: 'RM (Ringgit)' },
  { symbol: '₨', label: '₨ (Rupee)' },
  { symbol: '₩', label: '₩ (Won)' },
  { symbol: '₺', label: '₺ (Lira)' },
  { symbol: '฿', label: '฿ (Baht)' },
  { symbol: 'Rp', label: 'Rp (Rupiah)' },
  { symbol: '₦', label: '₦ (Naira)' },
  { symbol: '₱', label: '₱ (Peso)' },
  { symbol: '₫', label: '₫ (Dong)' },
  { symbol: 'R', label: 'R (Rand)' },
  { symbol: 'CA$', label: 'CA$ (CAD)' },
  { symbol: 'AU$', label: 'AU$ (AUD)' },
  { symbol: 'SG$', label: 'SG$ (SGD)' },
];

export default function AdminGeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State: exact fields matching backend setting model
  const [settingId, setSettingId] = useState<string>('');
  const [siteName, setSiteName] = useState<string>('');
  const [siteLogo, setSiteLogo] = useState<string>('');
  const [siteEmail, setSiteEmail] = useState<string>('');
  const [sitePhone, setSitePhone] = useState<string>('');
  const [siteAddress, setSiteAddress] = useState<string>('');
  const [siteFooter, setSiteFooter] = useState<string>('');
  const [siteDescription, setSiteDescription] = useState<string>('');
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [clientSideUrl, setClientSideUrl] = useState<string>('');
  const [serverSideUrl, setServerSideUrl] = useState<string>('');
  const [otpVerificationType, setOtpVerificationType] = useState<'email' | 'phone'>('email');
  const [parReferralCoin, setParReferralCoin] = useState<number | string>(0);
  const [exchangeRateAPIKey, setExchangeRateAPIKey] = useState<string>('');
  const [maxFreeAmountLimit, setMaxFreeAmountLimit] = useState<number | string>(0);
  const [inputTokenPerCredit, setInputTokenPerCredit] = useState<number | string>(1);
  const [outputTokenPerCredit, setOutputTokenPerCredit] = useState<number | string>(1);
  const [discordChannel, setDiscordChannel] = useState<string>('');

  // Uploading state
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchSettings();
      const d = res?.data || res;
      if (d) {
        setSettingId(d._id || '');

        setSiteName(d.siteName || '');
        setSiteLogo(d.siteLogo || '');
        setSiteEmail(d.siteEmail || '');
        setSitePhone(d.sitePhone || '');
        setSiteAddress(d.siteAddress || '');
        setSiteFooter(d.siteFooter || '');
        setSiteDescription(d.siteDescription || '');

        setCurrencyCode(d.currencyCode || 'USD');
        setCurrencySymbol(d.currencySymbol || '$');

        setClientSideUrl(d.clientSideUrl || '');
        setServerSideUrl(d.serverSideUrl || '');
        setOtpVerificationType(d.otpVerificationType === 'phone' ? 'phone' : 'email');
        setParReferralCoin(d.parReferralCoin !== undefined ? d.parReferralCoin : 0);
        setExchangeRateAPIKey(d.exchangeRateAPIKey || '');
        setMaxFreeAmountLimit(d.maxFreeAmountLimit !== undefined ? d.maxFreeAmountLimit : 0);
        setInputTokenPerCredit(d.inputTokenPerCredit !== undefined ? d.inputTokenPerCredit : 1);
        setOutputTokenPerCredit(d.outputTokenPerCredit !== undefined ? d.outputTokenPerCredit : 1);
        setDiscordChannel(d.discordChannel || '');
      }
    } catch (err: any) {
      console.warn('Could not load settings from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      setUploadingLogo(true);
      const res = await postSingleImage({ image: file, image_name: 'siteLogo' });
      const imgUrl = res?.image || res?.data?.image || res?.url || '';
      if (imgUrl) {
        setSiteLogo(imgUrl);
      }
    } catch (err: any) {
      console.error('Failed to upload siteLogo:', err);
      const preview = URL.createObjectURL(file);
      setSiteLogo(preview);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Record<string, any> = {
      _id: settingId || undefined,
      siteName: siteName.trim(),
      siteLogo: siteLogo.trim(),
      siteEmail: siteEmail.trim(),
      sitePhone: sitePhone.trim(),
      siteAddress: siteAddress.trim(),
      siteFooter: siteFooter.trim(),
      siteDescription: siteDescription.trim(),
      currencyCode: currencyCode.trim().toUpperCase(),
      currencySymbol: currencySymbol.trim(),
      clientSideUrl: clientSideUrl.trim(),
      serverSideUrl: serverSideUrl.trim(),
      otpVerificationType,
      parReferralCoin: Number(parReferralCoin) || 0,
      exchangeRateAPIKey: exchangeRateAPIKey.trim(),
      maxFreeAmountLimit: Number(maxFreeAmountLimit) || 0,
      inputTokenPerCredit: inputTokenPerCredit !== '' ? Number(inputTokenPerCredit) : 1,
      outputTokenPerCredit: outputTokenPerCredit !== '' ? Number(outputTokenPerCredit) : 1,
      discordChannel: discordChannel.trim(),
    };

    try {
      const res = await postSettings(payload);
      showSuccessAlert(res?.msg || res?.message || 'General settings saved successfully!');
      loadData();
    } catch (err: any) {
      showErrorToast(err?.message || 'Failed to save settings. Please verify backend connection.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Shimmer height="44px" width="280px" borderRadius="8px" />
        <Shimmer height="180px" borderRadius="12px" />
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
            General Settings
          </h2>
        </div>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* SINGLE BORDERED CONTAINER FOR ALL SETTINGS */}
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
            gap: '28px',
          }}
        >
          {/* Logo Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="mc-label">Site Logo (siteLogo)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 8,
                  background: '#F8FAFC',
                  border: '1px dashed var(--mc-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {siteLogo ? (
                  <img
                    src={siteLogo}
                    alt="Site Logo"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <ImageIcon size={24} color="var(--mc-text-subtle)" />
                )}
              </div>
              <label
                className="mc-btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer' }}
              >
                <Upload size={13} />
                <span>{uploadingLogo ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </label>
            </div>
          </div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '0 -28px' }} />

          {/* Application & Contact Details */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Globe size={18} color="var(--mc-brand-purple)" />
              Application & Contact Details
            </h3>

            <div className="mc-grid-2">
              {/* Site Name */}
              <Input
                label="Site Name (siteName)"
                required
                leftIcon={<Globe size={16} />}
                placeholder="ExpenseX"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />

              {/* Contact Email */}
              <Input
                label="Contact Email (siteEmail)"
                type="email"
                required
                leftIcon={<Mail size={16} />}
                placeholder="contact@expensex.ai"
                value={siteEmail}
                onChange={(e) => setSiteEmail(e.target.value)}
              />

              {/* Contact Phone */}
              <Input
                label="Contact Phone (sitePhone)"
                type="tel"
                required
                leftIcon={<Phone size={16} />}
                placeholder="+1 (800) 555-0199"
                value={sitePhone}
                onChange={(e) => setSitePhone(e.target.value)}
              />

              {/* Physical Address */}
              <Input
                label="Physical Address (siteAddress)"
                required
                leftIcon={<MapPin size={16} />}
                placeholder="Dhaka, Bangladesh"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
              />

              {/* Site Footer */}
              <Input
                label="Site Footer Text (siteFooter)"
                leftIcon={<FileText size={16} />}
                placeholder="© 2026 ExpenseX. All rights reserved."
                value={siteFooter}
                onChange={(e) => setSiteFooter(e.target.value)}
              />

              {/* Client Side URL */}
              <Input
                label="Client Side URL (clientSideUrl)"
                type="url"
                leftIcon={<Globe size={16} />}
                placeholder="http://localhost:3000"
                value={clientSideUrl}
                onChange={(e) => setClientSideUrl(e.target.value)}
              />

              {/* Server Side URL */}
              <Input
                label="Server Side URL (serverSideUrl)"
                type="url"
                leftIcon={<Server size={16} />}
                placeholder="https://backend.expensexai.com/api/v1"
                value={serverSideUrl}
                onChange={(e) => setServerSideUrl(e.target.value)}
              />

              {/* Discord Channel */}
              <Input
                label="Discord Channel (discordChannel)"
                leftIcon={<MessageSquare size={16} />}
                placeholder="https://discord.gg/expensex"
                value={discordChannel}
                onChange={(e) => setDiscordChannel(e.target.value)}
              />

              {/* Site Description */}
              <Textarea
                label="Site Description (siteDescription)"
                required
                rows={3}
                containerStyle={{ gridColumn: '1 / -1' }}
                placeholder="Best finance management platform..."
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
              />
            </div>
          </div>

          <div style={{ height: '1px', background: '#F1F5F9', margin: '0 -28px' }} />

          {/* Currency, Limits & Integrations */}
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <DollarSign size={18} color="var(--mc-brand-purple)" />
              Currency, Limits & Integrations
            </h3>

            <div className="mc-grid-2">
              {/* Currency Code */}
              <Select
                label="Currency Code (currencyCode)"
                leftIcon={<DollarSign size={16} />}
                searchable
                value={currencyCode}
                onChange={(newCode) => {
                  setCurrencyCode(newCode);
                  const match = CURRENCY_OPTIONS.find((c) => c.code === newCode);
                  if (match) {
                    setCurrencySymbol(match.symbol);
                  }
                }}
                options={CURRENCY_OPTIONS.map((c) => ({
                  value: c.code,
                  label: c.name,
                  badge: c.code,
                }))}
              />

              {/* Currency Symbol */}
              <Select
                label="Currency Symbol (currencySymbol)"
                value={currencySymbol}
                onChange={(newSymbol) => setCurrencySymbol(newSymbol)}
                options={CURRENCY_SYMBOLS.map((s) => ({
                  value: s.symbol,
                  label: s.label,
                }))}
              />

              {/* User AI Credit (Default) */}
              <Input
                label="User Ai Credit (Default) (maxFreeAmountLimit)"
                type="number"
                leftIcon={<CreditCard size={16} />}
                placeholder="1000"
                value={maxFreeAmountLimit}
                onChange={(e) => setMaxFreeAmountLimit(e.target.value)}
              />

              {/* Exchange Rate API Key with Eye Toggle */}
              <Input
                label="Exchange Rate API Key (exchangeRateAPIKey)"
                showPasswordToggle
                leftIcon={<Key size={16} />}
                placeholder="ex_live_xxxxxxxxxxxxxxxx"
                value={exchangeRateAPIKey}
                onChange={(e) => setExchangeRateAPIKey(e.target.value)}
              />

              {/* OTP Verification Type */}
              <Select
                label="OTP Verification Type (otpVerificationType)"
                leftIcon={<ShieldCheck size={16} />}
                dropdownPosition="bottom"
                value={otpVerificationType}
                onChange={(val) => setOtpVerificationType(val as 'email' | 'phone')}
                options={[
                  { value: 'email', label: 'Email Verification Code' },
                  { value: 'phone', label: 'SMS / Phone Verification Code' },
                ]}
              />

              {/* Per Referral Coin */}
              <Input
                label="Per Referral Coin (parReferralCoin)"
                type="number"
                leftIcon={<Coins size={16} />}
                placeholder="10"
                value={parReferralCoin}
                onChange={(e) => setParReferralCoin(e.target.value)}
              />

              {/* Input Token Per Credit */}
              <Input
                label="Input Token Per Credit (inputTokenPerCredit)"
                type="number"
                leftIcon={<Sparkles size={16} />}
                placeholder="1"
                value={inputTokenPerCredit}
                onChange={(e) => setInputTokenPerCredit(e.target.value)}
              />

              {/* Output Token Per Credit */}
              <Input
                label="Output Token Per Credit (outputTokenPerCredit)"
                type="number"
                leftIcon={<Sparkles size={16} />}
                placeholder="1"
                value={outputTokenPerCredit}
                onChange={(e) => setOutputTokenPerCredit(e.target.value)}
              />
            </div>
          </div>

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
