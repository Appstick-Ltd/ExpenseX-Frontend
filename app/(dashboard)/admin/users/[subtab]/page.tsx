'use client';
import { useParams } from 'next/navigation';
import { UsersMainTab } from '../page';

export default function AdminUsersSubtab() {
  const params = useParams();
  const subtab = (params?.subtab as string) || 'system-users';
  return <UsersMainTab subTab={subtab} />;
}
