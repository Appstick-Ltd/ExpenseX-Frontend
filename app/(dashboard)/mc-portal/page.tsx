'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { OverviewTab } from '../../../src/portal/components/tabs/OverviewTab';

interface OverviewProps {
  onNavigateTab?: (tabId: string) => void;
}

export default function AdminOverviewPage({ onNavigateTab }: OverviewProps) {
  const router = useRouter();

  const handleNavigate = (tabId: string) => {
    if (onNavigateTab) {
      onNavigateTab(tabId);
      return;
    }
    if (tabId === 'users') {
      router.push('/mc-portal/users');
    } else if (tabId === 'subscription' || tabId === 'subscription/history') {
      router.push('/mc-portal/subscription/history');
    } else {
      router.push(`/mc-portal/${tabId}`);
    }
  };

  return <OverviewTab onNavigateTab={handleNavigate} />;
}

export { AdminOverviewPage as Overview };
