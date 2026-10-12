'use client';
import { useParams } from 'next/navigation';
import { SubscriptionMainTab } from '../page';

export default function AdminSubscriptionSubtab() {
  const params = useParams();
  const subtab = (params?.subtab as string) || 'plan';
  return <SubscriptionMainTab subTab={subtab} />;
}
