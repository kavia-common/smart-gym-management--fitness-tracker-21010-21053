import { render } from '@testing-library/react';
import App from './App';

// Keep a minimal sanity test for the template App component
test('renders App without crashing', () => {
  render(<App />);
});
