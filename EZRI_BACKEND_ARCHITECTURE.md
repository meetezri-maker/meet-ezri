# Ezri Backend Architecture - Complete Framework

## 🏗️ Technology Stack Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  API SERVER (Node.js v20)                                   │
│  ├── Framework: Express.js / Fastify                        │
│  ├── Language: TypeScript                                   │
│  ├── Runtime: Node.js v20 LTS                               │
│  └── Port: 3001                                             │
│                                                             │
│  AI SERVICE (Python 3.11+)                                  │
│  ├── Framework: FastAPI / Flask                             │
│  ├── Language: Python 3.11+                                 │
│  ├── AI/ML: OpenAI, Anthropic, HuggingFace                  │
│  └── Port: 8000                                             │
│                                                             │
│  DATABASE (Supabase)                                        │
│  ├── Type: PostgreSQL 15+                                   │
│  ├── ORM: Prisma (Node.js) / SQLAlchemy (Python)           │
│  ├── Real-time: Supabase Realtime                          │
│  └── Storage: Supabase Storage (Files/Media)               │
│                                                             │
│  AUTHENTICATION                                             │
│  ├── Provider: Supabase Auth                                │
│  ├── Methods: Email/Password, OAuth, Magic Links           │
│  ├── JWT: Supabase JWT tokens                              │
│  └── Session: Supabase Session Management                  │
│                                                             │
│  PAYMENTS                                                   │
│  ├── Provider: Stripe                                       │
│  ├── Features: Subscriptions, Invoices, Webhooks           │
│  └── API Version: Latest Stripe API                        │
│                                                             │
│  REAL-TIME COMMUNICATION                                    │
│  ├── Protocol: WebSocket (Socket.io)                        │
│  ├── Use Cases: AI Voice, Crisis Alerts, Notifications     │
│  └── Port: 3002                                             │
│                                                             │
│  ADDITIONAL SERVICES                                        │
│  ├── Redis: Caching & Session Storage                      │
│  ├── Bull: Job Queue (emails, notifications)               │
│  ├── SendGrid/Resend: Email Service                        │
│  ├── Twilio: SMS/Voice (Crisis alerts)                     │
│  └── CloudWatch/Sentry: Monitoring & Error Tracking        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
ezri-backend/
│
├── api-server/                    # Node.js API Server
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts       # Supabase/Prisma config
│   │   │   ├── redis.ts          # Redis connection
│   │   │   ├── stripe.ts         # Stripe config
│   │   │   └── environment.ts    # Environment variables
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts           # JWT verification
│   │   │   ├── rbac.ts           # Role-based access control
│   │   │   ├── errorHandler.ts   # Global error handler
│   │   │   ├── rateLimiter.ts    # Rate limiting
│   │   │   ├── validator.ts      # Request validation
│   │   │   └── logger.ts         # Request logging
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts    # Authentication endpoints
│   │   │   ├── users.routes.ts   # User management
│   │   │   ├── mood.routes.ts    # Mood tracking
│   │   │   ├── journal.routes.ts # Journal entries
│   │   │   ├── wellness.routes.ts # Wellness content
│   │   │   ├── goals.routes.ts   # Goals & habits
│   │   │   ├── crisis.routes.ts  # Crisis management
│   │   │   ├── admin.routes.ts   # Admin operations
│   │   │   ├── billing.routes.ts # Stripe billing
│   │   │   ├── analytics.routes.ts # Analytics
│   │   │   └── ai.routes.ts      # AI proxy endpoints
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── mood.controller.ts
│   │   │   ├── journal.controller.ts
│   │   │   ├── wellness.controller.ts
│   │   │   ├── goals.controller.ts
│   │   │   ├── crisis.controller.ts
│   │   │   ├── admin.controller.ts
│   │   │   ├── billing.controller.ts
│   │   │   └── analytics.controller.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts    # Auth business logic
│   │   │   ├── user.service.ts    # User operations
│   │   │   ├── mood.service.ts    # Mood tracking logic
│   │   │   ├── journal.service.ts # Journal logic
│   │   │   ├── crisis.service.ts  # Crisis detection/alerts
│   │   │   ├── notification.service.ts # Push/email/SMS
│   │   │   ├── billing.service.ts # Stripe integration
│   │   │   ├── analytics.service.ts # Analytics calculations
│   │   │   ├── cache.service.ts   # Redis caching
│   │   │   └── ai-proxy.service.ts # Proxy to Python AI
│   │   │
│   │   ├── models/               # Prisma schema types
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── express.d.ts      # Express type extensions
│   │   │   ├── api.types.ts      # API request/response types
│   │   │   ├── user.types.ts
│   │   │   ├── mood.types.ts
│   │   │   └── crisis.types.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.ts         # Winston/Pino logger
│   │   │   ├── validation.ts     # Zod/Joi validators
│   │   │   ├── encryption.ts     # Data encryption
│   │   │   ├── jwt.ts            # JWT helpers
│   │   │   └── helpers.ts        # Common utilities
│   │   │
│   │   ├── jobs/                 # Bull queue jobs
│   │   │   ├── email.job.ts
│   │   │   ├── notification.job.ts
│   │   │   ├── analytics.job.ts
│   │   │   └── cleanup.job.ts
│   │   │
│   │   ├── websocket/
│   │   │   ├── index.ts          # Socket.io setup
│   │   │   ├── handlers.ts       # Event handlers
│   │   │   └── rooms.ts          # Room management
│   │   │
│   │   ├── app.ts                # Express app setup
│   │   └── server.ts             # Server entry point
│   │
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── migrations/           # Database migrations
│   │   └── seed.ts               # Seed data
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── .env.example
│   ├── .env.local
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── ai-service/                    # Python AI Service
│   ├── app/
│   │   ├── main.py               # FastAPI app entry
│   │   │
│   │   ├── config/
│   │   │   ├── settings.py       # Environment config
│   │   │   └── database.py       # DB connection
│   │   │
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── endpoints/
│   │   │   │   │   ├── conversation.py  # AI conversation
│   │   │   │   │   ├── sentiment.py     # Sentiment analysis
│   │   │   │   │   ├── crisis.py        # Crisis detection
│   │   │   │   │   ├── voice.py         # Voice processing
│   │   │   │   │   └── insights.py      # AI insights
│   │   │   │   └── router.py
│   │   │   └── deps.py           # Dependencies
│   │   │
│   │   ├── core/
│   │   │   ├── ai_models.py      # AI model management
│   │   │   ├── prompts.py        # System prompts
│   │   │   ├── safety.py         # Safety detection
│   │   │   └── embeddings.py     # Vector embeddings
│   │   │
│   │   ├── models/
│   │   │   ├── conversation.py   # Data models
│   │   │   ├── sentiment.py
│   │   │   └── crisis.py
│   │   │
│   │   ├── services/
│   │   │   ├── openai_service.py   # OpenAI integration
│   │   │   ├── anthropic_service.py # Claude integration
│   │   │   ├── voice_service.py     # Voice synthesis
│   │   │   ├── transcription_service.py # Speech-to-text
│   │   │   ├── sentiment_service.py # Sentiment analysis
│   │   │   └── crisis_service.py    # Crisis detection ML
│   │   │
│   │   ├── utils/
│   │   │   ├── logger.py
│   │   │   ├── validators.py
│   │   │   └── helpers.py
│   │   │
│   │   └── websocket/
│   │       ├── manager.py        # WebSocket manager
│   │       └── handlers.py       # WS event handlers
│   │
│   ├── tests/
│   │   ├── test_conversation.py
│   │   ├── test_crisis.py
│   │   └── test_sentiment.py
│   │
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── .env.example
│   └── README.md
│
├── shared/                        # Shared types/utilities
│   ├── types/
│   │   └── common.types.ts
│   └── constants/
│       └── index.ts
│
├── docker/
│   ├── api-server.Dockerfile
│   ├── ai-service.Dockerfile
│   └── nginx.Dockerfile
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### **Core Tables**

```sql
-- =====================================================
-- USERS & AUTHENTICATION
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin', 'super'
  
  -- Onboarding
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INT DEFAULT 1,
  selected_avatar VARCHAR(50), -- 'avatar-1', 'avatar-2', etc.
  
  -- Preferences
  timezone VARCHAR(50) DEFAULT 'UTC',
  language VARCHAR(10) DEFAULT 'en',
  theme VARCHAR(20) DEFAULT 'light',
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'suspended', 'deleted'
  last_active_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- User preferences
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Notifications
  email_notifications BOOLEAN DEFAULT TRUE,
  push_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  
  -- Privacy
  data_sharing BOOLEAN DEFAULT FALSE,
  analytics_tracking BOOLEAN DEFAULT TRUE,
  
  -- Wellness
  daily_reminder_time TIME,
  mood_check_frequency VARCHAR(50) DEFAULT 'daily',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- =====================================================
-- MOOD TRACKING
-- =====================================================

CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  mood VARCHAR(50) NOT NULL, -- 'very_happy', 'happy', 'neutral', 'sad', 'very_sad', 'anxious', 'angry'
  mood_score INT CHECK (mood_score BETWEEN 1 AND 10),
  
  notes TEXT,
  triggers TEXT[], -- Array of trigger keywords
  activities TEXT[], -- Activities performed
  
  -- Context
  weather VARCHAR(50),
  location VARCHAR(255),
  
  -- Timestamp
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes
  INDEX idx_mood_user_date (user_id, logged_at DESC)
);

-- =====================================================
-- JOURNAL ENTRIES
-- =====================================================

CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  title VARCHAR(500),
  content TEXT NOT NULL,
  
  -- Categorization
  mood VARCHAR(50),
  tags TEXT[],
  prompt_id UUID, -- If using a prompt
  
  -- Privacy
  is_private BOOLEAN DEFAULT TRUE,
  
  -- AI Analysis
  sentiment_score DECIMAL(3,2), -- -1.0 to 1.0
  analyzed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_journal_user_date (user_id, created_at DESC)
);

-- Journal prompts
CREATE TABLE public.journal_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  prompt TEXT NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  
  is_active BOOLEAN DEFAULT TRUE,
  usage_count INT DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AI CONVERSATIONS
-- =====================================================

CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  session_id VARCHAR(255) UNIQUE NOT NULL,
  avatar_id VARCHAR(50) NOT NULL,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'ended', 'paused'
  
  -- Safety
  safety_state VARCHAR(50) DEFAULT 'NORMAL', -- 'NORMAL', 'ELEVATED_CONCERN', 'HIGH_RISK', 'SAFETY_MODE'
  crisis_detected BOOLEAN DEFAULT FALSE,
  crisis_timestamp TIMESTAMP WITH TIME ZONE,
  
  -- Duration
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_conv_user_date (user_id, started_at DESC),
  INDEX idx_conv_session (session_id)
);

-- Conversation messages
CREATE TABLE public.conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  
  role VARCHAR(50) NOT NULL, -- 'user', 'assistant', 'system'
  content TEXT NOT NULL,
  
  -- Voice
  audio_url TEXT,
  transcript TEXT,
  
  -- AI metadata
  model VARCHAR(100),
  tokens_used INT,
  
  -- Safety
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_msg_conversation (conversation_id, timestamp ASC)
);

-- =====================================================
-- CRISIS MANAGEMENT
-- =====================================================

CREATE TABLE public.crisis_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  
  -- Alert details
  severity VARCHAR(50) NOT NULL, -- 'low', 'medium', 'high', 'critical'
  trigger_type VARCHAR(100) NOT NULL, -- 'self_harm', 'suicide', 'violence', etc.
  
  detected_signals TEXT[], -- Array of detected keywords/patterns
  context TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'reviewed', 'resolved', 'escalated'
  
  -- Admin handling
  assigned_to UUID REFERENCES public.users(id),
  reviewed_by UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  
  -- Actions taken
  resources_shown BOOLEAN DEFAULT FALSE,
  contacts_notified BOOLEAN DEFAULT FALSE,
  emergency_contacted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  
  INDEX idx_crisis_user (user_id, created_at DESC),
  INDEX idx_crisis_status (status, severity)
);

-- Trusted contacts
CREATE TABLE public.trusted_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  relationship VARCHAR(100),
  
  phone VARCHAR(50),
  email VARCHAR(255),
  
  notify_on_crisis BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_trusted_user (user_id)
);

-- =====================================================
-- WELLNESS CONTENT
-- =====================================================

CREATE TABLE public.wellness_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  type VARCHAR(50) NOT NULL, -- 'meditation', 'breathing', 'exercise', 'article'
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content TEXT,
  
  -- Media
  audio_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  
  duration_minutes INT,
  difficulty VARCHAR(50), -- 'beginner', 'intermediate', 'advanced'
  
  tags TEXT[],
  category VARCHAR(100),
  
  is_published BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_wellness_type (type, is_published)
);

-- User wellness progress
CREATE TABLE public.wellness_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES public.wellness_content(id) ON DELETE CASCADE,
  
  status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'completed'
  progress_percentage INT DEFAULT 0,
  
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  UNIQUE(user_id, content_id)
);

-- =====================================================
-- GOALS & HABITS
-- =====================================================

CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  title VARCHAR(500) NOT NULL,
  description TEXT,
  
  category VARCHAR(100), -- 'mental_health', 'physical_health', 'social', 'professional'
  
  -- Timeline
  target_date DATE,
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'paused', 'abandoned'
  progress_percentage INT DEFAULT 0,
  
  -- Frequency (for habit tracking)
  frequency VARCHAR(50), -- 'daily', 'weekly', 'monthly'
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  INDEX idx_goals_user_status (user_id, status)
);

-- Goal check-ins
CREATE TABLE public.goal_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE,
  
  completed BOOLEAN DEFAULT TRUE,
  notes TEXT,
  mood VARCHAR(50),
  
  checked_in_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- BILLING & SUBSCRIPTIONS
-- =====================================================

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Stripe
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  
  -- Plan
  plan VARCHAR(50) NOT NULL, -- 'free', 'basic', 'pro', 'enterprise'
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'past_due', 'canceled', 'unpaid'
  
  -- Pricing
  amount DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'usd',
  interval VARCHAR(50), -- 'month', 'year'
  
  -- Dates
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_sub_user (user_id),
  INDEX idx_sub_stripe (stripe_subscription_id)
);

-- Invoices
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  stripe_invoice_id VARCHAR(255) UNIQUE,
  
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'usd',
  status VARCHAR(50), -- 'draft', 'open', 'paid', 'uncollectible', 'void'
  
  invoice_pdf_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- ADMIN & ANALYTICS
-- =====================================================

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  actor_id UUID REFERENCES public.users(id),
  actor_email VARCHAR(255),
  actor_role VARCHAR(50),
  
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_id UUID,
  
  -- Details
  changes JSONB,
  metadata JSONB,
  
  ip_address INET,
  user_agent TEXT,
  
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_audit_actor (actor_id, timestamp DESC),
  INDEX idx_audit_action (action, timestamp DESC)
);

-- System logs
CREATE TABLE public.system_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  level VARCHAR(50) NOT NULL, -- 'info', 'warn', 'error', 'critical'
  service VARCHAR(100) NOT NULL, -- 'api', 'ai-service', 'websocket'
  
  message TEXT NOT NULL,
  error_stack TEXT,
  
  metadata JSONB,
  
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_system_level (level, timestamp DESC)
);

-- Analytics snapshots (daily aggregates)
CREATE TABLE public.analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  date DATE NOT NULL UNIQUE,
  
  -- User metrics
  total_users INT DEFAULT 0,
  active_users INT DEFAULT 0,
  new_users INT DEFAULT 0,
  
  -- Engagement
  total_sessions INT DEFAULT 0,
  total_conversations INT DEFAULT 0,
  avg_session_duration_minutes DECIMAL(10,2),
  
  -- Mood
  total_mood_entries INT DEFAULT 0,
  avg_mood_score DECIMAL(3,2),
  
  -- Crisis
  total_crisis_alerts INT DEFAULT 0,
  
  -- Revenue
  mrr DECIMAL(10,2) DEFAULT 0,
  new_subscriptions INT DEFAULT 0,
  canceled_subscriptions INT DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  type VARCHAR(100) NOT NULL, -- 'info', 'warning', 'success', 'crisis'
  title VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  
  -- Channels
  sent_via TEXT[], -- ['push', 'email', 'sms']
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  metadata JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  INDEX idx_notif_user_unread (user_id, is_read, created_at DESC)
);

-- =====================================================
-- COMMUNITY (OPTIONAL)
-- =====================================================

CREATE TABLE public.community_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  category VARCHAR(100),
  visibility VARCHAR(50) DEFAULT 'public', -- 'public', 'private'
  
  member_count INT DEFAULT 0,
  
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.community_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  
  -- Moderation
  status VARCHAR(50) DEFAULT 'published', -- 'draft', 'published', 'flagged', 'removed'
  flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  
  -- Engagement
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_alerts ENABLE ROW LEVEL SECURITY;
-- ... etc for all tables

-- Example policies (users can only access their own data)
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own mood entries" ON public.mood_entries
  FOR SELECT USING (auth.uid() = user_id);

-- Admin policies (admins can view all)
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    auth.jwt()->>'role' IN ('admin', 'super')
  );

-- ... more RLS policies for each table
```

---

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│              AUTHENTICATION ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────┘

1. USER SIGNS UP/LOGS IN
        ↓
2. Supabase Auth handles authentication
   - Email/Password
   - Magic Link
   - OAuth (Google, Apple, etc.)
        ↓
3. Supabase returns JWT token
   {
     "access_token": "eyJ...",
     "refresh_token": "...",
     "expires_in": 3600,
     "user": {
       "id": "uuid",
       "email": "user@example.com",
       "role": "authenticated"
     }
   }
        ↓
4. Frontend stores tokens in:
   - localStorage (access_token)
   - httpOnly cookie (refresh_token) - MORE SECURE
        ↓
5. Frontend makes API request with token:
   Authorization: Bearer eyJ...
        ↓
6. API Server middleware validates token:
   - Verify JWT signature with Supabase
   - Check expiration
   - Extract user_id and role
        ↓
7. Attach user to request object:
   req.user = { id, email, role }
        ↓
8. Route handler has access to authenticated user
        ↓
9. Database queries use user_id for RLS
```

### **Middleware Implementation (Node.js)**

```typescript
// middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user role from database
    const { data: userData } = await supabase
      .from('users')
      .select('role, status')
      .eq('id', user.id)
      .single();

    if (userData?.status !== 'active') {
      return res.status(403).json({ error: 'Account suspended' });
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email!,
      role: userData?.role || 'user',
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

// Role-based access control
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}
```

---

## 🤖 AI Service Architecture (Python)

### **FastAPI Main Application**

```python
# ai-service/app/main.py

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.core.config import settings
from app.websocket.manager import ConnectionManager

app = FastAPI(
    title="Ezri AI Service",
    version="1.0.0",
    description="AI endpoints for Ezri mental health platform"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.API_SERVER_URL, settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket manager for real-time AI
manager = ConnectionManager()

# Routes
app.include_router(api_router, prefix="/api/v1")

@app.websocket("/ws/conversation/{user_id}")
async def websocket_conversation(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_json()
            # Process AI conversation in real-time
            response = await process_conversation(data, user_id)
            await manager.send_personal_message(response, user_id)
    except WebSocketDisconnect:
        manager.disconnect(user_id)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-service"}
```

### **AI Conversation Endpoint**

```python
# ai-service/app/api/v1/endpoints/conversation.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.openai_service import OpenAIService
from app.services.crisis_service import CrisisDetectionService
from app.models.conversation import ConversationRequest, ConversationResponse
from app.core.safety import detect_safety_concerns

router = APIRouter()

@router.post("/conversation", response_model=ConversationResponse)
async def create_conversation_response(
    request: ConversationRequest,
    openai_service: OpenAIService = Depends(),
    crisis_service: CrisisDetectionService = Depends()
):
    """
    Generate AI conversation response with safety detection
    """
    
    # Check for crisis signals
    safety_analysis = await crisis_service.analyze_message(
        user_message=request.message,
        conversation_history=request.history
    )
    
    if safety_analysis.high_risk:
        # Trigger crisis protocol
        return ConversationResponse(
            message="I'm really concerned about what you're sharing. Your wellbeing matters deeply. Let me share some resources that can help right now.",
            safety_state="HIGH_RISK",
            crisis_detected=True,
            crisis_resources=get_crisis_resources(request.user_location)
        )
    
    # Generate AI response
    ai_response = await openai_service.generate_response(
        messages=request.history + [{"role": "user", "content": request.message}],
        avatar_id=request.avatar_id,
        safety_state=safety_analysis.state
    )
    
    return ConversationResponse(
        message=ai_response.content,
        safety_state=safety_analysis.state,
        sentiment_score=safety_analysis.sentiment,
        tokens_used=ai_response.tokens_used
    )
```

### **Crisis Detection ML Model**

```python
# ai-service/app/services/crisis_service.py

from transformers import pipeline
import re

class CrisisDetectionService:
    def __init__(self):
        # Load pre-trained sentiment model
        self.sentiment_analyzer = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english"
        )
        
        # Crisis keywords (expanded in production)
        self.crisis_keywords = {
            'high': [
                'suicide', 'kill myself', 'end my life', 'not worth living',
                'want to die', 'better off dead'
            ],
            'medium': [
                'self harm', 'hurt myself', 'cutting', 'hopeless',
                'can\'t go on', 'give up'
            ],
            'low': [
                'depressed', 'anxious', 'struggling', 'overwhelmed'
            ]
        }
    
    async def analyze_message(
        self,
        user_message: str,
        conversation_history: list
    ) -> SafetyAnalysis:
        """
        Analyze message for crisis indicators
        """
        
        # Sentiment analysis
        sentiment = self.sentiment_analyzer(user_message)[0]
        
        # Keyword detection
        message_lower = user_message.lower()
        severity = 'normal'
        detected_signals = []
        
        for level, keywords in self.crisis_keywords.items():
            for keyword in keywords:
                if keyword in message_lower:
                    detected_signals.append(keyword)
                    if level == 'high':
                        severity = 'high_risk'
                    elif level == 'medium' and severity != 'high_risk':
                        severity = 'elevated_concern'
        
        # Context analysis (check last few messages)
        context_score = self._analyze_context(conversation_history)
        
        # Determine safety state
        if severity == 'high_risk' or (sentiment['label'] == 'NEGATIVE' and sentiment['score'] > 0.9):
            safety_state = 'HIGH_RISK'
        elif severity == 'elevated_concern' or (sentiment['label'] == 'NEGATIVE' and sentiment['score'] > 0.7):
            safety_state = 'ELEVATED_CONCERN'
        else:
            safety_state = 'NORMAL'
        
        return SafetyAnalysis(
            state=safety_state,
            high_risk=(safety_state == 'HIGH_RISK'),
            sentiment=sentiment['score'] if sentiment['label'] == 'POSITIVE' else -sentiment['score'],
            detected_signals=detected_signals
        )
```

---

## 🌐 API Endpoints

### **Node.js API Server Endpoints**

```
┌─────────────────────────────────────────────────────────────┐
│                      API ENDPOINTS                          │
└─────────────────────────────────────────────────────────────┘

BASE URL: https://api.ezri.app/v1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUTHENTICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

POST   /auth/signup              Create new account
POST   /auth/login               Login user
POST   /auth/logout              Logout user
POST   /auth/refresh             Refresh access token
POST   /auth/forgot-password     Send password reset email
POST   /auth/reset-password      Reset password with token
GET    /auth/me                  Get current user

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
USERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /users/:id                Get user by ID
PATCH  /users/:id                Update user
DELETE /users/:id                Delete user (soft delete)
GET    /users/:id/stats          Get user statistics
PATCH  /users/:id/preferences    Update preferences
GET    /users/:id/activity       Get activity history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ONBOARDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /onboarding/status        Get onboarding progress
POST   /onboarding/complete      Mark step as complete
POST   /onboarding/avatar        Save selected avatar
PATCH  /onboarding/preferences   Save onboarding preferences

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOOD TRACKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /mood/entries             Get all mood entries (paginated)
POST   /mood/entries             Create mood entry
GET    /mood/entries/:id         Get mood entry by ID
PATCH  /mood/entries/:id         Update mood entry
DELETE /mood/entries/:id         Delete mood entry
GET    /mood/insights            Get mood insights & patterns
GET    /mood/trends              Get mood trends (chart data)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JOURNAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /journal/entries          Get all journal entries
POST   /journal/entries          Create journal entry
GET    /journal/entries/:id      Get journal entry by ID
PATCH  /journal/entries/:id      Update journal entry
DELETE /journal/entries/:id      Delete journal entry
GET    /journal/prompts          Get journal prompts
GET    /journal/analytics        Get journal analytics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AI CONVERSATIONS (Proxy to Python AI Service)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

POST   /ai/conversation/start    Start new conversation
POST   /ai/conversation/message  Send message to AI
GET    /ai/conversations         Get conversation history
GET    /ai/conversations/:id     Get conversation details
POST   /ai/voice/synthesize      Convert text to speech
POST   /ai/voice/transcribe      Convert speech to text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WELLNESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /wellness/content         Get all wellness content
GET    /wellness/content/:id     Get content by ID
POST   /wellness/progress        Track wellness progress
GET    /wellness/progress        Get user progress
GET    /wellness/recommendations Get personalized recommendations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOALS & HABITS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /goals                    Get all goals
POST   /goals                    Create goal
GET    /goals/:id                Get goal by ID
PATCH  /goals/:id                Update goal
DELETE /goals/:id                Delete goal
POST   /goals/:id/checkin        Log goal check-in
GET    /goals/:id/progress       Get goal progress

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRISIS MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /crisis/resources         Get crisis resources by location
POST   /crisis/alerts            Create crisis alert
GET    /crisis/alerts            Get all crisis alerts (admin)
PATCH  /crisis/alerts/:id        Update alert status (admin)
POST   /crisis/contacts          Add trusted contact
GET    /crisis/contacts          Get trusted contacts
DELETE /crisis/contacts/:id      Remove trusted contact

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /notifications            Get all notifications
PATCH  /notifications/:id/read   Mark as read
DELETE /notifications/:id        Delete notification
POST   /notifications/send       Send notification (admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BILLING & SUBSCRIPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /billing/subscription     Get current subscription
POST   /billing/subscription     Create subscription
PATCH  /billing/subscription     Update subscription
DELETE /billing/subscription     Cancel subscription
GET    /billing/invoices         Get all invoices
GET    /billing/invoices/:id     Get invoice by ID
POST   /billing/portal           Create Stripe customer portal session
POST   /billing/webhook          Stripe webhook handler

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN - USER MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /admin/users              Get all users (paginated, filtered)
GET    /admin/users/:id          Get user details
PATCH  /admin/users/:id          Update user (admin)
DELETE /admin/users/:id          Delete user (admin)
POST   /admin/users/:id/suspend  Suspend user
POST   /admin/users/:id/restore  Restore user
GET    /admin/users/:id/activity Get user activity logs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN - ANALYTICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /admin/analytics/overview Get dashboard overview
GET    /admin/analytics/users    Get user analytics
GET    /admin/analytics/engagement Get engagement metrics
GET    /admin/analytics/revenue  Get revenue metrics
GET    /admin/analytics/retention Get retention metrics
POST   /admin/analytics/export   Export analytics report

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN - CONTENT MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /admin/content            Get all content
POST   /admin/content            Create content
PATCH  /admin/content/:id        Update content
DELETE /admin/content/:id        Delete content
POST   /admin/content/:id/publish Publish content

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN - AUDIT LOGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /admin/audit-logs         Get audit logs (filtered, paginated)
POST   /admin/audit-logs/export  Export audit logs to CSV

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN - SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GET    /admin/system/health      System health check
GET    /admin/system/logs        Get system logs
GET    /admin/system/settings    Get system settings
PATCH  /admin/system/settings    Update system settings
```

---

## ⚡ WebSocket Real-Time Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  WEBSOCKET ARCHITECTURE                     │
└─────────────────────────────────────────────────────────────┘

CLIENT (Frontend)
    ↓
    WebSocket Connection
    ws://localhost:3002
    ↓
SOCKET.IO SERVER (Node.js)
    ├── Room: user_{userId}        (Personal notifications)
    ├── Room: admin                (Admin alerts)
    ├── Room: conversation_{convId} (AI conversation)
    └── Room: crisis              (Crisis alerts)
    ↓
EVENTS:
    ↓
┌───────────────────────────────────────────────┐
│ CLIENT → SERVER EVENTS                        │
├───────────────────────────────────────────────┤
│ - user:connect                                │
│ - conversation:start                          │
│ - conversation:message                        │
│ - conversation:end                            │
│ - voice:data (audio stream)                   │
│ - typing:start                                │
│ - typing:stop                                 │
└───────────────────────────────────────────────┘
    ↓
┌───────────────────────────────────────────────┐
│ SERVER → CLIENT EVENTS                        │
├───────────────────────────────────────────────┤
│ - ai:response                                 │
│ - ai:typing                                   │
│ - notification:new                            │
│ - crisis:alert                                │
│ - crisis:resources                            │
│ - voice:audio (audio response)                │
│ - safety:state_change                         │
└───────────────────────────────────────────────┘
```

### **Socket.io Server Implementation**

```typescript
// websocket/index.ts

import { Server } from 'socket.io';
import { createServer } from 'http';
import { authenticateSocket } from './middleware';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

// Authentication middleware
io.use(authenticateSocket);

io.on('connection', (socket) => {
  const userId = socket.data.user.id;
  console.log(`User connected: ${userId}`);

  // Join user-specific room
  socket.join(`user_${userId}`);

  // If admin, join admin room
  if (socket.data.user.role === 'admin' || socket.data.user.role === 'super') {
    socket.join('admin');
  }

  // AI Conversation events
  socket.on('conversation:start', async (data) => {
    const conversationId = await createConversation(userId, data.avatarId);
    socket.join(`conversation_${conversationId}`);
    socket.emit('conversation:started', { conversationId });
  });

  socket.on('conversation:message', async (data) => {
    // Forward to AI service
    const response = await fetch(`${AI_SERVICE_URL}/api/v1/conversation`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        conversationId: data.conversationId,
        message: data.message,
      }),
    });

    const aiResponse = await response.json();

    // Check for crisis
    if (aiResponse.crisis_detected) {
      // Alert admins
      io.to('admin').emit('crisis:alert', {
        userId,
        conversationId: data.conversationId,
        severity: aiResponse.severity,
      });
    }

    // Send response to user
    socket.emit('ai:response', aiResponse);
  });

  // Voice streaming
  socket.on('voice:data', async (audioChunk) => {
    // Process audio in real-time
    const transcription = await transcribeAudio(audioChunk);
    
    // Get AI response
    const response = await getAIResponse(userId, transcription);
    
    // Synthesize voice
    const audioResponse = await synthesizeVoice(response.text);
    
    socket.emit('voice:audio', audioResponse);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${userId}`);
  });
});

httpServer.listen(3002);
```

---

## 💳 Stripe Payment Integration

```typescript
// services/billing.service.ts

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export class BillingService {
  // Create customer
  async createCustomer(userId: string, email: string) {
    const customer = await stripe.customers.create({
      email,
      metadata: { userId },
    });

    // Save to database
    await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        stripe_customer_id: customer.id,
      });

    return customer;
  }

  // Create subscription
  async createSubscription(
    userId: string,
    priceId: string
  ) {
    // Get or create customer
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    let customerId = sub?.stripe_customer_id;
    if (!customerId) {
      const user = await supabase
        .from('users')
        .select('email')
        .eq('id', userId)
        .single();
      const customer = await this.createCustomer(userId, user.data!.email);
      customerId = customer.id;
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // Save to database
    await supabase
      .from('subscriptions')
      .update({
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        plan: getPlanFromPrice(priceId),
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
      })
      .eq('user_id', userId);

    return subscription;
  }

  // Handle webhooks
  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await this.syncSubscription(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.cancelSubscription(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await this.recordInvoice(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
    }
  }

  private async syncSubscription(subscription: Stripe.Subscription) {
    await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
        updated_at: new Date(),
      })
      .eq('stripe_subscription_id', subscription.id);
  }
}
```

---

## 🔒 Security Best Practices

```
┌─────────────────────────────────────────────────────────────┐
│                   SECURITY MEASURES                         │
└────────────────────────��────────────────────────────────────┘

1. AUTHENTICATION & AUTHORIZATION
   ✓ JWT tokens with short expiration (1 hour)
   ✓ Refresh tokens in httpOnly cookies
   ✓ Role-based access control (RBAC)
   ✓ Supabase Row Level Security (RLS)

2. DATA ENCRYPTION
   ✓ All data encrypted at rest (PostgreSQL)
   ✓ TLS/SSL for data in transit
   ✓ Sensitive fields encrypted (PII, health data)
   ✓ Hashed passwords (bcrypt)

3. API SECURITY
   ✓ Rate limiting (express-rate-limit)
   ✓ CORS configuration
   ✓ Helmet.js security headers
   ✓ Input validation (Zod/Joi)
   ✓ SQL injection prevention (Prisma/Supabase)
   ✓ XSS protection

4. HIPAA COMPLIANCE
   ✓ Audit logging for all PHI access
   ✓ Data retention policies
   ✓ Encrypted backups
   ✓ Access controls
   ✓ Business Associate Agreement (BAA)

5. MONITORING & LOGGING
   ✓ Error tracking (Sentry)
   ✓ Performance monitoring (New Relic/DataDog)
   ✓ Audit logs for admin actions
   ✓ System logs for debugging

6. CRISIS SAFETY
   ✓ Real-time crisis detection
   ✓ Immediate admin alerts
   ✓ Resource display
   ✓ Conversation recording/flagging
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  DEPLOYMENT ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────┘

FRONTEND (Vite/React)
  ├── Hosting: Vercel / Netlify / Cloudflare Pages
  ├── CDN: Built-in CDN
  └── Domain: app.ezri.com

API SERVER (Node.js)
  ├── Hosting: AWS EC2 / DigitalOcean / Render
  ├── Container: Docker
  ├── Orchestration: Docker Compose / Kubernetes
  ├── Load Balancer: NGINX / AWS ALB
  └── Domain: api.ezri.com

AI SERVICE (Python)
  ├── Hosting: AWS EC2 (GPU for ML) / Google Cloud
  ├── Container: Docker
  └── Domain: ai.ezri.com

DATABASE
  ├── Supabase (Managed PostgreSQL)
  └── Connection Pooling: PgBouncer

REDIS
  ├── Hosting: Redis Cloud / AWS ElastiCache
  └── Purpose: Caching, sessions, queues

FILE STORAGE
  ├── Supabase Storage
  └── Media: Audio, video, avatars

CI/CD
  ├── GitHub Actions
  ├── Docker builds
  └── Automated testing

MONITORING
  ├── Sentry (Error tracking)
  ├── DataDog / New Relic (APM)
  └── Supabase Dashboard (DB metrics)
```

---

## 📦 Package Dependencies

### **Node.js (package.json)**

```json
{
  "name": "ezri-api-server",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    
    "@supabase/supabase-js": "^2.39.0",
    "@prisma/client": "^5.7.1",
    
    "socket.io": "^4.6.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    
    "stripe": "^14.9.0",
    
    "redis": "^4.6.11",
    "bull": "^4.12.0",
    
    "zod": "^3.22.4",
    "joi": "^17.11.0",
    
    "winston": "^3.11.0",
    "pino": "^8.17.2",
    
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    
    "nodemailer": "^6.9.7",
    "twilio": "^4.20.0",
    
    "@sentry/node": "^7.91.0",
    
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "prisma": "^5.7.1",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2"
  }
}
```

### **Python (requirements.txt)**

```txt
# FastAPI
fastapi==0.108.0
uvicorn[standard]==0.25.0
pydantic==2.5.3
pydantic-settings==2.1.0

# Database
sqlalchemy==2.0.23
psycopg2-binary==2.9.9

# AI/ML
openai==1.6.1
anthropic==0.8.0
transformers==4.36.2
torch==2.1.2
sentence-transformers==2.2.2

# Audio processing
whisper==1.1.10
pydub==0.25.1
elevenlabs==0.2.26

# Utilities
python-dotenv==1.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# WebSocket
websockets==12.0

# HTTP
httpx==0.26.0
aiohttp==3.9.1

# Monitoring
sentry-sdk==1.39.1

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1
```

---

## 🧪 Testing Strategy

```
UNIT TESTS
  ├── Services (business logic)
  ├── Controllers
  ├── Utilities
  └── Coverage: 80%+

INTEGRATION TESTS
  ├── API endpoints
  ├── Database operations
  ├── External services (mocked)
  └── Coverage: 70%+

E2E TESTS
  ├── Critical user flows
  ├── Payment flows
  ├── Crisis detection
  └── Coverage: Key flows

LOAD TESTING
  ├── API performance
  ├── WebSocket connections
  └── Database queries
```

---

## 📈 Scalability Considerations

```
HORIZONTAL SCALING
  ├── Multiple API server instances (stateless)
  ├── Load balancer distribution
  └── Session storage in Redis

CACHING STRATEGY
  ├── Redis for frequently accessed data
  ├── CDN for static assets
  └── Database query results

DATABASE OPTIMIZATION
  ├── Indexes on foreign keys
  ├── Materialized views for analytics
  ├── Read replicas for reporting
  └── Connection pooling

QUEUE SYSTEM
  ├── Bull for async jobs
  ├── Email sending
  ├── Notification processing
  └── Analytics calculations
```

---

## 🎯 Development Workflow

```
1. LOCAL DEVELOPMENT
   docker-compose up -d
   → Starts API, AI service, PostgreSQL, Redis
   
2. DATABASE MIGRATIONS
   npx prisma migrate dev
   
3. SEED DATA
   npm run seed
   
4. RUN TESTS
   npm test
   
5. START SERVICES
   npm run dev (API Server)
   uvicorn app.main:app --reload (AI Service)
   
6. WEBSOCKET SERVER
   npm run ws
```

---

This is your complete backend architecture for Ezri! 🎉

Ready to start building? Let me know which component you'd like to implement first!
