const delay = Number(process.env.REACT_APP_MOCK_API_DELAY_MS || 300);
const SHOULD_ERROR = String(process.env.REACT_APP_MOCK_API_ERROR || 'false').toLowerCase() === 'true';

let users = [
  { id: 'u1', email: 'admin@example.com', role: 'admin' },
  { id: 'u2', email: 'trainer@example.com', role: 'trainer' },
];

let auditLogs = [
  { id: 'a1', ts: Date.now(), actor: 'admin@example.com', action: 'LOGIN' },
];

function wait(ms = delay) {
  return new Promise(res => setTimeout(res, ms));
}

function maybeThrow() {
  if (SHOULD_ERROR) throw new Error('Mock API error (simulated)');
}

// PUBLIC_INTERFACE
export const mockApi = {
  async getUsers() {
    await wait();
    maybeThrow();
    return [...users];
  },
  async createUser(user) {
    await wait();
    maybeThrow();
    const item = { id: `u${Date.now()}`, ...user };
    users = [item, ...users];
    return item;
  },
  async getAuditLogs() {
    await wait();
    maybeThrow();
    return [...auditLogs];
  }
};
