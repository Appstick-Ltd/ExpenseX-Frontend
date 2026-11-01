'use client';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  getUsers,
  createUser,
  getSubscriptionHistory,
  extractListFromResponse,
} from '../../../../helpers/backend';
import {
  Search,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  User,
  Sparkles,
  Globe,
  Coins,
  Crown,
  CheckCircle2,
  UserX,
  Users,
  Filter,
  RotateCcw,
  Check,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showSuccessAlert, showErrorToast } from '../../../../helpers/notification';

export interface UserSubscription {
  _id?: string;
  orderId?: string;
  productId?: string;
  purchaseToken?: string;
  status?: string;
  expiryTime?: string;
  autoRenewing?: boolean;
  planDetails?: {
    name?: string;
    billingPeriod?: string;
    amount?: number;
    currency?: string;
  };
}

export interface UserItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar?: string;
  image?: string;
  status?: 'approved' | 'deleted' | string | boolean;
  country?: string;
  ai_credit?: number;
  aiCredit?: number;
  ai_assigned_credit?: number;
  currencyCode?: string;
  languageCode?: string;
  gender?: string;
  dob?: string;
  address?: string;
  self_referral_code?: string;
  monthly_income?: number;
  monthly_expense?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  activeSubscription?: UserSubscription | null;
  isPro?: boolean;
  [key: string]: any;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  proUsers: number;
  freeUsers: number;
  totalAiCredit: number;
  avgAiCredit: number;
  countries: string[];
}

const DEFAULT_USER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366F1'/%3E%3Cstop offset='100%25' stop-color='%238B5CF6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' rx='40' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%23FFFFFF' opacity='0.9'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24' fill='%23FFFFFF' opacity='0.9'/%3E%3C/svg%3E";

/* Custom Professional Dropdown Component */
interface DropdownOption {
  label: string;
  value: string;
  badge?: string;
}

function ProfessionalDropdown({
  label,
  value,
  options,
  onChange,
  activeColor = '#4F46E5',
}: {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (val: string) => void;
  activeColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || options[0];
  const isSelected = value !== 'all' && value !== 'newest';

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '7px 12px',
          borderRadius: 9,
          border: isSelected ? `1.5px solid ${activeColor}` : '1px solid #E2E8F0',
          background: isSelected ? 'rgba(99, 102, 241, 0.08)' : '#FFFFFF',
          color: isSelected ? activeColor : '#334155',
          fontSize: 12.5,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.18s ease',
          boxShadow: isSelected ? '0 1px 3px rgba(99, 102, 241, 0.15)' : '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        <span style={{ color: '#64748B', fontWeight: 500 }}>{label}:</span>
        <span style={{ fontWeight: 700 }}>{selectedOption?.label || value}</span>
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: '#64748B',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            minWidth: 180,
            maxWidth: 240,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
            padding: '6px',
            zIndex: 999,
            maxHeight: 280,
            overflowY: 'auto',
          }}
        >
          {options.map((opt) => {
            const isCurrent = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: 7,
                  border: 'none',
                  background: isCurrent ? 'rgba(99, 102, 241, 0.09)' : 'transparent',
                  color: isCurrent ? activeColor : '#1E293B',
                  fontSize: 12.5,
                  fontWeight: isCurrent ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isCurrent) e.currentTarget.style.background = '#F8FAFC';
                }}
                onMouseLeave={(e) => {
                  if (!isCurrent) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span>{opt.label}</span>
                {isCurrent && <Check size={14} color={activeColor} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper to fetch active subscriptions from Google Play history
async function fetchActiveSubscriptionsMap(): Promise<Map<string, any>> {
  const activeMap = new Map<string, any>();
  try {
    const res = await getSubscriptionHistory({ limit: 300 });
    const items = extractListFromResponse<any>(res).items || [];
    const now = new Date();

    items.forEach((sub: any) => {
      const status = (sub.status || '').toLowerCase();
      const isNotExpired = sub.expiryTime ? new Date(sub.expiryTime) > now : true;

      if (status === 'active' && isNotExpired) {
        // Map by userId
        const userId = typeof sub.user === 'object' ? sub.user?._id : sub.user;
        if (userId) {
          activeMap.set(String(userId), sub);
        }
        // Also map by user email (case-insensitive)
        const userEmail = typeof sub.user === 'object' ? sub.user?.email : undefined;
        if (userEmail) {
          activeMap.set(userEmail.toLowerCase().trim(), sub);
        }
      }
    });
  } catch (err) {
    console.error('Failed to fetch subscription history for user mapping:', err);
  }
  return activeMap;
}

// Helper to enrich a UserItem with active subscription info
function enrichUserWithSubscription(u: UserItem, activeSubMap: Map<string, any>): UserItem {
  const activeSub =
    (u._id ? activeSubMap.get(String(u._id)) : null) ||
    (u.email ? activeSubMap.get(u.email.toLowerCase().trim()) : null) ||
    u.activeSubscription;

  if (activeSub) {
    const planName =
      typeof activeSub.subscriptionPlan?.name === 'object'
        ? activeSub.subscriptionPlan.name.en || activeSub.subscriptionPlan.name.bn
        : activeSub.subscriptionPlan?.name ||
          (activeSub.basePlanId === 'yearly'
            ? 'Annual Plan'
            : activeSub.basePlanId === '3-month'
            ? 'Quarterly Plan'
            : activeSub.basePlanId === '6-month'
            ? 'Standard Plan'
            : 'Starter Monthly');

    return {
      ...u,
      isPro: true,
      activeSubscription: {
        _id: activeSub._id,
        orderId: activeSub.orderId,
        productId: activeSub.productId || activeSub.basePlanId,
        status: activeSub.status || 'active',
        expiryTime: activeSub.expiryTime,
        autoRenewing: activeSub.autoRenewing,
        planDetails: {
          name: planName,
          amount: activeSub.amount,
          currency: activeSub.currency,
        },
      },
    };
  }

  return u;
}

export default function SystemUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'deleted'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'pro' | 'free'>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [creditFilter, setCreditFilter] = useState<'all' | 'high' | 'low' | 'zero'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | '7d' | '30d' | '1y'>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Pagination States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);

  // Statistics State
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    deletedUsers: 0,
    proUsers: 0,
    freeUsers: 0,
    totalAiCredit: 0,
    avgAiCredit: 0,
    countries: [],
  });

  // Selected User for View Modal
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Check if any filter is active
  const isAnyFilterActive = useMemo(() => {
    return (
      search.trim().length > 0 ||
      statusFilter !== 'all' ||
      planFilter !== 'all' ||
      countryFilter !== 'all' ||
      creditFilter !== 'all' ||
      dateFilter !== 'all' ||
      sortBy !== 'newest'
    );
  }, [search, statusFilter, planFilter, countryFilter, creditFilter, dateFilter, sortBy]);

  const resetAllFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPlanFilter('all');
    setCountryFilter('all');
    setCreditFilter('all');
    setDateFilter('all');
    setSortBy('newest');
    setPage(1);
  };

  // 1. Fetch users, active subscriptions, and compute stats
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const [resUsers, activeSubMap] = await Promise.all([
        getUsers({ limit: 500, search: search.trim() || undefined }),
        fetchActiveSubscriptionsMap(),
      ]);

      const rawItems = extractListFromResponse<UserItem>(resUsers).items || [];
      const enrichedAll = rawItems.map((u) => enrichUserWithSubscription(u, activeSubMap));

      // Compute global stats
      const totalUsers = resUsers?.data?.meta?.total ?? resUsers?.meta?.total ?? enrichedAll.length;
      const activeUsers = enrichedAll.filter((u) => u.status !== 'deleted' && u.status !== false).length;
      const deletedUsers = enrichedAll.filter((u) => u.status === 'deleted' || u.status === false).length;
      const proUsers = enrichedAll.filter((u) => Boolean(u.isPro || u.activeSubscription)).length;
      const freeUsers = Math.max(0, totalUsers - proUsers);
      const totalAiCredit = enrichedAll.reduce(
        (sum, u) => sum + Number(u.ai_credit ?? u.aiCredit ?? 0),
        0,
      );
      const avgAiCredit = enrichedAll.length > 0 ? totalAiCredit / enrichedAll.length : 0;
      const countries = Array.from(
        new Set(enrichedAll.map((u) => u.country).filter(Boolean)),
      ) as string[];

      setStats({
        totalUsers,
        activeUsers,
        deletedUsers,
        proUsers,
        freeUsers,
        totalAiCredit,
        avgAiCredit,
        countries,
      });

      // Filter on the complete dataset
      let filtered = [...enrichedAll];

      // 1. Status Filter
      if (statusFilter === 'approved') {
        filtered = filtered.filter((u) => u.status !== 'deleted' && u.status !== false);
      } else if (statusFilter === 'deleted') {
        filtered = filtered.filter((u) => u.status === 'deleted' || u.status === false);
      }

      // 2. Plan Filter: pro vs free
      if (planFilter === 'pro') {
        filtered = filtered.filter((u) => Boolean(u.isPro || u.activeSubscription));
      } else if (planFilter === 'free') {
        filtered = filtered.filter((u) => !u.isPro && !u.activeSubscription);
      }

      // 3. Country Filter
      if (countryFilter !== 'all') {
        filtered = filtered.filter(
          (u) => (u.country || '').toLowerCase() === countryFilter.toLowerCase(),
        );
      }

      // 4. Credit Range Filter
      if (creditFilter === 'high') {
        filtered = filtered.filter((u) => Number(u.ai_credit ?? u.aiCredit ?? 0) >= 100);
      } else if (creditFilter === 'low') {
        filtered = filtered.filter((u) => {
          const c = Number(u.ai_credit ?? u.aiCredit ?? 0);
          return c > 0 && c < 20;
        });
      } else if (creditFilter === 'zero') {
        filtered = filtered.filter((u) => Number(u.ai_credit ?? u.aiCredit ?? 0) <= 0);
      }

      // 5. Date Range Filter
      if (dateFilter === '7d') {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        filtered = filtered.filter((u) => u.createdAt && new Date(u.createdAt) >= d);
      } else if (dateFilter === '30d') {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        filtered = filtered.filter((u) => u.createdAt && new Date(u.createdAt) >= d);
      } else if (dateFilter === '1y') {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        filtered = filtered.filter((u) => u.createdAt && new Date(u.createdAt) >= d);
      }

      // 6. Search Filter
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (u) =>
            (u.name || '').toLowerCase().includes(q) ||
            (u.email || '').toLowerCase().includes(q) ||
            (u.phone || '').toLowerCase().includes(q) ||
            (u.country || '').toLowerCase().includes(q) ||
            (u.self_referral_code || '').toLowerCase().includes(q),
        );
      }

      // 7. Sort
      filtered.sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        }
        if (sortBy === 'credit_high') {
          return Number(b.ai_credit ?? b.aiCredit ?? 0) - Number(a.ai_credit ?? a.aiCredit ?? 0);
        }
        if (sortBy === 'credit_low') {
          return Number(a.ai_credit ?? a.aiCredit ?? 0) - Number(b.ai_credit ?? b.aiCredit ?? 0);
        }
        if (sortBy === 'name_asc') {
          return (a.name || '').localeCompare(b.name || '');
        }
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });

      // Update total to match filtered list count
      setTotal(filtered.length);

      // 8. Pagination Slice
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);
      setUsers(paginated);
    } catch (err) {
      console.error('Failed to fetch and filter system users:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, planFilter, countryFilter, creditFilter, dateFilter, sortBy, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Debounced search on typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim() || !addEmail.trim()) {
      setAddError('Name and email are required.');
      return;
    }
    setIsAdding(true);
    setAddError(null);
    try {
      const res = await createUser({
        name: addName.trim(),
        email: addEmail.trim(),
        password: addPassword || '123456',
        role: 'user',
      });

      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg = res?.message || res?.errorMessage || 'Failed to create user.';
        setAddError(errorMsg);
        showErrorToast(errorMsg);
        return;
      }

      setShowAddModal(false);
      setAddName('');
      setAddEmail('');
      setAddPassword('');
      showSuccessAlert(res?.message || 'System user created successfully!');
      fetchUsers();
    } catch (err: any) {
      setAddError(err?.message || 'Failed to create user.');
      showErrorToast(err?.message || 'Failed to create user.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      {/* Top Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)', letterSpacing: '-0.02em' }}>
              User Management
            </h1>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--mc-brand-purple)',
                background: 'rgba(109, 61, 245, 0.1)',
                padding: '2px 8px',
                borderRadius: 12,
              }}
            >
              {stats.totalUsers || total} Total
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: '4px 0 0 0' }}>
            Comprehensive directory of registered accounts, plan subscriptions, and user metadata
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isAnyFilterActive && (
            <button
              onClick={resetAllFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 9,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                color: 'var(--mc-text-muted)',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <RotateCcw size={13} />
              Reset Filters
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn-accent"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 9,
            }}
          >
            <Plus size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* KPI Real-Time Analytics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 18,
        }}
      >
        {/* Total Users Card */}
        <div
          onClick={resetAllFilters}
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            border: isAnyFilterActive ? '1px solid var(--mc-border)' : '1.5px solid rgba(109, 61, 245, 0.5)',
            boxShadow: !isAnyFilterActive ? '0 4px 12px rgba(109, 61, 245, 0.1)' : 'var(--mc-shadow-sm)',
            borderRadius: 14,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Click to view all users"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>Total Users</span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'rgba(109, 61, 245, 0.1)',
                color: 'var(--mc-brand-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--mc-text-main)', letterSpacing: '-0.02em' }}>
            {stats.totalUsers || total || 0}
          </div>
          <div style={{ fontSize: 11, color: 'var(--mc-text-muted)', marginTop: 4 }}>
            All registered accounts
          </div>
        </div>

        {/* Active Users Card */}
        <div
          onClick={() => {
            if (statusFilter === 'approved') {
              setStatusFilter('all');
            } else {
              setStatusFilter('approved');
              setDateFilter('all');
              setPlanFilter('all');
              setCreditFilter('all');
              setCountryFilter('all');
            }
            setPage(1);
          }}
          style={{
            background: statusFilter === 'approved' ? 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' : '#FFFFFF',
            border: statusFilter === 'approved' ? '1.5px solid #22C55E' : '1px solid var(--mc-border)',
            boxShadow: statusFilter === 'approved' ? '0 4px 12px rgba(22, 163, 74, 0.15)' : 'var(--mc-shadow-sm)',
            borderRadius: 14,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Click to toggle Active filter"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: statusFilter === 'approved' ? '#166534' : 'var(--mc-text-muted)' }}>
              Active Accounts
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#DCFCE7',
                color: '#16A34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#166534', letterSpacing: '-0.02em' }}>
            {stats.activeUsers || 0}
          </div>
          <div style={{ fontSize: 11, color: statusFilter === 'approved' ? '#15803D' : 'var(--mc-text-muted)', marginTop: 4 }}>
            {statusFilter === 'approved' ? '✓ Filter active' : 'Click to filter approved'}
          </div>
        </div>

        {/* Pro Subscribers Card */}
        <div
          onClick={() => {
            if (planFilter === 'pro') {
              setPlanFilter('all');
            } else {
              setPlanFilter('pro');
              setDateFilter('all');
              setStatusFilter('all');
              setCreditFilter('all');
              setCountryFilter('all');
            }
            setPage(1);
          }}
          style={{
            background: planFilter === 'pro' ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' : '#FFFFFF',
            border: planFilter === 'pro' ? '1.5px solid #F59E0B' : '1px solid var(--mc-border)',
            boxShadow: planFilter === 'pro' ? '0 4px 12px rgba(245, 158, 11, 0.2)' : 'var(--mc-shadow-sm)',
            borderRadius: 14,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Click to toggle Pro subscribers filter"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: planFilter === 'pro' ? '#92400E' : 'var(--mc-text-muted)' }}>
              Pro Subscribers
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Crown size={16} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#B45309', letterSpacing: '-0.02em' }}>
            {stats.proUsers || 0}
          </div>
          <div style={{ fontSize: 11, color: planFilter === 'pro' ? '#92400E' : 'var(--mc-text-muted)', marginTop: 4 }}>
            {planFilter === 'pro' ? '✓ Filter active' : 'Paid active subscribers'}
          </div>
        </div>

        {/* Free Tier Card */}
        <div
          onClick={() => {
            if (planFilter === 'free') {
              setPlanFilter('all');
            } else {
              setPlanFilter('free');
              setDateFilter('all');
              setStatusFilter('all');
              setCreditFilter('all');
              setCountryFilter('all');
            }
            setPage(1);
          }}
          style={{
            background: planFilter === 'free' ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)' : '#FFFFFF',
            border: planFilter === 'free' ? '1.5px solid #3B82F6' : '1px solid var(--mc-border)',
            boxShadow: planFilter === 'free' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'var(--mc-shadow-sm)',
            borderRadius: 14,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Click to toggle Free tier filter"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: planFilter === 'free' ? '#1E40AF' : 'var(--mc-text-muted)' }}>
              Free Tier
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#DBEAFE',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={16} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1E40AF', letterSpacing: '-0.02em' }}>
            {stats.freeUsers || 0}
          </div>
          <div style={{ fontSize: 11, color: planFilter === 'free' ? '#1D4ED8' : 'var(--mc-text-muted)', marginTop: 4 }}>
            {planFilter === 'free' ? '✓ Filter active' : 'Starter & free accounts'}
          </div>
        </div>

        {/* Deleted Accounts Card */}
        <div
          onClick={() => {
            if (statusFilter === 'deleted') {
              setStatusFilter('all');
            } else {
              setStatusFilter('deleted');
              setDateFilter('all');
              setPlanFilter('all');
              setCreditFilter('all');
              setCountryFilter('all');
            }
            setPage(1);
          }}
          style={{
            background: statusFilter === 'deleted' ? 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)' : '#FFFFFF',
            border: statusFilter === 'deleted' ? '1.5px solid #EF4444' : '1px solid var(--mc-border)',
            boxShadow: statusFilter === 'deleted' ? '0 4px 12px rgba(220, 38, 38, 0.15)' : 'var(--mc-shadow-sm)',
            borderRadius: 14,
            padding: '14px 16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Click to toggle Deleted accounts filter"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: statusFilter === 'deleted' ? '#991B1B' : 'var(--mc-text-muted)' }}>
              Deleted Accounts
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserX size={16} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#991B1B', letterSpacing: '-0.02em' }}>
            {stats.deletedUsers || 0}
          </div>
          <div style={{ fontSize: 11, color: statusFilter === 'deleted' ? '#B91C1C' : 'var(--mc-text-muted)', marginTop: 4 }}>
            {statusFilter === 'deleted' ? '✓ Filter active' : 'Click to view deleted'}
          </div>
        </div>

        {/* Total AI Credits Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
            border: '1px solid #DDD6FE',
            borderRadius: 14,
            padding: '14px 16px',
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6D28D9' }}>AI Pool</span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#DDD6FE',
                color: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Coins size={16} />
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#5B21B6', letterSpacing: '-0.02em' }}>
            {Number(stats.totalAiCredit || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div style={{ fontSize: 11, color: '#6D28D9', marginTop: 4 }}>
            Avg: {Number(stats.avgAiCredit || 0).toFixed(1)} / user
          </div>
        </div>
      </div>

      {/* Professional Multi-Filter Toolbar */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--mc-border)',
          borderRadius: 14,
          padding: '12px 16px',
          marginBottom: 16,
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: 'flex', flex: 1, minWidth: 260, position: 'relative' }}
          >
            <div className="mc-input-wrapper" style={{ flex: 1 }}>
              <Search size={16} className="mc-input-icon-left" />
              <input
                type="search"
                name="admin_users_search"
                id="admin_users_search"
                autoComplete="off"
                placeholder="Search by name, email, phone, country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mc-input with-left-icon"
                style={{ height: 38, paddingRight: search ? 36 : 12, fontSize: 13 }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--mc-text-muted)',
                    padding: 4,
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Sort By Professional Dropdown */}
          <ProfessionalDropdown
            label="Sort"
            value={sortBy}
            onChange={(v) => {
              setSortBy(v);
              setPage(1);
            }}
            options={[
              { label: 'Newest Joined', value: 'newest' },
              { label: 'Oldest Joined', value: 'oldest' },
              { label: 'Highest AI Credits', value: 'credit_high' },
              { label: 'Lowest AI Credits', value: 'credit_low' },
              { label: 'Name (A-Z)', value: 'name_asc' },
            ]}
          />
        </div>

        {/* Filter Pills / Selectors Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
            paddingTop: 12,
            marginTop: 10,
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748B', fontSize: 12, fontWeight: 600, marginRight: 2 }}>
            <Filter size={13} />
            <span>Filters:</span>
          </div>

          {/* Status Dropdown */}
          <ProfessionalDropdown
            label="Status"
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v as any);
              setPage(1);
            }}
            activeColor="#16A34A"
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Active Only', value: 'approved' },
              { label: 'Deleted Only', value: 'deleted' },
            ]}
          />

          {/* Plan Dropdown */}
          <ProfessionalDropdown
            label="Plan"
            value={planFilter}
            onChange={(v) => {
              setPlanFilter(v as any);
              setPage(1);
            }}
            activeColor="#D97706"
            options={[
              { label: 'All Plans', value: 'all' },
              { label: '👑 Pro Only', value: 'pro' },
              { label: 'Free Tier', value: 'free' },
            ]}
          />

          {/* Country Dropdown */}
          <ProfessionalDropdown
            label="Country"
            value={countryFilter}
            onChange={(v) => {
              setCountryFilter(v);
              setPage(1);
            }}
            activeColor="#0284C7"
            options={[
              { label: 'All Countries', value: 'all' },
              ...(stats.countries && stats.countries.length > 0
                ? stats.countries.map((c) => ({ label: c, value: c }))
                : []),
            ]}
          />

          {/* Credit Range Dropdown */}
          <ProfessionalDropdown
            label="AI Credits"
            value={creditFilter}
            onChange={(v) => {
              setCreditFilter(v as any);
              setPage(1);
            }}
            activeColor="#7C3AED"
            options={[
              { label: 'All Credits', value: 'all' },
              { label: 'High (> 100)', value: 'high' },
              { label: 'Low (< 20)', value: 'low' },
              { label: 'Zero (0)', value: 'zero' },
            ]}
          />

          {/* Joined Date Dropdown */}
          <ProfessionalDropdown
            label="Joined"
            value={dateFilter}
            onChange={(v) => {
              setDateFilter(v as any);
              setPage(1);
            }}
            activeColor="#DB2777"
            options={[
              { label: 'All Time', value: 'all' },
              { label: 'Last 7 Days', value: '7d' },
              { label: 'Last 30 Days', value: '30d' },
              { label: 'Last 1 Year', value: '1y' },
            ]}
          />

          {/* Clear Filters Button */}
          {isAnyFilterActive && (
            <button
              onClick={resetAllFilters}
              style={{
                height: 32,
                borderRadius: 8,
                border: 'none',
                background: '#FEE2E2',
                color: '#DC2626',
                fontSize: 12,
                fontWeight: 600,
                padding: '0 10px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                marginLeft: 'auto',
              }}
            >
              <X size={12} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Users Main Table & Card Container */}
      <div className="mc-card-table">
        {/* Desktop View */}
        <div className="mc-table-wrap mc-desktop-only">
          <table className="mc-table">
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                <th>User Details</th>
                <th>Plan</th>
                <th>Country & Currency</th>
                <th>AI Remaining</th>
                <th>Joined At</th>
                <th>Status</th>
                <th style={{ textAlign: 'right', width: 80 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerTableRows
                  rows={6}
                  columns={[
                    { width: 36, align: 'center' },
                    { width: '220px', hasSubtitle: true },
                    { width: '90px', isBadge: true },
                    { width: '130px', hasSubtitle: true },
                    { width: '110px', isBadge: true },
                    { width: '110px' },
                    { width: '90px', isBadge: true },
                    { width: '60px', align: 'right' },
                  ]}
                />
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px 0', color: 'var(--mc-text-muted)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                      <UserX size={32} style={{ color: 'var(--mc-text-muted)', opacity: 0.5 }} />
                      <div style={{ fontSize: 15, fontWeight: 600 }}>No system users found matching current filters.</div>
                      {isAnyFilterActive && (
                        <button
                          onClick={resetAllFilters}
                          style={{
                            marginTop: 6,
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
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((u, index) => {
                  const isDeleted = u.status === 'deleted' || u.status === false;
                  const isPro = !!(u.isPro || u.activeSubscription);
                  const creditVal = Number(u.ai_credit ?? u.aiCredit ?? 0);
                  const planName = u.activeSubscription?.planDetails?.name;

                  return (
                    <tr key={u._id}>
                      {/* Index */}
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--mc-text-muted)', fontSize: 13 }}>
                        {(page - 1) * limit + index + 1}
                      </td>

                      {/* User Profile */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ position: 'relative' }}>
                            <img
                              src={u.image || DEFAULT_USER_IMAGE}
                              alt={u.name || 'User'}
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (target.src !== DEFAULT_USER_IMAGE) {
                                  target.src = DEFAULT_USER_IMAGE;
                                }
                              }}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                flexShrink: 0,
                                background: '#F1F5F9',
                                border: isPro ? '2px solid #F59E0B' : '1px solid var(--mc-border)',
                              }}
                            />
                            {isPro && (
                              <span
                                style={{
                                  position: 'absolute',
                                  bottom: -3,
                                  right: -3,
                                  background: '#F59E0B',
                                  color: '#FFFFFF',
                                  borderRadius: '50%',
                                  width: 15,
                                  height: 15,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 9,
                                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                }}
                                title="Pro Subscriber"
                              >
                                👑
                              </span>
                            )}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>
                                {u.name || 'Unnamed'}
                              </span>
                              {isPro && (
                                <span
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: '#D97706',
                                    background: '#FEF3C7',
                                    padding: '1px 5px',
                                    borderRadius: 4,
                                    letterSpacing: '0.04em',
                                  }}
                                >
                                  PRO
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                              {u.email}
                            </div>
                            {u.phone && (
                              <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>
                                {u.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Plan: Compact & Short */}
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {isPro ? (
                          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 2 }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                background: '#FEF3C7',
                                color: '#92400E',
                                border: '1px solid #FCD34D',
                                padding: '2px 8px',
                                borderRadius: 6,
                                fontWeight: 700,
                                fontSize: 11.5,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              👑 Pro
                            </span>
                            {planName && (
                              <span style={{ fontSize: 10.5, color: '#D97706', fontWeight: 600 }}>
                                {planName}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              background: '#F1F5F9',
                              color: '#475569',
                              border: '1px solid #E2E8F0',
                              padding: '2px 8px',
                              borderRadius: 6,
                              fontWeight: 600,
                              fontSize: 11.5,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Free
                          </span>
                        )}
                      </td>

                      {/* Country & Currency */}
                      <td>
                        <div style={{ fontSize: 13, color: 'var(--mc-text-main)', display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Globe size={13} style={{ color: 'var(--mc-text-muted)' }} />
                          <span>{u.country || 'Global'}</span>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--mc-text-muted)', marginTop: 2 }}>
                          {u.currencyCode || 'USD'} • {u.languageCode || 'en'}
                        </div>
                      </td>

                      {/* AI Remaining Credit */}
                      <td>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontWeight: 700,
                            fontSize: 13,
                            color: creditVal > 100 ? '#16A34A' : creditVal < 20 ? '#DC2626' : '#6366F1',
                            background: creditVal > 100 ? '#DCFCE7' : creditVal < 20 ? '#FEE2E2' : '#EEF2FF',
                            border: creditVal > 100 ? '1px solid #BBF7D0' : creditVal < 20 ? '1px solid #FECACA' : '1px solid #E0E7FF',
                            padding: '3px 8px',
                            borderRadius: 6,
                          }}
                        >
                          <Sparkles size={13} />
                          {creditVal.toFixed(2)}
                        </div>
                      </td>

                      {/* Joined At */}
                      <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', whiteSpace: 'nowrap' }}>
                        {u.createdAt ? (
                          <div>
                            <div>{new Date(u.createdAt).toLocaleDateString()}</div>
                            <div style={{ fontSize: 10, color: 'var(--mc-text-subtle)' }}>
                              {new Date(u.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className="mc-badge"
                          style={{
                            background: isDeleted ? '#FEE2E2' : '#DCFCE7',
                            color: isDeleted ? '#B91C1C' : '#15803D',
                            border: isDeleted ? '1px solid #FECACA' : '1px solid #BBF7D0',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontSize: 11,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: isDeleted ? '#DC2626' : '#16A34A',
                              display: 'inline-block',
                            }}
                          />
                          {isDeleted ? 'Deleted' : 'Active'}
                        </span>
                      </td>

                      {/* Actions: View Details Only */}
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => setSelectedUser(u)}
                          title="View User Details"
                          style={{
                            padding: '6px 12px',
                            background: '#EFF6FF',
                            border: '1px solid #BFDBFE',
                            borderRadius: 7,
                            cursor: 'pointer',
                            color: '#2563EB',
                            fontSize: 12,
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#DBEAFE';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#EFF6FF';
                          }}
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Native Card View (< 768px) */}
        <div className="mc-mobile-only">
          {loading ? (
            <ShimmerMobileCardList count={4} rowsCount={4} hasTags={true} />
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              <UserX size={32} style={{ color: 'var(--mc-text-muted)', opacity: 0.5, marginBottom: 8 }} />
              <div>No system users found matching current filters.</div>
            </div>
          ) : (
            <div className="mc-mobile-card-list">
              {users.map((u, index) => {
                const isDeleted = u.status === 'deleted' || u.status === false;
                const isPro = !!(u.isPro || u.activeSubscription);
                const creditVal = Number(u.ai_credit ?? u.aiCredit ?? 0).toFixed(2);
                const planName = u.activeSubscription?.planDetails?.name;

                return (
                  <div key={u._id} className="mc-mobile-card">
                    {/* Header */}
                    <div className="mc-mobile-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <div style={{ position: 'relative' }}>
                          <img
                            src={u.image || DEFAULT_USER_IMAGE}
                            alt={u.name || 'User'}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src !== DEFAULT_USER_IMAGE) {
                                target.src = DEFAULT_USER_IMAGE;
                              }
                            }}
                            style={{
                              width: 38,
                              height: 38,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              flexShrink: 0,
                              background: '#F1F5F9',
                              border: isPro ? '2px solid #F59E0B' : '1px solid var(--mc-border)',
                            }}
                          />
                          {isPro && (
                            <span
                              style={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                background: '#F59E0B',
                                color: '#FFF',
                                borderRadius: '50%',
                                width: 14,
                                height: 14,
                                fontSize: 9,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              👑
                            </span>
                          )}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div className="mc-mobile-card-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span>#{((page - 1) * limit + index + 1)} {u.name || 'Unnamed'}</span>
                            {isPro && (
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: '#D97706',
                                  background: '#FEF3C7',
                                  padding: '1px 5px',
                                  borderRadius: 4,
                                }}
                              >
                                PRO
                              </span>
                            )}
                          </div>
                          <div className="mc-mobile-card-sub">{u.email}</div>
                        </div>
                      </div>

                      <span
                        className="mc-badge"
                        style={{
                          background: isDeleted ? '#FEE2E2' : '#DCFCE7',
                          color: isDeleted ? '#B91C1C' : '#15803D',
                          border: isDeleted ? '1px solid #FECACA' : '1px solid #BBF7D0',
                          fontSize: 10,
                          fontWeight: 600,
                        }}
                      >
                        {isDeleted ? 'Deleted' : 'Active'}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="mc-mobile-card-body">
                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">Plan:</span>
                        <span className="mc-mobile-card-value">
                          {isPro ? (
                            <span style={{ fontWeight: 700, color: '#D97706' }}>
                              👑 Pro {planName ? `• ${planName}` : ''}
                            </span>
                          ) : (
                            <span style={{ color: '#475569' }}>Free</span>
                          )}
                        </span>
                      </div>

                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">Country:</span>
                        <span className="mc-mobile-card-value">
                          {u.country || 'Global'} ({u.currencyCode || 'USD'})
                        </span>
                      </div>

                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">AI Credit:</span>
                        <span className="mc-mobile-card-value" style={{ fontWeight: 700, color: '#6366F1' }}>
                          ✨ {creditVal}
                        </span>
                      </div>

                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">Joined:</span>
                        <span className="mc-mobile-card-value">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions: View Only */}
                    <div className="mc-mobile-card-actions">
                      <button
                        className="mc-mobile-card-btn"
                        onClick={() => setSelectedUser(u)}
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <Eye size={13} color="#2563EB" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Table Footer with Pagination */}
        <div className="mc-table-footer">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
              Showing {users.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
              {Math.min(page * limit, total)} of {total} users
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>Per Page:</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  style={{
                    height: 32,
                    padding: '0 8px',
                    borderRadius: 6,
                    border: '1px solid var(--mc-border)',
                    fontSize: 12,
                    outline: 'none',
                    background: '#FFFFFF',
                  }}
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button
                  className="mc-page-btn"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <span style={{ padding: '6px 10px', fontWeight: 600, fontSize: 13 }}>Page {page}</span>
                <button
                  className="mc-page-btn"
                  disabled={users.length < limit || loading}
                  onClick={() => setPage((p) => p + 1)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <div className="mc-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div
            className="mc-modal-card"
            style={{ maxWidth: 640, width: '92%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: '#EEF2FF',
                    color: '#4F46E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Eye size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                    User Profile & Metadata
                  </h3>
                  <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    ID: {selectedUser._id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--mc-text-muted)',
                  padding: 4,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body" style={{ maxHeight: '74vh', overflowY: 'auto' }}>
              {/* Profile summary banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                  borderRadius: 12,
                  border: '1px solid var(--mc-border)',
                  marginBottom: 16,
                }}
              >
                <img
                  src={selectedUser.image || DEFAULT_USER_IMAGE}
                  alt={selectedUser.name || 'User'}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== DEFAULT_USER_IMAGE) {
                      target.src = DEFAULT_USER_IMAGE;
                    }
                  }}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                    background: '#F1F5F9',
                    border: (selectedUser.isPro || selectedUser.activeSubscription) ? '2px solid #F59E0B' : '1px solid var(--mc-border)',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--mc-text-main)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{selectedUser.name || 'Unnamed User'}</span>
                    {(selectedUser.isPro || selectedUser.activeSubscription) && (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#D97706',
                          background: '#FEF3C7',
                          border: '1px solid #FCD34D',
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}
                      >
                        👑 PRO SUBSCRIBER
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--mc-text-muted)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span>{selectedUser.email}</span>
                    {selectedUser.phone && <span>• {selectedUser.phone}</span>}
                  </div>
                </div>
                <span
                  className="mc-badge"
                  style={{
                    background: (selectedUser.status === 'deleted' || selectedUser.status === false) ? '#FEE2E2' : '#DCFCE7',
                    color: (selectedUser.status === 'deleted' || selectedUser.status === false) ? '#B91C1C' : '#15803D',
                    border: (selectedUser.status === 'deleted' || selectedUser.status === false) ? '1px solid #FECACA' : '1px solid #BBF7D0',
                    fontWeight: 600,
                    padding: '4px 10px',
                    fontSize: 11,
                  }}
                >
                  {(selectedUser.status === 'deleted' || selectedUser.status === false) ? 'Deleted' : 'Active'}
                </span>
              </div>

              {/* Active Subscription Details (If Pro) */}
              {(selectedUser.activeSubscription || selectedUser.isPro) && (
                <div
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
                    border: '1px solid #FCD34D',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <Crown size={14} color="#D97706" />
                    Active Google Play Subscription Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, fontSize: 12 }}>
                    <div>
                      <span style={{ color: '#92400E', fontWeight: 600 }}>Plan Name: </span>
                      <span style={{ fontWeight: 700, color: '#78350F' }}>
                        {selectedUser.activeSubscription?.planDetails?.name || 'Pro Plan'}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#92400E', fontWeight: 600 }}>Expiry / Renewal: </span>
                      <span style={{ fontWeight: 700, color: '#78350F' }}>
                        {selectedUser.activeSubscription?.expiryTime
                          ? new Date(selectedUser.activeSubscription.expiryTime).toLocaleDateString()
                          : 'Active'}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: '#92400E', fontWeight: 600 }}>Auto-Renewing: </span>
                      <span style={{ fontWeight: 700, color: selectedUser.activeSubscription?.autoRenewing ? '#16A34A' : '#DC2626' }}>
                        {selectedUser.activeSubscription?.autoRenewing ? 'Yes (Active)' : 'Cancelled / Expiring'}
                      </span>
                    </div>
                    {selectedUser.activeSubscription?.orderId && (
                      <div>
                        <span style={{ color: '#92400E', fontWeight: 600 }}>Order ID: </span>
                        <span style={{ fontFamily: 'monospace', color: '#78350F' }}>
                          {selectedUser.activeSubscription.orderId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Key Highlights Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                {/* AI Remaining Credit */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#F5F3FF',
                    border: '1px solid #DDD6FE',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#6D28D9', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <Sparkles size={13} />
                    AI Remaining Credit
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#5B21B6' }}>
                    {Number(selectedUser.ai_credit ?? selectedUser.aiCredit ?? 0).toFixed(2)}
                  </div>
                  {selectedUser.ai_assigned_credit !== undefined && (
                    <div style={{ fontSize: 11, color: '#7C3AED', marginTop: 2 }}>
                      Assigned: {Number(selectedUser.ai_assigned_credit).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Country */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#F0F9FF',
                    border: '1px solid #BAE6FD',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#0369A1', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <Globe size={13} />
                    Country
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#075985' }}>
                    {selectedUser.country || 'Global'}
                  </div>
                </div>

                {/* Currency & Language */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: '#F8FAFC',
                    border: '1px solid var(--mc-border)',
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--mc-text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                    <Coins size={13} />
                    Currency / Lang
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--mc-text-main)' }}>
                    {selectedUser.currencyCode || 'USD'} / {selectedUser.languageCode || 'en'}
                  </div>
                </div>
              </div>

              {/* Detailed Info Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 14,
                  fontSize: 13,
                  borderTop: '1px solid var(--mc-border)',
                  paddingTop: 16,
                }}
              >
                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Full Name</div>
                  <div style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    {selectedUser.name || '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Email Address</div>
                  <div style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>
                    {selectedUser.email || '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Phone Number</div>
                  <div style={{ fontWeight: 500, color: 'var(--mc-text-main)' }}>
                    {selectedUser.phone || '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Role</div>
                  <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {selectedUser.role || 'User'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Self Referral Code</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--mc-brand-purple)' }}>
                    {selectedUser.self_referral_code || '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Gender</div>
                  <div style={{ textTransform: 'capitalize', color: 'var(--mc-text-main)' }}>
                    {selectedUser.gender || '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Date of Birth</div>
                  <div style={{ color: 'var(--mc-text-main)' }}>
                    {selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString() : '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Address</div>
                  <div style={{ color: 'var(--mc-text-main)' }}>
                    {selectedUser.address || '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Registered Date</div>
                  <div style={{ color: 'var(--mc-text-muted)', fontSize: 12 }}>
                    {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Last Updated</div>
                  <div style={{ color: 'var(--mc-text-muted)', fontSize: 12 }}>
                    {selectedUser.updatedAt ? new Date(selectedUser.updatedAt).toLocaleString() : '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mc-modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <button
                onClick={() => setSelectedUser(null)}
                className="mc-btn-accent"
                style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 480 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Add System User
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateUser}>
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
                      marginBottom: 14,
                    }}
                  >
                    {addError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Full Name *</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. John Doe"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Email Address *</label>
                    <input
                      type="email"
                      className="mc-input"
                      placeholder="john@example.com"
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Initial Password</label>
                  <input
                    type="password"
                    className="mc-input"
                    placeholder="Defaults to 123456 if empty"
                    value={addPassword}
                    onChange={(e) => setAddPassword(e.target.value)}
                  />
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
                  {isAdding ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export { SystemUsersPage as UsersTab };
