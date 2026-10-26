'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  getLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from '../../../../helpers/backend';
import {
  Globe,
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  CheckCircle2,
  X,
  RefreshCw,
  Star,
  ArrowRightLeft,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';
import {
  showSuccessAlert,
  showErrorToast,
  showConfirmDialog,
} from '../../../../helpers/notification';
import { triggerHaptic } from '../../../../helpers/haptics';

export interface LanguageItem {
  _id: string;
  name: string;
  code: string;
  flag?: string;
  rtl?: boolean;
  active?: boolean;
  status?: boolean;
  isActive?: boolean;
  isDefault?: boolean;
  default?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

const getIsActive = (item: LanguageItem): boolean => {
  if (item.active !== undefined) return Boolean(item.active);
  if (item.status !== undefined) return Boolean(item.status);
  if (item.isActive !== undefined) return Boolean(item.isActive);
  return true;
};

interface LanguageCodeOption {
  code: string;
  label: string;
  name: string;
  flag: string;
  rtl: boolean;
}

const LANGUAGE_CODE_OPTIONS: LanguageCodeOption[] = [
  { code: 'en', label: 'en — English', name: 'English', flag: '🇬🇧', rtl: false },
  { code: 'bn', label: 'bn — Bengali (বাংলা)', name: 'Bengali', flag: '🇧🇩', rtl: false },
  { code: 'ar', label: 'ar — Arabic (العربية)', name: 'Arabic', flag: '🇸🇦', rtl: true },
  { code: 'es', label: 'es — Spanish (Español)', name: 'Spanish', flag: '🇪🇸', rtl: false },
  { code: 'fr', label: 'fr — French (Français)', name: 'French', flag: '🇫🇷', rtl: false },
  { code: 'de', label: 'de — German (Deutsch)', name: 'German', flag: '🇩🇪', rtl: false },
  { code: 'it', label: 'it — Italian (Italiano)', name: 'Italian', flag: '🇮🇹', rtl: false },
  { code: 'pt', label: 'pt — Portuguese (Português)', name: 'Portuguese', flag: '🇵🇹', rtl: false },
  { code: 'ru', label: 'ru — Russian (Русский)', name: 'Russian', flag: '🇷🇺', rtl: false },
  { code: 'zh', label: 'zh — Chinese (中文)', name: 'Chinese', flag: '🇨🇳', rtl: false },
  { code: 'ja', label: 'ja — Japanese (日本語)', name: 'Japanese', flag: '🇯🇵', rtl: false },
  { code: 'ko', label: 'ko — Korean (한국어)', name: 'Korean', flag: '🇰🇷', rtl: false },
  { code: 'hi', label: 'hi — Hindi (हिन्दी)', name: 'Hindi', flag: '🇮🇳', rtl: false },
  { code: 'ur', label: 'ur — Urdu (اردو)', name: 'Urdu', flag: '🇵🇰', rtl: true },
  { code: 'tr', label: 'tr — Turkish (Türkçe)', name: 'Turkish', flag: '🇹🇷', rtl: false },
  { code: 'nl', label: 'nl — Dutch (Nederlands)', name: 'Dutch', flag: '🇳🇱', rtl: false },
  { code: 'id', label: 'id — Indonesian (Bahasa)', name: 'Indonesian', flag: '🇮🇩', rtl: false },
  { code: 'ms', label: 'ms — Malay (Bahasa Melayu)', name: 'Malay', flag: '🇲🇾', rtl: false },
  { code: 'th', label: 'th — Thai (ไทย)', name: 'Thai', flag: '🇹🇭', rtl: false },
  { code: 'vi', label: 'vi — Vietnamese (Tiếng Việt)', name: 'Vietnamese', flag: '🇻🇳', rtl: false },
  { code: 'fa', label: 'fa — Persian (فارسی)', name: 'Persian', flag: '🇮🇷', rtl: true },
  { code: 'he', label: 'he — Hebrew (עברית)', name: 'Hebrew', flag: '🇮🇱', rtl: true },
  { code: 'pl', label: 'pl — Polish (Polski)', name: 'Polish', flag: '🇵🇱', rtl: false },
  { code: 'uk', label: 'uk — Ukrainian (Українська)', name: 'Ukrainian', flag: '🇺🇦', rtl: false },
  { code: 'sv', label: 'sv — Swedish (Svenska)', name: 'Swedish', flag: '🇸🇪', rtl: false },
  { code: 'no', label: 'no — Norwegian (Norsk)', name: 'Norwegian', flag: '🇳🇴', rtl: false },
  { code: 'da', label: 'da — Danish (Dansk)', name: 'Danish', flag: '🇩🇰', rtl: false },
  { code: 'fi', label: 'fi — Finnish (Suomi)', name: 'Finnish', flag: '🇫🇮', rtl: false },
  { code: 'el', label: 'el — Greek (Ελληνικά)', name: 'Greek', flag: '🇬🇷', rtl: false },
  { code: 'cs', label: 'cs — Czech (Čeština)', name: 'Czech', flag: '🇨🇿', rtl: false },
  { code: 'ro', label: 'ro — Romanian (Română)', name: 'Romanian', flag: '🇷🇴', rtl: false },
  { code: 'hu', label: 'hu — Hungarian (Magyar)', name: 'Hungarian', flag: '🇭🇺', rtl: false },
  { code: 'fil', label: 'fil — Filipino (Tagalog)', name: 'Filipino', flag: '🇵🇭', rtl: false },
];

const FLAG_OPTIONS: { flag: string; label: string }[] = [
  { flag: '🇬🇧', label: '🇬🇧 United Kingdom' },
  { flag: '🇺🇸', label: '🇺🇸 United States' },
  { flag: '🇧🇩', label: '🇧🇩 Bangladesh' },
  { flag: '🇸🇦', label: '🇸🇦 Saudi Arabia' },
  { flag: '🇦🇪', label: '🇦🇪 United Arab Emirates' },
  { flag: '🇪🇸', label: '🇪🇸 Spain' },
  { flag: '🇫🇷', label: '🇫🇷 France' },
  { flag: '🇩🇪', label: '🇩🇪 Germany' },
  { flag: '🇮🇹', label: '🇮🇹 Italy' },
  { flag: '🇮🇳', label: '🇮🇳 India' },
  { flag: '🇵🇰', label: '🇵🇰 Pakistan' },
  { flag: '🇨🇳', label: '🇨🇳 China' },
  { flag: '🇯🇵', label: '🇯🇵 Japan' },
  { flag: '🇰🇷', label: '🇰🇷 South Korea' },
  { flag: '🇵🇹', label: '🇵🇹 Portugal' },
  { flag: '🇧🇷', label: '🇧🇷 Brazil' },
  { flag: '🇷🇺', label: '🇷🇺 Russia' },
  { flag: '🇹🇷', label: '🇹🇷 Turkey' },
  { flag: '🇳🇱', label: '🇳🇱 Netherlands' },
  { flag: '🇮🇩', label: '🇮🇩 Indonesia' },
  { flag: '🇲🇾', label: '🇲🇾 Malaysia' },
  { flag: '🇻🇳', label: '🇻🇳 Vietnam' },
  { flag: '🇹🇭', label: '🇹🇭 Thailand' },
  { flag: '🇵🇭', label: '🇵🇭 Philippines' },
  { flag: '🇪🇬', label: '🇪🇬 Egypt' },
  { flag: '🇿🇦', label: '🇿🇦 South Africa' },
  { flag: '🇨🇦', label: '🇨🇦 Canada' },
  { flag: '🇦🇺', label: '🇦🇺 Australia' },
  { flag: '🇨🇭', label: '🇨🇭 Switzerland' },
  { flag: '🇸🇪', label: '🇸🇪 Sweden' },
  { flag: '🇳🇴', label: '🇳🇴 Norway' },
  { flag: '🇩🇰', label: '🇩🇰 Denmark' },
  { flag: '🇫🇮', label: '🇫🇮 Finland' },
  { flag: '🇵🇱', label: '🇵🇱 Poland' },
  { flag: '🇺🇦', label: '🇺🇦 Ukraine' },
  { flag: '🇬🇷', label: '🇬🇷 Greece' },
  { flag: '🇲🇽', label: '🇲🇽 Mexico' },
  { flag: '🇦🇷', label: '🇦🇷 Argentina' },
  { flag: '🇳🇬', label: '🇳🇬 Nigeria' },
  { flag: '🇰🇪', label: '🇰🇪 Kenya' },
  { flag: '🌐', label: '🌐 Global / International' },
];

export default function AdminLanguageSettingsPage() {
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterRtl, setFilterRtl] = useState<'all' | 'ltr' | 'rtl'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LanguageItem | null>(null);
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formFlag, setFormFlag] = useState('');
  const [formRtl, setFormRtl] = useState(false);
  const [formStatus, setFormStatus] = useState(true);
  const [saving, setSaving] = useState(false);

  // Row Action State
  const [actionId, setActionId] = useState<string | null>(null);

  // Fetch languages from backend
  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getLanguages();
      const list = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data?.languages)
            ? res.data.languages
            : Array.isArray(res?.languages)
              ? res.languages
              : Array.isArray(res)
                ? res
                : [];
      setLanguages(list);
    } catch (err: any) {
      console.error('Failed to load languages:', err);
      showErrorToast(err?.message || 'Failed to load languages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Open modal for new language
  const handleOpenAdd = () => {
    triggerHaptic('selection');
    setEditingItem(null);
    setFormName('');
    setFormCode('');
    setFormFlag('🌐');
    setFormRtl(false);
    setFormStatus(true);
    setModalOpen(true);
  };

  // Open modal for edit language
  const handleOpenEdit = (item: LanguageItem) => {
    triggerHaptic('selection');
    setEditingItem(item);
    setFormName(item.name || item.title || '');
    setFormCode(item.code || '');
    setFormFlag(item.flag || '🌐');
    setFormRtl(Boolean(item.rtl));
    setFormStatus(getIsActive(item));
    setModalOpen(true);
  };

  // Select language code handler
  const handleSelectLanguageCode = (code: string) => {
    setFormCode(code);
    const matched = LANGUAGE_CODE_OPTIONS.find((c) => c.code === code);
    if (matched) {
      if (!formName || LANGUAGE_CODE_OPTIONS.some((c) => c.name === formName)) {
        setFormName(matched.name);
      }
      if (!formFlag || formFlag === '🌐' || LANGUAGE_CODE_OPTIONS.some((c) => c.flag === formFlag)) {
        setFormFlag(matched.flag);
      }
      setFormRtl(matched.rtl);
    }
  };

  // Submit add / edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showErrorToast('Language name is required.');
      return;
    }
    if (!formCode.trim()) {
      showErrorToast('Language code is required.');
      return;
    }

    setSaving(true);
    try {
      let res: any;
      if (editingItem) {
        // Backend updateSettingLanguageValidationSchema requires _id and accepts name, code, rtl, flag, active, default
        const payload: Record<string, any> = {
          _id: editingItem._id,
          name: formName.trim(),
          code: formCode.trim().toLowerCase(),
          flag: formFlag.trim() || '🌐',
          rtl: Boolean(formRtl),
          active: Boolean(formStatus),
        };
        res = await updateLanguage(editingItem._id, payload);
      } else {
        // Backend postSettingLanguageValidationSchema strictly accepts ONLY name, code, rtl, flag
        const payload = {
          name: formName.trim(),
          code: formCode.trim().toLowerCase(),
          flag: formFlag.trim() || '🌐',
          rtl: Boolean(formRtl),
        };
        res = await createLanguage(payload);
      }

      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg =
          res?.errorMessage ||
          res?.errorDetails?.issues?.[0]?.message ||
          res?.message ||
          res?.msg ||
          'Failed to save language.';
        showErrorToast(errorMsg);
        return;
      }

      showSuccessAlert(
        res?.message ||
          res?.msg ||
          (editingItem ? 'Language updated successfully!' : 'Language created successfully!')
      );
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.errorMessage ||
        err?.response?.data?.errorDetails?.issues?.[0]?.message ||
        err?.data?.errorMessage ||
        err?.message ||
        'Failed to save language.';
      showErrorToast(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  // Delete language
  const handleDelete = async (item: LanguageItem) => {
    triggerHaptic('medium');
    const confirmed = await showConfirmDialog({
      title: `Delete ${item.name || item.code}?`,
      text: `Are you sure you want to delete "${item.name || item.code}"? This will remove the language from active system locales.`,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#EF4444',
    });
    if (!confirmed) return;

    setActionId(item._id);
    try {
      const res: any = await deleteLanguage(item._id);
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg =
          res?.errorMessage ||
          res?.errorDetails?.issues?.[0]?.message ||
          res?.message ||
          res?.msg ||
          'Failed to delete language.';
        showErrorToast(errorMsg);
        return;
      }
      showSuccessAlert(res?.message || res?.msg || 'Language deleted successfully.');
      loadData();
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.errorMessage ||
        err?.response?.data?.errorDetails?.issues?.[0]?.message ||
        err?.data?.errorMessage ||
        err?.message ||
        'Failed to delete language.';
      showErrorToast(errorMsg);
    } finally {
      setActionId(null);
    }
  };

  // Toggle active/inactive
  const handleToggleStatus = async (item: LanguageItem) => {
    triggerHaptic('selection');
    const currentActive = getIsActive(item);
    const nextStatus = !currentActive;

    setActionId(item._id);
    try {
      const payload = {
        _id: item._id,
        active: nextStatus,
      };
      const res: any = await updateLanguage(item._id, payload);
      if (res?.success === false || res?.statusCode >= 400) {
        showErrorToast(res?.message || res?.errorMessage || 'Failed to update status.');
        return;
      }
      // Optimistic update
      setLanguages((prev) =>
        prev.map((l) => (l._id === item._id ? { ...l, active: nextStatus, status: nextStatus, isActive: nextStatus } : l))
      );
      showSuccessAlert(`Language "${item.name}" marked as ${nextStatus ? 'Active' : 'Inactive'}.`);
      loadData();
    } catch (err: any) {
      showErrorToast(err?.message || 'Failed to update status.');
    } finally {
      setActionId(null);
    }
  };

  // Toggle default language ON / OFF
  const handleToggleDefault = async (item: LanguageItem) => {
    triggerHaptic('selection');
    const isCurrentlyDefault = Boolean(item.default || item.isDefault);
    if (isCurrentlyDefault) {
      showErrorToast(`"${item.name || item.code}" is already the default language. To change it, set another language as default.`);
      return;
    }

    const nextDefault = true;

    setActionId(item._id);
    try {
      const payload: Record<string, any> = {
        _id: item._id,
        default: true,
        active: true,
      };
      const res: any = await updateLanguage(item._id, payload);
      if (res?.success === false || res?.statusCode >= 400) {
        showErrorToast(res?.message || res?.errorMessage || 'Failed to update default language.');
        return;
      }
      // Optimistic update
      setLanguages((prev) =>
        prev.map((l) => {
          if (l._id === item._id) {
            return {
              ...l,
              isDefault: nextDefault,
              default: nextDefault,
              ...(nextDefault ? { active: true, status: true, isActive: true } : {}),
            };
          }
          if (nextDefault) {
            return {
              ...l,
              isDefault: false,
              default: false,
            };
          }
          return l;
        })
      );
      showSuccessAlert(
        nextDefault
          ? `"${item.name || item.code}" is now set as the default system language.`
          : `"${item.name || item.code}" is no longer the default language.`
      );
      loadData();
    } catch (err: any) {
      showErrorToast(err?.message || 'Failed to update default language.');
    } finally {
      setActionId(null);
    }
  };

  // Filtered languages
  const filteredLanguages = useMemo(() => {
    return languages.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const nameMatch = (item.name || '').toLowerCase().includes(q);
        const codeMatch = (item.code || '').toLowerCase().includes(q);
        const flagMatch = (item.flag || '').toLowerCase().includes(q);
        if (!nameMatch && !codeMatch && !flagMatch) return false;
      }

      // Status
      const isActive = getIsActive(item);
      if (filterStatus === 'active' && !isActive) return false;
      if (filterStatus === 'inactive' && isActive) return false;

      // RTL
      const isRtl = Boolean(item.rtl);
      if (filterRtl === 'rtl' && !isRtl) return false;
      if (filterRtl === 'ltr' && isRtl) return false;

      return true;
    });
  }, [languages, searchQuery, filterStatus, filterRtl]);

  // Metric stats
  const activeCount = languages.filter((l) => getIsActive(l)).length;
  const defaultLang = languages.find((l) => l.isDefault || l.default);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(109, 61, 245, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mc-brand-purple)',
              }}
            >
              <Globe size={20} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
              Language Settings
            </h2>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: 13, color: 'var(--mc-text-muted)' }}>
            Manage supported languages, text directions (LTR/RTL), default locale, and translation toggles.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenAdd}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 18px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--mc-brand-purple)',
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(109, 61, 245, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <Plus size={16} />
            <span>Add Language</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {/* Active Languages */}
        <div
          className="mc-card"
          style={{
            padding: '18px 20px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Active Languages
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#16A34A', marginTop: 4 }}>
              {loading ? <Shimmer width={40} height={26} /> : activeCount}
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#F0FDF4',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* Default Language */}
        <div
          className="mc-card"
          style={{
            padding: '18px 20px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Default Locale
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--mc-text-main)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              {loading ? (
                <Shimmer width={80} height={22} />
              ) : defaultLang ? (
                <>
                  <span>{defaultLang.flag || '🌐'}</span>
                  <span>{defaultLang.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>({defaultLang.code})</span>
                </>
              ) : (
                <span style={{ fontSize: 14, color: 'var(--mc-text-muted)' }}>Not configured</span>
              )}
            </div>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Star size={22} />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div
        className="mc-card"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Table Toolbar */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            background: '#FAFAFC',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', width: 280, maxWidth: '100%' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--mc-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search by name, code, flag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: 8,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                fontSize: 13,
                color: 'var(--mc-text-main)',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--mc-text-muted)',
                  padding: 2,
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                fontSize: 13,
                color: 'var(--mc-text-main)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            {/* RTL Filter */}
            <select
              value={filterRtl}
              onChange={(e) => setFilterRtl(e.target.value as any)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                fontSize: 13,
                color: 'var(--mc-text-main)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">All Directions</option>
              <option value="ltr">LTR (Left-to-Right)</option>
              <option value="rtl">RTL (Right-to-Left)</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          {loading ? (
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: '#F8FAFC',
                    borderRadius: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Shimmer width={32} height={32} borderRadius={8} />
                    <div>
                      <Shimmer width={120} height={16} />
                      <Shimmer width={60} height={12} style={{ marginTop: 6 }} />
                    </div>
                  </div>
                  <Shimmer width={80} height={24} borderRadius={12} />
                  <Shimmer width={60} height={24} borderRadius={12} />
                  <Shimmer width={70} height={28} borderRadius={6} />
                </div>
              ))}
            </div>
          ) : filteredLanguages.length === 0 ? (
            <div
              style={{
                padding: '60px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  background: 'rgba(109, 61, 245, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--mc-brand-purple)',
                }}
              >
                <Globe size={28} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>
                {searchQuery || filterStatus !== 'all' || filterRtl !== 'all'
                  ? 'No matching languages found'
                  : 'No languages configured yet'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0, maxWidth: 400 }}>
                {searchQuery || filterStatus !== 'all' || filterRtl !== 'all'
                  ? 'Try modifying your search or filter criteria to find the language.'
                  : 'Add your first language to enable multilingual support across ExpenseX application.'}
              </p>
              <button
                type="button"
                onClick={handleOpenAdd}
                style={{
                  marginTop: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--mc-brand-purple)',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} />
                <span>Add Language</span>
              </button>
            </div>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                fontSize: 13,
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#F8FAFC',
                    borderBottom: '1px solid #E2E8F0',
                    color: 'var(--mc-text-muted)',
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  <th style={{ padding: '14px 20px' }}>Language</th>
                  <th style={{ padding: '14px 16px' }}>Code</th>
                  <th style={{ padding: '14px 16px' }}>Direction</th>
                  <th style={{ padding: '14px 16px' }}>Default</th>
                  <th style={{ padding: '14px 16px' }}>Status</th>
                  <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLanguages.map((item) => {
                  const isActive = getIsActive(item);
                  const isDefault = Boolean(item.isDefault || item.default);
                  const isRtl = Boolean(item.rtl);
                  const isBusy = actionId === item._id;

                  return (
                    <tr
                      key={item._id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FBFBFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {/* Name & Flag */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span
                            style={{
                              fontSize: 22,
                              lineHeight: 1,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: 6,
                              background: '#F1F5F9',
                            }}
                          >
                            {item.flag || '🌐'}
                          </span>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>
                              {item.name || item.title || 'Language'}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--mc-text-muted)', marginTop: 2 }}>
                              ID: {item._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Code */}
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: '#F1F5F9',
                            color: '#334155',
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.code}
                        </span>
                      </td>

                      {/* Direction (LTR / RTL) */}
                      <td style={{ padding: '14px 16px' }}>
                        {isRtl ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '3px 8px',
                              borderRadius: 6,
                              background: 'rgba(109, 61, 245, 0.08)',
                              color: 'var(--mc-brand-purple)',
                              fontWeight: 600,
                              fontSize: 11.5,
                            }}
                          >
                            <ArrowRightLeft size={12} />
                            <span>RTL</span>
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '3px 8px',
                              borderRadius: 6,
                              background: '#F1F5F9',
                              color: 'var(--mc-text-muted)',
                              fontWeight: 600,
                              fontSize: 11.5,
                            }}
                          >
                            <span>LTR</span>
                          </span>
                        )}
                      </td>

                      {/* Default Switch Button */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isDefault}
                            onClick={() => handleToggleDefault(item)}
                            disabled={isBusy}
                            title={isDefault ? 'Default language (Active)' : 'Click to set as default'}
                            style={{
                              position: 'relative',
                              width: 44,
                              height: 24,
                              borderRadius: 12,
                              border: 'none',
                              background: isDefault ? 'var(--mc-brand-purple)' : '#CBD5E1',
                              cursor: isBusy ? 'not-allowed' : 'pointer',
                              transition: 'background 0.2s ease',
                              padding: 2,
                              display: 'inline-flex',
                              alignItems: 'center',
                              boxShadow: isDefault ? '0 2px 6px rgba(109, 61, 245, 0.3)' : 'none',
                              opacity: isBusy ? 0.6 : 1,
                            }}
                          >
                            <span
                              style={{
                                display: 'block',
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                background: '#FFFFFF',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                                transform: isDefault ? 'translateX(20px)' : 'translateX(0)',
                                transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}
                            />
                          </button>
                          {isDefault && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 3,
                                fontSize: 11.5,
                                fontWeight: 700,
                                color: 'var(--mc-brand-purple)',
                              }}
                            >
                              <Star size={11} fill="currentColor" />
                              <span>Default</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td style={{ padding: '14px 16px' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item)}
                          disabled={isBusy || isDefault}
                          title={isDefault ? 'Default language cannot be disabled' : 'Click to toggle status'}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 10px',
                            borderRadius: 12,
                            border: 'none',
                            background: isActive ? '#DCFCE7' : '#F1F5F9',
                            color: isActive ? '#15803D' : '#64748B',
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: isDefault ? 'not-allowed' : 'pointer',
                            opacity: isBusy ? 0.6 : 1,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              background: isActive ? '#16A34A' : '#94A3B8',
                            }}
                          />
                          <span>{isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            title="Edit language"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: 6,
                              border: '1px solid var(--mc-border)',
                              background: '#FFFFFF',
                              color: 'var(--mc-text-main)',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--mc-brand-purple)';
                              e.currentTarget.style.color = 'var(--mc-brand-purple)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--mc-border)';
                              e.currentTarget.style.color = 'var(--mc-text-main)';
                            }}
                          >
                            <Edit size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            disabled={isBusy || isDefault}
                            title={isDefault ? 'Default language cannot be deleted' : 'Delete language'}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: 6,
                              border: '1px solid var(--mc-border)',
                              background: '#FFFFFF',
                              color: isDefault ? '#CBD5E1' : '#EF4444',
                              cursor: isDefault ? 'not-allowed' : 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              if (!isDefault) {
                                e.currentTarget.style.borderColor = '#EF4444';
                                e.currentTarget.style.background = '#FEF2F2';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isDefault) {
                                e.currentTarget.style.borderColor = 'var(--mc-border)';
                                e.currentTarget.style.background = '#FFFFFF';
                              }
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* =========================================================================
          ADD / EDIT MODAL
          ========================================================================= */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            zIndex: 1050,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => !saving && setModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              width: '100%',
              maxWidth: 540,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#FAFAFC',
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
                  <Globe size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                    {editingItem ? 'Edit Language Setting' : 'Add New Language Setting'}
                  </h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    {editingItem
                      ? 'Update locale details, direction, and default status'
                      : 'Configure locale code, direction, and flag symbol'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={saving}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--mc-text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Name & Code Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="mc-label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                      Language Name <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. English, Bengali"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--mc-border)',
                        fontSize: 13,
                        color: 'var(--mc-text-main)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label className="mc-label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                      Language Code <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <select
                      value={formCode}
                      onChange={(e) => handleSelectLanguageCode(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--mc-border)',
                        fontSize: 13,
                        color: 'var(--mc-text-main)',
                        background: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">Select language code...</option>
                      {!LANGUAGE_CODE_OPTIONS.some((o) => o.code === formCode) && formCode && (
                        <option value={formCode}>{formCode} (Current)</option>
                      )}
                      {LANGUAGE_CODE_OPTIONS.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Flag Symbol & Text Direction */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="mc-label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                      Flag
                    </label>
                    <select
                      value={formFlag}
                      onChange={(e) => setFormFlag(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--mc-border)',
                        fontSize: 13,
                        color: 'var(--mc-text-main)',
                        background: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">Select a flag...</option>
                      {!FLAG_OPTIONS.some((o) => o.flag === formFlag) && formFlag && (
                        <option value={formFlag}>{formFlag} (Selected)</option>
                      )}
                      {FLAG_OPTIONS.map((opt) => (
                        <option key={opt.flag + opt.label} value={opt.flag}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mc-label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                      Text Direction
                    </label>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <button
                        type="button"
                        onClick={() => setFormRtl(false)}
                        style={{
                          flex: 1,
                          padding: '8px 10px',
                          borderRadius: 6,
                          border: !formRtl ? '1.5px solid var(--mc-brand-purple)' : '1px solid var(--mc-border)',
                          background: !formRtl ? 'rgba(109, 61, 245, 0.08)' : '#FFFFFF',
                          color: !formRtl ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        LTR (Left-to-Right)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormRtl(true)}
                        style={{
                          flex: 1,
                          padding: '8px 10px',
                          borderRadius: 6,
                          border: formRtl ? '1.5px solid var(--mc-brand-purple)' : '1px solid var(--mc-border)',
                          background: formRtl ? 'rgba(109, 61, 245, 0.08)' : '#FFFFFF',
                          color: formRtl ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        RTL (Right-to-Left)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Toggles: Active & Default */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    padding: '14px',
                    borderRadius: 10,
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                  }}
                >
                  {/* Status Toggle */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                        Active Status
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--mc-text-muted)' }}>
                        Enable or disable this language for users
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={formStatus}
                      onChange={(e) => setFormStatus(e.target.checked)}
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: 'var(--mc-brand-purple)',
                        cursor: 'pointer',
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  padding: '16px 24px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 10,
                  background: '#FAFAFC',
                }}
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid var(--mc-border)',
                    background: '#FFFFFF',
                    color: 'var(--mc-text-main)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: saving ? 'not-allowed' : 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 20px',
                    borderRadius: 8,
                    border: 'none',
                    background: 'var(--mc-brand-purple)',
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 6px rgba(109, 61, 245, 0.25)',
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving ? (
                    <>
                      <RefreshCw size={14} className="mc-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{editingItem ? 'Update Language' : 'Create Language'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
