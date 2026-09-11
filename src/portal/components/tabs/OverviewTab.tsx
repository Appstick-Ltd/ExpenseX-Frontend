import React, { useEffect, useState } from 'react';
import {
  getBetaUsers,
  getUsers,
  getCategories,
  getSubscriptionPlans,
  extractListFromResponse,
  type BetaUser,
} from '../../services/portalApi';
import {
  Smartphone,
  Layers,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBetaUsers: 0,
    iosCount: 0,
    androidCount: 0,
    bothCount: 0,
    totalUsers: 0,
    totalCategories: 0,
    totalPlans: 0,
  });
  const [recentBetaUsers, setRecentBetaUsers] = useState<BetaUser[]>([]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // 1. Fetch Beta Users
      const betaRes = await getBetaUsers({ limit: 100 }).catch(() => null);
      const parsedBeta = extractListFromResponse<BetaUser>(betaRes);
      let betaList: BetaUser[] = parsedBeta.items;
      let totalBeta = parsedBeta.total;

      // Fallback to local storage if API returned 0
      if (betaList.length === 0) {
        try {
          const localSaved = JSON.parse(localStorage.getItem('expensex_early_bird_users') || '[]');
          if (Array.isArray(localSaved) && localSaved.length > 0) {
            betaList = localSaved.map((item: any, idx: number) => ({
              _id: item._id || `local-${idx}`,
              name: item.name,
              email: item.email,
              target_platform: item.platform || item.target_platform || 'both',
              referral_code: item.referral_code || '',
              address: item.address || '',
              like_features: item.features || item.like_features || [],
              createdAt: item.submittedAt || item.createdAt || new Date().toISOString(),
            }));
            totalBeta = betaList.length;
          }
        } catch {
          // ignore
        }
      }

      const ios = betaList.filter((u) => u.target_platform === 'ios').length;
      const android = betaList.filter((u) => u.target_platform === 'android').length;
      const both = betaList.filter((u) => u.target_platform === 'both').length;

      // 2. Fetch System Users
      const usersRes = await getUsers({ limit: 10 }).catch(() => null);
      const parsedUsers = extractListFromResponse(usersRes);
      const totalSystemUsers = parsedUsers.total || parsedUsers.items.length;

      // 3. Fetch Categories
      const catRes = await getCategories().catch(() => null);
      const parsedCats = extractListFromResponse(catRes);
      const catList = parsedCats.items;

      // 4. Fetch Subscriptions
      const plansRes = await getSubscriptionPlans().catch(() => null);
      const parsedPlans = extractListFromResponse(plansRes);
      const planList = parsedPlans.items;

      setStats({
        totalBetaUsers: totalBeta,
        iosCount: ios,
        androidCount: android,
        bothCount: both,
        totalUsers: totalSystemUsers,
        totalCategories: catList.length,
        totalPlans: planList.length,
      });

      setRecentBetaUsers(betaList.slice(0, 6));
    } catch (err) {
      console.error('Failed to load overview telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      {/* Top Banner with Quick Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px 0', color: 'var(--mc-text-main)' }}>
            System Telemetry & Health
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mc-text-muted)', margin: 0 }}>
            Unified real-time metrics across ExpenseX AI backend APIs
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="mc-btn-secondary"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* Grid of Dense KPI Metric Cards */}
      <div className="mc-grid-metrics">
        {/* Beta Signups */}
        <div className="mc-stat-card">
          <div>
            <div className="mc-stat-label">Total Beta Signups</div>
            <div className="mc-stat-value">{stats.totalBetaUsers}</div>
            <div className="mc-stat-sub" style={{ color: 'var(--mc-brand-purple)', fontWeight: 600 }}>
              Early-bird customer demand
            </div>
          </div>
          <div className="mc-stat-icon" style={{ background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.12), rgba(139, 92, 246, 0.06))', color: 'var(--mc-brand-purple)' }}>
            <Sparkles size={20} />
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="mc-stat-card">
          <div>
            <div className="mc-stat-label">Platform Breakdown</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span className="mc-badge mc-badge-ios">iOS: {stats.iosCount}</span>
              <span className="mc-badge mc-badge-android">Android: {stats.androidCount}</span>
            </div>
            <div className="mc-stat-sub">Cross-platform: {stats.bothCount}</div>
          </div>
          <div className="mc-stat-icon" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.06))', color: '#2563EB' }}>
            <Smartphone size={20} />
          </div>
        </div>

        {/* Categories */}
        <div className="mc-stat-card">
          <div>
            <div className="mc-stat-label">Expense Categories</div>
            <div className="mc-stat-value">{stats.totalCategories}</div>
            <div className="mc-stat-sub">Multilingual definitions</div>
          </div>
          <div className="mc-stat-icon" style={{ background: 'linear-gradient(135deg, rgba(255, 90, 54, 0.12), rgba(249, 115, 22, 0.06))', color: 'var(--mc-brand-coral)' }}>
            <Layers size={20} />
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mc-stat-card">
          <div>
            <div className="mc-stat-label">Subscription Plans</div>
            <div className="mc-stat-value">{stats.totalPlans}</div>
            <div className="mc-stat-sub">Active monetization tiers</div>
          </div>
          <div className="mc-stat-icon" style={{ background: 'linear-gradient(135deg, rgba(109, 61, 245, 0.12), rgba(139, 92, 246, 0.06))', color: 'var(--mc-brand-purple)' }}>
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Recent Beta Registrations Showcase */}
      <div className="mc-card-table" style={{ marginBottom: 24 }}>
        <div className="mc-table-header">
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 2px 0', color: 'var(--mc-text-main)' }}>
              Recent Early-Bird Registrations
            </h2>
            <p style={{ fontSize: 12, color: 'var(--mc-text-muted)', margin: 0 }}>
              Live stream from <code>/users/bata-user</code>
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('beta-users')}
            className="mc-btn-accent"
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            <span>View All ({stats.totalBetaUsers})</span>
            <ExternalLink size={12} />
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="mc-table-wrap mc-desktop-only">
          <table className="mc-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Target Platform</th>
                <th>Referral Code</th>
                <th>Desired Features</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {recentBetaUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '32px 0', color: 'var(--mc-text-muted)' }}>
                    {loading ? 'Fetching records...' : 'No early-bird users recorded yet.'}
                  </td>
                </tr>
              ) : (
                recentBetaUsers.map((item) => (
                  <tr key={item._id || item.email}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--mc-text-muted)' }}>{item.email}</div>
                    </td>
                    <td>
                      {item.target_platform === 'ios' && <span className="mc-badge mc-badge-ios">iOS</span>}
                      {item.target_platform === 'android' && <span className="mc-badge mc-badge-android">Android</span>}
                      {item.target_platform === 'both' && <span className="mc-badge mc-badge-both">iOS & Android</span>}
                    </td>
                    <td>
                      {item.referral_code ? (
                        <code style={{ fontSize: 11, background: '#F1F5F9', padding: '2px 6px', borderRadius: 4 }}>
                          {item.referral_code}
                        </code>
                      ) : (
                        <span style={{ color: 'var(--mc-text-subtle)' }}>Direct / None</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {(item.like_features || []).slice(0, 2).map((feat: string, idx: number) => (
                          <span key={idx} className="mc-badge mc-badge-tag" style={{ fontSize: 10 }}>
                            {feat}
                          </span>
                        ))}
                        {(item.like_features || []).length > 2 && (
                          <span className="mc-badge mc-badge-tag" style={{ fontSize: 10 }}>
                            +{(item.like_features || []).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--mc-text-muted)', whiteSpace: 'nowrap' }}>
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Native Card View (< 768px) */}
        <div className="mc-mobile-only">
          {recentBetaUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 16px', color: 'var(--mc-text-muted)', fontSize: 13 }}>
              {loading ? 'Fetching records...' : 'No early-bird users recorded yet.'}
            </div>
          ) : (
            <div className="mc-mobile-card-list">
              {recentBetaUsers.map((item) => (
                <div key={item._id || item.email} className="mc-mobile-card">
                  <div className="mc-mobile-card-header">
                    <div>
                      <div className="mc-mobile-card-title">{item.name}</div>
                      <div className="mc-mobile-card-sub">{item.email}</div>
                    </div>
                    {item.target_platform === 'ios' && <span className="mc-badge mc-badge-ios">iOS</span>}
                    {item.target_platform === 'android' && <span className="mc-badge mc-badge-android">Android</span>}
                    {item.target_platform === 'both' && <span className="mc-badge mc-badge-both">iOS & Android</span>}
                  </div>

                  <div className="mc-mobile-card-body">
                    <div className="mc-mobile-card-row">
                      <span className="mc-mobile-card-label">Referral:</span>
                      <span className="mc-mobile-card-value">
                        {item.referral_code ? (
                          <code style={{ fontSize: 11, background: '#F1F5F9', padding: '1px 5px', borderRadius: 4 }}>
                            {item.referral_code}
                          </code>
                        ) : (
                          'Direct'
                        )}
                      </span>
                    </div>

                    <div className="mc-mobile-card-row">
                      <span className="mc-mobile-card-label">Registered:</span>
                      <span className="mc-mobile-card-value">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>

                    {(item.like_features || []).length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                        {(item.like_features || []).slice(0, 3).map((feat: string, idx: number) => (
                          <span key={idx} className="mc-badge mc-badge-tag" style={{ fontSize: 10 }}>
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Architecture Information Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid var(--mc-border)', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <TrendingUp size={16} color="var(--mc-brand-purple)" />
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>API Server Status</h3>
          </div>
          <p style={{ fontSize: 12, color: 'var(--mc-text-muted)', lineHeight: 1.5, margin: '0 0 12px 0' }}>
            Operating against production microservice cluster:
          </p>
          <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: 6, fontSize: 11, fontFamily: 'monospace', color: '#0F172A', border: '1px solid var(--mc-border)' }}>
            https://api.xpenstick.appstick.com.bd/api/v1
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--mc-border)', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <CheckCircle2 size={16} color="var(--mc-brand-purple)" />
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: 'var(--mc-text-main)' }}>Superadmin Privileges</h3>
          </div>
          <p style={{ fontSize: 12, color: 'var(--mc-text-muted)', lineHeight: 1.5, margin: 0 }}>
            Session is authenticated with Bearer JWT tokens. All administrative CRUD commands against users, categories, and subscription tiers are active.
          </p>
        </div>
      </div>
    </div>
  );
};
