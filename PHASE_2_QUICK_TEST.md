# ⚡ **PHASE 2 QUICK TEST CHECKLIST**
## 5-Minute Validation Guide

---

## 🎯 **QUICK NAVIGATION**

```
Dashboard → Journal → Export (Feature 1)
Dashboard → Wellness → Use with Ezri (Feature 2)
Dashboard → Start Session → Active Session (Features 3 & 4)
```

---

## ⚡ **1-MINUTE TEST: JOURNAL EXPORT**

**Route:** `/app/journal`

1. ✅ Click "Export Journal" button (top-right)
2. ✅ Modal appears with download icon
3. ✅ Click "PDF" → Click "JSON" (toggle works)
4. ✅ Select "Last 30 days"
5. ✅ Click "Export Now"
6. ✅ Loading spinner appears
7. ✅ Success screen shows with checkmark
8. ✅ File downloads (check your Downloads folder)
9. ✅ Click "Export Another" → Returns to form

**Pass/Fail:** ⬜

---

## ⚡ **2-MINUTE TEST: EZRI GUIDED MODE**

**Route:** `/app/wellness`

1. ✅ Find "Breathing Exercise" card
2. ✅ Click "Use with Ezri" button
3. ✅ Modal opens with Ezri avatar (👨‍⚕️)
4. ✅ Click "Start Session"
5. ✅ Timer starts: 0:00 → 0:01 → 0:02...
6. ✅ First guidance message appears immediately
7. ✅ Avatar glows and pulses
8. ✅ Wait 30 seconds → Second guidance message
9. ✅ Progress bar fills gradually
10. ✅ Click "Skip to End"
11. ✅ Completion screen shows with stats
12. ✅ Click "Practice Again" → Resets to intro

**Pass/Fail:** ⬜

---

## ⚡ **2-MINUTE TEST: SESSION INTERRUPTION + RECOVERY**

**Route:** `/app/active-session`

### **Part A: Connection Monitor (Feature 4)**
1. ✅ Look at top-right corner
2. ✅ Green badge visible: "Excellent" + latency
3. ✅ 4 signal bars visible
4. ✅ Wait ~5 seconds for latency changes
5. ✅ Badge may turn blue ("Good") or yellow ("Fair")
6. ✅ If yellow, warning toast appears below
7. ✅ If orange ("Poor"), auto-recovery starts
8. ✅ Spinning icon + cyan recovery toast
9. ✅ After 3s, returns to "Good" with green success toast
10. ✅ Recovery count shows: "(1 recovered)"

**Pass/Fail:** ⬜

### **Part B: Session Interruption (Feature 3)**
1. ✅ Wait 30 seconds on active session page
2. ✅ Interruption modal appears
3. ✅ WiFi-off icon pulsing
4. ✅ "Transcript Saved" changes from yellow to green (1s)
5. ✅ "Reconnect Attempts" shows 0/5
6. ✅ Click "Reconnect"
7. ✅ Countdown: 3... 2... 1...
8. ✅ Modal closes after 3 seconds
9. ✅ Session resumes normally
10. ✅ Timer continues from where it paused

**Pass/Fail:** ⬜

---

## 🎨 **VISUAL CHECKS**

### **Animations:**
- [ ] All modals slide in smoothly
- [ ] No stuttering or lag
- [ ] Avatar floats naturally
- [ ] Progress bars fill smoothly
- [ ] Countdowns are accurate
- [ ] Toasts slide in from right

### **Colors:**
- [ ] Purple/pink gradients for primary actions
- [ ] Green for success states
- [ ] Yellow/orange for warnings
- [ ] Red for errors/interruptions
- [ ] Cyan/blue for recovery

### **Responsiveness:**
- [ ] Modals are centered
- [ ] Text is readable
- [ ] Buttons are large enough
- [ ] No content overflow
- [ ] Proper spacing

---

## 🔍 **CONSOLE CHECK**

**Open Browser Console (F12):**
- [ ] No red errors
- [ ] No 404s or network failures
- [ ] No "undefined" warnings
- [ ] localStorage updates visible

---

## ⚡ **1-MINUTE STRESS TEST**

**Test Rapid Interactions:**

1. Open/close journal export modal 5 times fast
2. Toggle PDF/JSON rapidly 10 times
3. Start/stop guided mode 3 times
4. Spam reconnect button (should be disabled during countdown)
5. Hover over connection badge repeatedly

**Expected:** No crashes, clean behavior, disabled states work

**Pass/Fail:** ⬜

---

## 📊 **QUICK RESULTS**

Fill this out after testing:

```
✅ Feature 1 (Journal Export):     ⬜ PASS  ⬜ FAIL
✅ Feature 2 (Guided Mode):        ⬜ PASS  ⬜ FAIL
✅ Feature 3 (Interruption):       ⬜ PASS  ⬜ FAIL
✅ Feature 4 (Recovery):           ⬜ PASS  ⬜ FAIL

Overall Phase 2 Quality:           ⬜ PASS  ⬜ FAIL

Issues Found: ___________________________________

____________________________________________

____________________________________________
```

---

## 🚀 **IF ALL PASS:**

**You're ready for Phase 3!** 🎉

Proceed to:
- **Phase 3: Admin Portal Enhancement**
  - Crisis Event Management
  - User Behavior Analytics
  - Content Management System

---

## 🐛 **IF ISSUES FOUND:**

**Common Quick Fixes:**

1. **Modal not opening?**
   - Check browser console for errors
   - Verify route is correct
   - Refresh page

2. **Timer not starting?**
   - Check if isPaused state is stuck
   - Refresh page and retry

3. **File not downloading?**
   - Check browser download settings
   - Look in default download folder
   - Try different browser

4. **Animations stuttering?**
   - Close other browser tabs
   - Disable browser extensions
   - Check CPU usage

5. **Connection badge not appearing?**
   - Ensure you're on `/app/active-session`
   - Check z-index conflicts
   - Refresh page

---

## 📝 **TESTING TIPS**

- **Browser:** Use Chrome/Edge for best results
- **Clear Cache:** Shift+F5 to force refresh
- **Console:** Keep F12 open during testing
- **Network Tab:** Check for failed requests
- **Mobile:** Test on actual device if possible

---

## ⏱️ **TIME ESTIMATE**

- **Quick Test:** 5-7 minutes
- **Full Test:** 15-20 minutes (see PHASE_2_TESTING_GUIDE.md)
- **Stress Test:** +3 minutes

**Total:** ~10 minutes for thorough validation

---

**Happy Testing!** 🧪✨

**Next:** Phase 3 when ready! 🚀
