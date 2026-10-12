'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  postSingleImage,
  extractListFromResponse,
} from '../../../../helpers/backend';
import {
  Search,
  Trash2,
  Edit,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
  Upload,
  Tag,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../../../../components/common/Shimmer';
import { showSuccessAlert, showErrorToast } from '../../../../helpers/notification';

export interface CategoryItem {
  _id: string;
  name: string;
  description?: Record<string, string>;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

const getErrorMessage = (err: any, fallback: string): string => {
  return (
    err?.errorMessage ||
    err?.errorDetails?.errorMessage ||
    err?.data?.errorMessage ||
    err?.message ||
    fallback
  );
};

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add Form State
  const [addName, setAddName] = useState('');
  const [addImage, setAddImage] = useState('');
  const [addDescription, setAddDescription] = useState<{ en: string; bn: string }>({ en: '', bn: '' });
  const [addModalLang, setAddModalLang] = useState<'en' | 'bn'>('en');
  const [isAdding, setIsAdding] = useState(false);
  const [isUploadingAddImg, setIsUploadingAddImg] = useState(false);

  // Edit Form State
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState<{ en: string; bn: string }>({ en: '', bn: '' });
  const [editModalLang, setEditModalLang] = useState<'en' | 'bn'>('en');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingEditImg, setIsUploadingEditImg] = useState(false);

  // Fetch Categories from GET /categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCategories({
        page,
        limit,
        pagination: 'true',
      });

      const parsed = extractListFromResponse<CategoryItem>(res);
      setCategories(parsed.items || []);
      setTotal(parsed.total || 0);
    } catch (err: any) {
      console.error('Failed to load categories:', err);
      showErrorToast(getErrorMessage(err, 'Failed to load categories.'));
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Client search filtering
  const filteredCategories = categories.filter((cat) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const nameMatch = cat.name?.toLowerCase().includes(q);
    const descEn = typeof cat.description === 'object' ? cat.description?.en?.toLowerCase() : '';
    const descBn = typeof cat.description === 'object' ? cat.description?.bn?.toLowerCase() : '';
    return nameMatch || descEn?.includes(q) || descBn?.includes(q);
  });

  // Image Upload Handler
  const handleUploadImage = async (file: File, type: 'add' | 'edit') => {
    const isAdd = type === 'add';
    if (isAdd) setIsUploadingAddImg(true);
    else setIsUploadingEditImg(true);

    try {
      const res = await postSingleImage({ image: file });
      const imgUrl = res?.image || res?.data?.image || res?.url || res?.data?.url || '';
      if (imgUrl) {
        if (isAdd) setAddImage(imgUrl);
        else setEditImage(imgUrl);
      } else {
        const preview = URL.createObjectURL(file);
        if (isAdd) setAddImage(preview);
        else setEditImage(preview);
      }
    } catch (err: any) {
      console.warn('Image upload fallback preview:', err);
      const preview = URL.createObjectURL(file);
      if (isAdd) setAddImage(preview);
      else setEditImage(preview);
    } finally {
      if (isAdd) setIsUploadingAddImg(false);
      else setIsUploadingEditImg(false);
    }
  };

  // Create Category (POST /categories)
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) {
      showErrorToast('Category name is required.');
      return;
    }

    setIsAdding(true);

    const payload = {
      name: addName.trim(),
      description: {
        en: addDescription.en.trim(),
        bn: addDescription.bn.trim(),
      },
      image: addImage.trim() || undefined,
    };

    try {
      const res = await createCategory(payload);
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg = getErrorMessage(res, 'Failed to create category.');
        showErrorToast(errorMsg);
        return;
      }

      setShowAddModal(false);
      setAddName('');
      setAddImage('');
      setAddDescription({ en: '', bn: '' });
      showSuccessAlert(res?.message || 'Category created successfully!');
      fetchCategories();
    } catch (err: any) {
      const errorMsg = getErrorMessage(err, 'Failed to create category.');
      showErrorToast(errorMsg);
    } finally {
      setIsAdding(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setEditName(cat.name || '');
    setEditImage(cat.image || '');

    const d = cat.description;
    if (typeof d === 'object' && d !== null) {
      setEditDescription({
        en: d.en || '',
        bn: d.bn || '',
      });
    } else if (typeof d === 'string') {
      setEditDescription({ en: d, bn: '' });
    } else {
      setEditDescription({ en: '', bn: '' });
    }
  };

  // Update Category (PATCH /categories)
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?._id) return;
    if (!editName.trim()) {
      showErrorToast('Category name is required.');
      return;
    }

    setIsUpdating(true);

    const payload = {
      _id: editingCategory._id,
      name: editName.trim(),
      description: {
        en: editDescription.en.trim(),
        bn: editDescription.bn.trim(),
      },
      image: editImage.trim() || undefined,
    };

    try {
      const res = await updateCategory(payload);
      if (res?.success === false || res?.statusCode >= 400) {
        const errorMsg = getErrorMessage(res, 'Failed to update category.');
        showErrorToast(errorMsg);
        return;
      }

      setEditingCategory(null);
      showSuccessAlert(res?.message || 'Category updated successfully!');
      fetchCategories();
    } catch (err: any) {
      const errorMsg = getErrorMessage(err, 'Failed to update category.');
      showErrorToast(errorMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Category (DELETE /categories/:id)
  const handleDeleteCategory = async () => {
    if (!categoryToDelete?._id) return;
    setIsDeleting(true);
    try {
      const res = await deleteCategory(categoryToDelete._id);
      if (res?.success === false || res?.statusCode >= 400) {
        showErrorToast(getErrorMessage(res, 'Failed to delete category.'));
        return;
      }
      setCategoryToDelete(null);
      showSuccessAlert(res?.message || 'Category deleted successfully.');
      fetchCategories();
    } catch (err: any) {
      showErrorToast(getErrorMessage(err, 'Failed to delete category.'));
    } finally {
      setIsDeleting(false);
    }
  };

  const getDescriptionPreview = (cat: CategoryItem) => {
    if (!cat.description) return '—';
    if (typeof cat.description === 'string') return cat.description;
    return cat.description.en || cat.description.bn || Object.values(cat.description)[0] || '—';
  };

  return (
    <div>
      {/* Header and Actions */}
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
            Category
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Configure and organize expense transaction categories
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="mc-btn-accent"
          >
            <Plus size={14} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Search Toolbar */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--mc-border)',
          borderRadius: 14,
          padding: '12px 16px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: 'var(--mc-shadow-sm)',
        }}
      >
        <div className="mc-input-wrapper" style={{ flex: 1 }}>
          <Search size={16} className="mc-input-icon-left" />
          <input
            type="search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mc-input with-left-icon"
            style={{ height: 40 }}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="mc-card-table">
        {/* Desktop View */}
        <div className="mc-table-wrap mc-desktop-only">
          <table className="mc-table">
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Created At</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerTableRows
                  rows={5}
                  columns={[
                    { width: 36, align: 'center' },
                    { width: '200px', hasSubtitle: false },
                    { width: '250px' },
                    { width: '100px' },
                    { width: '70px', align: 'right' },
                  ]}
                />
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat, index) => (
                  <tr key={cat._id || index}>
                    <td style={{ textAlign: 'center', fontWeight: 600, color: 'var(--mc-text-muted)', fontSize: 13 }}>
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              objectFit: 'cover',
                              border: '1px solid var(--mc-border)',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              background: 'rgba(109,61,245,0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--mc-brand-purple)',
                            }}
                          >
                            <Tag size={16} />
                          </div>
                        )}
                        <span style={{ fontWeight: 600, color: 'var(--mc-text-main)', fontSize: 13 }}>
                          {cat.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, color: 'var(--mc-text-muted)', maxWidth: 300 }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {getDescriptionPreview(cat)}
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>
                      {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(cat)}
                        title="Edit Category"
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
                        type="button"
                        onClick={() => setCategoryToDelete(cat)}
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="mc-mobile-only">
          {loading ? (
            <ShimmerMobileCardList count={3} rowsCount={2} hasTags={false} />
          ) : filteredCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              No categories found.
            </div>
          ) : (
            <div className="mc-mobile-card-list">
              {filteredCategories.map((cat, index) => (
                <div key={cat._id || index} className="mc-mobile-card">
                  <div className="mc-mobile-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: 'rgba(109,61,245,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--mc-brand-purple)',
                          }}
                        >
                          <Tag size={15} />
                        </div>
                      )}
                      <div>
                        <div className="mc-mobile-card-title">{cat.name}</div>
                        <div className="mc-mobile-card-sub">{getDescriptionPreview(cat)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mc-mobile-card-actions">
                    <button className="mc-mobile-card-btn" onClick={() => handleOpenEdit(cat)}>
                      <Edit size={13} color="var(--mc-brand-purple)" />
                      <span>Edit</span>
                    </button>
                    <button className="mc-mobile-card-btn danger" onClick={() => setCategoryToDelete(cat)}>
                      <Trash2 size={13} color="var(--mc-danger)" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="mc-table-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
              Showing {categories.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
              {Math.min(page * limit, total)} of {total} categories
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
                disabled={categories.length < limit || loading}
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
      {categoryToDelete && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 420 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--mc-danger)' }}>
                <AlertTriangle size={18} />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-danger)' }}>
                  Delete Category
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="mc-modal-body">
              <p style={{ fontSize: 14, margin: '0' }}>
                Are you sure you want to delete category <b>{categoryToDelete.name}</b>?
              </p>
            </div>
            <div className="mc-modal-footer">
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
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
                type="button"
                onClick={handleDeleteCategory}
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

      {/* ADD CATEGORY MODAL */}
      {showAddModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 500 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Plus size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Add Category
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCategory}>
              <div className="mc-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Image Upload at Top */}
                <div>
                  <label className="mc-label">Category Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {addImage ? (
                      <div style={{ position: 'relative', width: 60, height: 60 }}>
                        <img
                          src={addImage}
                          alt="Category preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            objectFit: 'cover',
                            border: '1px solid var(--mc-border)',
                            boxShadow: 'var(--mc-shadow-sm)',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setAddImage('')}
                          style={{
                            position: 'absolute',
                            top: -6,
                            right: -6,
                            background: '#EF4444',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '50%',
                            width: 20,
                            height: 20,
                            cursor: 'pointer',
                            fontSize: 11,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          }}
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          border: '1.5px dashed var(--mc-border)',
                          background: '#F8FAFC',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isUploadingAddImg ? 'wait' : 'pointer',
                          color: 'var(--mc-text-muted)',
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          disabled={isUploadingAddImg}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadImage(file, 'add');
                          }}
                        />
                        {isUploadingAddImg ? (
                          <div className="mc-spin" style={{ fontSize: 16 }}>↻</div>
                        ) : (
                          <>
                            <Upload size={18} color="var(--mc-brand-purple)" />
                            <span style={{ fontSize: 10, marginTop: 2, fontWeight: 500 }}>Upload</span>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="mc-label">
                    Category Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="mc-input"
                    placeholder="e.g. Housing & Utilities"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                  />
                </div>

                {/* Description with Language Tabs */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label className="mc-label" style={{ margin: 0 }}>Description</label>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        type="button"
                        onClick={() => setAddModalLang('en')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: addModalLang === 'en' ? 700 : 500,
                          background: addModalLang === 'en' ? 'var(--mc-brand-purple)' : '#F1F5F9',
                          color: addModalLang === 'en' ? '#FFFFFF' : '#475569',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        🇬🇧 English
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddModalLang('bn')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: addModalLang === 'bn' ? 700 : 500,
                          background: addModalLang === 'bn' ? 'var(--mc-brand-purple)' : '#F1F5F9',
                          color: addModalLang === 'bn' ? '#FFFFFF' : '#475569',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        🇧🇩 বাংলা
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    className="mc-input"
                    placeholder={`Enter description in ${addModalLang === 'en' ? 'English' : 'বাংলা'}...`}
                    value={addDescription[addModalLang] || ''}
                    onChange={(e) => setAddDescription((prev) => ({ ...prev, [addModalLang]: e.target.value }))}
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
                  disabled={isAdding || isUploadingAddImg}
                >
                  {isAdding ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card" style={{ maxWidth: 500 }}>
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit size={18} color="var(--mc-brand-purple)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Edit Category
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mc-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory}>
              <div className="mc-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Image Upload at Top */}
                <div>
                  <label className="mc-label">Category Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {editImage ? (
                      <div style={{ position: 'relative', width: 60, height: 60 }}>
                        <img
                          src={editImage}
                          alt="Category preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            objectFit: 'cover',
                            border: '1px solid var(--mc-border)',
                            boxShadow: 'var(--mc-shadow-sm)',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditImage('')}
                          style={{
                            position: 'absolute',
                            top: -6,
                            right: -6,
                            background: '#EF4444',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '50%',
                            width: 20,
                            height: 20,
                            cursor: 'pointer',
                            fontSize: 11,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          }}
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          border: '1.5px dashed var(--mc-border)',
                          background: '#F8FAFC',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isUploadingEditImg ? 'wait' : 'pointer',
                          color: 'var(--mc-text-muted)',
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          disabled={isUploadingEditImg}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadImage(file, 'edit');
                          }}
                        />
                        {isUploadingEditImg ? (
                          <div className="mc-spin" style={{ fontSize: 16 }}>↻</div>
                        ) : (
                          <>
                            <Upload size={18} color="var(--mc-brand-purple)" />
                            <span style={{ fontSize: 10, marginTop: 2, fontWeight: 500 }}>Upload</span>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="mc-label">
                    Category Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="mc-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>

                {/* Description with Language Tabs */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <label className="mc-label" style={{ margin: 0 }}>Description</label>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        type="button"
                        onClick={() => setEditModalLang('en')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: editModalLang === 'en' ? 700 : 500,
                          background: editModalLang === 'en' ? 'var(--mc-brand-purple)' : '#F1F5F9',
                          color: editModalLang === 'en' ? '#FFFFFF' : '#475569',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        🇬🇧 English
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditModalLang('bn')}
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: editModalLang === 'bn' ? 700 : 500,
                          background: editModalLang === 'bn' ? 'var(--mc-brand-purple)' : '#F1F5F9',
                          color: editModalLang === 'bn' ? '#FFFFFF' : '#475569',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        🇧🇩 বাংলা
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    className="mc-input"
                    placeholder={`Enter description in ${editModalLang === 'en' ? 'English' : 'বাংলা'}...`}
                    value={editDescription[editModalLang] || ''}
                    onChange={(e) => setEditDescription((prev) => ({ ...prev, [editModalLang]: e.target.value }))}
                  />
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
                  className="mc-btn-accent"
                  disabled={isUpdating || isUploadingEditImg}
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
}
