# 📱 EZRI - Complete Application Structure & Navigation Flow

> **Comprehensive guide to all 142 screens, navigation paths, and system architecture**

---

## 🏗️ **SYSTEM ARCHITECTURE OVERVIEW**

```
EZRI APPLICATION
│
├─── 🌐 PUBLIC SECTION (Landing & Marketing)
├─── 🔐 AUTHENTICATION SYSTEM
├─── 🎯 ONBOARDING FLOW (9 Steps)
├─── 💙 USER APP (17 Main Features)
├─── ⚠️ ERROR PAGES (7 Error States)
├─── 👨‍💼 ADMIN PORTAL (69 Admin Pages)
└─── 🎭 DEMO PAGES
```

---

## 📍 **NAVIGATION FLOW CHART**

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                             │
└─────────────────────────────────────────────────────────────────┘

START → Landing Page (/)
           │
           ├─→ Learn More → How It Works (/how-it-works)
           │                     │
           │                     └─→ Back to Landing
           │
           ├─→ Already Have Account? → Login (/login)
           │                              │
           │                              ├─→ Forgot Password? (/forgot-password)
           │                              │
           │                              └─→ Success → App Dashboard
           │
           └─→ Sign Up (/signup)
                   │
                   ↓
           Onboarding Flow (9 Steps)
                   │
                   ├─→ Step 1: Welcome (/onboarding/welcome)
                   ├─→ Step 2: Profile Setup (/onboarding/profile)
                   ├─→ Step 3: Wellness Baseline (/onboarding/wellness-baseline)
                   ├─→ Step 4: Health Background (/onboarding/health-background)
                   ├─→ Step 5: Avatar Preferences (/onboarding/avatar-preferences)
                   ├─→ Step 6: Safety Consent (/onboarding/safety-consent)
                   ├─→ Step 7: Emergency Contact (/onboarding/emergency-contact)
                   ├─→ Step 8: Permissions (/onboarding/permissions)
                   └─→ Step 9: Complete (/onboarding/complete)
                           │
                           ↓
                   App Dashboard (/app/dashboard)
                           │
                           └─→ [USER APP MAIN EXPERIENCE]
```

---

## 🌐 **1. PUBLIC SECTION** (5 Pages)

### Pages & Routes

| Page | Route | Purpose | Navigation Links |
|------|-------|---------|------------------|
| **Landing** | `/` | Homepage & entry point | → How It Works<br>→ Login<br>→ Signup<br>→ Footer: Privacy, Terms, Accessibility |
| **How It Works** | `/how-it-works` | Feature explanation | ← Back to Landing<br>→ Get Started (Signup) |
| **Privacy Policy** | `/privacy` | Legal documentation | ← Back to Landing |
| **Terms of Service** | `/terms` | Legal documentation | ← Back to Landing |
| **Accessibility** | `/accessibility` | Accessibility info | ← Back to Landing |

### Navigation Pattern
- **From Landing:** Can go to any public page or auth pages
- **Footer Links:** Available on all public pages (Privacy, Terms, Accessibility)
- **Header:** "Get Started" → Signup | "Login" → Login

---

## 🔐 **2. AUTHENTICATION SYSTEM** (3 Pages)

### Pages & Routes

| Page | Route | Purpose | Navigation Links |
|------|-------|---------|------------------|
| **Login** | `/login` | User authentication | → Forgot Password<br>→ Sign Up<br>← Back to Landing<br>✓ Success → /app/dashboard |
| **Signup** | `/signup` | New user registration | → Login<br>← Back to Landing<br>✓ Success → /onboarding/welcome |
| **Forgot Password** | `/forgot-password` | Password recovery | ← Back to Login<br>✓ Success → Login |

### Flow
```
Landing → Login → Credentials → App Dashboard
Landing → Signup → Registration → Onboarding
Login → Forgot Password → Reset Email → Login
```

---

## 🎯 **3. ONBOARDING FLOW** (9 Sequential Steps)

### Complete Journey

| Step | Route | Purpose | Data Collected |
|------|-------|---------|----------------|
| **1. Welcome** | `/onboarding/welcome` | Introduction | User acknowledgment |
| **2. Profile Setup** | `/onboarding/profile` | Basic info | Name, DOB, Gender, Pronouns |
| **3. Wellness Baseline** | `/onboarding/wellness-baseline` | Mental health status | Current wellness level, goals |
| **4. Health Background** | `/onboarding/health-background` | Medical history | Conditions, medications, therapy history |
| **5. Avatar Preferences** | `/onboarding/avatar-preferences` | Choose AI companion | Select 1 of 3-4 AI avatars |
| **6. Safety Consent** | `/onboarding/safety-consent` | Crisis protocol | Crisis detection consent |
| **7. Emergency Contact** | `/onboarding/emergency-contact` | Safety setup | Emergency contact details |
| **8. Permissions** | `/onboarding/permissions` | App permissions | Notifications, microphone access |
| **9. Complete** | `/onboarding/complete` | Finish setup | Final confirmation |

### Navigation Flow
```
Each step has:
├─→ "Next" button → Advances to next step
├─→ "Back" button → Returns to previous step (except Step 1)
└─→ Step 9 "Get Started" → /app/dashboard

Progress tracked: 1/9, 2/9, ... 9/9
```

### Features
- **Linear progression** (must complete in order)
- **Progress indicator** (visual stepper)
- **Data persistence** (localStorage)
- **Skip not allowed** (critical health data)

---

## 💙 **4. USER APP** (17 Core Features)

### 4.1 Main Dashboard Hub

| Feature | Route | Purpose | Access From |
|---------|-------|---------|-------------|
| **Dashboard** | `/app/dashboard` | Main hub | All app pages have "Dashboard" link |

**Dashboard Components:**
- Welcome header with user name
- Quick stats (streak, sessions, mood)
- AI Avatar card (start session)
- Mood check-in widget
- Recent journal entries
- Wellness tools shortcuts
- Progress overview
- Navigation to all features

### 4.2 Core Features Navigation

```
📱 USER APP STRUCTURE
│
├── 🏠 Dashboard (/app/dashboard) ← MAIN HUB
│   │
│   ├─→ 🤖 AI AVATAR SESSIONS
│   │   ├── Session Lobby (/app/session-lobby)
│   │   ├── Active Session (/app/active-session)
│   │   └── Session History (/app/session-history)
│   │
│   ├─→ 😊 MOOD TRACKING
│   │   ├── Mood Check-In (/app/mood-checkin)
│   │   └── Mood History (/app/mood-history)
│   │
│   ├─→ 📓 JOURNALING
│   │   └── Journal (/app/journal)
│   │
│   ├─→ 🧘 WELLNESS TOOLS
│   │   ├── Wellness Tools (/app/wellness-tools)
│   │   └── Resources (/app/resources)
│   │
│   ├─→ 📊 PROGRESS & GROWTH
│   │   ├── Progress (/app/progress)
│   │   └── Achievements (/app/achievements)
│   │
│   ├─→ ⚙️ SETTINGS
│   │   └── Settings Hub (/app/settings)
│   │
│   ├─→ 🆘 CRISIS SUPPORT
│   │   └── Crisis Resources (/app/crisis-resources)
│   │
│   └─→ 💳 BILLING
│       └── Billing (/app/billing)
```

### 4.3 Detailed Feature Pages

#### **AI Avatar Sessions** (3 Pages)

| Page | Route | Purpose | Navigation |
|------|-------|---------|------------|
| **Session Lobby** | `/app/session-lobby` | Pre-session prep | → Start Session → Active Session<br>← Dashboard |
| **Active Session** | `/app/active-session` | Live video conversation | → End Session → Session History<br>🆘 Crisis → Crisis Resources |
| **Session History** | `/app/session-history` | Past sessions review | → View Transcript<br>← Dashboard |

**Session Flow:**
```
Dashboard → Session Lobby → Active Session → Session History → Dashboard
                                    │
                                    └─→ [Crisis Detected] → Crisis Resources
```

#### **Mood Tracking** (2 Pages)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Mood Check-In** | `/app/mood-checkin` | Log current mood | Emoji selector, notes, factors, intensity |
| **Mood History** | `/app/mood-history` | View mood trends | Charts, calendar view, patterns, insights |

**Navigation:**
```
Dashboard → Mood Check-In → Submit → Mood History
Mood History ← → Dashboard
```

#### **Journaling** (1 Page)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Journal** | `/app/journal` | Write & view entries | Rich text editor, prompts, entry list, search |

**Navigation:**
```
Dashboard ↔ Journal
Session History → "Create Journal Entry" → Journal
```

#### **Wellness Tools** (2 Pages)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Wellness Tools** | `/app/wellness-tools` | Interactive exercises | Breathing, meditation, grounding, CBT tools |
| **Resources** | `/app/resources` | Educational content | Articles, videos, guides, podcasts |

**Navigation:**
```
Dashboard → Wellness Tools → [Tool] → Complete → Dashboard
Dashboard → Resources → [Article] → Read → Back
```

#### **Progress & Growth** (2 Pages)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Progress** | `/app/progress` | Track improvement | Charts, milestones, session count, mood trends |
| **Achievements** | `/app/achievements` | Gamification | Badges, streaks, challenges, rewards |

**Navigation:**
```
Dashboard ↔ Progress
Dashboard ↔ Achievements
Progress ↔ Achievements (linked)
```

#### **Settings** (1 Page)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Settings Hub** | `/app/settings` | User preferences | Profile, avatar change, notifications, privacy, security |

**Navigation:**
```
Dashboard → Settings → Update → Dashboard
Any Page → [User Menu] → Settings
```

**Settings Sections:**
- Profile Information
- AI Avatar Selection (change avatar)
- Notifications Preferences
- Privacy & Data
- Security (password, 2FA)
- Emergency Contacts
- Subscription & Billing
- Help & Support
- Logout

#### **Crisis Support** (1 Page)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Crisis Resources** | `/app/crisis-resources` | Emergency help | Hotlines, emergency contacts, safety plan, immediate resources |

**Access Points:**
```
1. Active Session (crisis detection) → Auto-redirect
2. Dashboard → "Need Help Now?" button
3. Any page → Global emergency button (always visible)
4. Settings → Safety section
```

#### **Billing** (1 Page)

| Page | Route | Purpose | Features |
|------|-------|---------|----------|
| **Billing** | `/app/billing` | Manage subscription | Current plan, usage, payment method, invoices, upgrade/downgrade |

**Navigation:**
```
Dashboard → Billing
Settings → Billing section → Billing
```

### 4.4 Global Navigation (Available Everywhere in User App)

**Top Navigation Bar:**
- Logo → Dashboard
- Search (if applicable)
- Notifications icon
- User menu → Settings, Profile, Logout

**Bottom Navigation (Mobile):**
- Dashboard
- Sessions
- Mood
- Journal
- More (overflow menu)

**Emergency Access:**
- Crisis button (always visible)
- Settings link
- Help/Support

---

## ⚠️ **5. ERROR PAGES** (7 States)

| Page | Route | When Shown | Recovery Options |
|------|-------|------------|------------------|
| **404 Not Found** | `/error/404` | Invalid URL | → Go to Dashboard<br>→ Back to Home |
| **500 Server Error** | `/error/500` | Server issues | → Refresh<br>→ Contact Support |
| **Offline** | `/error/offline` | No internet | → Retry<br>Auto-retry on connection |
| **Maintenance** | `/error/maintenance` | Scheduled downtime | → Check Status<br>Retry later |
| **Permission Denied** | `/error/permission-denied` | Unauthorized access | → Go to Dashboard<br>→ Login |
| **Trial Expired** | `/error/trial-expired` | Subscription ended | → Upgrade Plan<br>→ Billing |
| **No Device Access** | `/error/no-device-access` | Camera/mic denied | → Grant Permission<br>→ Help Guide |

**Auto-Redirect Logic:**
```
- Session timeout → Login
- Invalid admin access → Permission Denied
- Network issue → Offline
- Payment failed → Trial Expired
```

---

## 👨‍💼 **6. ADMIN PORTAL** (69 Pages + 3 Auth Pages)

### 6.1 Admin Authentication

| Page | Route | Purpose | Navigation |
|------|-------|---------|------------|
| **Admin Login** | `/admin/login` | Admin authentication | ✓ Success → Super/Org/Team Dashboard |
| **Two-Factor Auth** | `/admin/two-factor` | 2FA verification | ✓ Success → Dashboard |
| **Admin Credentials** | `/admin/credentials` | Credential management | ← Admin Dashboard |

**Admin Flow:**
```
/admin/login → Enter credentials → /admin/two-factor → Enter code → Role-based Dashboard
                                                                           │
                                                                           ├─→ Super Admin Dashboard
                                                                           ├─→ Org Admin Dashboard
                                                                           └─→ Team Admin Dashboard
```

### 6.2 Admin Dashboard Structure

```
🏢 ADMIN PORTAL
│
├── 📊 DASHBOARDS (4)
│   ├── Super Admin Dashboard (/admin/super-admin-dashboard) [Super only]
│   ├── Org Admin Dashboard (/admin/org-admin-dashboard) [Org only]
│   ├── Team Admin Dashboard (/admin/team-admin-dashboard) [Team only]
│   └── Admin Dashboard (/admin/dashboard) [All roles]
│
├── 👥 USER MANAGEMENT (5)
│   ├── All Users (/admin/user-management)
│   ├── User Details (/admin/user-details-enhanced)
│   ├── User Segmentation (/admin/user-segmentation)
│   ├── Team Management (/admin/team-role-management)
│   └── Therapist Management (/admin/therapist-management)
│
├── 🤖 AI AVATAR SYSTEM (2)
│   ├── AI Avatar Manager (/admin/ai-avatar-manager)
│   └── Conversation Transcripts (/admin/conversation-transcripts)
│
├── 🚨 CRISIS MANAGEMENT (5)
│   ├── Crisis Dashboard (/admin/crisis-dashboard)
│   ├── Crisis Monitoring (/admin/crisis-monitoring)
│   ├── Crisis Events (/admin/crisis-event-details)
│   ├── Follow-Up Queue (/admin/crisis-follow-up-queue)
│   └── Crisis Protocol (/admin/crisis-protocol)
│
├── 📈 ANALYTICS (9)
│   ├── Platform Analytics (/admin/analytics)
│   ├── Usage Overview (/admin/usage-overview)
│   ├── Usage Analytics (/admin/usage-analytics)
│   ├── Session Analytics (/admin/session-analytics)
│   ├── Engagement Metrics (/admin/engagement-metrics)
│   ├── Retention Metrics (/admin/retention-metrics)
│   ├── Feature Adoption (/admin/feature-adoption)
│   ├── Onboarding Analytics (/admin/onboarding-analytics)
│   └── Reports & Analytics (/admin/reports-analytics)
│
├── 📝 CONTENT (8)
│   ├── Content Management (/admin/content-management)
│   ├── Wellness Tools CMS (/admin/wellness-tools-cms)
│   ├── Wellness Content CMS (/admin/wellness-content-cms)
│   ├── Content Library (/admin/wellness-content-library)
│   ├── Tool Editor (/admin/wellness-tool-editor)
│   ├── Exercise Library (/admin/exercise-library)
│   ├── Content Performance (/admin/content-performance)
│   └── Content Moderation (/admin/content-moderation)
│
├── ⚡ ENGAGEMENT (6)
│   ├── Nudge Management (/admin/nudge-management)
│   ├── Nudge Templates (/admin/nudge-templates)
│   ├── Nudge Scheduler (/admin/nudge-scheduler)
│   ├── Nudge Performance (/admin/nudge-performance)
│   ├── Wellness Challenges (/admin/wellness-challenges)
│   └── Badge Manager (/admin/badge-manager)
│
├── 🔔 COMMUNICATIONS (6)
│   ├── Notifications Center (/admin/notifications-center)
│   ├── Manual Notifications (/admin/manual-notifications)
│   ├── Email Templates (/admin/email-templates)
│   ├── Push Notifications (/admin/push-notifications)
│   ├── Support Tickets (/admin/support-tickets)
│   └── Community Management (/admin/community-management)
│
├── 👁️ MONITORING (6)
│   ├── Live Sessions (/admin/live-sessions-monitor)
│   ├── Session Recordings (/admin/session-recordings)
│   ├── Activity Monitor (/admin/activity-monitor)
│   ├── System Health (/admin/system-health-enhanced)
│   ├── System Health Dashboard (/admin/system-health-dashboard)
│   └── Error Tracking (/admin/error-tracking)
│
├── ⚙️ SYSTEM (8)
│   ├── System Settings (/admin/system-settings-enhanced)
│   ├── Global Configuration (/admin/global-configuration)
│   ├── Feature Flags (/admin/feature-flags)
│   ├── API Management (/admin/api-management)
│   ├── Integration Settings (/admin/integration-settings)
│   ├── Branding & Customization (/admin/branding-customization)
│   ├── A/B Testing (/admin/ab-testing)
│   └── Enterprise Features (/admin/enterprise-features)
│
├── 💰 BILLING (4)
│   ├── Billing Overview (/admin/billing)
│   ├── Subscriptions (/admin/billing-subscriptions)
│   ├── Package Manager (/admin/package-manager)
│   └── PAYG Transactions (/admin/payg-transactions)
│
├── 🔒 SECURITY & COMPLIANCE (8)
│   ├── Security Settings (/admin/security-settings)
│   ├── Compliance Dashboard (/admin/compliance-dashboard)
│   ├── HIPAA Compliance (/admin/hipaa-compliance)
│   ├── Data Privacy (/admin/data-privacy-controls)
│   ├── Data Retention (/admin/data-retention-privacy)
│   ├── Audit Logs (/admin/audit-logs)
│   ├── System Logs (/admin/system-logs)
│   └── Legal Documentation (/admin/legal-documentation)
│
└── 💾 DATA (2)
    ├── Data Export (/admin/data-export)
    └── Backup & Recovery (/admin/backup-recovery)
```

### 6.3 Admin Role-Based Access

| Section | Super Admin | Org Admin | Team Admin |
|---------|-------------|-----------|------------|
| **Dashboards** | All 4 | Org + General | Team + General |
| **User Management** | All 5 | All except Team Mgmt | Users, Details only |
| **AI Avatar System** | Both | Both | Transcripts only |
| **Crisis Management** | All 5 | All 5 | All 5 |
| **Analytics** | All 9 | 7 (no Platform) | 3 (Session, Reports only) |
| **Content** | All 8 | All 8 | None |
| **Engagement** | All 6 | All 6 | None |
| **Communications** | All 6 | Most (no Community) | Notifications, Tickets |
| **Monitoring** | All 6 | 4 (no System Health) | Live Sessions only |
| **System** | All 8 | 3 (Integration, Branding, A/B) | None |
| **Billing** | All 4 | All 4 | None |
| **Security & Compliance** | All 8 | 4 (Compliance, Audit, Legal) | None |
| **Data** | Both | None | None |

### 6.4 Admin Navigation System

**Sidebar (Left):**
- Collapsible sections
- Role-filtered menu
- Active page highlighting
- Section state persistence

**Header (Top):**
- "Admin Portal" title
- **"View User App →"** link → `/app/dashboard`
- Admin profile menu

**Footer (Sidebar Bottom):**
- Admin info card
- **"Exit to User App"** button → `/` (landing)
- **"Logout"** button → `/admin/login`

**Navigation Pattern:**
```
Any Admin Page:
├─→ Click sidebar item → Navigate to page
├─→ "View User App →" → /app/dashboard
├─→ "Exit to User App" → / (landing)
└─→ "Logout" → /admin/login

User App:
└─→ Direct URL /admin/* → Admin Login (if not authenticated)
```

---

## 🎭 **7. DEMO PAGES** (1 Page)

| Page | Route | Purpose |
|------|-------|---------|
| **Phase 1 Demo** | `/demo/phase1` | Demo showcase |

---

## 🔗 **8. COMPLETE ROUTE MAP** (All 142+ Pages)

### Public Routes (5)
```
/                           → Landing
/how-it-works              → How It Works
/privacy                   → Privacy Policy
/terms                     → Terms of Service
/accessibility             → Accessibility
```

### Auth Routes (3)
```
/login                     → Login
/signup                    → Signup
/forgot-password           → Forgot Password
```

### Onboarding Routes (9)
```
/onboarding/welcome                → Step 1: Welcome
/onboarding/profile                → Step 2: Profile Setup
/onboarding/wellness-baseline      → Step 3: Wellness Baseline
/onboarding/health-background      → Step 4: Health Background
/onboarding/avatar-preferences     → Step 5: Avatar Preferences
/onboarding/safety-consent         → Step 6: Safety Consent
/onboarding/emergency-contact      → Step 7: Emergency Contact
/onboarding/permissions            → Step 8: Permissions
/onboarding/complete               → Step 9: Complete
```

### User App Routes (17)
```
/app/dashboard             → Dashboard (Main Hub)
/app/session-lobby         → Session Lobby
/app/active-session        → Active Session
/app/session-history       → Session History
/app/mood-checkin          → Mood Check-In
/app/mood-history          → Mood History
/app/journal               → Journal
/app/wellness-tools        → Wellness Tools
/app/resources             → Resources
/app/progress              → Progress
/app/achievements          → Achievements
/app/settings              → Settings Hub
/app/crisis-resources      → Crisis Resources
/app/billing               → Billing
```

### Error Routes (7)
```
/error/404                 → 404 Not Found
/error/500                 → 500 Server Error
/error/offline             → Offline
/error/maintenance         → Maintenance
/error/permission-denied   → Permission Denied
/error/trial-expired       → Trial Expired
/error/no-device-access    → No Device Access
```

### Admin Auth Routes (3)
```
/admin/login               → Admin Login
/admin/two-factor          → Two-Factor Auth
/admin/credentials         → Admin Credentials
```

### Admin Dashboard Routes (4)
```
/admin/super-admin-dashboard  → Super Admin Dashboard
/admin/org-admin-dashboard    → Org Admin Dashboard
/admin/team-admin-dashboard   → Team Admin Dashboard
/admin/dashboard              → Admin Dashboard
```

### Admin Routes (65)
```
# User Management (5)
/admin/user-management
/admin/user-details-enhanced
/admin/user-segmentation
/admin/team-role-management
/admin/therapist-management

# AI Avatar System (2)
/admin/ai-avatar-manager
/admin/conversation-transcripts

# Crisis Management (5)
/admin/crisis-dashboard
/admin/crisis-monitoring
/admin/crisis-event-details
/admin/crisis-follow-up-queue
/admin/crisis-protocol

# Analytics (9)
/admin/analytics
/admin/usage-overview
/admin/usage-analytics
/admin/session-analytics
/admin/engagement-metrics
/admin/retention-metrics
/admin/feature-adoption
/admin/onboarding-analytics
/admin/reports-analytics

# Content (8)
/admin/content-management
/admin/wellness-tools-cms
/admin/wellness-content-cms
/admin/wellness-content-library
/admin/wellness-tool-editor
/admin/exercise-library
/admin/content-performance
/admin/content-moderation

# Engagement (6)
/admin/nudge-management
/admin/nudge-templates
/admin/nudge-scheduler
/admin/nudge-performance
/admin/wellness-challenges
/admin/badge-manager

# Communications (6)
/admin/notifications-center
/admin/manual-notifications
/admin/email-templates
/admin/push-notifications
/admin/support-tickets
/admin/community-management

# Monitoring (6)
/admin/live-sessions-monitor
/admin/session-recordings
/admin/activity-monitor
/admin/system-health-enhanced
/admin/system-health-dashboard
/admin/error-tracking

# System (8)
/admin/system-settings-enhanced
/admin/global-configuration
/admin/feature-flags
/admin/api-management
/admin/integration-settings
/admin/branding-customization
/admin/ab-testing
/admin/enterprise-features

# Billing (4)
/admin/billing
/admin/billing-subscriptions
/admin/package-manager
/admin/payg-transactions

# Security & Compliance (8)
/admin/security-settings
/admin/compliance-dashboard
/admin/hipaa-compliance
/admin/data-privacy-controls
/admin/data-retention-privacy
/admin/audit-logs
/admin/system-logs
/admin/legal-documentation

# Data (2)
/admin/data-export
/admin/backup-recovery
```

### Demo Route (1)
```
/demo/phase1               → Phase 1 Demo
```

---

## 🔄 **9. CROSS-NAVIGATION PATTERNS**

### From Landing to App
```
Landing (/)
  → Signup → Onboarding (9 steps) → App Dashboard → Full App Access
  → Login → App Dashboard → Full App Access
```

### Within User App
```
All pages accessible from Dashboard via:
  ├─→ Direct navigation cards
  ├─→ Top navigation menu
  ├─→ Bottom navigation (mobile)
  └─→ Settings menu
```

### User App ↔ Admin Portal
```
User App → Direct URL /admin/* → Admin Login → Admin Dashboard

Admin Portal:
  ├─→ "View User App →" (header) → /app/dashboard
  ├─→ "Exit to User App" (sidebar) → / (landing)
  └─→ "Logout" → /admin/login
```

### Emergency Access (Crisis)
```
Any User App Page → Crisis Button → /app/crisis-resources
Active Session (crisis detected) → Auto-redirect → /app/crisis-resources
```

### Error Handling
```
Invalid URL → /error/404
Network Error → /error/offline
Auth Error → /error/permission-denied → Login
Payment Error → /error/trial-expired → Billing
```

---

## 📱 **10. RESPONSIVE NAVIGATION**

### Desktop Navigation
- **Top Navigation Bar:** Logo, Search, Notifications, User Menu
- **Sidebar (Admin):** Collapsible sections, persistent
- **Quick Actions:** Floating buttons, keyboard shortcuts

### Mobile Navigation
- **Bottom Tab Bar:** 5 main sections
  - Dashboard
  - Sessions
  - Mood
  - Journal
  - More
- **Hamburger Menu:** Full navigation
- **Swipe Gestures:** Back/forward navigation

---

## 🔐 **11. AUTHENTICATION STATES & REDIRECTS**

### Unauthenticated User
```
Access /app/* → Redirect to /login
Access /admin/* → Redirect to /admin/login
```

### Authenticated User
```
Access / → Can stay or go to /app/dashboard
Access /login → Redirect to /app/dashboard (already logged in)
Access /admin/* → Redirect to /admin/login (separate auth)
```

### Authenticated Admin
```
Access /admin/* → Access granted (role-based filtering)
Access /app/* → Access granted
Access / → Access granted
```

### Session Expiry
```
User App session expires → Redirect to /login
Admin session expires → Redirect to /admin/login
```

---

## 💾 **12. DATA PERSISTENCE**

### localStorage Keys
```javascript
// User App
'isAuthenticated': boolean
'userName': string
'userEmail': string
'selectedAvatar': string
'onboardingComplete': boolean
'moodEntries': array
'journalEntries': array
'sessionHistory': array

// Admin
'adminRole': 'super' | 'org' | 'team'
'adminEmail': string
'adminExpandedSection': string (sidebar state)
```

### Session Management
- **Auto-save:** Form data saved to localStorage
- **Session timeout:** 30 minutes inactive
- **Remember me:** Optional for login

---

## 🎨 **13. LAYOUT COMPONENTS**

### Public Pages
- **No persistent navigation**
- Header with logo + CTA
- Footer with links

### User App
- **AppLayout Component** (wrapper)
  - Top navigation
  - Bottom navigation (mobile)
  - Side panel (optional)
  - Global crisis button
  - Notification center

### Admin Portal
- **AdminLayoutNew Component** (wrapper)
  - Left sidebar (collapsible sections)
  - Top header
  - Main content area
  - Footer in sidebar

---

## 🚀 **14. TYPICAL USER JOURNEYS**

### New User Journey
```
1. Landing → Sign Up
2. Signup → Onboarding (9 steps)
3. Onboarding Complete → Dashboard
4. Dashboard → Choose Avatar → Session Lobby
5. Session Lobby → Start Session → Active Session
6. Active Session → End → Session History
7. Dashboard → Mood Check-In
8. Dashboard → Journal Entry
9. Dashboard → Explore Wellness Tools
10. Settings → Update Profile/Preferences
```

### Returning User Journey
```
1. Landing → Login → Dashboard
2. Dashboard → Quick Mood Check
3. Dashboard → Start Session → Active Session
4. Active Session → Conversation → End
5. Dashboard → View Progress
6. Dashboard → Check Achievements
7. Repeat sessions/mood tracking
```

### Admin Journey
```
1. /admin/login → Enter credentials → 2FA
2. Role-based Dashboard (Super/Org/Team)
3. Navigate sections via sidebar
4. Monitor users, sessions, crisis events
5. Review analytics & reports
6. Manage content & settings
7. "View User App" to test user experience
8. Logout
```

### Crisis Scenario
```
User in Active Session
  → AI detects crisis keywords
  → Alert shown
  → Options: 
      ├─→ "I'm okay" → Continue session
      └─→ "I need help" → Crisis Resources page
           → Hotlines displayed
           → Emergency contacts
           → Safety plan
           → Option to notify emergency contact
```

---

## 📊 **15. PAGE COUNT SUMMARY**

| Section | Count |
|---------|-------|
| Public Pages | 5 |
| Auth Pages | 3 |
| Onboarding Pages | 9 |
| User App Pages | 17 |
| Error Pages | 7 |
| Admin Auth | 3 |
| Admin Dashboards | 4 |
| Admin Feature Pages | 65 |
| Demo Pages | 1 |
| **TOTAL** | **114+** |

*Note: Some pages have dynamic states/modals that function as sub-pages*

---

## 🔗 **16. KEY NAVIGATION LINKS SUMMARY**

### User-Facing Links
```
Landing → Signup → Onboarding → App Dashboard
Landing → Login → App Dashboard
Dashboard ↔ All User App Features
Any Page → Crisis Resources (emergency)
Any Page → Settings
Settings → Billing
Settings → Change Avatar
```

### Admin Links
```
Admin Login → Role Dashboard
Any Admin Page → View User App (/app/dashboard)
Any Admin Page → Exit to User App (/)
Any Admin Page → Logout
Sidebar Sections → All 69 Admin Pages
```

### External/Special Links
```
Footer → Privacy Policy
Footer → Terms of Service
Footer → Accessibility Statement
Crisis Resources → External Hotlines
Support → Help Center (external)
```

---

## ✅ **NAVIGATION VERIFICATION CHECKLIST**

- ✅ Landing page accessible from all sections
- ✅ Auth flow properly redirects to app
- ✅ Onboarding is sequential and complete
- ✅ Dashboard is central hub for all user features
- ✅ Crisis resources accessible from anywhere
- ✅ Settings accessible from user menu
- ✅ Admin portal completely separate auth
- ✅ Admin can view user app without logging out
- ✅ Error pages handle all edge cases
- ✅ Mobile navigation works on all pages
- ✅ All 142+ pages have valid routes
- ✅ No broken links or orphaned pages

---

## 🎯 **QUICK REFERENCE: MOST IMPORTANT ROUTES**

```javascript
// USER SIDE
'/': Landing (start here)
'/login': User login
'/signup': User registration
'/onboarding/welcome': Start onboarding
'/app/dashboard': Main user hub (most important!)
'/app/active-session': AI conversation
'/app/crisis-resources': Emergency help

// ADMIN SIDE
'/admin/login': Admin login
'/admin/super-admin-dashboard': Super admin hub
'/admin/user-management': View all users
'/admin/crisis-monitoring': Monitor crisis events
'/admin/analytics': Platform analytics

// TESTING
'/demo/phase1': Demo showcase
```

---

## 📝 **FINAL NOTES**

### Application Flow Summary
1. **Entry:** Landing page introduces Ezri
2. **Authentication:** Secure signup/login
3. **Onboarding:** Collect user data & preferences (9 steps)
4. **Main App:** Dashboard-centric navigation to 17 features
5. **AI Sessions:** Core feature with video avatars
6. **Wellness Tracking:** Mood, journal, progress
7. **Crisis Support:** Always accessible emergency resources
8. **Admin:** Separate portal for management (69 pages)

### Navigation Philosophy
- **User App:** Dashboard as central hub
- **Admin App:** Sidebar as primary navigation
- **Emergency:** Crisis resources always one click away
- **Simplicity:** Clear paths, minimal clicks
- **Accessibility:** Keyboard navigation, screen reader support

### Technical Implementation
- **Router:** React Router v6
- **Layouts:** Wrapper components for sections
- **State:** localStorage for persistence
- **Auth:** Separate user & admin sessions
- **Responsive:** Mobile-first design

---

**This structure represents the complete Ezri application architecture with all navigation paths, page relationships, and user flows. Use this as your reference guide for understanding how the entire system connects together!** 🎉
