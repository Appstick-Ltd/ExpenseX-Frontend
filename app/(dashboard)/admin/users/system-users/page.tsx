'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  extractListFromResponse,
} from '../../../../helpers/backend';
import {
  Search,
  Trash2,
  Edit,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  User,
  Sparkles,
  Globe,
  Coins,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showSuccessAlert, showErrorToast } from '../../../../helpers/notification';

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
  [key: string]: any;
}

const DEFAULT_USER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366F1'/%3E%3Cstop offset='100%25' stop-color='%238B5CF6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' rx='40' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='31' r='14' fill='%23FFFFFF' opacity='0.9'/%3E%3Cpath d='M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24' fill='%23FFFFFF' opacity='0.9'/%3E%3C/svg%3E";

export default function SystemUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'approved',
    password: '',
    country: '',
    ai_credit: 0,
    ai_assigned_credit: 0,
    currencyCode: 'USD',
    languageCode: 'en',
    gender: '',
    dob: '',
    address: '',
    self_referral_code: '',
    monthly_income: '' as string | number,
    monthly_expense: '' as string | number,
    image: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers({
        search: search.trim() || undefined,
        page,
        limit,
      });

      const parsed = extractListFromResponse<UserItem>(res);
      setUsers(parsed.items);
      setTotal(parsed.total);
    } catch (err) {
      console.error('Failed to fetch system users:', err);
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

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

  const handleOpenEdit = (u: UserItem) => {
    setEditingUser(u);
    setEditForm({
      name: u.name || '',
      email: u.email || '',
      phone: u.phone || '',
      status: (u.status === 'deleted' || u.status === false) ? 'deleted' : 'approved',
      password: '',
      country: u.country || '',
      ai_credit: u.ai_credit ?? u.aiCredit ?? 0,
      ai_assigned_credit: u.ai_assigned_credit ?? 0,
      currencyCode: u.currencyCode || 'USD',
      languageCode: u.languageCode || 'en',
      gender: u.gender || '',
      dob: u.dob ? (u.dob.includes('T') ? u.dob.split('T')[0] : u.dob) : '',
      address: u.address || '',
      self_referral_code: u.self_referral_code || '',
      monthly_income: u.monthly_income ?? '',
      monthly_expense: u.monthly_expense ?? '',
      image: u.image || '',
    });
    setEditError(null);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editForm.name.trim() || !editForm.email.trim()) {
      setEditError('Name and email are required.');
      return;
    }
    setIsUpdating(true);
    setEditError(null);
    try {
      const payload: Record<string, any> = {
        _id: editingUser._id,
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        status: editForm.status,
      };

      if (editForm.phone?.trim()) payload.phone = editForm.phone.trim();
      if (editForm.password?.trim()) payload.password = editForm.password.trim();
      if (editForm.country?.trim()) payload.country = editForm.country.trim();
      if (editForm.currencyCode?.trim()) payload.currencyCode = editForm.currencyCode.trim();
      if (editForm.languageCode?.trim()) payload.languageCode = editForm.languageCode.trim();
      if (editForm.gender?.trim()) payload.gender = editForm.gender.trim();
      if (editForm.dob) payload.dob = editForm.dob;
      if (editForm.address?.trim()) payload.address = editForm.address.trim();
      if (editForm.self_referral_code?.trim()) payload.self_referral_code = editForm.self_referral_code.trim();
      if (editForm.image?.trim()) payload.image = editForm.image.trim();

      if (editForm.ai_credit !== undefined && editForm.ai_credit !== ('' as any)) {
        payload.ai_credit = Number(editForm.ai_credit);
      }
      if (editForm.ai_assigned_credit !== undefined && editForm.ai_assigned_credit !== ('' as any)) {
        payload.ai_assigned_credit = Number(editForm.ai_assigned_credit);
      }
      if (editForm.monthly_income !== '' && editForm.monthly_income !== undefined) {
        payload.monthly_income = Number(editForm.monthly_income);
      }
      if (editForm.monthly_expense !== '' && editForm.monthly_expense !== undefined) {
        payload.monthly_expense = Number(editForm.monthly_expense);
      }

      const res = await updateUser(payload);

      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg = res?.message || res?.errorMessage || 'Failed to update user.';
        setEditError(errorMsg);
        showErrorToast(errorMsg);
        return;
      }

      setEditingUser(null);
      showSuccessAlert(res?.message || 'System user updated successfully!');
      fetchUsers();
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update user.');
      showErrorToast(err?.message || 'Failed to update user.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteUser(userToDelete._id);
      if (res?.success === false || res?.statusCode >= 400) {
        showErrorToast(res?.message || res?.errorMessage || 'Failed to delete user.');
        return;
      }
      setUserToDelete(null);
      showSuccessAlert(res?.message || 'System user deleted successfully.');
      fetchUsers();
    } catch (err: any) {
      showErrorToast(`Delete user failed: ${err?.message || 'Error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
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
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
            User Management
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Active registered accounts & user details
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--mc-border)',
          borderRadius: 14,
          padding: '12px 16px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flex: 1, minWidth: 200 }}>
          <div className="mc-input-wrapper" style={{ flex: 1 }}>
            <Search size={16} className="mc-input-icon-left" />
            <input
              type="search"
              name="admin_users_query"
              id="admin_users_query"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-1p-ignore="true"
              data-protonpass-ignore="true"
              data-bitwarden-ignore="true"
              data-form-type="other"
              placeholder="Search user accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mc-input with-left-icon"
              style={{ height: 40 }}
            />
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="mc-card-table">
        {/* Desktop View */}
        <div className="mc-table-wrap mc-desktop-only">
          <table className="mc-table">
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                <th>User</th>
                <th>Country</th>
                <th>AI Remaining Credit</th>
                <th>Created At</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerTableRows
                  rows={6}
                  columns={[
                    { width: 36, align: 'center' },
                    { width: '200px', hasSubtitle: true },
                    { width: '100px' },
                    { width: '130px' },
                    { width: '100px' },
                    { width: '80px', isBadge: true },
                    { width: '90px', align: 'right' },
                  ]}
                />
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    No system users returned.
                  </td>
                </tr>
              ) : (
                users.map((u, index) => {
                  const isDeleted = u.status === 'deleted' || u.status === false;
                  const creditVal = Number(u.ai_credit ?? u.aiCredit ?? 0).toFixed(2);
                  return (
                    <tr key={u._id}>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--mc-text-muted)', fontSize: 13 }}>
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                              width: 34,
                              height: 34,
                              borderRadius: '50%',
                              objectFit: 'cover',
                              flexShrink: 0,
                              background: '#F1F5F9',
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>{u.name || 'Unnamed'}</div>
                            <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--mc-text-main)' }}>
                        {u.country ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                            <Globe size={13} style={{ color: 'var(--mc-text-muted)' }} />
                            {u.country}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--mc-text-muted)' }}>—</span>
                        )}
                      </td>
                      <td>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontWeight: 600,
                            fontSize: 13,
                            color: '#6366F1',
                            background: '#EEF2FF',
                            border: '1px solid #E0E7FF',
                            padding: '3px 9px',
                            borderRadius: 6,
                          }}
                        >
                          <Sparkles size={13} />
                          {creditVal}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
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
                          {isDeleted ? 'Deleted' : 'Approved'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => setSelectedUser(u)}
                          title="View User Details"
                          style={{
                            padding: '6px 10px',
                            background: 'transparent',
                            border: '1px solid var(--mc-border)',
                            borderRadius: 6,
                            cursor: 'pointer',
                            color: '#2563EB',
                            marginRight: 6,
                          }}
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(u)}
                          title="Edit User"
                          style={{
                            padding: '6px 10px',
                            background: 'transparent',
                            border: '1px solid var(--mc-border)',
                            borderRadius: 6,
                            cursor: 'pointer',
                            color: 'var(--mc-brand-purple)',
                            marginRight: 6,
                          }}
                        >
                          <Edit size={14} />
                        </button>

                        <button
                          onClick={() => setUserToDelete(u)}
                          title="Delete User"
                          style={{
                            padding: '6px 10px',
                            background: 'transparent',
                            border: '1px solid var(--mc-danger-border)',
                            borderRadius: 6,
                            cursor: 'pointer',
                            color: 'var(--mc-danger)',
                          }}
                        >
                          <Trash2 size={14} />
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
            <ShimmerMobileCardList count={4} rowsCount={3} hasTags={false} />
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              No system users returned.
            </div>
          ) : (
            <div className="mc-mobile-card-list">
              {users.map((u, index) => {
                const isDeleted = u.status === 'deleted' || u.status === false;
                const creditVal = Number(u.ai_credit ?? u.aiCredit ?? 0).toFixed(2);
                return (
                  <div key={u._id} className="mc-mobile-card">
                    <div className="mc-mobile-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
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
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            flexShrink: 0,
                            background: '#F1F5F9',
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div className="mc-mobile-card-title">
                            #{((page - 1) * limit + index + 1)} {u.name || 'Unnamed'}
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
                        {isDeleted ? 'Deleted' : 'Approved'}
                      </span>
                    </div>

                    <div className="mc-mobile-card-body">
                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">Country:</span>
                        <span className="mc-mobile-card-value">{u.country || '—'}</span>
                      </div>
                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">AI Remaining Credit:</span>
                        <span className="mc-mobile-card-value" style={{ fontWeight: 600, color: '#6366F1' }}>
                          {creditVal}
                        </span>
                      </div>
                      <div className="mc-mobile-card-row">
                        <span className="mc-mobile-card-label">Created:</span>
                        <span className="mc-mobile-card-value">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                        </span>
                      </div>
                    </div>

                    <div className="mc-mobile-card-actions">
                      <button
                        className="mc-mobile-card-btn"
                        onClick={() => setSelectedUser(u)}
                      >
                        <Eye size={13} color="#2563EB" />
                        <span>View</span>
                      </button>
                      <button
                        className="mc-mobile-card-btn"
                        onClick={() => handleOpenEdit(u)}
                      >
                        <Edit size={13} color="var(--mc-brand-purple)" />
                        <span>Edit</span>
                      </button>
                      <button
                        className="mc-mobile-card-btn danger"
                        onClick={() => setUserToDelete(u)}
                      >
                        <Trash2 size={13} color="var(--mc-danger)" />
                        <span>Delete</span>
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
              Showing {users.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
              {Math.min(page * limit, total)} of {total} registered users
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>Per Page:</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                style={{
                  height: 30,
                  padding: '0 6px',
                  borderRadius: 6,
                  border: '1px solid var(--mc-border)',
                  fontSize: 12,
                  outline: 'none',
                }}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="mc-page-btn"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>
              <span style={{ padding: '6px 10px', fontWeight: 600 }}>Page {page}</span>
              <button
                className="mc-page-btn"
                disabled={users.length < limit || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* USER DETAILS MODAL */}
      {selectedUser && (
        <div className="mc-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div
            className="mc-modal-card"
            style={{ maxWidth: 580, width: '92%' }}
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
                    User Details
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

            <div className="mc-modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
              {/* Profile summary card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: 16,
                  background: '#F8FAFC',
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
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                    background: '#F1F5F9',
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--mc-text-main)', marginBottom: 2 }}>
                    {selectedUser.name || 'Unnamed User'}
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
                  {(selectedUser.status === 'deleted' || selectedUser.status === false) ? 'Deleted' : 'Approved'}
                </span>
              </div>

              {/* Key Metric Highlights */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
                    {selectedUser.country || 'Not specified'}
                  </div>
                </div>

                {/* Currency */}
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
                  gridTemplateColumns: '1fr 1fr',
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
                  <div className="mc-label" style={{ marginBottom: 2 }}>Status</div>
                  <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>
                    {selectedUser.status || 'Approved'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Self Referral Code</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--mc-brand-purple)' }}>
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
                  <div className="mc-label" style={{ marginBottom: 2 }}>Monthly Income</div>
                  <div style={{ color: 'var(--mc-text-main)' }}>
                    {selectedUser.monthly_income !== undefined && selectedUser.monthly_income !== null
                      ? selectedUser.monthly_income
                      : '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Monthly Expense</div>
                  <div style={{ color: 'var(--mc-text-main)' }}>
                    {selectedUser.monthly_expense !== undefined && selectedUser.monthly_expense !== null
                      ? selectedUser.monthly_expense
                      : '—'}
                  </div>
                </div>

                <div>
                  <div className="mc-label" style={{ marginBottom: 2 }}>Created At</div>
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
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {userToDelete && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 420 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mc-danger)' }}>
                <AlertTriangle size={18} />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-danger)' }}>Delete System User</h3>
              </div>
              <button
                onClick={() => setUserToDelete(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="mc-modal-body">
              <p style={{ fontSize: 14, margin: '0 0 12px 0' }}>
                Are you sure you want to remove user <b>{userToDelete.name}</b> ({userToDelete.email})?
              </p>
            </div>
            <div className="mc-modal-footer">
              <button
                onClick={() => setUserToDelete(null)}
                style={{
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  border: '1px solid var(--mc-border)',
                  borderRadius: 6,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  padding: '8px 16px',
                  background: 'var(--mc-danger)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 13,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
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

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 660, width: '94%' }}>
            <div className="mc-modal-header" style={{ borderBottom: '1px solid var(--mc-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: '#EEF2FF',
                    color: 'var(--mc-brand-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Edit size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                    Edit System User
                  </h3>
                  <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                    ID: {editingUser._id}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)', padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser}>
              <div className="mc-modal-body" style={{ maxHeight: '74vh', overflowY: 'auto', padding: '18px 20px' }}>
                {editError && (
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'var(--mc-danger-light)',
                      border: '1px solid var(--mc-danger-border)',
                      color: 'var(--mc-danger)',
                      fontSize: 12,
                      marginBottom: 16,
                    }}
                  >
                    {editError}
                  </div>
                )}

                {/* Section 1: Account Information */}
                <div style={{ marginBottom: 18 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--mc-brand-purple)',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <User size={13} />
                    Account & Credentials
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
                    <div>
                      <label className="mc-label">Full Name *</label>
                      <input
                        type="text"
                        className="mc-input"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="mc-label">Email Address *</label>
                      <input
                        type="email"
                        className="mc-input"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        placeholder="user@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="mc-label">Phone Number</label>
                      <input
                        type="text"
                        className="mc-input"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        placeholder="e.g. +1 555-0199"
                      />
                    </div>
                    <div>
                      <label className="mc-label">Account Status</label>
                      <select
                        className="mc-input"
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'approved' | 'deleted' })}
                      >
                        <option value="approved">Approved</option>
                        <option value="deleted">Deleted</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: AI Credits */}
                <div style={{ marginBottom: 18, borderTop: '1px solid var(--mc-border)', paddingTop: 14 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#6366F1',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Sparkles size={13} />
                    AI Credits Configuration
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
                    <div>
                      <label className="mc-label">AI Remaining Credit</label>
                      <input
                        type="number"
                        step="0.01"
                        className="mc-input"
                        value={editForm.ai_credit}
                        onChange={(e) => setEditForm({ ...editForm, ai_credit: e.target.value as any })}
                        placeholder="e.g. 500.00"
                      />
                    </div>
                    <div>
                      <label className="mc-label">AI Assigned Credit</label>
                      <input
                        type="number"
                        step="0.01"
                        className="mc-input"
                        value={editForm.ai_assigned_credit}
                        onChange={(e) => setEditForm({ ...editForm, ai_assigned_credit: e.target.value as any })}
                        placeholder="e.g. 500.00"
                      />
                    </div>
                  </div>
                </div>


                {/* Section 4: Personal Details */}
                <div style={{ marginBottom: 18, borderTop: '1px solid var(--mc-border)', paddingTop: 14 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--mc-brand-purple)',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <User size={13} />
                    Personal & Profile Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label className="mc-label">Gender</label>
                      <select
                        className="mc-input"
                        value={editForm.gender}
                        onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="mc-label">Date of Birth</label>
                      <input
                        type="date"
                        className="mc-input"
                        value={editForm.dob}
                        onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mc-label">Address</label>
                    <input
                      type="text"
                      className="mc-input"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      placeholder="Street, City, State"
                    />
                  </div>
                </div>

                {/* Section 5: Financial Overview */}
                <div style={{ borderTop: '1px solid var(--mc-border)', paddingTop: 14 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--mc-brand-purple)',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Coins size={13} />
                    Financial Profile
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
                    <div>
                      <label className="mc-label">Monthly Income</label>
                      <input
                        type="number"
                        step="0.01"
                        className="mc-input"
                        value={editForm.monthly_income}
                        onChange={(e) => setEditForm({ ...editForm, monthly_income: e.target.value as any })}
                        placeholder="e.g. 5000"
                      />
                    </div>
                    <div>
                      <label className="mc-label">Monthly Expense</label>
                      <input
                        type="number"
                        step="0.01"
                        className="mc-input"
                        value={editForm.monthly_expense}
                        onChange={(e) => setEditForm({ ...editForm, monthly_expense: e.target.value as any })}
                        placeholder="e.g. 2000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
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
    </div>
  );
};

export { SystemUsersPage as UsersTab };
