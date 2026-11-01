'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Login } from '../../components/auth/Login';
import { ShimmerDashboardScreen } from '../../components/common/Shimmer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = usePortalAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = pathname === '/mc-portal/auth';

  useEffect(() => {
    if (mounted && !isLoading) {
      if (isAuthenticated && isAuthPage) {
        router.replace('/mc-portal');
      } else if (!isAuthenticated && !isAuthPage && pathname.startsWith('/mc-portal')) {
        router.replace('/mc-portal/auth');
      }
    }
  }, [mounted, isAuthenticated, isLoading, isAuthPage, pathname, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  // During SSR and initial client hydration pass before mounting, render shimmer
  // to ensure server HTML and client initial DOM match 100% identically
  if (!mounted || isLoading) {
    return <ShimmerDashboardScreen />;
  }

  if (!isAuthenticated) {
    return <Login onSuccess={() => router.push('/mc-portal')} />;
  }

  return (
    <div className="mc-root">
      <PortalLayout>{children}</PortalLayout>
    </div>
  );
}
