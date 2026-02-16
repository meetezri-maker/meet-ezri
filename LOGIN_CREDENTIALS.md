# Ezri Platform - Quick Login Reference

## 🚀 Quick Summary

### Regular User Login (`/login`)
- **Any email and password works!**
- Example: `user@example.com` / `password123`

### Admin Logins (`/admin/login`)

| Admin Type | Username | Password | Dashboard |
|------------|----------|----------|-----------|
| **Super Admin** | `superadmin` | `super123` | `/admin/dashboard/super` |
| **Org Admin** | `orgadmin` | `org123` | `/admin/dashboard/org` |
| **Team Admin** | `teamadmin` | `team123` | `/admin/dashboard/team` |

---

## 📋 How to Login

### For Regular Users:
1. Go to `/login`
2. Enter ANY email and ANY password
3. Click "Log In"
4. Access the main app dashboard

### For Admins:
1. Go to `/admin/login` OR `/admin/credentials`
2. Select admin type (Super/Org/Team)
3. Enter the specific username and password from table above
4. Access the admin dashboard

---

## 🔗 Quick Links

- **User Login:** [/login](http://localhost:5173/login)
- **Admin Credentials Page:** [/admin/credentials](http://localhost:5173/admin/credentials)
- **Admin Login:** [/admin/login](http://localhost:5173/admin/login)

---

## 💡 Tips

- The **Admin Credentials page** (`/admin/credentials`) shows all admin types with one-click copy buttons
- All authentication is demo-based using localStorage
- No real backend validation - perfect for testing all 80+ screens!
- Try logging in as different admin types to see role-based features

---

**Happy Testing! 🎉**
