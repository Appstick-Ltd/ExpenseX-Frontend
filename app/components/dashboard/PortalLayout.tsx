import React, { useState, useEffect } from 'react';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { Logo } from '../common/Logo';
const logoSrc = '/logo.png';
import { OverviewTab } from './OverviewTab';
import { BetaUsersTab } from './BetaUsersTab';
import { UsersTab } from './UsersTab';
import { CategoriesTab } from './CategoriesTab';
import { SubscriptionsTab } from './SubscriptionsTab';
import { SettingsTab } from './SettingsTab';
import { triggerHaptic } from '../../helpers/haptics';
import {
  LayoutDashboard,
  UserCheck,
  Layers,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Activity,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Sliders,
  Mail,
  FileText,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

interface NavItemDef {
  id: 'overview' | 'beta-users' | 'users' | 'categories' | 'subscriptions' | 'settings';
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  badge?: string;
}

export interface PortalLayoutProps {
  children?: React.ReactNode;
  initialTab?: NavItemDef['id'];
  initialSubTab?: string;
}

interface SettingsSubItemDef {
  id: string;
  label: string;
  icon: LucideIcon;
}

const SETTINGS_SUB_ITEMS: SettingsSubItemDef[] = [
  { id: 'general-settings', label: 'General Settings', icon: Sliders },
  { id: 'email-settings', label: 'Email Settings', icon: Mail },
  { id: 'payment-settings', label: 'Payment Settings', icon: CreditCard },
  { id: 'page-settings', label: 'Page Settings', icon: FileText },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, initialTab, initialSubTab }) => {
  const { user, logout } = usePortalAuth();
  const router = useRouter();

  const getTabFromUrl = (): NavItemDef['id'] => {
    if (initialTab) return initialTab;
    if (typeof window === 'undefined') return 'overview';
    const path = window.location.pathname;
    if (
      path.startsWith('/admin/settings') ||
      path.startsWith('/admin/setting') ||
      path.startsWith('/dashboard/setting') ||
      path.startsWith('/dashboard/settings')
    ) {
      return 'settings';
    }
    if (path.startsWith('/admin/beta-users') || path.startsWith('/dashboard/beta-users')) return 'beta-users';
    if (path.startsWith('/admin/users') || path.startsWith('/dashboard/users')) return 'users';
    if (path.startsWith('/admin/categories') || path.startsWith('/dashboard/categories')) return 'categories';
    if (path.startsWith('/admin/subscriptions') || path.startsWith('/dashboard/subscriptions')) return 'subscriptions';
    return 'overview';
  };

  const getSubTabFromUrl = (): string => {
    if (initialSubTab) return initialSubTab;
    if (typeof window === 'undefined') return 'general-settings';
    const path = window.location.pathname;
    const match = path.match(/\/(admin|dashboard)\/settings?\/([^/]+)/);
    if (match && match[2]) return match[2];
    return 'general-settings';
  };

  const [activeTab, setActiveTab] = useState<NavItemDef['id']>(() => getTabFromUrl());
  const [activeSubTab, setActiveSubTab] = useState<string>(() => getSubTabFromUrl());
  const [settingsOpen, setSettingsOpen] = useState<boolean>(() => getTabFromUrl() === 'settings');
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromUrl();
      const sub = getSubTabFromUrl();
      setActiveTab(tab);
      setActiveSubTab(sub);
      if (tab === 'settings') {
        setSettingsOpen(true);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navItems: NavItemDef[] = [
    { id: 'overview', label: 'Overview & Telemetry', shortLabel: 'Overview', icon: LayoutDashboard },
    { id: 'beta-users', label: 'Beta Early-Bird Users', shortLabel: 'Early-Bird', icon: Sparkles, badge: 'Live' },
    { id: 'users', label: 'System Users', shortLabel: 'Users', icon: UserCheck },
    { id: 'categories', label: 'Categories Dictionary', shortLabel: 'Categories', icon: Layers },
    { id: 'subscriptions', label: 'Subscription Tiers', shortLabel: 'Plans', icon: CreditCard },
    { id: 'settings', label: 'Settings', shortLabel: 'Settings', icon: Settings },
  ];

  const handleTabSelect = (tabId: NavItemDef['id']) => {
    triggerHaptic('selection');
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard' : '/admin';

    if (tabId === 'settings') {
      if (activeTab === 'settings') {
        setSettingsOpen(!settingsOpen);
      } else {
        setActiveTab('settings');
        setSettingsOpen(true);
        router.push(`${basePrefix}/settings/${activeSubTab || 'general-settings'}`);
      }
      return;
    }

    setActiveTab(tabId);
    setIsDrawerOpen(false);
    if (tabId === 'overview') {
      router.push(basePrefix);
    } else {
      router.push(`${basePrefix}/${tabId}`);
    }
  };

  const handleSubTabSelect = (subId: string) => {
    triggerHaptic('selection');
    setActiveTab('settings');
    setActiveSubTab(subId);
    setSettingsOpen(true);
    setIsDrawerOpen(false);
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard/settings' : '/admin/settings';
    router.push(`${basePrefix}/${subId}`);
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
                Admin
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
              <img src={logoSrc} alt="ExpenseX" width={26} height={20} style={{ objectFit: 'contain' }} />
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
            const isSettings = item.id === 'settings';

            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  className={`mc-nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleTabSelect(item.id)}
                  title={item.label}
                  style={{ position: 'relative' }}
                >
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && (
                    <>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, textAlign: 'left' }}>
                        {item.label}
                      </span>
                      {item.badge && <span className="mc-nav-badge">{item.badge}</span>}
                      {isSettings && (
                        <ChevronDown
                          size={15}
                          style={{
                            transition: 'transform 0.2s ease',
                            transform: settingsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                            color: isActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Expandable Settings Sub-menu (Desktop) */}
                {isSettings && !collapsed && settingsOpen && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      paddingLeft: 28,
                      paddingTop: 4,
                      paddingBottom: 4,
                      marginLeft: 14,
                      borderLeft: '1.5px solid var(--mc-border)',
                      marginTop: 2,
                    }}
                  >
                    {SETTINGS_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === 'settings' && activeSubTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSubTabSelect(sub.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: 'none',
                            background: isSubActive ? 'rgba(109,61,245,0.08)' : 'transparent',
                            color: isSubActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                            fontWeight: isSubActive ? 600 : 500,
                            fontSize: 12.5,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease',
                            position: 'relative',
                          }}
                        >
                          <SubIcon size={14} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {sub.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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
                    {user?.name || 'Admin'}
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
                <div className="mc-drawer-name">{user?.name || 'Admin'}</div>
                <div className="mc-drawer-email">{user?.email || 'admin@expensex.ai'}</div>
                <div className="mc-drawer-status-pill">
                  <ShieldCheck size={11} />
                  <span>Admin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Navigation List */}
          <nav className="mc-drawer-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isSettings = item.id === 'settings';

              return (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    className={`mc-drawer-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabSelect(item.id)}
                  >
                    <Icon size={18} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                    {item.badge && <span className="mc-drawer-nav-badge">{item.badge}</span>}
                    {isSettings && (
                      <ChevronDown
                        size={15}
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: settingsOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          color: isActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                        }}
                      />
                    )}
                  </button>

                  {/* Expandable Settings Sub-menu (Mobile Drawer) */}
                  {isSettings && settingsOpen && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        paddingLeft: 36,
                        paddingTop: 4,
                        paddingBottom: 4,
                        marginLeft: 18,
                        borderLeft: '1.5px solid var(--mc-border)',
                      }}
                    >
                      {SETTINGS_SUB_ITEMS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === 'settings' && activeSubTab === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSubTabSelect(sub.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              padding: '10px 14px',
                              borderRadius: 6,
                              border: 'none',
                              background: isSubActive ? 'rgba(109,61,245,0.08)' : 'transparent',
                              color: isSubActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-muted)',
                              fontWeight: isSubActive ? 600 : 500,
                              fontSize: 13,
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <SubIcon size={15} />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
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
              <img src={logoSrc} alt="ExpenseX" width={22} height={18} style={{ objectFit: 'contain' }} />
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
          {children ? (
            children
          ) : (
            <>
              {activeTab === 'overview' && <OverviewTab onNavigateTab={(tab) => handleTabSelect(tab as any)} />}
              {activeTab === 'beta-users' && <BetaUsersTab />}
              {activeTab === 'users' && <UsersTab />}
              {activeTab === 'categories' && <CategoriesTab />}
              {activeTab === 'subscriptions' && <SubscriptionsTab />}
              {activeTab === 'settings' && (
                <SettingsTab
                  subTab={activeSubTab}
                  onSubTabChange={(sub) => handleSubTabSelect(sub)}
                />
              )}
            </>
          )}
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
