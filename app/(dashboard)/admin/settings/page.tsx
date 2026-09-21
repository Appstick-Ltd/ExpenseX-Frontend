'use client';
import { PortalRouter } from '../../../components/dashboard/PortalRouter';

export default function DashboardSettingsPage() {
  return <PortalRouter initialTab="settings" initialSubTab="general-settings" />;
}
