# 🧪 SAFETY FLOW PHASE 2 - QUICK TEST GUIDE

## 5-Minute Test Workflow

### Step 1: Generate Test Safety Events (2 min)

**Option A: Use Browser Console**
```javascript
// Open browser console (F12)
// Copy and paste this code:

function createTestEvents() {
  const events = [
    {
      userId: 'test_user_alice',
      sessionId: 'session_001',
      previousState: 'NORMAL',
      newState: 'ELEVATED_CONCERN',
      trigger: 'keyword_detection',
      detectedSignals: ['overwhelmedLanguage', 'hopelessLanguage'],
      context: 'User expressed feeling overwhelmed with work stress'
    },
    {
      userId: 'test_user_bob',
      sessionId: 'session_002',
      previousState: 'ELEVATED_CONCERN',
      newState: 'HIGH_RISK',
      trigger: 'escalation_detected',
      detectedSignals: ['lossOfDesireToContinue', 'repeatedDistressEscalation'],
      context: 'User conversation escalated to high risk indicators'
    },
    {
      userId: 'test_user_charlie',
      sessionId: 'session_003',
      previousState: 'HIGH_RISK',
      newState: 'SAFETY_MODE',
      trigger: 'imminent_risk',
      detectedSignals: ['timeBoundLanguage', 'methodOrientedLanguage', 'immediacyIndicators'],
      context: 'CRITICAL: User expressed immediate unsafe intent'
    },
    {
      userId: 'test_user_alice',
      sessionId: 'session_004',
      previousState: 'SAFETY_MODE',
      newState: 'COOLDOWN',
      trigger: 'stabilization',
      detectedSignals: ['grounding', 'resourceEngagement'],
      context: 'User engaged with resources and showed signs of stabilization'
    },
    {
      userId: 'test_user_bob',
      sessionId: 'session_002',
      previousState: 'NORMAL',
      newState: 'ELEVATED_CONCERN',
      trigger: 'mood_shift',
      detectedSignals: ['persistentEmotionalHeaviness'],
      context: 'User mood shifted during conversation'
    }
  ];

  events.forEach(event => {
    const fullEvent = {
      ...event,
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now() - Math.random() * 24 * 60 * 60 * 1000 // Random time in last 24h
    };
    
    const existing = JSON.parse(localStorage.getItem('ezri_safety_events') || '[]');
    localStorage.setItem('ezri_safety_events', JSON.stringify([fullEvent, ...existing]));
  });

  console.log('✅ Created 5 test safety events!');
  console.log('Navigate to /admin/dashboard or /admin/safety-events to view them.');
}

createTestEvents();
```

**Option B: Use Phase 1 Keyword Detection**
1. Start any conversation in Ezri
2. Type these trigger phrases:
   - "I feel so overwhelmed and hopeless right now"
   - "I just want to give up, there's no point anymore"
   - "I need help urgently, right now, tonight"

### Step 2: View Admin Dashboard (1 min)

1. Navigate to `/admin/dashboard`
2. **Expected Result:**
   - Red safety events alert banner appears at top
   - Shows total event count (e.g., "5 safety events")
   - Shows critical event count (e.g., "1 critical event")
   - First 3 critical events listed with state badges
   - "Review Safety Events" button visible

3. Click "Review Safety Events" button
4. **Expected Result:**
   - Navigates to `/admin/safety-events`

### Step 3: Test Safety Events Dashboard (2 min)

#### Main Dashboard View
1. **Verify Stats Cards** at top:
   - Total Events (24h): Shows count
   - Critical Events: Shows HIGH_RISK + SAFETY_MODE count
   - Elevated Concerns: Shows ELEVATED_CONCERN count
   - Users Affected: Shows unique user count

2. **Test "All Events" Tab:**
   - All 5 events visible
   - Events sorted by timestamp (newest first)
   - Each event shows:
     - ✓ User ID
     - ✓ State badges (colored)
     - ✓ Time ago
     - ✓ State transition (previous → new)
     - ✓ Detected signals
     - ✓ "View Details" button
   - Critical events have red ring

#### Test Filtering
3. **Filter by State:**
   - Select "High Risk" from dropdown
   - Only HIGH_RISK events shown
   - Event count badge updates
   - Select "All States" to reset

4. **Filter by Time:**
   - Select "Last 24 hours"
   - All test events should show (they're <24h old)
   - Select "All time" to reset

5. **Search Functionality:**
   - Type "alice" in search box
   - Only alice's events shown
   - Clear search

#### Critical Events Tab
6. **Switch to "Critical Events" Tab:**
   - Red alert banner appears
   - Only SAFETY_MODE and HIGH_RISK events shown
   - Should see 1-2 critical events

#### Analytics Tab
7. **Switch to "Analytics" Tab:**
   - Timeline chart shows hourly breakdown
   - Trends chart shows 7-day view
   - Distribution pie chart shows state percentages
   - All charts render without errors

#### Test Actions
8. **Export Events:**
   - Click download icon
   - JSON file downloads
   - Open file - verify it contains event data

9. **Refresh Events:**
   - Click refresh icon
   - Toast notification appears: "Safety events refreshed"

---

## Expected Results Summary

### ✅ Admin Dashboard
- [ ] Safety events banner appears when events exist
- [ ] Shows correct event counts
- [ ] Lists first 3 critical events
- [ ] "Review Safety Events" button works
- [ ] "Safety Events" quick action card visible

### ✅ Safety Events Dashboard
- [ ] Stats cards show correct data
- [ ] All events display in "All Events" tab
- [ ] State filtering works
- [ ] Time filtering works
- [ ] Search functionality works
- [ ] Critical events tab filters correctly
- [ ] Charts render in Analytics tab
- [ ] Export downloads JSON file
- [ ] Refresh updates data

### ✅ Event Details Page
- [ ] Click "View Details" on any event
- [ ] All metadata displays correctly:
  - [ ] Timestamp
  - [ ] User ID
  - [ ] Session ID
  - [ ] Event ID
  - [ ] State transition
  - [ ] Detected signals
  - [ ] Context
  - [ ] Recommended actions
- [ ] User history shows other events from same user
- [ ] Session timeline shows other events from same session
- [ ] Back button returns to dashboard

---

## Common Issues & Fixes

### Issue: No Safety Events Show Up
**Fix:** Run the test event creation script from Step 1

### Issue: Charts Don't Render
**Fix:** Ensure you have events in the selected time range

### Issue: Export Downloads Empty File
**Fix:** Make sure events are filtered correctly (check active filters)

### Issue: Stats Don't Update
**Fix:** Click the refresh button or reload the page

### Issue: Can't Access /admin Routes
**Fix:** Make sure you're logged in as admin (use `/admin/login`)

---

## Clean Up After Testing

To remove test events:

```javascript
// In browser console
localStorage.removeItem('ezri_safety_events');
console.log('✅ All safety events cleared!');
```

Or use the "Clear All Events" button in the Safety Events Dashboard (bottom of page, in red danger zone).

---

## Next Steps After Testing

1. ✅ Phase 2 works correctly → Ready for Phase 3 planning
2. ❌ Issues found → Report bugs and fix before Phase 3
3. 📝 Feature requests → Add to Phase 3 backlog

---

**Test Time:** ~5 minutes  
**Prerequisites:** None (test events created by script)  
**Browser:** Any modern browser with localStorage support  
**Admin Access:** Required for `/admin/*` routes
