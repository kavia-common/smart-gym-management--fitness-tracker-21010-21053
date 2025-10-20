import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * PUBLIC_INTERFACE
 */
export default function Home() {
  /** Landing page for admin panel */
  const { user } = useAuth();
  
  return (
    <div style={{ padding: 24, minHeight: 'calc(100vh - 200px)' }}>
      <h1 style={{ fontSize: 36, marginBottom: 16 }}>
        Smart Gym Admin Panel
      </h1>
      <p style={{ fontSize: 18, marginBottom: 24, maxWidth: 700 }}>
        Centralized management console for gym operations, user management, and system administration.
      </p>

      {!user ? (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Admin Access</h2>
          <p style={{ marginBottom: 16 }}>
            Sign in with your admin credentials to access the management dashboard.
          </p>
          <Link to="/login" className="App-link" style={buttonStyle}>
            Admin Login
          </Link>
        </div>
      ) : (
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Welcome, {user.email}!</h2>
          <p style={{ marginBottom: 16 }}>
            Role: <strong>{user.role}</strong>
          </p>
          <Link to="/" className="App-link" style={buttonStyle}>
            Go to Dashboard
          </Link>
        </div>
      )}

      <div style={{ ...sectionStyle, marginTop: 40 }}>
        <h3 style={{ fontSize: 20, marginBottom: 12 }}>Admin Features</h3>
        <ul style={{ textAlign: 'left', maxWidth: 700, lineHeight: 1.8 }}>
          <li>👥 Manage users, trainers, and member accounts</li>
          <li>📝 Create and manage workout content and plans</li>
          <li>⚙️ Configure system settings and feature flags</li>
          <li>📊 View audit logs and system activity</li>
          <li>🔐 Role-based access control and security</li>
        </ul>
      </div>

      <div style={{ ...sectionStyle, marginTop: 24, padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 8 }}>
        <p style={{ fontSize: 14, margin: 0 }}>
          💡 <strong>Preview Mode:</strong> This admin panel is running in mock mode. 
          All management features are functional for demo purposes.
        </p>
      </div>
    </div>
  );
}

const sectionStyle = {
  marginTop: 24,
  padding: 20,
  borderRadius: 8,
  border: '1px solid var(--border-color)'
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: 6,
  textDecoration: 'none',
  fontWeight: 600
};
