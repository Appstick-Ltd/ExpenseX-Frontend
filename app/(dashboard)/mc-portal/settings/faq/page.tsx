'use client';
import React, { useEffect, useState } from 'react';
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getLanguages,
} from '../../../../helpers/backend';
import {
  Plus,
  Edit,
  Trash2,
  X,
  MessageSquare,
  Search,
  Globe,
  Check,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';
import { Button } from '../../../../components/common/Button';
import { showSuccessAlert, showErrorToast, showConfirmDialog } from '../../../../helpers/notification';

export interface FaqItem {
  _id: string;
  question: {
    en?: string;
    bn?: string;
    [key: string]: any;
  } | string;
  answer: {
    en?: string;
    bn?: string;
    [key: string]: any;
  } | string;
  createdAt?: string;
  updatedAt?: string;
}

const PRESET_LANGUAGES: { code: string; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
];

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  // Multilingual state for modal
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['en', 'bn']);
  const [activeModalLang, setActiveModalLang] = useState<string>('en'); // 'en' | 'bn' | 'all' | custom
  const [questions, setQuestions] = useState<Record<string, string>>({ en: '', bn: '' });
  const [answers, setAnswers] = useState<Record<string, string>>({ en: '', bn: '' });

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [tableLang, setTableLang] = useState<string>('all'); // 'all' | 'en' | 'bn'
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getLangMeta = (code: string) => {
    const found = PRESET_LANGUAGES.find((l) => l.code === code);
    if (found) return found;
    return { code, label: code.toUpperCase(), native: code.toUpperCase(), flag: '🌐' };
  };

  const getLocalizedText = (field: any, lang: string = 'en'): string => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      if (lang !== 'all' && field[lang]) return field[lang];
      return field.en || field.bn || Object.values(field)[0] || '';
    }
    return '';
  };

  const getItemLangs = (item: FaqItem): string[] => {
    const set = new Set<string>();
    if (typeof item.question === 'object' && item.question) {
      Object.keys(item.question).forEach((k) => {
        if (item.question[k]) set.add(k);
      });
    }
    if (typeof item.answer === 'object' && item.answer) {
      Object.keys(item.answer).forEach((k) => {
        if (item.answer[k]) set.add(k);
      });
    }
    if (set.size === 0) set.add('en');
    return Array.from(set);
  };

  // Fetch FAQs
  const loadData = async (search = '') => {
    setLoading(true);
    try {
      const params: Record<string, any> = {};
      if (search.trim()) {
        params.search = search.trim();
      }
      const res = await getFaqs(params);
      const list = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res)
            ? res
            : [];
      setFaqs(list);

      // Collect all languages from existing FAQs
      const detectedLangs = new Set<string>(['en', 'bn']);
      list.forEach((item: FaqItem) => {
        if (typeof item.question === 'object' && item.question) {
          Object.keys(item.question).forEach((k) => detectedLangs.add(k));
        }
        if (typeof item.answer === 'object' && item.answer) {
          Object.keys(item.answer).forEach((k) => detectedLangs.add(k));
        }
      });
      setAvailableLanguages(Array.from(detectedLangs));
    } catch (err: any) {
      console.warn('Failed to load FAQ list from /faqs:', err);
      showErrorToast(err?.message || 'Failed to load FAQ questions.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch configured languages if backend provides them
  useEffect(() => {
    const fetchSystemLanguages = async () => {
      try {
        const res = await getLanguages();
        const list = res?.data || res?.languages || (Array.isArray(res) ? res : []);
        if (Array.isArray(list) && list.length > 0) {
          const codes = list.map((l: any) => l.code).filter(Boolean);
          if (!codes.includes('en')) codes.unshift('en');
          if (!codes.includes('bn')) codes.push('bn');
          setAvailableLanguages((prev) => Array.from(new Set([...prev, ...codes])));
        }
      } catch {
        // Fallback default ['en', 'bn'] already set
      }
    };
    fetchSystemLanguages();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const openAddModal = () => {
    setEditingItem(null);
    const initialQ: Record<string, string> = {};
    const initialA: Record<string, string> = {};
    availableLanguages.forEach((l) => {
      initialQ[l] = '';
      initialA[l] = '';
    });
    setQuestions(initialQ);
    setAnswers(initialA);
    setActiveModalLang('en');
    setModalOpen(true);
  };

  const openEditModal = (item: FaqItem) => {
    setEditingItem(item);
    const qObj: Record<string, string> = {};
    const aObj: Record<string, string> = {};

    if (typeof item.question === 'object' && item.question) {
      Object.entries(item.question).forEach(([k, v]) => {
        qObj[k] = typeof v === 'string' ? v : '';
      });
    } else if (typeof item.question === 'string') {
      qObj.en = item.question;
    }

    if (typeof item.answer === 'object' && item.answer) {
      Object.entries(item.answer).forEach(([k, v]) => {
        aObj[k] = typeof v === 'string' ? v : '';
      });
    } else if (typeof item.answer === 'string') {
      aObj.en = item.answer;
    }

    if (!qObj.en) qObj.en = '';
    if (!qObj.bn) qObj.bn = '';
    if (!aObj.en) aObj.en = '';
    if (!aObj.bn) aObj.bn = '';

    const allLangs = Array.from(new Set([...availableLanguages, ...Object.keys(qObj), ...Object.keys(aObj)]));
    setAvailableLanguages(allLangs);
    setQuestions(qObj);
    setAnswers(aObj);
    setActiveModalLang('en');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const enQuestion = questions.en?.trim();
    const enAnswer = answers.en?.trim();

    // English or at least one complete translation is required
    if (!enQuestion && !Object.values(questions).some((q) => q?.trim())) {
      showErrorToast('Please provide at least one question.');
      setActiveModalLang('en');
      return;
    }

    if (!enAnswer && !Object.values(answers).some((a) => a?.trim())) {
      showErrorToast('Please provide at least one answer.');
      setActiveModalLang('en');
      return;
    }

    setSaving(true);
    const isEdit = Boolean(editingItem?._id);

    // Structure matching API spec:
    // {
    //   question: { en: "...", bn: "..." },
    //   answer: { en: "...", bn: "..." }
    // }
    const questionPayload: Record<string, string> = {};
    const answerPayload: Record<string, string> = {};

    availableLanguages.forEach((lang) => {
      const qVal = questions[lang]?.trim();
      const aVal = answers[lang]?.trim();
      if (qVal) questionPayload[lang] = qVal;
      if (aVal) answerPayload[lang] = aVal;
    });

    const data: Record<string, any> = {
      question: questionPayload,
      answer: answerPayload,
    };

    if (isEdit && editingItem?._id) {
      data._id = editingItem._id;
    }

    const payload: Record<string, any> = {
      ...data,
      body: data,
    };

    try {
      const res: any = isEdit ? await updateFaq(payload) : await createFaq(payload);

      // Check response: success false or status error
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg =
          res?.errorMessage ||
          res?.errorDetails?.issues?.[0]?.message ||
          res?.message ||
          res?.msg ||
          'Failed to save FAQ question.';
        showErrorToast(errorMsg);
        return;
      }

      // Check response: success true
      showSuccessAlert(res?.message || res?.msg || (isEdit ? 'FAQ question updated successfully!' : 'FAQ question created successfully!'));
      setModalOpen(false);
      loadData(searchQuery);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.errorMessage ||
        err?.response?.data?.errorDetails?.issues?.[0]?.message ||
        err?.data?.errorMessage ||
        err?.message ||
        'Failed to save FAQ question.';
      showErrorToast(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirmDialog({
      title: 'Delete FAQ Question?',
      text: 'Are you sure you want to delete this FAQ question?',
      confirmButtonText: 'Yes, delete',
    });
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res: any = await deleteFaq(id);
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg =
          res?.errorMessage ||
          res?.errorDetails?.issues?.[0]?.message ||
          res?.message ||
          res?.msg ||
          'Failed to delete FAQ question.';
        showErrorToast(errorMsg);
        return;
      }
      showSuccessAlert(res?.message || res?.msg || 'FAQ question deleted successfully.');
      loadData(searchQuery);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.errorMessage ||
        err?.response?.data?.errorDetails?.issues?.[0]?.message ||
        err?.data?.errorMessage ||
        err?.message ||
        'Failed to delete FAQ question.';
      showErrorToast(errorMsg);
    } finally {
      setDeletingId(null);
    }
  };

  const completedLangsCount = availableLanguages.filter(
    (l) => questions[l]?.trim() && answers[l]?.trim()
  ).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
            Frequently Asked Questions (FAQ)
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: 13, color: 'var(--mc-text-muted)' }}>
            Manage multilingual questions and answers shown to users across the ExpenseX platform.
          </p>
        </div>
      </div>

      {/* Main Card */}
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
        {/* Search, Language Filter & Actions Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: 300, maxWidth: '100%' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--mc-text-subtle)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                className="mc-input"
                style={{ width: '100%', paddingLeft: 36, height: 40 }}
                placeholder="Search FAQ questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--mc-text-subtle)',
                    padding: 2,
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Language View Filter */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                padding: '3px 4px',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--mc-text-muted)', padding: '0 6px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Globe size={13} />
                <span>View:</span>
              </span>
              <button
                type="button"
                onClick={() => setTableLang('all')}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: tableLang === 'all' ? 700 : 500,
                  background: tableLang === 'all' ? 'var(--mc-brand-purple)' : 'transparent',
                  color: tableLang === 'all' ? '#FFFFFF' : '#475569',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                All
              </button>
              {availableLanguages.map((l) => {
                const meta = getLangMeta(l);
                const isActive = tableLang === l;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setTableLang(l)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: isActive ? 700 : 500,
                      background: isActive ? 'var(--mc-brand-purple)' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {meta.flag} {l.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button variant="primary" size="md" icon={<Plus size={15} />} onClick={openAddModal}>
              Add New FAQ
            </Button>
          </div>
        </div>

        <div style={{ height: '1px', background: '#F1F5F9', margin: '0 -28px' }} />

        {/* Table / Empty State */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Shimmer height="40px" borderRadius="6px" />
            <Shimmer height="60px" borderRadius="6px" />
            <Shimmer height="60px" borderRadius="6px" />
          </div>
        ) : faqs.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--mc-text-subtle)',
              }}
            >
              <MessageSquare size={28} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--mc-text-main)', margin: '0 0 6px 0' }}>
              {searchQuery ? 'No Matching FAQs Found' : 'No FAQ Questions Yet'}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
              {searchQuery
                ? `No FAQ entries matched "${searchQuery}". Try a different keyword.`
                : 'Add common questions and helpful answers in English & Bengali to guide ExpenseX users.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', margin: '0 -28px', borderRadius: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--mc-border)' }}>
                  <th style={{ padding: '14px 28px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', width: '35%' }}>
                    Question
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', width: '38%' }}>
                    Answer Preview
                  </th>
                  <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', width: '12%' }}>
                    Languages
                  </th>
                  <th style={{ padding: '14px 28px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', textAlign: 'right', width: 140 }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((item) => {
                  const langs = getItemLangs(item);
                  const isSpecificLang = tableLang !== 'all';
                  const displayQ = getLocalizedText(item.question, isSpecificLang ? tableLang : 'en');
                  const displayA = getLocalizedText(item.answer, isSpecificLang ? tableLang : 'en');
                  const secondaryQ = !isSpecificLang && typeof item.question === 'object' && item.question?.bn ? item.question.bn : null;

                  return (
                    <tr key={item._id} style={{ borderBottom: '1px solid var(--mc-border-light)' }}>
                      {/* Question */}
                      <td style={{ padding: '16px 28px', fontWeight: 600, color: 'var(--mc-text-main)', fontSize: 14 }}>
                        <div>{displayQ || <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>No question available</span>}</div>
                        {secondaryQ && (
                          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--mc-text-muted)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
                              BN
                            </span>
                            <span>{secondaryQ}</span>
                          </div>
                        )}
                      </td>

                      {/* Answer Preview */}
                      <td style={{ padding: '16px 20px', color: 'var(--mc-text-muted)', fontSize: 13, lineHeight: '1.5' }}>
                        {displayA?.length > 130 ? `${displayA.slice(0, 130)}...` : displayA || (
                          <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>No answer provided</span>
                        )}
                      </td>

                      {/* Languages Badge List */}
                      <td style={{ padding: '16px 16px' }}>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                          {langs.map((l) => (
                            <span
                              key={l}
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                padding: '2px 6px',
                                borderRadius: 4,
                                background: l === 'en' ? '#EFF6FF' : l === 'bn' ? '#F0FDF4' : '#F1F5F9',
                                color: l === 'en' ? '#2563EB' : l === 'bn' ? '#16A34A' : '#475569',
                                border: l === 'en' ? '1px solid #BFDBFE' : l === 'bn' ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                              }}
                            >
                              {l}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 28px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <Button variant="secondary" size="sm" icon={<Edit size={13} />} onClick={() => openEditModal(item)}>
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={<Trash2 size={13} />}
                            loading={deletingId === item._id}
                            disabled={deletingId === item._id}
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Multilingual Add / Edit Modal */}
      {modalOpen && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 640 }}>
            {/* Modal Header */}
            <div className="mc-modal-header" style={{ padding: '18px 24px', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  {editingItem ? 'Edit FAQ Item' : 'Add New FAQ Item'}
                </h3>
                <p style={{ margin: '3px 0 0 0', fontSize: 12, color: 'var(--mc-text-muted)' }}>
                  Enter question and answer in each supported language
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--mc-text-subtle)',
                  padding: 4,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mc-modal-body" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Language Switcher Tabs inside Modal */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#F8FAFC',
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: '1px solid var(--mc-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Globe size={15} color="var(--mc-text-muted)" />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', marginRight: 2 }}>
                      Language:
                    </span>

                    {availableLanguages.map((lang) => {
                      const meta = getLangMeta(lang);
                      const isActive = activeModalLang === lang;
                      const hasContent = Boolean(questions[lang]?.trim() && answers[lang]?.trim());

                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setActiveModalLang(lang)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            border: isActive ? '1px solid var(--mc-brand-purple)' : '1px solid #E2E8F0',
                            background: isActive ? 'var(--mc-brand-purple)' : '#FFFFFF',
                            color: isActive ? '#FFFFFF' : 'var(--mc-text-main)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            transition: 'all 0.15s',
                          }}
                        >
                          <span>{meta.flag}</span>
                          <span>{meta.native}</span>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              opacity: isActive ? 0.9 : 0.6,
                              textTransform: 'uppercase',
                            }}
                          >
                            ({lang})
                          </span>
                          {hasContent && (
                            <Check
                              size={12}
                              strokeWidth={3}
                              style={{ color: isActive ? '#86EFAC' : '#16A34A', marginLeft: 2 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Language View */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Translation Reference for Non-English Tabs */}
                  {activeModalLang !== 'en' && (questions.en || answers.en) && (
                    <div
                      style={{
                        background: '#F0F9FF',
                        border: '1px solid #BAE6FD',
                        borderRadius: 8,
                        padding: '10px 14px',
                        fontSize: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >
                      <div style={{ fontWeight: 700, color: '#0369A1', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>🇬🇧 English Reference for Translation:</span>
                      </div>
                      {questions.en && (
                        <div style={{ color: '#0C4A6E' }}>
                          <strong>Question:</strong> {questions.en}
                        </div>
                      )}
                      {answers.en && (
                        <div style={{ color: '#334155' }}>
                          <strong>Answer:</strong> {answers.en}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Question Field */}
                  <div className="mc-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <label className="mc-label" style={{ margin: 0 }}>
                        Question ({getLangMeta(activeModalLang).native}) {activeModalLang === 'en' ? '*' : '(Optional)'}
                      </label>
                    </div>
                    <input
                      type="text"
                      className="mc-input"
                      style={{ width: '100%' }}
                      placeholder={
                        activeModalLang === 'bn'
                          ? 'যেমন: ExpenseX কি?'
                          : 'e.g. What is ExpenseX?'
                      }
                      value={questions[activeModalLang] || ''}
                      onChange={(e) =>
                        setQuestions({ ...questions, [activeModalLang]: e.target.value })
                      }
                    />
                  </div>

                  {/* Answer Field */}
                  <div className="mc-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <label className="mc-label" style={{ margin: 0 }}>
                        Answer ({getLangMeta(activeModalLang).native}) {activeModalLang === 'en' ? '*' : '(Optional)'}
                      </label>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: (answers[activeModalLang]?.length || 0) > 5000 ? 700 : 500,
                          color: (answers[activeModalLang]?.length || 0) > 5000 ? '#EF4444' : 'var(--mc-text-subtle)',
                        }}
                      >
                        {answers[activeModalLang]?.length || 0} / 5000 chars
                      </span>
                    </div>
                    <textarea
                      className="mc-input"
                      rows={5}
                      maxLength={5000}
                      style={{
                        width: '100%',
                        resize: 'vertical',
                        borderColor: (answers[activeModalLang]?.length || 0) > 5000 ? '#EF4444' : undefined,
                      }}
                      placeholder={
                        activeModalLang === 'bn'
                          ? 'যেমন: ExpenseX একটি স্মার্ট খরচ ট্র্যাকার এবং আর্থিক ব্যবস্থাপনা প্ল্যাটফর্ম।'
                          : 'e.g. ExpenseX is a smart expense tracker and financial management platform.'
                      }
                      value={answers[activeModalLang] || ''}
                      onChange={(e) =>
                        setAnswers({ ...answers, [activeModalLang]: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="mc-modal-footer"
                style={{
                  padding: '16px 24px',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: completedLangsCount > 0 ? '#22C55E' : '#CBD5E1',
                    }}
                  />
                  <span>
                    {completedLangsCount} of {availableLanguages.length} language
                    {availableLanguages.length > 1 ? 's' : ''} filled
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button variant="primary" type="submit" loading={saving}>
                    {editingItem ? 'Update Question' : 'Add Question'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
