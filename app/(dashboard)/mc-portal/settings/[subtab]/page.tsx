'use client';
import { useParams } from 'next/navigation';
import { SettingsTab } from '../SettingsTab';

export default function AdminSettingsSubtab() {
  const params = useParams();
  const subtab = (params?.subtab as string) || 'general-settings';
  return <SettingsTab subTab={subtab} />;
}
