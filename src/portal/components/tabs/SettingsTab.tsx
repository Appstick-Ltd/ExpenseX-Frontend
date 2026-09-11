import React, { useEffect, useState } from 'react';
import { getSettings, getCurrencyRates, getLanguages } from '../../services/portalApi';
import { DollarSign, Globe, RefreshCw, Server } from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [currencyRates, setCurrencyRates] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllSettings = async () => {
    setLoading(true);
    try {
      const [sRes, cRes, lRes] = await Promise.allSettled([
        getSettings(),
        getCurrencyRates(),
        getLanguages(),
      ]);

      if (sRes.status === 'fulfilled') {
        setSettings(sRes.value?.data || sRes.value);
      }
      if (cRes.status === 'fulfilled') {
        const cVal = cRes.value;
        setCurrencyRates(Array.isArray(cVal?.data) ? cVal.data : (Array.isArray(cVal) ? cVal : []));
      }
      if (lRes.status === 'fulfilled') {
        const lVal = lRes.value;
        setLanguages(Array.isArray(lVal?.data) ? lVal.data : (Array.isArray(lVal) ? lVal : []));
      }
    } catch (err) {
      console.error('Failed to load system settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSettings();
  }, []);

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
            System Settings & Telemetry
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Currency rates, supported locales, and system variables
          </p>
        </div>

        <button
          onClick={fetchAllSettings}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            background: '#FFFFFF',
            border: '1px solid var(--mc-border)',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            color: 'var(--mc-text-main)',
            boxShadow: 'var(--mc-shadow-sm)',
          }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Currencies Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--mc-border)', borderRadius: 12, padding: 20, boxShadow: 'var(--mc-shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <DollarSign size={18} color="var(--mc-primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>Supported Currencies & Rates</h3>
          </div>
          {currencyRates.length === 0 ? (
            <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
              {loading ? 'Fetching rates...' : 'Default: BDT (৳), USD ($)'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {currencyRates.map((cr, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{cr.code || cr.currency || 'Currency'}</span>
                  <span>Rate: {cr.rate || '1.00'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Languages Card */}
        <div style={{ background: '#FFFFFF', border: '1px solid var(--mc-border)', borderRadius: 12, padding: 20, boxShadow: 'var(--mc-shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Globe size={18} color="#2563EB" />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>Supported Locales</h3>
          </div>
          {languages.length === 0 ? (
            <div style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>
              {loading ? 'Fetching languages...' : 'English (en) • বাংলা (bn)'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {languages.map((l, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#F8FAFC',
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{l.name || l.title || 'Language'}</span>
                  <span className="mc-badge mc-badge-tag">{l.code || 'locale'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Raw System Telemetry */}
      <div className="mc-card-table">
        <div className="mc-table-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Server size={16} color="var(--mc-primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>System Environment Details</h3>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <pre
            style={{
              background: '#F8FAFC',
              border: '1px solid var(--mc-border)',
              borderRadius: 8,
              padding: 14,
              fontSize: 12,
              fontFamily: 'monospace',
              margin: 0,
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(settings || { status: 'Connected', environment: 'Production', baseUrl: 'https://api.xpenstick.appstick.com.bd/api/v1' }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};
