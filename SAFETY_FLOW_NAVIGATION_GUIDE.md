# 🗺️ EZRI SAFETY FLOW - COMPLETE NAVIGATION GUIDE

## How to Access All Safety Flow Screens

---

## 🏠 Starting Point: Settings Hub

**URL:** `/app/settings`

The main Settings page has a **Safety & Support** section with these options:

### Safety & Support Section Cards:

1. **Emergency Contacts** → `/app/settings/emergency-contacts`
2. **Safety Plan** → `/app/settings/safety-plan`
3. **Safety Insights** → `/app/settings/safety-insights` ⭐ NEW
4. **Crisis Resources** → `/app/crisis-resources`
5. **Resource Analytics** → `/app/settings/resource-analytics`
6. **Notification History** → `/app/settings/notification-history`
7. **Cooldown Screen** → `/app/settings/cooldown-screen`

---

## 📱 Screen-by-Screen Navigation Guide

### 1️⃣ **Emergency Contacts**
- **Route:** `/app/settings/emergency-contacts`
- **How to get there:**
  1. Click bottom nav "Settings"
  2. Scroll to "Safety & Support" section
  3. Click "Emergency Contacts" card
- **What you'll see:**
  - Add/edit/delete trusted contacts
  - Set notification preferences
  - Configure which states trigger notifications
  - Test notification preview

---

### 2️⃣ **Safety Plan** 
- **Route:** `/app/settings/safety-plan`
- **How to get there:**
  1. Settings → Safety & Support → "Safety Plan"
- **What you'll see:**
  - 6 customizable sections:
    - Warning Signs
    - Coping Strategies
    - Healthy Distractions
    - People I Can Contact
    - Safe Places
    - Reasons to Live
  - Emergency crisis numbers (988, 911)
  - Print/Download PDF options
  - Add/edit/delete items in each section

---

### 3️⃣ **Safety Insights** ⭐ NEW (Sprint 5)
- **Route:** `/app/settings/safety-insights`
- **How to get there:**
  1. Settings → Safety & Support → "Safety Insights"
- **What you'll see:**
  - **Safety Score** (0-100 with circular progress)
  - **Trend indicator** (improving/stable/increasing)
  - **4 Personalized Recommendations**
  - **Pattern Visualizations:**
    - Time of Day patterns
    - Safety State Distribution
    - Top Resources Used
  - **Quick Actions** (Safety Plan, Contacts, Wellness, Progress)

---

### 4️⃣ **Crisis Resources**
- **Route:** `/app/crisis-resources`
- **How to get there:**
  - **Option A:** Settings → Safety & Support → "Crisis Resources"
  - **Option B:** Bottom nav → "Resources"
  - **Option C:** Triggered automatically during high-risk session
- **What you'll see:**
  - **Region selector** (US, Canada, UK, Australia, EU, Global)
  - **Emergency numbers** for selected region
  - **24/7 Crisis hotlines** with click-to-call
  - **27 resources across 6 regions**
  - Each resource tracks clicks for analytics

---

### 5️⃣ **Resource Analytics** 
- **Route:** `/app/settings/resource-analytics`
- **How to get there:**
  1. Settings → Safety & Support → "Resource Analytics"
  2. OR from Crisis Resources page → "View Analytics"
- **What you'll see:**
  - **Total interactions** across all resources
  - **Most used resources** (top 5)
  - **Interactions by safety state** breakdown
  - **Effectiveness scores** per resource
  - **Interaction timeline** (last 7 days)
  - **Filters:** By date range, safety state, region
  - **Export data** option

---

### 6️⃣ **Notification History**
- **Route:** `/app/settings/notification-history`
- **How to get there:**
  1. Settings → Safety & Support → "Notification History"
- **What you'll see:**
  - List of all notifications sent to trusted contacts
  - Each notification shows:
    - Timestamp
    - Safety state that triggered it
    - Which contact was notified
    - Privacy-safe message preview
  - Filter by date/contact/state

---

### 7️⃣ **Cooldown Screen**
- **Route:** `/app/settings/cooldown-screen`
- **How to get there:**
  - **Option A:** Settings → Safety & Support → "Cooldown Screen"
  - **Option B:** **Automatically triggered** after ending a HIGH_RISK or SAFETY_MODE session
- **What you'll see:**
  - **Required waiting period** (2-3 minutes)
  - **Choose recovery activity:**
    - Grounding Exercises (5-4-3-2-1, Body Scan)
    - Breathing Exercises (Box Breathing, 4-7-8, etc.)
  - Progress timer
  - "I'm Feeling Better" button (enabled after minimum time)

---

## 🎬 Testing the Complete Safety Flow

### **Full Journey Test:**

1. **Start Session**
   - Go to `/app/active-session`
   - Wait for safety state to change (check console logs)

2. **See Safety Detection in Action**
   - SafetyStateIndicator in top-right updates color
   - Watch it progress: Green → Yellow → Orange → Red

3. **Safety Boundary Message**
   - When state reaches ELEVATED_CONCERN or higher
   - Modal appears with supportive message
   - "I Understand" to acknowledge

4. **View Resources**
   - After acknowledging boundary
   - Resources automatically shown
   - Click "Call" on any resource (tracked!)

5. **Trusted Contact Notification**
   - If state reaches HIGH_RISK or SAFETY_MODE
   - Auto-notification sent to your emergency contacts
   - Check `/app/settings/notification-history` to see it

6. **End Session → Cooldown**
   - End a HIGH_RISK/SAFETY_MODE session
   - Automatically redirected to cooldown
   - Complete breathing or grounding exercise
   - Wait minimum time

7. **View Your Insights**
   - Go to `/app/settings/safety-insights`
   - See your patterns
   - Get personalized recommendations
   - Check your safety score

8. **Check Analytics**
   - Go to `/app/settings/resource-analytics`
   - See all your resource interactions
   - View effectiveness scores

---

## 🔗 Direct URL Quick Reference

Copy/paste these URLs to test directly:

### Main Pages:
- Settings Hub: `/app/settings`
- Active Session: `/app/active-session`
- Crisis Resources: `/app/crisis-resources`

### Safety Flow Pages:
- Emergency Contacts: `/app/settings/emergency-contacts`
- Safety Plan: `/app/settings/safety-plan`
- **Safety Insights: `/app/settings/safety-insights`** ⭐ NEW
- Resource Analytics: `/app/settings/resource-analytics`
- Notification History: `/app/settings/notification-history`
- Cooldown Screen: `/app/settings/cooldown-screen`

---

## 🧪 Quick Test Scenarios

### **Scenario 1: Add Emergency Contact**
1. Go to `/app/settings/emergency-contacts`
2. Click "Add Contact"
3. Fill in name, phone, relationship
4. Toggle notification preferences
5. Save

### **Scenario 2: Build Safety Plan**
1. Go to `/app/settings/safety-plan`
2. Click "Add Item" in any section
3. Type your entry
4. Hit "Add"
5. Try deleting an item (hover, trash icon appears)

### **Scenario 3: Explore Crisis Resources**
1. Go to `/app/crisis-resources`
2. Change region (top selector)
3. See resources update
4. Click "Call" on a resource
5. Go to `/app/settings/resource-analytics`
6. Verify your click was tracked

### **Scenario 4: Try Cooldown Exercises**
1. Go to `/app/settings/cooldown-screen`
2. Choose "Start Grounding Exercise"
3. Select "5-4-3-2-1 Technique"
4. Complete all 5 steps
5. See completion screen

### **Scenario 5: View Your Insights** ⭐ NEW
1. First, generate some data:
   - Visit active session a few times
   - Click some crisis resources
   - Add emergency contacts
2. Go to `/app/settings/safety-insights`
3. See your safety score
4. Read personalized recommendations
5. Check pattern visualizations

---

## 📊 Where is Data Stored?

All safety data is stored in **localStorage**:

### Storage Keys:
- `ezri_safety_history` - All safety state changes
- `ezri_resource_interactions` - Resource click tracking
- `ezri_emergency_contacts` - Trusted contacts list
- `ezri_trusted_contact_notifications` - Notification log
- `ezri_safety_plan` - Safety plan sections
- `ezri_user_region` - Selected region preference
- `ezri_cooldown_data` - Cooldown completion data

### To View Data:
1. Open browser DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Expand "Local Storage"
4. Click on your domain
5. See all `ezri_*` keys

### To Reset Data (Fresh Start):
```javascript
// Paste in browser console:
localStorage.clear();
location.reload();
```

---

## 🎨 Visual Indicators

### Safety State Colors:
- **Green** = NORMAL (all good)
- **Yellow** = ELEVATED_CONCERN (starting to worry)
- **Orange** = HIGH_RISK (needs support)
- **Red** = SAFETY_MODE (crisis intervention)

### Where to See State:
1. **Active Session page:** SafetyStateIndicator (top-right corner)
2. **Safety Insights:** Distribution chart
3. **Resource Analytics:** Interactions by state breakdown

---

## 🔍 Finding Screens in Code

### File Locations:

**Pages:**
- `/src/app/pages/app/EmergencyContacts.tsx`
- `/src/app/pages/app/SafetyPlan.tsx`
- `/src/app/pages/app/SafetyInsights.tsx` ⭐ NEW
- `/src/app/pages/app/ResourceAnalytics.tsx`
- `/src/app/pages/app/NotificationHistory.tsx`
- `/src/app/pages/app/CooldownScreen.tsx`

**Components:**
- `/src/app/components/safety/SafetyStateIndicator.tsx`
- `/src/app/components/safety/SafetyBoundaryMessage.tsx`
- `/src/app/components/safety/SafetyResourceCard.tsx`
- `/src/app/components/safety/GroundingExercises.tsx`
- `/src/app/components/safety/BreathingExercises.tsx`
- `/src/app/components/safety/RegionSelector.tsx`

**Context & Utils:**
- `/src/app/contexts/SafetyContext.tsx` - Main state management
- `/src/app/utils/safetyDetection.ts` - Detection algorithm
- `/src/app/utils/safetyResources.ts` - Resource database
- `/src/app/utils/resourceTracking.ts` - Analytics tracking
- `/src/app/utils/trustedContactNotifications.ts` - Notification system

---

## 🎯 Recommended Testing Order

### **For First-Time Exploration:**

1. **Start with Settings** (`/app/settings`)
   - Get oriented to where everything lives

2. **Add Emergency Contact** (`/app/settings/emergency-contacts`)
   - Foundation for trusted contact system

3. **Build Safety Plan** (`/app/settings/safety-plan`)
   - See customization options

4. **Explore Crisis Resources** (`/app/crisis-resources`)
   - Try different regions
   - Click some resources (for analytics data)

5. **Try Cooldown** (`/app/settings/cooldown-screen`)
   - Experience grounding exercises
   - Try breathing exercises

6. **View Analytics** (`/app/settings/resource-analytics`)
   - See your tracked interactions
   - Check effectiveness scores

7. **See Your Insights** ⭐ (`/app/settings/safety-insights`)
   - View your safety score
   - Read personalized recommendations
   - Explore patterns

8. **Test Full Flow** (`/app/active-session`)
   - Watch safety detection in action
   - See boundary messages
   - Trigger notifications
   - Experience cooldown requirement

---

## 💡 Pro Tips

### **Generating Test Data:**

**Quick way to populate analytics:**
1. Go to crisis resources
2. Click 10+ different resources
3. Change regions and click more
4. Go back to analytics - see your data!

**Quick way to generate insights:**
1. Visit active session multiple times
2. Let safety states progress
3. End sessions at different states
4. Check insights for patterns

**Quick way to test notifications:**
1. Add an emergency contact
2. Set HIGH_RISK notification trigger
3. In active session, wait for HIGH_RISK state
4. Check notification history

### **Console Logging:**

Open DevTools console to see real-time logs:
- `✅ Safety state changed: ...`
- `📞 Trusted contact notification sent`
- `🎯 Resource interaction tracked`
- `✅ Grounding exercise completed`

### **Mobile Testing:**

1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Select iPhone or Android device
4. Test touch interactions
5. Verify responsive design

---

## 🆘 Troubleshooting

### **"I don't see any data in analytics"**
→ Click some resources first in `/app/crisis-resources`

### **"Safety state isn't changing"**
→ Check console logs - it changes automatically every few seconds in demo mode

### **"Cooldown won't let me proceed"**
→ Wait the minimum time (2-3 min) AND complete an exercise

### **"Safety Insights shows 'No events yet'"**
→ Visit active session a few times to generate safety history

### **"I want to start fresh"**
→ Run `localStorage.clear()` in browser console, then refresh

---

## 📞 Quick Access Buttons

Throughout the app, look for these quick access buttons:

- **"View Resources"** → Crisis Resources page
- **"Safety Plan"** → Your safety plan
- **"View Analytics"** → Resource analytics
- **"View Insights"** → Safety insights ⭐
- **"Emergency Contacts"** → Trusted contacts
- **Back** buttons → Return to previous page

---

## ✅ Checklist: Have You Seen?

Test your exploration! Have you visited:

- [ ] Emergency Contacts page
- [ ] Safety Plan page
- [ ] Safety Insights page ⭐ NEW
- [ ] Crisis Resources page (all 6 regions)
- [ ] Resource Analytics page
- [ ] Notification History page
- [ ] Cooldown Screen
- [ ] Grounding Exercises (5-4-3-2-1)
- [ ] Grounding Exercises (Body Scan)
- [ ] Breathing Exercises (Box Breathing)
- [ ] Breathing Exercises (4-7-8)
- [ ] Safety State Indicator (in active session)
- [ ] Safety Boundary Message (modal)
- [ ] Personalized Recommendations
- [ ] Pattern Visualizations
- [ ] Effectiveness Scores

---

**Happy exploring! 🎉**

If you get lost, just go back to `/app/settings` and navigate from there.

All screens are accessible through the Settings Hub → Safety & Support section!
