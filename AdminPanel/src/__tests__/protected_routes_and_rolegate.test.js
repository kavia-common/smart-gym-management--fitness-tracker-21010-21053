import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '../testUtils';
import { ProtectedRoute } from '../router/ProtectedRoute';
import { RoleGate } from '../router/RoleGate';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Users from '../screens/Users';

function AppShell() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/users"
          element={
            <RoleGate roles={['admin', 'superadmin']}>
              <Users />
            </RoleGate>
          }
        />
      </Route>
    </Routes>
  );
}

describe('ProtectedRoute and RoleGate', () => {
  beforeEach(() => localStorage.clear());

  test('unauthenticated user is redirected to /login', async () => {
    renderWithProviders(<AppShell />, { initialEntries: ['/'] });
    // Should see login screen title
    expect(await screen.findByText(/Admin Login/i)).toBeInTheDocument();
  });

  test('authenticated but wrong role redirected from /users to dashboard', async () => {
    // Pre-populate session with role that is not allowed (trainer)
    localStorage.setItem(
      'adminpanel_session',
      JSON.stringify({
        token: 't',
        user: { id: 'u', email: 't@example.com', role: 'trainer' }
      })
    );

    renderWithProviders(<AppShell />, { initialEntries: ['/users'] });
    // Should land on dashboard due to RoleGate redirect
    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
  });

  test('admin role can access /users', async () => {
    localStorage.setItem(
      'adminpanel_session',
      JSON.stringify({
        token: 't',
        user: { id: 'u', email: 'a@example.com', role: 'admin' }
      })
    );
    renderWithProviders(<AppShell />, { initialEntries: ['/users'] });
    expect(await screen.findByText(/Users/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage members and admin users/i)).toBeInTheDocument();
  });
});
