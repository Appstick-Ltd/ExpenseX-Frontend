'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  getUserRewards,
  extractListFromResponse,
} from '../../../../helpers/backend';
import {
  Search,
  Eye,
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
  ArrowRight,
  Calendar,
  Ticket,
  UserCheck,
  Award,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showErrorToast } from '../../../../helpers/notification';

export interface RewardUserRef {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface UserRewardItem {
  _id: string;
  referral_code: string;
  user: RewardUserRef;
  referrer?: RewardUserRef;
  user_coin: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  coin: number;
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
  }, [page, limit, debouncedSearch]);

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
    const headers = [
      'Record ID',
      'Referral Code',
      'Referred User Name',
      'Referred User Email',
      'Referrer Name',
      'Referrer Email',
      'Referrer Coin',
      'Referred Coin',
      'Status',
      'Created At',
    ];
    const rows = rewards.map((r) => [
      `"${r._id || ''}"`,
      `"${r.referral_code || ''}"`,
      `"${r.user?.name || 'N/A'}"`,
      `"${r.user?.email || 'N/A'}"`,
      `"${r.referrer?.name || 'N/A'}"`,
      `"${r.referrer?.email || 'N/A'}"`,
      r.coin ?? 0,
      r.user_coin ?? 0,
      `"${r.status || 'rewarded'}"`,
      `"${r.createdAt ? new Date(r.createdAt).toISOString() : 'N/A'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `ExpenseX_Rewards_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStatusBadge = (status?: string, size: 'sm' | 'md' = 'sm') => {
    const s = (status || 'rewarded').toLowerCase();
    const isMd = size === 'md';
    const padding = isMd ? '5px 12px' : '3px 10px';
    const fontSize = isMd ? 13 : 12;

    if (s === 'rewarded') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding,
            borderRadius: 20,
            fontSize,
            fontWeight: 600,
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#059669',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}
        >
          <CheckCircle2 size={isMd ? 15 : 13} />
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
            padding,
            borderRadius: 20,
            fontSize,
            fontWeight: 600,
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#DC2626',
            border: '1px solid rgba(239, 68, 68, 0.25)',
          }}
        >
          <XCircle size={isMd ? 15 : 13} />
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
          padding,
          borderRadius: 20,
          fontSize,
          fontWeight: 600,
          background: 'rgba(245, 158, 11, 0.12)',
          color: '#D97706',
          border: '1px solid rgba(245, 158, 11, 0.25)',
        }}
      >
        <Clock size={isMd ? 15 : 13} />
        {status || 'Pending'}
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
                width: 38,
                height: 38,
                borderRadius: 12,
                background:
                  'linear-gradient(135deg, rgba(109, 61, 245, 0.15) 0%, rgba(139, 92, 246, 0.25) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--mc-brand-purple)',
                boxShadow: '0 2px 8px rgba(109, 61, 245, 0.15)',
              }}
            >
              <Gift size={20} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: 0,
                  color: 'var(--mc-text-main)',
                }}
              >
                User Referral Rewards
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--mc-text-muted)',
                  margin: '2px 0 0 0',
                }}
              >
                Reward tracking & referral coins distributed through GET /users/rewards
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
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

      {/* Search Bar */}
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
              placeholder="Search user, referrer or email..."
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

        <div style={{ fontSize: 13, color: 'var(--mc-text-muted)', fontWeight: 500 }}>
          Total: <strong style={{ color: 'var(--mc-text-main)' }}>{total}</strong> records
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
                <th style={{ textAlign: 'center' }}>Status</th>
                <th>Date</th>
                <th style={{ width: 70, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerTableRows
                  rows={limit}
                  columns={[
                    { width: 36, align: 'center' },
                    { width: '200px', hasSubtitle: true },
                    { width: '200px', hasSubtitle: true },
                    { width: '150px', align: 'center' },
                    { width: '90px', isBadge: true, align: 'center' },
                    { width: '120px' },
                    { width: '50px', align: 'center' },
                  ]}
                />
              ) : rewards.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px 16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <Gift size={36} color="var(--mc-text-muted)" style={{ opacity: 0.6 }} />
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: 'var(--mc-text-main)',
                        }}
                      >
                        No Rewards Found
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: 'var(--mc-text-muted)',
                          maxWidth: 360,
                        }}
                      >
                        {search
                          ? 'Try adjusting your search query.'
                          : 'There are currently no referral reward entries in the database.'}
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                rewards.map((reward, idx) => {
                  const serial = (page - 1) * limit + idx + 1;
                  const userInitial = reward.user?.name
                    ? reward.user.name.trim().charAt(0).toUpperCase()
                    : 'U';
                  const referrerInitial = reward.referrer?.name
                    ? reward.referrer.name.trim().charAt(0).toUpperCase()
                    : 'R';

                  return (
                    <tr key={reward._id || idx}>
                      <td
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: 'var(--mc-text-muted)',
                        }}
                      >
                        {serial}
                      </td>

                      {/* Referred User */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background:
                                'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 13,
                              fontWeight: 700,
                              flexShrink: 0,
                              boxShadow: '0 2px 6px rgba(99, 102, 241, 0.25)',
                            }}
                          >
                            {userInitial}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: 13,
                                color: 'var(--mc-text-main)',
                              }}
                            >
                              {reward.user?.name || 'Unknown User'}
                            </div>
                            <div
                              style={{
                                fontSize: 11.5,
                                color: 'var(--mc-text-muted)',
                              }}
                            >
                              {reward.user?.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Referrer */}
                      <td>
                        {reward.referrer ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {reward.referrer.image ? (
                              <img
                                src={reward.referrer.image}
                                alt=""
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: '1px solid var(--mc-border)',
                                }}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: '50%',
                                  background:
                                    'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                  color: '#FFFFFF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: 13,
                                  fontWeight: 700,
                                  flexShrink: 0,
                                }}
                              >
                                {referrerInitial}
                              </div>
                            )}
                            <div>
                              <div
                                style={{
                                  fontWeight: 600,
                                  fontSize: 13,
                                  color: 'var(--mc-text-main)',
                                }}
                              >
                                {reward.referrer.name || 'Referrer'}
                              </div>
                              <div
                                style={{
                                  fontSize: 11.5,
                                  color: 'var(--mc-text-muted)',
                                }}
                              >
                                {reward.referrer.email || 'No email'}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span
                            style={{
                              fontSize: 12,
                              color: 'var(--mc-text-muted)',
                              fontStyle: 'italic',
                            }}
                          >
                            Direct Registration
                          </span>
                        )}
                      </td>

                      {/* Coins (Referrer + Referred) */}
                      <td style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            gap: 4,
                            alignItems: 'center',
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              padding: '2px 8px',
                              borderRadius: 8,
                              background: 'rgba(234, 179, 8, 0.12)',
                              color: '#B45309',
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                            title="Referrer Coin"
                          >
                            <Coins size={12} color="#D97706" />
                            <span>+{reward.coin ?? 0}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 500,
                                opacity: 0.85,
                              }}
                            >
                              Referrer
                            </span>
                          </div>
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              padding: '2px 8px',
                              borderRadius: 8,
                              background: 'rgba(16, 185, 129, 0.12)',
                              color: '#047857',
                              fontWeight: 700,
                              fontSize: 12,
                            }}
                            title="Referred User Coin"
                          >
                            <Coins size={12} color="#059669" />
                            <span>+{reward.user_coin ?? 0}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 500,
                                opacity: 0.85,
                              }}
                            >
                              Referred
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ textAlign: 'center' }}>
                        {renderStatusBadge(reward.status)}
                      </td>

                      {/* Date */}
                      <td
                        style={{
                          fontSize: 12,
                          color: 'var(--mc-text-muted)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {reward.createdAt ? (
                          <div>
                            <div>
                              {new Date(reward.createdAt).toLocaleDateString()}
                            </div>
                            <div style={{ fontSize: 11, opacity: 0.8 }}>
                              {new Date(reward.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
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
        <div
          className="mc-mobile-only"
          style={{
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {loading ? (
            <ShimmerMobileCardList count={limit} />
          ) : rewards.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '36px 12px',
                color: 'var(--mc-text-muted)',
              }}
            >
              No rewards found
            </div>
          ) : (
            rewards.map((reward, idx) => {
              const userInitial = reward.user?.name
                ? reward.user.name.trim().charAt(0).toUpperCase()
                : 'U';

              return (
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background:
                            'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {userInitial}
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: 13,
                            color: 'var(--mc-text-main)',
                          }}
                        >
                          {reward.user?.name || 'Unknown User'}
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: 'var(--mc-text-muted)',
                          }}
                        >
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ color: 'var(--mc-text-muted)' }}>
                        Referrer Coin:
                      </span>
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
                        <span>+{reward.coin ?? 0}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ color: 'var(--mc-text-muted)' }}>
                        Referred Coin:
                      </span>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontWeight: 700,
                          color: '#047857',
                        }}
                      >
                        <Coins size={13} color="#059669" />
                        <span>+{reward.user_coin ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 4,
                    }}
                  >
                    <span style={{ fontSize: 11, color: 'var(--mc-text-muted)' }}>
                      {reward.createdAt
                        ? new Date(reward.createdAt).toLocaleDateString()
                        : ''}
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
              );
            })
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

            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--mc-text-main)',
                padding: '0 6px',
              }}
            >
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
                color:
                  page >= totalPages
                    ? 'var(--mc-text-muted)'
                    : 'var(--mc-text-main)',
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

      {/* Referral Reward Details Modal */}
      {selectedReward && (
        <div
          className="mc-modal-overlay"
          onClick={() => setSelectedReward(null)}
          style={{
            backdropFilter: 'blur(8px)',
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            className="mc-modal-card"
            style={{
              maxWidth: 640,
              width: '100%',
              borderRadius: 24,
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.28)',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: '#FFFFFF',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Multi-color Gradient Accent */}
            <div
              style={{
                height: 5,
                width: '100%',
                background:
                  'linear-gradient(90deg, #6D3DF5 0%, #8B5CF6 40%, #F59E0B 75%, #10B981 100%)',
              }}
            />

            {/* Modal Header */}
            <div
              style={{
                padding: '22px 26px 18px 26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #F1F5F9',
                background: 'linear-gradient(180deg, #FAFAFD 0%, #FFFFFF 100%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background:
                      'linear-gradient(135deg, #6D3DF5 0%, #8B5CF6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 20px rgba(109, 61, 245, 0.3)',
                    flexShrink: 0,
                  }}
                >
                  <Gift size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#0F172A',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Referral Reward Details
                    </h3>
                    {renderStatusBadge(selectedReward.status, 'sm')}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    <span>Record ID:</span>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 11.5,
                        background: '#F1F5F9',
                        padding: '2px 7px',
                        borderRadius: 5,
                        color: '#334155',
                        fontWeight: 500,
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
                        padding: 3,
                        display: 'flex',
                        alignItems: 'center',
                        color:
                          copiedId === 'modal-rec-id' ? '#10B981' : '#94A3B8',
                        transition: 'color 0.15s ease',
                      }}
                      title="Copy Record ID"
                    >
                      {copiedId === 'modal-rec-id' ? (
                        <Check size={13} />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReward(null)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
                <X size={17} />
              </button>
            </div>

            <div
              className="mc-modal-body"
              style={{
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                maxHeight: 'calc(85vh - 120px)',
                overflowY: 'auto',
              }}
            >
              {/* Hero Reward Summary Banner */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%)',
                  borderRadius: 18,
                  border: '1px solid #E2E8F0',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                {/* Referrer Coin Box */}
                <div
                  style={{
                    flex: '1 1 180px',
                    background: '#FFFFFF',
                    borderRadius: 14,
                    padding: '14px 16px',
                    border: '1px solid #FDE68A',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background:
                        'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#B45309',
                      flexShrink: 0,
                    }}
                  >
                    <Coins size={22} color="#D97706" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: '#B45309',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Referrer Coin
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: '#92400E',
                        lineHeight: 1.2,
                        marginTop: 2,
                      }}
                    >
                      +{selectedReward.coin ?? 0}
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#B45309',
                          marginLeft: 4,
                        }}
                      >
                        Coins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Distributed Chip */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: '6px 12px',
                    background: '#FFFFFF',
                    borderRadius: 20,
                    border: '1px solid #CBD5E1',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#64748B',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Total Coins
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#6D3DF5',
                    }}
                  >
                    +{(selectedReward.coin ?? 0) + (selectedReward.user_coin ?? 0)}
                  </span>
                </div>

                {/* Referred User Coin Box */}
                <div
                  style={{
                    flex: '1 1 180px',
                    background: '#FFFFFF',
                    borderRadius: 14,
                    padding: '14px 16px',
                    border: '1px solid #A7F3D0',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background:
                        'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#047857',
                      flexShrink: 0,
                    }}
                  >
                    <Coins size={22} color="#059669" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: '#047857',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Referred Coin
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: '#065F46',
                        lineHeight: 1.2,
                        marginTop: 2,
                      }}
                    >
                      +{selectedReward.user_coin ?? 0}
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#047857',
                          marginLeft: 4,
                        }}
                      >
                        Coins
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Code Showcase (Voucher Card) */}
              <div
                style={{
                  background:
                    'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
                  borderRadius: 16,
                  border: '1px dashed #C084FC',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6D3DF5',
                      boxShadow: '0 2px 6px rgba(109, 61, 245, 0.15)',
                    }}
                  >
                    <Ticket size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#6D3DF5',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Referral Code Used
                    </div>
                    <div
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 16,
                        fontWeight: 800,
                        color: '#4C1D95',
                        letterSpacing: '1px',
                        marginTop: 2,
                      }}
                    >
                      {selectedReward.referral_code || '—'}
                    </div>
                  </div>
                </div>

                {selectedReward.referral_code && (
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(selectedReward.referral_code, 'modal-code')
                    }
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #DDD6FE',
                      borderRadius: 8,
                      cursor: 'pointer',
                      padding: '7px 14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      color:
                        copiedId === 'modal-code' ? '#10B981' : '#6D3DF5',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 2px 4px rgba(109, 61, 245, 0.08)',
                    }}
                  >
                    {copiedId === 'modal-code' ? (
                      <>
                        <Check size={14} />
                        <span>Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Referral Relationship (Two Profile Cards) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Sparkles size={14} color="#6D3DF5" />
                    <span>Participants & Account Breakdown</span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#6D3DF5',
                      background: 'rgba(109, 61, 245, 0.08)',
                      padding: '2px 8px',
                      borderRadius: 12,
                    }}
                  >
                    1 Referral Pair
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 14,
                  }}
                >
                  {/* Referrer (Inviter) Card */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: 16,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            color: '#4338CA',
                            background: '#EEF2FF',
                            padding: '3px 8px',
                            borderRadius: 6,
                            letterSpacing: '0.04em',
                          }}
                        >
                          INVITED BY (REFERRER)
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#B45309',
                            background: '#FEF3C7',
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}
                        >
                          +{selectedReward.coin ?? 0} COINS
                        </span>
                      </div>

                      {selectedReward.referrer ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {selectedReward.referrer.image ? (
                            <img
                              src={selectedReward.referrer.image}
                              alt=""
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '2px solid #E2E8F0',
                              }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                background:
                                  'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 16,
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {selectedReward.referrer.name
                                ? selectedReward.referrer.name.trim().charAt(0).toUpperCase()
                                : 'R'}
                            </div>
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontWeight: 700,
                                fontSize: 14,
                                color: '#0F172A',
                              }}
                            >
                              {selectedReward.referrer.name || 'Referrer'}
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                color: '#64748B',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                marginTop: 2,
                              }}
                            >
                              <span
                                style={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {selectedReward.referrer.email || 'No email'}
                              </span>
                              {selectedReward.referrer.email && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopy(
                                      selectedReward.referrer!.email,
                                      'ref-email'
                                    )
                                  }
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    color:
                                      copiedId === 'ref-email'
                                        ? '#10B981'
                                        : '#94A3B8',
                                  }}
                                  title="Copy Email"
                                >
                                  {copiedId === 'ref-email' ? (
                                    <Check size={12} />
                                  ) : (
                                    <Copy size={12} />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: '12px 14px',
                            background: '#F8FAFC',
                            borderRadius: 10,
                            border: '1px dashed #CBD5E1',
                            fontSize: 12,
                            color: '#64748B',
                            fontStyle: 'italic',
                          }}
                        >
                          Direct Registration — No inviter.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Referred User (New Member) Card */}
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: 16,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            color: '#047857',
                            background: '#D1FAE5',
                            padding: '3px 8px',
                            borderRadius: 6,
                            letterSpacing: '0.04em',
                          }}
                        >
                          NEW MEMBER (REFERRED)
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#047857',
                            background: '#D1FAE5',
                            padding: '2px 8px',
                            borderRadius: 6,
                          }}
                        >
                          +{selectedReward.user_coin ?? 0} COINS
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            background:
                              'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                            fontWeight: 700,
                            flexShrink: 0,
                            boxShadow: '0 2px 6px rgba(99, 102, 241, 0.25)',
                          }}
                        >
                          {selectedReward.user?.name
                            ? selectedReward.user.name.trim().charAt(0).toUpperCase()
                            : 'U'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              color: '#0F172A',
                            }}
                          >
                            {selectedReward.user?.name || 'Unknown User'}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: '#64748B',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              marginTop: 2,
                            }}
                          >
                            <span
                              style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {selectedReward.user?.email || 'No email'}
                            </span>
                            {selectedReward.user?.email && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(
                                    selectedReward.user.email,
                                    'usr-email'
                                  )
                                }
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: 2,
                                  display: 'flex',
                                  alignItems: 'center',
                                  color:
                                    copiedId === 'usr-email'
                                      ? '#10B981'
                                      : '#94A3B8',
                                }}
                                title="Copy Email"
                              >
                                {copiedId === 'usr-email' ? (
                                  <Check size={12} />
                                ) : (
                                  <Copy size={12} />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamp Audit Strip */}
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  padding: '12px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 10,
                  fontSize: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#64748B',
                    fontWeight: 500,
                  }}
                >
                  <Calendar size={14} color="#6D3DF5" />
                  <span>Transaction Recorded At:</span>
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

            {/* Modal Footer */}
            <div
              className="mc-modal-footer"
              style={{
                borderTop: '1px solid #F1F5F9',
                padding: '16px 26px',
                display: 'flex',
                justifyContent: 'flex-end',
                background: '#FAFAFD',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedReward(null)}
                style={{
                  padding: '9px 26px',
                  borderRadius: 10,
                  background: 'var(--mc-brand-purple)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 8px rgba(109, 61, 245, 0.25)',
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
