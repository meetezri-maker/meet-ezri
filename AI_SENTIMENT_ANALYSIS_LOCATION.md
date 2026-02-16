# AI Sentiment Analysis - Feature Location Guide

## 🧠 **WHERE IS AI SENTIMENT ANALYSIS IN EZRI?**

---

## 📊 **CURRENT STATUS: PARTIALLY IMPLEMENTED**

**Frontend**: ✅ **UI Displays Sentiment** (100% Complete)  
**Backend**: ❌ **Placeholder Only** (0% Complete)

---

## 📍 **WHERE IT EXISTS IN THE WEB APP**

### **1. Admin: Conversation Transcripts**
**Location**: `/src/app/pages/admin/ConversationTranscripts.tsx`  
**Route**: `/admin/conversation-transcripts`

**Features**:
- ✅ Shows sentiment for each message (positive, neutral, negative, crisis)
- ✅ Overall conversation sentiment score
- ✅ Sentiment color coding (green, gray, orange, red)
- ✅ Sentiment badges on messages
- ✅ Sentiment filtering

**Example Data**:
```typescript
interface Message {
  id: string;
  speaker: 'user' | 'ai';
  text: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'crisis'; // ✅ Displayed
}

interface Transcript {
  sentiment: 'positive' | 'neutral' | 'concerning' | 'crisis'; // ✅ Overall score
  messages: Message[];
}
```

**Screenshot from Code**:
```tsx
// Lines 29-42 - Sentiment is part of message structure
sentiment?: 'positive' | 'neutral' | 'negative' | 'crisis';

// Lines 97-142 - Mock data shows sentiment analysis
{
  speaker: 'user',
  text: "I've been feeling really overwhelmed...",
  sentiment: 'negative' // ✅ Automatically detected (mock)
}
```

---

### **2. Frontend: Safety Detection (Mock)**
**Location**: `/src/app/utils/safetyDetection.ts`

**Features**:
- ✅ Keyword-based sentiment analysis (mock)
- ✅ Detects emotional states (overwhelmed, hopeless, struggling)
- ✅ Assigns confidence scores
- ✅ Triggers safety states based on sentiment

**Current Implementation** (Lines 51-120):
```typescript
export function analyzeTextForSafety(text: string): {
  suggestedState: SafetyState;
  detectedSignals: string[];
  confidence: number;
}

// Detection patterns:
ELEVATED_CONCERN: ['overwhelmed', 'hopeless', 'struggling']
HIGH_RISK: ['give up', 'no point', 'burden']
SAFETY_MODE: ['urgent crisis', 'end it', 'plan']
```

**Note**: ⚠️ This is **mock/keyword-based**, not real AI sentiment analysis.

---

### **3. Admin: Content Moderation**
**Location**: `/src/app/pages/admin/ContentModeration.tsx`

**Features**:
- ✅ Flags content based on sentiment severity
- ✅ Shows "critical", "high", "medium", "low" severity
- ✅ Auto-detection of concerning content

**Example** (Lines 44-47):
```typescript
{
  content: "I've been feeling really down lately...",
  flagReason: "Suicidal ideation detected", // ✅ Sentiment-based
  severity: "critical",
  flaggedBy: "auto" // ✅ AI detection
}
```

---

## ❌ **WHERE IT'S MISSING (Backend)**

### **Backend Placeholder (NOT Implemented)**

**Location**: `/backend-starter/ai-service/app/api/v1/endpoints/sentiment.py`

**Current Code** (Lines 1-29):
```python
"""
Sentiment Analysis Endpoints - Placeholder
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str  # 'positive', 'negative', 'neutral'
    score: float  # -1.0 to 1.0
    confidence: float

@router.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze sentiment of text
    TODO: Implement actual sentiment analysis  # ❌ NOT IMPLEMENTED
    """
    return SentimentResponse(
        sentiment="neutral",  # ❌ Always returns neutral
        score=0.0,           # ❌ Always returns 0.0
        confidence=0.5       # ❌ Always returns 0.5
    )
```

**Status**: 🔴 **Placeholder Only** - Always returns neutral sentiment

---

## 🛠️ **HOW TO IMPLEMENT REAL AI SENTIMENT ANALYSIS**

### **Phase 7: AI Service Integration** (Task 7.4)

#### **Option 1: OpenAI GPT-4 Sentiment Analysis** (Recommended)

**Update**: `/backend-starter/ai-service/app/api/v1/endpoints/sentiment.py`

```python
"""
Sentiment Analysis Endpoints - OpenAI Implementation
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from openai import AsyncOpenAI
from app.core.config import settings
from typing import List, Optional
import json

router = APIRouter()
client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

class SentimentRequest(BaseModel):
    text: str
    context: Optional[str] = None  # Previous messages for context

class EmotionDetail(BaseModel):
    emotion: str
    intensity: float  # 0.0 to 1.0

class SentimentResponse(BaseModel):
    sentiment: str  # 'positive', 'negative', 'neutral', 'crisis'
    score: float  # -1.0 to 1.0
    confidence: float
    emotions: List[EmotionDetail]
    crisis_indicators: List[str]
    suggested_action: str

@router.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze sentiment of text using GPT-4
    Detects emotions, crisis signals, and provides actionable insights
    """
    
    try:
        # Create prompt for GPT-4
        prompt = f"""Analyze the sentiment and emotional state of this text from a mental health perspective.

Text: "{request.text}"

Provide a JSON response with:
1. sentiment: 'positive', 'negative', 'neutral', or 'crisis'
2. score: numeric score from -1.0 (very negative) to 1.0 (very positive)
3. confidence: how confident you are (0.0 to 1.0)
4. emotions: list of detected emotions with intensity (e.g., [{{"emotion": "anxiety", "intensity": 0.8}}])
5. crisis_indicators: list of any concerning phrases or signals
6. suggested_action: brief recommendation (e.g., "Continue support", "Offer resources", "Immediate intervention")

Focus on mental health indicators like:
- Hopelessness, helplessness
- Suicidal ideation
- Self-harm thoughts
- Severe anxiety or depression
- Loss of purpose
- Emotional overwhelm

Return only valid JSON."""

        # Call GPT-4
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are a mental health sentiment analysis expert. Analyze text for emotional state and crisis signals."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,  # Low temperature for consistent analysis
            response_format={"type": "json_object"}
        )
        
        # Parse response
        result = json.loads(response.choices[0].message.content)
        
        return SentimentResponse(
            sentiment=result.get('sentiment', 'neutral'),
            score=result.get('score', 0.0),
            confidence=result.get('confidence', 0.5),
            emotions=[
                EmotionDetail(**emotion) 
                for emotion in result.get('emotions', [])
            ],
            crisis_indicators=result.get('crisis_indicators', []),
            suggested_action=result.get('suggested_action', 'Continue monitoring')
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sentiment analysis failed: {str(e)}")


@router.post("/batch-analyze")
async def batch_analyze_sentiment(texts: List[str]):
    """
    Analyze sentiment for multiple texts at once
    Useful for analyzing entire conversations
    """
    results = []
    
    for text in texts:
        try:
            result = await analyze_sentiment(SentimentRequest(text=text))
            results.append(result)
        except Exception as e:
            results.append({
                "error": str(e),
                "text": text[:50] + "..."
            })
    
    return {"results": results}


@router.post("/conversation-trend")
async def analyze_conversation_trend(messages: List[dict]):
    """
    Analyze sentiment trend across an entire conversation
    Returns overall mood trajectory
    """
    
    # Extract text from messages
    conversation_text = "\n".join([
        f"{msg.get('speaker', 'user')}: {msg.get('text', '')}"
        for msg in messages
    ])
    
    prompt = f"""Analyze the emotional trajectory of this mental health conversation:

{conversation_text}

Provide JSON with:
1. overall_sentiment: 'improving', 'stable', 'declining', 'crisis'
2. sentiment_trajectory: array of sentiment scores for each message
3. key_concerns: list of main emotional themes
4. progress_indicators: positive signs in the conversation
5. warning_signs: concerning patterns or statements
6. recommendation: overall clinical recommendation

Return only valid JSON."""

    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo-preview",
            messages=[
                {
                    "role": "system",
                    "content": "You are analyzing conversation trends in mental health sessions."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        return json.loads(response.choices[0].message.content)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Trend analysis failed: {str(e)}")
```

---

#### **Option 2: HuggingFace Transformers (Open Source)**

**Install Dependencies**:
```bash
cd backend-starter/ai-service
pip install transformers torch
```

**Implementation**:
```python
"""
Sentiment Analysis - HuggingFace Transformers
"""

from fastapi import APIRouter
from pydantic import BaseModel
from transformers import pipeline
import torch

router = APIRouter()

# Load sentiment analysis model
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

# Load emotion detection model
emotion_analyzer = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    score: float
    confidence: float
    emotions: dict

@router.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """
    Analyze sentiment using HuggingFace models
    """
    
    # Get sentiment
    sentiment_result = sentiment_analyzer(request.text)[0]
    
    # Get emotions
    emotion_results = emotion_analyzer(request.text)[0]
    emotions = {
        result['label']: result['score']
        for result in emotion_results
    }
    
    # Map to our sentiment scale
    if sentiment_result['label'] == 'POSITIVE':
        sentiment = 'positive'
        score = sentiment_result['score']
    else:
        sentiment = 'negative'
        score = -sentiment_result['score']
    
    # Check for crisis indicators in emotions
    crisis_emotions = ['sadness', 'fear', 'anger']
    crisis_score = sum(emotions.get(e, 0) for e in crisis_emotions)
    
    if crisis_score > 2.0:
        sentiment = 'crisis'
    
    return SentimentResponse(
        sentiment=sentiment,
        score=score,
        confidence=sentiment_result['score'],
        emotions=emotions
    )
```

---

#### **Option 3: Custom Fine-Tuned Model (Advanced)**

**Best for**: Mental health-specific sentiment analysis

**Steps**:
1. Collect mental health conversation dataset
2. Label data with sentiment + crisis indicators
3. Fine-tune BERT or RoBERTa on dataset
4. Deploy custom model

**Example**:
```python
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

# Load custom fine-tuned model
model = AutoModelForSequenceClassification.from_pretrained(
    "your-org/mental-health-sentiment-model"
)
tokenizer = AutoTokenizer.from_pretrained(
    "your-org/mental-health-sentiment-model"
)

def analyze_mental_health_sentiment(text: str):
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model(**inputs)
    
    # Get predictions
    predictions = torch.softmax(outputs.logits, dim=1)
    
    # Map to sentiment classes
    sentiment_classes = ['positive', 'neutral', 'negative', 'crisis']
    sentiment_scores = predictions[0].tolist()
    
    return {
        'sentiment': sentiment_classes[predictions.argmax().item()],
        'scores': dict(zip(sentiment_classes, sentiment_scores))
    }
```

---

## 🔗 **INTEGRATION WITH FRONTEND**

### **Update ActiveSession.tsx**

```typescript
// /src/app/pages/app/ActiveSession.tsx

const analyzeSentiment = async (text: string) => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/sentiment/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ text })
    });
    
    const result = await response.json();
    
    // Update UI based on sentiment
    if (result.sentiment === 'crisis') {
      // Trigger crisis protocol
      updateSafetyState('SAFETY_MODE');
      showCrisisResources();
    } else if (result.sentiment === 'negative') {
      updateSafetyState('ELEVATED_CONCERN');
    }
    
    return result;
  } catch (error) {
    console.error('Sentiment analysis failed:', error);
  }
};

// Analyze user message before sending
const handleUserMessage = async (message: string) => {
  // Analyze sentiment
  const sentiment = await analyzeSentiment(message);
  
  // Send to AI with sentiment context
  sendToAI({
    message,
    sentiment: sentiment.sentiment,
    emotions: sentiment.emotions
  });
};
```

---

### **Update Admin Dashboard**

```typescript
// /src/app/pages/admin/ConversationTranscripts.tsx

const loadTranscriptWithSentiment = async (sessionId: string) => {
  // Fetch transcript
  const transcript = await fetchTranscript(sessionId);
  
  // Analyze sentiment for each message
  const messagesWithSentiment = await Promise.all(
    transcript.messages.map(async (msg) => {
      const sentiment = await fetch('/api/v1/sentiment/analyze', {
        method: 'POST',
        body: JSON.stringify({ text: msg.text })
      }).then(r => r.json());
      
      return {
        ...msg,
        sentiment: sentiment.sentiment,
        emotions: sentiment.emotions
      };
    })
  );
  
  // Get overall conversation trend
  const trend = await fetch('/api/v1/sentiment/conversation-trend', {
    method: 'POST',
    body: JSON.stringify({ messages: transcript.messages })
  }).then(r => r.json());
  
  return {
    ...transcript,
    messages: messagesWithSentiment,
    overallTrend: trend
  };
};
```

---

## 📦 **DEPENDENCIES NEEDED**

### **Option 1: OpenAI (Recommended)**
```bash
cd backend-starter/ai-service
pip install openai
```

**Cost**: ~$0.01 per 1,000 tokens (GPT-4)

### **Option 2: HuggingFace (Free)**
```bash
pip install transformers torch
```

**Cost**: Free, runs on your server

### **Option 3: Cloud APIs**
- **Google Cloud Natural Language API**
- **AWS Comprehend**
- **Azure Text Analytics**

---

## 🎯 **USE CASES IN EZRI**

### **1. Real-Time Crisis Detection**
- Analyze every message during active session
- Trigger safety protocols automatically
- Alert admins to high-risk conversations

### **2. Conversation Quality Monitoring**
- Track sentiment trends over time
- Measure therapy effectiveness
- Identify users needing additional support

### **3. Content Moderation**
- Auto-flag concerning journal entries
- Prioritize admin review queue
- Protect community spaces

### **4. Personalized Insights**
- Show users their emotional patterns
- Visualize mood improvements
- Celebrate positive progress

### **5. Admin Analytics**
- Dashboard showing overall user sentiment
- Identify platform-wide trends
- Measure intervention effectiveness

---

## 📊 **EXAMPLE API RESPONSES**

### **Basic Sentiment Analysis**
```json
POST /api/v1/sentiment/analyze

Request:
{
  "text": "I've been feeling really overwhelmed and hopeless lately"
}

Response:
{
  "sentiment": "negative",
  "score": -0.75,
  "confidence": 0.92,
  "emotions": [
    { "emotion": "sadness", "intensity": 0.8 },
    { "emotion": "anxiety", "intensity": 0.7 },
    { "emotion": "hopelessness", "intensity": 0.9 }
  ],
  "crisis_indicators": ["overwhelmed", "hopeless"],
  "suggested_action": "Offer coping resources and check for crisis signals"
}
```

### **Conversation Trend**
```json
POST /api/v1/sentiment/conversation-trend

Request:
{
  "messages": [
    { "speaker": "user", "text": "I'm struggling..." },
    { "speaker": "ai", "text": "I hear you..." },
    { "speaker": "user", "text": "That helps, thank you" }
  ]
}

Response:
{
  "overall_sentiment": "improving",
  "sentiment_trajectory": [-0.7, 0.0, 0.4],
  "key_concerns": ["initial distress", "seeking support"],
  "progress_indicators": ["expressing gratitude", "feeling heard"],
  "warning_signs": [],
  "recommendation": "Continue current approach, user responding well"
}
```

---

## ⏱️ **IMPLEMENTATION TIME**

| Approach | Time | Accuracy | Cost |
|----------|------|----------|------|
| **OpenAI GPT-4** | 2-3h | 95%+ | $0.01/1k tokens |
| **HuggingFace** | 4-6h | 85% | Free |
| **Custom Model** | 40-80h | 98%+ | Free (after training) |

---

## 🎯 **RECOMMENDED APPROACH**

### **Phase 1: OpenAI GPT-4** (Quick Win)
- ✅ Fastest to implement (2-3 hours)
- ✅ Highest accuracy out-of-box
- ✅ Mental health context understanding
- ⚠️ API costs (but cheap for MVP)

### **Phase 2: HuggingFace** (Cost Optimization)
- Switch to open-source models at scale
- Run on your infrastructure
- Fine-tune for better accuracy

### **Phase 3: Custom Model** (Long-term)
- Train on your conversation data
- Optimize for Ezri-specific use cases
- Best accuracy for mental health context

---

## 📝 **TASK CHECKLIST**

**Phase 7.4: Sentiment Analysis** (2-4 hours)

- [ ] **Task 7.4.1**: Choose sentiment analysis approach (OpenAI/HuggingFace)
- [ ] **Task 7.4.2**: Update `/backend-starter/ai-service/app/api/v1/endpoints/sentiment.py`
- [ ] **Task 7.4.3**: Add sentiment to conversation endpoint
- [ ] **Task 7.4.4**: Create batch analysis endpoint
- [ ] **Task 7.4.5**: Create conversation trend endpoint
- [ ] **Task 7.4.6**: Connect frontend to sentiment API
- [ ] **Task 7.4.7**: Update admin dashboard to show real sentiment
- [ ] **Task 7.4.8**: Add sentiment to crisis detection pipeline
- [ ] **Task 7.4.9**: Test with sample conversations
- [ ] **Task 7.4.10**: Deploy and monitor

---

## 🚀 **SUMMARY**

### **Current State:**
- ✅ **Frontend UI ready** - Displays sentiment data (100%)
- ⚠️ **Mock detection** - Keyword-based only (not AI)
- ❌ **Backend API** - Placeholder only (0%)

### **What's Needed:**
1. Implement real AI sentiment analysis (OpenAI or HuggingFace)
2. Connect frontend to backend API
3. Add sentiment to crisis detection pipeline
4. Test with real conversations

### **Priority:**
- 🟡 **MEDIUM** - Nice to have, improves crisis detection
- 🔵 **Enhancement** - Makes admin insights more valuable

### **Time Estimate:**
- **2-4 hours** (OpenAI)
- **4-6 hours** (HuggingFace)

---

**Next Step**: Implement OpenAI sentiment analysis in `/backend-starter/ai-service/app/api/v1/endpoints/sentiment.py` 🧠✨
