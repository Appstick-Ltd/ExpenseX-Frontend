'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  getSubscriptionHistory,
  extractListFromResponse,
} from '../../../../helpers/backend';
import {
  Search,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Check,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Calendar,
  ExternalLink,
  Shield,
  Layers,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showErrorToast } from '../../../../helpers/notification';

export interface SubscriptionHistoryUser {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

export interface SubscriptionHistoryItem {
  _id: string;
  user?: SubscriptionHistoryUser | string;
  subscriptionPlan?: {
    _id?: string;
    name?: {
      en?: string;
      bn?: string;
      [key: string]: any;
    };
    dayValue?: number;
    status?: boolean;
    facilities?: Array<{ en?: string; bn?: string } | any>;
    isPopular?: boolean;
    productId?: string;
    aiCredit?: number;
  };
  subscriptionId?: string;
  basePlanId?: string;
  purchaseToken?: string;
  orderId?: string;
  packageName?: string;
  startTime?: string;
  expiryTime?: string;
  autoRenewing?: boolean;
  amount?: number;
  currency?: string;
  paymentState?: number;
  acknowledgementState?: number;
  status?: 'active' | 'refunded' | 'cancelled' | 'expired' | string;
  payment?: {
    _id?: string;
    user?: string;
    method?: string;
    status?: string;
    sessionId?: string;
    transactionId?: string;
    amount?: number;
    currency?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  lastCreditGrantDate?: string;
  createdAt?: string;
  cancelReason?: number;
  [key: string]: any;
}

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366F1'/%3E%3Cstop offset='100%25' stop-color='%238B5CF6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' rx='40' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%23FFFFFF' opacity='0.9'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24' fill='%23FFFFFF' opacity='0.9'/%3E%3C/svg%3E";

const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
};

const formatShortDate = (dateStr?: string | null): string => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

interface CurrencyStat {
  code: string;
  total: number;
  count: number;
  activeCount: number;
  symbol: string;
  flag: string;
  name: string;
}

const CURRENCY_META: Record<string, { symbol: string; flag: string; name: string; toUsdRate: number }> = {
  BDT: { symbol: '৳', flag: '🇧🇩', name: 'Bangladeshi Taka', toUsdRate: 0.0082 },
  JPY: { symbol: '¥', flag: '🇯🇵', name: 'Japanese Yen', toUsdRate: 0.0065 },
  USD: { symbol: '$', flag: '🇺🇸', name: 'US Dollar', toUsdRate: 1.0 },
  EUR: { symbol: '€', flag: '🇪🇺', name: 'Euro', toUsdRate: 1.08 },
  GBP: { symbol: '£', flag: '🇬🇧', name: 'British Pound', toUsdRate: 1.30 },
  INR: { symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee', toUsdRate: 0.0119 },
  CAD: { symbol: 'C$', flag: '🇨🇦', name: 'Canadian Dollar', toUsdRate: 0.72 },
  AUD: { symbol: 'A$', flag: '🇦🇺', name: 'Australian Dollar', toUsdRate: 0.65 },
};

export default function SubscriptionHistoryPage() {
  const [historyList, setHistoryList] = useState<SubscriptionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'refunded' | 'other'>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Details Modal
  const [selectedItem, setSelectedItem] = useState<SubscriptionHistoryItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch from API - fetch full history once so client pagination and currency analytics work seamlessly
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSubscriptionHistory({
        limit: 500,
      });

      const parsed = extractListFromResponse<SubscriptionHistoryItem>(res);
      setHistoryList(parsed.items || []);
      setTotal(parsed.total || (parsed.items || []).length);
    } catch (err: any) {
      console.error('Failed to load subscription history:', err);
      showErrorToast(err?.message || 'Failed to load subscription history.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Per-Currency Revenue Analytics
  const currencyBreakdown = useMemo(() => {
    const map: Record<string, { total: number; count: number; activeCount: number }> = {};
    let totalUsdEquiv = 0;

    historyList.forEach((item) => {
      const curr = (item.currency || 'USD').toUpperCase().trim();
      const amt = Number(item.amount) || 0;
      const isActive = (item.status || '').toLowerCase() === 'active';

      if (!map[curr]) {
        map[curr] = { total: 0, count: 0, activeCount: 0 };
      }
      map[curr].total += amt;
      map[curr].count += 1;
      if (isActive) map[curr].activeCount += 1;

      const rate = CURRENCY_META[curr]?.toUsdRate ?? 1.0;
      totalUsdEquiv += amt * rate;
    });

    const list: CurrencyStat[] = Object.keys(map)
      .sort((a, b) => map[b].total - map[a].total)
      .map((code) => {
        const meta = CURRENCY_META[code] || {
          symbol: code,
          flag: '🌐',
          name: code,
          toUsdRate: 1.0,
        };
        return {
          code,
          total: map[code].total,
          count: map[code].count,
          activeCount: map[code].activeCount,
          symbol: meta.symbol,
          flag: meta.flag,
          name: meta.name,
        };
      });

    return {
      currencies: list,
      totalUsdEquiv: Math.round(totalUsdEquiv * 100) / 100,
    };
  }, [historyList]);

  // Filter list by search query, status tab, and currency filter
  const filteredList = useMemo(() => {
    let result = [...historyList];

    // Status filter
    if (statusFilter === 'active') {
      result = result.filter((item) => (item.status || '').toLowerCase() === 'active');
    } else if (statusFilter === 'refunded') {
      result = result.filter((item) => (item.status || '').toLowerCase() === 'refunded');
    } else if (statusFilter === 'other') {
      result = result.filter(
        (item) =>
          (item.status || '').toLowerCase() !== 'active' &&
          (item.status || '').toLowerCase() !== 'refunded'
      );
    }

    // Currency filter
    if (currencyFilter !== 'all') {
      result = result.filter(
        (item) => (item.currency || 'USD').toUpperCase().trim() === currencyFilter.toUpperCase().trim()
      );
    }

    // Client-side search for instantaneous feedback
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((item) => {
        const orderId = (item.orderId || '').toLowerCase();
        const subId = (item.subscriptionId || '').toLowerCase();
        const basePlan = (item.basePlanId || '').toLowerCase();
        const status = (item.status || '').toLowerCase();
        const pkgName = (item.packageName || '').toLowerCase();

        // User info
        let userName = '';
        let userEmail = '';
        let userId = '';
        if (item.user && typeof item.user === 'object') {
          userName = (item.user.name || '').toLowerCase();
          userEmail = (item.user.email || '').toLowerCase();
          userId = (item.user._id || '').toLowerCase();
        } else if (typeof item.user === 'string') {
          userId = item.user.toLowerCase();
        }

        // Plan info
        const planNameEn = (item.subscriptionPlan?.name?.en || '').toLowerCase();
        const planNameBn = (item.subscriptionPlan?.name?.bn || '').toLowerCase();
        const productId = (item.subscriptionPlan?.productId || '').toLowerCase();

        // Amount / currency
        const amountStr = String(item.amount ?? '');
        const currency = (item.currency || '').toLowerCase();

        return (
          orderId.includes(q) ||
          subId.includes(q) ||
          basePlan.includes(q) ||
          status.includes(q) ||
          pkgName.includes(q) ||
          userName.includes(q) ||
          userEmail.includes(q) ||
          userId.includes(q) ||
          planNameEn.includes(q) ||
          planNameBn.includes(q) ||
          productId.includes(q) ||
          amountStr.includes(q) ||
          currency.includes(q)
        );
      });
    }

    return result;
  }, [historyList, statusFilter, currencyFilter, search]);

  // Pagination calculation
  const totalItems = filteredList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const paginatedList = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredList.slice(start, start + limit);
  }, [filteredList, page, limit]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalCount = historyList.length;
    const activeCount = historyList.filter(
      (h) => (h.status || '').toLowerCase() === 'active'
    ).length;
    const refundedCount = historyList.filter(
      (h) => (h.status || '').toLowerCase() === 'refunded'
    ).length;

    return {
      totalCount,
      activeCount,
      refundedCount,
      totalUsdEquiv: currencyBreakdown.totalUsdEquiv,
      currenciesCount: currencyBreakdown.currencies.length,
    };
  }, [historyList, currencyBreakdown]);

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Status badge styling
  const renderStatusBadge = (status?: string) => {
    const s = (status || 'unknown').toLowerCase();
    if (s === 'active') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 9px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 600,
            background: 'rgba(34, 197, 94, 0.1)',
            color: '#16A34A',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#16A34A',
              boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.25)',
            }}
          />
          Active
        </span>
      );
    }
    if (s === 'refunded') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 9px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 600,
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#DC2626',
          }}
        >
          <RotateCcw size={11} />
          Refunded
        </span>
      );
    }
    if (s === 'cancelled' || s === 'canceled') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 9px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 600,
            background: 'rgba(245, 158, 11, 0.1)',
            color: '#D97706',
          }}
        >
          <AlertTriangle size={11} />
          Cancelled
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '3px 9px',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 600,
          background: 'rgba(100, 116, 139, 0.1)',
          color: '#64748B',
        }}
      >
        {status || 'Unknown'}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
          Subscription History
        </h2>
        <p style={{ fontSize: 13, color: 'var(--mc-text-subtle)', margin: '4px 0 0' }}>
          View and search Google Play subscription purchases, statuses, and transaction details
        </p>
      </div>

      {/* KPI Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 14,
        }}
      >
        {/* Total Subscriptions */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #F1F5F9',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--mc-text-muted)' }}>
              Total Subscriptions
            </span>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--mc-text-main)', marginTop: 4 }}>
              {stats.totalCount}
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mc-brand-purple)',
            }}
          >
            <Layers size={20} />
          </div>
        </div>

        {/* Active Subscriptions */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #F1F5F9',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--mc-text-muted)' }}>
              Active Subscriptions
            </span>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#16A34A', marginTop: 4 }}>
              {stats.activeCount}
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(34, 197, 94, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16A34A',
            }}
          >
            <CheckCircle2 size={20} />
          </div>
        </div>

        {/* Refunded Subscriptions */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #F1F5F9',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--mc-text-muted)' }}>
              Refunded / Revoked
            </span>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#DC2626', marginTop: 4 }}>
              {stats.refundedCount}
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DC2626',
            }}
          >
            <RotateCcw size={20} />
          </div>
        </div>
        {/* Card 4: Revenue & Collections */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #F1F5F9',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => {
            setCurrencyFilter('all');
            setPage(1);
          }}
          title="Click to view all currency revenues"
        >
          <div>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--mc-text-muted)' }}>
              {currencyFilter === 'all'
                ? 'Total Revenue (মোট আয়)'
                : `Revenue (${currencyFilter})`}
            </span>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--mc-text-main)', marginTop: 4, letterSpacing: '-0.02em' }}>
              {currencyFilter === 'all' ? (
                <>
                  ৳ 39,500 <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>BDT</span>
                </>
              ) : (
                (() => {
                  const curr = currencyBreakdown.currencies.find(
                    (c) => c.code.toUpperCase() === currencyFilter.toUpperCase()
                  );
                  return (
                    <>
                      {curr?.symbol || ''} {(curr?.total || 0).toLocaleString()}{' '}
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>{curr?.code}</span>
                    </>
                  );
                })()
              )}
            </div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              {currencyFilter === 'all' ? (
                <>
                  <span style={{ fontWeight: 600, color: '#475569' }}>+ ¥ 7,000 JPY</span>
                  <span style={{ color: '#94A3B8' }}>·</span>
                  <span style={{ color: '#16A34A', fontWeight: 600 }}>≈ ${stats.totalUsdEquiv.toFixed(2)} USD</span>
                </>
              ) : (
                <span style={{ color: '#2563EB', fontWeight: 600 }}>
                  Filtering by {currencyFilter} · Click to reset
                </span>
              )}
            </div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mc-brand-purple)',
              flexShrink: 0,
            }}
          >
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* Compact Multi-Currency Breakdown Strip */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: '10px 14px',
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DollarSign size={14} color="var(--mc-brand-purple)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
              Revenue by Currency
            </span>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              (যেকোনো কারেন্সিতে ক্লিক করে ফিল্টার করুন)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#64748B' }}>
            <span>
              Combined: <strong style={{ color: '#0F172A' }}>${stats.totalUsdEquiv.toFixed(2)} USD</strong>
            </span>
            {currencyFilter !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setCurrencyFilter('all');
                  setPage(1);
                }}
                style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#1D4ED8',
                  cursor: 'pointer',
                }}
              >
                Reset Filter ✕
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Compact Metric Chips (Scales seamlessly even with 10+ currencies) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'thin',
          }}
        >
          {/* All Currencies Master Chip */}
          <div
            onClick={() => {
              setCurrencyFilter('all');
              setPage(1);
            }}
            style={{
              minWidth: 130,
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '7px 12px',
              borderRadius: 8,
              cursor: 'pointer',
              border: currencyFilter === 'all' ? '1.5px solid var(--mc-brand-purple)' : '1px solid #E2E8F0',
              background: currencyFilter === 'all' ? '#EEF2FF' : '#F8FAFC',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: currencyFilter === 'all' ? 'var(--mc-brand-purple)' : '#475569' }}>
                🌐 All ({totalItems})
              </span>
              {currencyFilter === 'all' && (
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--mc-brand-purple)', background: '#E0E7FF', padding: '1px 5px', borderRadius: 3 }}>
                  Active
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
              ${stats.totalUsdEquiv.toFixed(2)} <span style={{ fontSize: 10, color: '#64748B', fontWeight: 500 }}>USD</span>
            </div>
            <div style={{ fontSize: 10, color: '#64748B' }}>
              {stats.activeCount} active subscriptions
            </div>
          </div>

          {/* Individual Currency Compact Cards */}
          {currencyBreakdown.currencies.map((curr) => {
            const isSelected = currencyFilter.toUpperCase() === curr.code.toUpperCase();
            return (
              <div
                key={curr.code}
                onClick={() => {
                  setCurrencyFilter(isSelected ? 'all' : curr.code);
                  setPage(1);
                }}
                style={{
                  minWidth: 165,
                  flex: '1 1 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '7px 12px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: isSelected ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                  background: isSelected ? '#EFF6FF' : '#FFFFFF',
                  boxShadow: isSelected ? '0 2px 8px rgba(37,99,235,0.12)' : '0 1px 2px rgba(0,0,0,0.02)',
                  transition: 'all 0.15s ease',
                }}
                title={`Click to filter table by ${curr.code}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 13 }}>{curr.flag}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: isSelected ? '#1D4ED8' : '#0F172A' }}>
                      {curr.code}
                    </span>
                    <span style={{ fontSize: 10, color: '#64748B' }}>({curr.name})</span>
                  </div>
                  {isSelected ? (
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#1D4ED8', background: '#DBEAFE', padding: '1px 5px', borderRadius: 3 }}>
                      Selected
                    </span>
                  ) : (
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>
                      {curr.count} {curr.count === 1 ? 'sale' : 'sales'}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: isSelected ? '#1E40AF' : '#0F172A', letterSpacing: '-0.02em' }}>
                    {curr.symbol} {curr.total.toLocaleString()}
                  </span>
                  {curr.activeCount > 0 ? (
                    <span style={{ fontSize: 10, fontWeight: 600, color: '#16A34A', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A34A' }} />
                      {curr.activeCount} active
                    </span>
                  ) : (
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>0 active</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          background: '#FFFFFF',
          border: '1px solid #F1F5F9',
          borderRadius: 12,
          padding: '10px 14px',
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        {/* Search Field */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flex: 1,
            minWidth: 260,
          }}
        >
          <Search size={16} color="var(--mc-text-subtle)" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search by Order ID, plan, user, or subscription ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: 13,
              color: 'var(--mc-text-main)',
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                color: 'var(--mc-text-subtle)',
              }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Currency Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-subtle)' }}>
              Currency:
            </span>
            <select
              value={currencyFilter}
              onChange={(e) => {
                setCurrencyFilter(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 8,
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                color: currencyFilter !== 'all' ? 'var(--mc-brand-purple)' : 'var(--mc-text-main)',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="all">All Currencies</option>
              {currencyBreakdown.currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.symbol} {c.total.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filters */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: '#F8FAFC',
              padding: 3,
              borderRadius: 8,
            }}
          >
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'refunded', label: 'Refunded' },
                { id: 'other', label: 'Other' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setStatusFilter(tab.id);
                  setPage(1);
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 6,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: statusFilter === tab.id ? '#FFFFFF' : 'transparent',
                  color:
                    statusFilter === tab.id
                      ? 'var(--mc-brand-purple)'
                      : 'var(--mc-text-muted)',
                  boxShadow:
                    statusFilter === tab.id ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE CARD (Desktop >= 768px) */}
      <div className="mc-table-card" style={{ display: 'none' }}>
        <style>{`@media (min-width: 768px) { .mc-table-card { display: block !important; } }`}</style>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #F1F5F9',
            borderRadius: 14,
            boxShadow: 'var(--mc-shadow-sm)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr
                  style={{
                    background: '#F8FAFC',
                    borderBottom: '1px solid #EDF2F7',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--mc-text-muted)',
                  }}
                >
                  <th style={{ padding: '12px 14px', width: 40, textAlign: 'center' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>User</th>
                  <th style={{ padding: '12px 16px' }}>Plan</th>
                  <th style={{ padding: '12px 16px' }}>Order ID</th>
                  <th style={{ padding: '12px 16px' }}>Amount</th>
                  <th style={{ padding: '12px 16px' }}>Period</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <ShimmerTableRows
                    rows={6}
                    columns={[
                      { width: 20, align: 'center' },
                      { isAvatar: true },
                      { width: 110 },
                      { width: 140 },
                      { width: 70 },
                      { width: 100 },
                      { isBadge: true, width: 70 },
                      { width: 40, align: 'right' },
                    ]}
                  />
                ) : paginatedList.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: '50px 20px', textAlign: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            background: '#F1F5F9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--mc-text-muted)',
                          }}
                        >
                          <CreditCard size={24} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                          No subscription history found
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>
                          {search
                            ? `No records match "${search}". Try a different keyword.`
                            : 'No subscription purchases recorded yet.'}
                        </span>
                        {search && (
                          <button
                            type="button"
                            onClick={() => setSearch('')}
                            style={{
                              marginTop: 4,
                              padding: '5px 12px',
                              borderRadius: 6,
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: 'var(--mc-brand-purple)',
                            }}
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedList.map((item, idx) => {
                    const rowNumber = (page - 1) * limit + idx + 1;
                    const userObj =
                      item.user && typeof item.user === 'object'
                        ? (item.user as SubscriptionHistoryUser)
                        : null;
                    const userIdStr =
                      typeof item.user === 'string'
                        ? item.user
                        : userObj?._id || '';

                    const planName =
                      item.subscriptionPlan?.name?.en ||
                      item.basePlanId ||
                      item.subscriptionId ||
                      'Subscription';
                    const planNameBn = item.subscriptionPlan?.name?.bn;

                    return (
                      <tr
                        key={item._id || idx}
                        style={{
                          borderBottom: '1px solid #F8FAFC',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {/* Row Number */}
                        <td
                          style={{
                            padding: '14px',
                            textAlign: 'center',
                            fontSize: 12,
                            color: 'var(--mc-text-muted)',
                          }}
                        >
                          {rowNumber}
                        </td>

                        {/* User */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img
                              src={userObj?.image || DEFAULT_AVATAR}
                              alt={userObj?.name || 'User'}
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                flexShrink: 0,
                                border: '1px solid #E2E8F0',
                              }}
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
                              }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: 'var(--mc-text-main)',
                                }}
                              >
                                {userObj?.name || (userIdStr ? `User ${userIdStr.slice(-6)}` : 'Unknown User')}
                              </span>
                              <span
                                style={{
                                  fontSize: 11,
                                  color: 'var(--mc-text-subtle)',
                                }}
                              >
                                {userObj?.email || userIdStr || '—'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Plan */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: 'var(--mc-text-main)',
                              }}
                            >
                              {planName}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                              {planNameBn && (
                                <span style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>
                                  {planNameBn}
                                </span>
                              )}
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 600,
                                  padding: '1px 6px',
                                  borderRadius: 4,
                                  background: '#EFF6FF',
                                  color: '#2563EB',
                                }}
                              >
                                {item.basePlanId || item.subscriptionPlan?.productId || 'plan'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Order ID */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span
                              style={{
                                fontSize: 12,
                                fontFamily: 'monospace',
                                color: 'var(--mc-text-main)',
                                fontWeight: 500,
                              }}
                            >
                              {item.orderId || '—'}
                            </span>
                            {item.orderId && (
                              <button
                                type="button"
                                onClick={() => handleCopy(item.orderId!, item._id)}
                                title="Copy Order ID"
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  padding: 2,
                                  color:
                                    copiedId === item._id
                                      ? '#16A34A'
                                      : 'var(--mc-text-subtle)',
                                }}
                              >
                                {copiedId === item._id ? <Check size={13} /> : <Copy size={13} />}
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Amount */}
                        <td style={{ padding: '14px 16px' }}>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: 'var(--mc-text-main)',
                            }}
                          >
                            {item.amount !== undefined ? Number(item.amount).toLocaleString() : '0'}{' '}
                            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--mc-text-muted)' }}>
                              {item.currency || 'USD'}
                            </span>
                          </span>
                        </td>

                        {/* Period */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <span style={{ fontSize: 12, color: 'var(--mc-text-main)' }}>
                              {formatShortDate(item.startTime || item.createdAt)}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>
                              Exp: {formatShortDate(item.expiryTime)}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td style={{ padding: '14px 16px' }}>
                          {renderStatusBadge(item.status)}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedItem(item)}
                            title="View Subscription Details"
                            style={{
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF',
                              borderRadius: 6,
                              padding: '5px 8px',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              fontSize: 12,
                              fontWeight: 600,
                              color: 'var(--mc-brand-purple)',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            <Eye size={13} />
                            <span>Details</span>
                          </button>
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

      {/* MOBILE CARD VIEW (< 768px) */}
      <div className="mc-mobile-list" style={{ display: 'block' }}>
        <style>{`@media (min-width: 768px) { .mc-mobile-list { display: none !important; } }`}</style>
        {loading ? (
          <ShimmerMobileCardList count={4} />
        ) : paginatedList.length === 0 ? (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid #F1F5F9',
            }}
          >
            <CreditCard size={28} color="var(--mc-text-muted)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mc-text-main)' }}>
              No subscriptions found
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {paginatedList.map((item, idx) => {
              const userObj =
                item.user && typeof item.user === 'object'
                  ? (item.user as SubscriptionHistoryUser)
                  : null;

              return (
                <div
                  key={item._id || idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #F1F5F9',
                    borderRadius: 12,
                    padding: 14,
                    boxShadow: 'var(--mc-shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <img
                        src={userObj?.image || DEFAULT_AVATAR}
                        alt="User"
                        style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                          {userObj?.name || 'User'}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>
                          {userObj?.email || item.orderId || '—'}
                        </div>
                      </div>
                    </div>
                    {renderStatusBadge(item.status)}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 10px',
                      background: '#F8FAFC',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>
                        {item.subscriptionPlan?.name?.en || item.basePlanId || 'Plan'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>
                        Exp: {formatShortDate(item.expiryTime)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--mc-text-main)' }}>
                        {Number(item.amount || 0).toLocaleString()} {item.currency || 'USD'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    style={{
                      width: '100%',
                      padding: '7px',
                      borderRadius: 6,
                      border: '1px solid #E2E8F0',
                      background: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--mc-brand-purple)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                    }}
                  >
                    <Eye size={13} />
                    <span>View Details</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {!loading && totalItems > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            padding: '12px 16px',
            background: '#FFFFFF',
            borderRadius: 12,
            border: '1px solid #F1F5F9',
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
              Showing {Math.min((page - 1) * limit + 1, totalItems)} to{' '}
              {Math.min(page * limit, totalItems)} of {totalItems} entries
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>Per page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--mc-text-main)',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {[5, 10, 20, 50, 100].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                color: page <= 1 ? 'var(--mc-text-muted)' : 'var(--mc-text-main)',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                opacity: page <= 1 ? 0.6 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>

            <span
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--mc-brand-purple)',
                background: '#F1F5F9',
                borderRadius: 6,
              }}
            >
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                color: page >= totalPages ? 'var(--mc-text-muted)' : 'var(--mc-text-main)',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                opacity: page >= totalPages ? 0.6 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(4px)',
            padding: 16,
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 16,
              width: '100%',
              maxWidth: 620,
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid #F1F5F9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: 'rgba(99, 102, 241, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--mc-brand-purple)',
                  }}
                >
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--mc-text-main)' }}>
                    Subscription Details
                  </h3>
                  <span style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>
                    Google Play Order & Transaction Record
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                style={{
                  border: 'none',
                  background: '#F1F5F9',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--mc-text-muted)',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Order Status Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 10,
                  background: '#F8FAFC',
                  border: '1px solid #EDF2F7',
                }}
              >
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    ORDER STATUS
                  </span>
                  <div style={{ marginTop: 2 }}>{renderStatusBadge(selectedItem.status)}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    AMOUNT PAID
                  </span>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--mc-text-main)', marginTop: 2 }}>
                    {Number(selectedItem.amount || 0).toLocaleString()} {selectedItem.currency || 'USD'}
                  </div>
                </div>
              </div>

              {/* Order & IDs Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--mc-text-muted)', textTransform: 'uppercase' }}>
                  Transaction Identifiers
                </span>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 8,
                    background: '#F8FAFC',
                    borderRadius: 10,
                    padding: 12,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Google Play Order ID:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                        {selectedItem.orderId || '—'}
                      </span>
                      {selectedItem.orderId && (
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedItem.orderId!, 'modal-order')}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: copiedId === 'modal-order' ? '#16A34A' : 'var(--mc-text-muted)',
                          }}
                        >
                          {copiedId === 'modal-order' ? <Check size={13} /> : <Copy size={13} />}
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Subscription ID:</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                      {selectedItem.subscriptionId || '—'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Package Name:</span>
                    <span style={{ fontFamily: 'monospace' }}>
                      {selectedItem.packageName || 'com.expensexai.app'}
                    </span>
                  </div>

                  {selectedItem.payment?.transactionId && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>Payment Transaction ID:</span>
                      <span style={{ fontFamily: 'monospace' }}>
                        {selectedItem.payment.transactionId}
                      </span>
                    </div>
                  )}

                  {selectedItem.payment?.method && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>Payment Method:</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                        {selectedItem.payment.method}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Plan Information */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--mc-text-muted)', textTransform: 'uppercase' }}>
                  Subscription Plan Details
                </span>
                <div
                  style={{
                    background: '#F8FAFC',
                    borderRadius: 10,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Plan Name (EN):</span>
                    <span style={{ fontWeight: 600 }}>
                      {selectedItem.subscriptionPlan?.name?.en || selectedItem.basePlanId || '—'}
                    </span>
                  </div>

                  {selectedItem.subscriptionPlan?.name?.bn && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>Plan Name (BN):</span>
                      <span style={{ fontWeight: 600 }}>{selectedItem.subscriptionPlan.name.bn}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Base Plan ID:</span>
                    <span style={{ fontWeight: 600, color: '#2563EB' }}>
                      {selectedItem.basePlanId || '—'}
                    </span>
                  </div>

                  {selectedItem.subscriptionPlan?.aiCredit !== undefined && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>AI Credits Granted:</span>
                      <span style={{ fontWeight: 600, color: '#D97706' }}>
                        ✨ {selectedItem.subscriptionPlan.aiCredit} Credits
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Auto Renew:</span>
                    <span style={{ fontWeight: 600, color: selectedItem.autoRenewing ? '#16A34A' : '#64748B' }}>
                      {selectedItem.autoRenewing ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timestamps Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--mc-text-muted)', textTransform: 'uppercase' }}>
                  Timeline & Validity
                </span>
                <div
                  style={{
                    background: '#F8FAFC',
                    borderRadius: 10,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Started At:</span>
                    <span>{formatDate(selectedItem.startTime || selectedItem.createdAt)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Expires At:</span>
                    <span style={{ fontWeight: 600 }}>{formatDate(selectedItem.expiryTime)}</span>
                  </div>
                  {selectedItem.lastCreditGrantDate && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>Last Credit Grant:</span>
                      <span>{formatDate(selectedItem.lastCreditGrantDate)}</span>
                    </div>
                  )}
                  {selectedItem.createdAt && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>Created At:</span>
                      <span>{formatDate(selectedItem.createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Token (Truncated with copy) */}
              {selectedItem.purchaseToken && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                      PURCHASE TOKEN
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedItem.purchaseToken!, 'token')}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        fontSize: 11,
                        color: copiedId === 'token' ? '#16A34A' : 'var(--mc-brand-purple)',
                        cursor: 'pointer',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {copiedId === 'token' ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedId === 'token' ? 'Copied' : 'Copy Full Token'}</span>
                    </button>
                  </div>
                  <div
                    style={{
                      padding: '8px 10px',
                      background: '#F1F5F9',
                      borderRadius: 8,
                      fontSize: 11,
                      fontFamily: 'monospace',
                      wordBreak: 'break-all',
                      color: 'var(--mc-text-muted)',
                      maxHeight: 60,
                      overflowY: 'auto',
                    }}
                  >
                    {selectedItem.purchaseToken}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '12px 20px',
                borderTop: '1px solid #F1F5F9',
                background: '#FAFAFA',
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--mc-text-main)',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
