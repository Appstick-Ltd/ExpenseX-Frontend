'use client';
import React, { useEffect, useState } from 'react';
import SubscriptionPlanPage from './plan/page';
import SubscriptionHistoryPage from './history/page';

export type SubscriptionSubTab = 'plan' | 'history';

export interface SubscriptionMainTabProps {
  subTab?: string;
  onSubTabChange?: (tab: string) => void;
}

export const SubscriptionMainTab: React.FC<SubscriptionMainTabProps> = ({ subTab }) => {
  const normalizeSubTab = (val?: string): SubscriptionSubTab => {
    if (!val) return 'plan';
    const lower = val.toLowerCase().replace(/^\/+/, '');
    if (lower === 'history' || lower === 'purchase-history' || lower === 'subscription-history') {
      return 'history';
    }
    return 'plan';
  };

  const [activeSubTab, setActiveSubTab] = useState<SubscriptionSubTab>(() => normalizeSubTab(subTab));

  useEffect(() => {
    if (subTab) {
      setActiveSubTab(normalizeSubTab(subTab));
    }
  }, [subTab]);

  return (
    <div>
      {activeSubTab === 'history' ? <SubscriptionHistoryPage /> : <SubscriptionPlanPage />}
    </div>
  );
};

export default function AdminSubscriptionPage({ subTab = 'plan' }: SubscriptionMainTabProps) {
  return <SubscriptionMainTab subTab={subTab} />;
}
