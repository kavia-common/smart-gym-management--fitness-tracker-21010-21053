import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './contexts/AuthContext';
import { FeatureFlagsProvider } from './contexts/FeatureFlagsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FeatureFlagsProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </FeatureFlagsProvider>
  </React.StrictMode>
);
