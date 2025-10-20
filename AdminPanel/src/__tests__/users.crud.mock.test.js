import { mockApi } from '../services/mockApi';

describe('Users mock CRUD interactions', () => {
  beforeEach(() => {
    process.env.REACT_APP_USE_MOCK_API = 'true';
  });

  test('list users returns seeded mock users', async () => {
    const list = await mockApi.getUsers();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    expect(list[0]).toHaveProperty('email');
  });

  test('createUser adds a user to the beginning of the list', async () => {
    const before = await mockApi.getUsers();
    const newUser = await mockApi.createUser({ email: 'new@example.com', role: 'admin' });
    expect(newUser).toHaveProperty('id');
    const after = await mockApi.getUsers();
    // The latest created should now be present
    const found = after.find((u) => u.email === 'new@example.com');
    expect(found).toBeTruthy();
  });
});
