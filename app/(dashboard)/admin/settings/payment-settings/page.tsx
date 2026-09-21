'use client';
import React, { useEffect, useState } from 'react';
import {
  fetchAdminPaymentMethod,
  postPaymentMethod,
  delPaymentMethod,
  postSingleImage,
} from '../../../../helpers/backend';
import {
  CreditCard,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  X,
  AlertCircle,
  CheckCircle2,
  Lock,
  Key,
  Upload,
} from 'lucide-react';
import { Shimmer } from '../../../../components/common/Shimmer';

export interface PaymentMethodItem {
  _id: string;
  name: string;
  type: 'stripe' | 'razorpay' | 'paypal' | 'mollie' | string;
  image?: string;
  status?: boolean | string;
  config?: {
    clientId?: string;
    clientSecret?: string;
    mode?: 'sandbox' | 'live' | string;
    [key: string]: any;
  };
  createdAt?: string;
  [key: string]: any;
}

export default function AdminPaymentSettingsPage() {
  const [methods, setMethods] = useState<PaymentMethodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PaymentMethodItem | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<'stripe' | 'razorpay' | 'paypal' | 'mollie'>('stripe');
  const [image, setImage] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [mode, setMode] = useState<'sandbox' | 'live'>('sandbox');
  const [uploadingImage, setUploadingImage] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setSaveError(null);
    try {
      const res = await fetchAdminPaymentMethod();
      const list = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res)
        ? res
        : [];
      setMethods(list);
    } catch (err: any) {
      console.warn('Failed to load payment methods:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName('Stripe Checkout');
    setType('stripe');
    setImage('/stripe-badge.png');
    setClientId('');
    setClientSecret('');
    setMode('sandbox');
    setSaveError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: PaymentMethodItem) => {
    setEditingItem(item);
    setName(item.name || '');
    setType((item.type as any) || 'stripe');
    setImage(item.image || '');
    setClientId(item.config?.clientId || '');
    setClientSecret(item.config?.clientSecret || '');
    setMode(item.config?.mode === 'live' ? 'live' : 'sandbox');
    setSaveError(null);
    setModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const res = await postSingleImage({ image: file, image_name: 'payment_method' });
      const imgUrl = res?.image || res?.data?.image || res?.url || '';
      if (imgUrl) setImage(imgUrl);
    } catch (err) {
      setImage(URL.createObjectURL(file));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const payload: Record<string, any> = {
      _id: editingItem?._id || undefined,
      name: name.trim(),
      type,
      image: image.trim(),
      config: {
        clientId: clientId.trim(),
        clientSecret: clientSecret.trim(),
        mode,
      },
    };

    try {
      const res = await postPaymentMethod(payload);
      setSaveSuccess(res?.msg || res?.message || 'Payment method saved successfully!');
      setTimeout(() => setSaveSuccess(null), 4000);
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to save payment gateway.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment method?')) return;
    setDeletingId(id);
    try {
      await delPaymentMethod({ _id: id });
      setSaveSuccess('Payment gateway removed successfully.');
      setTimeout(() => setSaveSuccess(null), 3000);
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Failed to delete payment method.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="mc-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(109,61,245,0.12), rgba(139,92,246,0.06))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mc-brand-purple)',
            }}
          >
            <CreditCard size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: 'var(--mc-text-main)' }}>
              Payment Settings & Gateways
            </h2>
            <p style={{ fontSize: 13, margin: 0, color: 'var(--mc-text-muted)' }}>
              Configure active merchant payment gateways, API keys, webhook secrets, and test environments.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            onClick={loadData}
            className="mc-btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <RefreshCw size={14} />
            <span>Reload</span>
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="mc-btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            <Plus size={16} />
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>

      {/* Notice Banner matching roofstick */}
      <div
        style={{
          background: '#0F172A',
          color: '#F8FAFC',
          padding: '12px 18px',
          borderRadius: 8,
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            background: 'var(--mc-brand-purple)',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Notice
        </span>
        <span>
          Supported payment gateways: <strong>Stripe</strong> and <strong>Razorpay</strong> are available. PayPal and Mollie will be supported in upcoming service releases.
        </span>
      </div>

      {saveSuccess && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            color: '#15803D',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <CheckCircle2 size={18} />
          <span>{saveSuccess}</span>
        </div>
      )}

      {/* Payment Methods Table */}
      <div className="mc-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 24 }}>
            <Shimmer height="40px" borderRadius="6px" />
            <div style={{ marginTop: 12 }}>
              <Shimmer height="60px" borderRadius="6px" />
            </div>
            <div style={{ marginTop: 12 }}>
              <Shimmer height="60px" borderRadius="6px" />
            </div>
          </div>
        ) : methods.length === 0 ? (
          <div style={{ padding: '60px 24px', textAlign: 'center' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--mc-text-subtle)',
              }}
            >
              <CreditCard size={28} />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--mc-text-main)', margin: '0 0 6px 0' }}>
              No Payment Gateways Configured
            </h3>
            <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: '0 0 16px 0' }}>
              Click below to connect Stripe, Razorpay, or PayPal to start receiving payments.
            </p>
            <button type="button" onClick={openAddModal} className="mc-btn-primary" style={{ fontSize: 13 }}>
              Configure First Payment Method
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--mc-border)' }}>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    Gateway
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    Name
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    Type
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)' }}>
                    Environment Mode
                  </th>
                  <th style={{ padding: '14px 20px', fontSize: 12, fontWeight: 600, color: 'var(--mc-text-muted)', textAlign: 'right' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {methods.map((item) => (
                  <tr key={item._id} style={{ borderBottom: '1px solid var(--mc-border-light)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div
                        style={{
                          width: 48,
                          height: 36,
                          borderRadius: 6,
                          background: '#F1F5F9',
                          border: '1px solid var(--mc-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        {item.image ? (
                          <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        ) : (
                          <CreditCard size={18} color="var(--mc-text-subtle)" />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--mc-text-main)', fontSize: 14 }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          background: 'rgba(109,61,245,0.08)',
                          color: 'var(--mc-brand-purple)',
                        }}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          background: item.config?.mode === 'live' ? '#DCFCE7' : '#FEF3C7',
                          color: item.config?.mode === 'live' ? '#15803D' : '#B45309',
                        }}
                      >
                        {item.config?.mode === 'live' ? 'Live Production' : 'Sandbox / Test'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="mc-btn-secondary"
                          style={{ padding: '6px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                        >
                          <Edit size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === item._id}
                          onClick={() => handleDelete(item._id)}
                          style={{
                            padding: '6px 10px',
                            fontSize: 12,
                            borderRadius: 6,
                            border: '1px solid #FECACA',
                            background: '#FEF2F2',
                            color: '#DC2626',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="mc-modal-overlay">
          <div className="mc-modal" style={{ maxWidth: 540 }}>
            <div className="mc-modal-header">
              <h3>{editingItem ? 'Edit Payment Gateway' : 'Add Payment Gateway'}</h3>
              <button type="button" className="mc-modal-close" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {saveError && (
              <div
                style={{
                  margin: '16px 20px 0 20px',
                  padding: '10px 14px',
                  borderRadius: 6,
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  fontSize: 13,
                }}
              >
                {saveError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mc-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Method Type Select */}
                <div className="mc-input-group">
                  <label className="mc-label">Gateway Provider Type *</label>
                  <select
                    className="mc-input"
                    value={type}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setType(val);
                      if (!editingItem) {
                        if (val === 'stripe') setName('Stripe Checkout');
                        if (val === 'razorpay') setName('Razorpay Gateway');
                        if (val === 'paypal') setName('PayPal Express');
                        if (val === 'mollie') setName('Mollie Payments');
                      }
                    }}
                  >
                    <option value="stripe">Stripe</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="paypal">PayPal</option>
                    <option value="mollie">Mollie</option>
                  </select>
                </div>

                {/* Name */}
                <div className="mc-input-group">
                  <label className="mc-label">Display Name *</label>
                  <input
                    type="text"
                    required
                    className="mc-input"
                    placeholder="e.g. Stripe Checkout"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Gateway Logo / Image */}
                <div className="mc-input-group">
                  <label className="mc-label">Gateway Badge / Image URL</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      className="mc-input"
                      placeholder="https://... or choose file"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <label
                      className="mc-btn-secondary"
                      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}
                    >
                      <Upload size={14} />
                      <span>{uploadingImage ? '...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* STRIPE FIELDS */}
                {type === 'stripe' && (
                  <>
                    <div className="mc-input-group">
                      <label className="mc-label">Stripe Secret Key (sk_test_... / sk_live_...) *</label>
                      <div className="mc-input-wrapper">
                        <Lock size={15} className="mc-input-icon-left" />
                        <input
                          type="password"
                          required
                          className="mc-input with-left-icon"
                          placeholder="sk_test_51..."
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mc-input-group">
                      <label className="mc-label">Stripe Webhook Endpoint Secret (whsec_...) *</label>
                      <div className="mc-input-wrapper">
                        <Key size={15} className="mc-input-icon-left" />
                        <input
                          type="password"
                          required
                          className="mc-input with-left-icon"
                          placeholder="whsec_..."
                          value={clientSecret}
                          onChange={(e) => setClientSecret(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* RAZORPAY FIELDS */}
                {type === 'razorpay' && (
                  <>
                    <div className="mc-input-group">
                      <label className="mc-label">Razorpay Key ID *</label>
                      <input
                        type="text"
                        required
                        className="mc-input"
                        placeholder="rzp_test_..."
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      />
                    </div>

                    <div className="mc-input-group">
                      <label className="mc-label">Razorpay Key Secret *</label>
                      <input
                        type="password"
                        required
                        className="mc-input"
                        placeholder="Razorpay Secret"
                        value={clientSecret}
                        onChange={(e) => setClientSecret(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* PAYPAL FIELDS */}
                {type === 'paypal' && (
                  <>
                    <div className="mc-input-group">
                      <label className="mc-label">PayPal Client ID *</label>
                      <input
                        type="text"
                        required
                        className="mc-input"
                        placeholder="Enter PayPal Client ID"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      />
                    </div>

                    <div className="mc-input-group">
                      <label className="mc-label">PayPal Client Secret *</label>
                      <input
                        type="password"
                        required
                        className="mc-input"
                        placeholder="Enter PayPal Client Secret"
                        value={clientSecret}
                        onChange={(e) => setClientSecret(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* MOLLIE FIELDS */}
                {type === 'mollie' && (
                  <div className="mc-input-group">
                    <label className="mc-label">Mollie API Key *</label>
                    <input
                      type="password"
                      required
                      className="mc-input"
                      placeholder="test_... or live_..."
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    />
                  </div>
                )}

                {/* Mode Select */}
                <div className="mc-input-group">
                  <label className="mc-label">Environment Mode *</label>
                  <select
                    className="mc-input"
                    value={mode}
                    onChange={(e) => setMode(e.target.value as 'sandbox' | 'live')}
                  >
                    <option value="sandbox">Sandbox / Test Mode</option>
                    <option value="live">Live / Production</option>
                  </select>
                </div>
              </div>

              <div className="mc-modal-footer">
                <button type="button" className="mc-btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="mc-btn-primary">
                  {saving ? 'Saving...' : editingItem ? 'Update Gateway' : 'Add Gateway'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
