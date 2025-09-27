import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider.js';
import Layout from '../components/Layout.js';

function AuthGuard({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return React.createElement(
      'div',
      { className: 'loading-container' },
      React.createElement('div', { className: 'loading-spinner' }),
      React.createElement('p', null, 'Loading...')
    );
  }

  if (!isAuthenticated) {
    return React.createElement(Navigate, { to: '/login', replace: true });
  }

  return React.createElement(Layout, null, children);
}

export default AuthGuard;