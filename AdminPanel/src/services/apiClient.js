import { mockApi } from './mockApi';

const USE_MOCK = String(process.env.REACT_APP_USE_MOCK_API || 'true').toLowerCase() === 'true';
const BASE_URL = process.env.REACT_APP_ADMIN_API_BASE_URL || '';

/**
 * Wrap any async call and return { data, error }.
 * PUBLIC_INTERFACE
 */
export async function wrap(promise) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (e) {
    return { data: null, error: e?.message || 'Unknown error' };
  }
}

/**
 * Low-level request helper for real API only.
 */
async function request(method, path, body) {
  if (USE_MOCK) throw new Error('Mock layer in use');
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = (isJson && payload?.message) || res.statusText || 'Request failed';
    throw new Error(msg);
  }
  return payload;
}

// PUBLIC_INTERFACE
export const apiClient = {
  // PUBLIC_INTERFACE
  async get(path) {
    return wrap(request('GET', path));
  },
  // PUBLIC_INTERFACE
  async post(path, body) {
    return wrap(request('POST', path, body));
  },
  // PUBLIC_INTERFACE
  async put(path, body) {
    return wrap(request('PUT', path, body));
  },
  // PUBLIC_INTERFACE
  async delete(path) {
    return wrap(request('DELETE', path));
  },

  // Domain convenience methods (examples for admin flows)
  async getUsers() {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.getUsers());
      return data || [];
    }
    const { data, error } = await this.get('/admin/users');
    return error ? [] : (data || []);
  },

  async createUser(user) {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.createUser(user));
      return data;
    }
    const { data } = await this.post('/admin/users', user);
    return data;
  },

  async getAuditLogs() {
    if (USE_MOCK) {
      const { data } = await wrap(mockApi.getAuditLogs());
      return data || [];
    }
    const { data, error } = await this.get('/admin/audit');
    return error ? [] : (data || []);
  }
};
