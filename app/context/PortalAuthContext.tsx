'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  getAdminToken,
  getStoredAdminUser,
  clearAdminSession,
} from '../helpers/backend';

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
      const profile = res?.data?.user || res?.data || res?.user || res;
      if (profile && typeof profile === 'object' && Object.keys(profile).length > 0) {
        setUserState(profile);
      }
    } catch (err: any) {
      console.warn('Admin token validation check:', err);
      const errMsg = (err?.message || '').toLowerCase();
      // Only clear the session if the backend explicitly rejected authentication (401 Unauthorized / Token Expired)
      if (
        errMsg.includes('401') ||
        errMsg.includes('unauthorized') ||
        errMsg.includes('jwt expired') ||
        errMsg.includes('invalid token')
      ) {
        clearAdminSession();
        setTokenState(null);
        setUserState(null);
      } else {
        // Retain cached admin user if server is unreachable or returned 404 for profile endpoint
        const stored = getStoredAdminUser();
        if (stored) {
          setUserState(stored);
        }
      }
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
    setIsLoading(true);
    try {
      const res = await adminLogin(identifier, pass);
      const retrievedToken = getAdminToken();
      setTokenState(retrievedToken);

      const retrievedUser = res?.data?.user || res?.data || getStoredAdminUser();
      setUserState(retrievedUser);
      return res;
    } finally {
      setIsLoading(false);
    }
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
