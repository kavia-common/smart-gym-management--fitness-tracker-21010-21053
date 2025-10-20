import React, { createContext, useContext, useMemo } from 'react';

const FeatureFlagsContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 */
// PUBLIC_INTERFACE
export function FeatureFlagsProvider({ children }) {
  /**
   * Reads flags from environment variables.
   * REACT_APP_FEATURE_REALTIME, REACT_APP_USE_MOCK_API
   */
  const flags = useMemo(() => {
    const getBool = (v, def = 'false') =>
      String(v ?? def).toLowerCase() === 'true';
    return {
      realtime: getBool(process.env.REACT_APP_FEATURE_REALTIME),
      useMockApi: getBool(process.env.REACT_APP_USE_MOCK_API, 'true'),
    };
  }, []);

  return (
    <FeatureFlagsContext.Provider value={flags}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useFlags() {
  /** Returns current feature flags */
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) {
    throw new Error('useFlags must be used within FeatureFlagsProvider');
  }
  return ctx;
}
