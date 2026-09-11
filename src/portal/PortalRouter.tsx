import React, { useEffect, useState } from 'react';
import { PortalAuthProvider, usePortalAuth } from './context/PortalAuthContext';
import { PortalLogin } from './components/PortalLogin';
import { PortalLayout } from './components/PortalLayout';
import { Loader2 } from 'lucide-react';
import './portal.css';

const PortalRouteHandler: React.FC = () => {
  const { isAuthenticated, isLoading } = usePortalAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--mc-bg)',
          gap: 12,
        }}
      >
        <Loader2 size={24} className="animate-spin" color="var(--mc-primary)" />
        <span style={{ fontSize: 13, color: 'var(--mc-text-muted)' }}>Verifying superadmin session...</span>
      </div>
    );
  }

  const isAuthRoute = currentPath.startsWith('/mc-portal/auth');

  // If on /mc-portal/auth and already authenticated -> navigate to /mc-portal
  if (isAuthRoute) {
    if (isAuthenticated) {
      navigateTo('/mc-portal');
      return <PortalLayout />;
    }
    return <PortalLogin onSuccess={() => navigateTo('/mc-portal')} />;
  }

  // If on /mc-portal (or subpath) and not authenticated -> navigate to /mc-portal/auth
  if (!isAuthenticated) {
    navigateTo('/mc-portal/auth');
    return <PortalLogin onSuccess={() => navigateTo('/mc-portal')} />;
  }

  // Authenticated on /mc-portal
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
