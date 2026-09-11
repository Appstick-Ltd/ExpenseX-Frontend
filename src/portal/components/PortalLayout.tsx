import React, { useState } from 'react';
import { usePortalAuth } from '../context/PortalAuthContext';
import { Logo } from '../../components/Logo';
import logoImg from '../../assets/logo.png';
import { OverviewTab } from './tabs/OverviewTab';
import { BetaUsersTab } from './tabs/BetaUsersTab';
import { UsersTab } from './tabs/UsersTab';
import { CategoriesTab } from './tabs/CategoriesTab';
import { SubscriptionsTab } from './tabs/SubscriptionsTab';
import { SettingsTab } from './tabs/SettingsTab';
import {
  LayoutDashboard,
  UserCheck,
  Layers,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  type LucideIcon,
} from 'lucide-react';

interface NavItemDef {
  id: 'overview' | 'beta-users' | 'users' | 'categories' | 'subscriptions' | 'settings';
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const PortalLayout: React.FC = () => {
  const { user, logout } = usePortalAuth();
  const [activeTab, setActiveTab] = useState<NavItemDef['id']>('overview');
  const [collapsed, setCollapsed] = useState(false);

  const navItems: NavItemDef[] = [
    { id: 'overview', label: 'Overview & Telemetry', icon: LayoutDashboard },
    { id: 'beta-users', label: 'Beta Early-Bird Users', icon: Sparkles, badge: 'Live' },
    { id: 'users', label: 'System Users', icon: UserCheck },
    { id: 'categories', label: 'Categories Dictionary', icon: Layers },
    { id: 'subscriptions', label: 'Subscription Tiers', icon: CreditCard },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="mc-shell">
      {/* SIDEBAR */}
      <aside className={`mc-sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Sidebar Header */}
        <div className="mc-sidebar-header">
          {!collapsed ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Logo size="sm" variant="light" />
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--mc-brand-purple)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  paddingLeft: 37,
                }}
              >
                Superadmin
              </span>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <img src={logoImg} alt="ExpenseX" width={26} height={20} style={{ objectFit: 'contain' }} />
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--mc-text-subtle)',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
            }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="mc-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`mc-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id as any)}
                title={item.label}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.label}
                    </span>
                    {item.badge && <span className="mc-nav-badge">{item.badge}</span>}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mc-sidebar-footer">
          {!collapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#F1F5F9',
                    border: '1px solid var(--mc-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 12,
                    color: 'var(--mc-text-main)',
                    flexShrink: 0,
                  }}
                >
                  {(user?.name || user?.email || 'A')[0].toUpperCase()}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.name || 'Superadmin'}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--mc-text-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.email || 'Active Session'}
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign out"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--mc-danger)',
                  padding: 6,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={logout}
                title="Sign out"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--mc-danger)',
                  padding: 8,
                }}
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN BODY AREA */}
      <div className="mc-main-wrap">
        {/* TOPBAR */}
        <header className="mc-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              className="mc-badge mc-badge-purple"
              style={{
                padding: '4px 10px',
              }}
            >
              <Activity size={12} />
              <span>Production Cluster</span>
            </span>

            <span style={{ fontSize: 12, color: 'var(--mc-text-subtle)' }}>
              api.xpenstick.appstick.com.bd
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              style={{
                padding: '6px 12px',
                background: 'transparent',
                border: '1px solid var(--mc-border)',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--mc-text-muted)',
                cursor: 'pointer',
              }}
            >
              Consumer Landing Page ↗
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="mc-content-body">
          {activeTab === 'overview' && <OverviewTab onNavigateTab={(tab) => setActiveTab(tab as any)} />}
          {activeTab === 'beta-users' && <BetaUsersTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'subscriptions' && <SubscriptionsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};
