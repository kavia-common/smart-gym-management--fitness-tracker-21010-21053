# AdminPanel - Smart Gym

This React app provides administrative capabilities to manage users, trainers, content, and settings. It follows the same API client interface as WebFrontend.

## Run

- Copy `.env.example` to `.env` and adjust as needed. Defaults are safe.
- Install dependencies:
  npm install
- Start dev server (port 3001):
  npm start

Port: 3001

## Environment (.env.example keys)
- REACT_APP_ADMIN_API_BASE_URL=https://your-backend.example.com
- REACT_APP_USE_MOCK_API=true
- REACT_APP_FEATURE_REALTIME=false
- REACT_APP_FEATURE_AUDIT_HOOKS=true
- REACT_APP_MOCK_API_DELAY_MS=300
- REACT_APP_MOCK_API_ERROR=false

## API client
- Core methods available: { get, post, put, delete } returning { data, error }.
- Domain helpers use the same normalized error handling.
- Toggle between Mock vs Real API via REACT_APP_USE_MOCK_API.

## Feature Flags
- REACT_APP_FEATURE_REALTIME=false: Enable realtime usage where applicable.
- REACT_APP_FEATURE_AUDIT_HOOKS=true: Show/enable audit log related UX.

