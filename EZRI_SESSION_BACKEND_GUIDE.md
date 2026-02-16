# 🎙️ EZRI - AI Session Backend Implementation Guide

**Complete guide to building the session management backend for Ezri's AI therapy sessions**

---

## 📋 **TABLE OF CONTENTS**

1. [Overview](#overview)
2. [Frontend Analysis](#frontend-analysis)
3. [Backend Architecture](#backend-architecture)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [WebSocket Implementation](#websocket-implementation)
7. [AI Integration](#ai-integration)
8. [Real-Time Features](#real-time-features)
9. [Safety & Crisis Detection](#safety-crisis-detection)
10. [Step-by-Step Implementation](#step-by-step-implementation)
11. [Code Examples](#code-examples)
12. [Testing](#testing)

---

## 🎯 **OVERVIEW**

### **What is a Session?**

An AI therapy session in Ezri is a real-time, voice/video conversation between:
- **User** (mental health app user)
- **AI Therapist** (OpenAI GPT-4 powered avatar)

### **Key Features**:
- ✅ Real-time voice conversation
- ✅ AI-powered responses
- ✅ Crisis detection & intervention
- ✅ Session recording & transcripts
- ✅ Credit/time tracking
- ✅ Multiple avatar personalities
- ✅ Safety monitoring
- ✅ Session history & analytics

---

## 🖥️ **FRONTEND ANALYSIS**

### **Session Flow (3 Pages)**

#### **1. Session Lobby** (`/app/session-lobby`)
**Purpose**: Pre-session configuration

**Features**:
- Choose session mode (Start Now / Schedule)
- Select duration (15/30/45/60 min)
- Choose avatar (Alex, Sarah, Michael, Emma)
- Select voice style
- Pre-session checklist
- View upcoming sessions

**User Actions**:
- Click "Start Now" → Go to Active Session
- Click "Schedule" → Pick date/time → Save

**Backend Needs**:
- GET `/api/sessions/upcoming` - Fetch scheduled sessions
- POST `/api/sessions/schedule` - Schedule new session
- GET `/api/avatars` - Get available avatars
- GET `/api/user/credits` - Check available minutes

---

#### **2. Active Session** (`/app/active-session`)
**Purpose**: Live AI conversation

**Features**:
- Real-time audio/video with AI avatar
- Session timer (counts minutes)
- Credit deduction (1 minute = 1 credit)
- Safety state monitoring
- Connection quality indicator
- Controls: Mute, Camera On/Off, Volume
- AI speaking indicator
- Emergency end session
- Low credits warning
- Crisis resources display

**User Actions**:
- Talk to AI (voice input)
- End session → Save transcript
- Toggle mute/camera
- Access safety resources

**Backend Needs**:
- POST `/api/sessions/start` - Initialize session
- WebSocket connection for real-time chat
- POST `/api/ai/chat` - Send message, get AI response
- POST `/api/sessions/:id/analyze-safety` - Safety check
- POST `/api/sessions/:id/end` - End session
- POST `/api/sessions/:id/messages` - Save message
- GET `/api/sessions/:id/transcript` - Get conversation

---

#### **3. Session History** (`/app/session-history`)
**Purpose**: View past sessions

**Features**:
- List of all completed sessions
- Session details (date, duration, avatar)
- View transcript
- Session summary
- Mood insights
- Safety events (if any)

**User Actions**:
- Click session → View details
- Read transcript
- Download transcript (PDF/CSV)

**Backend Needs**:
- GET `/api/sessions` - List user sessions
- GET `/api/sessions/:id` - Get session details
- GET `/api/sessions/:id/transcript` - Get full transcript
- GET `/api/sessions/:id/summary` - Get AI-generated summary
- GET `/api/sessions/:id/export` - Export transcript

---

## 🏗️ **BACKEND ARCHITECTURE**

### **System Components**

```
┌─────────────────────────────────────────────────────────────┐
│                    EZRI SESSION BACKEND                      │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│  API Server  │────▶│  AI Service  │
│   (React)    │     │   (Node.js)  │     │   (Python)   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  WebSocket   │     │  PostgreSQL  │     │  OpenAI API  │
│  (Socket.IO) │     │  (Supabase)  │     │   (GPT-4)    │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       └────────────────────┴─────────────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │    Redis     │
                     │   (Cache)    │
                     └──────────────┘
```

### **Technology Stack**

| Component | Technology | Purpose |
|-----------|------------|---------|
| **API Server** | Node.js + Express + TypeScript | RESTful API endpoints |
| **AI Service** | Python + FastAPI | AI processing, sentiment analysis |
| **Real-Time** | Socket.IO | WebSocket connections |
| **Database** | PostgreSQL (Supabase) | Session data, transcripts |
| **AI Engine** | OpenAI GPT-4 Turbo | Conversational AI |
| **Cache** | Redis | Session state, real-time data |
| **Queue** | Bull (Redis) | Async processing |
| **Storage** | Supabase Storage | Audio recordings (optional) |

---

## 💾 **DATABASE SCHEMA**

### **1. Sessions Table**

```sql
CREATE TABLE sessions (
  -- Identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Session Configuration
  avatar VARCHAR(50) NOT NULL,              -- "Alex", "Sarah", "Michael", "Emma"
  voice_id VARCHAR(50),                     -- Voice preference
  session_type VARCHAR(50) DEFAULT 'instant', -- "instant" or "scheduled"
  planned_duration INTEGER DEFAULT 30,      -- Minutes
  actual_duration INTEGER,                  -- Actual duration in seconds
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending',     -- "pending", "active", "completed", "cancelled"
  
  -- Timestamps
  scheduled_at TIMESTAMPTZ,                 -- For scheduled sessions
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Credits & Billing
  credits_used INTEGER DEFAULT 0,           -- Minutes consumed
  credits_before INTEGER,                   -- User credits before session
  credits_after INTEGER,                    -- User credits after session
  
  -- Safety
  highest_safety_state VARCHAR(50) DEFAULT 'NORMAL',  -- Highest risk level detected
  safety_events_count INTEGER DEFAULT 0,
  crisis_alert_triggered BOOLEAN DEFAULT false,
  
  -- Quality Metrics
  connection_quality VARCHAR(20),           -- "excellent", "good", "poor"
  ai_response_time_avg INTEGER,             -- Average response time in ms
  user_satisfaction_rating INTEGER,         -- 1-5 stars (optional feedback)
  
  -- Summary
  ai_summary TEXT,                          -- AI-generated session summary
  key_topics TEXT[],                        -- Extracted topics
  detected_emotions TEXT[],                 -- Detected emotions throughout
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,       -- Additional data
  
  INDEX idx_sessions_user_id (user_id),
  INDEX idx_sessions_status (status),
  INDEX idx_sessions_started_at (started_at),
  INDEX idx_sessions_scheduled_at (scheduled_at)
);
```

---

### **2. Conversation Messages Table**

```sql
CREATE TABLE conversation_messages (
  -- Identity
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  
  -- Message Content
  speaker VARCHAR(20) NOT NULL,             -- "user" or "ai"
  message_type VARCHAR(50) DEFAULT 'text',  -- "text", "audio", "system"
  content TEXT NOT NULL,
  
  -- Audio (Optional)
  audio_url TEXT,                           -- URL to audio recording
  audio_duration INTEGER,                   -- Duration in seconds
  
  -- AI Metadata (for AI messages)
  ai_model VARCHAR(50),                     -- "gpt-4-turbo", etc.
  tokens_used INTEGER,
  response_time_ms INTEGER,
  
  -- Safety Analysis
  sentiment VARCHAR(50),                    -- "positive", "neutral", "negative"
  sentiment_score FLOAT,                    -- -1.0 to 1.0
  safety_state VARCHAR(50),                 -- "NORMAL", "ELEVATED_CONCERN", etc.
  safety_confidence FLOAT,                  -- 0.0 to 1.0
  detected_signals TEXT[],                  -- ["hopelessness", "isolation"]
  
  -- Timing
  created_at TIMESTAMPTZ DEFAULT NOW(),
  timestamp_in_session INTEGER,             -- Seconds since session start
  
  -- Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  INDEX idx_messages_session_id (session_id),
  INDEX idx_messages_speaker (speaker),
  INDEX idx_messages_created_at (created_at)
);
```

---

### **3. Session Events Table** (Logs)

```sql
CREATE TABLE session_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  event_type VARCHAR(100) NOT NULL,         -- "session_started", "mute_toggled", etc.
  event_data JSONB DEFAULT '{}'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  INDEX idx_session_events_session_id (session_id),
  INDEX idx_session_events_type (event_type),
  INDEX idx_session_events_created_at (created_at)
);
```

---

## 🔌 **API ENDPOINTS**

### **Session Management Endpoints**

---

### **1. Start Session**
```http
POST /api/v1/sessions/start
```

**Request Body**:
```json
{
  "avatar": "Alex",
  "voiceId": "voice1",
  "duration": 30,
  "sessionType": "instant"
}
```

**Response**:
```json
{
  "success": true,
  "session": {
    "id": "sess_abc123",
    "userId": "user_xyz",
    "avatar": "Alex",
    "status": "active",
    "startedAt": "2024-12-28T10:00:00Z",
    "plannedDuration": 30,
    "creditsRemaining": 145,
    "websocketUrl": "wss://api.ezri.app/sessions/sess_abc123"
  }
}
```

**Backend Logic**:
1. Validate user has enough credits
2. Create session record in database (status: "active")
3. Deduct initial credit (optional: pay-as-you-go)
4. Initialize WebSocket room
5. Create session in Redis cache
6. Return session ID + WebSocket URL
7. Log "session_started" event

**Code Example**:
```typescript
// backend-starter/api-server/src/routes/sessions.ts

import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';
import { io } from '../server';

export const startSession = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { avatar, voiceId, duration, sessionType } = req.body;
  
  // 1. Check user credits
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  });
  
  if (!user?.subscription || user.subscription.creditsRemaining < 1) {
    return res.status(400).json({
      success: false,
      error: 'Insufficient credits'
    });
  }
  
  // 2. Create session
  const session = await prisma.session.create({
    data: {
      userId,
      avatar,
      voiceId,
      plannedDuration: duration,
      sessionType,
      status: 'active',
      startedAt: new Date(),
      creditsBefor: user.subscription.creditsRemaining
    }
  });
  
  // 3. Initialize WebSocket room
  const roomName = `session_${session.id}`;
  
  // 4. Cache session in Redis
  await redis.setex(
    `session:${session.id}`,
    3600, // 1 hour TTL
    JSON.stringify({
      id: session.id,
      userId,
      avatar,
      startTime: Date.now(),
      credits: user.subscription.creditsRemaining
    })
  );
  
  // 5. Log event
  await prisma.sessionEvent.create({
    data: {
      sessionId: session.id,
      userId,
      eventType: 'session_started',
      eventData: { avatar, duration }
    }
  });
  
  // 6. Return response
  return res.json({
    success: true,
    session: {
      id: session.id,
      userId,
      avatar,
      status: 'active',
      startedAt: session.startedAt,
      plannedDuration: duration,
      creditsRemaining: user.subscription.creditsRemaining,
      websocketUrl: `wss://${process.env.API_URL}/sessions/${session.id}`
    }
  });
};
```

---

### **2. End Session**
```http
POST /api/v1/sessions/:sessionId/end
```

**Request Body**:
```json
{
  "reason": "completed",
  "userRating": 5
}
```

**Response**:
```json
{
  "success": true,
  "session": {
    "id": "sess_abc123",
    "status": "completed",
    "actualDuration": 1823,
    "creditsUsed": 31,
    "summary": "User discussed anxiety management techniques...",
    "nextSteps": ["Practice breathing exercises", "Journal daily"]
  }
}
```

**Backend Logic**:
1. Verify session belongs to user
2. Calculate actual duration
3. Calculate credits used
4. Update user's credit balance
5. Set session status to "completed"
6. Generate AI summary (async job)
7. Close WebSocket connection
8. Return session summary

---

### **3. Get Active Session**
```http
GET /api/v1/sessions/active
```

**Response**:
```json
{
  "success": true,
  "session": {
    "id": "sess_abc123",
    "status": "active",
    "startedAt": "2024-12-28T10:00:00Z",
    "elapsedTime": 523,
    "creditsUsed": 9,
    "avatar": "Alex"
  }
}
```

---

### **4. Get Session History**
```http
GET /api/v1/sessions
```

**Query Params**:
- `page` (default: 1)
- `limit` (default: 20)
- `status` (optional: "completed", "cancelled")

**Response**:
```json
{
  "success": true,
  "sessions": [
    {
      "id": "sess_abc123",
      "avatar": "Alex",
      "startedAt": "2024-12-28T10:00:00Z",
      "duration": 1823,
      "status": "completed",
      "summary": "Discussed anxiety management...",
      "messageCount": 42
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 58,
    "pages": 3
  }
}
```

---

### **5. Get Session Details**
```http
GET /api/v1/sessions/:sessionId
```

**Response**:
```json
{
  "success": true,
  "session": {
    "id": "sess_abc123",
    "userId": "user_xyz",
    "avatar": "Alex",
    "startedAt": "2024-12-28T10:00:00Z",
    "endedAt": "2024-12-28T10:30:23Z",
    "duration": 1823,
    "creditsUsed": 31,
    "status": "completed",
    "summary": "User discussed anxiety...",
    "keyTopics": ["anxiety", "work stress", "coping strategies"],
    "detectedEmotions": ["anxious", "hopeful", "calm"],
    "messageCount": 42,
    "safetyState": "NORMAL",
    "userRating": 5
  }
}
```

---

### **6. Get Session Transcript**
```http
GET /api/v1/sessions/:sessionId/transcript
```

**Response**:
```json
{
  "success": true,
  "transcript": {
    "sessionId": "sess_abc123",
    "messages": [
      {
        "id": "msg_1",
        "speaker": "ai",
        "content": "Hello! I'm here to listen. How are you feeling today?",
        "timestamp": "2024-12-28T10:00:05Z",
        "sentiment": "neutral"
      },
      {
        "id": "msg_2",
        "speaker": "user",
        "content": "I've been feeling pretty anxious lately.",
        "timestamp": "2024-12-28T10:00:18Z",
        "sentiment": "negative",
        "safetyState": "ELEVATED_CONCERN"
      }
    ],
    "totalMessages": 42
  }
}
```

---

### **7. Schedule Session**
```http
POST /api/v1/sessions/schedule
```

**Request Body**:
```json
{
  "avatar": "Sarah",
  "scheduledAt": "2024-12-29T14:00:00Z",
  "duration": 45,
  "reminder": true
}
```

**Response**:
```json
{
  "success": true,
  "session": {
    "id": "sess_xyz789",
    "status": "pending",
    "scheduledAt": "2024-12-29T14:00:00Z",
    "avatar": "Sarah",
    "duration": 45
  }
}
```

---

## 🔄 **WEBSOCKET IMPLEMENTATION**

### **Real-Time Session Communication**

**Technology**: Socket.IO

**Purpose**: Real-time bidirectional communication between user and AI during active session

---

### **WebSocket Events**

#### **Client → Server Events**

| Event | Payload | Description |
|-------|---------|-------------|
| `join_session` | `{ sessionId }` | Join session room |
| `send_message` | `{ sessionId, message }` | Send user message |
| `typing` | `{ sessionId }` | User is typing |
| `toggle_mute` | `{ sessionId, muted }` | Mute/unmute |
| `toggle_camera` | `{ sessionId, cameraOff }` | Camera on/off |
| `pause_session` | `{ sessionId }` | Pause session |
| `resume_session` | `{ sessionId }` | Resume session |

#### **Server → Client Events**

| Event | Payload | Description |
|-------|---------|-------------|
| `session_joined` | `{ sessionId, status }` | Confirm join |
| `ai_response` | `{ message, timestamp }` | AI reply |
| `ai_typing` | `{}` | AI is generating response |
| `safety_state_changed` | `{ state, confidence }` | Safety alert |
| `credit_update` | `{ remaining, used }` | Credit balance |
| `session_warning` | `{ type, message }` | Warning (low credits, etc.) |
| `session_ended` | `{ reason, summary }` | Session ended |
| `error` | `{ code, message }` | Error occurred |

---

### **WebSocket Flow**

```
┌─────────────┐                    ┌─────────────┐                    ┌─────────────┐
│   Client    │                    │   Server    │                    │  AI Service │
└─────────────┘                    └─────────────┘                    └─────────────┘
      │                                   │                                   │
      │  1. join_session                  │                                   │
      │──────────────────────────────────▶│                                   │
      │                                   │                                   │
      │  2. session_joined                │                                   │
      │◀──────────────────────────────────│                                   │
      │                                   │                                   │
      │  3. send_message                  │                                   │
      │──────────────────────────────────▶│                                   │
      │                                   │                                   │
      │  4. ai_typing                     │                                   │
      │◀──────────────────────────────────│                                   │
      │                                   │  5. POST /ai/chat                 │
      │                                   │──────────────────────────────────▶│
      │                                   │                                   │
      │                                   │  6. AI Response                   │
      │                                   │◀──────────────────────────────────│
      │                                   │                                   │
      │  7. ai_response                   │                                   │
      │◀──────────────────────────────────│                                   │
      │                                   │                                   │
      │  8. credit_update                 │                                   │
      │◀──────────────────────────────────│                                   │
```

---

### **Socket.IO Server Setup**

```typescript
// backend-starter/api-server/src/server.ts

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { authenticateSocket } from './middleware/socketAuth';

const app = express();
const httpServer = createServer(app);

// Socket.IO server with CORS
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

// Authentication middleware
io.use(authenticateSocket);

// Connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  const userId = socket.data.userId;
  
  // Join session room
  socket.on('join_session', async ({ sessionId }) => {
    try {
      // Verify session belongs to user
      const session = await prisma.session.findFirst({
        where: {
          id: sessionId,
          userId: userId,
          status: 'active'
        }
      });
      
      if (!session) {
        socket.emit('error', { code: 'SESSION_NOT_FOUND' });
        return;
      }
      
      // Join room
      socket.join(`session_${sessionId}`);
      
      // Confirm join
      socket.emit('session_joined', {
        sessionId,
        status: 'active'
      });
      
      console.log(`User ${userId} joined session ${sessionId}`);
      
    } catch (error) {
      socket.emit('error', { code: 'JOIN_FAILED', message: error.message });
    }
  });
  
  // Handle incoming user message
  socket.on('send_message', async ({ sessionId, message }) => {
    try {
      // Save user message
      const userMessage = await prisma.conversationMessage.create({
        data: {
          sessionId,
          speaker: 'user',
          content: message,
          timestampInSession: Math.floor((Date.now() - session.startedAt.getTime()) / 1000)
        }
      });
      
      // Emit typing indicator
      io.to(`session_${sessionId}`).emit('ai_typing');
      
      // Call AI service
      const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/api/v1/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message,
          context: await getSessionContext(sessionId)
        })
      });
      
      const aiData = await aiResponse.json();
      
      // Save AI message
      const aiMessage = await prisma.conversationMessage.create({
        data: {
          sessionId,
          speaker: 'ai',
          content: aiData.message,
          sentiment: aiData.sentiment,
          safetyState: aiData.safetyState,
          tokensUsed: aiData.tokensUsed,
          responseTimeMs: aiData.responseTime,
          timestampInSession: Math.floor((Date.now() - session.startedAt.getTime()) / 1000)
        }
      });
      
      // Emit AI response
      io.to(`session_${sessionId}`).emit('ai_response', {
        message: aiData.message,
        timestamp: aiMessage.createdAt,
        sentiment: aiData.sentiment
      });
      
      // Check safety state
      if (aiData.safetyState !== 'NORMAL') {
        io.to(`session_${sessionId}`).emit('safety_state_changed', {
          state: aiData.safetyState,
          confidence: aiData.safetyConfidence,
          signals: aiData.detectedSignals
        });
      }
      
      // Update credits (every minute)
      const elapsedMinutes = Math.floor((Date.now() - session.startedAt.getTime()) / 60000);
      if (elapsedMinutes > session.creditsUsed) {
        await updateSessionCredits(sessionId, userId, elapsedMinutes);
        
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { subscription: true }
        });
        
        io.to(`session_${sessionId}`).emit('credit_update', {
          remaining: user.subscription.creditsRemaining,
          used: elapsedMinutes
        });
        
        // Low credits warning
        if (user.subscription.creditsRemaining <= 10) {
          io.to(`session_${sessionId}`).emit('session_warning', {
            type: 'low_credits',
            message: `Only ${user.subscription.creditsRemaining} minutes remaining`
          });
        }
      }
      
    } catch (error) {
      socket.emit('error', { code: 'MESSAGE_FAILED', message: error.message });
    }
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log('Server running on port 3000');
});

export { io };
```

---

## 🤖 **AI INTEGRATION**

### **AI Service Endpoint**

**Technology**: Python + FastAPI + OpenAI GPT-4

**Location**: `/backend-starter/ai-service/app/api/v1/endpoints/chat.py`

---

### **AI Chat Endpoint**

```python
# backend-starter/ai-service/app/api/v1/endpoints/chat.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import openai
import time

router = APIRouter()

class ChatRequest(BaseModel):
    sessionId: str
    message: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    message: str
    sentiment: str
    safetyState: str
    safetyConfidence: float
    detectedSignals: List[str]
    tokensUsed: int
    responseTime: int

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Process user message and generate AI therapist response
    """
    
    start_time = time.time()
    
    try:
        # 1. Get session context
        context = request.context or {}
        avatar = context.get('avatar', 'Alex')
        conversation_history = context.get('history', [])
        
        # 2. Build system prompt based on avatar
        system_prompt = get_avatar_system_prompt(avatar)
        
        # 3. Build messages for OpenAI
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        # Add conversation history (last 10 messages)
        for msg in conversation_history[-10:]:
            messages.append({
                "role": "user" if msg['speaker'] == 'user' else "assistant",
                "content": msg['content']
            })
        
        # Add current user message
        messages.append({
            "role": "user",
            "content": request.message
        })
        
        # 4. Call OpenAI API
        openai.api_key = settings.OPENAI_API_KEY
        
        response = openai.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=messages,
            temperature=0.7,
            max_tokens=500
        )
        
        ai_message = response.choices[0].message.content
        tokens_used = response.usage.total_tokens
        
        # 5. Analyze sentiment
        sentiment = analyze_sentiment(ai_message)
        
        # 6. Analyze safety
        safety_analysis = analyze_safety(request.message)
        
        # 7. Calculate response time
        response_time = int((time.time() - start_time) * 1000)
        
        return ChatResponse(
            message=ai_message,
            sentiment=sentiment,
            safetyState=safety_analysis['state'],
            safetyConfidence=safety_analysis['confidence'],
            detectedSignals=safety_analysis['signals'],
            tokensUsed=tokens_used,
            responseTime=response_time
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_avatar_system_prompt(avatar: str) -> str:
    """
    Get system prompt based on avatar personality
    """
    prompts = {
        "Alex": """You are Alex, a supportive and empathetic AI therapist. 
        You provide a safe, non-judgmental space for users to express themselves. 
        Use active listening techniques, ask open-ended questions, and validate emotions.
        Be warm, professional, and maintain appropriate boundaries.
        If you detect signs of crisis (suicide, self-harm), express concern and 
        suggest professional resources immediately.""",
        
        "Sarah": """You are Sarah, a warm and understanding AI therapist.
        You specialize in creating a comfortable, trusting environment.
        Use gentle language, show empathy, and help users explore their feelings.
        Focus on strengths and resilience while acknowledging challenges.""",
        
        "Michael": """You are Michael, a professional and attentive AI therapist.
        You provide structured, solution-focused support while being compassionate.
        Help users identify practical coping strategies and action steps.
        Balance empathy with gentle accountability.""",
        
        "Emma": """You are Emma, a kind and patient AI therapist.
        You excel at helping users feel heard and understood.
        Use reflective listening, validate experiences, and encourage self-compassion.
        Create a nurturing space for emotional exploration."""
    }
    
    return prompts.get(avatar, prompts["Alex"])


def analyze_sentiment(text: str) -> str:
    """
    Analyze sentiment of text
    Returns: "positive", "neutral", "negative"
    """
    # Use OpenAI for sentiment or implement custom logic
    # For now, simplified version:
    
    positive_words = ["happy", "good", "great", "better", "hopeful", "grateful"]
    negative_words = ["sad", "anxious", "depressed", "hopeless", "alone", "worthless"]
    
    text_lower = text.lower()
    
    pos_count = sum(1 for word in positive_words if word in text_lower)
    neg_count = sum(1 for word in negative_words if word in text_lower)
    
    if pos_count > neg_count:
        return "positive"
    elif neg_count > pos_count:
        return "negative"
    else:
        return "neutral"


def analyze_safety(text: str) -> dict:
    """
    Analyze safety state of user message
    Returns: { state, confidence, signals }
    """
    
    # Crisis indicators
    crisis_keywords = {
        "HIGH_RISK": [
            "kill myself", "end my life", "suicide", "want to die",
            "no reason to live", "better off dead"
        ],
        "ELEVATED_CONCERN": [
            "worthless", "hopeless", "can't go on", "giving up",
            "no point", "nobody cares", "alone", "can't take it"
        ],
        "WATCH": [
            "struggling", "difficult", "hard time", "overwhelmed",
            "stressed", "anxious", "depressed"
        ]
    }
    
    text_lower = text.lower()
    detected_signals = []
    
    # Check for high risk
    for phrase in crisis_keywords["HIGH_RISK"]:
        if phrase in text_lower:
            detected_signals.append(phrase)
            return {
                "state": "HIGH_RISK",
                "confidence": 0.95,
                "signals": detected_signals
            }
    
    # Check for elevated concern
    for phrase in crisis_keywords["ELEVATED_CONCERN"]:
        if phrase in text_lower:
            detected_signals.append(phrase)
    
    if len(detected_signals) >= 2:
        return {
            "state": "ELEVATED_CONCERN",
            "confidence": 0.85,
            "signals": detected_signals
        }
    elif len(detected_signals) == 1:
        return {
            "state": "WATCH",
            "confidence": 0.7,
            "signals": detected_signals
        }
    
    # Check for watch
    for phrase in crisis_keywords["WATCH"]:
        if phrase in text_lower:
            detected_signals.append(phrase)
    
    if detected_signals:
        return {
            "state": "WATCH",
            "confidence": 0.6,
            "signals": detected_signals
        }
    
    return {
        "state": "NORMAL",
        "confidence": 1.0,
        "signals": []
    }
```

---

## 🚨 **SAFETY & CRISIS DETECTION**

### **Real-Time Safety Monitoring**

**Purpose**: Detect crisis situations during active sessions and intervene appropriately

**Safety States**:
1. **NORMAL** - No concerns detected
2. **WATCH** - Mild distress, monitor closely
3. **ELEVATED_CONCERN** - Significant distress
4. **HIGH_RISK** - Crisis indicators present
5. **SAFETY_MODE** - Active crisis intervention

---

### **Crisis Detection Flow**

```
User Message
     │
     ▼
Analyze Text
     │
     ├─▶ NORMAL ────────▶ Continue conversation
     │
     ├─▶ WATCH ─────────▶ Monitor, add supportive resources
     │
     ├─▶ ELEVATED_CONCERN ──▶ Show safety resources, log event
     │
     ├─▶ HIGH_RISK ─────▶ Trigger crisis alert, pause AI responses
     │                    Show crisis hotlines, notify admin
     │
     └─▶ SAFETY_MODE ───▶ End session, connect to crisis support
```

---

### **Crisis Alert API**

```typescript
// POST /api/v1/sessions/:sessionId/crisis-alert

export const triggerCrisisAlert = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { safetyState, detectedSignals, messageId } = req.body;
  
  // 1. Create crisis alert
  const alert = await prisma.crisisAlert.create({
    data: {
      userId: req.user!.id,
      sessionId,
      severity: mapSafetyStateToSeverity(safetyState),
      status: 'active',
      detectedSignals,
      messageId,
      triggeredAt: new Date()
    }
  });
  
  // 2. Pause session (optional)
  await prisma.session.update({
    where: { id: sessionId },
    data: {
      status: 'paused',
      crisisAlertTriggered: true
    }
  });
  
  // 3. Notify admins (WebSocket)
  io.to('admin_crisis_room').emit('new_crisis_alert', {
    alertId: alert.id,
    userId: req.user!.id,
    severity: alert.severity,
    signals: detectedSignals
  });
  
  // 4. Send emergency notifications (if HIGH_RISK)
  if (safetyState === 'HIGH_RISK') {
    await notifyTrustedContacts(req.user!.id, sessionId);
    await notifyCrisisTeam(alert.id);
  }
  
  // 5. Get crisis resources
  const resources = await getCrisisResources(safetyState);
  
  return res.json({
    success: true,
    alert: {
      id: alert.id,
      severity: alert.severity,
      resources
    }
  });
};
```

---

## 📝 **STEP-BY-STEP IMPLEMENTATION**

### **Phase 1: Basic Session Management (Week 1)**

#### **Day 1-2: Database Setup**
```bash
# 1. Create tables
cd backend-starter/api-server
npx prisma migrate dev --name add_sessions

# 2. Generate Prisma client
npx prisma generate
```

#### **Day 3-4: Session Start/End APIs**
- Implement `POST /api/sessions/start`
- Implement `POST /api/sessions/:id/end`
- Implement `GET /api/sessions/active`
- Test with Postman

#### **Day 5-7: Session History**
- Implement `GET /api/sessions`
- Implement `GET /api/sessions/:id`
- Implement pagination
- Add filters

---

### **Phase 2: AI Integration (Week 2)**

#### **Day 1-3: AI Service Setup**
```bash
# 1. Set up Python AI service
cd backend-starter/ai-service
pip install -r requirements.txt

# 2. Add OpenAI API key to .env
echo "OPENAI_API_KEY=your_key_here" >> .env

# 3. Start AI service
uvicorn app.main:app --reload
```

#### **Day 4-5: Chat Endpoint**
- Implement `/api/v1/chat` endpoint
- Add avatar system prompts
- Test AI responses

#### **Day 6-7: Sentiment Analysis**
- Implement sentiment detection
- Add to chat response
- Store in database

---

### **Phase 3: WebSocket Real-Time (Week 3)**

#### **Day 1-3: Socket.IO Setup**
```bash
# Install dependencies
npm install socket.io

# Implement WebSocket server
```

#### **Day 4-5: Message Events**
- Implement `join_session` event
- Implement `send_message` event
- Implement `ai_response` event
- Test real-time communication

#### **Day 6-7: Advanced Events**
- Implement typing indicators
- Implement credit updates
- Implement safety alerts

---

### **Phase 4: Safety System (Week 4)**

#### **Day 1-3: Safety Detection**
- Implement safety analysis in AI service
- Add crisis keywords detection
- Test various scenarios

#### **Day 4-5: Crisis Alerts**
- Implement crisis alert creation
- Add admin notifications
- Test alert flow

#### **Day 6-7: Integration**
- Connect safety to WebSocket
- Add resource suggestions
- End-to-end testing

---

## 🧪 **TESTING**

### **Unit Tests**

```typescript
// tests/sessions.test.ts

describe('Session Management', () => {
  describe('POST /api/sessions/start', () => {
    it('should create a new session', async () => {
      const response = await request(app)
        .post('/api/v1/sessions/start')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          avatar: 'Alex',
          duration: 30,
          sessionType: 'instant'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.session.id).toBeDefined();
      expect(response.body.session.status).toBe('active');
    });
    
    it('should fail if user has no credits', async () => {
      // Set user credits to 0
      await prisma.subscription.update({
        where: { userId: testUser.id },
        data: { creditsRemaining: 0 }
      });
      
      const response = await request(app)
        .post('/api/v1/sessions/start')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          avatar: 'Alex',
          duration: 30
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Insufficient credits');
    });
  });
});
```

### **Integration Tests**

```typescript
// tests/session-flow.test.ts

describe('Complete Session Flow', () => {
  it('should complete full session lifecycle', async () => {
    // 1. Start session
    const startRes = await request(app)
      .post('/api/v1/sessions/start')
      .set('Authorization', `Bearer ${token}`)
      .send({ avatar: 'Alex', duration: 30 });
    
    const sessionId = startRes.body.session.id;
    
    // 2. Send message
    const messageRes = await request(app)
      .post(`/api/v1/sessions/${sessionId}/messages`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        speaker: 'user',
        content: 'I feel anxious today'
      });
    
    expect(messageRes.status).toBe(200);
    
    // 3. Get AI response (simulate)
    // ...
    
    // 4. End session
    const endRes = await request(app)
      .post(`/api/v1/sessions/${sessionId}/end`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reason: 'completed' });
    
    expect(endRes.status).toBe(200);
    expect(endRes.body.session.status).toBe('completed');
  });
});
```

---

## 📊 **SESSION ANALYTICS**

### **Metrics to Track**

| Metric | Description | Query |
|--------|-------------|-------|
| **Total Sessions** | Count of all sessions | `SELECT COUNT(*) FROM sessions` |
| **Active Users** | Users with sessions today | `SELECT COUNT(DISTINCT user_id) FROM sessions WHERE DATE(started_at) = CURRENT_DATE` |
| **Avg Duration** | Average session length | `SELECT AVG(actual_duration) FROM sessions WHERE status = 'completed'` |
| **Completion Rate** | % of sessions completed | `SELECT (COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*)) FROM sessions` |
| **Crisis Events** | Sessions with alerts | `SELECT COUNT(*) FROM sessions WHERE crisis_alert_triggered = true` |
| **AI Response Time** | Avg AI response time | `SELECT AVG(ai_response_time_avg) FROM sessions` |
| **User Satisfaction** | Average rating | `SELECT AVG(user_satisfaction_rating) FROM sessions WHERE user_satisfaction_rating IS NOT NULL` |

---

## 🎉 **SUMMARY**

### **What You Need to Build**:

✅ **Database Schema**
- Sessions table
- Conversation messages table
- Session events table

✅ **REST API Endpoints**
- Start session
- End session
- Get active session
- Get session history
- Get session details
- Get transcript
- Schedule session

✅ **WebSocket Server**
- Socket.IO setup
- Real-time message events
- Typing indicators
- Credit updates
- Safety alerts

✅ **AI Service**
- OpenAI GPT-4 integration
- Avatar system prompts
- Sentiment analysis
- Safety detection
- Context management

✅ **Safety System**
- Crisis detection
- Alert creation
- Admin notifications
- Resource suggestions

✅ **Credit Management**
- Track minutes used
- Deduct credits
- Low credit warnings
- Out of credits handling

---

## 📚 **Key Files to Create**

### **Backend API Server**
```
/backend-starter/api-server/src/
├── routes/
│   └── sessions.ts              # All session endpoints
├── controllers/
│   └── sessionController.ts     # Business logic
├── services/
│   └── sessionService.ts        # Session operations
├── websocket/
│   └── sessionSocket.ts         # WebSocket handlers
└── utils/
    └── creditManager.ts         # Credit tracking
```

### **AI Service**
```
/backend-starter/ai-service/app/api/v1/endpoints/
├── chat.py                      # Chat endpoint
├── sentiment.py                 # Sentiment analysis
└── safety.py                    # Safety detection
```

---

## 🚀 **Quick Start Commands**

```bash
# 1. Create database tables
cd backend-starter/api-server
npx prisma migrate dev --name add_sessions
npx prisma generate

# 2. Start API server
npm run dev

# 3. Start AI service
cd ../ai-service
uvicorn app.main:app --reload --port 8000

# 4. Test session start
curl -X POST http://localhost:3000/api/v1/sessions/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"avatar": "Alex", "duration": 30, "sessionType": "instant"}'
```

---

**Your complete guide to building Ezri's session backend! Start with Phase 1 and progress sequentially.** 🎯✨

**Total Implementation Time**: 4 weeks (1 developer, 40h/week)

**Backend session system is the heart of Ezri - real-time AI conversations with safety monitoring!** 💬🤖🚨
