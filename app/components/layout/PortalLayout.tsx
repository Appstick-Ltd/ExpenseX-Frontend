import React, { useState, useEffect } from 'react';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { Logo } from '../common/Logo';
const logoSrc = '/logo.png';
import { Overview } from '../../(dashboard)/mc-portal/page';
import { UsersMainTab } from '../../(dashboard)/mc-portal/users/page';
import { SettingsTab } from '../../(dashboard)/mc-portal/settings/SettingsTab';
import { SubscriptionMainTab } from '../../(dashboard)/mc-portal/subscription/page';
import { triggerHaptic } from '../../helpers/haptics';
import {
  LayoutDashboard,
  UserCheck,
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
  Globe,
  Layers,
  FolderTree,
  CreditCard,
  Megaphone,
  Send,
  Gift,
  History,
  type LucideIcon,
} from 'lucide-react';

import { useRouter, usePathname } from 'next/navigation';

interface NavItemDef {
  id: 'overview' | 'users' | 'services' | 'subscription' | 'marketing' | 'settings';
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  badge?: string;
}

export interface PortalLayoutProps {
  children?: React.ReactNode;
  initialTab?: 'overview' | 'beta-users' | 'users' | 'services' | 'subscription' | 'marketing' | 'settings';
  initialSubTab?: string;
}

interface SubItemDef {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const USERS_SUB_ITEMS: SubItemDef[] = [
  { id: 'system-users', label: 'System Users', icon: UserCheck },
  { id: 'beta-users', label: 'Beta Early-Bird Users', icon: Sparkles, badge: 'Live' },
  { id: 'rewards', label: 'User Rewards', icon: Gift },
];

const SERVICES_SUB_ITEMS: SubItemDef[] = [
  { id: 'category', label: 'Category', icon: FolderTree },
];

const SUBSCRIPTION_SUB_ITEMS: SubItemDef[] = [
  { id: 'plan', label: 'Plan', icon: CreditCard },
  { id: 'history', label: 'History', icon: History },
];

const MARKETING_SUB_ITEMS: SubItemDef[] = [
  { id: 'push-notification', label: 'Push Notification', icon: Send },
];

const SETTINGS_SUB_ITEMS: SubItemDef[] = [
  { id: 'general-settings', label: 'General Settings', icon: Sliders },
  { id: 'email-settings', label: 'Email Settings', icon: Mail },
  { id: 'page-settings', label: 'Page Settings', icon: FileText },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'language-settings', label: 'Language Settings', icon: Globe },
];

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children, initialTab, initialSubTab }) => {
  const { user, logout } = usePortalAuth();
  const router = useRouter();

  const pathname = usePathname() || '';

  const getTabFromUrl = (p: string = pathname): NavItemDef['id'] => {
    if (initialTab) {
      if ((initialTab as any) === 'beta-users') return 'users';
      return initialTab as NavItemDef['id'];
    }
    const path = p || '';
    if (
      path.startsWith('/mc-portal/marketing') ||
      path.startsWith('/dashboard/marketing')
    ) {
      return 'marketing';
    }
    if (
      path.startsWith('/mc-portal/settings') ||
      path.startsWith('/mc-portal/setting') ||
      path.startsWith('/dashboard/setting') ||
      path.startsWith('/dashboard/settings')
    ) {
      return 'settings';
    }
    if (
      path.startsWith('/mc-portal/subscription') ||
      path.startsWith('/dashboard/subscription')
    ) {
      return 'subscription';
    }
    if (
      path.startsWith('/mc-portal/services') ||
      path.startsWith('/mc-portal/service') ||
      path.startsWith('/dashboard/services') ||
      path.startsWith('/dashboard/service')
    ) {
      return 'services';
    }
    if (
      path.startsWith('/mc-portal/users') ||
      path.startsWith('/mc-portal/beta-users') ||
      path.startsWith('/dashboard/users') ||
      path.startsWith('/dashboard/beta-users')
    ) {
      return 'users';
    }
    return 'overview';
  };

  const getUsersSubTabFromUrl = (p: string = pathname): string => {
    const path = p || '';
    if (path.includes('beta-users') || path.includes('early-bird')) return 'beta-users';
    if (path.includes('rewards')) return 'rewards';
    const match = path.match(/\/(mc-portal|dashboard)\/users\/([^/]+)/);
    if (match && match[2]) return match[2];
    return 'system-users';
  };

  const getServicesSubTabFromUrl = (p: string = pathname): string => {
    const path = p || '';
    const match = path.match(/\/(mc-portal|dashboard)\/services?\/([^/]+)/);
    if (match && match[2]) return match[2];
    return 'category';
  };

  const getSubscriptionSubTabFromUrl = (p: string = pathname): string => {
    const path = p || '';
    const match = path.match(/\/(mc-portal|dashboard)\/subscription\/([^/]+)/);
    if (match && match[2]) return match[2];
    return 'plan';
  };

  const getMarketingSubTabFromUrl = (p: string = pathname): string => {
    const path = p || '';
    const match = path.match(/\/(mc-portal|dashboard)\/marketing\/([^/]+)/);
    if (match && match[2]) return match[2];
    return 'push-notification';
  };

  const getSubTabFromUrl = (p: string = pathname): string => {
    if (initialSubTab) return initialSubTab;
    const path = p || '';
    const match = path.match(/\/(mc-portal|dashboard)\/settings?\/([^/]+)/);
    if (match && match[2]) return match[2];
    return 'general-settings';
  };

  const [activeTab, setActiveTab] = useState<NavItemDef['id']>(() => getTabFromUrl(pathname));
  const [activeUsersSubTab, setActiveUsersSubTab] = useState<string>(() => getUsersSubTabFromUrl(pathname));
  const [usersOpen, setUsersOpen] = useState<boolean>(() => getTabFromUrl(pathname) === 'users');
  const [activeServicesSubTab, setActiveServicesSubTab] = useState<string>(() => getServicesSubTabFromUrl(pathname));
  const [servicesOpen, setServicesOpen] = useState<boolean>(() => getTabFromUrl(pathname) === 'services');
  const [activeSubscriptionSubTab, setActiveSubscriptionSubTab] = useState<string>(() => getSubscriptionSubTabFromUrl(pathname));
  const [subscriptionOpen, setSubscriptionOpen] = useState<boolean>(() => getTabFromUrl(pathname) === 'subscription');
  const [activeMarketingSubTab, setActiveMarketingSubTab] = useState<string>(() => getMarketingSubTabFromUrl(pathname));
  const [marketingOpen, setMarketingOpen] = useState<boolean>(() => getTabFromUrl(pathname) === 'marketing');
  const [activeSubTab, setActiveSubTab] = useState<string>(() => getSubTabFromUrl(pathname));
  const [settingsOpen, setSettingsOpen] = useState<boolean>(() => getTabFromUrl(pathname) === 'settings');
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const tab = getTabFromUrl(pathname);
    const usersSub = getUsersSubTabFromUrl(pathname);
    const servicesSub = getServicesSubTabFromUrl(pathname);
    const subscriptionSub = getSubscriptionSubTabFromUrl(pathname);
    const marketingSub = getMarketingSubTabFromUrl(pathname);
    const sub = getSubTabFromUrl(pathname);
    setActiveTab(tab);
    setActiveUsersSubTab(usersSub);
    setActiveServicesSubTab(servicesSub);
    setActiveSubscriptionSubTab(subscriptionSub);
    setActiveMarketingSubTab(marketingSub);
    setActiveSubTab(sub);
    if (tab === 'marketing') {
      setMarketingOpen(true);
    }
    if (tab === 'settings') {
      setSettingsOpen(true);
    }
    if (tab === 'subscription') {
      setSubscriptionOpen(true);
    }
    if (tab === 'services') {
      setServicesOpen(true);
    }
    if (tab === 'users') {
      setUsersOpen(true);
    }
  }, [pathname]);

  const navItems: NavItemDef[] = [
    { id: 'overview', label: 'Overview & Telemetry', shortLabel: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', shortLabel: 'Users', icon: UserCheck },
    { id: 'services', label: 'Service Management', shortLabel: 'Services', icon: Layers },
    { id: 'subscription', label: 'Subscription Management', shortLabel: 'Subscription', icon: CreditCard },
    { id: 'marketing', label: 'Marketing', shortLabel: 'Marketing', icon: Megaphone, badge: 'New' },
    { id: 'settings', label: 'Settings', shortLabel: 'Settings', icon: Settings },
  ];

  const handleTabSelect = (tabId: NavItemDef['id']) => {
    triggerHaptic('selection');
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard' : '/mc-portal';

    if (tabId === 'users') {
      if (activeTab === 'users') {
        setUsersOpen(!usersOpen);
      } else {
        setActiveTab('users');
        setUsersOpen(true);
        router.push(`${basePrefix}/users/${activeUsersSubTab || 'system-users'}`);
      }
      return;
    }

    if (tabId === 'services') {
      if (activeTab === 'services') {
        setServicesOpen(!servicesOpen);
      } else {
        setActiveTab('services');
        setServicesOpen(true);
        router.push(`${basePrefix}/services/${activeServicesSubTab || 'category'}`);
      }
      return;
    }

    if (tabId === 'subscription') {
      if (activeTab === 'subscription') {
        setSubscriptionOpen(!subscriptionOpen);
      } else {
        setActiveTab('subscription');
        setSubscriptionOpen(true);
        router.push(`${basePrefix}/subscription/${activeSubscriptionSubTab || 'plan'}`);
      }
      return;
    }

        if (tabId === 'marketing') {
      if (activeTab === 'marketing') {
        setMarketingOpen(!marketingOpen);
      } else {
        setActiveTab('marketing');
        setMarketingOpen(true);
        router.push(`${basePrefix}/marketing/${activeMarketingSubTab || 'push-notification'}`);
      }
      return;
    }

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

  const handleUsersSubTabSelect = (subId: string) => {
    triggerHaptic('selection');
    setActiveTab('users');
    setActiveUsersSubTab(subId);
    setUsersOpen(true);
    setIsDrawerOpen(false);
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard/users' : '/mc-portal/users';
    router.push(`${basePrefix}/${subId}`);
  };

  const handleServicesSubTabSelect = (subId: string) => {
    triggerHaptic('selection');
    setActiveTab('services');
    setActiveServicesSubTab(subId);
    setServicesOpen(true);
    setIsDrawerOpen(false);
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard/services' : '/mc-portal/services';
    router.push(`${basePrefix}/${subId}`);
  };

  const handleSubscriptionSubTabSelect = (subId: string) => {
    triggerHaptic('selection');
    setActiveTab('subscription');
    setActiveSubscriptionSubTab(subId);
    setSubscriptionOpen(true);
    setIsDrawerOpen(false);
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard/subscription' : '/mc-portal/subscription';
    router.push(`${basePrefix}/${subId}`);
  };

  const handleMarketingSubTabSelect = (subId: string) => {
    triggerHaptic('selection');
    setActiveTab('marketing');
    setActiveMarketingSubTab(subId);
    setMarketingOpen(true);
    setIsDrawerOpen(false);
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard/marketing' : '/mc-portal/marketing';
    router.push(`${basePrefix}/${subId}`);
  };

  const handleSubTabSelect = (subId: string) => {
    triggerHaptic('selection');
    setActiveTab('settings');
    setActiveSubTab(subId);
    setSettingsOpen(true);
    setIsDrawerOpen(false);
    const isDashboardPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard');
    const basePrefix = isDashboardPath ? '/dashboard/settings' : '/mc-portal/settings';
    router.push(`${basePrefix}/${subId}`);
  };

  const toggleDrawer = () => {
    triggerHaptic('light');
    setIsDrawerOpen((prev) => !prev);
  };

  const currentTabDef = navItems.find((n) => n.id === activeTab) || navItems[0];
  const TabIcon = currentTabDef.icon;
  const userInitial = (user?.name || user?.email || 'A')[0].toUpperCase();

  const isMoreActive = activeTab === 'settings' || activeTab === 'subscription' || activeTab === 'marketing' || isDrawerOpen;

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
            const isUsers = item.id === 'users';
            const isServices = item.id === 'services';
            const isSubscription = item.id === 'subscription';
                        const isMarketing = item.id === 'marketing';
            const isExpandable = isSettings || isUsers || isServices || isSubscription || isMarketing;
            const isExpanded = isSettings ? settingsOpen : isUsers ? usersOpen : isServices ? servicesOpen : isSubscription ? subscriptionOpen : isMarketing ? marketingOpen : false;

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
                      {isExpandable && (
                        <ChevronDown
                          size={15}
                          style={{
                            transition: 'transform 0.2s ease',
                            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                            color: isActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </>
                  )}
                </button>

                {/* Expandable Users Sub-menu (Desktop) */}
                {isUsers && !collapsed && usersOpen && (
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
                    {USERS_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === 'users' && activeUsersSubTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleUsersSubTabSelect(sub.id)}
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
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                            {sub.label}
                          </span>
                          {sub.badge && (
                            <span
                              style={{
                                fontSize: 10,
                                padding: '1px 5px',
                                borderRadius: 10,
                                background: isSubActive ? 'var(--mc-brand-purple)' : '#EFF6FF',
                                color: isSubActive ? '#FFFFFF' : '#2563EB',
                                fontWeight: 700,
                              }}
                            >
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Expandable Services Sub-menu (Desktop) */}
                {isServices && !collapsed && servicesOpen && (
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
                    {SERVICES_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === 'services' && activeServicesSubTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleServicesSubTabSelect(sub.id)}
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
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                            {sub.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Expandable Subscription Sub-menu (Desktop) */}
                {isSubscription && !collapsed && subscriptionOpen && (
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
                    {SUBSCRIPTION_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === 'subscription' && activeSubscriptionSubTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleSubscriptionSubTabSelect(sub.id)}
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
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                            {sub.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                
                {/* Expandable Marketing Sub-menu (Desktop) */}
                {isMarketing && !collapsed && marketingOpen && (
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
                    {MARKETING_SUB_ITEMS.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === 'marketing' && activeMarketingSubTab === sub.id;

                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleMarketingSubTabSelect(sub.id)}
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
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                            {sub.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

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
              const isUsers = item.id === 'users';
              const isServices = item.id === 'services';
              const isSubscription = item.id === 'subscription';
              const isMarketing = item.id === 'marketing';
              const isExpandable = isSettings || isUsers || isServices || isSubscription || isMarketing;
              const isExpanded = isSettings ? settingsOpen : isUsers ? usersOpen : isServices ? servicesOpen : isSubscription ? subscriptionOpen : isMarketing ? marketingOpen : false;

              return (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    className={`mc-drawer-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabSelect(item.id)}
                  >
                    <Icon size={18} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                    {item.badge && <span className="mc-drawer-nav-badge">{item.badge}</span>}
                    {isExpandable && (
                      <ChevronDown
                        size={15}
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                          color: isActive ? 'var(--mc-brand-purple)' : 'var(--mc-text-subtle)',
                        }}
                      />
                    )}
                  </button>

                  {/* Expandable Users Sub-menu (Mobile Drawer) */}
                  {isUsers && usersOpen && (
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
                      {USERS_SUB_ITEMS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === 'users' && activeUsersSubTab === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleUsersSubTabSelect(sub.id)}
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
                            <span style={{ flex: 1 }}>{sub.label}</span>
                            {sub.badge && (
                              <span
                                style={{
                                  fontSize: 10,
                                  padding: '1px 5px',
                                  borderRadius: 10,
                                  background: isSubActive ? 'var(--mc-brand-purple)' : '#EFF6FF',
                                  color: isSubActive ? '#FFFFFF' : '#2563EB',
                                  fontWeight: 700,
                                }}
                              >
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable Services Sub-menu (Mobile Drawer) */}
                  {isServices && servicesOpen && (
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
                      {SERVICES_SUB_ITEMS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === 'services' && activeServicesSubTab === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleServicesSubTabSelect(sub.id)}
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
                            <span style={{ flex: 1 }}>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Expandable Subscription Sub-menu (Mobile Drawer) */}
                  {isSubscription && subscriptionOpen && (
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
                      {SUBSCRIPTION_SUB_ITEMS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === 'subscription' && activeSubscriptionSubTab === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSubscriptionSubTabSelect(sub.id)}
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
                            <span style={{ flex: 1 }}>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  
                  {/* Expandable Marketing Sub-menu (Mobile Drawer) */}
                  {isMarketing && marketingOpen && (
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
                      {MARKETING_SUB_ITEMS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === 'marketing' && activeMarketingSubTab === sub.id;

                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleMarketingSubTabSelect(sub.id)}
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
              {activeTab === 'overview' && <Overview onNavigateTab={(tab) => handleTabSelect(tab as any)} />}
              {activeTab === 'users' && (
                <UsersMainTab
                  subTab={activeUsersSubTab}
                  onSubTabChange={(sub) => handleUsersSubTabSelect(sub)}
                />
              )}
              {activeTab === 'subscription' && (
                <SubscriptionMainTab
                  subTab={activeSubscriptionSubTab}
                  onSubTabChange={(sub) => handleSubscriptionSubTabSelect(sub)}
                />
              )}
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
            className={`mc-bottom-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => handleTabSelect('users')}
            aria-label="Users tab"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <UserCheck size={19} />
              {activeTab === 'users' && (
                <span className="mc-bottom-badge-dot" style={{ background: 'var(--mc-brand-purple)' }} />
              )}
            </div>
            <span className="mc-bottom-nav-label">Users</span>
          </button>

          <button
            className={`mc-bottom-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabSelect('settings')}
            aria-label="Settings tab"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <Settings size={19} />
              {activeTab === 'settings' && (
                <span className="mc-bottom-badge-dot" style={{ background: 'var(--mc-brand-purple)' }} />
              )}
            </div>
            <span className="mc-bottom-nav-label">Settings</span>
          </button>

          <button
            className={`mc-bottom-nav-item ${isMoreActive ? 'active' : ''}`}
            onClick={toggleDrawer}
            aria-label="More options"
          >
            <div className="mc-bottom-nav-icon-wrap">
              <Menu size={19} />
            </div>
            <span className="mc-bottom-nav-label">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
