'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchFaq,
  postFaq,
  delFaq,
} from '../../../../helpers/backend';
import {
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';

export interface FaqItem {
  _id: string;
  question: {
    en?: string;
    [key: string]: any;
  } | string;
  answer: {
    en?: string;
    [key: string]: any;
  } | string;
  createdAt?: string;
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatText = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val.en || Object.values(val)[0] || '';
  };

  const loadData = async () => {
    setLoading(true);
    setSaveError(null);
    try {
      const res = await fetchFaq();
      const list = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res)
        ? res
        : [];
      setFaqs(list);
    } catch (err: any) {
      console.warn('Failed to load FAQ list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setQuestion('');
    setAnswer('');
    setSaveError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: FaqItem) => {
    setEditingItem(item);
    setQuestion(formatText(item.question));
    setAnswer(formatText(item.answer));
    setSaveError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const payload: Record<string, any> = {
      _id: editingItem?._id || undefined,
      question: { en: question.trim() },
      answer: { en: answer.trim() },
    };

    try {
      const res = await postFaq(payload);
      setSaveSuccess(res?.msg || res?.message || 'FAQ entry saved successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to save FAQ.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ question?')) return;
    setDeletingId(id);
    try {
      await delFaq({ _id: id });
      setSaveSuccess('FAQ question removed successfully.');
      setTimeout(() => setSaveSuccess(null), 3000);
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Failed to delete FAQ question.');
    } finally {
      setDeletingId(null);
    }
  };

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
            <HelpCircle size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
              Frequently Asked Questions (FAQ)
            </h2>
            <p style={{ fontSize: 13, margin: 0, color: 'var(--mc-text-muted)' }}>
              Manage consumer frequently asked questions displayed on the landing page and help center.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            onClick={loadData}
            className="mc-btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <RefreshCw size={14} />
            <span>Reload</span>
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="mc-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <Plus size={16} />
            <span>Add New FAQ</span>
          </button>
        </div>
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

      {/* Table */}
      <div className="mc-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 24 }}>
            <Shimmer height="40px" borderRadius="6px" />
            <div style={{ marginTop: 12 }}>
              <Shimmer height="60px" borderRadius="6px" />
            </div>
            <div style={{ marginTop: 12 }}>
              <Shimmer height="60px" borderRadius="6px" />
            </div>
          </div>
        ) : faqs.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
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
              No FAQ Questions Yet
            </h3>
            <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: '0 0 16px 0' }}>
              Add common questions and helpful answers to guide prospective ExpenseX users.
            </p>
            <button type="button" onClick={openAddModal} className="mc-btn-primary" style={{ fontSize: 13 }}>
              Add First FAQ
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--mc-border)' }}>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', width: '35%' }}>
                    Question
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    Answer Preview
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', textAlign: 'right', width: 140 }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((item) => (
                  <tr key={item._id} style={{ borderBottom: '1px solid var(--mc-border-light)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--mc-text-main)', fontSize: 14 }}>
                      {formatText(item.question)}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
                      {formatText(item.answer)?.length > 100
                        ? `${formatText(item.answer).slice(0, 100)}...`
                        : formatText(item.answer)}
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="mc-btn-secondary"
                          style={{ padding: '6px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <Edit size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === item._id}
                          onClick={() => handleDelete(item._id)}
                          style={{
                            padding: '6px 10px',
                            fontSize: 12,
                            borderRadius: 6,
                            border: '1px solid #FECACA',
                            background: '#FEF2F2',
                            color: '#DC2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="mc-modal-overlay">
          <div className="mc-modal" style={{ maxWidth: 540 }}>
            <div className="mc-modal-header">
              <h3>{editingItem ? 'Edit FAQ Item' : 'Add FAQ Item'}</h3>
              <button type="button" className="mc-modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {saveError && (
              <div
                style={{
                  margin: '16px 20px 0 20px',
                  padding: '10px 14px',
                  borderRadius: 6,
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  fontSize: 13,
                }}
              >
                {saveError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mc-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="mc-input-group">
                  <label className="mc-label">Question *</label>
                  <input
                    type="text"
                    required
                    className="mc-input"
                    placeholder="e.g. How does automatic receipt categorization work?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                <div className="mc-input-group">
                  <label className="mc-label">Answer *</label>
                  <textarea
                    required
                    className="mc-input"
                    rows={5}
                    placeholder="Provide a concise and helpful answer..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
              </div>

              <div className="mc-modal-footer">
                <button type="button" className="mc-btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="mc-btn-primary">
                  {saving ? 'Saving...' : editingItem ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
