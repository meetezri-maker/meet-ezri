# WebSocket Real-Time Features - Location Guide

## 🔌 **WHERE IS WEBSOCKET IN EZRI?**

---

## ❌ **CURRENT STATUS: NOT IMPLEMENTED**

**WebSocket features are documented but NOT yet built.**

---

## 📍 **WHERE IT SHOULD BE (Planned)**

### **Backend Files (Need to be Created)**

```
/backend-starter/api-server/src/
├── websocket/
│   ├── index.ts              ❌ NOT CREATED (WebSocket server setup)
│   ├── handlers.ts           ❌ NOT CREATED (Event handlers)
│   ├── rooms.ts              ❌ NOT CREATED (Room management)
│   └── middleware.ts         ❌ NOT CREATED (Socket authentication)
```

**Status**: 🔴 **0% Complete** - Folder doesn't exist yet

---

## 📖 **WHERE IT'S DOCUMENTED**

### **1. Architecture Document**
**Location**: `/EZRI_BACKEND_ARCHITECTURE.md` (Lines 1340-1425)

Shows example WebSocket implementation code.

### **2. Task Checklist**
**Location**: `/backend-starter/BACKEND_TASKS_CHECKLIST.md`

**Phase 11** - WebSocket Real-Time (Tasks 11.1-11.4)

### **3. Backend Structure Guide**
**Location**: `/backend-starter/BACKEND_STRUCTURE_GUIDE.md` (Lines 189-191)

Lists WebSocket files that need to be created.

---

## 🎯 **WHAT WEBSOCKET WILL POWER**

### **1. Real-Time AI Conversations** 🤖
**Frontend**: `/src/app/pages/app/ActiveSession.tsx`

**Features**:
- Live voice streaming (bidirectional)
- AI response streaming
- Conversation state updates
- Speaking/listening indicators

**Events**:
```typescript
// Client → Server
socket.emit('voice:data', audioChunk);
socket.emit('conversation:message', message);

// Server → Client
socket.on('voice:audio', audioResponse);
socket.on('ai:response', response);
```

---

### **2. Crisis Alerts (Admin)** 🆘
**Frontend**: `/src/app/pages/admin/SafetyEventsDashboard.tsx`

**Features**:
- Instant crisis alert notifications
- Real-time alert queue updates
- Admin assignment notifications
- Alert status changes

**Events**:
```typescript
// Server → Admin
socket.on('crisis:alert', alertData);
socket.on('crisis:assigned', assignment);
socket.on('crisis:resolved', resolution);
```

---

### **3. In-App Notifications** 🔔
**Frontend**: `/src/app/pages/app/Notifications.tsx`

**Features**:
- Real-time notification delivery
- Read/unread status sync
- Multi-device sync
- Badge count updates

**Events**:
```typescript
// Server → Client
socket.on('notification:new', notification);
socket.on('notification:read', notificationId);
```

---

### **4. Live Session Monitoring (Admin)** 👁️
**Frontend**: `/src/app/pages/admin/LiveSessionsOverview.tsx`

**Features**:
- Real-time active session count
- Session start/end notifications
- User connection status
- Session duration updates

**Events**:
```typescript
// Server → Admin
socket.on('session:started', sessionData);
socket.on('session:ended', sessionData);
socket.on('session:update', sessionData);
```

---

### **5. Admin Dashboard Updates** 📊
**Frontend**: Various admin pages

**Features**:
- Real-time user count updates
- Live analytics updates
- System health monitoring
- Activity feed

---

## 🛠️ **HOW TO IMPLEMENT**

### **Phase 11 Tasks** (4-6 hours)

#### **Task 11.1: Setup WebSocket Server** (2 hours)

**Create**: `/backend-starter/api-server/src/websocket/index.ts`

```typescript
import { Server } from 'socket.io';
import { createServer } from 'http';
import { app } from '../app';
import { authenticateSocket } from './middleware';
import { setupHandlers } from './handlers';

// Create HTTP server
const httpServer = createServer(app);

// Create Socket.io server
export const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Authentication middleware
io.use(authenticateSocket);

// Setup event handlers
setupHandlers(io);

// Export HTTP server for starting
export { httpServer };
```

**Update**: `/backend-starter/api-server/src/server.ts`

```typescript
import { httpServer } from './websocket';

// Start server with WebSocket support
httpServer.listen(PORT, () => {
  logger.info(`🚀 Ezri API Server running on port ${PORT}`);
  logger.info(`🔌 WebSocket server ready`);
});
```

---

#### **Task 11.2: Create Event Handlers** (2 hours)

**Create**: `/backend-starter/api-server/src/websocket/handlers.ts`

```typescript
import { Server, Socket } from 'socket.io';
import { logger } from '../utils/logger';

export const setupHandlers = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.user.id;
    const userRole = socket.data.user.role;
    
    logger.info(`User connected: ${userId}`);
    
    // Join user-specific room
    socket.join(`user_${userId}`);
    
    // Join admin room if admin
    if (userRole === 'admin' || userRole === 'super') {
      socket.join('admin');
      logger.info(`Admin joined admin room: ${userId}`);
    }
    
    // Handle conversation events
    handleConversationEvents(socket, io);
    
    // Handle voice events
    handleVoiceEvents(socket, io);
    
    // Handle admin events
    if (userRole === 'admin' || userRole === 'super') {
      handleAdminEvents(socket, io);
    }
    
    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${userId}`);
    });
  });
};

// Conversation event handlers
const handleConversationEvents = (socket: Socket, io: Server) => {
  const userId = socket.data.user.id;
  
  socket.on('conversation:start', async (data) => {
    try {
      // Create conversation in database
      const conversation = await createConversation(userId, data.avatarId);
      
      // Join conversation room
      socket.join(`conversation_${conversation.id}`);
      
      // Notify admins of new session
      io.to('admin').emit('session:started', {
        userId,
        conversationId: conversation.id,
        timestamp: new Date(),
      });
      
      // Confirm to user
      socket.emit('conversation:started', { conversationId: conversation.id });
    } catch (error) {
      socket.emit('error', { message: 'Failed to start conversation' });
    }
  });
  
  socket.on('conversation:message', async (data) => {
    try {
      // Forward message to AI service
      const response = await fetch(`${process.env.AI_SERVICE_URL}/api/v1/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          conversationId: data.conversationId,
          message: data.message,
        }),
      });
      
      const aiResponse = await response.json();
      
      // Check for crisis detection
      if (aiResponse.crisis_detected) {
        // Alert admins immediately
        io.to('admin').emit('crisis:alert', {
          userId,
          conversationId: data.conversationId,
          severity: aiResponse.severity,
          signals: aiResponse.detected_signals,
          timestamp: new Date(),
        });
        
        // Update user safety state
        socket.emit('safety:state_change', {
          state: aiResponse.safety_state,
          resources: aiResponse.resources,
        });
      }
      
      // Send AI response to user
      socket.emit('ai:response', aiResponse);
      
    } catch (error) {
      socket.emit('error', { message: 'Failed to get AI response' });
    }
  });
  
  socket.on('conversation:end', async (data) => {
    try {
      // End conversation in database
      await endConversation(data.conversationId);
      
      // Notify admins
      io.to('admin').emit('session:ended', {
        userId,
        conversationId: data.conversationId,
        duration: data.duration,
        timestamp: new Date(),
      });
      
      // Leave conversation room
      socket.leave(`conversation_${data.conversationId}`);
      
      socket.emit('conversation:ended', { success: true });
    } catch (error) {
      socket.emit('error', { message: 'Failed to end conversation' });
    }
  });
};

// Voice event handlers
const handleVoiceEvents = (socket: Socket, io: Server) => {
  const userId = socket.data.user.id;
  
  socket.on('voice:data', async (audioChunk) => {
    try {
      // Send to AI service for processing
      const response = await fetch(`${process.env.AI_SERVICE_URL}/api/v1/voice/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: audioChunk,
      });
      
      const result = await response.json();
      
      // Send transcription back
      socket.emit('voice:transcription', { text: result.transcription });
      
      // Send AI audio response
      socket.emit('voice:audio', result.audioResponse);
      
    } catch (error) {
      socket.emit('error', { message: 'Voice processing failed' });
    }
  });
};

// Admin event handlers
const handleAdminEvents = (socket: Socket, io: Server) => {
  socket.on('admin:assign_crisis', async (data) => {
    try {
      // Assign crisis alert to admin
      await assignCrisisAlert(data.alertId, socket.data.user.id);
      
      // Notify all admins of assignment
      io.to('admin').emit('crisis:assigned', {
        alertId: data.alertId,
        assignedTo: socket.data.user.id,
        timestamp: new Date(),
      });
      
    } catch (error) {
      socket.emit('error', { message: 'Failed to assign crisis alert' });
    }
  });
  
  socket.on('admin:resolve_crisis', async (data) => {
    try {
      // Resolve crisis alert
      await resolveCrisisAlert(data.alertId, data.notes);
      
      // Notify all admins
      io.to('admin').emit('crisis:resolved', {
        alertId: data.alertId,
        resolvedBy: socket.data.user.id,
        timestamp: new Date(),
      });
      
    } catch (error) {
      socket.emit('error', { message: 'Failed to resolve crisis alert' });
    }
  });
};
```

---

#### **Task 11.3: Create Authentication Middleware** (1 hour)

**Create**: `/backend-starter/api-server/src/websocket/middleware.ts`

```typescript
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

export const authenticateSocket = async (socket: Socket, next: Function) => {
  try {
    // Get token from handshake
    const token = socket.handshake.auth.token || 
                  socket.handshake.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return next(new Error('Authentication token required'));
    }
    
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Attach user data to socket
    socket.data.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    
    next();
  } catch (error) {
    next(new Error('Invalid authentication token'));
  }
};
```

---

#### **Task 11.4: Update Frontend to Connect** (1 hour)

**Install Socket.io Client**:
```bash
cd /path/to/frontend
npm install socket.io-client
```

**Create WebSocket Hook**: `/src/hooks/useWebSocket.ts`

```typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    // Get auth token
    const token = localStorage.getItem('auth_token');
    
    if (!token) return;
    
    // Connect to WebSocket server
    const newSocket = io('http://localhost:3001', {
      auth: { token },
      transports: ['websocket', 'polling'],
    });
    
    newSocket.on('connect', () => {
      console.log('✅ WebSocket connected');
      setConnected(true);
    });
    
    newSocket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
      setConnected(false);
    });
    
    newSocket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
    
    setSocket(newSocket);
    
    // Cleanup
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  return { socket, connected };
};
```

**Update ActiveSession.tsx**:

```typescript
import { useWebSocket } from '@/hooks/useWebSocket';

export function ActiveSession() {
  const { socket, connected } = useWebSocket();
  
  useEffect(() => {
    if (!socket || !connected) return;
    
    // Start conversation
    socket.emit('conversation:start', { avatarId: selectedAvatar });
    
    // Listen for AI responses
    socket.on('ai:response', (response) => {
      console.log('AI Response:', response);
      // Update UI with response
    });
    
    // Listen for crisis alerts
    socket.on('safety:state_change', (data) => {
      console.log('Safety state changed:', data);
      // Update safety UI
    });
    
    return () => {
      socket.off('ai:response');
      socket.off('safety:state_change');
    };
  }, [socket, connected]);
  
  // ... rest of component
}
```

---

## 📦 **DEPENDENCIES NEEDED**

### **Backend**
```bash
cd backend-starter/api-server
npm install socket.io
npm install @types/socket.io --save-dev
```

### **Frontend**
```bash
npm install socket.io-client
```

---

## 🔗 **INTEGRATION POINTS**

### **1. Frontend Pages That Need WebSocket**

| Page | File | WebSocket Events |
|------|------|------------------|
| Active Session | `/src/app/pages/app/ActiveSession.tsx` | `voice:data`, `ai:response`, `safety:state_change` |
| Notifications | `/src/app/pages/app/Notifications.tsx` | `notification:new`, `notification:read` |
| Admin Dashboard | `/src/app/pages/admin/AdminHome.tsx` | `session:started`, `session:ended` |
| Crisis Dashboard | `/src/app/pages/admin/SafetyEventsDashboard.tsx` | `crisis:alert`, `crisis:assigned`, `crisis:resolved` |
| Live Sessions | `/src/app/pages/admin/LiveSessionsOverview.tsx` | `session:started`, `session:ended`, `session:update` |

---

### **2. Backend Services That Emit Events**

| Service | Events Emitted |
|---------|----------------|
| Conversation Service | `session:started`, `session:ended` |
| AI Service | `ai:response`, `crisis:alert` |
| Notification Service | `notification:new` |
| Admin Service | `crisis:assigned`, `crisis:resolved` |

---

## ⚙️ **CONFIGURATION**

### **Environment Variables**

**`.env` (API Server)**:
```bash
# WebSocket
WEBSOCKET_PORT=3001
FRONTEND_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000

# Security
JWT_SECRET=your-secret-key
```

---

## 🧪 **TESTING WEBSOCKET**

### **Test Connection**:
```typescript
// In browser console
const socket = io('http://localhost:3001', {
  auth: { token: 'your-jwt-token' }
});

socket.on('connect', () => {
  console.log('Connected!');
});

socket.emit('conversation:start', { avatarId: 'avatar-1' });

socket.on('conversation:started', (data) => {
  console.log('Conversation started:', data);
});
```

---

## 📊 **WEBSOCKET EVENTS REFERENCE**

### **User Events**
```typescript
// Emit (Client → Server)
socket.emit('conversation:start', { avatarId: string });
socket.emit('conversation:message', { conversationId: string, message: string });
socket.emit('conversation:end', { conversationId: string, duration: number });
socket.emit('voice:data', audioChunk: Blob);

// Listen (Server → Client)
socket.on('conversation:started', (data) => {});
socket.on('ai:response', (data) => {});
socket.on('voice:audio', (data) => {});
socket.on('voice:transcription', (data) => {});
socket.on('safety:state_change', (data) => {});
socket.on('notification:new', (data) => {});
```

### **Admin Events**
```typescript
// Emit (Client → Server)
socket.emit('admin:assign_crisis', { alertId: string });
socket.emit('admin:resolve_crisis', { alertId: string, notes: string });

// Listen (Server → Client)
socket.on('crisis:alert', (data) => {});
socket.on('crisis:assigned', (data) => {});
socket.on('crisis:resolved', (data) => {});
socket.on('session:started', (data) => {});
socket.on('session:ended', (data) => {});
socket.on('session:update', (data) => {});
```

---

## 🎯 **SUMMARY**

### **Current Status:**
- ❌ **WebSocket NOT implemented** (0%)
- ✅ **Architecture documented** (100%)
- ✅ **Frontend UI ready** (100%)
- ❌ **Backend code** (0%)

### **What's Needed:**
1. Create WebSocket server setup
2. Create event handlers
3. Create authentication middleware
4. Connect frontend to WebSocket
5. Test real-time features

### **Time Estimate:**
- **4-6 hours** total
- Follow **Phase 11** in task checklist

### **Priority:**
- 🔴 **HIGH** - Required for real-time AI conversations
- 🔴 **CRITICAL** - Required for crisis alerts

---

**Next Step**: Start with Task 11.1 - Create `/backend-starter/api-server/src/websocket/index.ts` 🚀
