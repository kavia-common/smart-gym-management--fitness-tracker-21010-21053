import React from 'react';
import userEvent from '@testing-library/user-event';
import { Routes, Route, Navigate } from 'react-router-dom';
import { renderWithProviders } from '../testUtils';
import { ProtectedRoute } from '../router/ProtectedRoute';
import { RoleGate } from '../router/RoleGate';
import { Layout } from '../ui/Layout';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Users from '../screens/Users';
import Trainers from '../screens/Trainers';
import Settings from '../screens/Settings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/users"
            element={
              <RoleGate roles={['admin', 'superadmin']}>
                <Users />
              </RoleGate>
            }
          />
          <Route
            path="/trainers"
            element={
              <RoleGate roles={['admin', 'trainer_manager', 'superadmin']}>
                <Trainers />
              </RoleGate>
            }
          />
          <Route
            path="/settings"
            element={
              <RoleGate roles={['superadmin']}>
                <Settings />
              </RoleGate>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

describe('Router integration', () => {
  beforeEach(() => localStorage.clear());

  test('login -> dashboard -> navigate to protected pages -> logout', async () => {
    const user = userEvent.setup();
    const { findByText, getByLabelText, getByRole, queryByText } = renderWithProviders(<App />, {
      initialEntries: ['/login']
    });

    // On login page
    await findByText(/Admin Login/i);
    await user.clear(getByLabelText(/Email/i));
    await user.type(getByLabelText(/Email/i), 'root@example.com');
    await user.clear(getByLabelText(/Password/i));
    await user.type(getByLabelText(/Password/i), 'password');
    // choose role superadmin
    await user.selectOptions(getByLabelText(/Role/i), 'superadmin');
    await user.click(getByRole('button', { name: /Login/i }));

    // Should land on Dashboard
    await findByText(/Dashboard/i);
    expect(queryByText(/Welcome back, root@example.com/i)).toBeTruthy();

    // Navigate to Users (allowed)
    await user.click(getByRole('link', { name: /Users/i }));
    await findByText(/Users/i);

    // Navigate to Trainers (allowed for superadmin)
    await user.click(getByRole('link', { name: /Trainers/i }));
    await findByText(/Trainers/i);

    // Navigate to Settings (superadmin only) - allowed
    await user.click(getByRole('link', { name: /Settings/i }));
    await findByText(/Settings/i);

    // Logout -> redirected to login
    await user.click(getByRole('button', { name: /Logout/i }));
    await findByText(/Admin Login/i);
  });
});
