import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/auth';

/**
 * PUBLIC_INTERFACE
 */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides auth state (user, token), role, and auth actions.
   * Persists session in localStorage for simplicity.
   */
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem('adminpanel_session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem('adminpanel_session', JSON.stringify(session));
      } else {
        localStorage.removeItem('adminpanel_session');
      }
    } catch {
      // ignore
    }
  }, [session]);

  const isAuthenticated = Boolean(session?.token);
  const user = session?.user || null;

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      token: session?.token || null,
      // PUBLIC_INTERFACE
      login: async (email, password) => {
        const res = await authService.login(email, password);
        setSession(res);
        return res;
      },
      // PUBLIC_INTERFACE
      logout: async () => {
        await authService.logout();
        setSession(null);
      },
    }),
    [isAuthenticated, user, session?.token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access auth state and actions */
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
