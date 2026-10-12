'use client';
import React, { useEffect, useState } from 'react';
import SystemUsersPage from './system-users/page';
import BetaUsersPage from './beta-users/page';
import AdminRewardsPage from './rewards/page';

export type UsersSubTab = 'system-users' | 'beta-users' | 'rewards';

export interface UsersMainTabProps {
  subTab?: string;
  onSubTabChange?: (tab: string) => void;
}

export function UsersMainTab({ subTab }: UsersMainTabProps) {
  const normalizeSubTab = (val?: string): UsersSubTab => {
    if (!val) return 'system-users';
    const lower = val.toLowerCase().replace(/^\/+/, '');
    if (lower === 'beta' || lower === 'beta-users' || lower === 'early-bird') return 'beta-users';
    if (lower === 'rewards' || lower === 'reward' || lower === 'user-rewards') return 'rewards';
    return 'system-users';
  };

  const [activeSubTab, setActiveSubTab] = useState<UsersSubTab>(() => normalizeSubTab(subTab));

  useEffect(() => {
    if (subTab) {
      setActiveSubTab(normalizeSubTab(subTab));
    }
  }, [subTab]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {activeSubTab === 'rewards' && <AdminRewardsPage />}
      {activeSubTab === 'beta-users' && <BetaUsersPage />}
      {activeSubTab === 'system-users' && <SystemUsersPage />}
    </div>
  );
}

export default function AdminUsersPage({ subTab = 'system-users' }: UsersMainTabProps) {
  return <UsersMainTab subTab={subTab} />;
}
