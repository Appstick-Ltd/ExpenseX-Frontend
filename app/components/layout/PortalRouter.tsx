'use client';
import React, { useEffect } from 'react';
import { PortalAuthProvider, usePortalAuth } from '../../context/PortalAuthContext';
import { Login } from '../auth/Login';
import { PortalLayout } from './PortalLayout';
import { ShimmerDashboardScreen } from '../common/Shimmer';
import '../../../styles/portal.css';

export interface PortalRouterProps {
  initialTab?: 'overview' | 'beta-users' | 'users' | 'settings';
  initialSubTab?: string;
}

const PortalRouteHandler: React.FC<PortalRouterProps> = ({ initialTab, initialSubTab }) => {
  const { isAuthenticated, isLoading } = usePortalAuth();

  // Safely synchronize browser URL with auth state via useEffect
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && window.location.pathname.startsWith('/dashboard/auth')) {
        window.history.replaceState(null, '', '/dashboard');
      } else if (!isAuthenticated && window.location.pathname.startsWith('/dashboard') && !window.location.pathname.startsWith('/dashboard/auth')) {
        window.history.replaceState(null, '', '/dashboard/auth');
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <ShimmerDashboardScreen />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <PortalLayout initialTab={initialTab} initialSubTab={initialSubTab} />;
};

export const PortalRouter: React.FC<PortalRouterProps> = (props) => {
  return (
    <PortalAuthProvider>
      <div className="mc-root">
        <PortalRouteHandler {...props} />
      </div>
    </PortalAuthProvider>
  );
};
