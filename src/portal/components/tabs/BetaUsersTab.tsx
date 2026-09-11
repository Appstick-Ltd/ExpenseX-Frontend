import React, { useEffect, useState, useMemo } from 'react';
import {
  getBetaUsers,
  createBetaUser,
  updateBetaUser,
  deleteBetaUser,
  extractListFromResponse,
  type BetaUser,
} from '../../services/portalApi';
import {
  Search,
  Trash2,
  Eye,
  Edit,
  Plus,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  FileSpreadsheet,
  Check,
} from 'lucide-react';

export const BetaUsersTab: React.FC = () => {
  const [users, setUsers] = useState<BetaUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'all' | 'ios' | 'android' | 'both'>('all');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);

  // Modals
  const [selectedUser, setSelectedUser] = useState<BetaUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<BetaUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add Early-Bird Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPlatform, setAddPlatform] = useState<'ios' | 'android' | 'both'>('both');
  const [addReferral, setAddReferral] = useState('');
  const [addAddress, setAddAddress] = useState('');
  const [addFeatures, setAddFeatures] = useState<string[]>([
    'Expense tracking',
    'Budgeting',
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Edit Early-Bird Modal
  const [editingUser, setEditingUser] = useState<BetaUser | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPlatform, setEditPlatform] = useState<'ios' | 'android' | 'both'>('both');
  const [editReferral, setEditReferral] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editFeatures, setEditFeatures] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBetaUsers({
        search: search.trim() || undefined,
        page,
        limit,
      });

      const parsed = extractListFromResponse<BetaUser>(res);
      let list = parsed.items;
      let totalCount = parsed.total;

      // Fallback: If server returned 0 records and no search query is active, check local backup cache
      if (list.length === 0 && !search.trim()) {
        try {
          const localSaved = JSON.parse(localStorage.getItem('expensex_early_bird_users') || '[]');
          if (Array.isArray(localSaved) && localSaved.length > 0) {
            const mapped: BetaUser[] = localSaved.map((item: any, idx: number) => ({
              _id: item._id || `local-${idx}`,
              name: item.name,
              email: item.email,
              target_platform: (item.platform || item.target_platform || 'both') as 'ios' | 'android' | 'both',
              referral_code: item.referral_code || '',
              address: item.address || '',
              like_features: item.features || item.like_features || [],
              createdAt: item.submittedAt || item.createdAt || new Date().toISOString(),
            }));
            list = mapped;
            totalCount = mapped.length;
          }
        } catch {
          // ignore
        }
      }

      setUsers(list);
      setTotal(totalCount);
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve early-bird users list.');
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle Search Debounce
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  // Local platform filtering
  const filteredUsers = useMemo(() => {
    if (platformFilter === 'all') return users;
    return users.filter((u) => u.target_platform === platformFilter);
  }, [users, platformFilter]);

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await deleteBetaUser(userToDelete._id);
      setUserToDelete(null);
      fetchUsers();
    } catch (err: any) {
      alert(`Delete failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Add Early-Bird User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim() || !addEmail.trim()) {
      setAddError('Name and Email are required.');
      return;
    }
    setIsAdding(true);
    setAddError(null);
    try {
      await createBetaUser({
        name: addName.trim(),
        email: addEmail.trim(),
        target_platform: addPlatform,
        referral_code: addReferral.trim() || undefined,
        address: addAddress.trim() || undefined,
        like_features: addFeatures,
      });
      setShowAddModal(false);
      setAddName('');
      setAddEmail('');
      setAddReferral('');
      setAddAddress('');
      fetchUsers();
    } catch (err: any) {
      setAddError(err?.message || 'Failed to create beta user.');
    } finally {
      setIsAdding(false);
    }
  };

  // Handle Edit Early-Bird User
  const handleOpenEdit = (u: BetaUser) => {
    setEditingUser(u);
    setEditName(u.name || '');
    setEditEmail(u.email || '');
    setEditPlatform(u.target_platform || 'both');
    setEditReferral(u.referral_code || '');
    setEditAddress(u.address || '');
    setEditFeatures(u.like_features || []);
    setEditError(null);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    if (!editName.trim() || !editEmail.trim()) {
      setEditError('Name and Email are required.');
      return;
    }
    setIsUpdating(true);
    setEditError(null);
    try {
      await updateBetaUser(editingUser._id, {
        name: editName.trim(),
        email: editEmail.trim(),
        target_platform: editPlatform,
        referral_code: editReferral.trim() || undefined,
        address: editAddress.trim() || undefined,
        like_features: editFeatures,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update user.');
    } finally {
      setIsUpdating(false);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (filteredUsers.length === 0) return;

    const headers = ['ID', 'Name', 'Email', 'Target Platform', 'Referral Code', 'Address', 'Liked Features', 'Created At'];
    const rows = filteredUsers.map((u) => [
      `"${u._id || ''}"`,
      `"${(u.name || '').replace(/"/g, '""')}"`,
      `"${(u.email || '').replace(/"/g, '""')}"`,
      `"${u.target_platform || ''}"`,
      `"${u.referral_code || ''}"`,
      `"${(u.address || '').replace(/"/g, '""')}"`,
      `"${(u.like_features || []).join(', ').replace(/"/g, '""')}"`,
      `"${u.createdAt ? new Date(u.createdAt).toISOString() : ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ExpenseX_Beta_Users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Title & Toolbar */}
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
            Early-Bird Beta Users
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Customers registered via landing page modal • <code>GET /users/bata-user</code>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn-accent"
          >
            <Plus size={14} />
            <span>Add Early-Bird User</span>
          </button>

          <button
            onClick={exportToCSV}
            disabled={filteredUsers.length === 0}
            className="mc-btn-secondary"
          >
            <FileSpreadsheet size={14} color="var(--mc-brand-purple)" />
            <span>Export CSV</span>
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

      {/* Filter and Search Bar */}
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
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 8, flex: 1, minWidth: 260 }}>
          <div className="mc-input-wrapper" style={{ maxWidth: 360 }}>
            <Search size={16} className="mc-input-icon-left" />
            <input
              type="search"
              name="admin_beta_search"
              id="admin_beta_search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-1p-ignore="true"
              data-form-type="other"
              placeholder="Search by name, email, or referral..."
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

        {/* Platform Filter Buttons */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--mc-text-muted)', marginRight: 4 }}>Platform:</span>
          {(['all', 'ios', 'android', 'both'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: platformFilter === p ? 'rgba(109, 61, 245, 0.4)' : 'var(--mc-border)',
                background: platformFilter === p ? 'linear-gradient(135deg, rgba(109, 61, 245, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)' : '#FFFFFF',
                color: platformFilter === p ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                fontSize: 12,
                fontWeight: platformFilter === p ? 700 : 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="mc-card-table">
        <div className="mc-table-wrap">
          <table className="mc-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Target Platform</th>
                <th>Referral Code</th>
                <th>Selected Features</th>
                <th>Address / Location</th>
                <th>Registered At</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--mc-text-muted)' }}>
                    Loading early-bird users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--mc-text-muted)' }}>
                    {error ? (
                      <span style={{ color: 'var(--mc-danger)' }}>{error}</span>
                    ) : (
                      'No matching early-bird registrations found.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--mc-text-main)' }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>{user.email}</div>
                    </td>
                    <td>
                      {user.target_platform === 'ios' && <span className="mc-badge mc-badge-ios">iOS</span>}
                      {user.target_platform === 'android' && <span className="mc-badge mc-badge-android">Android</span>}
                      {user.target_platform === 'both' && <span className="mc-badge mc-badge-both">iOS & Android</span>}
                    </td>
                    <td>
                      {user.referral_code ? (
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: 11,
                            fontWeight: 600,
                            background: '#F1F5F9',
                            padding: '3px 6px',
                            borderRadius: 4,
                            color: '#334155',
                          }}
                        >
                          {user.referral_code}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--mc-text-subtle)', fontSize: 12 }}>—</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 220 }}>
                        {(user.like_features || []).slice(0, 2).map((feat, idx) => (
                          <span key={idx} className="mc-badge mc-badge-tag" style={{ fontSize: 11 }}>
                            {feat}
                          </span>
                        ))}
                        {(user.like_features || []).length > 2 && (
                          <span className="mc-badge mc-badge-tag" style={{ fontSize: 10 }}>
                            +{(user.like_features || []).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.address || '—'}
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', whiteSpace: 'nowrap' }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => setSelectedUser(user)}
                        title="View Full Profile"
                        style={{
                          padding: '6px 10px',
                          background: 'transparent',
                          border: '1px solid var(--mc-border)',
                          borderRadius: 6,
                          cursor: 'pointer',
                          color: 'var(--mc-text-main)',
                          marginRight: 6,
                        }}
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(user)}
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
                        onClick={() => setUserToDelete(user)}
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

        {/* Pagination Footer */}
        <div className="mc-pagination">
          <div>
            Showing <b>{filteredUsers.length}</b> of <b>{total || filteredUsers.length}</b> records
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
                <option value={50}>50</option>
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
                disabled={filteredUsers.length < limit || loading}
                onClick={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedUser && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card">
            <div className="mc-modal-header">
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>Beta Customer Details</h3>
                <span style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>ID: {selectedUser._id}</span>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <div className="mc-label">Full Name</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedUser.name}</div>
                </div>
                <div>
                  <div className="mc-label">Email Address</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{selectedUser.email}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <div className="mc-label">Target Platform</div>
                  <div>
                    {selectedUser.target_platform === 'ios' && <span className="mc-badge mc-badge-ios">iOS Only</span>}
                    {selectedUser.target_platform === 'android' && <span className="mc-badge mc-badge-android">Android Only</span>}
                    {selectedUser.target_platform === 'both' && <span className="mc-badge mc-badge-both">iOS & Android</span>}
                  </div>
                </div>
                <div>
                  <div className="mc-label">Referral Code Used</div>
                  <div style={{ fontSize: 13, fontFamily: 'monospace' }}>
                    {selectedUser.referral_code || 'None (Organic)'}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div className="mc-label">Postal / Physical Address</div>
                <div style={{ fontSize: 13, color: selectedUser.address ? 'var(--mc-text-main)' : 'var(--mc-text-subtle)' }}>
                  {selectedUser.address || 'Not specified'}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div className="mc-label">Desired Features</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {(selectedUser.like_features || []).map((feat, idx) => (
                    <span key={idx} className="mc-badge mc-badge-tag" style={{ padding: '4px 10px' }}>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mc-label">Raw Record Telemetry</div>
                <pre
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid var(--mc-border)',
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 11,
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                  }}
                >
                  {JSON.stringify(selectedUser, null, 2)}
                </pre>
              </div>
            </div>

            <div className="mc-modal-footer">
              <button
                onClick={() => setSelectedUser(null)}
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {userToDelete && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 420 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mc-danger)' }}>
                <AlertTriangle size={18} />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-danger)' }}>Confirm Delete</h3>
              </div>
              <button
                onClick={() => setUserToDelete(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body">
              <p style={{ fontSize: 14, margin: '0 0 12px 0', color: 'var(--mc-text-main)' }}>
                Are you sure you want to delete early-bird registration for <b>{userToDelete.name}</b> ({userToDelete.email})?
              </p>
              <p style={{ fontSize: 12, color: 'var(--mc-text-muted)', margin: 0 }}>
                This will trigger <code>DELETE /users/bata-user/{userToDelete._id}</code> and permanently remove their reservation from the database.
              </p>
            </div>

            <div className="mc-modal-footer">
              <button
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
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
                onClick={handleDeleteConfirm}
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
                {isDeleting ? 'Deleting...' : 'Delete Record'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EARLY-BIRD USER MODAL */}
      {showAddModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 520 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Add Early-Bird Registration
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUser}>
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
                    <label className="mc-label">Target Platform</label>
                    <select
                      className="mc-input"
                      value={addPlatform}
                      onChange={(e) => setAddPlatform(e.target.value as any)}
                    >
                      <option value="both">Both (iOS & Android)</option>
                      <option value="ios">Apple iOS</option>
                      <option value="android">Google Android</option>
                    </select>
                  </div>
                  <div>
                    <label className="mc-label">Referral Code (Optional)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. REF-12345"
                      value={addReferral}
                      onChange={(e) => setAddReferral(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Address / Location</label>
                  <input
                    type="text"
                    className="mc-input"
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={addAddress}
                    onChange={(e) => setAddAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Desired Features</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Expense tracking', 'Budgeting', 'AI receipt scan', 'SMS parsing', 'Multi-currency'].map((f) => {
                      const selected = addFeatures.includes(f);
                      return (
                        <button
                          type="button"
                          key={f}
                          onClick={() => {
                            if (selected) {
                              setAddFeatures(addFeatures.filter((x) => x !== f));
                            } else {
                              setAddFeatures([...addFeatures, f]);
                            }
                          }}
                          style={{
                            padding: '5px 10px',
                            borderRadius: 6,
                            border: '1px solid',
                            borderColor: selected ? 'var(--mc-brand-purple)' : 'var(--mc-border)',
                            background: selected ? 'rgba(109, 61, 245, 0.08)' : '#FFFFFF',
                            color: selected ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          {selected && <Check size={12} />}
                          <span>{f}</span>
                        </button>
                      );
                    })}
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
                  {isAdding ? 'Registering...' : 'Register Early-Bird User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT EARLY-BIRD USER MODAL */}
      {editingUser && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 520 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Edit Early-Bird User
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
                    <label className="mc-label">Target Platform</label>
                    <select
                      className="mc-input"
                      value={editPlatform}
                      onChange={(e) => setEditPlatform(e.target.value as any)}
                    >
                      <option value="both">Both (iOS & Android)</option>
                      <option value="ios">Apple iOS</option>
                      <option value="android">Google Android</option>
                    </select>
                  </div>
                  <div>
                    <label className="mc-label">Referral Code</label>
                    <input
                      type="text"
                      className="mc-input"
                      value={editReferral}
                      onChange={(e) => setEditReferral(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Address / Location</label>
                  <input
                    type="text"
                    className="mc-input"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mc-label">Desired Features</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['Expense tracking', 'Budgeting', 'AI receipt scan', 'SMS parsing', 'Multi-currency'].map((f) => {
                      const selected = editFeatures.includes(f);
                      return (
                        <button
                          type="button"
                          key={f}
                          onClick={() => {
                            if (selected) {
                              setEditFeatures(editFeatures.filter((x) => x !== f));
                            } else {
                              setEditFeatures([...editFeatures, f]);
                            }
                          }}
                          style={{
                            padding: '5px 10px',
                            borderRadius: 6,
                            border: '1px solid',
                            borderColor: selected ? 'var(--mc-brand-purple)' : 'var(--mc-border)',
                            background: selected ? 'rgba(109, 61, 245, 0.08)' : '#FFFFFF',
                            color: selected ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          {selected && <Check size={12} />}
                          <span>{f}</span>
                        </button>
                      );
                    })}
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
