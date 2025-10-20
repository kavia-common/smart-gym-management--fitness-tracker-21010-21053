import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 */
export default function NotFound() {
  /** Fallback 404 page */
  return (
    <div>
      <h2>Not Found</h2>
      <p>The page you are looking for was not found. Go to <Link to="/">Dashboard</Link>.</p>
    </div>
  );
}
