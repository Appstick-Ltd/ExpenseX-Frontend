'use client';
import { PortalRouter } from '../../../components/dashboard/PortalRouter';

export default function DashboardSettingPage() {
  return <PortalRouter initialTab="settings" initialSubTab="general" />;
}
