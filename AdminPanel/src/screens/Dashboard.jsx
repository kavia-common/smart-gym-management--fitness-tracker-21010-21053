import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 */
export default function Dashboard() {
  /** Admin overview dashboard with key metrics and quick actions */
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTrainers: 0,
    workoutsToday: 0,
    pendingActions: 0
  });

  useEffect(() => {
    // Simulate loading stats from mock API
    setStats({
      totalUsers: 156,
      activeTrainers: 12,
      workoutsToday: 47,
      pendingActions: 3
    });
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 32, marginBottom: 8 }}>Admin Dashboard</h2>
      <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 24 }}>
        Welcome back, {user?.email} ({user?.role})
      </p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div style={statCardStyle}>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>Total Users</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--text-secondary)' }}>{stats.totalUsers}</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>Active Trainers</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--text-secondary)' }}>{stats.activeTrainers}</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>Workouts Today</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--text-secondary)' }}>{stats.workoutsToday}</div>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 8 }}>Pending Actions</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: '#e53935' }}>{stats.pendingActions}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 24, marginBottom: 16 }}>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
          {user?.role && ['admin', 'superadmin'].includes(user.role) && (
            <Link to="/users" style={actionCardStyle}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>👥</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Manage Users</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>View and edit user accounts</div>
            </Link>
          )}
          {user?.role && ['admin', 'trainer_manager', 'superadmin'].includes(user.role) && (
            <Link to="/trainers" style={actionCardStyle}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🎓</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Manage Trainers</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>Trainer accounts and assignments</div>
            </Link>
          )}
          {user?.role && ['admin', 'content_admin', 'superadmin'].includes(user.role) && (
            <Link to="/content" style={actionCardStyle}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📝</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Manage Content</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>Workout plans and resources</div>
            </Link>
          )}
          {user?.role === 'superadmin' && (
            <Link to="/settings" style={actionCardStyle}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>⚙️</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>System Settings</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>Configure system parameters</div>
            </Link>
          )}
          {user?.role && ['auditor', 'superadmin'].includes(user.role) && (
            <Link to="/audits" style={actionCardStyle}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>View Audits</div>
              <div style={{ fontSize: 14, opacity: 0.7 }}>System activity and logs</div>
            </Link>
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h3 style={{ fontSize: 24, marginBottom: 16 }}>Recent Activity</h3>
        <div style={activityContainerStyle}>
          <div style={activityItemStyle}>
            <span>New user registered: alice@example.com</span>
            <span style={{ opacity: 0.6, fontSize: 14 }}>2 minutes ago</span>
          </div>
          <div style={activityItemStyle}>
            <span>Trainer Bob updated workout plan #42</span>
            <span style={{ opacity: 0.6, fontSize: 14 }}>15 minutes ago</span>
          </div>
          <div style={activityItemStyle}>
            <span>System backup completed successfully</span>
            <span style={{ opacity: 0.6, fontSize: 14 }}>1 hour ago</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const statCardStyle = {
  padding: 20,
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  backgroundColor: 'var(--bg-secondary)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const actionCardStyle = {
  display: 'block',
  padding: 20,
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  backgroundColor: 'var(--bg-secondary)',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.2s',
  cursor: 'pointer'
};

const activityContainerStyle = {
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  backgroundColor: 'var(--bg-secondary)'
};

const activityItemStyle = {
  padding: 16,
  borderBottom: '1px solid var(--border-color)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
