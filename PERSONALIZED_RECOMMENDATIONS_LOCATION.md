# 🎯 Personalized Recommendations - Location Guide

## **WHERE ARE PERSONALIZED RECOMMENDATIONS?**

**Status**: ✅ **UI Exists** | ❌ **Backend ML Not Implemented**

---

## 📍 **MAIN LOCATION: Safety Insights Page**

### **Primary Recommendations Page**
- **File**: `/src/app/pages/app/SafetyInsights.tsx`
- **Route**: `/app/safety-insights`
- **Section**: "Personalized Recommendations" (Line 395-405)

**Features**:
- ✅ Dynamic recommendation cards
- ✅ Icon-based categorization
- ✅ Action buttons (Set Reminder, Update Plan, View Resources)
- ✅ Smart algorithm based on user patterns

**Code Reference**:
```tsx
// Line 395-405
{/* Personalized Recommendations */}
{insights.recommendations.length > 0 && (
  <div>
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
      <Sparkles className="w-5 h-5 text-primary" />
      Personalized Recommendations
    </h2>
    {/* Recommendation cards rendered here */}
  </div>
)}
```

---

## 🧠 **RECOMMENDATION ENGINE (Frontend)**

### **Recommendation Generation Logic**
**Location**: `/src/app/pages/app/SafetyInsights.tsx` (Lines 157-234)

**Function**: `generateRecommendations()`

**Generates 5 Types of Recommendations**:

1. **Time-Based Recommendations** (Lines 160-173)
   - Analyzes when user needs most support
   - Example: "Most difficult time is evenings. Consider scheduling check-ins at 8 PM"

2. **Trigger-Based Recommendations** (Lines 175-188)
   - Identifies common triggers
   - Example: "Work stress is a frequent trigger. Add coping strategies to your safety plan"

3. **Resource Usage Recommendations** (Lines 190-200)
   - Suggests resources based on activity
   - Example: "You haven't used many resources. Explore support tools"

4. **Trend-Based Recommendations** (Lines 202-221)
   - Analyzes patterns (increasing/decreasing/stable)
   - Example: "Increased activity noticed. Consider reaching out to your trusted contacts"

5. **Self-Care Recommendations** (Lines 223-231)
   - General wellness suggestions
   - Example: "Daily self-care. Try breathing exercises or guided meditations"

---

## 📊 **HOW RECOMMENDATIONS WORK**

### **Data Analysis**
```typescript
// Analyzes user's safety data:
- State distribution (NORMAL, ELEVATED_CONCERN, HIGH_RISK, etc.)
- Time patterns (morning, afternoon, evening, night)
- Day patterns (weekday, weekend)
- Triggers (work, relationships, health, etc.)
- Trend (increasing, decreasing, stable)
- Resource usage history
```

### **Example Recommendations**:

#### **Type 1: Time Pattern**
```
🕐 Evening Support Recommended
Most difficult time is evenings (6 PM - 10 PM). 
Consider scheduling check-ins or having coping tools ready at 8 PM.

[Action: Set Reminder] → /app/settings/notifications
```

#### **Type 2: Trigger Management**
```
⚠️ Manage Work-Related Triggers
Work stress is a frequent trigger. 
Consider adding specific coping strategies to your safety plan.

[Action: Update Safety Plan] → /app/settings/safety-plan
```

#### **Type 3: Resource Exploration**
```
📞 Explore Support Resources
You haven't used many resources yet. 
Browse helpful content and tools designed for your needs.

[Action: View Resources] → /app/crisis-resources
```

#### **Type 4: Trend Alert**
```
📈 Increased Activity Noticed
High-risk events have increased in the last 2 weeks. 
Consider reaching out to your trusted contacts or therapist.

[Action: Contact Support] → /app/trusted-contacts
```

#### **Type 5: Self-Care**
```
💚 Daily Self-Care
Regular self-care practices can help prevent escalation. 
Explore breathing exercises, journaling, or guided meditations.

[Action: Start Exercise] → /app/wellness-tools
```

---

## 🎨 **UI DISPLAY**

### **Recommendation Card Design**
```tsx
<Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
  <div className="flex items-start gap-3">
    {/* Icon */}
    <div className="p-2 rounded-lg bg-blue-500 text-white">
      <Icon className="w-5 h-5" />
    </div>
    
    {/* Content */}
    <div className="flex-1">
      <h3 className="font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      
      {/* Action Button */}
      <Button onClick={() => navigate(actionLink)}>
        {action}
      </Button>
    </div>
  </div>
</Card>
```

---

## 📍 **OTHER LOCATIONS WITH RECOMMENDATIONS**

### **2. Dashboard Insights**
- **File**: `/src/app/pages/app/Dashboard.tsx`
- **Route**: `/app/dashboard` or `/app/home`
- **Section**: "Your Insights" (Lines 277-320)

**Features**:
- Mood trends
- Streak tracking
- Weekly goals
- Personalized tips

**Example**:
```
📈 Mood Trending Up
Your average mood improved 15% this week

🔥 7 Day Streak!
Keep up the great work checking in daily

🎯 Weekly Goal: 80%
4 of 5 check-ins completed
```

---

### **3. Resources Library**
- **File**: `/src/app/pages/app/Resources.tsx`
- **Route**: `/app/resources`
- **Section**: Resource cards with personalized filtering

**Features**:
- ✅ "Recommended for you" badge (potential)
- ✅ Favorited resources
- ✅ Recently viewed
- ✅ Popular in your category

**Note**: Backend would add personalized sorting based on:
- User's mental health goals
- Past session topics
- Mood patterns
- Engagement history

---

### **4. Session Lobby**
- **File**: `/src/app/pages/app/SessionLobby.tsx`
- **Route**: `/app/session-lobby`
- **Section**: Avatar selection

**Potential Recommendations**:
- Suggested avatar based on current mood
- Recommended session type
- Best time to session based on patterns

---

### **5. Admin: User Insights**
- **File**: `/src/app/pages/admin/UserDetails.tsx`
- **Route**: `/admin/users/:id`

**Recommendations for Admins**:
- Recommended interventions
- Suggested resources for specific users
- Optimal engagement strategies

---

## ❌ **BACKEND: NOT IMPLEMENTED**

### **What's Missing**

#### **AI Service Endpoint**
- **File**: `/backend-starter/ai-service/app/api/v1/endpoints/insights.py`
- **Status**: ❌ Placeholder only
- **Current Code**:
```python
@router.get("/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    """
    TODO: Implement ML-based recommendations
    """
    return {"recommendations": []}  # Empty placeholder
```

---

## 🛠️ **HOW TO IMPLEMENT BACKEND**

### **Option 1: Rule-Based System** (Quick - 4-6 hours)

**Update**: `/backend-starter/ai-service/app/api/v1/endpoints/insights.py`

```python
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta

router = APIRouter()

class Recommendation(BaseModel):
    type: str
    icon: str
    title: str
    description: str
    action: str
    actionLink: str
    priority: int

@router.get("/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    """
    Generate personalized recommendations based on user data
    """
    
    # Fetch user data
    user_data = await fetch_user_analytics(user_id)
    
    recommendations = []
    
    # Time-based recommendation
    if user_data.get('most_difficult_time'):
        recommendations.append({
            "type": "time",
            "icon": "Clock",
            "title": "Evening Support Recommended",
            "description": f"Most difficult time is {user_data['most_difficult_time']}. Consider scheduling check-ins.",
            "action": "Set Reminder",
            "actionLink": "/app/settings/notifications",
            "priority": 1
        })
    
    # Trigger-based recommendation
    top_trigger = user_data.get('top_trigger')
    if top_trigger:
        recommendations.append({
            "type": "trigger",
            "icon": "AlertTriangle",
            "title": f"Manage {top_trigger.title()}-Related Triggers",
            "description": f"{top_trigger.title()} is a frequent trigger. Add coping strategies to your safety plan.",
            "action": "Update Safety Plan",
            "actionLink": "/app/settings/safety-plan",
            "priority": 2
        })
    
    # Resource usage recommendation
    if user_data.get('resource_views', 0) < 3:
        recommendations.append({
            "type": "resource",
            "icon": "Phone",
            "title": "Explore Support Resources",
            "description": "Browse helpful content and tools designed for your needs.",
            "action": "View Resources",
            "actionLink": "/app/crisis-resources",
            "priority": 3
        })
    
    # Trend-based recommendation
    if user_data.get('trend') == 'increasing':
        recommendations.append({
            "type": "trend",
            "icon": "TrendingUp",
            "title": "Increased Activity Noticed",
            "description": "Consider reaching out to your trusted contacts or therapist.",
            "action": "Contact Support",
            "actionLink": "/app/trusted-contacts",
            "priority": 1
        })
    elif user_data.get('trend') == 'decreasing':
        recommendations.append({
            "type": "trend",
            "icon": "TrendingDown",
            "title": "Positive Progress!",
            "description": "Your patterns show improvement. Keep up the great work!",
            "action": "View Progress",
            "actionLink": "/app/progress",
            "priority": 4
        })
    
    # Self-care recommendation (always show)
    recommendations.append({
        "type": "selfcare",
        "icon": "Heart",
        "title": "Daily Self-Care",
        "description": "Regular practices can help prevent escalation of concerns.",
        "action": "Start Exercise",
        "actionLink": "/app/wellness-tools",
        "priority": 5
    })
    
    # Sort by priority
    recommendations.sort(key=lambda x: x['priority'])
    
    return {"recommendations": recommendations[:5]}  # Return top 5


async def fetch_user_analytics(user_id: str):
    """
    Fetch user's analytics data from database
    """
    # Query database for:
    # - Safety events (last 30 days)
    # - Mood patterns
    # - Session history
    # - Resource views
    # - Trigger frequency
    
    return {
        "most_difficult_time": "evenings",
        "top_trigger": "work",
        "resource_views": 2,
        "trend": "stable",
        "safety_events_last_14": 5,
        "safety_events_previous_14": 5,
    }
```

---

### **Option 2: ML-Based Recommendations** (Advanced - 20-40 hours)

**Features**:
- Collaborative filtering
- Content-based recommendations
- User behavior clustering
- Temporal pattern analysis
- Sentiment-based suggestions

**Tech Stack**:
- scikit-learn for clustering
- TensorFlow/PyTorch for deep learning
- OpenAI GPT-4 for content generation

**Implementation**:
```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

class RecommendationEngine:
    def __init__(self):
        self.user_clusters = None
        self.resource_embeddings = None
    
    async def get_recommendations(self, user_id: str):
        # 1. Fetch user profile
        user_profile = await self.get_user_profile(user_id)
        
        # 2. Cluster users by behavior
        cluster = self.find_user_cluster(user_profile)
        
        # 3. Find similar users
        similar_users = self.get_cluster_users(cluster)
        
        # 4. Collaborative filtering
        popular_resources = self.get_popular_in_cluster(similar_users)
        
        # 5. Content-based filtering
        personalized_resources = self.match_user_goals(
            user_profile['goals'], 
            popular_resources
        )
        
        # 6. Generate recommendations
        recommendations = self.format_recommendations(
            personalized_resources,
            user_profile
        )
        
        return recommendations
    
    def find_user_cluster(self, profile):
        """Cluster users by behavior patterns"""
        features = [
            profile['mood_avg'],
            profile['session_frequency'],
            profile['crisis_frequency'],
            profile['resource_engagement']
        ]
        
        scaler = StandardScaler()
        features_scaled = scaler.fit_transform([features])
        
        cluster = self.user_clusters.predict(features_scaled)[0]
        return cluster
```

---

### **Option 3: OpenAI GPT-4 Recommendations** (Medium - 8-12 hours)

**Best Balance**: Accuracy + Speed

```python
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def generate_ai_recommendations(user_id: str):
    """
    Use GPT-4 to generate personalized recommendations
    """
    
    # Fetch user context
    user_data = await get_user_context(user_id)
    
    prompt = f"""Generate 5 personalized mental health recommendations for this user:

User Profile:
- Mental Health Goals: {user_data['goals']}
- Recent Mood: {user_data['recent_moods']}
- Common Triggers: {user_data['triggers']}
- Session Frequency: {user_data['session_frequency']}
- Crisis Events (30d): {user_data['crisis_count']}
- Resource Engagement: {user_data['resource_views']}

Generate recommendations in this JSON format:
{{
  "recommendations": [
    {{
      "type": "time|trigger|resource|trend|selfcare",
      "icon": "Clock|AlertTriangle|Phone|TrendingUp|Heart",
      "title": "Short actionable title",
      "description": "Personalized description with user context",
      "action": "Action button text",
      "actionLink": "/app/path",
      "priority": 1-5
    }}
  ]
}}

Focus on:
1. Most actionable recommendations
2. Based on their specific patterns
3. Prioritize crisis prevention
4. Encourage engagement with helpful resources
"""

    response = await client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "system", "content": "You are a mental health recommendation expert."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        response_format={"type": "json_object"}
    )
    
    recommendations = json.loads(response.choices[0].message.content)
    return recommendations
```

---

## 🔗 **INTEGRATION WITH FRONTEND**

### **Update Frontend to Call Backend**

**File**: `/src/app/pages/app/SafetyInsights.tsx`

```typescript
// Replace current mock logic with API call

const fetchRecommendations = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/insights/recommendations/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    const data = await response.json();
    setRecommendations(data.recommendations);
  } catch (error) {
    console.error('Failed to fetch recommendations:', error);
    // Fallback to frontend logic
    const mockRecs = generateRecommendations(userData);
    setRecommendations(mockRecs);
  }
};

useEffect(() => {
  fetchRecommendations();
}, [userId]);
```

---

## 📊 **RECOMMENDATION TYPES**

| Type | Icon | When to Show | Priority |
|------|------|--------------|----------|
| **Time-Based** | 🕐 Clock | User has time patterns | High |
| **Trigger-Based** | ⚠️ AlertTriangle | Common triggers detected | High |
| **Resource** | 📞 Phone | Low engagement | Medium |
| **Trend** | 📈 TrendingUp/Down | Pattern changes | High |
| **Self-Care** | 💚 Heart | Always show | Low |
| **Goal Progress** | 🎯 Target | Goal completion | Medium |
| **Social** | 👥 Users | Trusted contacts | Medium |
| **Professional** | 🏥 Hospital | Crisis threshold | Critical |

---

## 🎯 **RECOMMENDATION ALGORITHM**

### **Scoring System**
```typescript
Recommendation Priority = 
  (Relevance Score × 0.4) +
  (Urgency Score × 0.3) +
  (Engagement Score × 0.2) +
  (Recency Score × 0.1)

Where:
- Relevance: How well it matches user patterns
- Urgency: How critical the recommendation is
- Engagement: Likelihood user will act on it
- Recency: How recent the data is
```

---

## 📈 **METRICS TO TRACK**

**Recommendation Effectiveness**:
- Click-through rate (CTR)
- Action completion rate
- Time to action
- User feedback/ratings
- Impact on outcomes (mood improvement, crisis reduction)

---

## 🎉 **SUMMARY**

### **Current Status:**
- ✅ **Frontend UI** - Fully designed and functional
- ✅ **Mock Recommendations** - Rule-based frontend logic
- ❌ **Backend API** - Not implemented
- ❌ **ML Engine** - Not built

### **Where to Find It:**
1. **Main Page**: `/app/safety-insights` - Personalized Recommendations section
2. **Dashboard**: `/app/dashboard` - Your Insights section
3. **Resources**: `/app/resources` - (Potential personalized sorting)

### **Implementation Options:**
1. **Rule-Based** (4-6h) - Good enough for MVP
2. **GPT-4** (8-12h) - Best accuracy quickly
3. **ML** (20-40h) - Long-term optimization

### **Recommended Approach:**
Start with **GPT-4 recommendations** (Option 3) for best balance of quality and development time.

---

**Personalized recommendations exist in the UI and work with frontend logic, but need backend ML integration for true personalization!** 🎯✨
