import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { renderWithProviders } from '../testUtils';
import { ProtectedRoute } from '../router/ProtectedRoute';
import { RoleGate } from '../router/RoleGate';
import Trainers from '../screens/Trainers';

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/trainers"
          element={
            <RoleGate roles={['admin', 'trainer_manager', 'superadmin']}>
              <Trainers />
            </RoleGate>
          }
        />
      </Route>
    </Routes>
  );
}

describe('Trainers list mock screen', () => {
  beforeEach(() => {
    localStorage.setItem(
      'adminpanel_session',
      JSON.stringify({
        token: 't',
        user: { id: 'u', email: 'a@example.com', role: 'admin' }
      })
    );
  });

  test('renders trainers page', async () => {
    const { findByText } = renderWithProviders(<App />, { initialEntries: ['/trainers'] });
    expect(await findByText(/Trainers/i)).toBeInTheDocument();
    expect(await findByText(/Assign workout plans/i)).toBeInTheDocument();
  });
});
