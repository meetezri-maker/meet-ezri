# 📊 EZRI - Wellness Exercise Reports & Analytics Location Guide

**Complete guide to finding reports, analytics, and tracking for wellness exercises (breathing, meditation, etc.)**

---

## 🎯 **QUICK ANSWER**

### **Where to Find Wellness Exercise Reports:**

| What You're Looking For | User Location | Admin Location |
|------------------------|---------------|----------------|
| **Personal Exercise Stats** | `/app/progress` | N/A |
| **Exercise History** | `/app/progress` | N/A |
| **Wellness Tools Page** | `/app/wellness-tools` | N/A |
| **Individual Exercise Data** | `/app/progress` (charts) | `/admin/session-analytics` |
| **Platform-Wide Exercise Analytics** | N/A | `/admin/usage-analytics` |
| **Exercise Library Management** | N/A | `/admin/exercise-library` |
| **Content Performance** | N/A | `/admin/content-performance` |
| **Wellness CMS** | N/A | `/admin/wellness-tools-cms` |

---

## 📱 **USER APP - WHERE TO SEE YOUR EXERCISE REPORTS**

---

## 1️⃣ **PRIMARY LOCATION: Progress Page** 📊

**Route**: `/app/progress`

**Purpose**: Main dashboard showing ALL your wellness activity including exercises

### **What You'll See:**

#### **A. Overall Stats Card**
```
┌─────────────────────────────────────────┐
│  Your Progress at a Glance              │
├─────────────────────────────────────────┤
│  🎥 AI Sessions:         12             │
│     +3 this week                         │
│                                          │
│  💖 Mood Check-ins:      45             │
│     +7 this week                         │
│                                          │
│  📖 Journal Entries:     28             │
│     +4 this week                         │
│                                          │
│  🔥 Current Streak:      7 days         │
│     Best: 12 days                        │
└─────────────────────────────────────────┘
```

#### **B. Weekly Activity Chart**
Shows your weekly engagement:
- Mood scores
- Sessions completed
- Journal entries
- Check-ins (includes wellness exercises)

**Example Data**:
```javascript
const weeklyProgress = [
  { week: "Week 1", mood: 6, sessions: 2, journals: 3, checkIns: 5 },
  { week: "Week 2", mood: 7, sessions: 3, journals: 4, checkIns: 6 },
  { week: "Week 3", mood: 7.5, sessions: 2, journals: 5, checkIns: 7 },
  { week: "Week 4", mood: 8, sessions: 3, journals: 6, checkIns: 7 }
];
```

#### **C. Wellness Score Radar Chart**
Five-dimension wellness breakdown:
- **Emotional**: 85/100
- **Mental**: 78/100
- **Physical**: 72/100
- **Social**: 80/100
- **Sleep**: 70/100

#### **D. Monthly Activity Trend**
Bar chart showing overall activity across months:
```
Sep  ████████████ 45
Oct  ██████████████ 52
Nov  ████████████████████ 68
Dec  ██████████████████████████ 78
```

#### **E. Achievements Section**
Shows exercise-related achievements:
- ✅ "7 Day Streak" - Checked in every day
- ✅ "First Session" - Completed first AI session
- ✅ "Journal Master" - Written 25 entries
- 🔒 "Wellness Warrior" - Complete 10 wellness exercises
- 🔒 "Mood Maven" - Track mood for 30 days
- 🔒 "Goal Getter" - Achieve 5 goals

---

## 2️⃣ **SECONDARY LOCATION: Wellness Tools Page** 🧘

**Route**: `/app/wellness-tools`

**Purpose**: Main wellness exercise hub with live tracking

### **What You'll See:**

#### **A. Personal Stats Card**
```
┌──────────────────────────────────┐
│  Your Wellness Stats             │
├──────────────────────────────────┤
│  ⭐ Completed:      24           │
│  ⏱️ Minutes:        186          │
│  🔥 Streak:         5 days       │
└──────────────────────────────────┘
```

**Location in Code**: `/src/app/pages/app/WellnessTools.tsx` (Lines 132-136)

```typescript
const stats = [
  { label: "Completed", value: "24", icon: Star },
  { label: "Minutes", value: "186", icon: Clock },
  { label: "Streak", value: "5 days", icon: Heart }
];
```

#### **B. Exercise Library**
List of all available exercises:

1. **Box Breathing** (Breathing)
   - Duration: 5 min
   - Difficulty: Beginner
   - Status: Favorite ⭐

2. **Body Scan Meditation** (Meditation)
   - Duration: 10 min
   - Difficulty: Beginner

3. **4-7-8 Breathing** (Breathing)
   - Duration: 3 min
   - Difficulty: Beginner
   - Status: Favorite ⭐

4. **Mindfulness Practice** (Meditation)
   - Duration: 15 min
   - Difficulty: Intermediate

5. **Rain & Thunder** (Sounds)
   - Duration: ∞
   - Difficulty: Any
   - Status: Favorite ⭐

6. **Gratitude Reflection** (Gratitude)
   - Duration: 5 min
   - Difficulty: Beginner

7. **Morning Meditation** (Meditation)
   - Duration: 10 min
   - Difficulty: Beginner

8. **Sleep Meditation** (Meditation)
   - Duration: 20 min
   - Difficulty: Beginner
   - Status: Favorite ⭐

#### **C. Exercise Categories**
- 🌬️ **Breathing** (e.g., Box Breathing, 4-7-8)
- 🧠 **Meditation** (e.g., Body Scan, Mindfulness)
- 🎵 **Sounds** (e.g., Rain & Thunder, Nature)
- 😊 **Gratitude** (e.g., Reflection, Journaling)

#### **D. Active Exercise Tracking**
When you start an exercise, you'll see:
- Live timer counting minutes/seconds
- Breathing phase indicator (inhale/hold/exhale)
- Pause/resume controls
- Progress bar

**Example**:
```
┌─────────────────────────────────┐
│  Box Breathing - In Progress    │
├─────────────────────────────────┤
│  Phase: INHALE 🌬️               │
│  Timer: 2:34                     │
│  Progress: ████████░░░░ 65%     │
│  [⏸️ Pause] [⏹️ Stop]            │
└─────────────────────────────────┘
```

---

## 3️⃣ **RELATED LOCATIONS**

### **Achievements Page**
**Route**: `/app/achievements`

Shows exercise-related badges and milestones:
- Completion badges
- Streak achievements
- Time-based milestones

### **Dashboard**
**Route**: `/app/dashboard`

Quick stats widget showing:
- Recent wellness activity
- Today's exercises completed
- Wellness score

---

## 🔍 **WHAT DATA IS TRACKED?**

### **Per Exercise Completion:**
1. **Exercise ID** - Which exercise (e.g., "box-breathing")
2. **Category** - Type (Breathing, Meditation, etc.)
3. **Duration** - How long you practiced
4. **Completion Status** - Finished vs. stopped early
5. **Timestamp** - When you completed it
6. **Streak Impact** - Did it count toward streak?

### **Aggregate Stats:**
1. **Total Exercises Completed** - Lifetime count
2. **Total Minutes Practiced** - Time across all exercises
3. **Current Streak** - Consecutive days
4. **Best Streak** - Personal record
5. **Favorites** - Your starred exercises
6. **Weekly Engagement** - Exercises per week
7. **Category Breakdown** - Which types you do most

---

## 👨‍💼 **ADMIN DASHBOARD - PLATFORM-WIDE ANALYTICS**

---

## 4️⃣ **Exercise Library Management**

**Route**: `/admin/exercise-library`

**Access**: Super Admin, Organization Admin

**Purpose**: Manage all wellness exercises in the system

### **What Admins See:**
- List of all exercises
- Usage statistics per exercise
- Edit/create new exercises
- Enable/disable exercises
- Set difficulty levels
- Manage categories

---

## 5️⃣ **Wellness Tools CMS**

**Route**: `/admin/wellness-tools-cms`

**Access**: Super Admin, Organization Admin

**Purpose**: Content management for wellness tools

### **Features:**
- Edit exercise descriptions
- Update instructions
- Manage audio/video guides
- Set durations
- Configure difficulty

---

## 6️⃣ **Content Performance**

**Route**: `/admin/content-performance`

**Access**: Super Admin, Organization Admin

**Purpose**: See which wellness exercises are most popular

### **Metrics:**
- **Exercise Completion Rate**
  - How many users complete each exercise
  - Average completion time
  - Drop-off points

- **Popularity Rankings**
  - Most started exercises
  - Most completed exercises
  - Highest rated exercises

- **Category Performance**
  - Breathing: 45% of all exercises
  - Meditation: 30%
  - Sounds: 15%
  - Gratitude: 10%

- **User Engagement**
  - Daily active users per exercise
  - Weekly trends
  - Retention rates

---

## 7️⃣ **Usage Analytics**

**Route**: `/admin/usage-analytics`

**Access**: Super Admin, Organization Admin

**Purpose**: Platform-wide wellness tool usage

### **Wellness Exercise Analytics:**

#### **Overall Usage**
```
Total Exercise Completions:     12,458
Total Minutes Practiced:        186,342 min
Average per User:               24 exercises
Most Popular Time:              8-10 AM
```

#### **Top Exercises**
1. Box Breathing - 3,245 completions
2. Sleep Meditation - 2,891 completions
3. 4-7-8 Breathing - 2,456 completions
4. Body Scan - 1,987 completions
5. Morning Meditation - 1,879 completions

#### **Completion Trends**
```
Line chart showing daily/weekly/monthly completions
```

#### **User Segments**
- Beginners: 60% (focus on short exercises)
- Intermediate: 30% (longer sessions)
- Advanced: 10% (varied practice)

---

## 8️⃣ **Session Analytics**

**Route**: `/admin/session-analytics`

**Access**: Super Admin, Organization Admin, Team Admin

**Purpose**: User session data including wellness exercises

### **Exercise Session Data:**
- User ID
- Exercise name
- Start time
- End time
- Completed (yes/no)
- Duration
- User rating (optional)

---

## 9️⃣ **Feature Adoption**

**Route**: `/admin/feature-adoption`

**Access**: Super Admin, Organization Admin

**Purpose**: Track which features users engage with

### **Wellness Tools Adoption:**
```
┌──────────────────────────────────────┐
│  Wellness Tools Feature Adoption     │
├──────────────────────────────────────┤
│  Total Users:              10,000    │
│  Using Wellness Tools:     6,500     │
│  Adoption Rate:            65%       │
│  Weekly Active Users:      4,200     │
│  Monthly Growth:           +12%      │
└──────────────────────────────────────┘
```

**Exercise Breakdown**:
- Breathing exercises: 75% of wellness tool users
- Meditation: 60%
- Sounds: 40%
- Gratitude: 35%

---

## 🔄 **DATA FLOW: How Exercise Data is Tracked**

```
┌─────────────────────────────────────────────────────┐
│         USER COMPLETES WELLNESS EXERCISE            │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Frontend Tracking    │
            │  (WellnessTools.tsx)  │
            └───────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Save to Database     │
            │  (POST /api/wellness) │
            └───────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  wellness_activities  │
            │       table           │
            └───────────────────────┘
                        │
            ┌───────────┴────────────┐
            │                        │
            ▼                        ▼
┌─────────────────────┐   ┌──────────────────────┐
│  Update User Stats  │   │  Update Achievements │
│  (total, streak)    │   │  (badges, progress)  │
└─────────────────────┘   └──────────────────────┘
            │                        │
            └───────────┬────────────┘
                        ▼
            ┌───────────────────────┐
            │  Display in Progress  │
            │  (/app/progress)      │
            └───────────────────────┘
```

---

## 💾 **DATABASE SCHEMA (Backend Implementation)**

### **Wellness Activities Table**

```sql
CREATE TABLE wellness_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Exercise Details
  exercise_id VARCHAR(100) NOT NULL,        -- "box-breathing", "body-scan", etc.
  exercise_title VARCHAR(255) NOT NULL,     -- "Box Breathing"
  exercise_category VARCHAR(50) NOT NULL,   -- "Breathing", "Meditation", etc.
  
  -- Session Info
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER,                 -- Actual duration
  planned_duration_seconds INTEGER,         -- Planned duration
  
  -- Completion Status
  status VARCHAR(50) NOT NULL,              -- "completed", "abandoned", "paused"
  completion_percentage INTEGER,            -- 0-100%
  
  -- User Feedback
  user_rating INTEGER,                      -- 1-5 stars (optional)
  user_notes TEXT,
  
  -- Tracking
  is_favorite BOOLEAN DEFAULT false,
  counted_in_streak BOOLEAN DEFAULT true,
  
  -- Metadata
  device_type VARCHAR(50),                  -- "web", "mobile"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_wellness_user_id (user_id),
  INDEX idx_wellness_exercise_id (exercise_id),
  INDEX idx_wellness_created_at (created_at),
  INDEX idx_wellness_category (exercise_category)
);
```

### **Wellness Stats Table** (Aggregated)

```sql
CREATE TABLE wellness_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Totals
  total_exercises_completed INTEGER DEFAULT 0,
  total_minutes_practiced INTEGER DEFAULT 0,
  
  -- Streaks
  current_streak_days INTEGER DEFAULT 0,
  best_streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  
  -- Category Breakdown
  breathing_count INTEGER DEFAULT 0,
  meditation_count INTEGER DEFAULT 0,
  sounds_count INTEGER DEFAULT 0,
  gratitude_count INTEGER DEFAULT 0,
  
  -- Favorites
  favorite_exercises TEXT[],
  
  -- Updated
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_wellness_stats_user_id (user_id)
);
```

---

## 🔌 **API ENDPOINTS (Backend)**

### **User Endpoints**

#### **1. Get Personal Exercise Stats**
```http
GET /api/v1/wellness/stats
```

**Response**:
```json
{
  "success": true,
  "stats": {
    "totalCompleted": 24,
    "totalMinutes": 186,
    "currentStreak": 5,
    "bestStreak": 12,
    "categoryBreakdown": {
      "breathing": 12,
      "meditation": 8,
      "sounds": 3,
      "gratitude": 1
    }
  }
}
```

#### **2. Get Exercise History**
```http
GET /api/v1/wellness/history?limit=20&offset=0
```

**Response**:
```json
{
  "success": true,
  "activities": [
    {
      "id": "act_123",
      "exerciseId": "box-breathing",
      "exerciseTitle": "Box Breathing",
      "category": "Breathing",
      "completedAt": "2024-12-28T08:15:00Z",
      "duration": 300,
      "status": "completed",
      "userRating": 5
    }
  ],
  "pagination": {
    "total": 24,
    "limit": 20,
    "offset": 0
  }
}
```

#### **3. Record Exercise Completion**
```http
POST /api/v1/wellness/complete
```

**Request**:
```json
{
  "exerciseId": "box-breathing",
  "exerciseTitle": "Box Breathing",
  "category": "Breathing",
  "durationSeconds": 300,
  "completionPercentage": 100,
  "userRating": 5
}
```

**Response**:
```json
{
  "success": true,
  "activity": {
    "id": "act_123",
    "streakUpdated": true,
    "newStreak": 6,
    "achievementsUnlocked": ["wellness-warrior"]
  }
}
```

#### **4. Get Weekly Progress**
```http
GET /api/v1/wellness/weekly-progress
```

**Response**:
```json
{
  "success": true,
  "weeks": [
    {
      "week": "Week 1",
      "exercisesCompleted": 5,
      "minutesPracticed": 42,
      "checkInsCompleted": 5
    }
  ]
}
```

---

### **Admin Endpoints**

#### **5. Get Platform-Wide Exercise Analytics**
```http
GET /api/v1/admin/wellness/analytics
```

**Response**:
```json
{
  "success": true,
  "analytics": {
    "totalCompletions": 12458,
    "totalMinutes": 186342,
    "uniqueUsers": 6500,
    "averagePerUser": 24,
    "topExercises": [
      {
        "exerciseId": "box-breathing",
        "title": "Box Breathing",
        "completions": 3245,
        "avgDuration": 285
      }
    ],
    "categoryBreakdown": {
      "breathing": 45,
      "meditation": 30,
      "sounds": 15,
      "gratitude": 10
    }
  }
}
```

#### **6. Get Exercise Performance**
```http
GET /api/v1/admin/wellness/exercises/:exerciseId/performance
```

**Response**:
```json
{
  "success": true,
  "performance": {
    "exerciseId": "box-breathing",
    "title": "Box Breathing",
    "totalStarts": 3500,
    "totalCompletions": 3245,
    "completionRate": 92.7,
    "averageDuration": 285,
    "averageRating": 4.6,
    "popularTimes": ["08:00-10:00", "20:00-22:00"],
    "userSegments": {
      "beginners": 65,
      "intermediate": 30,
      "advanced": 5
    }
  }
}
```

---

## 📱 **FRONTEND CODE LOCATIONS**

### **User Pages**

| File | Route | Purpose |
|------|-------|---------|
| `/src/app/pages/app/WellnessTools.tsx` | `/app/wellness-tools` | Main wellness exercise page |
| `/src/app/pages/app/Progress.tsx` | `/app/progress` | Progress tracking & stats |
| `/src/app/pages/app/Achievements.tsx` | `/app/achievements` | Badges & milestones |
| `/src/app/components/modals/EzriGuidedMode.tsx` | Modal | Guided exercise modal |

### **Admin Pages**

| File | Route | Purpose |
|------|-------|---------|
| `/src/app/pages/admin/ExerciseLibrary.tsx` | `/admin/exercise-library` | Exercise management |
| `/src/app/pages/admin/WellnessToolsCMS.tsx` | `/admin/wellness-tools-cms` | Content management |
| `/src/app/pages/admin/ContentPerformance.tsx` | `/admin/content-performance` | Performance analytics |
| `/src/app/pages/admin/UsageAnalytics.tsx` | `/admin/usage-analytics` | Usage analytics |
| `/src/app/pages/admin/SessionAnalytics.tsx` | `/admin/session-analytics` | Session data |

---

## 🎨 **UI COMPONENTS FOR REPORTS**

### **Progress Page Components**

#### **Stats Cards**
```tsx
// Location: /src/app/pages/app/Progress.tsx

const stats = [
  {
    icon: Video,
    label: "AI Sessions",
    value: "12",
    change: "+3 this week",
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Heart,
    label: "Mood Check-ins",
    value: "45",
    change: "+7 this week",
    color: "text-pink-500",
    bgColor: "bg-pink-50"
  }
];
```

#### **Charts**
- **Line Chart** - Weekly progress over time
- **Bar Chart** - Monthly activity comparison
- **Radar Chart** - Wellness score (5 dimensions)

**Technology**: Recharts library

```tsx
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
```

---

## 🔍 **HOW TO VIEW REPORTS (USER GUIDE)**

### **Step-by-Step:**

1. **Log in to Ezri**
   - Go to `https://ezri.app/login`
   - Enter credentials

2. **Navigate to Progress**
   - Click "Progress" in sidebar
   - OR go directly to `/app/progress`

3. **View Your Stats**
   - See total exercises completed at top
   - Scroll for weekly/monthly charts
   - Check achievements section

4. **View Wellness Tools Page**
   - Click "Wellness Tools" in sidebar
   - OR go to `/app/wellness-tools`
   - See stats: Completed (24), Minutes (186), Streak (5 days)

5. **Filter by Category** (on Wellness Tools)
   - Click category buttons at top
   - Filter exercises by type

6. **View Exercise History**
   - Scroll down on Progress page
   - See timeline of completed exercises

---

## 📊 **REPORT EXAMPLES**

### **Personal Progress Report**
```
═══════════════════════════════════════
        YOUR WELLNESS JOURNEY
═══════════════════════════════════════

OVERALL STATS
─────────────────────────────────────
✅ Exercises Completed:     24
⏱️ Total Minutes:           186 min
🔥 Current Streak:          5 days
⭐ Best Streak:             12 days
📈 Weekly Average:          6 exercises

CATEGORY BREAKDOWN
─────────────────────────────────────
🌬️ Breathing:              12 (50%)
🧠 Meditation:             8 (33%)
🎵 Sounds:                 3 (13%)
😊 Gratitude:              1 (4%)

MOST PRACTICED
─────────────────────────────────────
1. Box Breathing         - 6 times
2. 4-7-8 Breathing       - 4 times
3. Body Scan             - 3 times

WELLNESS SCORE
─────────────────────────────────────
Emotional:    ████████████████░░  85/100
Mental:       ███████████████░░░  78/100
Physical:     ██████████████░░░░  72/100
Social:       ████████████████░░  80/100
Sleep:        ██████████████░░░░  70/100

ACHIEVEMENTS UNLOCKED
─────────────────────────────────────
✅ 7 Day Streak
✅ First Session
✅ Journal Master
🔒 Wellness Warrior (6/10)
🔒 Mood Maven (18/30)

NEXT MILESTONE
─────────────────────────────────────
Complete 4 more exercises to unlock
"Wellness Warrior" badge! 💪
```

---

## 🎯 **SUMMARY - WHERE TO FIND REPORTS**

### **👤 For Regular Users:**

1. **Primary**: `/app/progress`
   - Overall stats, charts, achievements
   - Weekly/monthly trends
   - Wellness score breakdown

2. **Secondary**: `/app/wellness-tools`
   - Quick stats (completed, minutes, streak)
   - Exercise library with favorites
   - Live tracking during exercises

### **👨‍💼 For Admins:**

1. **Exercise Management**: `/admin/exercise-library`
2. **Content Performance**: `/admin/content-performance`
3. **Platform Analytics**: `/admin/usage-analytics`
4. **Session Data**: `/admin/session-analytics`
5. **CMS**: `/admin/wellness-tools-cms`

---

## 🚀 **NEXT STEPS (Backend Implementation)**

To make these reports fully functional, you need to implement:

1. ✅ Create `wellness_activities` table
2. ✅ Create `wellness_stats` table
3. ✅ Build POST `/api/v1/wellness/complete` endpoint
4. ✅ Build GET `/api/v1/wellness/stats` endpoint
5. ✅ Build GET `/api/v1/wellness/history` endpoint
6. ✅ Build GET `/api/v1/wellness/weekly-progress` endpoint
7. ✅ Connect frontend to API (replace mock data)
8. ✅ Add admin analytics endpoints
9. ✅ Implement streak calculation logic
10. ✅ Add achievement tracking

---

## 📚 **KEY FILES TO REFERENCE**

### **Frontend:**
- `/src/app/pages/app/WellnessTools.tsx` - Main wellness page
- `/src/app/pages/app/Progress.tsx` - Progress dashboard
- `/src/app/components/modals/EzriGuidedMode.tsx` - Exercise modal

### **Documentation:**
- `/EZRI_ALL_PAGE_URLS.md` - Complete route list
- `/FEATURE_INVENTORY.md` - Feature breakdown
- `/COMPREHENSIVE_FEATURE_AUDIT_REPORT.md` - Feature audit

---

**Everything you need to know about wellness exercise reports in Ezri!** 🎉

**TL;DR**: User reports are at `/app/progress`, admin analytics at `/admin/content-performance` and `/admin/usage-analytics` 📊✨
