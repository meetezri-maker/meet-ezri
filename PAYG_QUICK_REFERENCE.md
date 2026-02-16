# 💰 PAYG System - Quick Reference Guide

## Where to Find Everything

### 🎯 Checking PAYG Revenue & Transactions

**Route**: `/admin/payg-transactions`

**How to Access**:
1. Login to admin at `/admin`
2. Click **"Billing & Revenue"** in sidebar
3. Click **"PAYG Transactions"** 

**OR**

1. Go to **"Package Manager"**
2. Click the **PAYG Revenue card** (amber colored, top right)

---

### ⚙️ Configuring PAYG Rates

**Route**: `/admin/package-manager`

**How to Access**:
1. Login to admin at `/admin`
2. Click **"Billing & Revenue"** in sidebar  
3. Click **"Package Manager"**

**OR**

1. Go to **"PAYG Transactions"** page
2. Click **"Configure PAYG Rates"** button (top right)

**What You Can Set**:
- Monthly subscription price (e.g., Basic = $25)
- Minutes per month (e.g., Basic = 200 minutes)
- **Pay-As-You-Go rate** (e.g., Basic = $0.25/minute)

---

## 🔍 Quick Answers to Your Questions

### "How much money are we making from PAYG?"
→ Go to `/admin/payg-transactions`  
→ See **"Total PAYG Revenue"** card (green, top left)

### "Which customers are buying PAYG?"
→ Go to `/admin/payg-transactions`  
→ Scroll to **"Top PAYG Customers"** section  
→ Or search in the transaction table below

### "How do I set the price for PAYG minutes?"
→ Go to `/admin/package-manager`  
→ Click **"Edit"** on any plan card  
→ Change **"Pay-As-You-Go Rate ($ per minute)"**  
→ Click **"Save Changes"**

### "Can I see individual transactions?"
→ Go to `/admin/payg-transactions`  
→ Scroll to bottom for full transaction table  
→ Use search box to find specific customers  
→ Use filters to narrow by plan or date

### "How do I export PAYG data?"
→ Go to `/admin/payg-transactions`  
→ Click **"Export Data"** button (top right)  
→ CSV file downloads with all transaction details

---

## 📊 Current PAYG Rates (Default)

| Plan | PAYG Rate | Notes |
|------|-----------|-------|
| **Free Trial** | ❌ Not Available | Must upgrade to buy PAYG |
| **Basic** | $0.25/min | Standard rate |
| **Pro** | $0.15/min | 40% cheaper than Basic |
| **Enterprise** | $0.10/min | 60% cheaper than Basic |

*You can change these rates in Package Manager*

---

## 🎯 What Each Page Shows

### PAYG Transactions (`/admin/payg-transactions`)
**Purpose**: Track all PAYG purchases and revenue

**What You See**:
- 💰 Total PAYG revenue (with growth %)
- 👥 Number of customers buying PAYG
- ⏱️ Total minutes sold
- 📈 Average purchase amount
- 🏆 Top customers by spending
- 💳 Full transaction table

**Filters Available**:
- Time: Today / Last 7 Days / Last 30 Days / All Time
- Plan: All / Basic / Pro / Enterprise  
- Search: By customer name, email, or transaction ID

---

### Package Manager (`/admin/package-manager`)
**Purpose**: Configure subscription plans and PAYG pricing

**What You See**:
- 📦 All 4 plan tiers (Free/Basic/Pro/Enterprise)
- 💵 Monthly price for each plan
- ⏰ Minutes included per month
- ⚡ PAYG rate per minute (when credits run out)
- 📊 Current subscriber counts
- 💰 Revenue per plan

**What You Can Edit**:
- Monthly subscription price
- Minutes per month allocation
- **PAYG rate** ($ per minute for extra minutes)

---

## 🎨 Visual Cues

### In PAYG Transactions Page:
- **Green card** = Total revenue
- **Blue card** = Unique customers  
- **Purple card** = Total minutes
- **Amber card** = Average purchase
- **Gold/Silver/Bronze badges** = Top 3 customers

### In Package Manager:
- **Amber PAYG Revenue card** = Clickable, links to transactions
- **Plan cards** = Color-coded by tier (Gray/Blue/Purple/Amber)
- **Purple badge** = "POPULAR" on Pro plan
- **Edit button** = Top right of each plan card

---

## ⚡ Pro Tips

1. **Want quick PAYG overview?**  
   → Click the amber PAYG Revenue card in Package Manager

2. **Looking for a specific customer's purchases?**  
   → Use the search box in PAYG Transactions table

3. **Want to see which plan generates most PAYG revenue?**  
   → Check "Revenue by Plan Tier" section

4. **Need to adjust pricing for all tiers?**  
   → Edit each plan in Package Manager, save individually

5. **Want historical data?**  
   → Export to CSV and analyze in Excel/Google Sheets

---

## 🚨 Important Notes

⚠️ **Free trial users CANNOT buy PAYG credits**  
→ This is intentional - encourages them to upgrade to a paid plan

⚠️ **PAYG rate changes take effect immediately**  
→ Applies to NEW purchases only (not retroactive)

⚠️ **Monthly credits reset each billing cycle**  
→ PAYG credits do NOT reset - they roll over until used

⚠️ **Better PAYG rates for higher tiers**  
→ Incentivizes customers to upgrade (Pro/Enterprise get discounts)

---

## 📍 Navigation Paths

```
Admin Dashboard
├── Billing & Revenue
│   ├── Billing Overview
│   ├── Subscriptions
│   ├── Package Manager ⚙️ (Configure PAYG rates here)
│   └── PAYG Transactions ⚡ (View revenue & transactions here)
```

---

## 🆘 Troubleshooting

**Q: I don't see the PAYG Transactions link**  
A: Make sure you're logged in as Super Admin or Org Admin (not Team Admin)

**Q: No transactions showing up**  
A: Check your time filter (try "All Time") and plan filter (try "All Plans")

**Q: Can't edit PAYG rates**  
A: Make sure you clicked "Edit" button on the plan card first

**Q: Changes not saving**  
A: Click the green "Save Changes" button after editing

**Q: Export button not working**  
A: Currently shows alert (in production, will generate CSV download)

---

## 🎓 Understanding the Data

### PAYG Purchase Flow:
1. User runs out of monthly credits
2. User clicks "Buy More Minutes" in their billing page
3. User enters how many minutes to buy
4. Price calculated: `minutes × PAYG rate for their plan`
5. Payment processed
6. Minutes added to account
7. **Transaction appears in your admin dashboard** ✅

### Revenue Breakdown:
- **Subscription Revenue** = Monthly recurring (e.g., $25/month for Basic)
- **PAYG Revenue** = Extra minute purchases (varies by usage)
- **Total Revenue** = Subscription + PAYG

The PAYG system helps you track the "PAYG Revenue" portion specifically.

---

**Need More Help?**  
See `/PAYG_SYSTEM_COMPLETE.md` for full documentation.

---

**Last Updated**: January 23, 2026  
**Quick Reference**: v1.0
