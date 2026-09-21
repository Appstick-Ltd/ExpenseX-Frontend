'use client';
import { useParams } from 'next/navigation';
import { PortalRouter } from '../../../../components/dashboard/PortalRouter';

export default function DashboardSettingSubtab() {
  const params = useParams();
  const subtab = (params?.subtab as string) || 'general';
  return <PortalRouter initialTab="settings" initialSubTab={subtab} />;
}
