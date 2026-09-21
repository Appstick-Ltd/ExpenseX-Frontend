'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  getSettingsPages,
  updateSettingsPage,
  SettingPageItem,
} from '../../../../helpers/backend';
import {
  FileText,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Globe,
  Eye,
  Code,
  Clock,
  Tag,
  ShieldCheck,
  Info,
  PhoneCall,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';

// Known default icons per slug
const SLUG_ICONS: Record<string, React.ElementType> = {
  about: Info,
  privacy_policy: ShieldCheck,
  'privacy-policy': ShieldCheck,
  terms_and_conditions: Scale,
  'terms-and-conditions': Scale,
  contact_us: PhoneCall,
  'contact-us': PhoneCall,
};

const DEFAULT_PAGES: Partial<SettingPageItem>[] = [
  {
    slug: 'about',
    status: true,
    content: {
      title: { en: 'About ExpenseX' },
      description: {
        en: '<p>ExpenseX is an AI-native financial intelligence platform empowering individuals and organizations with sub-second expense tracking, automated envelope budgets, and real-time cash flow telemetry.</p>',
      },
    },
  },
  {
    slug: 'privacy_policy',
    status: true,
    content: {
      title: { en: 'Privacy Policy' },
      description: {
        en: '<p>Your privacy and transactional security are foundational. ExpenseX employs zero-knowledge architecture and end-to-end telemetry encryption.</p>',
      },
    },
  },
  {
    slug: 'terms_and_conditions',
    status: true,
    content: {
      title: { en: 'Terms & Conditions' },
      description: {
        en: '<p>By accessing or utilizing ExpenseX services, you agree to bound telemetry standards, acceptable usage policies, and service subscription guidelines.</p>',
      },
    },
  },
  {
    slug: 'contact_us',
    status: true,
    content: {
      title: { en: 'Contact & Support' },
      description: {
        en: '<p>For technical inquiries, account concerns, or enterprise integrations, our core engineering and support teams are available 24/7.</p>',
      },
    },
  },
];

function formatSlugTitle(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminPageSettingsPage() {
  const [pages, setPages] = useState<SettingPageItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('about');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Active page state for editing
  const [activeId, setActiveId] = useState<string>('');
  const [activeStatus, setActiveStatus] = useState<boolean>(true);
  const [activeLanguage, setActiveLanguage] = useState<string>('en');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['en']);

  // Multilingual or string content maps
  const [titleMap, setTitleMap] = useState<Record<string, string>>({ en: '' });
  const [descriptionMap, setDescriptionMap] = useState<Record<string, string>>({ en: '' });

  // Preview Mode: 'edit' or 'preview'
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');

  // Load all pages from GET /settings/pages
  const fetchAllPages = async (targetSlugToSelect?: string) => {
    setLoading(true);
    setSaveError(null);
    try {
      const res = await getSettingsPages();
      const rawList: SettingPageItem[] = Array.isArray(res?.data) ? res.data : [];

      let mergedList = [...rawList];
      if (mergedList.length === 0) {
        // Fallback to defaults if backend collection is currently empty
        mergedList = DEFAULT_PAGES as SettingPageItem[];
      }

      setPages(mergedList);

      const targetSlug = targetSlugToSelect || selectedSlug || mergedList[0]?.slug || 'about';
      const found = mergedList.find((p) => p.slug === targetSlug) || mergedList[0];

      if (found) {
        loadPageIntoEditor(found);
      }
    } catch (err: any) {
      console.warn('Failed to load page settings:', err);
      setSaveError(err?.message || 'Failed to connect to /settings/pages API.');
      // Use defaults as fallback for seamless editing
      setPages(DEFAULT_PAGES as SettingPageItem[]);
      const fallback = (DEFAULT_PAGES as SettingPageItem[]).find((p) => p.slug === selectedSlug) || DEFAULT_PAGES[0];
      if (fallback) loadPageIntoEditor(fallback as SettingPageItem);
    } finally {
      setLoading(false);
    }
  };

  const loadPageIntoEditor = (page: SettingPageItem) => {
    setSelectedSlug(page.slug);
    setActiveId(page._id || '');
    setActiveStatus(page.status !== false);

    const rawContent = page.content || {};

    // Extract Titles
    const tMap: Record<string, string> = {};
    if (typeof rawContent.title === 'object' && rawContent.title !== null) {
      Object.entries(rawContent.title).forEach(([k, v]) => {
        tMap[k] = typeof v === 'string' ? v : String(v || '');
      });
    } else if (typeof rawContent.title === 'string') {
      tMap['en'] = rawContent.title;
    }

    // Extract Descriptions
    const dMap: Record<string, string> = {};
    if (typeof rawContent.description === 'object' && rawContent.description !== null) {
      Object.entries(rawContent.description).forEach(([k, v]) => {
        dMap[k] = typeof v === 'string' ? v : String(v || '');
      });
    } else if (typeof rawContent.description === 'string') {
      dMap['en'] = rawContent.description;
    }

    // Determine available language keys
    const langSet = new Set<string>(['en', ...Object.keys(tMap), ...Object.keys(dMap)]);
    const langArr = Array.from(langSet).filter(Boolean);
    setAvailableLanguages(langArr.length > 0 ? langArr : ['en']);

    if (!langArr.includes(activeLanguage)) {
      setActiveLanguage(langArr[0] || 'en');
    }

    setTitleMap(Object.keys(tMap).length > 0 ? tMap : { en: formatSlugTitle(page.slug) });
    setDescriptionMap(dMap);
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  const handleSelectPage = (page: SettingPageItem) => {
    setSaveSuccess(null);
    setSaveError(null);
    loadPageIntoEditor(page);
  };

  const handleTitleChange = (val: string) => {
    setTitleMap((prev) => ({
      ...prev,
      [activeLanguage]: val,
    }));
  };

  const handleDescriptionChange = (val: string) => {
    setDescriptionMap((prev) => ({
      ...prev,
      [activeLanguage]: val,
    }));
  };

  const handleAddLanguage = () => {
    const code = prompt('Enter 2-letter language code (e.g. es, de, bn, ar):');
    if (code && code.trim()) {
      const clean = code.trim().toLowerCase();
      if (!availableLanguages.includes(clean)) {
        setAvailableLanguages((prev) => [...prev, clean]);
        setActiveLanguage(clean);
      }
    }
  };

  // Submit PATCH /settings/pages matching backend updateSettingPageValidationSchema strictly
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeId) {
      setSaveError('Page _id is required to update page setting.');
      return;
    }

    setSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    // Build normalized content payload
    // If only 'en' exists and was originally a simple string or single object
    const finalContent: Record<string, any> = {
      title: titleMap,
      description: descriptionMap,
    };

    const payload = {
      _id: activeId,
      status: activeStatus,
      content: finalContent,
    };

    try {
      const res = await updateSettingsPage(payload);
      const msg = res?.message || res?.data?.message || 'Page setting updated successfully!';
      setSaveSuccess(msg);
      setTimeout(() => setSaveSuccess(null), 4000);

      // Refresh list to sync updated timestamps and status
      await fetchAllPages(selectedSlug);
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to update page settings via PATCH /settings/pages.');
    } finally {
      setSaving(false);
    }
  };

  const activePageItem = useMemo(
    () => pages.find((p) => p.slug === selectedSlug) || pages[0],
    [pages, selectedSlug]
  );

  const CurrentIcon = SLUG_ICONS[selectedSlug] || FileText;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Banner */}
      <div
        className="mc-card"
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(109,61,245,0.15), rgba(139,92,246,0.06))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mc-brand-purple)',
              boxShadow: '0 2px 8px rgba(109,61,245,0.1)',
            }}
          >
            <FileText size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                Page Settings & Telemetry CMS
              </h2>
              <span className="mc-brand-badge" style={{ fontSize: 10, padding: '2px 8px' }}>
                /settings/pages API
              </span>
            </div>
            <p style={{ fontSize: 13, margin: '4px 0 0 0', color: 'var(--mc-text-muted)' }}>
              Manage public disclosure pages, terms, and informational content via unified <code>GET/PATCH /settings/pages</code>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchAllPages(selectedSlug)}
          className="mc-btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
        >
          <RefreshCw size={14} className={loading ? 'mc-spin' : ''} />
          <span>Reload Pages</span>
        </button>
      </div>

      {/* Feedback Alerts */}
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

      {/* Main 2-Column Responsive Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '20px' }}>
        {/* Left Column: Pages List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--mc-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 4px' }}>
            Available Pages ({pages.length})
          </div>

          {loading && pages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Shimmer height="56px" borderRadius="10px" />
              <Shimmer height="56px" borderRadius="10px" />
              <Shimmer height="56px" borderRadius="10px" />
            </div>
          ) : (
            pages.map((item) => {
              const isSelected = selectedSlug === item.slug;
              const PageIcon = SLUG_ICONS[item.slug] || FileText;
              const displayTitle =
                (item.content?.title && typeof item.content.title === 'object'
                  ? (item.content.title as Record<string, string>).en
                  : typeof item.content?.title === 'string'
                  ? item.content.title
                  : null) || formatSlugTitle(item.slug);

              return (
                <button
                  key={item._id || item.slug}
                  type="button"
                  onClick={() => handleSelectPage(item)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    padding: '14px 16px',
                    borderRadius: 10,
                    border: isSelected ? '1px solid var(--mc-brand-purple)' : '1px solid var(--mc-border)',
                    background: isSelected ? 'rgba(109,61,245,0.06)' : '#FFFFFF',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(109,61,245,0.08)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: isSelected ? 'var(--mc-brand-purple)' : '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? '#FFFFFF' : '#64748B',
                        flexShrink: 0,
                      }}
                    >
                      <PageIcon size={16} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          color: isSelected ? 'var(--mc-brand-purple)' : 'var(--mc-text-main)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {displayTitle}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)', fontFamily: 'monospace' }}>
                        /{item.slug}
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator Pill */}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: '3px 7px',
                      borderRadius: 12,
                      background: item.status !== false ? '#DCFCE7' : '#F1F5F9',
                      color: item.status !== false ? '#15803D' : '#64748B',
                      flexShrink: 0,
                    }}
                  >
                    {item.status !== false ? 'Active' : 'Draft'}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Right Column: Attribute Editor & Form */}
        <div className="mc-card" style={{ padding: '24px' }}>
          {loading && pages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Shimmer height="32px" borderRadius="6px" />
              <Shimmer height="44px" borderRadius="6px" />
              <Shimmer height="240px" borderRadius="8px" />
            </div>
          ) : (
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Header with Title & Metadata */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--mc-border)',
                  paddingBottom: 16,
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(109,61,245,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--mc-brand-purple)',
                    }}
                  >
                    <CurrentIcon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                      {formatSlugTitle(selectedSlug)}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--mc-text-subtle)', marginTop: 2 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Tag size={12} />
                        <code>slug: {selectedSlug}</code>
                      </span>
                      {activeId && (
                        <span>• <code>_id: {activeId}</code></span>
                      )}
                      {activePageItem?.updatedAt && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          • <Clock size={12} /> {new Date(activePageItem.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Toggle Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>Status:</span>
                  <button
                    type="button"
                    onClick={() => setActiveStatus(!activeStatus)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: activeStatus ? '1px solid #86EFAC' : '1px solid #CBD5E1',
                      background: activeStatus ? '#F0FDF4' : '#F8FAFC',
                      color: activeStatus ? '#15803D' : '#64748B',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: activeStatus ? '#22C55E' : '#94A3B8',
                      }}
                    />
                    <span>{activeStatus ? 'Active / Published' : 'Draft / Hidden'}</span>
                  </button>
                </div>
              </div>

              {/* Language Switcher Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F8FAFC',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--mc-border)',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <Globe size={15} color="var(--mc-text-muted)" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', marginRight: 4 }}>
                    Language:
                  </span>
                  {availableLanguages.map((lang) => {
                    const isActive = activeLanguage === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setActiveLanguage(lang)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          border: isActive ? '1px solid var(--mc-brand-purple)' : '1px solid #E2E8F0',
                          background: isActive ? 'var(--mc-brand-purple)' : '#FFFFFF',
                          color: isActive ? '#FFFFFF' : '#475569',
                          transition: 'all 0.15s',
                        }}
                      >
                        {lang}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--mc-brand-purple)',
                      background: 'none',
                      border: '1px dashed var(--mc-brand-purple)',
                      cursor: 'pointer',
                    }}
                  >
                    + Add Lang
                  </button>
                </div>

                {/* View Mode Toggle: Edit vs Live Preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('edit')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      border: viewMode === 'edit' ? '1px solid var(--mc-brand-purple)' : '1px solid transparent',
                      background: viewMode === 'edit' ? 'rgba(109,61,245,0.1)' : 'transparent',
                      color: viewMode === 'edit' ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                    }}
                  >
                    <Code size={13} />
                    <span>Editor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('preview')}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      border: viewMode === 'preview' ? '1px solid var(--mc-brand-purple)' : '1px solid transparent',
                      background: viewMode === 'preview' ? 'rgba(109,61,245,0.1)' : 'transparent',
                      color: viewMode === 'preview' ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                    }}
                  >
                    <Eye size={13} />
                    <span>Preview</span>
                  </button>
                </div>
              </div>

              {/* EDITOR VIEW */}
              {viewMode === 'edit' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Title Attribute Field */}
                  <div className="mc-input-group">
                    <label className="mc-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Page Title ({activeLanguage.toUpperCase()}) *</span>
                      <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>attribute: <code>content.title.{activeLanguage}</code></span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mc-input"
                      placeholder={`e.g. ${formatSlugTitle(selectedSlug)}`}
                      value={titleMap[activeLanguage] || ''}
                      onChange={(e) => handleTitleChange(e.target.value)}
                    />
                  </div>

                  {/* Description Attribute Field */}
                  <div className="mc-input-group">
                    <label className="mc-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Page Description / HTML Content ({activeLanguage.toUpperCase()}) *</span>
                      <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>attribute: <code>content.description.{activeLanguage}</code></span>
                    </label>
                    <textarea
                      required
                      className="mc-input"
                      rows={14}
                      style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, lineHeight: 1.6 }}
                      placeholder="<p>Enter page HTML body or markdown disclosures...</p>"
                      value={descriptionMap[activeLanguage] || ''}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                /* LIVE PREVIEW VIEW */
                <div
                  style={{
                    padding: '24px',
                    borderRadius: 8,
                    background: '#FAFAFA',
                    border: '1px solid var(--mc-border)',
                    minHeight: 320,
                  }}
                >
                  <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 16px 0', color: 'var(--mc-text-main)' }}>
                    {titleMap[activeLanguage] || formatSlugTitle(selectedSlug)}
                  </h1>
                  <div
                    style={{ fontSize: 14, color: 'var(--mc-text-main)', lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{
                      __html:
                        descriptionMap[activeLanguage] ||
                        '<p style="color: #94A3B8; font-style: italic;">No content provided for this language yet.</p>',
                    }}
                  />
                </div>
              )}

              {/* Action Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--mc-border)',
                  paddingTop: 16,
                  marginTop: 8,
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--mc-text-subtle)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sparkles size={14} color="var(--mc-brand-purple)" />
                  <span>Payload matches backend <code>updateSettingPageValidationSchema</code> strictly</span>
                </div>

                <button
                  type="submit"
                  disabled={saving || !activeId}
                  className="mc-btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px' }}
                >
                  {saving ? <RefreshCw size={16} className="mc-spin" /> : <Save size={16} />}
                  <span>{saving ? 'Saving via PATCH /settings/pages...' : 'Save Page Setting'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
