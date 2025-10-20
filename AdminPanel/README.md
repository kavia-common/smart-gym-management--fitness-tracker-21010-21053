# AdminPanel - Smart Gym Management

Dedicated interface for admins to manage users, trainers, content, and system settings. Includes role-based guards, a Sidebar/Topbar layout, mock API, optional Supabase realtime, and environment-based configuration.

## Quick start

- Install: `npm install`
- Run dev: `PORT=3001 npm start`
- Open: http://localhost:3001

Default login uses a mock auth flow. Choose a role on the login screen.

## Routes

- `/login` unauthenticated login
- `/` Dashboard (protected)
- `/users` (roles: admin, superadmin)
- `/trainers` (roles: admin, trainer_manager, superadmin)
- `/content` (roles: admin, content_admin, superadmin)
- `/settings` (roles: superadmin)
- `/audits` (roles: auditor, superadmin)

Guards:
- ProtectedRoute redirects unauthenticated users to `/login`
- RoleGate redirects unauthorized roles back to `/`

## Environment variables

See `.env.example`. Set in your environment or create a `.env` file.

- REACT_APP_API_BASE_URL: Backend API base path (default `/api`)
- REACT_APP_USE_MOCK_API: Enable mock API instead of fetch (default `true`)
- REACT_APP_FEATURE_REALTIME: Toggle Supabase realtime (default `false`)
- REACT_APP_SUPABASE_URL: Supabase URL
- REACT_APP_SUPABASE_ANON_KEY: Supabase anon key

## Supabase

Shared client in `src/services/supabaseClient.js`. Realtime helper in `src/services/realtime.js`.

## Development notes

- Dev server runs on port 3001 (see package.json)
- The original template `App` component remains for tests but routing entry is `src/router/AppRouter.jsx`
- Minimal CSS is in `src/App.css` and `src/ui/layout.css`

