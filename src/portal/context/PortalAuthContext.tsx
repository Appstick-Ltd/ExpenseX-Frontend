import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  getAdminToken,
  getStoredAdminUser,
  clearAdminSession,
} from '../services/portalApi';

interface PortalAuthContextType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const PortalAuthContext = createContext<PortalAuthContextType | undefined>(undefined);

export const PortalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => getAdminToken());
  const [user, setUserState] = useState<any | null>(() => getStoredAdminUser());
  const [isLoading, setIsLoading] = useState<boolean>(() => !!getAdminToken());

  const refreshProfile = useCallback(async () => {
    const currentToken = getAdminToken();
    if (!currentToken) {
      setUserState(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await getAdminProfile();
      const profile = res?.data || res?.user || res;
      setUserState(profile);
    } catch (err) {
      console.warn('Admin token validation failed:', err);
      clearAdminSession();
      setTokenState(null);
      setUserState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      refreshProfile();
    } else {
      setIsLoading(false);
    }
  }, [refreshProfile, token]);

  const login = async (identifier: string, pass: string) => {
    const res = await adminLogin(identifier, pass);
    const retrievedToken = getAdminToken();
    setTokenState(retrievedToken);

    const retrievedUser = res?.data?.user || res?.data || getStoredAdminUser();
    setUserState(retrievedUser);
  };

  const logout = async () => {
    try {
      await adminLogout();
    } finally {
      clearAdminSession();
      setTokenState(null);
      setUserState(null);
      setIsLoading(false);
    }
  };

  return (
    <PortalAuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </PortalAuthContext.Provider>
  );
};

export function usePortalAuth(): PortalAuthContextType {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) {
    throw new Error('usePortalAuth must be used within a PortalAuthProvider');
  }
  return ctx;
}
