# Smart Gym AdminPanel - Preview Guide

## 🚀 Quick Start (Mock Mode)

This admin panel is ready to preview immediately with no backend setup required!

### 1. Start the Application

```bash
npm install
npm start
```

The app will open at http://localhost:3001

### 2. Navigate the Preview

#### **Login Flow**
1. Go to `/login` or the app will redirect you there
2. Use any credentials (e.g., `admin@example.com` / `password`)
3. **Select a role** to see different access levels:
   - **Super Admin**: Full access to all features
   - **Admin**: User and trainer management
   - **Trainer Manager**: Trainer-specific management
   - **Content Admin**: Content and workout plan management
   - **Auditor**: View-only access to audit logs

#### **Role-Based Access**

Each role sees different menu items:

**Super Admin** (Full Access):
- Dashboard
- Users
- Trainers
- Content
- Settings
- Audits

**Admin**:
- Dashboard
- Users
- Trainers
- Content

**Trainer Manager**:
- Dashboard
- Trainers

**Content Admin**:
- Dashboard
- Content

**Auditor**:
- Dashboard
- Audits

### 3. Main Features

**Dashboard** (`/dashboard` or `/`)
- System statistics: Total Users (156), Active Trainers (12), Workouts Today (47)
- Quick action cards for role-based navigation
- Recent activity feed
- Pending actions indicator

**Users** (`/users`) - *Admin/Superadmin*
- Manage user accounts
- View and edit member/trainer information
- Mock CRUD operations

**Trainers** (`/trainers`) - *Admin/Trainer Manager/Superadmin*
- Trainer account management
- Assignment tracking
- Performance monitoring

**Content** (`/content`) - *Admin/Content Admin/Superadmin*
- Workout plan management
- Exercise library
- Content creation and editing

**Settings** (`/settings`) - *Superadmin only*
- System configuration
- Feature flag management
- General settings

**Audits** (`/audits`) - *Auditor/Superadmin*
- System activity logs
- User action tracking
- Compliance reports

### 4. Layout

The admin panel uses a **sidebar + topbar layout**:
- **Sidebar**: Navigation menu with role-filtered options
- **Topbar**: User info (role + email) and logout button
- **Footer**: App name, version, and mock mode indicator

### 5. Mock Data

The admin panel includes realistic sample data:
- 156 total users
- 12 active trainers
- 47 workouts logged today
- 3 pending actions
- Recent activity log entries

### 6. Feature Flags

- ❌ Realtime (`REACT_APP_FEATURE_REALTIME=false`)
- ✅ Audit Hooks (`REACT_APP_FEATURE_AUDIT_HOOKS=true`)

### 7. Try These Admin Workflows

1. **Super Admin Experience**: Login as superadmin → Explore all menu options
2. **Role Switching**: Logout → Login with different roles → See access changes
3. **User Management**: Login as admin → Navigate to Users → View mock user data
4. **Audit Review**: Login as auditor → Navigate to Audits → View activity logs

## 🎨 Themes

Toggle between Light and Dark themes using the theme button (inherits from base template).

## ✨ Test Role-Based Access

Try logging in with different roles to see how the interface adapts:
- Menu items appear/disappear based on permissions
- Quick action cards on dashboard change with role
- Proper access control throughout the interface

Enjoy managing Smart Gym! 👨‍💼
