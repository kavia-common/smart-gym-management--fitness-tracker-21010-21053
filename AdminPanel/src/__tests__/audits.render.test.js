import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '../testUtils';
import { ProtectedRoute } from '../router/ProtectedRoute';
import { RoleGate } from '../router/RoleGate';
import Audits from '../screens/Audits';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/audits"
          element={
            <RoleGate roles={['auditor', 'superadmin']}>
              <Audits />
            </RoleGate>
          }
        />
      </Route>
    </Routes>
  );
}

describe('Audits page renders content in mock mode', () => {
  beforeEach(() => {
    localStorage.setItem(
      'adminpanel_session',
      JSON.stringify({
        token: 't',
        user: { id: 'u', email: 'a@example.com', role: 'superadmin' }
      })
    );
  });

  test('audits screen basic render', async () => {
    const { findByText } = renderWithProviders(<App />, { initialEntries: ['/audits'] });
    expect(await findByText(/Audits/i)).toBeInTheDocument();
    expect(await findByText(/Audit logs and compliance/i)).toBeInTheDocument();
  });
});
