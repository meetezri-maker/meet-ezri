# Real-Time AI Voice Conversations - Feature Location

## 🎙️ **Where is this feature in the web app?**

---

## ✅ **WHAT'S BUILT (Frontend UI)**

### **1. Session Lobby Screen** 
**Location**: `/src/app/pages/app/SessionLobby.tsx`  
**Route**: `/app/session-lobby`

**Features:**
- ✅ Start session now or schedule for later
- ✅ Select session duration (15/30/45/60 min)
- ✅ Choose AI avatar (Alex, Sarah, Michael, Emma)
- ✅ Choose voice style (Warm, Calm, Professional, Gentle)
- ✅ Pre-session checklist
- ✅ View upcoming scheduled sessions
- ✅ Beautiful UI with animations

---

### **2. Active Session Screen** 
**Location**: `/src/app/pages/app/ActiveSession.tsx`  
**Route**: `/app/active-session`

**Features:**
- ✅ Live video call interface (FaceTime-style)
- ✅ Avatar video display
- ✅ Microphone toggle (mute/unmute)
- ✅ Camera toggle (on/off)
- ✅ Speaker toggle (sound on/off)
- ✅ Session timer
- ✅ Connection quality indicator
- ✅ Credits/minutes remaining display
- ✅ End session button
- ✅ Permission request flow (mic/camera)
- ✅ AI speaking indicator
- ✅ Safety state monitoring (crisis detection UI)
- ✅ Safety resources panel
- ✅ Beautiful gradient backgrounds
- ✅ Smooth animations

---

### **3. How to Access:**

1. **Login** → `/login`
2. **Dashboard** → `/app/dashboard`
3. **Click "Start Session"** button
4. **Session Lobby** → `/app/session-lobby`
5. **Click "Start Now"**
6. **Active Session** → `/app/active-session` ✅

---

## ❌ **WHAT'S MISSING (Backend)**

The UI is **100% complete**, but the **actual AI voice functionality** needs backend implementation:

### **Missing Components:**

1. **OpenAI Whisper Integration** ❌
   - Speech-to-text conversion
   - Real-time transcription
   - **File**: `/backend-starter/ai-service/app/api/v1/endpoints/voice.py` (placeholder only)

2. **ElevenLabs Integration** ❌
   - Text-to-speech conversion
   - Lifelike voice synthesis
   - Multiple voice options
   - **File**: `/backend-starter/ai-service/app/api/v1/endpoints/voice.py` (placeholder only)

3. **WebSocket Real-Time Communication** ❌
   - Low-latency audio streaming
   - Bidirectional voice data
   - **File**: `/backend-starter/api-server/src/websocket/index.ts` (placeholder only)

4. **AI Conversation Logic** ❌
   - GPT-4 conversation management
   - Context preservation
   - Personality system
   - **File**: `/backend-starter/ai-service/app/api/v1/endpoints/conversation.py` (placeholder only)

5. **Session Management** ❌
   - Create/end sessions
   - Track duration
   - Deduct minutes/credits
   - Save conversation history
   - **File**: `/backend-starter/api-server/src/controllers/sessions.controller.ts` (empty)

---

## 🔧 **CURRENT STATE**

### **What Works Now:**
- ✅ **UI is fully functional** - All buttons, animations, states work
- ✅ **Demo mode** - You can click through the entire flow
- ✅ **Mock data** - Shows sample session data
- ✅ **Local state** - Timer works, buttons toggle
- ✅ **Safety detection UI** - Shows crisis states visually

### **What's Simulated:**
- ⚠️ **Avatar video** - Static image (not live video)
- ⚠️ **Voice input** - Mic button works but doesn't capture audio
- ⚠️ **Voice output** - No actual voice from Ezri
- ⚠️ **AI responses** - No real AI conversation
- ⚠️ **Session saving** - No backend persistence

---

## 🚀 **HOW TO IMPLEMENT (Backend)**

### **Phase 7 from Task List** - AI Service Integration (8-10 hours)

#### **Step 1: Setup AI Service** (2 hours)
```bash
cd backend-starter/ai-service

# Install dependencies
pip install -r requirements.txt

# Add to .env
OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...

# Start service
uvicorn app.main:app --reload
```

#### **Step 2: Implement Whisper (Speech-to-Text)** (1-2 hours)
**File**: `/backend-starter/ai-service/app/api/v1/endpoints/voice.py`

```python
from openai import OpenAI

@router.post("/transcribe")
async def transcribe_audio(audio: UploadFile):
    """Convert speech to text using Whisper"""
    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    
    audio_file = await audio.read()
    
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file,
        response_format="json"
    )
    
    return {"text": transcript.text}
```

#### **Step 3: Implement ElevenLabs (Text-to-Speech)** (1-2 hours)
**File**: `/backend-starter/ai-service/app/api/v1/endpoints/voice.py`

```python
import requests

@router.post("/synthesize")
async def synthesize_speech(text: str, voice_id: str):
    """Convert text to speech using ElevenLabs"""
    
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    
    headers = {
        "xi-api-key": settings.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
    }
    
    data = {
        "text": text,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }
    
    response = requests.post(url, json=data, headers=headers)
    
    return {"audio_url": response.content}
```

#### **Step 4: Implement WebSocket** (2-3 hours)
**File**: `/backend-starter/api-server/src/websocket/handlers.ts`

```typescript
export const handleVoiceConversation = (socket: Socket) => {
  socket.on('audio-chunk', async (audioData) => {
    // 1. Send audio to AI service for transcription
    const transcript = await aiService.transcribe(audioData);
    
    // 2. Send transcript to GPT-4 for response
    const aiResponse = await aiService.chat(transcript);
    
    // 3. Send response to ElevenLabs for voice
    const audioResponse = await aiService.synthesize(aiResponse);
    
    // 4. Stream audio back to client
    socket.emit('ai-audio', audioResponse);
  });
};
```

#### **Step 5: Connect Frontend to Backend** (1 hour)
**File**: Update `/src/app/pages/app/ActiveSession.tsx`

```typescript
import { io } from 'socket.io-client';

// Connect to WebSocket
const socket = io('http://localhost:3001');

// Send audio to backend
const sendAudioChunk = (audioBlob: Blob) => {
  socket.emit('audio-chunk', audioBlob);
};

// Receive AI audio response
socket.on('ai-audio', (audioData) => {
  const audio = new Audio(audioData);
  audio.play();
});
```

#### **Step 6: Implement Session Management** (1-2 hours)
**File**: `/backend-starter/api-server/src/controllers/sessions.controller.ts`

```typescript
export const createSession = async (req, res) => {
  const { userId, avatarId, duration } = req.body;
  
  const session = await prisma.conversation.create({
    data: {
      userId,
      avatarId,
      sessionId: generateSessionId(),
      status: 'active',
      startedAt: new Date(),
    }
  });
  
  return res.json(session);
};

export const endSession = async (req, res) => {
  const { sessionId } = req.params;
  
  const session = await prisma.conversation.update({
    where: { sessionId },
    data: {
      status: 'completed',
      endedAt: new Date(),
      durationSeconds: calculateDuration(),
    }
  });
  
  // Deduct credits
  await deductUserCredits(session.userId, session.durationSeconds);
  
  return res.json(session);
};
```

---

## 📂 **File Locations Summary**

### **Frontend (✅ COMPLETE)**
```
/src/app/pages/app/
├── SessionLobby.tsx        ✅ Session setup & scheduling
├── ActiveSession.tsx       ✅ Live voice call interface
└── SessionHistory.tsx      ✅ Past sessions view
```

### **Backend (❌ NEEDS IMPLEMENTATION)**
```
/backend-starter/ai-service/app/api/v1/endpoints/
├── voice.py                ❌ Whisper + ElevenLabs
├── conversation.py         ❌ GPT-4 chat logic
└── crisis.py               ❌ Crisis detection

/backend-starter/api-server/src/
├── websocket/
│   ├── index.ts            ❌ WebSocket server setup
│   └── handlers.ts         ❌ Audio streaming handlers
├── controllers/
│   └── sessions.controller.ts  ❌ Session CRUD
└── routes/
    └── sessions.routes.ts      ❌ Session endpoints
```

---

## 🎯 **To See the UI Right Now:**

1. **Run the frontend:**
   ```bash
   npm run dev
   ```

2. **Navigate to:**
   - http://localhost:5173/login
   - Login with demo credentials
   - Click "Start Session" on dashboard
   - See the beautiful UI! ✅

3. **What you'll see:**
   - ✅ Gorgeous session lobby
   - ✅ Avatar selection
   - ✅ Voice selection
   - ✅ Duration picker
   - ✅ Live session interface
   - ✅ All buttons and controls
   - ✅ Smooth animations

---

## 🎬 **What the Final Feature Will Look Like:**

### **User Flow:**
1. User clicks "Start Session" → Session Lobby
2. User selects avatar & voice → Click "Start Now"
3. **Permission request** → Mic/Camera access
4. **Live video appears** → User sees AI avatar
5. **User speaks** → Whisper transcribes in real-time
6. **GPT-4 responds** → AI generates contextual response
7. **ElevenLabs speaks** → User hears lifelike voice
8. **Conversation continues** → Natural back-and-forth
9. **Safety monitoring** → Crisis detection in background
10. **User ends session** → Credits deducted, history saved

---

## ⏱️ **Implementation Time Estimate:**

| Task | Time | Priority |
|------|------|----------|
| Setup AI service | 2h | CRITICAL |
| Whisper integration | 2h | CRITICAL |
| ElevenLabs integration | 2h | CRITICAL |
| WebSocket setup | 3h | CRITICAL |
| Session management | 2h | HIGH |
| Frontend connection | 1h | HIGH |
| Testing & polish | 2h | MEDIUM |
| **TOTAL** | **14 hours** | - |

---

## 💡 **Key Points:**

1. ✅ **Frontend is 100% complete** - Beautiful UI ready
2. ❌ **Backend is 0% complete** - Needs implementation
3. 🎯 **Follow Task 7.1-7.13** in the checklist
4. ⏱️ **~14 hours of work** to make it fully functional
5. 🔑 **You'll need:**
   - OpenAI API key (for Whisper + GPT-4)
   - ElevenLabs API key (for voice synthesis)
   - WebSocket server (Socket.io)
   - Supabase database (for sessions)

---

## 🚀 **Next Steps:**

1. **See the UI now**: http://localhost:5173/app/session-lobby
2. **Start backend**: Follow `/backend-starter/BACKEND_TASKS_CHECKLIST.md`
3. **Phase 7 tasks**: Tasks 7.1 through 7.13
4. **Get API keys**: OpenAI + ElevenLabs
5. **Implement WebSocket**: Real-time audio streaming
6. **Connect frontend**: Update ActiveSession.tsx

---

**Bottom Line**: The voice AI feature has an **amazing, production-ready UI** but needs the **backend services implemented** to make it actually work with real AI voices! 🎙️✨
