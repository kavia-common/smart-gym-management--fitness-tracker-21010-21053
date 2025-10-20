import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 */
export default function Login() {
  /** Simple login screen supporting choosing a role for mock auth */
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('superadmin');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password, role);
      const to = location.state?.from?.pathname || '/';
      navigate(to, { replace: true });
    } catch (err) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="App">
      <header className="App-header" role="main">
        <h2 style={{ marginBottom: 16 }}>Smart Gym Admin Login</h2>
        <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 24, maxWidth: 350 }}>
          Sign in with your admin credentials. In mock mode, any email/password combination works.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, minWidth: 320 }}>
          <input 
            aria-label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email address" 
            style={{ padding: 10, borderRadius: 6 }}
          />
          <input 
            aria-label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            style={{ padding: 10, borderRadius: 6 }}
          />
          <label style={{ fontSize: 14, textAlign: 'left' }}>
            Select Role:
            <select 
              aria-label="Role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 6, marginTop: 4 }}
            >
              <option value="superadmin">Super Admin (Full Access)</option>
              <option value="admin">Admin (User & Trainer Management)</option>
              <option value="trainer_manager">Trainer Manager</option>
              <option value="content_admin">Content Admin</option>
              <option value="auditor">Auditor (View Only)</option>
            </select>
          </label>
          {error && <div style={{ color: 'tomato', fontSize: 14 }}>{error}</div>}
          <button className="theme-toggle" type="submit" style={{ marginTop: 8 }}>
            Sign In
          </button>
        </form>
        <div style={{ marginTop: 24, padding: 16, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 8, fontSize: 13, maxWidth: 350 }}>
          <strong>💡 Quick Start:</strong> Use any email (e.g., admin@example.com) and password. 
          Select a role to see different access levels in the dashboard.
        </div>
      </header>
    </div>
  );
}
