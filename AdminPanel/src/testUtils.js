import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AuthProvider } from './contexts/AuthContext';
import { FeatureFlagsProvider } from './contexts/FeatureFlagsContext';

// Ensure mock mode and default feature flags in tests
process.env.REACT_APP_USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API ?? 'true';
process.env.REACT_APP_FEATURE_REALTIME = process.env.REACT_APP_FEATURE_REALTIME ?? 'false';
process.env.REACT_APP_FEATURE_AUDIT_HOOKS = process.env.REACT_APP_FEATURE_AUDIT_HOOKS ?? 'false';
process.env.REACT_APP_FEATURE_AI_RECS = process.env.REACT_APP_FEATURE_AI_RECS ?? 'true';

// PUBLIC_INTERFACE
export function renderWithProviders(ui, { route = '/', initialEntries, auth = true } = {}) {
  /**
   * Render a component under test with AuthProvider and FeatureFlagsProvider,
   * using MemoryRouter for route-based tests. If auth is false, render without
   * pre-authenticated state (start at /login).
   */
  const Wrapper = ({ children }) => (
    <FeatureFlagsProvider>
      <AuthProvider>{children}</AuthProvider>
    </FeatureFlagsProvider>
  );

  const entries = initialEntries ?? [route];
  return render(
    <Wrapper>
      <MemoryRouter initialEntries={entries}>{ui}</MemoryRouter>
    </Wrapper>
  );
}
