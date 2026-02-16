# 🛡️ EZRI CONVERSATION SAFETY FLOW - PHASE 3 PLAN

## Status: 📋 PLANNED (Not Yet Implemented)

Phase 3 will complete the Conversation Safety Flow by implementing user-facing features, real-time conversation integration, trusted contact notifications, and recovery flows.

---

## 🎯 Overview

**Goal:** Transform the safety system from a backend monitoring tool into a comprehensive, user-facing safety net that actively supports users during conversations while maintaining privacy and dignity.

**Key Principles:**
- **User-Centric** - Safety features feel supportive, not intrusive
- **Privacy-First** - Users control what's shared and with whom
- **Compliance-Friendly** - Abstracted language, no medical claims
- **Graceful Degradation** - Features work even with limited data/connection

---

## 📋 Feature Breakdown

### 1. **In-Conversation Safety Integration** 🔴 HIGH PRIORITY

**Goal:** Real-time safety detection and response during active AI avatar conversations.

#### Implementation Areas:

##### a) Active Session Safety Detection
**File:** `/src/app/pages/app/ActiveSession.tsx`

**Features to Add:**
- Integrate `analyzeTextForSafety()` on every user message
- Update safety state in real-time during conversation
- Display `SafetyStateIndicator` in dev mode (optional in production)
- Trigger UI changes when state escalates

**Technical Approach:**
```typescript
// In ActiveSession.tsx
import { useSafety } from '@/app/contexts/SafetyContext';
import { analyzeTextForSafety } from '@/app/utils/safetyDetection';

const { currentState, updateState } = useSafety();

const handleUserMessage = (message: string) => {
  // Analyze safety
  const analysis = analyzeTextForSafety(message, currentState);
  
  if (analysis.confidence > 0.6 && analysis.suggestedState !== currentState) {
    updateState(
      analysis.suggestedState,
      'conversation_analysis',
      analysis.detectedSignals
    );
  }
  
  // Continue with normal message flow
};
```

##### b) Safety Boundary Messages
**Component:** `/src/app/components/safety/SafetyBoundaryMessage.tsx` (Already exists!)

**Integration:**
- Display boundary messages when state changes
- Show within conversation UI, not as interruption
- Provide context-appropriate guidance
- Include quick access to resources

**UI Placement:**
```
┌─────────────────────────────────┐
│ [AI Avatar Video]              │
│                                 │
│ ⚠️ Safety Boundary Message     │
│ "I notice you're experiencing  │
│  emotional distress. Here are  │
│  resources that might help..." │
│                                 │
│ [View Resources] [Continue]    │
└─────────────────────────────────┘
```

##### c) Resource Display Integration
**Component:** `/src/app/components/safety/SafetyResourceCard.tsx` (Already exists!)

**Triggers:**
- Automatic display when state reaches HIGH_RISK or SAFETY_MODE
- User can request resources at any time
- Resources are state-appropriate
- Quick access to crisis lines

**Flow:**
```
HIGH_RISK detected
      ↓
Boundary message shown
      ↓
"Would you like to see support resources?"
      ↓
[Yes] → Show SafetyResourceCards
[No, continue] → Return to conversation
```

##### d) Conversation Pause/Resume
**Feature:** Allow users to pause conversation when overwhelmed

**Implementation:**
- Add "Take a Break" button in HIGH_RISK+ states
- Pause video feed
- Show grounding exercises or breathing techniques
- Resume when ready

---

### 2. **Trusted Contact System** 🟡 MEDIUM PRIORITY

**Goal:** Allow users to designate trusted contacts who receive simple notifications during SAFETY_MODE.

#### Implementation Areas:

##### a) Trusted Contact Management
**Files:** 
- `/src/app/pages/app/EmergencyContacts.tsx` (Update existing)
- `/src/app/pages/app/PrivacySettings.tsx` (Add toggle)

**Features:**
- Add/edit/remove trusted contacts
- Designate one primary contact
- Set notification preferences
- Enable/disable trusted contact notifications globally

**Data Structure:**
```typescript
interface TrustedContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  relationship: string; // "friend", "family", "therapist", etc.
  isPrimary: boolean;
  notificationsEnabled: boolean;
  preferredMethod: 'sms' | 'email' | 'both';
  consentGiven: boolean;
  addedAt: number;
}
```

##### b) Notification Trigger System
**File:** `/src/app/utils/trustedContactNotifications.ts` (NEW)

**Triggers:**
- SAFETY_MODE state reached
- User explicitly requests contact
- After 24h cooldown, no improvement

**Notification Content:**
```
Subject: [Ezri] Support Request

Hello [Contact Name],

[User Name] has reached out for support through Ezri. 
They may benefit from a check-in when you're available.

This is an automated notification. No immediate action is required.

If you believe [User Name] is in immediate danger, please call emergency services.

- Ezri Safety Team
```

**Privacy Constraints:**
- ❌ No conversation details shared
- ❌ No specific crisis information
- ❌ No user location data
- ✅ Simple "check-in requested" message only

##### c) Notification History & Management
**File:** `/src/app/pages/app/TrustedContactHistory.tsx` (NEW)

**Features:**
- View sent notifications
- Confirm/dismiss follow-up prompts
- Disable specific contacts temporarily
- Review notification settings

---

### 3. **Cooldown Flow & Recovery** 🟢 LOW PRIORITY

**Goal:** Provide structured support after high-risk sessions to help users transition back to normal state.

#### Implementation Areas:

##### a) Post-Session Cooldown Screen
**File:** `/src/app/pages/app/CooldownScreen.tsx` (NEW)

**Triggers:**
- Automatically shown after HIGH_RISK or SAFETY_MODE session ends
- User can skip, but encouraged to complete

**Features:**
- Gentle check-in questions
- Grounding exercises
- Resource recommendations
- Safety plan reminder
- Schedule next session (optional)

**Flow:**
```
Session ends in HIGH_RISK
      ↓
Cooldown screen appears
      ↓
"How are you feeling now?"
      ↓
[Better] → Show grounding exercise → Continue
[Still struggling] → Show resources → Encourage human support
[Skip] → Log skip, show brief reminder
```

##### b) Grounding Exercises
**Component:** `/src/app/components/safety/GroundingExercise.tsx` (NEW)

**Exercises:**
- 5-4-3-2-1 sensory grounding
- Box breathing (4-4-4-4)
- Progressive muscle relaxation
- Mindful observation

**Implementation:**
- Interactive, step-by-step guidance
- Audio/visual cues
- Timer integration
- Progress tracking

##### c) Re-Entry Flow
**File:** `/src/app/pages/app/SessionLobby.tsx` (Update)

**Features:**
- Check-in prompt before next session if previous was high-risk
- "How are you feeling today?" pre-session
- Optional safety plan review
- Resource reminder

**Flow:**
```
User returns after HIGH_RISK session
      ↓
SessionLobby shows check-in
      ↓
"We noticed your last session was challenging."
      ↓
[I'm feeling better] → Proceed to session
[Still struggling] → Show resources, optional delay
[View safety plan] → Navigate to safety plan
```

---

### 4. **Enhanced Resource Integration** 🟡 MEDIUM PRIORITY

**Goal:** Make safety resources more accessible, personalized, and actionable.

#### Implementation Areas:

##### a) Region Detection & Localization
**File:** `/src/app/utils/safetyResources.ts` (Update)

**Features:**
- Detect user region (IP-based or user-set)
- Show region-appropriate resources
- Support multiple countries/regions
- Fallback to general resources

**Regions to Support:**
- United States (current)
- Canada
- United Kingdom
- Australia
- European Union (general)

**Data Structure:**
```typescript
const REGIONAL_RESOURCES: Record<string, SafetyResource[]> = {
  US: [...], // 988, etc.
  CA: [...], // Talk Suicide Canada, etc.
  UK: [...], // Samaritans, etc.
  AU: [...], // Lifeline, etc.
  EU: [...], // Befrienders, etc.
};
```

##### b) Direct Contact Integration
**Component:** `/src/app/components/safety/SafetyResourceCard.tsx` (Update)

**Features:**
- "Call Now" button with tel: link
- "Text Now" button with sms: link
- "Visit Website" button
- Copy phone number to clipboard
- "Mark as Helpful" feedback

##### c) Resource History & Personalization
**File:** `/src/app/utils/resourceHistory.ts` (NEW)

**Features:**
- Track which resources user has viewed/used
- Prioritize previously helpful resources
- Filter by resource type (crisis line, text line, support group)
- Save favorite resources

---

### 5. **User Safety Dashboard** 🟢 LOW PRIORITY

**Goal:** Give users insight into their own safety patterns (with appropriate privacy controls).

#### Implementation Areas:

##### a) Personal Safety Insights
**File:** `/src/app/pages/app/SafetyInsights.tsx` (NEW)

**Features:**
- Number of safety events (abstracted)
- Patterns over time (e.g., "more elevated concerns on weekdays")
- Resource usage history
- Grounding exercise completion

**Privacy Considerations:**
- User can opt-in/out
- Data never leaves user's device (localStorage only)
- User can clear history anytime
- No sharing with admins unless user explicitly consents

##### b) Safety Plan Builder
**File:** `/src/app/pages/app/SafetyPlan.tsx` (Update existing)

**Enhancements:**
- Guided safety plan creation
- Warning signs identification
- Coping strategies library
- Trusted contact quick-add
- Export as PDF

##### c) Wellness Toolkit Integration
**File:** `/src/app/pages/app/WellnessTools.tsx` (Update)

**Add:**
- Grounding exercises
- Breathing techniques
- Mindfulness resources
- Crisis resource quick access
- Self-assessment tools

---

## 🔄 Implementation Order (Recommended)

### Sprint 1: In-Conversation Integration (Weeks 1-2)
1. Add safety detection to ActiveSession
2. Integrate SafetyBoundaryMessage into conversation UI
3. Add resource display on HIGH_RISK trigger
4. Test with Phase 1 mock detection

### Sprint 2: Trusted Contact System (Weeks 3-4)
1. Build contact management interface
2. Implement notification trigger logic
3. Create notification templates
4. Add notification history page
5. Test notification flow (mock delivery)

### Sprint 3: Cooldown & Recovery (Weeks 5-6)
1. Create CooldownScreen component
2. Build grounding exercises
3. Implement re-entry flow in SessionLobby
4. Test full session → cooldown → re-entry flow

### Sprint 4: Enhanced Resources (Week 7)
1. Add region detection
2. Expand resource database
3. Implement direct contact features
4. Add resource personalization

### Sprint 5: User Dashboard (Week 8)
1. Build safety insights page
2. Enhance safety plan builder
3. Integrate wellness toolkit
4. Final testing and documentation

---

## 🛠️ Technical Requirements

### New Dependencies
```json
{
  "react-phone-number-input": "^3.x", // For phone input
  "@react-spring/web": "^9.x",        // For smooth animations
  "recharts": "2.15.2"                // Already installed
}
```

### New Utilities
- `/src/app/utils/trustedContactNotifications.ts`
- `/src/app/utils/resourceHistory.ts`
- `/src/app/utils/regionDetection.ts`
- `/src/app/utils/groundingExercises.ts`

### New Components
- `/src/app/components/safety/GroundingExercise.tsx`
- `/src/app/components/safety/CooldownPrompt.tsx`
- `/src/app/components/safety/ResourceBrowser.tsx`

### New Pages
- `/src/app/pages/app/CooldownScreen.tsx`
- `/src/app/pages/app/SafetyInsights.tsx`
- `/src/app/pages/app/TrustedContactHistory.tsx`

---

## 🧪 Testing Strategy

### Unit Tests
- Safety detection accuracy
- State transition logic
- Notification trigger conditions
- Resource filtering

### Integration Tests
- Full conversation with safety detection
- State changes during active session
- Notification delivery flow
- Cooldown → re-entry flow

### User Acceptance Tests
- User can complete full safety flow
- Resources are accessible and helpful
- Trusted contacts receive notifications
- Privacy controls work as expected

---

## 📊 Success Metrics

### User Engagement
- % of users who complete safety consent
- % of users who add trusted contacts
- Resource view/usage rate
- Grounding exercise completion rate

### Safety Effectiveness
- Average time to de-escalate from HIGH_RISK
- SAFETY_MODE → COOLDOWN transition rate
- User retention after critical events
- Trusted contact notification response rate

### System Performance
- Detection accuracy vs. false positives
- Average response time to state change
- Resource loading time
- Notification delivery success rate

---

## ⚠️ Risks & Mitigation

### Risk 1: Over-Intervention
**Concern:** Too many safety prompts may annoy users
**Mitigation:** 
- User can adjust sensitivity settings
- Limit boundary messages to state changes only
- Allow "Don't show again" for specific messages

### Risk 2: Privacy Violations
**Concern:** Notification content reveals too much
**Mitigation:**
- Strict message templates (no conversation details)
- User must opt-in to trusted contacts
- Clear privacy policy disclosure

### Risk 3: False Positives
**Concern:** Keyword detection triggers on innocent conversation
**Mitigation:**
- Replace mock detection with AI model (future)
- Require multiple signals, not single keyword
- User can report false positive

### Risk 4: Notification Fatigue
**Concern:** Too many notifications to trusted contacts
**Mitigation:**
- Rate limit: max 1 notification per 24h per contact
- User can disable notifications at any time
- Contact can opt-out via link in notification

---

## 🔐 Privacy & Compliance

### HIPAA Considerations
- No PHI (Protected Health Information) in notifications
- Conversation content never stored on server
- User controls all data sharing
- Audit log of notification events

### User Consent
- Explicit opt-in for trusted contact notifications
- Separate consent for safety event logging
- User can revoke consent at any time
- Clear explanation of what's shared

### Data Retention
- Safety events: 30 days max (or user preference)
- Notification history: 90 days
- User can export/delete all data
- Hard delete on account closure

---

## 📚 Documentation Needs

### User Documentation
- Safety feature overview
- How to add trusted contacts
- What notifications contain
- How to use grounding exercises
- Privacy FAQ

### Admin Documentation
- Interpreting safety dashboards
- Responding to critical events
- Notification delivery troubleshooting
- Escalation protocols

### Developer Documentation
- Safety system architecture
- Adding new detection signals
- Extending resource database
- Notification template system

---

## 🎉 Phase 3 Success Criteria

Phase 3 will be complete when:

- [x] Users can experience safety features during conversations
- [x] Trusted contacts can be added and notified
- [x] Cooldown flows help users recover from high-risk sessions
- [x] Resources are easily accessible and regionally appropriate
- [x] User privacy is maintained throughout
- [x] System is fully tested and documented
- [x] Admin team is trained on protocols
- [x] Compliance requirements are met

---

## 🚀 Future Enhancements (Phase 4+)

### AI Model Integration
- Replace keyword detection with trained AI model
- Multi-language support
- Voice tone analysis
- Contextual understanding

### Advanced Analytics
- Predictive risk modeling
- User cluster analysis
- Intervention effectiveness studies
- Long-term outcome tracking

### Therapist Integration
- Escalate to licensed professional
- Video call integration
- Session notes and handoff
- Collaborative safety planning

### Mobile App Features
- GPS-based resource recommendations
- Offline grounding exercises
- Emergency contact quick-dial
- Background safety monitoring

---

**Phase 3 Start Date:** TBD  
**Estimated Duration:** 8 weeks  
**Priority:** High  
**Dependencies:** Phase 1 ✅ Complete, Phase 2 ✅ Complete
