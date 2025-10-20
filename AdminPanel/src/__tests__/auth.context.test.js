import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function Consumer() {
  const { isAuthenticated, user, login, logout } = useAuth();
  return (
    <div>
      <div aria-label="auth">{isAuthenticated ? 'yes' : 'no'}</div>
      <div aria-label="email">{user?.email || ''}</div>
      <button onClick={() => login('admin@example.com', 'pwd', 'superadmin')}>login</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

describe('AuthContext mock auth persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('login stores session and logout clears it', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    expect(screen.getByLabelText('auth').textContent).toBe('no');

    await act(async () => {
      screen.getByText('login').click();
    });

    expect(screen.getByLabelText('auth').textContent).toBe('yes');
    expect(screen.getByLabelText('email').textContent).toBe('admin@example.com');

    // persistence
    const raw = localStorage.getItem('adminpanel_session');
    expect(raw).toBeTruthy();
    const stored = JSON.parse(raw);
    expect(stored?.user?.email).toBe('admin@example.com');

    await act(async () => {
      screen.getByText('logout').click();
    });

    expect(screen.getByLabelText('auth').textContent).toBe('no');
    expect(localStorage.getItem('adminpanel_session')).toBeNull();
  });
});
