# AdminPanel - Smart Gym

This React app provides administrative capabilities to manage users, trainers, content, and settings. It follows the same API client interface as WebFrontend.

## Quick Preview

The admin panel runs in **mock mode** by default - no backend required!

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server (port 3001):**
   ```bash
   npm start
   ```

3. **Navigate the admin panel:**
   - **Home** → Landing page with admin overview
   - **Login** → Use any email/password (e.g., admin@example.com / password)
   - **Select Role** → Choose from superadmin, admin, trainer_manager, content_admin, or auditor
   - **Dashboard** → View system stats and quick actions (access varies by role)
   - **Users** → Manage user accounts (admin/superadmin only)
   - **Trainers** → Manage trainers (admin/trainer_manager/superadmin)
   - **Content** → Manage workout content (admin/content_admin/superadmin)
   - **Settings** → System settings (superadmin only)
   - **Audits** → View audit logs (auditor/superadmin only)

Port: 3001

## Mock Mode (Default)

The admin panel uses in-memory mock data by default. All features work without any backend:
- ✅ Role-based access control
- ✅ User and trainer management
- ✅ Content management interface
- ✅ System settings configuration
- ✅ Audit log viewing

Different roles will see different menu options based on their permissions.

To toggle mock mode, see `.env.example` and adjust `REACT_APP_USE_MOCK_API`.

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

