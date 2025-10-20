import React from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Dashboard() {
  /** Overview page */
  const { user } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {user?.email} ({user?.role}).</p>
    </div>
  );
}
