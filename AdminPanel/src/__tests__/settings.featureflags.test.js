import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureFlagsProvider, useFlags } from '../contexts/FeatureFlagsContext';

function Consumer() {
  const flags = useFlags();
  return (
    <div>
      <div aria-label="realtime">{String(flags.realtime)}</div>
      <div aria-label="useMockApi">{String(flags.useMockApi)}</div>
    </div>
  );
}

describe('FeatureFlagsContext', () => {
  test('reads flags from environment variables', () => {
    process.env.REACT_APP_FEATURE_REALTIME = 'false';
    process.env.REACT_APP_USE_MOCK_API = 'true';

    render(
      <FeatureFlagsProvider>
        <Consumer />
      </FeatureFlagsProvider>
    );

    expect(screen.getByLabelText('realtime').textContent).toBe('false');
    expect(screen.getByLabelText('useMockApi').textContent).toBe('true');
  });

  test('realtime true when flag enabled', () => {
    process.env.REACT_APP_FEATURE_REALTIME = 'true';
    process.env.REACT_APP_USE_MOCK_API = 'true';

    render(
      <FeatureFlagsProvider>
        <Consumer />
      </FeatureFlagsProvider>
    );

    expect(screen.getByLabelText('realtime').textContent).toBe('true');
    expect(screen.getByLabelText('useMockApi').textContent).toBe('true');
  });
});
