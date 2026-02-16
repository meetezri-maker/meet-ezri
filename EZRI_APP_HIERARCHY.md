  │   └── ... (more UI primitives)
│   │   │
│   │   ├── AdminLayout.tsx (Admin sidebar + header)
│   │   ├── AdminLayoutNew.tsx (Enhanced admin layout)
│   │   ├── UserLayout.tsx (User app wrapper)
│   │   └── figma/
│   │       └── ImageWithFallback.tsx
│   │
│   └── pages/
│       ├── auth/
│       │   ├── Login.tsx
│       │   └── Signup.tsx
│       │
│       ├── user/ (User-facing pages)
│       │   ├── Dashboard.tsx
│       │   ├── onboarding/
│       │   ├── mood-tracking/
│       │   ├── journal/
│       │   ├── wellness/
│       │   ├── ai-companion/
│       │   └── settings/
│       │
│       └── admin/ (Admin pages)
│           ├── Dashboard.tsx
│           ├── UserManagement.tsx
│           ├── CrisisManagement.tsx
│           ├── AIAvatarManager.tsx
│           ├── ConversationTranscripts.tsx
│           ├── EngagementCampaigns.tsx
│           ├── PushNotifications.tsx
│           ├── EmailManagement.tsx
│           ├── InAppMessaging.tsx
│           ├── CommunityManagement.tsx
│           ├── Billing.tsx
│           ├── BillingSubscriptions.tsx
│           ├── SecuritySettings.tsx
│           ├── ComplianceDashboard.tsx
│           ├── HIPAACompliance.tsx
│           ├── DataPrivacyControls.tsx
│           ├── AuditLogs.tsx
│           ├── SystemLogs.tsx
│           ├── BrandingCustomization.tsx
│           ├── UsageOverview.tsx
│           ├── RetentionMetrics.tsx
│           └── ... (more admin pages)
│
├── styles/
│   ├── index.css (Global styles)
│   ├── theme.css (Tailwind theme tokens)
│   └── fonts.css (Font imports)
│
└── imports/ (Figma imported assets)
    ├── SVG files
    └── Image assets
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION FLOW

```
┌─────────────────────────────────────────────────────────────┐
│                  AUTHENTICATION FLOW                        │
└─────────────────────────────────────────────────────────────┘

1. User visits app (/)
        ↓
2. Check localStorage for auth token
        ↓
   ┌────┴────┐
   NO        YES
   ↓          ↓
3. Show      Load user
   Login     data from
   Page      localStorage
   ↓          ↓
4. User      Check role
   enters    ↓
   credentials  ┌──────┴──────┐
   ↓            USER          ADMIN
5. Demo Auth   ↓              ↓
   validates   Redirect to    Redirect to
   ↓           /dashboard     /admin/dashboard
6. Store to
   localStorage:
   - authToken
   - userRole
   - userId
   - userData
        ↓
7. Route to appropriate dashboard
```

### **Role-Based Access**

```
USER ROLE:
  ✅ Access to: /dashboard, /mood-tracking, /journal, /wellness, etc.
  ❌ Blocked from: /admin/*

ADMIN ROLE (org):
  ✅ Access to: Most /admin/* pages
  ❌ Blocked from: Super admin pages

SUPER ADMIN ROLE:
  ✅ Access to: ALL pages including compliance, security
```

---

## 🎯 KEY USER FLOWS

### **Flow 1: New User Onboarding**

```
1. User signs up → /signup
        ↓
2. Account created → localStorage stored
        ↓
3. Redirect to /onboarding/welcome
        ↓
4. Welcome screen → Click "Get Started"
        ↓
5. /onboarding/goals → Select mental health goals
        ↓
6. /onboarding/avatar-selection → Choose AI avatar (3-4 options)
        ↓
7. /onboarding/preferences → Set notifications, privacy
        ↓
8. /onboarding/complete → Completion screen
        ↓
9. Redirect to /dashboard → First-time user experience
```

### **Flow 2: AI Companion Interaction**

```
1. User clicks "Talk to AI" on dashboard
        ↓
2. Navigate to /ai-companion/chat
        ↓
3. Video-only interface loads
        ↓
4. User speaks → Voice recognition
        ↓
5. AI avatar responds with video + voice
        ↓
6. Real-time conversation (NO text chat)
        ↓
7. Session saved to history
        ↓
8. Can view past sessions at /ai-companion/history
```

### **Flow 3: Mood Tracking**

```
1. User navigates to /mood-tracking
        ↓
2. Dashboard shows:
   - Current mood streak
   - Weekly mood chart
   - Mood patterns
        ↓
3. Click "Log Mood" → /mood-tracking/log
        ↓
4. Select mood (😊 😐 😔 😢 😡)
        ↓
5. Add notes (optional)
        ↓
6. Add triggers (optional)
        ↓
7. Save to localStorage
        ↓
8. View insights at /mood-tracking/insights
```

### **Flow 4: Admin Crisis Management**

```
1. AI detects crisis keywords in conversation
        ↓
2. Alert created in system
        ↓
3. Admin sees notification badge
        ↓
4. Navigate to /admin/crisis-management
        ↓
5. Active Alerts tab shows:
   - User info
   - Severity level
   - AI conversation excerpt
        ↓
6. Admin clicks "Review"
        ↓
7. View full details modal
        ↓
8. Actions available:
   - Contact user
   - Escalate to emergency services
   - Mark as resolved
   - Add notes
        ↓
9. Status updated & logged in audit logs
```

### **Flow 5: Admin Manages Subscriptions**

```
1. Admin navigates to /admin/billing-subscriptions
        ↓
2. Overview tab shows revenue metrics
        ↓
3. Switch to Subscriptions tab
        ↓
4. Search/filter organizations
        ↓
5. Click "Manage" on a subscription
        ↓
6. Manage Subscription Modal opens:
   - View current plan
   - Change plan (dropdown)
   - Update user count
   - View billing info
        ↓
7. Click "Update Subscription"
        ↓
8. Data saved to localStorage
        ↓
9. Success confirmation
        ↓
10. Table updates with new info
```

---

## 💾 DATA PERSISTENCE (localStorage)

### **Storage Structure**

```javascript
localStorage Items:

// Authentication
{
  "authToken": "demo-token-xxx",
  "userRole": "user" | "admin" | "super",
  "userId": "user-123",
  "userEmail": "user@example.com"
}

// User Data
{
  "userData": {
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "avatar-2",
    "onboardingComplete": true,
    "preferences": {...}
  }
}

// Mood Tracking
{
  "moodEntries": [
    {
      "id": "mood-1",
      "date": "2024-01-30",
      "mood": "happy",
      "notes": "Great day!",
      "triggers": ["exercise", "sleep"]
    }
  ]
}

// Journal Entries
{
  "journalEntries": [
    {
      "id": "journal-1",
      "date": "2024-01-30",
      "title": "My thoughts",
      "content": "Today was...",
      "mood": "calm"
    }
  ]
}

// AI Conversation History
{
  "conversationHistory": [
    {
      "id": "conv-1",
      "date": "2024-01-30",
      "duration": "15:32",
      "avatar": "avatar-2",
      "summary": "Discussed anxiety management"
    }
  ]
}

// Admin Data
{
  "adminUsers": [...],
  "crisisAlerts": [...],
  "subscriptions": [...],
  "transactions": [...]
}
```

---

## 🎨 DESIGN SYSTEM

### **Color Palette**

```
Primary:    Blue (#3B82F6)
Secondary:  Purple (#8B5CF6)
Success:    Green (#10B981)
Warning:    Yellow (#F59E0B)
Error:      Red (#EF4444)
Neutral:    Gray (#6B7280)

Background: White (#FFFFFF)
Surface:    Gray-50 (#F9FAFB)
Border:     Gray-200 (#E5E7EB)
```

### **Typography**

```
Headings:   font-bold (based on theme.css)
Body:       Default (from theme.css)
Code:       font-mono
```

### **Components**

- **Cards**: Rounded corners, shadow, white bg
- **Buttons**: Primary (blue), Secondary (outline), Ghost
- **Tables**: Striped rows, hover states
- **Modals**: Centered, backdrop blur, animations
- **Badges**: Rounded pills with color variants
- **Tabs**: Underline active state

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:     < 640px
Tablet:     640px - 1024px
Desktop:    > 1024px

Admin sidebar:
  - Mobile: Collapsible drawer
  - Desktop: Fixed sidebar
```

---

## 🔄 STATE MANAGEMENT PATTERN

```javascript
// Most components follow this pattern:

export function ComponentName() {
  // State declarations
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [showModal, setShowModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("key");
    if (stored) setData(JSON.parse(stored));
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(data));
  }, [data]);

  // Event handlers
  const handleAction = () => {
    // Update state
    // Save to localStorage
    // Show feedback
  };

  return (/* JSX */);
}
```

---

## ✅ COMPLETED FIXES

### **Recently Fixed Pages:**

✅ Engagement & Billing sections (all pages)
✅ Security Settings page
✅ Compliance Dashboard
✅ HIPAA Compliance page
✅ Data Privacy Controls page
✅ User app navigation routing
✅ Usage Overview page (text visibility)
✅ Retention Metrics page (text visibility)
✅ Community Management page (Groups tab)
✅ Branding & Customization page (logo/favicon upload)
✅ Billing & Subscriptions page (Manage/Download modals)
✅ **Audit Logs page (Export, Next, Previous buttons)**

---

## 🎯 APPLICATION SUMMARY

**Total Screens**: 142+
**User Pages**: ~40-50 screens
**Admin Pages**: ~90-100 screens
**Authentication**: Demo mode with localStorage
**AI Integration**: Voice-only avatar conversations
**Core Features**: Mood tracking, journaling, wellness tools
**Admin Capabilities**: Full dashboard with analytics, user management, crisis response

---

## 📊 PAGE COUNT BREAKDOWN

```
AUTHENTICATION:           2 pages
ONBOARDING:              5 pages
USER DASHBOARD:          40+ pages
  ├── Home & Profile:    5
  ├── AI Companion:      4
  ├── Mood Tracking:     5
  ├── Journal:           5
  ├── Wellness:          6
  ├── Goals:             5
  ├── Progress:          5
  ├── Crisis Support:    2
  ├── Community:         4
  └── Settings:          6

ADMIN DASHBOARD:         100+ pages
  ├── Overview:          2
  ├── User Management:   5
  ├── AI/Content:        3
  ├── Crisis:            2
  ├── Analytics:         5
  ├── Engagement:        6
  ├── Billing:           2
  ├── Security:          8
  ├── System:            3
  └── Support:           2

TOTAL:                   142+ pages
```

---

This is the complete hierarchy and flow of your Ezri mental health application! 🎉
