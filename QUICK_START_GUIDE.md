# 🚀 EZRI AI AVATAR SYSTEM - QUICK START GUIDE

## 📍 WHERE TO FIND EVERYTHING

### **USER PAGES:**
1. **Avatar Selection (Onboarding):**  
   - File: `/src/app/pages/onboarding/AvatarPreferences.tsx`
   - URL: `/onboarding/avatar-preferences`
   - When: During initial signup

2. **Change Avatar (Settings):**  
   - File: `/src/app/pages/app/ChangeAvatar.tsx`
   - URL: `/app/settings/change-avatar`
   - Access: Settings Hub → (need to add link)

3. **Video Session:**  
   - File: `/src/app/pages/app/ActiveSession.tsx`
   - URL: `/app/active-session`
   - Access: Dashboard → Start Session

### **ADMIN PAGES:**
1. **AI Avatar Manager:**  
   - File: `/src/app/pages/admin/AIAvatarManager.tsx`
   - URL: `/admin/ai-avatar-manager`
   - Access: Admin Dashboard sidebar

2. **Conversation Transcripts:**  
   - File: `/src/app/pages/admin/ConversationTranscripts.tsx`
   - URL: `/admin/conversation-transcripts`
   - Access: Admin Dashboard sidebar

---

## ⚡ QUICK TESTING

### **Test Avatar Selection:**
```
1. Go to: http://localhost:5173/onboarding/avatar-preferences
2. Click on Dr. Maya Chen
3. Select a background environment
4. Click "Continue"
```

### **Test Change Avatar:**
```
1. Go to: http://localhost:5173/app/settings/change-avatar
2. Select a different avatar (e.g., Alex Rivera)
3. Click "Switch to Alex Rivera"
4. Confirm the change
5. See switch history updated
```

### **Test Video Session:**
```
1. Go to: http://localhost:5173/app/active-session
2. See AI avatar in main video feed
3. See your camera in picture-in-picture
4. Test mic, camera, sound controls
5. Click "End Session" → Confirm
```

### **Test Admin Avatar Manager:**
```
1. Go to: http://localhost:5173/admin/ai-avatar-manager
2. Click "Create New Avatar"
3. Fill in all fields
4. Click "Create Avatar"
5. See new avatar in list
6. Test Edit, Toggle Active/Inactive, Delete
```

### **Test Admin Transcripts:**
```
1. Go to: http://localhost:5173/admin/conversation-transcripts
2. See list of session transcripts
3. Click on a crisis session (red border)
4. See full conversation with crisis indicators
5. Add admin notes
6. Click "Mark as Reviewed"
7. Click "Export Transcript"
```

---

## 🔧 WHAT NEEDS TO BE ADDED STILL

### **User Frontend:**
- [ ] Add "Change Avatar" link to Settings Hub
  - File: `/src/app/pages/app/SettingsHub.tsx`
  - Add new section with Brain icon

### **Admin Sidebar:**
- [ ] Add "AI Avatar Manager" to admin navigation
  - File: `/src/app/components/AdminLayoutNew.tsx`
  - Add to sidebar menu

- [ ] Add "Conversation Transcripts" to admin navigation
  - File: `/src/app/components/AdminLayoutNew.tsx`
  - Add to sidebar menu

---

## 💡 KEY CONCEPTS

### **4 Default AI Avatars:**
1. Dr. Maya Chen (Female, 35-40) - Anxiety specialist
2. Alex Rivera (Male, 30-35) - Trauma specialist
3. Jordan Taylor (Non-binary, 28-32) - Relationships specialist
4. Sarah Mitchell (Female, 45-50) - Grief specialist

### **User Can:**
- ✅ Select avatar during onboarding
- ✅ Change avatar anytime in settings
- ✅ Have video sessions with AI avatar
- ✅ See their switch history
- ❌ CANNOT see conversation transcripts

### **Admin Can:**
- ✅ Create/edit/delete avatars
- ✅ Enable/disable avatars
- ✅ View all conversation transcripts
- ✅ Flag concerning conversations
- ✅ Detect crisis situations
- ✅ Export transcripts
- ✅ Add admin notes

---

## 🎨 DESIGN TOKENS

### **Avatar Sentiment Colors:**
```css
Positive: green-500/600
Neutral: blue-500/600
Concerning: yellow-500/600
Crisis: red-500/600
```

### **Gradient Patterns:**
```css
Primary: from-purple-500 to-blue-500
Success: from-green-500 to-emerald-600
Danger: from-red-500 to-rose-600
Warning: from-yellow-500 to-orange-500
```

---

## 🐛 TROUBLESHOOTING

### **Issue: Avatar not showing in video session**
**Fix:** Make sure user has selected an avatar during onboarding

### **Issue: Cannot access transcripts**
**Fix:** Transcripts are admin-only, make sure you're logged in as admin

### **Issue: Avatars not showing in Change Avatar page**
**Fix:** Check that avatars are marked as `isActive: true` in data

### **Issue: Routes not working**
**Fix:** Check App.tsx has all routes imported and configured

---

## 📦 DATA PERSISTENCE

### **Current: LocalStorage**
- User's selected avatar: `localStorage.getItem('selectedAvatarId')`
- Avatar switch history: `localStorage.getItem('avatarSwitchHistory')`
- Transcripts: Mock data (in component state)

### **Production: Database**
- Users table: `selectedAvatarId` foreign key
- AIAvatars table: All avatar data
- Transcripts table: All session conversations
- Messages table: Individual messages

---

## 🚀 NEXT INTEGRATION STEPS

### **1. Add to Settings Hub:**
```typescript
// In /src/app/pages/app/SettingsHub.tsx
{
  id: "change-avatar",
  title: "Change AI Therapist",
  description: "Switch to a different AI companion",
  icon: Brain,
  color: "from-blue-500 to-cyan-600",
  route: "/app/settings/change-avatar"
}
```

### **2. Add to Admin Sidebar:**
```typescript
// In /src/app/components/AdminLayoutNew.tsx
{
  name: "AI Avatar Manager",
  path: "/admin/ai-avatar-manager",
  icon: Brain
},
{
  name: "Conversation Transcripts",
  path: "/admin/conversation-transcripts",
  icon: MessageSquare
}
```

### **3. Connect to Backend:**
- Replace mock data with API calls
- Implement real-time transcription
- Add WebRTC for video streaming
- Integrate 3D avatar models
- Connect AI voice services

---

## ✅ FEATURE CHECKLIST

### **User Features:**
- [x] Select AI avatar during onboarding
- [x] Change avatar in settings
- [x] Video session with AI avatar
- [x] Voice-only interaction
- [x] Mic/camera/sound controls
- [x] Session timer
- [x] Connection quality indicator
- [x] End session confirmation
- [ ] Link from Settings Hub to Change Avatar

### **Admin Features:**
- [x] Create AI avatars
- [x] Edit AI avatars
- [x] Delete AI avatars
- [x] Enable/disable avatars
- [x] View all transcripts
- [x] Filter/search transcripts
- [x] Flag transcripts
- [x] Mark as reviewed
- [x] Add admin notes
- [x] Export transcripts
- [x] Crisis detection indicators
- [ ] Add to admin sidebar navigation

---

## 📞 QUICK REFERENCE

### **Files Created:**
```
User Pages:
- /src/app/pages/app/ChangeAvatar.tsx

Admin Pages:
- /src/app/pages/admin/AIAvatarManager.tsx
- /src/app/pages/admin/ConversationTranscripts.tsx
```

### **Files Updated:**
```
- /src/app/pages/onboarding/AvatarPreferences.tsx
- /src/app/pages/app/ActiveSession.tsx
- /src/app/App.tsx (routes + imports)
```

### **Routes Added:**
```
User:
- /app/settings/change-avatar

Admin:
- /admin/ai-avatar-manager
- /admin/conversation-transcripts
```

---

**🎉 YOU'RE READY TO GO! Test all features and prepare for 3D avatar integration!**
