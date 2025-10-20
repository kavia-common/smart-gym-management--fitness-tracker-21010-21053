import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function RoleGate({ roles, children }) {
  /**
   * Checks if current user role is allowed; if not, redirect to dashboard.
   * roles: array of allowed roles
   */
  const location = useLocation();
  const { user } = useAuth();
  const userRole = user?.role;

  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/" replace state={{ from: location, reason: 'forbidden' }} />;
  }
  return children;
}
