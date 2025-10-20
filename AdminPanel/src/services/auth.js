function randomToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * PUBLIC_INTERFACE
 */
export const authService = {
  // PUBLIC_INTERFACE
  async login(email, password, role = 'superadmin') {
    /**
     * Mock login that returns a session token and user object. In real integration,
     * replace with backend auth or Supabase auth.
     */
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    return {
      token: randomToken(),
      user: {
        id: 'u_' + Math.random().toString(36).slice(2),
        email,
        role,
      },
    };
  },
  // PUBLIC_INTERFACE
  async logout() {
    /** Mock logout no-op */
    return true;
  },
};
