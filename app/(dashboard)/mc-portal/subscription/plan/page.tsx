'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  getSubscriptionPlans,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  extractListFromResponse,
  getLanguages,
} from '../../../../helpers/backend';

export interface ActiveLanguageOption {
  code: string;
  name: string;
  flag: string;
  isDefault?: boolean;
}

export interface SubscriptionPlanItem {
  _id: string;
  name: Record<string, string>;
  productId: string;
  aiCredit: number;
  coin?: number;
  dayValue: number;
  status: boolean;
  facilities: Record<string, string>[];
  
  isPopular: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}
import {
  Search,
  Trash2,
  Edit,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  DollarSign,
  Calendar,
  Sparkles,
  Star,
  CheckCircle2,
  XCircle,
  Crown,
  RefreshCw,
  Save,
  ChevronDown,
  Coins,
  Globe,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showSuccessAlert, showErrorToast, showConfirmDialog } from '../../../../helpers/notification';

const getErrorMessage = (err: any, fallback: string): string => {
  return (
    err?.errorMessage ||
    err?.errorDetails?.errorMessage ||
    err?.data?.errorMessage ||
    err?.message ||
    fallback
  );
};

const DURATION_OPTIONS = [
  { label: 'Monthly (30 Days)', value: 30 },
  { label: '3 Months (90 Days)', value: 90 },
  { label: '6 Months (180 Days)', value: 180 },
  { label: '1 Year (365 Days)', value: 365 },
];

export default function SubscriptionPlanPage() {
  const [plans, setPlans] = useState<SubscriptionPlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlanItem | null>(null);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlanItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Active Languages State
  const [activeLanguages, setActiveLanguages] = useState<ActiveLanguageOption[]>([
    { code: 'en', name: 'English', flag: '🇬🇧', isDefault: true },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', isDefault: false },
  ]);

  // Add Form State
  const [addName, setAddName] = useState<Record<string, string>>({});
  const [addProductId, setAddProductId] = useState('');
  const [addAiCredit, setAddAiCredit] = useState<number | string>('');
  const [addCoin, setAddCoin] = useState<number | string>('');
  const [addDayValue, setAddDayValue] = useState<number | string>(30);
  const [addFacilities, setAddFacilities] = useState<Record<string, string>[]>([{}]);
  const [addModalLang, setAddModalLang] = useState<string>('en');
  const [isAdding, setIsAdding] = useState(false);

  // Edit Form State
  const [editName, setEditName] = useState<Record<string, string>>({});
  const [editProductId, setEditProductId] = useState('');
  const [editAiCredit, setEditAiCredit] = useState<number | string>('');
  const [editCoin, setEditCoin] = useState<number | string>('');
  const [editDayValue, setEditDayValue] = useState<number | string>('');
  const [editFacilities, setEditFacilities] = useState<Record<string, string>[]>([{}]);
  const [editStatus, setEditStatus] = useState(true);
  const [editIsPopular, setEditIsPopular] = useState(false);
  const [editModalLang, setEditModalLang] = useState<string>('en');
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch active languages from backend
  useEffect(() => {
    const fetchActiveLanguages = async () => {
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

        const filtered = list.filter((l: any) => {
          const isActive =
            l.active !== undefined
              ? Boolean(l.active)
              : l.status !== undefined
                ? Boolean(l.status)
                : l.isActive !== undefined
                  ? Boolean(l.isActive)
                  : true;
          return isActive;
        });

        if (filtered.length > 0) {
          const mapped: ActiveLanguageOption[] = filtered.map((l: any) => ({
            code: l.code || 'en',
            name: l.name || l.title || l.code,
            flag: l.flag || '🌐',
            isDefault: Boolean(l.default || l.isDefault),
          }));
          mapped.sort((a, b) => {
            if (a.isDefault && !b.isDefault) return -1;
            if (!a.isDefault && b.isDefault) return 1;
            if (a.code === 'en') return -1;
            if (b.code === 'en') return 1;
            if (a.code === 'bn') return -1;
            if (b.code === 'bn') return 1;
            return a.name.localeCompare(b.name);
          });
          setActiveLanguages(mapped);

          const def = mapped.find((l) => l.isDefault) || mapped[0];
          if (def) {
            setAddModalLang(def.code);
            setEditModalLang(def.code);
          }
        }
      } catch (err) {
        console.error('Failed to load active languages for plans:', err);
      }
    };

    fetchActiveLanguages();
  }, []);

  // Fetch Plans from GET /subscriptions/plan
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSubscriptionPlans({
        page,
        limit,
        pagination: 'true',
      });

      const parsed = extractListFromResponse<SubscriptionPlanItem>(res);
      setPlans(parsed.items || []);
      setTotal(parsed.total || 0);
    } catch (err: any) {
      console.error('Failed to load subscription plans:', err);
      showErrorToast(getErrorMessage(err, 'Failed to load subscription plans.'));
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Client search filtering
  const filteredPlans = plans.filter((plan) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const names =
      typeof plan.name === 'string'
        ? [(plan.name as any).toLowerCase()]
        : Object.values(plan.name || {}).map((n) => String(n || '').toLowerCase());
    const nameMatch = names.some((n) => n.includes(q));
    const productIdMatch = (plan.productId || '').toLowerCase().includes(q);
    return nameMatch || productIdMatch;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Create Plan (POST /subscriptions/plan)
  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    const namePayload: Record<string, string> = {};
    Object.entries(addName).forEach(([k, v]) => {
      if (typeof v === 'string' && v.trim()) namePayload[k] = v.trim();
    });

    if (Object.keys(namePayload).length === 0) {
      showErrorToast('Plan name is required.');
      return;
    }

    const validFacilities = addFacilities
      .map((f) => {
        const itemObj: Record<string, string> = {};
        Object.entries(f).forEach(([k, v]) => {
          if (typeof v === 'string' && v.trim()) itemObj[k] = v.trim();
        });
        return itemObj;
      })
      .filter((f) => Object.keys(f).length > 0);

    if (validFacilities.length === 0) {
      showErrorToast('Please provide at least one facility.');
      return;
    }

    setIsAdding(true);

    const payload: any = {
      name: namePayload,
      productId: addProductId.trim(),
      facilities: validFacilities,
    };

    if (addAiCredit !== '' && Number(addAiCredit) >= 0) {
      payload.aiCredit = Number(addAiCredit);
    }
    if (addCoin !== '' && Number(addCoin) >= 0) {
      payload.coin = Number(addCoin);
    }
    if (addDayValue !== '' && Number(addDayValue) >= 0) {
      payload.dayValue = Number(addDayValue);
    }

    try {
      const res = await createSubscriptionPlan(payload);
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg = getErrorMessage(res, 'Failed to create subscription plan.');
        showErrorToast(errorMsg);
        return;
      }

      setShowAddModal(false);
      resetAddForm();
      showSuccessAlert(res?.message || 'Subscription plan created successfully!');
      fetchPlans();
    } catch (err: any) {
      const errorMsg = getErrorMessage(err, 'Failed to create subscription plan.');
      showErrorToast(errorMsg);
    } finally {
      setIsAdding(false);
    }
  };

  const resetAddForm = () => {
    setAddName({});
    setAddProductId('');
    setAddAiCredit('');
    setAddCoin('');
    setAddDayValue(30);
    setAddFacilities([{}]);
    const def = activeLanguages.find((l) => l.isDefault) || activeLanguages[0];
    setAddModalLang(def?.code || 'en');
  };

  // Open Edit Modal
  const handleOpenEdit = (plan: SubscriptionPlanItem) => {
    setEditingPlan(plan);
    setEditName(plan.name && typeof plan.name === 'object' ? { ...plan.name } : {});
    setEditProductId(plan.productId || '');
    setEditAiCredit(plan.aiCredit ?? '');
    setEditCoin(plan.coin ?? '');
    setEditDayValue(plan.dayValue ?? 30);
    setEditStatus(plan.status !== false);
    setEditIsPopular(plan.isPopular === true);
    const def = activeLanguages.find((l) => l.isDefault) || activeLanguages[0];
    setEditModalLang(def?.code || 'en');

    if (Array.isArray(plan.facilities) && plan.facilities.length > 0) {
      setEditFacilities(
        plan.facilities.map((f: any) => {
          if (typeof f === 'object' && f !== null) {
            return { ...f };
          }
          return { en: String(f) };
        })
      );
    } else {
      setEditFacilities([{}]);
    }
  };

  // Update Plan (PATCH /subscriptions/plan)
  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan?._id) return;

    setIsUpdating(true);

    const payload: any = {
      _id: editingPlan._id,
    };

    const namePayload: Record<string, string> = {};
    Object.entries(editName).forEach(([k, v]) => {
      if (typeof v === 'string' && v.trim()) {
        namePayload[k] = v.trim();
      }
    });
    if (Object.keys(namePayload).length > 0) {
      payload.name = namePayload;
    }

    if (editProductId.trim()) {
      payload.productId = editProductId.trim();
    }
    if (editAiCredit !== '' && Number(editAiCredit) >= 0) {
      payload.aiCredit = Number(editAiCredit);
    }
    if (editCoin !== '' && Number(editCoin) >= 0) {
      payload.coin = Number(editCoin);
    }
    if (editDayValue !== '' && Number(editDayValue) >= 0) {
      payload.dayValue = Number(editDayValue);
    }
    payload.status = editStatus;
    payload.isPopular = editIsPopular;

    const validFacilities = editFacilities
      .map((f) => {
        const itemObj: Record<string, string> = {};
        Object.entries(f).forEach(([k, v]) => {
          if (typeof v === 'string' && v.trim()) itemObj[k] = v.trim();
        });
        return itemObj;
      })
      .filter((f) => Object.keys(f).length > 0);

    if (validFacilities.length > 0) {
      payload.facilities = validFacilities;
    }

    try {
      const res = await updateSubscriptionPlan(payload);
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg = getErrorMessage(res, 'Failed to update subscription plan.');
        showErrorToast(errorMsg);
        return;
      }

      setEditingPlan(null);
      showSuccessAlert(res?.message || 'Subscription plan updated successfully!');
      fetchPlans();
    } catch (err: any) {
      const errorMsg = getErrorMessage(err, 'Failed to update subscription plan.');
      showErrorToast(errorMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Plan
  const handleDeletePlan = async () => {
    if (!planToDelete?._id) return;
    setIsDeleting(true);
    try {
      const res = await deleteSubscriptionPlan(planToDelete._id);
      setPlanToDelete(null);
      showSuccessAlert(res?.message || 'Subscription plan deleted successfully!');
      fetchPlans();
    } catch (err: any) {
      showErrorToast(getErrorMessage(err, 'Failed to delete subscription plan.'));
    } finally {
      setIsDeleting(false);
    }
  };

  // Facility helpers
  const addFacilityRow = (type: 'add' | 'edit') => {
    if (type === 'add') {
      setAddFacilities((prev) => [...prev, {}]);
    } else {
      setEditFacilities((prev) => [...prev, {}]);
    }
  };

  const removeFacilityRow = (type: 'add' | 'edit', index: number) => {
    if (type === 'add') {
      setAddFacilities((prev) => prev.filter((_, i) => i !== index));
    } else {
      setEditFacilities((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateFacility = (type: 'add' | 'edit', index: number, lang: string, value: string) => {
    if (type === 'add') {
      setAddFacilities((prev) =>
        prev.map((f, i) => (i === index ? { ...f, [lang]: value } : f))
      );
    } else {
      setEditFacilities((prev) =>
        prev.map((f, i) => (i === index ? { ...f, [lang]: value } : f))
      );
    }
  };

  // Format day value to human readable
  const formatDuration = (days: number) => {
    if (!days) return '—';
    if (days >= 365) return `${Math.round(days / 365)} Year${days >= 730 ? 's' : ''}`;
    if (days >= 30) return `${Math.round(days / 30)} Month${days >= 60 ? 's' : ''}`;
    if (days >= 7) return `${Math.round(days / 7)} Week${days >= 14 ? 's' : ''}`;
    return `${days} Day${days > 1 ? 's' : ''}`;
  };

  // Language tab component
  const LanguageTabBar = ({
    activeLang,
    onSelect,
    filledMap,
  }: {
    activeLang: string;
    onSelect: (lang: string) => void;
    filledMap?: Record<string, boolean>;
  }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Globe size={14} color="var(--mc-brand-purple)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)' }}>
            Active Languages ({activeLanguages.length})
          </span>
        </div>
        <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>
          Click to enter details in each language
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          padding: 6,
          background: '#F8FAFC',
          border: '1px solid var(--mc-border)',
          borderRadius: 10,
          maxHeight: 135,
          overflowY: 'auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {activeLanguages.map((lang) => {
          const isSelected = activeLang === lang.code;
          const isFilled = filledMap ? Boolean(filledMap[lang.code]) : false;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelect(lang.code)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 7,
                border: isSelected ? '1px solid var(--mc-brand-purple)' : '1px solid #E2E8F0',
                fontSize: 12,
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                background: isSelected ? '#FFFFFF' : '#FFFFFF',
                color: isSelected ? 'var(--mc-brand-purple)' : 'var(--mc-text-main)',
                boxShadow: isSelected ? '0 1px 3px rgba(109, 61, 245, 0.15)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{lang.flag || '🌐'}</span>
              <span>{lang.name}</span>
              {lang.isDefault && (
                <span
                  style={{
                    fontSize: 9,
                    background: 'rgba(109, 61, 245, 0.1)',
                    color: 'var(--mc-brand-purple)',
                    padding: '1px 5px',
                    borderRadius: 4,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  Default
                </span>
              )}
              {isFilled && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10B981',
                    display: 'inline-block',
                  }}
                  title="Content entered for this language"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
            Subscription Plans
          </h2>
          <p style={{ fontSize: 13, color: 'var(--mc-text-subtle)', margin: '4px 0 0' }}>
            Manage subscription plans for your users
          </p>
        </div>
        <button
          type="button"
          className="mc-btn-accent"
          onClick={() => {
            resetAddForm();
            setShowAddModal(true);
          }}
        >
          <Plus size={15} />
          <span>Add Plan</span>
        </button>
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#FFFFFF',
          border: '1px solid #F1F5F9',
          borderRadius: 10,
          padding: '8px 14px',
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        <Search size={16} color="var(--mc-text-subtle)" />
        <input
          type="text"
          placeholder="Search plans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            flex: 1,
            fontSize: 13,
            color: 'var(--mc-text-main)',
          }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
          >
            <X size={14} color="var(--mc-text-subtle)" />
          </button>
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="mc-table-card" style={{ display: 'none' }}>
        <style>{`@media (min-width: 768px) { .mc-table-card { display: block !important; } }`}</style>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #F1F5F9',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <div className="mc-table-wrap" style={{ overflowX: 'auto' }}>
            <table className="mc-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', width: 40, whiteSpace: 'nowrap' }}>#</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Plan Name</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Product ID</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>AI Credit</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Coin</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Duration</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Popular</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Facilities</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)', borderBottom: '1px solid #F1F5F9', background: '#FAFBFC', whiteSpace: 'nowrap' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <ShimmerTableRows
                    rows={5}
                    columns={[
                      { width: 36, align: 'center' },
                      { width: '180px', hasSubtitle: true },
                      { width: '100px' },
                      { width: '80px' },
                      { width: '100px' },
                      { width: '80px', isBadge: true },
                      { width: '80px', isBadge: true },
                      { width: '60px' },
                      { width: '70px', align: 'right' },
                    ]}
                  />
                ) : filteredPlans.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center', padding: 40, color: 'var(--mc-text-subtle)' }}>
                      <CreditCard size={32} style={{ margin: '0 auto 8px', opacity: 0.3, display: 'block' }} />
                      <div style={{ fontSize: 14, fontWeight: 600 }}>No plans found</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>Create a subscription plan to get started</div>
                    </td>
                  </tr>
                ) : (
                  filteredPlans.map((plan, idx) => {
                    const defLang = activeLanguages.find((l) => l.isDefault)?.code || 'en';
                    const planName =
                      typeof plan.name === 'string'
                        ? plan.name
                        : plan.name?.[defLang] || plan.name?.en || Object.values(plan.name || {})[0] || '—';

                    const otherTranslations =
                      typeof plan.name === 'object' && plan.name
                        ? Object.entries(plan.name).filter(([k, v]) => k !== defLang && Boolean(v))
                        : [];
                    const secondaryName = otherTranslations[0]?.[1];
                    const extraCount = otherTranslations.length > 1 ? otherTranslations.length - 1 : 0;

                    return (
                      <tr key={plan._id} style={{ borderBottom: '1px solid #F8FAFC', transition: 'background 0.1s ease' }}>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--mc-text-subtle)', whiteSpace: 'nowrap' }}>
                          {(page - 1) * limit + idx + 1}
                        </td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)', whiteSpace: 'nowrap' }}>{planName}</span>
                            {secondaryName && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)', whiteSpace: 'nowrap' }}>{secondaryName}</span>
                                {extraCount > 0 && (
                                  <span style={{ fontSize: 10, background: '#F1F5F9', color: 'var(--mc-text-muted)', padding: '1px 5px', borderRadius: 4 }}>
                                    +{extraCount} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)', background: '#F1F5F9', padding: '3px 8px', borderRadius: 6, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                            {plan.productId || '—'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                            <Sparkles size={13} color="#F59E0B" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)' }}>{plan.aiCredit ?? '—'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                            <Coins size={13} color="#EAB308" />
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)' }}>{plan.coin ?? '—'}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                            <Calendar size={13} color="var(--mc-text-subtle)" style={{ flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: 'var(--mc-text-main)', whiteSpace: 'nowrap' }}>{formatDuration(plan.dayValue)}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '3px 10px',
                              borderRadius: 20,
                              fontSize: 11,
                              fontWeight: 600,
                              background: plan.status ? '#ECFDF5' : '#FEF2F2',
                              color: plan.status ? '#059669' : '#DC2626',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {plan.status ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                            {plan.status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          {plan.isPopular ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '3px 10px',
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                                color: '#92400E',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <Crown size={12} />
                              Popular
                            </span>
                          ) : (
                            <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '3px 10px',
                              borderRadius: 20,
                              fontSize: 11,
                              fontWeight: 600,
                              background: '#EFF6FF',
                              color: '#2563EB',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {Array.isArray(plan.facilities) ? plan.facilities.length : 0} items
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, whiteSpace: 'nowrap' }}>
                            <button
                              title="Edit"
                              onClick={() => handleOpenEdit(plan)}
                              style={{
                                background: '#F1F5F9',
                                border: '1px solid var(--mc-border)',
                                borderRadius: 6,
                                padding: 6,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <Edit size={14} color="var(--mc-brand-purple)" />
                            </button>
                            <button
                              title="Delete"
                              onClick={() => setPlanToDelete(plan)}
                              style={{
                                background: '#FEF2F2',
                                border: '1px solid #FECACA',
                                borderRadius: 6,
                                padding: 6,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <Trash2 size={14} color="#DC2626" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="mc-mobile-cards" style={{ display: 'block' }}>
        <style>{`@media (min-width: 768px) { .mc-mobile-cards { display: none !important; } }`}</style>
        {loading ? (
          <ShimmerMobileCardList count={4} rowsCount={4} hasTags={true} />
        ) : filteredPlans.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--mc-text-subtle)' }}>
            <CreditCard size={32} style={{ margin: '0 auto 8px', opacity: 0.3 }} />
            <div style={{ fontSize: 14, fontWeight: 600 }}>No plans found</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredPlans.map((plan) => {
              const defLang = activeLanguages.find((l) => l.isDefault)?.code || 'en';
              const planName =
                typeof plan.name === 'string'
                  ? plan.name
                  : plan.name?.[defLang] || plan.name?.en || Object.values(plan.name || {})[0] || '—';

              const otherTranslations =
                typeof plan.name === 'object' && plan.name
                  ? Object.entries(plan.name).filter(([k, v]) => k !== defLang && Boolean(v))
                  : [];
              const secondaryName = otherTranslations[0]?.[1];
              const extraCount = otherTranslations.length > 1 ? otherTranslations.length - 1 : 0;
              return (
                <div
                  key={plan._id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 14,
                    padding: 16,
                    boxShadow: 'var(--mc-shadow-sm)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--mc-text-main)', marginBottom: 2 }}>{planName}</div>
                      {secondaryName && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                          <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>{secondaryName}</span>
                          {extraCount > 0 && (
                            <span style={{ fontSize: 10, background: '#F1F5F9', color: 'var(--mc-text-muted)', padding: '1px 5px', borderRadius: 4 }}>
                              +{extraCount} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span
                        style={{
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: plan.status ? '#ECFDF5' : '#FEF2F2',
                          color: plan.status ? '#059669' : '#DC2626',
                        }}
                      >
                        {plan.status ? 'Active' : 'Inactive'}
                      </span>
                      {plan.isPopular && (
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                            color: '#92400E',
                          }}
                        >
                          Popular
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                    {plan.amount !== undefined && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                        <span style={{ color: 'var(--mc-text-subtle)' }}>Amount</span>
                        <span style={{ fontWeight: 700, color: 'var(--mc-text-main)' }}>${plan.amount} {plan.currency || ''}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--mc-text-subtle)' }}>AI Credit</span>
                      <span style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>{plan.aiCredit ?? '—'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--mc-text-subtle)' }}>Coin</span>
                      <span style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>{plan.coin ?? '—'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--mc-text-subtle)' }}>Duration</span>
                      <span style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>{formatDuration(plan.dayValue)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--mc-text-subtle)' }}>Facilities</span>
                      <span style={{ fontWeight: 600, color: '#2563EB' }}>{Array.isArray(plan.facilities) ? plan.facilities.length : 0} items</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => handleOpenEdit(plan)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        padding: '8px 0',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        background: '#F8FAFC',
                        cursor: 'pointer',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--mc-brand-purple)',
                      }}
                    >
                      <Edit size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setPlanToDelete(plan)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 14px',
                        border: '1px solid #FECACA',
                        borderRadius: 8,
                        background: '#FEF2F2',
                        cursor: 'pointer',
                        color: '#DC2626',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && total > limit && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#FFFFFF',
            borderRadius: 10,
            border: '1px solid var(--mc-border)',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{
                padding: '6px 10px',
                borderRadius: 6,
                border: '1px solid var(--mc-border)',
                background: page <= 1 ? '#F8FAFC' : '#FFFFFF',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                opacity: page <= 1 ? 0.5 : 1,
              }}
            >
              <ChevronLeft size={14} />
            </button>
            <span style={{ padding: '6px 12px', fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)' }}>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{
                padding: '6px 10px',
                borderRadius: 6,
                border: '1px solid var(--mc-border)',
                background: page >= totalPages ? '#F8FAFC' : '#FFFFFF',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages ? 0.5 : 1,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD PLAN MODAL */}
      {/* ============================================================ */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            padding: 16,
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              width: '100%',
              maxWidth: 560,
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid var(--mc-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(109,61,245,0.1), rgba(109,61,245,0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Plus size={18} color="var(--mc-brand-purple)" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--mc-text-main)' }}>Create Subscription Plan</div>
                  <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>Add a new plan for your users</div>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={18} color="var(--mc-text-subtle)" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreatePlan} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(() => {
                const addFilledMap: Record<string, boolean> = {};
                activeLanguages.forEach((l) => {
                  const hasName = Boolean(addName[l.code]?.trim());
                  const hasFacility = addFacilities.some((f) => Boolean(f[l.code]?.trim()));
                  addFilledMap[l.code] = hasName || hasFacility;
                });
                return <LanguageTabBar activeLang={addModalLang} onSelect={setAddModalLang} filledMap={addFilledMap} />;
              })()}

              {/* Name */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                  Plan Name ({activeLanguages.find((l) => l.code === addModalLang)?.name || addModalLang}) *
                </label>
                <input
                  type="text"
                  value={addName[addModalLang] || ''}
                  onChange={(e) =>
                    setAddName((prev) => ({ ...prev, [addModalLang]: e.target.value }))
                  }
                  placeholder={`e.g. Premium Plan (${activeLanguages.find((l) => l.code === addModalLang)?.name || addModalLang})`}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 8,
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Product ID, AI Credit & Coin */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                    Product ID (Play / App Store) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <CreditCard size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-subtle)' }} />
                    <input
                      type="text"
                      value={addProductId}
                      onChange={(e) => setAddProductId(e.target.value)}
                      placeholder="e.g. premium_monthly"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 34px',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                    AI Credit
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Sparkles size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#F59E0B' }} />
                    <input
                      type="number"
                      min="0"
                      value={addAiCredit}
                      onChange={(e) => setAddAiCredit(e.target.value)}
                      placeholder="100"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 34px',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                    Coin
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Coins size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#EAB308' }} />
                    <input
                      type="number"
                      min="0"
                      value={addCoin}
                      onChange={(e) => setAddCoin(e.target.value)}
                      placeholder="50"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 34px',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Day Value / Duration */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                  Duration *
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-subtle)', pointerEvents: 'none' }} />
                  <select
                    value={addDayValue}
                    onChange={(e) => setAddDayValue(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 34px 10px 34px',
                      border: '1px solid var(--mc-border)',
                      borderRadius: 8,
                      fontSize: 13,
                      outline: 'none',
                      boxSizing: 'border-box',
                      background: '#FFFFFF',
                      color: 'var(--mc-text-main)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                    }}
                  >
                    {DURATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-subtle)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Facilities */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    Facilities ({activeLanguages.find((l) => l.code === addModalLang)?.name || addModalLang}) *
                  </label>
                  <button
                    type="button"
                    onClick={() => addFacilityRow('add')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: '1px solid var(--mc-border)',
                      background: '#F8FAFC',
                      cursor: 'pointer',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--mc-brand-purple)',
                    }}
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {addFacilities.map((facility, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="text"
                        value={facility[addModalLang] || ''}
                        onChange={(e) => updateFacility('add', idx, addModalLang, e.target.value)}
                        placeholder={`Feature ${idx + 1} (${activeLanguages.find((l) => l.code === addModalLang)?.name || addModalLang})`}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid var(--mc-border)',
                          borderRadius: 8,
                          fontSize: 12,
                          outline: 'none',
                        }}
                      />
                      {addFacilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFacilityRow('add', idx)}
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: 6,
                            padding: 6,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <X size={12} color="#DC2626" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'flex-start' }}>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="mc-btn-primary"
                  style={{ padding: '9px 22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 600, borderRadius: 10 }}
                >
                  {isAdding ? <RefreshCw size={14} className="mc-spin" /> : <Save size={14} />}
                  <span>{isAdding ? 'Creating...' : 'Create Plan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* EDIT PLAN MODAL */}
      {/* ============================================================ */}
      {editingPlan && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            padding: 16,
          }}
          onClick={() => setEditingPlan(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              width: '100%',
              maxWidth: 560,
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px',
                borderBottom: '1px solid var(--mc-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(109,61,245,0.1), rgba(109,61,245,0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Edit size={18} color="var(--mc-brand-purple)" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--mc-text-main)' }}>Edit Subscription Plan</div>
                  <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>Update plan details</div>
                </div>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={18} color="var(--mc-text-subtle)" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdatePlan} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(() => {
                const editFilledMap: Record<string, boolean> = {};
                activeLanguages.forEach((l) => {
                  const hasName = Boolean(editName[l.code]?.trim());
                  const hasFacility = editFacilities.some((f) => Boolean(f[l.code]?.trim()));
                  editFilledMap[l.code] = hasName || hasFacility;
                });
                return <LanguageTabBar activeLang={editModalLang} onSelect={setEditModalLang} filledMap={editFilledMap} />;
              })()}

              {/* Name */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                  Plan Name ({activeLanguages.find((l) => l.code === editModalLang)?.name || editModalLang})
                </label>
                <input
                  type="text"
                  value={editName[editModalLang] || ''}
                  onChange={(e) =>
                    setEditName((prev) => ({ ...prev, [editModalLang]: e.target.value }))
                  }
                  placeholder={`e.g. Premium Plan (${activeLanguages.find((l) => l.code === editModalLang)?.name || editModalLang})`}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 8,
                    fontSize: 13,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Product ID, AI Credit & Coin */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                    Product ID (Play / App Store)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <CreditCard size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-subtle)' }} />
                    <input
                      type="text"
                      value={editProductId}
                      onChange={(e) => setEditProductId(e.target.value)}
                      placeholder="e.g. premium_monthly"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 34px',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                    AI Credit
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Sparkles size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#F59E0B' }} />
                    <input
                      type="number"
                      min="0"
                      value={editAiCredit}
                      onChange={(e) => setEditAiCredit(e.target.value)}
                      placeholder="100"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 34px',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                    Coin
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Coins size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#EAB308' }} />
                    <input
                      type="number"
                      min="0"
                      value={editCoin}
                      onChange={(e) => setEditCoin(e.target.value)}
                      placeholder="50"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 34px',
                        border: '1px solid var(--mc-border)',
                        borderRadius: 8,
                        fontSize: 13,
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Day Value / Duration */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', marginBottom: 6, display: 'block' }}>
                  Duration *
                </label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-subtle)', pointerEvents: 'none' }} />
                  <select
                    value={editDayValue}
                    onChange={(e) => setEditDayValue(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 34px 10px 34px',
                      border: '1px solid var(--mc-border)',
                      borderRadius: 8,
                      fontSize: 13,
                      outline: 'none',
                      boxSizing: 'border-box',
                      background: '#FFFFFF',
                      color: 'var(--mc-text-main)',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                    }}
                  >
                    {!DURATION_OPTIONS.some((o) => o.value === Number(editDayValue)) && editDayValue !== '' && (
                      <option value={Number(editDayValue)}>
                        {formatDuration(Number(editDayValue))} ({editDayValue} Days)
                      </option>
                    )}
                    {DURATION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--mc-text-subtle)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Status & Popular Toggles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 8,
                    background: '#FAFBFC',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {editStatus ? <CheckCircle2 size={16} color="#059669" /> : <XCircle size={16} color="#DC2626" />}
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                      {editStatus ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditStatus(!editStatus)}
                    style={{
                      width: 40,
                      height: 22,
                      borderRadius: 11,
                      border: 'none',
                      cursor: 'pointer',
                      background: editStatus ? 'var(--mc-brand-purple)' : '#CBD5E1',
                      position: 'relative',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        position: 'absolute',
                        top: 3,
                        left: editStatus ? 21 : 3,
                        transition: 'left 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </button>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 8,
                    background: '#FAFBFC',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Crown size={16} color={editIsPopular ? '#F59E0B' : 'var(--mc-text-subtle)'} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                      Popular
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditIsPopular(!editIsPopular)}
                    style={{
                      width: 40,
                      height: 22,
                      borderRadius: 11,
                      border: 'none',
                      cursor: 'pointer',
                      background: editIsPopular ? '#F59E0B' : '#CBD5E1',
                      position: 'relative',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        position: 'absolute',
                        top: 3,
                        left: editIsPopular ? 21 : 3,
                        transition: 'left 0.2s ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    Facilities ({activeLanguages.find((l) => l.code === editModalLang)?.name || editModalLang})
                  </label>
                  <button
                    type="button"
                    onClick={() => addFacilityRow('edit')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      borderRadius: 6,
                      border: '1px solid var(--mc-border)',
                      background: '#F8FAFC',
                      cursor: 'pointer',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--mc-brand-purple)',
                    }}
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {editFacilities.map((facility, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="text"
                        value={facility[editModalLang] || ''}
                        onChange={(e) => updateFacility('edit', idx, editModalLang, e.target.value)}
                        placeholder={`Feature ${idx + 1} (${activeLanguages.find((l) => l.code === editModalLang)?.name || editModalLang})`}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid var(--mc-border)',
                          borderRadius: 8,
                          fontSize: 12,
                          outline: 'none',
                        }}
                      />
                      {editFacilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFacilityRow('edit', idx)}
                          style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: 6,
                            padding: 6,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <X size={12} color="#DC2626" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div style={{ paddingTop: 8, display: 'flex', justifyContent: 'flex-start' }}>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="mc-btn-primary"
                  style={{ padding: '9px 22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13, fontWeight: 600, borderRadius: 10 }}
                >
                  {isUpdating ? <RefreshCw size={14} className="mc-spin" /> : <Save size={14} />}
                  <span>{isUpdating ? 'Updating...' : 'Update Plan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================================ */}
      {planToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            padding: 16,
          }}
          onClick={() => setPlanToDelete(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              width: '100%',
              maxWidth: 420,
              padding: '28px',
              textAlign: 'center',
              boxShadow: '0 24px 48px rgba(0,0,0,0.18)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <Trash2 size={22} color="#DC2626" />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--mc-text-main)', marginBottom: 8 }}>
              Delete Subscription Plan?
            </div>
            <div style={{ fontSize: 13, color: 'var(--mc-text-subtle)', marginBottom: 24, lineHeight: 1.5 }}>
              Are you sure you want to delete <strong>"{planToDelete.name?.en || 'this plan'}"</strong>? This action cannot be undone.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setPlanToDelete(null)}
                className="mc-btn-secondary"
                style={{ flex: 1, padding: '10px 0' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlan}
                disabled={isDeleting}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: isDeleting ? 0.7 : 1,
                }}
              >
                {isDeleting ? <RefreshCw size={14} className="mc-spin" /> : <Trash2 size={14} />}
                <span>{isDeleting ? 'Deleting...' : 'Delete Plan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
