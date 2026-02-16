# Ezri Database Schema - Quick Reference

## 📍 Database Schema Locations

### 1. **Prisma Schema (Ready to Use)** ✅
**Location**: `/backend-starter/api-server/prisma/schema.prisma`
- Complete Prisma schema with all 20+ tables
- Ready for migrations
- TypeScript types will be auto-generated

### 2. **SQL Schema (Reference)** 📖
**Location**: `/EZRI_BACKEND_ARCHITECTURE.md` (Lines 237-850)
- Raw SQL CREATE TABLE statements
- Complete with indexes and RLS policies
- Can be used directly in Supabase SQL Editor

---

## 🚀 How to Use the Schema

### Step 1: Set up Supabase
```bash
# 1. Go to https://supabase.com
# 2. Create a new project
# 3. Get your credentials:
#    - Project URL: https://xxx.supabase.co
#    - Anon Key: eyJ...
#    - Service Role Key: eyJ...
```

### Step 2: Configure Database URL
```bash
cd backend-starter/api-server

# Copy .env.example to .env
cp .env.example .env

# Edit .env and add your Supabase credentials:
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
```

### Step 3: Generate Prisma Client
```bash
# Install Prisma CLI (if not already installed)
npm install

# Generate Prisma Client
npx prisma generate

# This creates TypeScript types in node_modules/@prisma/client
```

### Step 4: Create Migration
```bash
# Create initial migration
npx prisma migrate dev --name init

# This will:
# 1. Create all tables in your Supabase database
# 2. Generate migration files in prisma/migrations/
# 3. Apply the migration to your database
```

### Step 5: View Database
```bash
# Open Prisma Studio (visual database editor)
npx prisma studio

# Opens at http://localhost:5555
# You can view and edit data directly
```

---

## 📊 Database Tables Overview

### Core Tables (20 tables)

#### 👤 **Users & Authentication** (2 tables)
- `users` - User accounts and profiles
- `user_preferences` - User settings and preferences

#### 😊 **Mood & Wellness** (5 tables)
- `mood_entries` - Daily mood tracking
- `journal_entries` - Personal journal entries
- `journal_prompts` - Writing prompts
- `wellness_content` - Meditation, exercises, etc.
- `wellness_progress` - User progress on wellness content

#### 🤖 **AI & Conversations** (3 tables)
- `conversations` - AI conversation sessions
- `conversation_messages` - Individual messages
- `crisis_alerts` - Crisis detection alerts

#### 🆘 **Crisis Management** (1 table)
- `trusted_contacts` - Emergency contacts

#### 🎯 **Goals & Habits** (2 tables)
- `goals` - User goals
- `goal_checkins` - Progress tracking

#### 💰 **Billing** (2 tables)
- `subscriptions` - Stripe subscriptions
- `invoices` - Payment invoices

#### 🔒 **Admin & Analytics** (3 tables)
- `audit_logs` - Admin action logs
- `system_logs` - System error logs
- `analytics_daily` - Daily aggregated metrics

#### 🔔 **Notifications** (1 table)
- `notifications` - User notifications

---

## 🔑 Key Relationships

```
User
├── has one UserPreferences
├── has many MoodEntries
├── has many JournalEntries
├── has many Conversations
│   └── has many ConversationMessages
├── has many CrisisAlerts
├── has many TrustedContacts
├── has many Goals
│   └── has many GoalCheckins
├── has one Subscription
│   └── has many Invoices
├── has many Notifications
└── has many WellnessProgress
```

---

## 📝 Common Prisma Commands

### Database Operations
```bash
# Push schema changes to database (without migration)
npx prisma db push

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations to production
npx prisma migrate deploy

# Reset database (DELETE ALL DATA!)
npx prisma migrate reset

# View database in browser
npx prisma studio
```

### Code Generation
```bash
# Generate Prisma Client (TypeScript types)
npx prisma generate

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

### Introspection (if you have existing database)
```bash
# Pull schema from existing database
npx prisma db pull
```

---

## 💻 Using Prisma in Your Code

### Basic Setup
```typescript
// src/config/database.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
```

### Example Queries
```typescript
import { prisma } from './config/database';

// Create a user
const user = await prisma.user.create({
  data: {
    id: 'uuid-here',
    email: 'user@example.com',
    fullName: 'John Doe',
    role: 'user',
  },
});

// Get user with relations
const userWithData = await prisma.user.findUnique({
  where: { id: 'user-id' },
  include: {
    preferences: true,
    moodEntries: {
      orderBy: { loggedAt: 'desc' },
      take: 10,
    },
    conversations: true,
  },
});

// Create mood entry
const moodEntry = await prisma.moodEntry.create({
  data: {
    userId: 'user-id',
    mood: 'happy',
    moodScore: 8,
    notes: 'Feeling great today!',
    triggers: ['exercise', 'sunshine'],
    activities: ['workout', 'meditation'],
    loggedAt: new Date(),
  },
});

// Update user preferences
await prisma.userPreferences.upsert({
  where: { userId: 'user-id' },
  update: {
    emailNotifications: true,
    pushNotifications: false,
  },
  create: {
    userId: 'user-id',
    emailNotifications: true,
    pushNotifications: false,
  },
});

// Get mood insights
const moodStats = await prisma.moodEntry.aggregate({
  where: {
    userId: 'user-id',
    loggedAt: {
      gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    },
  },
  _avg: {
    moodScore: true,
  },
  _count: true,
});
```

---

## 🔒 Row Level Security (RLS)

After running Prisma migrations, you'll need to set up RLS in Supabase:

### Enable RLS on All Tables
```sql
-- Run in Supabase SQL Editor
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
-- ... repeat for all tables
```

### Example Policies
```sql
-- Users can view their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can view their own mood entries
CREATE POLICY "Users can view own mood entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own mood entries
CREATE POLICY "Users can create own mood entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super')
    )
  );
```

See complete RLS policies in `/EZRI_BACKEND_ARCHITECTURE.md` (lines 760-800)

---

## 📚 Additional Resources

### Documentation
- **Prisma Docs**: https://www.prisma.io/docs
- **Supabase Docs**: https://supabase.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

### Schema Files
- **Prisma Schema**: `/backend-starter/api-server/prisma/schema.prisma`
- **SQL Schema**: `/EZRI_BACKEND_ARCHITECTURE.md` (lines 237-850)
- **Architecture Doc**: `/EZRI_BACKEND_ARCHITECTURE.md`

### Helpful Commands
```bash
# Check Prisma version
npx prisma --version

# Get help
npx prisma --help
npx prisma migrate --help

# Debug Prisma queries (in code)
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

---

## ✅ Next Steps

1. **Create Supabase project** ✅ (You can do this now!)
2. **Add DATABASE_URL to .env** (From Supabase settings)
3. **Run `npx prisma generate`** (Generates TypeScript types)
4. **Run `npx prisma migrate dev --name init`** (Creates tables)
5. **Run `npx prisma studio`** (View your database)
6. **Set up RLS policies in Supabase** (For security)
7. **Start building controllers!** 🚀

---

## 🎯 Database is Ready!

You now have:
- ✅ Complete Prisma schema file
- ✅ All 20+ tables defined
- ✅ TypeScript types (after prisma generate)
- ✅ Relationships configured
- ✅ Ready for migrations

**Location**: `/backend-starter/api-server/prisma/schema.prisma`

Run migrations and start building! 💪
