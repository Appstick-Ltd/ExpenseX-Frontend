'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { usePortalAuth } from '../../context/PortalAuthContext';
import { PortalLayout } from '../../components/layout/PortalLayout';
import { Login } from '../../components/auth/Login';
import { ShimmerDashboardScreen } from '../../components/common/Shimmer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = usePortalAuth();

  const isAuthPage = pathname === '/mc-portal/auth';

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && isAuthPage) {
        router.replace('/mc-portal');
      } else if (!isAuthenticated && !isAuthPage && pathname.startsWith('/mc-portal')) {
        router.replace('/mc-portal/auth');
      }
    }
  }, [isAuthenticated, isLoading, isAuthPage, pathname, router]);

  if (isAuthPage) {
    return <>{children}</>;
  }
  console.log(isAuthPage);
  if (isLoading) {
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
