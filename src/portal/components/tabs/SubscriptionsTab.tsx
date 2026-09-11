import React, { useEffect, useState } from 'react';
import {
  getSubscriptionPlans,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  getSubscriptionHistory,
  extractListFromResponse,
  type SubscriptionPlanItem,
} from '../../services/portalApi';
import { Check, RefreshCw, Plus, Edit, Trash2, X, AlertCircle, Sparkles, Clock } from 'lucide-react';

export const SubscriptionsTab: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlanItem[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addNameEn, setAddNameEn] = useState('');
  const [addNameBn, setAddNameBn] = useState('');
  const [addAmount, setAddAmount] = useState<number | string>('19.99');
  const [addDayValue, setAddDayValue] = useState<number | string>('30');
  const [addFacilityInput, setAddFacilityInput] = useState('');
  const [addFacilities, setAddFacilities] = useState<string[]>([
    'Unlimited receipt scans',
    'Bank SMS parsing',
    'Real-time safe-to-spend limits',
  ]);
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Edit Modal State
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlanItem | null>(null);
  const [editNameEn, setEditNameEn] = useState('');
  const [editNameBn, setEditNameBn] = useState('');
  const [editAmount, setEditAmount] = useState<number | string>('');
  const [editDayValue, setEditDayValue] = useState<number | string>('');
  const [editFacilityInput, setEditFacilityInput] = useState('');
  const [editFacilities, setEditFacilities] = useState<string[]>([]);
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete State
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlanItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchPlansAndHistory = async () => {
    setLoading(true);
    try {
      const [plansRes, histRes] = await Promise.allSettled([
        getSubscriptionPlans(),
        getSubscriptionHistory(),
      ]);

      if (plansRes.status === 'fulfilled') {
        const parsed = extractListFromResponse<SubscriptionPlanItem>(plansRes.value);
        setPlans(parsed.items);
      }

      if (histRes.status === 'fulfilled') {
        const parsedHist = extractListFromResponse(histRes.value);
        setHistory(parsedHist.items);
      }
    } catch (err) {
      console.error('Failed to load subscription data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlansAndHistory();
  }, []);

  // Handlers for Add Plan
  const handleAddFacility = () => {
    if (!addFacilityInput.trim()) return;
    setAddFacilities([...addFacilities, addFacilityInput.trim()]);
    setAddFacilityInput('');
  };

  const handleRemoveAddFacility = (idx: number) => {
    setAddFacilities(addFacilities.filter((_, i) => i !== idx));
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addNameEn.trim()) {
      setAddError('Plan name in English is required.');
      return;
    }
    const amt = parseFloat(addAmount.toString());
    const days = parseInt(addDayValue.toString(), 10);
    if (isNaN(amt) || amt < 0) {
      setAddError('Please enter a valid price amount.');
      return;
    }
    if (isNaN(days) || days <= 0) {
      setAddError('Duration must be at least 1 day.');
      return;
    }

    setIsAdding(true);
    setAddError(null);

    try {
      await createSubscriptionPlan({
        name: {
          en: addNameEn.trim(),
          bn: addNameBn.trim() || undefined,
        },
        amount: amt,
        dayValue: days,
        facilities: addFacilities,
      });

      setShowAddModal(false);
      setAddNameEn('');
      setAddNameBn('');
      setAddAmount('19.99');
      setAddDayValue('30');
      fetchPlansAndHistory();
    } catch (err: any) {
      setAddError(err?.message || 'Failed to create subscription plan.');
    } finally {
      setIsAdding(false);
    }
  };

  // Handlers for Edit Plan
  const handleOpenEdit = (plan: SubscriptionPlanItem) => {
    setEditingPlan(plan);
    const enName = typeof plan.name === 'object' ? plan.name?.en || '' : plan.name || '';
    const bnName = typeof plan.name === 'object' ? plan.name?.bn || '' : '';
    setEditNameEn(enName);
    setEditNameBn(bnName);
    setEditAmount(plan.amount ?? plan.price ?? 0);
    setEditDayValue(plan.dayValue ?? 30);

    const facs: string[] = (plan.facilities || []).map((f: any) =>
      typeof f === 'object' ? f.en || f.bn || '' : String(f)
    );
    setEditFacilities(facs.filter(Boolean));
    setEditError(null);
  };

  const handleAddEditFacility = () => {
    if (!editFacilityInput.trim()) return;
    setEditFacilities([...editFacilities, editFacilityInput.trim()]);
    setEditFacilityInput('');
  };

  const handleRemoveEditFacility = (idx: number) => {
    setEditFacilities(editFacilities.filter((_, i) => i !== idx));
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    if (!editNameEn.trim()) {
      setEditError('Plan name in English is required.');
      return;
    }
    const amt = parseFloat(editAmount.toString());
    const days = parseInt(editDayValue.toString(), 10);
    if (isNaN(amt) || amt < 0) {
      setEditError('Please enter a valid amount.');
      return;
    }
    if (isNaN(days) || days <= 0) {
      setEditError('Duration must be at least 1 day.');
      return;
    }

    setIsUpdating(true);
    setEditError(null);

    try {
      await updateSubscriptionPlan(editingPlan._id, {
        name: {
          en: editNameEn.trim(),
          bn: editNameBn.trim() || undefined,
        },
        amount: amt,
        dayValue: days,
        facilities: editFacilities,
      });

      setEditingPlan(null);
      fetchPlansAndHistory();
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update subscription plan.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handlers for Delete Plan
  const handleDeleteConfirm = async () => {
    if (!planToDelete) return;
    setIsDeleting(true);
    try {
      await deleteSubscriptionPlan(planToDelete._id);
      setPlanToDelete(null);
      fetchPlansAndHistory();
    } catch (err: any) {
      alert(`Delete failed: ${err?.message || 'Error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
            Subscription Tiers & Monetization
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Active tiers & billing cycles • <code>GET /subscriptions/plan</code>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn-accent"
          >
            <Plus size={15} />
            <span>Add Subscription Tier</span>
          </button>

          <button
            onClick={fetchPlansAndHistory}
            disabled={loading}
            className="mc-btn-secondary"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Subscription Plans Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16, marginBottom: 24 }}>
        {loading ? (
          <div style={{ padding: 24, color: 'var(--mc-text-muted)' }}>Loading plans...</div>
        ) : plans.length === 0 ? (
          <div style={{ padding: 32, background: '#FFFFFF', borderRadius: 12, border: '1px solid var(--mc-border)', textAlign: 'center', color: 'var(--mc-text-muted)', gridColumn: '1 / -1' }}>
            No subscription plans found. Click <b>"Add Subscription Tier"</b> above to create your first monetization tier.
          </div>
        ) : (
          plans.map((p) => {
            const nameEn = typeof p.name === 'object' ? p.name?.en : p.name;
            const nameBn = typeof p.name === 'object' ? p.name?.bn : '';

            return (
              <div
                key={p._id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--mc-border)',
                  borderRadius: 14,
                  padding: 24,
                  boxShadow: 'var(--mc-shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 3px 0', color: 'var(--mc-text-main)' }}>
                        {nameEn || 'Tier'}
                      </h3>
                      {nameBn && <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>{nameBn}</span>}
                    </div>
                    <span className="mc-badge mc-badge-tier">
                      <Clock size={11} style={{ marginRight: 3 }} />
                      {p.dayValue ? `${p.dayValue} Days` : '30 Days'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '14px 0' }}>
                    <span style={{ fontSize: 30, fontWeight: 800, color: 'var(--mc-text-main)', letterSpacing: '-0.02em' }}>
                      ৳{p.amount ?? p.price ?? 0}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>/ cycle</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--mc-border-light)', paddingTop: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--mc-text-muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Included Facilities ({(p.facilities || []).length})
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {(p.facilities || []).length === 0 ? (
                        <li style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>Standard access</li>
                      ) : (
                        (p.facilities || []).map((fac: any, idx: number) => {
                          const facText = typeof fac === 'object' ? fac.en || fac.bn : fac;
                          return (
                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--mc-text-main)' }}>
                              <Check size={14} color="var(--mc-brand-purple)" style={{ flexShrink: 0 }} />
                              <span>{facText}</span>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                </div>

                {/* Card Action Bar */}
                <div style={{ marginTop: 22, paddingTop: 14, borderTop: '1px solid var(--mc-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code style={{ fontSize: 11, color: 'var(--mc-text-subtle)', background: '#F8FAFC', padding: '2px 6px', borderRadius: 4 }}>
                    ID: {p._id?.slice(-8)}
                  </code>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      title="Edit Plan"
                      style={{
                        padding: '6px 10px',
                        background: '#F8FAFC',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 6,
                        cursor: 'pointer',
                        color: 'var(--mc-brand-purple)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      <Edit size={13} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setPlanToDelete(p)}
                      title="Delete Plan"
                      style={{
                        padding: '6px 10px',
                        background: 'transparent',
                        border: '1px solid var(--mc-danger-border)',
                        borderRadius: 6,
                        cursor: 'pointer',
                        color: 'var(--mc-danger)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 12,
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Subscription History Table */}
      <div className="mc-card-table">
        <div className="mc-table-header">
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>Subscriber History Stream</h2>
          <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>Recent payment transactions</span>
        </div>

        <div className="mc-table-wrap">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Subscription ID</th>
                <th>Plan Reference</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '32px 0', color: 'var(--mc-text-muted)' }}>
                    Loading history...
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '32px 0', color: 'var(--mc-text-muted)' }}>
                    No recorded transactions yet.
                  </td>
                </tr>
              ) : (
                history.map((h, i) => (
                  <tr key={h._id || i}>
                    <td>
                      <code style={{ fontSize: 11, background: '#F1F5F9', padding: '2px 6px', borderRadius: 4 }}>
                        {h._id || '—'}
                      </code>
                    </td>
                    <td>{h.subscriptionPlan || h.planId || 'Standard Plan'}</td>
                    <td>
                      <span className="mc-badge mc-badge-active">
                        Active
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                      {h.createdAt ? new Date(h.createdAt).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE SUBSCRIPTION PLAN MODAL */}
      {showAddModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 520 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Add Subscription Tier
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePlan}>
              <div className="mc-modal-body">
                {addError && (
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      background: 'var(--mc-danger-light)',
                      border: '1px solid var(--mc-danger-border)',
                      color: 'var(--mc-danger)',
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    <AlertCircle size={14} />
                    <span>{addError}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Plan Name (English) *</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. Pro Monthly"
                      value={addNameEn}
                      onChange={(e) => setAddNameEn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Plan Name (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="যেমন: প্রো মাসিক"
                      value={addNameBn}
                      onChange={(e) => setAddNameBn(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Amount / Price (৳) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="mc-input"
                      placeholder="19.99"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Duration (Days) *</label>
                    <input
                      type="number"
                      className="mc-input"
                      placeholder="30"
                      value={addDayValue}
                      onChange={(e) => setAddDayValue(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Facilities List Manager */}
                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Included Facilities & Perks</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. AI Receipt Auto-Scan"
                      value={addFacilityInput}
                      onChange={(e) => setAddFacilityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFacility();
                        }
                      }}
                      style={{ height: 38 }}
                    />
                    <button
                      type="button"
                      onClick={handleAddFacility}
                      className="mc-btn-secondary"
                      style={{ padding: '0 14px', height: 38 }}
                    >
                      Add
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {addFacilities.map((fac, idx) => (
                      <span
                        key={idx}
                        className="mc-badge mc-badge-tag"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px' }}
                      >
                        <span>{fac}</span>
                        <X
                          size={12}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveAddFacility(idx)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mc-btn-secondary"
                  disabled={isAdding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mc-btn-accent"
                  disabled={isAdding}
                >
                  {isAdding ? 'Creating...' : 'Create Tier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SUBSCRIPTION PLAN MODAL */}
      {editingPlan && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 520 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Edit Subscription Tier
                </h3>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdatePlan}>
              <div className="mc-modal-body">
                {editError && (
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      background: 'var(--mc-danger-light)',
                      border: '1px solid var(--mc-danger-border)',
                      color: 'var(--mc-danger)',
                      fontSize: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 16,
                    }}
                  >
                    <AlertCircle size={14} />
                    <span>{editError}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Plan Name (English) *</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. Premium Plan"
                      value={editNameEn}
                      onChange={(e) => setEditNameEn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Plan Name (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="যেমন: প্রিমিয়াম প্ল্যান"
                      value={editNameBn}
                      onChange={(e) => setEditNameBn(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Amount / Price (৳) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="mc-input"
                      placeholder="19.99"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Duration (Days) *</label>
                    <input
                      type="number"
                      className="mc-input"
                      placeholder="30"
                      value={editDayValue}
                      onChange={(e) => setEditDayValue(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Facilities List Manager */}
                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Included Facilities & Perks</label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="Add perk..."
                      value={editFacilityInput}
                      onChange={(e) => setEditFacilityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddEditFacility();
                        }
                      }}
                      style={{ height: 38 }}
                    />
                    <button
                      type="button"
                      onClick={handleAddEditFacility}
                      className="mc-btn-secondary"
                      style={{ padding: '0 14px', height: 38 }}
                    >
                      Add
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {editFacilities.map((fac, idx) => (
                      <span
                        key={idx}
                        className="mc-badge mc-badge-tag"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 8px' }}
                      >
                        <span>{fac}</span>
                        <X
                          size={12}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleRemoveEditFacility(idx)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="mc-btn-secondary"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mc-btn-accent"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE PLAN MODAL */}
      {planToDelete && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 420 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mc-danger)' }}>
                <Trash2 size={18} />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-danger)' }}>
                  Delete Subscription Tier
                </h3>
              </div>
              <button
                onClick={() => setPlanToDelete(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body">
              <p style={{ fontSize: 14, margin: '0 0 12px 0', color: 'var(--mc-text-main)' }}>
                Are you sure you want to permanently delete plan{' '}
                <b>
                  {typeof planToDelete.name === 'object' ? planToDelete.name?.en : planToDelete.name}
                </b>{' '}
                (৳{planToDelete.amount ?? planToDelete.price ?? 0})?
              </p>
              <p style={{ fontSize: 12, color: 'var(--mc-text-muted)', margin: 0 }}>
                This action cannot be undone. Any active users on this tier will keep their current cycle until expiration.
              </p>
            </div>

            <div className="mc-modal-footer">
              <button
                onClick={() => setPlanToDelete(null)}
                className="mc-btn-secondary"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="mc-btn-danger"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
