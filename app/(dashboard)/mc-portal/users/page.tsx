'use client';
import React, { useEffect, useState } from 'react';
import SystemUsersPage from './system-users/page';
import AdminRewardsPage from './rewards/page';

export type UsersSubTab = 'system-users' | 'rewards';

export interface UsersMainTabProps {
  subTab?: string;
  onSubTabChange?: (tab: string) => void;
}

export function UsersMainTab({ subTab }: UsersMainTabProps) {
  const normalizeSubTab = (val?: string): UsersSubTab => {
    if (!val) return 'system-users';
    const lower = val.toLowerCase().replace(/^\/+/, '');
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
      {activeSubTab === 'system-users' && <SystemUsersPage />}
    </div>
  );
}

export default function AdminUsersPage({ subTab = 'system-users' }: UsersMainTabProps) {
  return <UsersMainTab subTab={subTab} />;
}
