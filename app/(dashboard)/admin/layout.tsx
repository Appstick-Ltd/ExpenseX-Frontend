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

  const isAuthPage = pathname === '/admin/auth';

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && isAuthPage) {
        router.replace('/admin');
      } else if (!isAuthenticated && !isAuthPage && pathname.startsWith('/admin')) {
        router.replace('/admin/auth');
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
    return <Login onSuccess={() => router.push('/admin')} />;
  }

  return (
    <div className="mc-root">
      <PortalLayout>{children}</PortalLayout>
    </div>
  );
}
