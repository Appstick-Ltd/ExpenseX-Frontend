'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  getUserRewards,
  extractListFromResponse,
} from '../../../../helpers/backend';
import {
  Search,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  FileSpreadsheet,
  Copy,
  Check,
  Gift,
  Coins,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowDown,
  Calendar,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showErrorToast } from '../../../../helpers/notification';

export interface RewardUserRef {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

export interface UserRewardItem {
  _id: string;
  user?: RewardUserRef;
  referrer?: RewardUserRef;
  coin: number;
  referral_code?: string;
  status: 'pending' | 'rewarded' | 'rejected' | string;
  createdAt?: string;
  updatedAt?: string;
}

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366F1'/%3E%3Cstop offset='100%25' stop-color='%238B5CF6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' rx='40' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%23FFFFFF' opacity='0.9'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24' fill='%23FFFFFF' opacity='0.9'/%3E%3C/svg%3E";

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<UserRewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'rewarded' | 'rejected'>('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Modal & Clipboard
  const [selectedReward, setSelectedReward] = useState<UserRewardItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchRewards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, any> = {
        page,
        limit,
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const res = await getUserRewards(params);
      const parsed = extractListFromResponse<UserRewardItem>(res);
      setRewards(parsed.items || []);
      setTotal(parsed.total || 0);
      if (parsed.totalPages) {
        setTotalPages(parsed.totalPages);
      } else {
        setTotalPages(Math.max(1, Math.ceil((parsed.total || 0) / limit)));
      }
    } catch (err: any) {
      console.error('Error fetching rewards list:', err);
      const msg = err?.message || 'Failed to fetch rewards list';
      setError(msg);
      showErrorToast(msg);
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  const handleCopy = (text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const exportToCSV = () => {
    if (rewards.length === 0) return;
    const headers = ['ID', 'User Name', 'User Email', 'Referrer Name', 'Referrer Email', 'Referral Code', 'Coin Amount', 'Status', 'Date'];
    const rows = rewards.map((r) => [
      `"${r._id}"`,
      `"${r.user?.name || 'N/A'}"`,
      `"${r.user?.email || 'N/A'}"`,
      `"${r.referrer?.name || 'N/A'}"`,
      `"${r.referrer?.email || 'N/A'}"`,
      `"${r.referral_code || 'N/A'}"`,
      r.coin || 0,
      `"${r.status || 'pending'}"`,
      `"${r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ExpenseX_Rewards_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick stats computed from current list or totals
  const stats = useMemo(() => {
    const totalCoins = rewards.reduce((sum, r) => sum + (Number(r.coin) || 0), 0);
    const rewardedCount = rewards.filter((r) => r.status === 'rewarded').length;
    const pendingCount = rewards.filter((r) => r.status === 'pending').length;
    return { totalCoins, rewardedCount, pendingCount };
  }, [rewards]);

  const renderStatusBadge = (status?: string) => {
    const s = (status || 'pending').toLowerCase();
    if (s === 'rewarded') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 10px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#059669',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}
        >
          <CheckCircle2 size={13} />
          Rewarded
        </span>
      );
    }
    if (s === 'rejected') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 10px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#DC2626',
            border: '1px solid rgba(239, 68, 68, 0.25)',
          }}
        >
          <XCircle size={13} />
          Rejected
        </span>
      );
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '3px 10px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          background: 'rgba(245, 158, 11, 0.12)',
          color: '#D97706',
          border: '1px solid rgba(245, 158, 11, 0.25)',
        }}
      >
        <Clock size={13} />
        Pending
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Title & Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mc-brand-purple)',
              }}
            >
              <Gift size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                User Referral Rewards
              </h1>
              <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: '2px 0 0 0' }}>
                Reward tracking & referral coins distributed through GET /users/rewards
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => fetchRewards()}
            disabled={loading}
            className="mc-btn-secondary"
            title="Refresh List"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            disabled={rewards.length === 0}
            className="mc-btn-secondary"
          >
            <FileSpreadsheet size={14} color="var(--mc-brand-purple)" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 14,
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 12,
            padding: '14px 18px',
            border: '1px solid var(--mc-border)',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'rgba(109, 61, 245, 0.08)',
              color: 'var(--mc-brand-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Gift size={22} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', fontWeight: 500 }}>Total Records</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--mc-text-main)' }}>{total}</div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 12,
            padding: '14px 18px',
            border: '1px solid var(--mc-border)',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'rgba(234, 179, 8, 0.12)',
              color: '#CA8A04',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Coins size={22} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', fontWeight: 500 }}>Total Coins on Page</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--mc-text-main)' }}>
              {stats.totalCoins.toLocaleString()}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 12,
            padding: '14px 18px',
            border: '1px solid var(--mc-border)',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', fontWeight: 500 }}>Rewarded (Page)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#059669' }}>
              {stats.rewardedCount}
            </div>
          </div>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 12,
            padding: '14px 18px',
            border: '1px solid var(--mc-border)',
            boxShadow: 'var(--mc-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--mc-text-muted)', fontWeight: 500 }}>Pending (Page)</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#D97706' }}>
              {stats.pendingCount}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--mc-border)',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, flex: 1, minWidth: 240, alignItems: 'center' }}>
          <div className="mc-input-wrapper" style={{ flex: 1, position: 'relative' }}>
            <Search size={16} className="mc-input-icon-left" />
            <input
              type="text"
              placeholder="Search user, referrer, email, phone or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mc-input with-left-icon"
              style={{ height: 40, paddingRight: search ? 36 : 14 }}
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
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--mc-text-muted)', marginRight: 4 }}>Status:</span>
          {(['all', 'pending', 'rewarded', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: statusFilter === s ? 'rgba(109, 61, 245, 0.4)' : 'var(--mc-border)',
                background:
                  statusFilter === s
                    ? 'linear-gradient(135deg, rgba(109, 61, 245, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
                    : '#FFFFFF',
                color: statusFilter === s ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                fontSize: 12,
                fontWeight: statusFilter === s ? 700 : 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="mc-card-table">
        {/* Desktop View */}
        <div className="mc-table-wrap mc-desktop-only">
          <table className="mc-table">
            <thead>
              <tr>
                <th style={{ width: 44, textAlign: 'center' }}>#</th>
                <th>Referred User</th>
                <th>Referrer (Invited By)</th>
                <th style={{ textAlign: 'center' }}>Coins</th>
                <th>Date</th>
                <th style={{ width: 80, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerTableRows
                  rows={limit}
                  columns={[
                    { width: '40px' },
                    { width: '220px', hasSubtitle: true },
                    { width: '200px', hasSubtitle: true },
                    { width: '80px', isBadge: true },
                    { width: '130px' },
                    { width: '60px' },
                  ]}
                />
              ) : rewards.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px 16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                      <Gift size={36} color="var(--mc-text-muted)" style={{ opacity: 0.6 }} />
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--mc-text-main)' }}>
                        No Rewards Found
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--mc-text-muted)', maxWidth: 360 }}>
                        {search || statusFilter !== 'all'
                          ? 'Try adjusting your search query or status filter.'
                          : 'There are currently no referral reward entries in the database.'}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                rewards.map((reward, idx) => {
                  const serial = (page - 1) * limit + idx + 1;
                  return (
                    <tr key={reward._id || idx}>
                      <td style={{ textAlign: 'center', fontSize: 12, color: 'var(--mc-text-muted)' }}>
                        {serial}
                      </td>

                      {/* Referred User */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <img
                            src={reward.user?.image || DEFAULT_AVATAR}
                            alt=""
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '1px solid var(--mc-border)',
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--mc-text-main)' }}>
                              {reward.user?.name || 'Unknown User'}
                            </div>
                            <div style={{ fontSize: 11.5, color: 'var(--mc-text-muted)' }}>
                              {reward.user?.email || 'No email provided'}
                            </div>
                            {reward.user?.phone && (
                              <div style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>
                                {reward.user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Referrer */}
                      <td>
                        {reward.referrer ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <img
                              src={reward.referrer?.image || DEFAULT_AVATAR}
                              alt=""
                              style={{
                                width: 34,
                                height: 34,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '1px solid var(--mc-border)',
                              }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                              }}
                            />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--mc-text-main)' }}>
                                {reward.referrer.name || 'Referrer'}
                              </div>
                              <div style={{ fontSize: 11.5, color: 'var(--mc-text-muted)' }}>
                                {reward.referrer.email || 'No email'}
                              </div>
                              {reward.referrer.phone && (
                                <div style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>
                                  {reward.referrer.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: 'var(--mc-text-muted)', fontStyle: 'italic' }}>
                            Direct Registration
                          </span>
                        )}
                      </td>

                      {/* Coins */}
                      <td style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '4px 10px',
                            borderRadius: 14,
                            background: 'rgba(234, 179, 8, 0.12)',
                            color: '#B45309',
                            fontWeight: 700,
                            fontSize: 12.5,
                          }}
                        >
                          <Coins size={14} color="#D97706" />
                          <span>{reward.coin || 0}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', whiteSpace: 'nowrap' }}>
                        {reward.createdAt ? (
                          <div>
                            <div>{new Date(reward.createdAt).toLocaleDateString()}</div>
                            <div style={{ fontSize: 11, opacity: 0.8 }}>
                              {new Date(reward.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedReward(reward)}
                          title="View Reward Details"
                          style={{
                            padding: '6px 10px',
                            borderRadius: 6,
                            border: '1px solid var(--mc-border)',
                            background: '#FFFFFF',
                            color: 'var(--mc-brand-purple)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="mc-mobile-only" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {loading ? (
            <ShimmerMobileCardList count={limit} />
          ) : rewards.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--mc-text-muted)' }}>
              No rewards found
            </div>
          ) : (
            rewards.map((reward, idx) => (
              <div
                key={reward._id || idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 12,
                  border: '1px solid var(--mc-border)',
                  padding: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  boxShadow: 'var(--mc-shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={reward.user?.image || DEFAULT_AVATAR}
                      alt=""
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--mc-text-main)' }}>
                        {reward.user?.name || 'Unknown User'}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--mc-text-muted)' }}>
                        {reward.user?.email || 'No email'}
                      </div>
                    </div>
                  </div>
                  {renderStatusBadge(reward.status)}
                </div>

                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.02)',
                    padding: '8px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Referrer:</span>
                    <span style={{ fontWeight: 500, color: 'var(--mc-text-main)' }}>
                      {reward.referrer?.name || 'Direct / None'}
                    </span>
                  </div>
                  {reward.referral_code && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--mc-text-muted)' }}>Code:</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--mc-brand-purple)' }}>
                        {reward.referral_code}
                      </span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--mc-text-muted)' }}>Coins:</span>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontWeight: 700,
                        color: '#B45309',
                      }}
                    >
                      <Coins size={13} color="#D97706" />
                      <span>{reward.coin || 0}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>
                    {reward.createdAt ? new Date(reward.createdAt).toLocaleDateString() : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedReward(reward)}
                    className="mc-btn-secondary"
                    style={{ fontSize: 12, padding: '4px 10px' }}
                  >
                    <Eye size={13} />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Bar */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--mc-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            background: '#FAFAFA',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12.5, color: 'var(--mc-text-muted)' }}>
              Showing {rewards.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
              {Math.min(page * limit, total)} of {total} entries
            </span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              style={{
                fontSize: 12,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                color: 'var(--mc-text-main)',
                cursor: 'pointer',
              }}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page <= 1 || loading}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                color: page <= 1 ? 'var(--mc-text-muted)' : 'var(--mc-text-main)',
                cursor: page <= 1 ? 'not-allowed' : 'pointer',
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mc-text-main)', padding: '0 6px' }}>
              Page {page} of {Math.max(1, totalPages)}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page >= totalPages || loading}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid var(--mc-border)',
                background: '#FFFFFF',
                color: page >= totalPages ? 'var(--mc-text-muted)' : 'var(--mc-text-main)',
                cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                fontSize: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedReward && (
        <div
          className="mc-modal-overlay"
          onClick={() => setSelectedReward(null)}
          style={{
            backdropFilter: 'blur(6px)',
            background: 'rgba(15, 23, 42, 0.55)',
          }}
        >
          <div
            className="mc-modal-card"
            style={{
              maxWidth: 580,
              borderRadius: 20,
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
              overflow: 'hidden',
              border: 'none',
              background: '#FFFFFF',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient Accent Bar */}
            <div
              style={{
                height: 4,
                width: '100%',
                background: 'linear-gradient(90deg, #6D3DF5 0%, #8B5CF6 50%, #EC4899 100%)',
              }}
            />

            {/* Modal Header */}
            <div
              style={{
                padding: '20px 24px 16px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F1F5F9',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 6px 16px rgba(109, 61, 245, 0.25)',
                    flexShrink: 0,
                  }}
                >
                  <Gift size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>
                    Referral Reward Details
                  </h3>
                  <div style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                    <span>Record ID:</span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11.5,
                        background: '#F1F5F9',
                        padding: '1px 6px',
                        borderRadius: 4,
                        color: '#334155',
                      }}
                    >
                      {selectedReward._id}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedReward._id, 'modal-rec-id')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        color: copiedId === 'modal-rec-id' ? '#10B981' : '#94A3B8',
                        transition: 'color 0.15s ease',
                      }}
                      title="Copy Record ID"
                    >
                      {copiedId === 'modal-rec-id' ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReward(null)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.color = '#0F172A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#64748B';
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="mc-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Stat Highlights Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 12,
                }}
              >
                {/* Status Card */}
                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #F1F5F9',
                    borderRadius: 14,
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: 8,
                    }}
                  >
                    Reward Status
                  </div>
                  <div>{renderStatusBadge(selectedReward.status)}</div>
                </div>

                {/* Coins Card */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                    border: '1px solid #FDE68A',
                    borderRadius: 14,
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#B45309',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: 6,
                    }}
                  >
                    Coins Awarded
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 17,
                      fontWeight: 800,
                      color: '#B45309',
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#F59E0B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        boxShadow: '0 2px 6px rgba(245, 158, 11, 0.35)',
                      }}
                    >
                      <Coins size={14} />
                    </div>
                    <span>{selectedReward.coin || 0}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#D97706' }}>Coins</span>
                  </div>
                </div>

                {/* Referral Code Card */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                    border: '1px solid #DDD6FE',
                    borderRadius: 14,
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: '#6D3DF5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: 6,
                    }}
                  >
                    Referral Code
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: 13.5,
                        color: '#5B21B6',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {selectedReward.referral_code || '—'}
                    </span>
                    {selectedReward.referral_code && (
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedReward.referral_code!, 'modal-code')}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #C4B5FD',
                          borderRadius: 6,
                          cursor: 'pointer',
                          padding: '3px 6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 11,
                          fontWeight: 600,
                          color: copiedId === 'modal-code' ? '#10B981' : '#6D3DF5',
                          transition: 'all 0.15s ease',
                        }}
                        title="Copy Referral Code"
                      >
                        {copiedId === 'modal-code' ? (
                          <>
                            <Check size={11} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Connected Referral Flow */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #F1F5F9',
                  borderRadius: 16,
                  padding: '18px 20px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: '1px solid #F1F5F9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Sparkles size={15} color="#6D3DF5" />
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: '#475569',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Referral Relationship
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#6D3DF5',
                      background: 'rgba(109, 61, 245, 0.08)',
                      padding: '2px 8px',
                      borderRadius: 20,
                    }}
                  >
                    1 Invite Connection
                  </span>
                </div>

                {/* Referrer (Inviter) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Invited By (Referrer)
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#4338CA',
                        background: '#EEF2FF',
                        padding: '2px 7px',
                        borderRadius: 6,
                        letterSpacing: '0.04em',
                      }}
                    >
                      REFERRER
                    </span>
                  </div>

                  {selectedReward.referrer ? (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: 10,
                        background: '#F8FAFC',
                        borderRadius: 12,
                        border: '1px solid #F1F5F9',
                      }}
                    >
                      <img
                        src={selectedReward.referrer?.image || DEFAULT_AVATAR}
                        alt=""
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #FFFFFF',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>
                          {selectedReward.referrer?.name || 'Referrer'}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            marginTop: 1,
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {selectedReward.referrer?.email || 'No email provided'}
                          </span>
                          {selectedReward.referrer?.email && (
                            <button
                              type="button"
                              onClick={() => handleCopy(selectedReward.referrer!.email!, 'referrer-email')}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                color: copiedId === 'referrer-email' ? '#10B981' : '#94A3B8',
                              }}
                              title="Copy Email"
                            >
                              {copiedId === 'referrer-email' ? <Check size={12} /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                        {selectedReward.referrer?.phone && (
                          <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                            Phone: {selectedReward.referrer.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '12px 14px',
                        background: '#F8FAFC',
                        borderRadius: 12,
                        border: '1px dashed #CBD5E1',
                        fontSize: 12.5,
                        color: '#64748B',
                        fontStyle: 'italic',
                      }}
                    >
                      Direct Registration — No referrer code was attached to this account.
                    </div>
                  )}
                </div>

                {/* Connecting Arrow & Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '12px 0',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 20,
                      right: 20,
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, #CBD5E1, transparent)',
                    }}
                  />
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: 20,
                      padding: '4px 14px',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <ArrowDown size={12} color="#6D3DF5" />
                    <span>
                      Referred via <strong style={{ color: '#6D3DF5' }}>{selectedReward.referral_code || 'Referral Code'}</strong>
                    </span>
                  </div>
                </div>

                {/* Referred User (New Member) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      New Member (Referred User)
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#047857',
                        background: '#D1FAE5',
                        padding: '2px 7px',
                        borderRadius: 6,
                        letterSpacing: '0.04em',
                      }}
                    >
                      NEW MEMBER
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 10,
                      background: '#F8FAFC',
                      borderRadius: 12,
                      border: '1px solid #F1F5F9',
                    }}
                  >
                    <img
                      src={selectedReward.user?.image || DEFAULT_AVATAR}
                      alt=""
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>
                        {selectedReward.user?.name || 'Unknown User'}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginTop: 1,
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {selectedReward.user?.email || 'No email provided'}
                        </span>
                        {selectedReward.user?.email && (
                          <button
                            type="button"
                            onClick={() => handleCopy(selectedReward.user!.email!, 'user-email')}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: 2,
                              display: 'flex',
                              alignItems: 'center',
                              color: copiedId === 'user-email' ? '#10B981' : '#94A3B8',
                            }}
                            title="Copy Email"
                          >
                            {copiedId === 'user-email' ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        )}
                      </div>
                      {selectedReward.user?.phone && (
                        <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>
                          Phone: {selectedReward.user.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Timestamp Strip */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #F1F5F9',
                  borderRadius: 12,
                  padding: '11px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', fontWeight: 500 }}>
                  <Calendar size={14} color="#94A3B8" />
                  <span>Transaction Date:</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>
                  {selectedReward.createdAt
                    ? new Date(selectedReward.createdAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })
                    : '—'}
                </span>
              </div>
            </div>

            <div
              className="mc-modal-footer"
              style={{
                borderTop: '1px solid #F1F5F9',
                padding: '14px 24px',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#FAFAFA',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedReward(null)}
                style={{
                  padding: '9px 24px',
                  borderRadius: 10,
                  background: 'var(--mc-brand-purple)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 6px rgba(109, 61, 245, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
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

export { AdminRewardsPage as UserRewardsTab };
