'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Login } from '../../../components/auth/Login';

export default function DashboardAuthPage() {
  const router = useRouter();

  return (
    <div className="mc-root">
      <Login onSuccess={() => router.push('/admin')} />
    </div>
  );
}
