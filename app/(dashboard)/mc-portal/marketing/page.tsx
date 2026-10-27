'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketingPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/mc-portal/marketing/push-notification');
  }, [router]);
  return null;
}
