import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGate } from './RoleGate';
import { Layout } from '../ui/Layout';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Users from '../screens/Users';
import Trainers from '../screens/Trainers';
import Content from '../screens/Content';
import Settings from '../screens/Settings';
import Audits from '../screens/Audits';
import NotFound from '../screens/NotFound';

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function AppRouter() {
  /** Top-level router that wires pages, guard routes and layout */
  return (
    <BrowserRouter>
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
              path="/content"
              element={
                <RoleGate roles={['admin', 'content_admin', 'superadmin']}>
                  <Content />
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
            <Route
              path="/audits"
              element={
                <RoleGate roles={['auditor', 'superadmin']}>
                  <Audits />
                </RoleGate>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
