import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/Footer';
import './layout.css';

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function Layout() {
  /** App layout with sidebar navigation and topbar */
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Smart Gym Admin</div>
        <nav className="nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/trainers">Trainers</NavLink>
          <NavLink to="/content">Content</NavLink>
          <NavLink to="/audits">Audits</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </aside>
      <main className="main">
        <header className="topbar">
          <div />
          <div className="user">
            <span className="role">{user?.role}</span>
            <span className="email">{user?.email}</span>
            <button className="btn" onClick={logout} aria-label="Logout">Logout</button>
          </div>
        </header>
        <section className="content">
          <Outlet />
        </section>
        <Footer />
      </main>
    </div>
  );
}
