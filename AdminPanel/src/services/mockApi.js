const data = {
  '/stats': { users: 1200, trainers: 24, activeToday: 310 },
  '/users': [{ id: 1, email: 'member1@gym.com' }, { id: 2, email: 'member2@gym.com' }],
};

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export async function mockApi(path, options = {}) {
  /** Simple in-memory mock API */
  await new Promise((r) => setTimeout(r, 150));
  if (path in data) return JSON.parse(JSON.stringify(data[path]));
  // default echo
  return { path, method: options.method || 'GET', ok: true };
}
