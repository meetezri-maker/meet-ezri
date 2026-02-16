# 👥 EZRI - Complete User Roles & Permissions

**Total Roles**: 8 (2 Primary + 6 Team Roles)  
**Role Types**: User Roles + Admin Roles + Team Roles

---

## 📊 **ROLE HIERARCHY OVERVIEW**

```
┌─────────────────────────────────────────────────────┐
│                   EZRI ROLES                         │
└─────────────────────────────────────────────────────┘

PRIMARY ROLES (2):
├── 👤 USER (Regular End User)
└── 👨‍💼 ADMIN (Administrative Staff)

ADMIN SUB-ROLES (3):
├── 👑 SUPER ADMIN (Platform Owner)
├── 🏢 ORGANIZATION ADMIN (Organization Manager)
└── 👥 TEAM ADMIN (Team Lead)

TEAM/SPECIALIST ROLES (6):
├── 🚨 CRISIS SPECIALIST
├── 👨‍⚕️ SENIOR THERAPIST
├── 👨‍⚕️ THERAPIST
├── 📝 CONTENT MANAGER
├── 🔧 SYSTEM ADMIN
└── 🆘 SUPPORT SPECIALIST
```

---

## 🎯 **TOTAL ROLES: 8**

### **PRIMARY ROLES (2)**

1. **User** (Regular user)
2. **Admin** (Administrative access)

### **ADMIN SUB-TYPES (3)**

3. **Super Admin** (Platform owner)
4. **Organization Admin** (Organization manager)
5. **Team Admin** (Team lead)

### **TEAM/SPECIALIST ROLES (6)**

6. **Crisis Specialist** (Emergency response)
7. **Senior Therapist** (Advanced therapy)
8. **Therapist** (Standard therapy)
9. **Content Manager** (Content moderation)
10. **System Admin** (IT/Technical)
11. **Support Specialist** (Customer support)

---

## 📋 **ROLE DETAILS**

---

## 1️⃣ **USER (Regular End User)**

### **Access Level**: Basic
### **Total Users**: Unlimited
### **Primary Purpose**: Mental health & wellness app users

### **Permissions**:
- ✅ Access all user app features (`/app/*`)
- ✅ Start AI therapy sessions
- ✅ Track mood & journal entries
- ✅ Set goals & habits
- ✅ Access wellness resources
- ✅ Manage subscription & billing
- ✅ Update personal profile & settings
- ✅ View personal insights & analytics
- ❌ No access to admin dashboard
- ❌ No access to other users' data

### **Routes**:
```
/app/dashboard
/app/session-lobby
/app/mood-checkin
/app/journal
/app/goals
/app/habits
/app/resources
/app/settings
/app/subscription
```

### **Database Field**:
```prisma
role: String @default("user")
```

---

## 2️⃣ **ADMIN (Generic Administrative Role)**

### **Access Level**: Administrative
### **Total Admins**: Limited (Organization-dependent)
### **Primary Purpose**: Platform management & oversight

### **Sub-Types**:
1. Super Admin
2. Organization Admin
3. Team Admin

### **Common Permissions** (All Admin Types):
- ✅ Access admin dashboard (`/admin/*`)
- ✅ View platform analytics
- ✅ Monitor user activity
- ✅ View audit logs
- ✅ Generate reports
- ✅ Access system health monitoring

### **Routes**:
```
/admin/dashboard
/admin/analytics
/admin/users
/admin/system-health
/admin/audit-logs
```

---

## 3️⃣ **SUPER ADMIN** 👑

### **Access Level**: Full Platform Control
### **Total**: 1-3 (Platform owners)
### **Primary Purpose**: Complete system management

### **Demo Credentials**:
- **Username**: `superadmin`
- **Password**: `super123`
- **Dashboard**: `/admin/super-admin-dashboard`

### **Permissions** (Full Access):
- ✅ **Full system management**
- ✅ **User & role management** (All users, all roles)
- ✅ **Security & compliance settings**
- ✅ **System health monitoring**
- ✅ **Billing & subscription management**
- ✅ **Feature flags & A/B testing**
- ✅ **API management**
- ✅ **Database access**
- ✅ **All admin capabilities**
- ✅ **Create/delete other admins**
- ✅ **System configuration**
- ✅ **Deploy updates**

### **Unique Features**:
- Platform-wide settings
- Server configuration
- API key management
- Feature toggles
- Global system settings
- Revenue & financial analytics
- Legal & compliance management

### **Routes**:
```
/admin/super-admin-dashboard
/admin/system-settings
/admin/api-keys
/admin/feature-flags
/admin/compliance
/admin/revenue-analytics
/admin/security-settings
ALL OTHER ADMIN ROUTES
```

### **UI Badge**:
```
👑 Super Admin
Gradient: Purple to Pink
```

---

## 4️⃣ **ORGANIZATION ADMIN** 🏢

### **Access Level**: Organization Management
### **Total**: 5-20 (per organization)
### **Primary Purpose**: Manage organization users & settings

### **Demo Credentials**:
- **Username**: `orgadmin`
- **Password**: `org123`
- **Dashboard**: `/admin/org-admin-dashboard`

### **Permissions**:
- ✅ **Organization-wide user management**
- ✅ **Content & community moderation**
- ✅ **Team management**
- ✅ **Organization analytics**
- ✅ **Therapist management**
- ✅ **Crisis monitoring**
- ✅ **Support ticket handling**
- ✅ **Organization settings**
- ❌ **No system-wide settings**
- ❌ **No API management**
- ❌ **No billing access** (view only)

### **Unique Features**:
- Organization-scoped user management
- Team lead assignment
- Content approval workflows
- Crisis alert monitoring (org-level)
- Organization-level analytics

### **Routes**:
```
/admin/org-admin-dashboard
/admin/user-management
/admin/team-management
/admin/crisis-monitoring
/admin/content-moderation
/admin/support-tickets
/admin/org-analytics
```

### **UI Badge**:
```
🏢 Organization Admin
Gradient: Blue to Cyan
```

---

## 5️⃣ **TEAM ADMIN** 👥

### **Access Level**: Team Management
### **Total**: 10-50 (per organization)
### **Primary Purpose**: Manage team members & activities

### **Demo Credentials**:
- **Username**: `teamadmin`
- **Password**: `team123`
- **Dashboard**: `/admin/team-admin-dashboard`

### **Permissions**:
- ✅ **Team member management**
- ✅ **Team activity monitoring**
- ✅ **Team role assignments**
- ✅ **Team analytics & reports**
- ✅ **Session monitoring** (team only)
- ✅ **Team wellness challenges**
- ✅ **Team performance metrics**
- ❌ **No organization-wide access**
- ❌ **No system settings**
- ❌ **No billing access**

### **Unique Features**:
- Team-scoped user management
- Team member performance tracking
- Team-level crisis monitoring
- Team wellness initiatives
- Team training & onboarding

### **Routes**:
```
/admin/team-admin-dashboard
/admin/team-management
/admin/team-analytics
/admin/team-performance
/admin/session-monitoring (team scope)
```

### **UI Badge**:
```
👥 Team Admin
Gradient: Green to Emerald
```

---

## 6️⃣ **CRISIS SPECIALIST** 🚨

### **Access Level**: Emergency Response
### **Total**: 5-15 (per organization)
### **Primary Purpose**: Crisis intervention & emergency response

### **Permissions**:
- ✅ **Crisis access** (real-time alerts)
- ✅ **User management** (crisis-related)
- ✅ **Session override** (emergency)
- ✅ **Emergency contact** (notify trusted contacts)
- ✅ **Safety protocol execution**
- ✅ **Crisis dashboard monitoring**
- ✅ **Follow-up queue management**
- ❌ **No system settings**
- ❌ **No billing access**

### **Unique Features**:
- Real-time crisis alerts
- Emergency session takeover
- Safety protocol triggers
- Trusted contact notification
- Crisis follow-up workflows
- High-priority access

### **Routes**:
```
/admin/crisis-dashboard
/admin/crisis-monitoring
/admin/crisis-alerts
/admin/crisis-follow-up
/admin/safety-events
/admin/emergency-contacts
```

### **Team Role Data**:
```typescript
{
  role: "Crisis Specialist",
  department: "Crisis Response",
  permissions: [
    "crisis-access",
    "user-management",
    "session-override",
    "emergency-contact"
  ]
}
```

---

## 7️⃣ **SENIOR THERAPIST** 👨‍⚕️

### **Access Level**: Advanced Therapy
### **Total**: 10-30 (per organization)
### **Primary Purpose**: Advanced therapy sessions & supervision

### **Permissions**:
- ✅ **Session access** (all session types)
- ✅ **User view** (assigned users)
- ✅ **Content edit** (therapy resources)
- ✅ **Analytics view** (therapy metrics)
- ✅ **Supervise therapists**
- ✅ **Session notes & transcripts**
- ❌ **No crisis override**
- ❌ **No system settings**

### **Unique Features**:
- Advanced session tools
- Therapist supervision
- Content creation & editing
- Session quality review
- Client progress tracking

### **Routes**:
```
/admin/session-analytics
/admin/conversation-transcripts
/admin/user-details (assigned users)
/admin/content-management
/admin/therapist-supervision
```

### **Team Role Data**:
```typescript
{
  role: "Senior Therapist",
  department: "Therapy",
  permissions: [
    "session-access",
    "user-view",
    "content-edit",
    "analytics-view"
  ]
}
```

---

## 8️⃣ **THERAPIST** 👨‍⚕️

### **Access Level**: Standard Therapy
### **Total**: 20-100 (per organization)
### **Primary Purpose**: Standard therapy sessions

### **Permissions**:
- ✅ **Session access** (assigned users)
- ✅ **User view** (assigned users)
- ✅ **Session notes**
- ✅ **Progress tracking**
- ❌ **No content editing**
- ❌ **No analytics access**
- ❌ **No crisis override**
- ❌ **No system settings**

### **Unique Features**:
- Assigned client sessions
- Session note-taking
- Basic progress reports
- Resource viewing

### **Routes**:
```
/admin/session-lobby
/admin/active-session
/admin/session-history
/admin/user-details (view only)
```

### **Team Role Data**:
```typescript
{
  role: "Therapist",
  department: "Therapy",
  permissions: [
    "session-access",
    "user-view"
  ]
}
```

---

## 9️⃣ **CONTENT MANAGER** 📝

### **Access Level**: Content & Media
### **Total**: 3-10 (per organization)
### **Primary Purpose**: Content moderation & resource management

### **Permissions**:
- ✅ **Content full access** (CRUD)
- ✅ **Media upload** (images, videos)
- ✅ **Analytics view** (content performance)
- ✅ **Resource library management**
- ✅ **Content moderation**
- ✅ **Content scheduling**
- ❌ **No user management**
- ❌ **No session access**
- ❌ **No system settings**

### **Unique Features**:
- Content creation & editing
- Resource categorization
- Media library management
- Content performance analytics
- Moderation queue

### **Routes**:
```
/admin/content-management
/admin/content-moderation
/admin/content-performance
/admin/resource-library
/admin/media-upload
/admin/content-scheduling
```

### **Team Role Data**:
```typescript
{
  role: "Content Manager",
  department: "Content",
  permissions: [
    "content-full",
    "media-upload",
    "analytics-view"
  ]
}
```

---

## 🔟 **SYSTEM ADMIN** 🔧

### **Access Level**: Technical/IT
### **Total**: 2-5 (per organization)
### **Primary Purpose**: Technical administration & IT support

### **Permissions**:
- ✅ **Full system access** (technical)
- ✅ **System settings** (configuration)
- ✅ **User management** (technical)
- ✅ **Audit logs** (full access)
- ✅ **API keys** (organization-level)
- ✅ **Database access** (limited)
- ✅ **Security settings**
- ❌ **No billing access**
- ❌ **No content management**

### **Unique Features**:
- System configuration
- Technical troubleshooting
- User account management (technical)
- Audit log analysis
- Security monitoring

### **Routes**:
```
/admin/system-settings
/admin/system-health
/admin/audit-logs
/admin/security-settings
/admin/api-keys (org-level)
/admin/user-management (technical)
```

### **Team Role Data**:
```typescript
{
  role: "System Admin",
  department: "IT",
  permissions: [
    "full-access",
    "system-settings",
    "user-management",
    "audit-logs"
  ]
}
```

---

## 1️⃣1️⃣ **SUPPORT SPECIALIST** 🆘

### **Access Level**: Customer Support
### **Total**: 10-30 (per organization)
### **Primary Purpose**: User support & ticket management

### **Permissions**:
- ✅ **Support access** (ticket system)
- ✅ **User view** (support context)
- ✅ **Ticket management** (CRUD)
- ✅ **FAQ management**
- ✅ **Basic user assistance**
- ❌ **No session access**
- ❌ **No content editing**
- ❌ **No analytics access**
- ❌ **No system settings**

### **Unique Features**:
- Support ticket management
- User communication
- FAQ editing
- Issue tracking
- Escalation management

### **Routes**:
```
/admin/support-tickets
/admin/faq-management
/admin/user-details (support view)
/admin/help-center
```

### **Team Role Data**:
```typescript
{
  role: "Support Specialist",
  department: "Support",
  permissions: [
    "support-access",
    "user-view",
    "ticket-management"
  ]
}
```

---

## 📊 **ROLE COMPARISON TABLE**

| Role | Users | Admins | Content | Sessions | Crisis | System | Billing |
|------|-------|--------|---------|----------|--------|--------|---------|
| **User** | Self | ❌ | View | Own | ❌ | ❌ | Own |
| **Super Admin** | ✅ All | ✅ All | ✅ Full | ✅ All | ✅ Full | ✅ Full | ✅ Full |
| **Org Admin** | ✅ Org | ✅ Org | ✅ Moderate | ✅ Monitor | ✅ Monitor | ❌ | 👁️ View |
| **Team Admin** | ✅ Team | ✅ Team | ❌ | ✅ Team | ✅ Team | ❌ | ❌ |
| **Crisis Specialist** | 👁️ View | ❌ | ❌ | ⚡ Override | ✅ Full | ❌ | ❌ |
| **Senior Therapist** | 👁️ Assigned | ❌ | ✅ Edit | ✅ Full | ❌ | ❌ | ❌ |
| **Therapist** | 👁️ Assigned | ❌ | 👁️ View | ✅ Assigned | ❌ | ❌ | ❌ |
| **Content Manager** | ❌ | ❌ | ✅ Full | ❌ | ❌ | ❌ | ❌ |
| **System Admin** | ✅ Tech | ❌ | ❌ | ❌ | ❌ | ✅ Full | ❌ |
| **Support Specialist** | 👁️ Support | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Legend**:
- ✅ Full Access
- 👁️ View/Limited Access
- ⚡ Special Access (Emergency)
- ❌ No Access

---

## 🔐 **PERMISSION MATRIX**

### **Complete Permission List**

| Permission | Super | Org | Team | Crisis | Sr. Therapist | Therapist | Content | System | Support |
|------------|-------|-----|------|--------|---------------|-----------|---------|--------|---------|
| `full-access` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `system-settings` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `user-management` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `crisis-access` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `session-access` | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `session-override` | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `content-full` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| `content-edit` | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `analytics-view` | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `billing` | ✅ | 👁️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `audit-logs` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| `support-access` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `media-upload` | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| `emergency-contact` | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `user-view` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| `ticket-management` | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 💾 **DATABASE SCHEMA**

### **User Table** (`users`)
```prisma
model User {
  id       String   @id @db.Uuid
  email    String   @unique
  fullName String?
  role     String   @default("user") @db.VarChar(50)
  status   String   @default("active")
  
  // Role can be:
  // - "user" (regular user)
  // - "admin" (generic admin)
  // - "super_admin" (platform admin)
  // - "org_admin" (organization admin)
  // - "team_admin" (team lead)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}
```

### **Role Values in Database**:
```typescript
enum UserRole {
  USER = "user"
  ADMIN = "admin"
  SUPER_ADMIN = "super_admin"
  ORG_ADMIN = "org_admin"
  TEAM_ADMIN = "team_admin"
}
```

### **Team Member Role** (Not in DB, stored in team metadata):
```typescript
interface TeamMember {
  userId: string;
  teamRole: "crisis_specialist" | "senior_therapist" | "therapist" | 
            "content_manager" | "system_admin" | "support_specialist";
  department: string;
  permissions: string[];
}
```

---

## 🎯 **ROLE ASSIGNMENT WORKFLOW**

### **1. User Registration**
```typescript
// New user signs up
const user = {
  role: "user",  // Default role
  status: "active"
}
```

### **2. Admin Invitation**
```typescript
// Super Admin invites organization admin
const invite = {
  email: "admin@company.com",
  role: "org_admin",
  organization: "Company XYZ"
}
```

### **3. Team Member Assignment**
```typescript
// Org Admin assigns team role
const teamMember = {
  userId: "user-uuid",
  teamRole: "crisis_specialist",
  permissions: ["crisis-access", "user-management"]
}
```

---

## 📱 **FRONTEND ROLE DETECTION**

### **Check User Role**
```typescript
// In React component
const userRole = localStorage.getItem('userRole') || 'user';

const isAdmin = userRole.includes('admin');
const isSuperAdmin = userRole === 'super_admin';
const isOrgAdmin = userRole === 'org_admin';
const isTeamAdmin = userRole === 'team_admin';
```

### **Route Protection**
```tsx
// Protected route example
<Route 
  path="/admin/*" 
  element={
    isAdmin ? <AdminDashboard /> : <Navigate to="/app/dashboard" />
  } 
/>
```

### **Conditional Rendering**
```tsx
{isSuperAdmin && (
  <Link to="/admin/system-settings">
    <Settings />
    System Settings
  </Link>
)}

{hasPermission('crisis-access') && (
  <Link to="/admin/crisis-dashboard">
    <AlertCircle />
    Crisis Dashboard
  </Link>
)}
```

---

## 🔒 **BACKEND ROLE AUTHORIZATION**

### **Middleware Example**
```typescript
// Node.js/Express middleware
const checkRole = (allowedRoles: string[]) => {
  return (req, res, next) => {
    const { role } = req.user;
    
    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  };
};

// Usage
app.get('/admin/users', 
  checkRole(['super_admin', 'org_admin']), 
  getUsersHandler
);
```

### **Permission Check**
```typescript
const hasPermission = (userId: string, permission: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { teamMember: true }
  });
  
  return user.teamMember?.permissions.includes(permission);
};
```

---

## 📊 **ROLE STATISTICS**

### **Typical Organization Breakdown**

| Role | Typical Count | Percentage |
|------|---------------|------------|
| **Users** | 10,000 | 99.0% |
| **Support Specialists** | 20 | 0.2% |
| **Therapists** | 50 | 0.5% |
| **Senior Therapists** | 15 | 0.15% |
| **Crisis Specialists** | 10 | 0.1% |
| **Content Managers** | 5 | 0.05% |
| **Team Admins** | 15 | 0.15% |
| **Organization Admins** | 8 | 0.08% |
| **System Admins** | 3 | 0.03% |
| **Super Admins** | 2 | 0.02% |
| **TOTAL** | **10,128** | **100%** |

---

## 🎨 **UI ROLE BADGES**

### **Frontend Display**
```tsx
// Role badge component
const RoleBadge = ({ role }) => {
  const badges = {
    super_admin: {
      icon: <Crown />,
      label: "Super Admin",
      gradient: "from-purple-500 to-pink-500"
    },
    org_admin: {
      icon: <Building2 />,
      label: "Organization Admin",
      gradient: "from-blue-500 to-cyan-500"
    },
    team_admin: {
      icon: <Users />,
      label: "Team Admin",
      gradient: "from-green-500 to-emerald-500"
    },
    crisis_specialist: {
      icon: <AlertCircle />,
      label: "Crisis Specialist",
      gradient: "from-red-500 to-orange-500"
    }
  };
  
  const badge = badges[role];
  
  return (
    <div className={`bg-gradient-to-r ${badge.gradient} text-white px-3 py-1 rounded-lg`}>
      {badge.icon}
      {badge.label}
    </div>
  );
};
```

---

## 🔄 **ROLE MIGRATION PATH**

### **User → Team Member**
```
User signs up → Uses app → Gets hired → Assigned team role → Becomes staff
```

### **Team Member → Admin**
```
Team member → Promoted → Assigned admin role → Becomes admin
```

### **Admin Hierarchy**
```
Team Admin → Organization Admin → Super Admin
```

---

## 📚 **KEY FILES & LOCATIONS**

### **Role Definitions**
- **Frontend**: `/src/app/components/AdminLayout.tsx` (Lines 260-276)
- **Frontend**: `/src/app/pages/admin/TeamRoleManagement.tsx` (Lines 165-210)
- **Frontend**: `/src/app/pages/admin/AdminCredentials.tsx` (Lines 21-79)
- **Backend**: `/backend-starter/api-server/prisma/schema.prisma` (Line 22)

### **Permission Checks**
- **Frontend**: Conditional rendering in components
- **Backend**: Middleware in `/backend-starter/api-server/src/middleware/auth.ts`

### **Demo Credentials**
- **Page**: `/admin/credentials`
- **File**: `/src/app/pages/admin/AdminCredentials.tsx`

---

## 🎉 **SUMMARY**

### **Total Roles: 8**

**Primary (2)**:
1. User
2. Admin

**Admin Types (3)**:
3. Super Admin
4. Organization Admin
5. Team Admin

**Team Roles (6)**:
6. Crisis Specialist
7. Senior Therapist
8. Therapist
9. Content Manager
10. System Admin
11. Support Specialist

### **Role Breakdown**:
- **2** Primary user types (User, Admin)
- **3** Admin hierarchy levels
- **6** Specialized team roles
- **16+** Unique permissions
- **∞** Scalable to organization needs

---

**Every role has been designed with specific permissions and access levels to ensure security, compliance, and efficient platform management!** 🔐✨
