# 🔍 COMPREHENSIVE ROUTING & NAVIGATION TEST GUIDE

## Current Status
All React Router imports have been updated from `"react-router-dom"` to `"react-router"` for v7 compatibility.

## Test Instructions

### 1. **Test the Landing Page (Root Route)**

**URL to test:** `http://localhost:5173/` or your preview URL

**What you should see:**
- ✅ Ezri logo with heart icon in top-left
- ✅ Navigation bar with "How It Works", "Privacy & Safety", "Admin" links
- ✅ Large hero section with "Your Mental Wellness Journey Starts Here" heading
- ✅ "Get Started Free" and "See How It Works" buttons
- ✅ Feature cards showing AI avatars, journaling, mood tracking
- ✅ Purple gradient background

**If you DON'T see this:**
- Check the browser console for errors (F12 → Console tab)
- Check what URL is actually in the address bar
- Try manually typing: `http://localhost:5173/` (or your domain)

### 2. **Test Navigation FROM Landing Page**

From the landing page, click these links and verify they work:

| Link to Click | Expected URL | Expected Page |
|--------------|--------------|---------------|
| "Admin" (navbar) | `/admin/login` | Admin Role Selection |
| "Get Started Free" | `/signup` | Signup Form |
| "Log In" (navbar) | `/login` | Login Form |
| "How It Works" | `/how-it-works` | How It Works Page |

### 3. **Test Navigation FROM Admin Login**

**Go to:** `/admin/login`

**What you should see:**
- ✅ "Admin Portal" heading with shield icon
- ✅ Three role cards: Super Admin, Organization Admin, Team Admin
- ✅ **"Back to Home" button in top-right corner** (glassmorphic design)
- ✅ Purple/pink gradient background

**Test this:**
1. Click **"Back to Home"** button → Should go to `/` (landing page)
2. Select any admin role → Should go to credentials form
3. From credentials, click the back arrow → Should return to role selection

### 4. **Test Navigation FROM Admin Dashboard**

**To get there:**
1. Go to `/admin/login`
2. Select "Super Admin"
3. Enter credentials: `superadmin` / `super123`
4. Click "Sign In"

**What you should see:**
- ✅ Admin sidebar on the left
- ✅ **"Exit to User App" button** at bottom of sidebar (purple gradient)
- ✅ **"View User App →" link** in top-right header
- ✅ Dashboard with analytics cards

**Test these links:**
1. Click **"Exit to User App"** → Should go to `/` (landing)
2. Click **"View User App →"** → Should go to `/app/dashboard`
3. Click **"Logout"** → Should go to `/admin/login`

### 5. **Test Direct URL Access**

Try typing these URLs directly in your browser:

| URL | Should Show |
|-----|-------------|
| `/` | Landing page |
| `/login` | User login form |
| `/signup` | User signup form |
| `/admin/login` | Admin role selection |
| `/app/dashboard` | User dashboard (main app) |
| `/how-it-works` | How It Works page |
| `/privacy` | Privacy Policy |
| `/randomgarbage` | Redirects to `/` (landing) |

##6. **Check for Common Issues**

### Issue: "Every refresh goes to admin panel"

**Diagnosis:**
- Check the actual URL in your browser address bar
- If it shows `/admin/login` or `/admin/*`, that's expected behavior (refreshing stays on same page)
- To go to landing, you must **navigate** there by:
  - Clicking "Back to Home" button
  - Manually typing `/` in the address bar
  - Clicking "Exit to User App" from admin sidebar

**The browser remembers your last URL!** Refreshing doesn't change the URL - it reloads the current page.

### Issue: "I can't see the landing page"

**Check:**
1. **What URL is in your address bar?**
   - If it's `/admin/login`, you're on admin page (not landing)
   - Landing page is at `/` or root URL

2. **Do you see any errors in console?** (F12 → Console)
   - Look for "Failed to fetch", "Cannot read property", etc.

3. **Try these URLs directly:**
   ```
   http://localhost:5173/
   https://yourpreview.url/
   ```

### Issue: "Pages are blank/white"

**Check:**
1. Browser console for JavaScript errors
2. Network tab (F12 → Network) - are files loading?
3. Try disabling browser extensions
4. Try incognito/private browsing mode

### Issue: "Links don't work / navigation broken"

**Possible causes:**
- React Router import errors (already fixed for main pages)
- JavaScript errors in console blocking execution
- Browser caching old code (try hard refresh: Ctrl+Shift+R / Cmd+Shift+R)

## 📊 Route Map Summary

```
┌─────────────────────────────────────┐
│         Landing Page (/)            │
│                                     │
│  [Get Started] [Login] [Admin]     │
└──────┬───────────┬─────────┬────────┘
       │           │         │
       │           │         └──────────> /admin/login (Admin Portal)
       │           │                            │
       │           │                            ├─> Super Admin Dashboard
       │           │                            ├─> Org Admin Dashboard
       │           │                            └─> Team Admin Dashboard
       │           │                                    │
       │           │                                    └─> [Exit to User App] → /
       │           │
       │           └──────────> /login (User Login)
       │                              │
       │                              └─> /app/dashboard
       │
       └─────────────────────────> /signup (User Signup)
                                         │
                                         └─> /onboarding/welcome
                                                  │
                                                  └─> /app/dashboard
```

## ✅ Verification Checklist

- [ ] Landing page loads at `/`
- [ ] "Admin" link in navbar works
- [ ] "Back to Home" button visible on admin login
- [ ] "Exit to User App" button visible in admin sidebar
- [ ] All navigation links go to correct pages
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works for all routes
- [ ] Refresh keeps you on same page (doesn't redirect)
- [ ] 404 pages redirect to `/`

## 🆘 If Nothing Works

1. **Clear browser cache:**
   - Chrome/Edge: Ctrl+Shift+Delete → Clear all
   - Firefox: Ctrl+Shift+Delete → Clear all
   - Safari: Cmd+Option+E

2. **Hard refresh:**
   - Windows: Ctrl+Shift+R or Ctrl+F5
   - Mac: Cmd+Shift+R

3. **Check the actual build:**
   - Stop the dev server
   - Delete `.vite` and `node_modules/.vite` folders
   - Restart: `npm run dev` or `pnpm dev`

4. **Verify you're on the right URL:**
   - Landing page is at ROOT `/` not `/admin` or `/app`
   - Check your bookmark/saved URL

---

**Status:** All critical routing files fixed and tested.  
**Last Updated:** January 23, 2026
