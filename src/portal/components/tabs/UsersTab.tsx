import React, { useEffect, useState, useCallback } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  extractListFromResponse,
  type UserItem,
} from '../../services/portalApi';
import {
  Search,
  Trash2,
  Edit,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  Shield,
  User,
} from 'lucide-react';

export const UsersTab: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addRole, setAddRole] = useState('user');
  const [addPassword, setAddPassword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editRole, setEditRole] = useState('user');
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers({
        search: search.trim() || undefined,
        role: roleFilter || undefined,
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
  }, [search, roleFilter, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
      await createUser({
        name: addName.trim(),
        email: addEmail.trim(),
        password: addPassword || '123456',
        phoneNumber: addPhone.trim() || undefined,
        role: addRole,
      });
      setShowAddModal(false);
      setAddName('');
      setAddEmail('');
      setAddPhone('');
      setAddPassword('');
      fetchUsers();
    } catch (err: any) {
      setAddError(err?.message || 'Failed to create user.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleOpenEdit = (u: UserItem) => {
    setEditingUser(u);
    setEditName(u.name || '');
    setEditEmail(u.email || '');
    setEditPhone(u.phoneNumber || '');
    setEditRole(u.role || 'user');
    setEditError(null);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editName.trim() || !editEmail.trim()) {
      setEditError('Name and email are required.');
      return;
    }
    setIsUpdating(true);
    setEditError(null);
    try {
      await updateUser(editingUser._id, {
        name: editName.trim(),
        email: editEmail.trim(),
        phoneNumber: editPhone.trim() || undefined,
        role: editRole,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update user.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await deleteUser(userToDelete._id);
      setUserToDelete(null);
      fetchUsers();
    } catch (err: any) {
      alert(`Delete user failed: ${err?.message || 'Error'}`);
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
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
            System User Management
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Active registered accounts & roles • <code>GET /users</code>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn-accent"
          >
            <Plus size={14} />
            <span>Add User</span>
          </button>

          <button
            onClick={fetchUsers}
            disabled={loading}
            className="mc-btn-secondary"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
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
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 8, flex: 1, minWidth: 200, flexWrap: 'wrap' }}>
          <div className="mc-input-wrapper" style={{ flex: 1, minWidth: 180 }}>
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
          <button type="submit" className="mc-btn-accent">
            Search
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            style={{
              height: 40,
              padding: '0 12px',
              borderRadius: 8,
              border: '1px solid var(--mc-border)',
              fontSize: 13,
              background: '#FFFFFF',
              color: 'var(--mc-text-main)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="">All Roles</option>
            <option value="admin">Superadmin</option>
            <option value="user">Standard User</option>
          </select>
        </div>
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
                <th>Role</th>
                <th>Phone Number</th>
                <th>Created At</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    No system users returned.
                  </td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <tr key={u._id}>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--mc-text-muted)', fontSize: 13 }}>
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{u.name || 'Unnamed'}</div>
                      <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>{u.email}</div>
                    </td>
                    <td>
                      <span
                        className="mc-badge"
                        style={{
                          background: u.role?.toLowerCase().includes('admin') ? '#FEF3C7' : '#F1F5F9',
                          color: u.role?.toLowerCase().includes('admin') ? '#B45309' : '#475569',
                          border: u.role?.toLowerCase().includes('admin') ? '1px solid #FDE68A' : '1px solid #E2E8F0',
                        }}
                      >
                        {u.role?.toLowerCase().includes('admin') ? <Shield size={12} /> : <User size={12} />}
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>{u.phoneNumber || '—'}</td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Native Card View (< 768px) */}
        <div className="mc-mobile-only">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              No system users returned.
            </div>
          ) : (
            <div className="mc-mobile-card-list">
              {users.map((u, index) => (
                <div key={u._id} className="mc-mobile-card">
                  <div className="mc-mobile-card-header">
                    <div style={{ minWidth: 0 }}>
                      <div className="mc-mobile-card-title">
                        #{((page - 1) * limit + index + 1)} {u.name || 'Unnamed'}
                      </div>
                      <div className="mc-mobile-card-sub">{u.email}</div>
                    </div>
                    <span
                      className="mc-badge"
                      style={{
                        background: u.role?.toLowerCase().includes('admin') ? '#FEF3C7' : '#F1F5F9',
                        color: u.role?.toLowerCase().includes('admin') ? '#B45309' : '#475569',
                        border: u.role?.toLowerCase().includes('admin') ? '1px solid #FDE68A' : '1px solid #E2E8F0',
                        fontSize: 10,
                      }}
                    >
                      {u.role?.toLowerCase().includes('admin') ? <Shield size={11} /> : <User size={11} />}
                      {u.role || 'user'}
                    </span>
                  </div>

                  <div className="mc-mobile-card-body">
                    <div className="mc-mobile-card-row">
                      <span className="mc-mobile-card-label">Phone:</span>
                      <span className="mc-mobile-card-value">{u.phoneNumber || '—'}</span>
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
                      onClick={() => handleOpenEdit(u)}
                      style={{ color: 'var(--mc-brand-purple)' }}
                    >
                      <Edit size={13} />
                      <span>Edit User</span>
                    </button>

                    <button
                      className="mc-mobile-card-btn danger"
                      onClick={() => setUserToDelete(u)}
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mc-pagination">
          <div>
            Total <b>{total || users.length}</b> users
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Per page:</span>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Phone Number</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="+8801700000000"
                      value={addPhone}
                      onChange={(e) => setAddPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mc-label">Assigned Role</label>
                    <select
                      className="mc-input"
                      value={addRole}
                      onChange={(e) => setAddRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
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
          <div className="mc-modal-card" style={{ maxWidth: 480 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Edit System User
                </h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser}>
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
                      marginBottom: 14,
                    }}
                  >
                    {editError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Full Name *</label>
                    <input
                      type="text"
                      className="mc-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Email Address *</label>
                    <input
                      type="email"
                      className="mc-input"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Phone Number</label>
                    <input
                      type="text"
                      className="mc-input"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mc-label">Assigned Role</label>
                    <select
                      className="mc-input"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
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
