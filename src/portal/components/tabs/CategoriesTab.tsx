import React, { useEffect, useState } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  extractListFromResponse,
  type CategoryItem,
} from '../../services/portalApi';
import { Layers, Plus, Edit, Trash2, RefreshCw, X, AlertCircle, Image as ImageIcon } from 'lucide-react';

export const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State (Add)
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descBn, setDescBn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Form State (Edit)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [editNameEn, setEditNameEn] = useState('');
  const [editNameBn, setEditNameBn] = useState('');
  const [editDescEn, setEditDescEn] = useState('');
  const [editDescBn, setEditDescBn] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form State (Delete)
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      const parsed = extractListFromResponse<CategoryItem>(res);
      setCategories(parsed.items);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setEditNameEn(typeof cat.name === 'object' ? cat.name?.en || '' : cat.name || '');
    setEditNameBn(typeof cat.name === 'object' ? cat.name?.bn || '' : '');
    setEditDescEn(typeof cat.description === 'object' ? cat.description?.en || '' : cat.description || '');
    setEditDescBn(typeof cat.description === 'object' ? cat.description?.bn || '' : '');
    setEditImageUrl(cat.image || '');
    setEditError(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    if (!editNameEn.trim()) {
      setEditError('English category name is required.');
      return;
    }

    setIsUpdating(true);
    setEditError(null);

    try {
      await updateCategory({
        _id: editingCategory._id,
        name: {
          en: editNameEn.trim(),
          bn: editNameBn.trim() || undefined,
        },
        description: {
          en: editDescEn.trim() || undefined,
          bn: editDescBn.trim() || undefined,
        },
        image: editImageUrl.trim() || undefined,
      });

      setEditingCategory(null);
      fetchCategories();
    } catch (err: any) {
      setEditError(err?.message || 'Failed to update category.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim()) {
      setFormError('English category name is required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      await createCategory({
        name: {
          en: nameEn.trim(),
          bn: nameBn.trim() || undefined,
        },
        description: {
          en: descEn.trim() || undefined,
          bn: descBn.trim() || undefined,
        },
        image: imageUrl.trim() || undefined,
      });

      setShowAddModal(false);
      setNameEn('');
      setNameBn('');
      setDescEn('');
      setDescBn('');
      setImageUrl('');
      fetchCategories();
    } catch (err: any) {
      setFormError(err?.message || 'Failed to create category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteCategory(categoryToDelete._id);
      setCategoryToDelete(null);
      fetchCategories();
    } catch (err: any) {
      setDeleteError(err?.message || 'Failed to delete category.');
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
            Expense & Income Categories
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Multilingual classification dictionary • <code>GET /categories</code>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="mc-btn-accent"
          >
            <Plus size={14} />
            <span>Add Category</span>
          </button>

          <button
            onClick={fetchCategories}
            disabled={loading}
            className="mc-btn-secondary"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mc-card-table">
        <div className="mc-table-wrap">
          <table className="mc-table">
            <thead>
              <tr>
                <th style={{ width: 60, textAlign: 'center' }}>Sl No</th>
                <th>Category Name</th>
                <th>Bangla Label</th>
                <th>Description</th>
                <th>Icon / Asset</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    No categories configured yet.
                  </td>
                </tr>
              ) : (
                categories.map((c, index) => {
                  const enName = typeof c.name === 'object' ? c.name?.en : c.name;
                  const bnName = typeof c.name === 'object' ? c.name?.bn : '—';
                  const desc = typeof c.description === 'object' ? c.description?.en : c.description;

                  return (
                    <tr key={c._id}>
                      <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--mc-text-muted)', fontSize: 13 }}>
                        {index + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{enName || 'Unnamed'}</div>
                        <div style={{ fontSize: 11, color: 'var(--mc-text-subtle)' }}>ID: {c._id}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: 13, color: bnName ? 'var(--mc-text-main)' : 'var(--mc-text-subtle)' }}>
                          {bnName || '—'}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', maxWidth: 260 }}>
                        {desc || '—'}
                      </td>
                      <td>
                        {c.image ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <img
                              src={c.image}
                              alt=""
                              style={{ width: 24, height: 24, borderRadius: 4, objectFit: 'contain' }}
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <span style={{ fontSize: 11, color: 'var(--mc-text-subtle)', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              Asset
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>None</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => handleOpenEdit(c)}
                          title="Edit Category"
                          style={{
                            padding: '6px 10px',
                            background: '#F8FAFC',
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
                          onClick={() => {
                            setCategoryToDelete(c);
                            setDeleteError(null);
                          }}
                          title="Delete Category"
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
      </div>

      {/* CREATE CATEGORY MODAL */}
      {showAddModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card">
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={18} color="var(--mc-primary)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>Add New Category</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="mc-modal-body">
                {formError && (
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
                    <span>{formError}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Name (English) *</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. Groceries"
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Name (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="যেমন: মুদি বাজার"
                      value={nameBn}
                      onChange={(e) => setNameBn(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Description (English)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="Daily market expenses"
                      value={descEn}
                      onChange={(e) => setDescEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mc-label">Description (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="দৈনন্দিন খরচ"
                      value={descBn}
                      onChange={(e) => setDescBn(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Icon / Image URL</label>
                  <div className="mc-input-wrapper">
                    <ImageIcon size={16} className="mc-input-icon-left" />
                    <input
                      type="url"
                      className="mc-input with-left-icon"
                      placeholder="https://example.com/icon.png"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mc-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mc-btn-accent"
                >
                  {isSubmitting ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card">
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Edit Category
                </h3>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdate}>
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
                    <label className="mc-label">Name (English) *</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="e.g. Groceries"
                      value={editNameEn}
                      onChange={(e) => setEditNameEn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="mc-label">Name (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="যেমন: মুদি বাজার"
                      value={editNameBn}
                      onChange={(e) => setEditNameBn(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Description (English)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="Daily market expenses"
                      value={editDescEn}
                      onChange={(e) => setEditDescEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mc-label">Description (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="দৈনন্দিন খরচ"
                      value={editDescBn}
                      onChange={(e) => setEditDescBn(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Icon / Image URL</label>
                  <div className="mc-input-wrapper">
                    <ImageIcon size={16} className="mc-input-icon-left" />
                    <input
                      type="url"
                      className="mc-input with-left-icon"
                      placeholder="https://example.com/icon.png"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mc-modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="mc-btn-secondary"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="mc-btn-accent"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE CATEGORY MODAL */}
      {categoryToDelete && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 420 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mc-danger)' }}>
                <Trash2 size={18} />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-danger)' }}>
                  Delete Category
                </h3>
              </div>
              <button
                onClick={() => setCategoryToDelete(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="mc-modal-body">
              {deleteError && (
                <div
                  style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: 'var(--mc-danger-light)',
                    border: '1px solid var(--mc-danger-border)',
                    color: 'var(--mc-danger)',
                    fontSize: 12,
                    marginBottom: 12,
                  }}
                >
                  {deleteError}
                </div>
              )}
              <p style={{ fontSize: 14, margin: '0 0 8px 0', color: 'var(--mc-text-main)' }}>
                Are you sure you want to permanently delete category{' '}
                <b>"{typeof categoryToDelete.name === 'object' ? categoryToDelete.name?.en : categoryToDelete.name}"</b>?
              </p>
              <p style={{ fontSize: 12, color: 'var(--mc-text-muted)', margin: 0 }}>
                Existing transactions categorized under this label will need to be re-assigned.
              </p>
            </div>

            <div className="mc-modal-footer">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="mc-btn-secondary"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
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
