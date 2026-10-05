import React, { useEffect } from 'react';
import { PortalAuthProvider, usePortalAuth } from './context/PortalAuthContext';
import { PortalLogin } from './components/PortalLogin';
import { PortalLayout } from './components/PortalLayout';
import { ShimmerDashboardScreen } from './components/common/Shimmer';
import './portal.css';

const PortalRouteHandler: React.FC = () => {
  const { isAuthenticated, isLoading } = usePortalAuth();

  // Safely synchronize browser URL with auth state via useEffect
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && window.location.pathname.startsWith('/mc-portal/auth')) {
        window.history.replaceState(null, '', '/mc-portal');
      } else if (!isAuthenticated && !window.location.pathname.startsWith('/mc-portal/auth')) {
        window.history.replaceState(null, '', '/mc-portal/auth');
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <ShimmerDashboardScreen />;
  }

  if (!isAuthenticated) {
    return <PortalLogin />;
  }

  return <PortalLayout />;
};

export const PortalRouter: React.FC = () => {
  return (
    <PortalAuthProvider>
      <div className="mc-root">
        <PortalRouteHandler />
      </div>
    </PortalAuthProvider>
  );
};
