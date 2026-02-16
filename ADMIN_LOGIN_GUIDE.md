# Ezri Admin Login Guide

## Overview
The Ezri platform now has a complete multi-admin login system with **3 different admin types**, each with unique credentials and access levels. Plus, the regular user login accepts any email/password for demo purposes.

---

## 👤 Regular User Login

**URL:** `/login`

**Credentials:** ANY email and password combination works!

For demo purposes, you can use:
- **Email:** `user@example.com` (or any email)
- **Password:** `password123` (or any password)

**What you get access to:**
- Main user dashboard
- AI therapy sessions
- Mood tracking & check-ins
- Journal entries
- Progress tracking
- Wellness tools (meditation, breathing exercises)
- Sleep & habit trackers
- Crisis resources
- User profile & settings

---

## 🔐 Admin Credentials

### 1. Super Admin
**Role:** Full platform access & system management  
**Username:** `superadmin`  
**Password:** `super123`  
**Dashboard:** `/admin/dashboard/super`

**Key Permissions:**
- Full system management
- User & role management
- Security & compliance settings
- System health monitoring
- Billing & subscription management
- Feature flags & A/B testing
- API management
- All admin capabilities

---

### 2. Organization Admin
**Role:** Manage organization users & settings  
**Username:** `orgadmin`  
**Password:** `org123`  
**Dashboard:** `/admin/dashboard/org`

**Key Permissions:**
- Organization-wide user management
- Content & community moderation
- Team management
- Organization analytics
- Therapist management
- Crisis monitoring
- Support ticket handling

---

### 3. Team Admin
**Role:** Manage team members & activities  
**Username:** `teamadmin`  
**Password:** `team123`  
**Dashboard:** `/admin/dashboard/team`

**Key Permissions:**
- Team member management
- Team activity monitoring
- Team role assignments
- Team analytics & reports
- Session monitoring
- Team wellness challenges

---

## 🚀 How to Login

### Method 1: Quick Access via Credentials Page
1. Visit the landing page (`/`)
2. Click **"Admin Credentials"** in the footer (under "Get Started")
3. View all three admin types with their credentials
4. Click **"Login as [Admin Type]"** button for the admin you want to test
5. Select the admin role
6. Enter the username and password shown on the credentials page
7. You'll be logged into that admin's dashboard

### Method 2: Direct Login
1. Visit `/admin/login`
2. **First Step:** Select your admin role (3 cards to choose from)
3. **Second Step:** Enter credentials for that specific role
4. Click "Continue" to access the dashboard

---

## 📍 Important URLs

- **Admin Credentials Page:** `/admin/credentials`
- **Admin Login Portal:** `/admin/login`
- **Super Admin Dashboard:** `/admin/dashboard/super`
- **Org Admin Dashboard:** `/admin/dashboard/org`
- **Team Admin Dashboard:** `/admin/dashboard/team`

---

## ✨ Features

### Login Flow
1. **Role Selection Screen** - Choose which admin type you want to login as
2. **Credentials Entry** - Enter username and password specific to that role
3. **Validation** - System validates credentials match the selected role
4. **Dashboard Access** - Redirects to the appropriate admin dashboard

### Security
- Each admin type has unique credentials
- Credentials are validated against the selected role
- Invalid credentials show an error message
- Password visibility toggle for easy entry
- Session data stored in localStorage

### UI/UX
- Smooth animations and transitions
- 3D card effects with hover states
- Progress indicators showing current step
- Back navigation between steps
- Copy-to-clipboard for credentials on the credentials page
- Mobile-responsive design

---

## 🧪 Testing Each Admin Type

To test all admin dashboards:

1. **Test Super Admin:**
   - Go to `/admin/credentials` 
   - Click "Login as Super Admin"
   - Or manually login with `superadmin` / `super123`
   - Explore full system management features

2. **Test Org Admin:**
   - Go to `/admin/credentials`
   - Click "Login as Organization Admin"
   - Or manually login with `orgadmin` / `org123`
   - Explore organization management features

3. **Test Team Admin:**
   - Go to `/admin/credentials`
   - Click "Login as Team Admin"
   - Or manually login with `teamadmin` / `team123`
   - Explore team management features

---

## 🎨 User Experience

The credentials page (`/admin/credentials`) provides:
- Visual cards for each admin type with color-coded gradients
- One-click copy for usernames and passwords
- List of key permissions for each role
- Direct login buttons for each admin type
- Quick start guide with 4-step process
- Beautiful animations and floating background elements

---

## 💡 Notes

- This is a demo environment using mock data
- All credentials work for testing purposes only
- Data persistence uses localStorage (no backend required)
- All 80+ screens across the platform are accessible
- Each admin type has access to different features based on their role
- The system validates that credentials match the selected admin role

---

## 📊 Admin Feature Access

### Super Admin Can Access:
- All user management screens
- System health & monitoring
- Security settings
- Billing & subscriptions
- API management
- Feature flags
- A/B testing
- Compliance & audit logs
- Data retention policies
- Enterprise features

### Org Admin Can Access:
- Organization user management
- Content management & moderation
- Community management
- Therapist management
- Crisis monitoring & protocols
- Support tickets
- Organization analytics
- Team management

### Team Admin Can Access:
- Team member management
- Team roles & permissions
- Session monitoring
- Team analytics
- Wellness challenges
- Activity monitoring
- Team reports

---

**Built with React, TypeScript, Tailwind CSS, and Motion for smooth animations!**