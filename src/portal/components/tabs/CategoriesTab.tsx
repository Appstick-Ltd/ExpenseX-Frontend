import React, { useEffect, useState, useMemo } from 'react';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  extractListFromResponse,
  type CategoryItem,
} from '../../services/portalApi';
import {
  Layers,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  X,
  AlertCircle,
  Image as ImageIcon,
  TrendingDown,
  TrendingUp,
  Globe,
  User,
  Search,
} from 'lucide-react';
import { ShimmerTableRows, ShimmerMobileCardList } from '../common/Shimmer';

export const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filters
  const [activeTypeTab, setActiveTypeTab] = useState<'all' | 'expense' | 'income'>('all');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'global' | 'personal'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State (Add)
  const [categoryType, setCategoryType] = useState<'expense' | 'income' | 'both'>('expense');
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descBn, setDescBn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Form State (Edit)
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [editType, setEditType] = useState<'expense' | 'income' | 'both'>('expense');
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
      // Pass pagination=false to fetch full list
      const res = await getCategories({ pagination: false });
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

  // Filtered categories computed in memory for instant UX
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      // 1. Type Filter
      const catType = (c.type || 'expense').toLowerCase();
      if (activeTypeTab === 'expense' && catType !== 'expense' && catType !== 'both') return false;
      if (activeTypeTab === 'income' && catType !== 'income' && catType !== 'both') return false;

      // 2. Scope Filter
      const isPersonal = Boolean(c.user);
      if (scopeFilter === 'global' && isPersonal) return false;
      if (scopeFilter === 'personal' && !isPersonal) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const enName = typeof c.name === 'object' ? c.name?.en || '' : c.name || '';
        const bnName = typeof c.name === 'object' ? c.name?.bn || '' : '';
        const match =
          enName.toLowerCase().includes(query) ||
          bnName.toLowerCase().includes(query) ||
          c._id.toLowerCase().includes(query);
        if (!match) return false;
      }

      return true;
    });
  }, [categories, activeTypeTab, scopeFilter, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    let expense = 0;
    let income = 0;
    let globalCount = 0;
    let personalCount = 0;

    categories.forEach((c) => {
      const t = (c.type || 'expense').toLowerCase();
      if (t === 'expense' || t === 'both') expense++;
      if (t === 'income' || t === 'both') income++;
      if (c.user) personalCount++;
      else globalCount++;
    });

    return { total: categories.length, expense, income, globalCount, personalCount };
  }, [categories]);

  const handleOpenAddModal = () => {
    setCategoryType(activeTypeTab === 'income' ? 'income' : 'expense');
    setNameEn('');
    setNameBn('');
    setDescEn('');
    setDescBn('');
    setImageUrl('');
    setFormError(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setEditType((cat.type as any) || 'expense');
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
        type: editType,
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
        type: categoryType,
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
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
            Expense & Income Categories
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Global System Defaults & User-Created Personal Categories • <code>GET /categories</code>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleOpenAddModal} className="mc-btn-accent">
            <Plus size={14} />
            <span>Add Global Category</span>
          </button>

          <button onClick={fetchCategories} disabled={loading} className="mc-btn-secondary">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Primary Category Type Tabs & Scope Filter Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {/* Type Segmented Buttons */}
        <div style={{ display: 'flex', gap: 6, background: '#F1F5F9', padding: 3, borderRadius: 10 }}>
          <button
            type="button"
            onClick={() => setActiveTypeTab('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              background: activeTypeTab === 'all' ? '#FFFFFF' : 'transparent',
              color: activeTypeTab === 'all' ? 'var(--mc-text-main)' : 'var(--mc-text-muted)',
              boxShadow: activeTypeTab === 'all' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <span>All</span>
            <span style={{ fontSize: 11, background: '#E2E8F0', padding: '1px 6px', borderRadius: 10 }}>
              {counts.total}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTypeTab('expense')}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              background: activeTypeTab === 'expense' ? '#FFFFFF' : 'transparent',
              color: activeTypeTab === 'expense' ? '#EF4444' : 'var(--mc-text-muted)',
              boxShadow: activeTypeTab === 'expense' ? '0 1px 3px rgba(239,68,68,0.15)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <TrendingDown size={14} color="#EF4444" />
            <span>Expense</span>
            <span style={{ fontSize: 11, background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '1px 6px', borderRadius: 10 }}>
              {counts.expense}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTypeTab('income')}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              background: activeTypeTab === 'income' ? '#FFFFFF' : 'transparent',
              color: activeTypeTab === 'income' ? '#10B981' : 'var(--mc-text-muted)',
              boxShadow: activeTypeTab === 'income' ? '0 1px 3px rgba(16,185,129,0.15)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <TrendingUp size={14} color="#10B981" />
            <span>Income</span>
            <span style={{ fontSize: 11, background: 'rgba(16,185,129,0.12)', color: '#10B981', padding: '1px 6px', borderRadius: 10 }}>
              {counts.income}
            </span>
          </button>
        </div>

        {/* Right side: Search & Scope Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Scope Filter */}
          <select
            value={scopeFilter}
            onChange={(e) => setScopeFilter(e.target.value as any)}
            className="mc-input"
            style={{ padding: '6px 10px', fontSize: 12.5, width: 'auto', minWidth: 140 }}
          >
            <option value="all">All Scope ({counts.total})</option>
            <option value="global">🌐 Global (Admin) ({counts.globalCount})</option>
            <option value="personal">👤 User Personal ({counts.personalCount})</option>
          </select>

          {/* Search Input */}
          <div className="mc-input-wrapper" style={{ minWidth: 200 }}>
            <Search size={14} className="mc-input-icon-left" />
            <input
              type="text"
              placeholder="Search category..."
              className="mc-input with-left-icon"
              style={{ padding: '6px 10px 6px 30px', fontSize: 12.5 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="mc-card-table">
        {/* Desktop Table View */}
        <div className="mc-table-wrap mc-desktop-only">
          <table className="mc-table">
            <thead>
              <tr>
                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                <th>Category Name</th>
                <th style={{ width: 110 }}>Type</th>
                <th style={{ width: 140 }}>Scope</th>
                <th>Bangla Label</th>
                <th>Description</th>
                <th>Icon / Asset</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerTableRows
                  rows={6}
                  columns={[
                    { width: 36, align: 'center' },
                    { width: '180px', hasSubtitle: true },
                    { width: '100px' },
                    { width: '120px' },
                    { width: '120px' },
                    { width: '140px' },
                    { width: 36, align: 'center' },
                    { width: '70px', align: 'right' },
                  ]}
                />
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px 0', color: 'var(--mc-text-muted)' }}>
                    No categories found for this filter.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((c, index) => {
                  const enName = typeof c.name === 'object' ? c.name?.en : c.name;
                  const bnName = typeof c.name === 'object' ? c.name?.bn : '—';
                  const desc = typeof c.description === 'object' ? c.description?.en : c.description;
                  const catType = (c.type || 'expense').toLowerCase();
                  const isPersonal = Boolean(c.user);

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
                        {catType === 'income' ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '2px 8px',
                              borderRadius: 9999,
                              fontSize: 11,
                              fontWeight: 600,
                              background: 'rgba(16, 185, 129, 0.1)',
                              color: '#10B981',
                              border: '1px solid rgba(16, 185, 129, 0.25)',
                            }}
                          >
                            <TrendingUp size={11} />
                            <span>Income</span>
                          </span>
                        ) : catType === 'both' ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '2px 8px',
                              borderRadius: 9999,
                              fontSize: 11,
                              fontWeight: 600,
                              background: 'rgba(99, 102, 241, 0.1)',
                              color: '#6366F1',
                              border: '1px solid rgba(99, 102, 241, 0.25)',
                            }}
                          >
                            <span>Both</span>
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '2px 8px',
                              borderRadius: 9999,
                              fontSize: 11,
                              fontWeight: 600,
                              background: 'rgba(239, 68, 68, 0.08)',
                              color: '#EF4444',
                              border: '1px solid rgba(239, 68, 68, 0.2)',
                            }}
                          >
                            <TrendingDown size={11} />
                            <span>Expense</span>
                          </span>
                        )}
                      </td>
                      <td>
                        {isPersonal ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '2px 8px',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 600,
                              background: 'rgba(245, 158, 11, 0.1)',
                              color: '#D97706',
                              border: '1px solid rgba(245, 158, 11, 0.2)',
                            }}
                            title={`Created by User: ${c.user}`}
                          >
                            <User size={11} />
                            <span>User Personal</span>
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 4,
                              padding: '2px 8px',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 600,
                              background: 'rgba(37, 99, 235, 0.08)',
                              color: '#2563EB',
                              border: '1px solid rgba(37, 99, 235, 0.2)',
                            }}
                          >
                            <Globe size={11} />
                            <span>Global (Admin)</span>
                          </span>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: 13, color: bnName ? 'var(--mc-text-main)' : 'var(--mc-text-subtle)' }}>
                          {bnName || '—'}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', maxWidth: 220 }}>
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

        {/* Mobile Native Card View (< 768px) */}
        <div className="mc-mobile-only">
          {loading ? (
            <ShimmerMobileCardList count={4} rowsCount={2} hasTags={false} />
          ) : filteredCategories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              No categories configured yet.
            </div>
          ) : (
            <div className="mc-mobile-card-list">
              {filteredCategories.map((c, index) => {
                const enName = typeof c.name === 'object' ? c.name?.en : c.name;
                const bnName = typeof c.name === 'object' ? c.name?.bn : '';
                const desc = typeof c.description === 'object' ? c.description?.en : c.description;
                const catType = (c.type || 'expense').toLowerCase();
                const isPersonal = Boolean(c.user);

                return (
                  <div key={c._id} className="mc-mobile-card">
                    <div className="mc-mobile-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        {c.image ? (
                          <img
                            src={c.image}
                            alt=""
                            style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'contain', background: '#F8FAFC', border: '1px solid var(--mc-border)', padding: 2 }}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mc-text-subtle)' }}>
                            <Layers size={18} />
                          </div>
                        )}
                        <div style={{ minWidth: 0 }}>
                          <div className="mc-mobile-card-title">
                            #{index + 1} {enName || 'Unnamed'}
                          </div>
                          {bnName && <div className="mc-mobile-card-sub">বাংলা: {bnName}</div>}
                          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: '1px 6px',
                                borderRadius: 4,
                                background: catType === 'income' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                                color: catType === 'income' ? '#10B981' : '#EF4444',
                              }}
                            >
                              {catType.toUpperCase()}
                            </span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 600,
                                padding: '1px 6px',
                                borderRadius: 4,
                                background: isPersonal ? 'rgba(245,158,11,0.1)' : 'rgba(37,99,235,0.08)',
                                color: isPersonal ? '#D97706' : '#2563EB',
                              }}
                            >
                              {isPersonal ? 'Personal' : 'Global'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {desc && (
                      <div className="mc-mobile-card-body">
                        <p style={{ margin: 0, color: 'var(--mc-text-muted)', fontSize: 12, lineHeight: 1.4 }}>
                          {desc}
                        </p>
                      </div>
                    )}

                    <div className="mc-mobile-card-actions">
                      <button
                        className="mc-mobile-card-btn"
                        onClick={() => handleOpenEdit(c)}
                        style={{ color: 'var(--mc-brand-purple)' }}
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        className="mc-mobile-card-btn danger"
                        onClick={() => {
                          setCategoryToDelete(c);
                          setDeleteError(null);
                        }}
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* CREATE CATEGORY MODAL */}
      {showAddModal && (
        <div className="mc-modal-overlay">
          <div className="mc-modal-card">
            <div className="mc-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={18} color="var(--mc-primary)" />
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
                  Add Global Category (Admin)
                </h3>
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

                {/* Category Type Selector */}
                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Category Classification / Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setCategoryType('expense')}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: categoryType === 'expense' ? '2px solid #EF4444' : '1px solid var(--mc-border)',
                        background: categoryType === 'expense' ? 'rgba(239,68,68,0.06)' : '#FAFAFA',
                        color: categoryType === 'expense' ? '#DC2626' : 'var(--mc-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <TrendingDown size={16} color={categoryType === 'expense' ? '#DC2626' : '#94A3B8'} />
                      <span>Expense (খরচ)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCategoryType('income')}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: categoryType === 'income' ? '2px solid #10B981' : '1px solid var(--mc-border)',
                        background: categoryType === 'income' ? 'rgba(16,185,129,0.08)' : '#FAFAFA',
                        color: categoryType === 'income' ? '#059669' : 'var(--mc-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <TrendingUp size={16} color={categoryType === 'income' ? '#059669' : '#94A3B8'} />
                      <span>Income (আয়)</span>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <label className="mc-label">Name (English) *</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder={categoryType === 'income' ? 'e.g. Salary, Freelance' : 'e.g. Groceries, Shopping'}
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
                      placeholder={categoryType === 'income' ? 'যেমন: মাসিক বেতন' : 'যেমন: মুদি বাজার'}
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
                      placeholder="Category description"
                      value={descEn}
                      onChange={(e) => setDescEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mc-label">Description (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="বিবরণ"
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
                  {isSubmitting ? 'Creating...' : `Create Global ${categoryType === 'income' ? 'Income' : 'Expense'} Category`}
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

                {/* Edit Category Type */}
                <div style={{ marginBottom: 14 }}>
                  <label className="mc-label">Category Classification / Type *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setEditType('expense')}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: editType === 'expense' ? '2px solid #EF4444' : '1px solid var(--mc-border)',
                        background: editType === 'expense' ? 'rgba(239,68,68,0.06)' : '#FAFAFA',
                        color: editType === 'expense' ? '#DC2626' : 'var(--mc-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <TrendingDown size={16} color={editType === 'expense' ? '#DC2626' : '#94A3B8'} />
                      <span>Expense (খরচ)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditType('income')}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: editType === 'income' ? '2px solid #10B981' : '1px solid var(--mc-border)',
                        background: editType === 'income' ? 'rgba(16,185,129,0.08)' : '#FAFAFA',
                        color: editType === 'income' ? '#059669' : 'var(--mc-text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <TrendingUp size={16} color={editType === 'income' ? '#059669' : '#94A3B8'} />
                      <span>Income (আয়)</span>
                    </button>
                  </div>
                </div>

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
                      placeholder="Category description"
                      value={editDescEn}
                      onChange={(e) => setEditDescEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mc-label">Description (Bangla)</label>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="বিবরণ"
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
