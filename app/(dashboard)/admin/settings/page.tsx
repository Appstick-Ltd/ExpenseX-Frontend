'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchSettings,
  postSettings,
  postSingleImage,
} from '../../../helpers/backend';
import {
  Settings as SettingsIcon,
  Upload,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  HardDrive,
  Image as ImageIcon,
  DollarSign,
} from 'lucide-react';
import { Shimmer } from '../../../components/common/Shimmer';

export default function AdminGeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Form State matching roofstick-frontend/app/(dashboard)/admin/settings/page.js
  const [settingId, setSettingId] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [footerLogo, setFooterLogo] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [playStore, setPlayStore] = useState<string>('');
  const [appStore, setAppStore] = useState<string>('');
  const [fileUploadPath, setFileUploadPath] = useState<'file' | 's3'>('file');

  // ExpenseX dynamic currency / limits
  const [currencyCode, setCurrencyCode] = useState<string>('USD');
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [otpVerificationType, setOtpVerificationType] = useState<'email' | 'phone'>('email');
  const [maxFreeAmountLimit, setMaxFreeAmountLimit] = useState<number | string>(0);

  // Uploading flags
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFooter, setUploadingFooter] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setSaveError(null);
    try {
      const res = await fetchSettings();
      const d = res?.data || res;
      if (d) {
        setSettingId(d._id || '');
        setTitle(d.title || d.siteName || '');
        setDescription(d.description || d.siteDescription || '');
        setEmail(d.email || d.siteEmail || '');
        setPhone(d.phone || d.sitePhone || '');
        setAddress(d.address || d.siteAddress || '');

        const logoVal = typeof d.logo === 'string' ? d.logo : d.logo?.[0]?.url || d.siteLogo || '';
        setLogo(logoVal);
        const footerVal = typeof d.footer_logo === 'string' ? d.footer_logo : d.footer_logo?.[0]?.url || d.siteFooter || '';
        setFooterLogo(footerVal);

        setFacebook(d.facebook || '');
        setTwitter(d.twitter || '');
        setInstagram(d.instagram || '');
        setLinkedin(d.linkedin || '');
        setYoutube(d.youtube || '');
        setPlayStore(d.playStore || '');
        setAppStore(d.appStore || '');
        setFileUploadPath(d.fileUploadPath === 's3' ? 's3' : 'file');

        if (d.currencyCode) setCurrencyCode(d.currencyCode);
        if (d.currencySymbol) setCurrencySymbol(d.currencySymbol);
        if (d.otpVerificationType) setOtpVerificationType(d.otpVerificationType);
        if (d.maxFreeAmountLimit !== undefined) setMaxFreeAmountLimit(d.maxFreeAmountLimit);
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

  const handleFileUpload = async (file: File, type: 'logo' | 'footer_logo') => {
    try {
      if (type === 'logo') setUploadingLogo(true);
      else setUploadingFooter(true);

      const res = await postSingleImage({ image: file, image_name: type });
      const imgUrl = res?.image || res?.data?.image || res?.url || '';
      if (imgUrl) {
        if (type === 'logo') setLogo(imgUrl);
        else setFooterLogo(imgUrl);
      }
    } catch (err: any) {
      console.error(`Failed to upload ${type}:`, err);
      const preview = URL.createObjectURL(file);
      if (type === 'logo') setLogo(preview);
      else setFooterLogo(preview);
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingFooter(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    const payload: Record<string, any> = {
      _id: settingId || undefined,
      title: title.trim(),
      siteName: title.trim(),
      description: description.trim(),
      siteDescription: description.trim(),
      email: email.trim(),
      siteEmail: email.trim(),
      phone: phone.trim(),
      sitePhone: phone.trim(),
      address: address.trim(),
      siteAddress: address.trim(),
      logo: logo.trim(),
      footer_logo: footerLogo.trim(),
      facebook: facebook.trim(),
      twitter: twitter.trim(),
      instagram: instagram.trim(),
      linkedin: linkedin.trim(),
      youtube: youtube.trim(),
      playStore: playStore.trim(),
      appStore: appStore.trim(),
      fileUploadPath,
      currencyCode,
      currencySymbol,
      otpVerificationType,
      maxFreeAmountLimit: Number(maxFreeAmountLimit) || 0,
    };

    try {
      const res = await postSettings(payload);
      setSaveSuccess(res?.msg || res?.message || 'General settings saved successfully!');
      setTimeout(() => setSaveSuccess(null), 4000);
      loadData();
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to save settings. Please verify backend connection.');
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
            <SettingsIcon size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
              General Settings
            </h2>
            <p style={{ fontSize: 13, margin: 0, color: 'var(--mc-text-muted)' }}>
              Configure brand identities, metadata, contact info, social links, and storage provider.
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

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* SECTION 1: Brand Assets & Logos */}
        <div className="mc-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <ImageIcon size={18} color="var(--mc-brand-purple)" />
            Brand Assets & Logos
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="mc-label">Main Logo</label>
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
                {logo ? (
                  <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
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
                    if (file) handleFileUpload(file, 'logo');
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 2: General & Contact Information */}
        <div className="mc-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Globe size={18} color="var(--mc-brand-purple)" />
            Application & Contact Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="mc-input-group">
              <label className="mc-label">Site Name / Title *</label>
              <input
                type="text"
                required
                className="mc-input"
                placeholder="ExpenseX — Precision AI Money Tracking"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mc-input-group">
              <label className="mc-label">Contact Email *</label>
              <div className="mc-input-wrapper">
                <Mail size={16} className="mc-input-icon-left" />
                <input
                  type="email"
                  required
                  className="mc-input with-left-icon"
                  placeholder="support@expensex.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mc-input-group">
              <label className="mc-label">Phone Number *</label>
              <div className="mc-input-wrapper">
                <Phone size={16} className="mc-input-icon-left" />
                <input
                  type="tel"
                  required
                  className="mc-input with-left-icon"
                  placeholder="+1 (800) 555-0199"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="mc-input-group">
              <label className="mc-label">Physical Address *</label>
              <div className="mc-input-wrapper">
                <MapPin size={16} className="mc-input-icon-left" />
                <input
                  type="text"
                  required
                  className="mc-input with-left-icon"
                  placeholder="742 Evergreen Terrace, Suite 100"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="mc-input-group" style={{ gridColumn: '1 / -1' }}>
              <label className="mc-label">Meta Description *</label>
              <textarea
                required
                className="mc-input"
                rows={3}
                placeholder="Enter search engine and sharing description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>



        {/* SECTION 4: Storage & Financial Preferences */}
        <div className="mc-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 16px 0', color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <HardDrive size={18} color="var(--mc-brand-purple)" />
            Storage & System Preferences
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="mc-input-group">
              <label className="mc-label">File Upload Storage Provider *</label>
              <select
                className="mc-input"
                value={fileUploadPath}
                onChange={(e) => setFileUploadPath(e.target.value as 'file' | 's3')}
              >
                <option value="file">Local Filesystem Storage (/uploads)</option>
                <option value="s3">Amazon Web Services S3 Bucket</option>
              </select>
            </div>

            <div className="mc-input-group">
              <label className="mc-label">Default Currency Code</label>
              <div className="mc-input-wrapper">
                <DollarSign size={16} className="mc-input-icon-left" />
                <input
                  type="text"
                  className="mc-input with-left-icon"
                  placeholder="USD"
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <div className="mc-input-group">
              <label className="mc-label">Currency Symbol</label>
              <input
                type="text"
                className="mc-input"
                placeholder="$"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
              />
            </div>

            <div className="mc-input-group">
              <label className="mc-label">Primary 2FA / OTP Verification</label>
              <select
                className="mc-input"
                value={otpVerificationType}
                onChange={(e) => setOtpVerificationType(e.target.value as 'email' | 'phone')}
              >
                <option value="email">Email Verification Code (Recommended)</option>
                <option value="phone">SMS / Phone Verification</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="submit"
            disabled={saving}
            className="mc-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px' }}
          >
            {saving ? <RefreshCw size={16} className="mc-spin" /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
