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
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, minWidth: 300 }}>
          <input aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input aria-label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
          <select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="superadmin">superadmin</option>
            <option value="admin">admin</option>
            <option value="trainer_manager">trainer_manager</option>
            <option value="content_admin">content_admin</option>
            <option value="auditor">auditor</option>
          </select>
          {error && <div style={{ color: 'tomato' }}>{error}</div>}
          <button className="theme-toggle" type="submit">Login</button>
        </form>
      </header>
    </div>
  );
}
