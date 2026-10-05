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
import { triggerHaptic } from '../../utils/haptics';
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
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

interface NavItemDef {
  id: 'overview' | 'beta-users' | 'users' | 'categories' | 'subscriptions' | 'settings';
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  badge?: string;
}

export const PortalLayout: React.FC = () => {
  const { user, logout } = usePortalAuth();
  const [activeTab, setActiveTab] = useState<NavItemDef['id']>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems: NavItemDef[] = [
    { id: 'overview', label: 'Overview & Telemetry', shortLabel: 'Overview', icon: LayoutDashboard },
    { id: 'beta-users', label: 'Beta Early-Bird Users', shortLabel: 'Early-Bird', icon: Sparkles, badge: 'Live' },
    { id: 'users', label: 'System Users', shortLabel: 'Users', icon: UserCheck },
    { id: 'categories', label: 'Categories Dictionary', shortLabel: 'Categories', icon: Layers },
    { id: 'subscriptions', label: 'Subscription Tiers', shortLabel: 'Plans', icon: CreditCard },
    { id: 'settings', label: 'System Settings', shortLabel: 'Settings', icon: Settings },
  ];

  const handleTabSelect = (tabId: NavItemDef['id']) => {
    triggerHaptic('selection');
    setActiveTab(tabId);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    triggerHaptic('light');
    setIsDrawerOpen((prev) => !prev);
  };

  const currentTabDef = navItems.find((n) => n.id === activeTab) || navItems[0];
  const TabIcon = currentTabDef.icon;
  const userInitial = (user?.name || user?.email || 'A')[0].toUpperCase();

  const isMoreActive = activeTab === 'categories' || activeTab === 'settings' || isDrawerOpen;

  return (
    <div className="mc-shell">
      {/* DESKTOP SIDEBAR */}
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
                onClick={() => handleTabSelect(item.id)}
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
                  {userInitial}
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
                onClick={() => {
                  triggerHaptic('warning');
                  logout();
                }}
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
                onClick={() => {
                  triggerHaptic('warning');
                  logout();
                }}
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

      {/* SLIDE-OVER MOBILE DRAWER */}
      <div
        className={`mc-drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className="mc-mobile-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="mc-drawer-header">
            <button
              className="mc-drawer-close-btn"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>

            <div className="mc-drawer-profile">
              <div className="mc-drawer-avatar">
                {userInitial}
              </div>
              <div className="mc-drawer-profile-info">
                <div className="mc-drawer-name">{user?.name || 'Superadmin'}</div>
                <div className="mc-drawer-email">{user?.email || 'admin@expensex.ai'}</div>
                <div className="mc-drawer-status-pill">
                  <ShieldCheck size={11} />
                  <span>Superadmin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Navigation List */}
          <nav className="mc-drawer-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`mc-drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabSelect(item.id)}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  <span>{item.label}</span>
                  {item.badge && <span className="mc-drawer-nav-badge">{item.badge}</span>}
                </button>
              );
            })}
          </nav>

          {/* Drawer Footer */}
          <div className="mc-drawer-footer">
            <button
              className="mc-drawer-landing-link"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <span>Consumer Landing Page</span>
              <ExternalLink size={14} />
            </button>

            <button
              className="mc-drawer-logout-btn"
              onClick={() => {
                triggerHaptic('warning');
                logout();
              }}
            >
              <LogOut size={15} />
              <span>Sign Out Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN BODY AREA */}
      <div className="mc-main-wrap">
        {/* MOBILE TOPBAR (< 768px) */}
        <header className="mc-mobile-topbar">
          <div className="mc-mobile-topbar-left">
            <button
              className="mc-mobile-menu-btn"
              onClick={toggleDrawer}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="mc-mobile-topbar-title">
              <img src={logoImg} alt="ExpenseX" width={22} height={18} style={{ objectFit: 'contain' }} />
              <div className="mc-mobile-tab-pill">
                <TabIcon size={13} color="var(--mc-brand-purple)" />
                <span>{currentTabDef.shortLabel || currentTabDef.label}</span>
              </div>
            </div>
          </div>

          <div className="mc-mobile-topbar-right">
            <button
              className="mc-mobile-avatar-btn"
              onClick={toggleDrawer}
              aria-label="User profile"
            >
              {userInitial}
            </button>
          </div>
        </header>

        {/* DESKTOP TOPBAR (> 768px) */}
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
          {activeTab === 'overview' && <OverviewTab onNavigateTab={(tab) => handleTabSelect(tab as any)} />}
          {activeTab === 'beta-users' && <BetaUsersTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'subscriptions' && <SubscriptionsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </main>

        {/* NATIVE MOBILE BOTTOM NAVIGATION (< 768px) */}
        <nav className="mc-bottom-nav">
          <button
            className={`mc-bottom-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabSelect('overview')}
            aria-label="Overview tab"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <LayoutDashboard size={19} />
            </div>
            <span className="mc-bottom-nav-label">Overview</span>
          </button>

          <button
            className={`mc-bottom-nav-item ${activeTab === 'beta-users' ? 'active' : ''}`}
            onClick={() => handleTabSelect('beta-users')}
            aria-label="Beta Early-Bird Users tab"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <Sparkles size={19} />
              <span className="mc-bottom-badge-dot" />
            </div>
            <span className="mc-bottom-nav-label">Early-Bird</span>
          </button>

          <button
            className={`mc-bottom-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => handleTabSelect('users')}
            aria-label="Users tab"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <UserCheck size={19} />
            </div>
            <span className="mc-bottom-nav-label">Users</span>
          </button>

          <button
            className={`mc-bottom-nav-item ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => handleTabSelect('subscriptions')}
            aria-label="Subscription plans tab"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <CreditCard size={19} />
            </div>
            <span className="mc-bottom-nav-label">Plans</span>
          </button>

          <button
            className={`mc-bottom-nav-item ${isMoreActive ? 'active' : ''}`}
            onClick={toggleDrawer}
            aria-label="More options"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <Menu size={19} />
              {(activeTab === 'categories' || activeTab === 'settings') && (
                <span className="mc-bottom-badge-dot" style={{ background: 'var(--mc-brand-purple)' }} />
              )}
            </div>
            <span className="mc-bottom-nav-label">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

