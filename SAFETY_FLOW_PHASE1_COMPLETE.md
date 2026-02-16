# 🛡️ EZRI CONVERSATION SAFETY FLOW - PHASE 1 COMPLETE

## Implementation Status: ✅ COMPLETE

Phase 1 of the Conversation Safety Flow has been successfully implemented. This foundation enables Ezri to detect and respond to emotional risk during conversations using a deterministic state machine with mock detection behavior.

---

## 📋 What Was Implemented

### 1. **Safety State Machine** (Core System)

**Location:** `/src/app/types/safety.ts`, `/src/app/contexts/SafetyContext.tsx`

The safety system operates on 5 distinct states:

- **STATE A (NORMAL)** - Default conversation flow
- **STATE B (ELEVATED_CONCERN)** - Strong emotional distress without unsafe intent
- **STATE C (HIGH_RISK)** - Unsafe or alarming intent without immediacy
- **STATE D (SAFETY_MODE)** - Imminent unsafe intent or urgency
- **STATE E (COOLDOWN)** - User stabilizes after high-risk interaction

**State Transitions:**
- NORMAL → ELEVATED_CONCERN
- ELEVATED_CONCERN → NORMAL, HIGH_RISK
- HIGH_RISK → ELEVATED_CONCERN, SAFETY_MODE, COOLDOWN
- SAFETY_MODE → COOLDOWN (only)
- COOLDOWN → NORMAL, ELEVATED_CONCERN

### 2. **Mock Detection System** (Testing Infrastructure)

**Location:** `/src/app/utils/safetyDetection.ts`

Keyword-based detection patterns simulate AI risk assessment:

**Elevated Concern Triggers:**
- overwhelmed, hopeless, can't cope, too much, exhausted, heavy, struggling, drowning, lost

**High Risk Triggers:**
- give up, no point, end it, not worth, better off, burden, escape, way out

**Safety Mode Triggers:**
- urgent crisis, immediate danger, right now, tonight, today, method, plan

**Usage:**
```typescript
import { analyzeTextForSafety } from '@/app/utils/safetyDetection';

const analysis = analyzeTextForSafety(userMessage, currentState);
if (analysis.confidence > 0.6 && analysis.suggestedState !== currentState) {
  updateSafetyState(analysis.suggestedState, 'keyword_detection', analysis.detectedSignals);
}
```

### 3. **Event Logging System**

**Location:** `/src/app/utils/safetyLogger.ts`

All state transitions are logged to localStorage for review and analysis:

```typescript
{
  id: "evt_1234567890_abc123",
  timestamp: 1706284800000,
  userId: "user_123",
  sessionId: "sess_456",
  previousState: "NORMAL",
  newState: "ELEVATED_CONCERN",
  trigger: "keyword_detection",
  detectedSignals: ["overwhelmedLanguage", "persistentEmotionalHeaviness"],
  context: "Transition: NORMAL → ELEVATED_CONCERN"
}
```

**API:**
- `logSafetyEvent()` - Log a state transition
- `getSafetyEvents()` - Get all safety events
- `getUserSafetyEvents(userId)` - Get events for specific user
- `getCriticalSafetyEvents()` - Get HIGH_RISK and SAFETY_MODE events
- `getSafetyEventStats()` - Get statistics summary

### 4. **Onboarding Safety Consent**

**Location:** `/src/app/pages/onboarding/SafetyConsent.tsx`

New onboarding step (Step 5 of 8) that presents the Safety & Support Notice:

**User sees:**
- What Ezri is (and is NOT)
- How Ezri responds to emotional risk
- Trusted contact option (optional, can enable later)
- What Ezri cannot do
- Consent checkbox required to proceed

**Flow:** Avatar Preferences → **Safety Consent** → Emergency Contact → Permissions → Complete

### 5. **Safety UI Components**

#### SafetyStateIndicator
**Location:** `/src/app/components/safety/SafetyStateIndicator.tsx`

Visual indicator of current safety state (shows in dev mode by default):

```tsx
import { SafetyStateIndicator } from '@/app/components/safety/SafetyStateIndicator';

<SafetyStateIndicator /> // Full view
<SafetyStateIndicator compact /> // Compact badge view
<SafetyStateIndicator showInProduction /> // Force show in production
```

#### SafetyResourceCard
**Location:** `/src/app/components/safety/SafetyResourceCard.tsx`

Displays safety and support resources:

```tsx
import { SafetyResourceCard } from '@/app/components/safety/SafetyResourceCard';
import { getSafetyResources } from '@/app/utils/safetyResources';

const resources = getSafetyResources('US');
<SafetyResourceCard resource={resources[0]} priority />
```

#### SafetyBoundaryMessage
**Location:** `/src/app/components/safety/SafetyBoundaryMessage.tsx`

Shows contextual messages for each safety state:

```tsx
import { SafetyBoundaryMessage } from '@/app/components/safety/SafetyBoundaryMessage';

<SafetyBoundaryMessage state={currentState} />
<SafetyBoundaryMessage state="HIGH_RISK" customMessage="..." />
```

### 6. **Support Resources**

**Location:** `/src/app/utils/safetyResources.ts`

Region-aware crisis resources (currently US-focused):

- **988 Suicide & Crisis Lifeline** - 24/7 crisis support
- **Crisis Text Line** - Text HOME to 741741
- **Emergency Services** - 911
- **NAMI Helpline** - Mental health information

**API:**
```typescript
import { getSafetyResources, getEmergencyResources } from '@/app/utils/safetyResources';

const allResources = getSafetyResources('US');
const emergencyOnly = getEmergencyResources('US');
```

### 7. **Context Provider**

**Location:** `/src/app/contexts/SafetyContext.tsx`

Global safety state management:

```tsx
import { useSafety, useSafetyConsent } from '@/app/contexts/SafetyContext';

function MyComponent() {
  const { 
    currentState, 
    updateState, 
    resetToNormal,
    getStateDescription,
    canTransitionTo 
  } = useSafety();

  const { consent, updateConsent } = useSafetyConsent();

  // Update safety state
  updateState('ELEVATED_CONCERN', 'user_distress', ['overwhelmedLanguage']);
}
```

---

## 🧪 Testing the System

### 1. **Test Onboarding Flow**

1. Navigate to `/onboarding/avatar-preferences`
2. Select an AI avatar
3. Click "Continue"
4. You should see the **Safety & Support Notice** screen
5. Read through the notice and check the consent box
6. Click "Continue" to proceed

### 2. **Test State Transitions** (Dev Mode)

Add the SafetyStateIndicator to any page to see current state:

```tsx
import { SafetyStateIndicator } from '@/app/components/safety/SafetyStateIndicator';
import { useSafety } from '@/app/contexts/SafetyContext';

function TestPage() {
  const { updateState, currentState } = useSafety();

  return (
    <div>
      <SafetyStateIndicator />
      
      <button onClick={() => 
        updateState('ELEVATED_CONCERN', 'test', ['overwhelmedLanguage'])
      }>
        Trigger Elevated Concern
      </button>

      <button onClick={() => 
        updateState('HIGH_RISK', 'test', ['lossOfDesireToContinue'])
      }>
        Trigger High Risk
      </button>
    </div>
  );
}
```

### 3. **Test Mock Detection**

```typescript
import { analyzeTextForSafety } from '@/app/utils/safetyDetection';

// Test elevated concern
const result1 = analyzeTextForSafety(
  "I feel so overwhelmed and hopeless right now",
  'NORMAL'
);
console.log(result1); 
// { suggestedState: 'ELEVATED_CONCERN', detectedSignals: [...], confidence: 0.7 }

// Test high risk
const result2 = analyzeTextForSafety(
  "I just want to give up, there's no point anymore",
  'ELEVATED_CONCERN'
);
console.log(result2);
// { suggestedState: 'HIGH_RISK', detectedSignals: [...], confidence: 0.8 }
```

### 4. **View Safety Events**

Open browser console:

```javascript
// View all safety events
const events = JSON.parse(localStorage.getItem('ezri_safety_events'));
console.table(events);

// View safety statistics
import { getSafetyEventStats } from '@/app/utils/safetyLogger';
console.log(getSafetyEventStats());
```

---

## 📁 File Structure

```
/src/app/
├── types/
│   └── safety.ts                    # TypeScript type definitions
├── contexts/
│   └── SafetyContext.tsx            # Global state management
├── utils/
│   ├── safetyDetection.ts          # Mock AI detection logic
│   ├── safetyLogger.ts             # Event logging utilities
│   └── safetyResources.ts          # Support resource data
├── components/
│   └── safety/
│       ├── SafetyStateIndicator.tsx    # State visualization
│       ├── SafetyResourceCard.tsx      # Resource display
│       └── SafetyBoundaryMessage.tsx   # Contextual messages
└── pages/
    └── onboarding/
        └── SafetyConsent.tsx        # Onboarding consent screen
```

---

## 🎯 Next Steps - Phase 2 (Not Yet Implemented)

Phase 2 will add user-facing features:

1. **In-Conversation Safety Integration**
   - Add safety detection to ActiveSession page
   - Display safety boundary messages during conversations
   - Show resources when HIGH_RISK or SAFETY_MODE is triggered

2. **Trusted Contact System**
   - Allow users to add trusted contacts in settings
   - Enable/disable trusted contact notifications
   - Send notifications during SAFETY_MODE (message only, no details)

3. **Cooldown Flow**
   - Display cooldown screen after high-risk sessions
   - Recommend resources at next login
   - Gentle re-entry to conversations

4. **Enhanced Resource Display**
   - Region detection for location-appropriate resources
   - Resource filtering by type
   - Direct call/text integration

---

## 🎯 Next Steps - Phase 3 (Not Yet Implemented)

Phase 3 will add admin monitoring:

1. **Admin Safety Dashboard**
   - View all safety events
   - Filter by state, user, date range
   - Critical event alerts

2. **Safety Analytics**
   - State transition trends
   - Most common triggers
   - User safety patterns

3. **Trusted Contact Notifications**
   - Notification delivery system
   - Notification history
   - Opt-in/opt-out management

---

## ⚠️ Important Notes

### Language Safety
The system uses **abstracted, compliance-friendly language**:
- ❌ Never uses clinical terms like "suicide" or "self-harm"
- ✅ Uses "unsafe intent", "safety concerns", "emotional risk"
- ❌ Never makes medical claims
- ✅ Positions Ezri as a supportive companion, not a medical service

### Guardrails Implemented
Ezri **must never**:
- Encourage harm or unsafe behavior
- Provide instructions or methods
- Dismiss emotional pain
- Claim medical authority
- Make promises or guarantees
- Encourage secrecy

Ezri **may**:
- Set boundaries
- Encourage pausing
- Promote human support
- Use grounding language

### Data Privacy
- All safety events stored in **localStorage only** (client-side)
- No server transmission in Phase 1
- User consent required before tracking
- Trusted contact notifications are **opt-in only**

---

## 🔧 Configuration

### Enable/Disable Safety System

The system is enabled by default. To bypass for testing:

```typescript
// In SafetyContext.tsx, you can modify the initial state
const [currentState, setCurrentState] = useState<SafetyState>('NORMAL');
```

### Customize Detection Thresholds

```typescript
// In safetyDetection.ts
const analysis = analyzeTextForSafety(text, currentState);
if (analysis.confidence > 0.6) {  // Adjust this threshold (0.0 - 1.0)
  // Trigger state change
}
```

### Add Custom Resources

```typescript
// In safetyResources.ts
const customResource: SafetyResource = {
  id: 'custom_1',
  type: 'crisis_line',
  name: 'My Custom Resource',
  description: 'Description here',
  phone: '1-800-XXX-XXXX',
  url: 'https://example.com',
  availability: '24/7',
  region: 'US',
};
```

---

## 📚 Developer Notes

### Why Mock Detection?
Phase 1 uses **keyword-based detection** as a placeholder for real AI. This allows:
- Full testing of state machine logic
- UI/UX validation
- Event logging verification
- Integration testing without AI costs

In production, replace `safetyDetection.ts` with actual AI model calls.

### State Machine Design
The deterministic state machine ensures:
- Predictable behavior
- No invalid transitions
- Clear escalation/de-escalation paths
- Audit trail of all changes

### localStorage vs Database
Phase 1 uses localStorage for:
- Rapid prototyping
- No backend dependency
- Easy client-side debugging

Phase 3 will migrate to database for:
- Cross-device sync
- Admin visibility
- Long-term analytics
- Trusted contact notifications

---

## ✅ Phase 1 Checklist

- [x] Safety state type definitions
- [x] State machine context provider
- [x] Mock detection logic (keyword-based)
- [x] Event logging system
- [x] Onboarding safety consent screen
- [x] SafetyStateIndicator component
- [x] SafetyResourceCard component
- [x] SafetyBoundaryMessage component
- [x] Support resource database (US)
- [x] Updated onboarding flow routing
- [x] Wrapped App with SafetyProvider
- [x] Documentation

---

## 🎉 Success!

Phase 1 of the Conversation Safety Flow is complete. The foundation is in place for:
- State-based safety management
- Mock detection and testing
- User consent and disclosure
- Event logging and tracking

The system is **production-safe** (no harmful content), **compliance-friendly** (abstracted language), and **ready for Phase 2** implementation.

Test the onboarding flow by navigating to `/onboarding/avatar-preferences` and proceeding through the new Safety Consent step!

---

**Last Updated:** January 26, 2026  
**Phase:** 1 of 3  
**Status:** ✅ Complete  
**Next Phase:** User-Facing Safety Features (Phase 2)
