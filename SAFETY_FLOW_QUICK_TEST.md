# 🧪 Safety Flow - Quick Testing Guide

## Quick Start (5 Minutes)

### Test 1: Onboarding Safety Consent ✅

1. **Navigate to:** `/onboarding/avatar-preferences`
2. **Select any AI avatar** (Maya, Alex, Jordan, or Sarah)
3. **Click "Continue"**
4. **You should see:** Safety & Support Notice screen with:
   - Shield icon and blue card at top
   - "If Ezri Detects High Emotional Risk" section
   - "Trusted Contact (Optional)" section
   - "Ezri Cannot" section
   - Consent checkbox at bottom
5. **Check the consent box**
6. **Click "Continue"** → Should navigate to Emergency Contact page

**✅ PASS** if you see the safety consent screen and can proceed after checking the box.

---

### Test 2: Safety Context Provider ✅

Open browser console and run:

```javascript
// Check if SafetyProvider is active
const consent = localStorage.getItem('ezri_safety_consent');
console.log('Safety Consent:', JSON.parse(consent));

// Expected output:
// { agreedToSafetyNotice: true, agreedAt: 1706284800000, trustedContactEnabled: false }
```

**✅ PASS** if you see the consent object in localStorage after completing onboarding.

---

### Test 3: Mock Detection System ✅

Create a test page or add to an existing page:

```tsx
import { useSafety } from '@/app/contexts/SafetyContext';
import { SafetyStateIndicator } from '@/app/components/safety/SafetyStateIndicator';
import { Button } from '@/app/components/ui/button';

function SafetyTest() {
  const { updateState, currentState } = useSafety();

  return (
    <div className="p-8 space-y-4">
      <h1>Safety Flow Test</h1>
      
      {/* Shows current state */}
      <SafetyStateIndicator />

      {/* Test buttons */}
      <div className="flex gap-2">
        <Button onClick={() => 
          updateState('ELEVATED_CONCERN', 'manual_test', ['overwhelmedLanguage'])
        }>
          → Elevated Concern
        </Button>

        <Button onClick={() => 
          updateState('HIGH_RISK', 'manual_test', ['lossOfDesireToContinue'])
        }>
          → High Risk
        </Button>

        <Button onClick={() => 
          updateState('SAFETY_MODE', 'manual_test', ['immediacyIndicators'])
        }>
          → Safety Mode
        </Button>

        <Button onClick={() => 
          updateState('NORMAL', 'manual_reset', ['user_stabilized'])
        }>
          Reset to Normal
        </Button>
      </div>
    </div>
  );
}
```

**✅ PASS** if:
- State indicator shows current state
- Clicking buttons changes the state
- Console logs state transitions (in dev mode)

---

### Test 4: Event Logging ✅

After triggering some state changes (Test 3), check browser console:

```javascript
// View all logged events
const events = JSON.parse(localStorage.getItem('ezri_safety_events'));
console.table(events);

// You should see entries like:
// {
//   id: "evt_1706284800000_abc123",
//   timestamp: 1706284800000,
//   userId: "user_123",
//   sessionId: "sess_456",
//   previousState: "NORMAL",
//   newState: "ELEVATED_CONCERN",
//   trigger: "manual_test",
//   detectedSignals: ["overwhelmedLanguage"]
// }
```

**✅ PASS** if you see safety events logged with correct state transitions.

---

### Test 5: Safety Resources ✅

Create a test to display resources:

```tsx
import { getSafetyResources } from '@/app/utils/safetyResources';
import { SafetyResourceCard } from '@/app/components/safety/SafetyResourceCard';

function ResourceTest() {
  const resources = getSafetyResources('US');

  return (
    <div className="p-8 space-y-4">
      <h1>Safety Resources</h1>
      {resources.map(resource => (
        <SafetyResourceCard 
          key={resource.id} 
          resource={resource} 
          priority={resource.type === 'emergency'}
        />
      ))}
    </div>
  );
}
```

**✅ PASS** if you see:
- 988 Suicide & Crisis Lifeline (blue card)
- Crisis Text Line (purple card)
- Emergency Services (red card with priority styling)
- NAMI Helpline (green card)

---

### Test 6: Keyword Detection ✅

Test the mock detection in browser console:

```javascript
// Import the function (you'll need to expose it or test in a component)
import { analyzeTextForSafety } from '@/app/utils/safetyDetection';

// Test 1: Elevated Concern
const test1 = analyzeTextForSafety("I feel so overwhelmed and hopeless", 'NORMAL');
console.log('Test 1:', test1);
// Expected: { suggestedState: 'ELEVATED_CONCERN', confidence: 0.7, signals: [...] }

// Test 2: High Risk
const test2 = analyzeTextForSafety("I just want to give up, there's no point", 'ELEVATED_CONCERN');
console.log('Test 2:', test2);
// Expected: { suggestedState: 'HIGH_RISK', confidence: 0.8, signals: [...] }

// Test 3: Safety Mode
const test3 = analyzeTextForSafety("I need help right now, I have a plan tonight", 'HIGH_RISK');
console.log('Test 3:', test3);
// Expected: { suggestedState: 'SAFETY_MODE', confidence: 0.9, signals: [...] }

// Test 4: No triggers
const test4 = analyzeTextForSafety("Hello, how are you?", 'NORMAL');
console.log('Test 4:', test4);
// Expected: { suggestedState: 'NORMAL', confidence: 0.5, signals: [] }
```

**✅ PASS** if detection correctly identifies risk levels based on keywords.

---

## Visual Tests

### Test 7: SafetyBoundaryMessage ✅

```tsx
import { SafetyBoundaryMessage } from '@/app/components/safety/SafetyBoundaryMessage';

function MessageTest() {
  return (
    <div className="p-8 space-y-4">
      <SafetyBoundaryMessage state="ELEVATED_CONCERN" />
      <SafetyBoundaryMessage state="HIGH_RISK" />
      <SafetyBoundaryMessage state="SAFETY_MODE" />
      <SafetyBoundaryMessage state="COOLDOWN" />
    </div>
  );
}
```

**✅ PASS** if you see different contextual messages for each state.

---

### Test 8: State Indicator (Compact Mode) ✅

```tsx
import { SafetyStateIndicator } from '@/app/components/safety/SafetyStateIndicator';

function CompactTest() {
  return (
    <div className="p-8">
      <SafetyStateIndicator compact />
    </div>
  );
}
```

**✅ PASS** if you see a small badge showing current state.

---

## End-to-End Flow Test

### Complete User Journey (10 minutes)

1. **Start Fresh**
   ```javascript
   // Clear storage
   localStorage.clear();
   ```

2. **Begin Onboarding**
   - Navigate to `/onboarding/welcome`
   - Complete steps 1-4 (Welcome → Profile → Wellness → Health)

3. **Avatar Selection** (Step 5)
   - Select an AI avatar
   - Select a session background
   - Click Continue

4. **Safety Consent** (NEW - Step 6)
   - Read safety notice
   - Verify all sections are present
   - Check consent checkbox
   - Click Continue

5. **Emergency Contact** (Step 7)
   - Add or skip emergency contact
   - Click Continue

6. **Permissions** (Step 8)
   - Grant or skip permissions
   - Click Complete Onboarding

7. **Verify Consent Stored**
   ```javascript
   console.log(localStorage.getItem('ezri_safety_consent'));
   ```

**✅ COMPLETE** if you successfully navigate through all steps with the new Safety Consent screen.

---

## Debug Checklist

If something isn't working:

### Issue: Safety consent screen not showing
- [ ] Check routing in `App.tsx` - should have `/onboarding/safety-consent` route
- [ ] Check `AvatarPreferences.tsx` - should link to `/onboarding/safety-consent`
- [ ] Check browser console for errors

### Issue: State transitions not working
- [ ] Verify `SafetyProvider` wraps the entire app in `App.tsx`
- [ ] Check browser console for `isValidStateTransition` warnings
- [ ] Ensure you're using valid state names (exact casing)

### Issue: Events not logging
- [ ] Check localStorage quota (might be full)
- [ ] Check browser console for errors
- [ ] Verify `ezri_safety_events` key in localStorage

### Issue: Components not rendering
- [ ] Check import paths (should use `@/app/...`)
- [ ] Verify component exports are correct
- [ ] Check for missing dependencies

---

## Performance Test

### Memory Usage

The safety system should be lightweight:

```javascript
// Check storage size
const events = localStorage.getItem('ezri_safety_events');
const consent = localStorage.getItem('ezri_safety_consent');

console.log('Events size:', new Blob([events || '']).size, 'bytes');
console.log('Consent size:', new Blob([consent || '']).size, 'bytes');

// Should be < 50KB for 500 events
```

**✅ PASS** if storage is reasonable (< 100KB total).

---

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

All features should work identically.

---

## Success Criteria Summary

### Phase 1 is working if:
1. ✅ Safety consent appears in onboarding flow
2. ✅ SafetyProvider context is accessible
3. ✅ State transitions work correctly
4. ✅ Events are logged to localStorage
5. ✅ Resources display properly
6. ✅ Mock detection identifies keywords
7. ✅ UI components render correctly
8. ✅ No console errors during normal operation

---

## Report Issues

If you find any issues during testing:

1. **Check browser console** for errors
2. **Check localStorage** for data corruption
3. **Verify imports** are using `@/app/...` alias
4. **Check routing** in App.tsx

Common fixes:
- Clear localStorage and retry
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
- Restart dev server

---

**Happy Testing! 🎉**

Phase 1 should be fully functional. Test each section above to verify everything works as expected.
