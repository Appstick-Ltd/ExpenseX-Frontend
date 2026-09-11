import React, { useEffect } from 'react';
import { PortalAuthProvider, usePortalAuth } from './context/PortalAuthContext';
import { PortalLogin } from './components/PortalLogin';
import { PortalLayout } from './components/PortalLayout';
import { Loader2 } from 'lucide-react';
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
        <span style={{ fontSize: 13, color: 'var(--mc-text-muted)', fontWeight: 500 }}>
          Verifying superadmin session...
        </span>
      </div>
    );
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
