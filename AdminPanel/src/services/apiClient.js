import { useFlags } from '../contexts/FeatureFlagsContext';
import { mockApi } from './mockApi';

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function createApiClient(getToken) {
  /**
   * Returns a minimal API client that uses fetch or mock API depending on flag.
   * getToken: function to retrieve current auth token
   */
  const USE_MOCK = String(process.env.REACT_APP_USE_MOCK_API ?? 'true').toLowerCase() === 'true';

  const base = process.env.REACT_APP_API_BASE_URL || '/api';

  async function request(path, options = {}) {
    if (USE_MOCK) {
      return mockApi(path, options);
    }
    const headers = new Headers(options.headers || {});
    const token = getToken?.();
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');

    const res = await fetch(`${base}${path}`, {
      ...options,
      headers,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `Request failed ${res.status}`);
    }
    const contentType = res.headers.get('content-type') || '';
    return contentType.includes('application/json') ? res.json() : res.text();
  }

  return {
    // PUBLIC_INTERFACE
    get: (p) => request(p, { method: 'GET' }),
    // PUBLIC_INTERFACE
    post: (p, body) => request(p, { method: 'POST', body: JSON.stringify(body) }),
    // PUBLIC_INTERFACE
    put: (p, body) => request(p, { method: 'PUT', body: JSON.stringify(body) }),
    // PUBLIC_INTERFACE
    del: (p) => request(p, { method: 'DELETE' }),
  };
}
