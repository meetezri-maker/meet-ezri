"""
Ezri AI Service - FastAPI Main Application
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from datetime import datetime

from app.config.settings import settings
from app.api.v1.router import api_router

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.API_VERSION,
    description="AI Service for Ezri Mental Health Platform",
    debug=settings.DEBUG
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix=f"/api/{settings.API_VERSION}")

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        logger.info(f"WebSocket connected: {user_id}")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            logger.info(f"WebSocket disconnected: {user_id}")

    async def send_message(self, message: dict, user_id: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_json(message)

manager = ConnectionManager()

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": settings.APP_NAME,
        "version": settings.API_VERSION,
        "status": "running",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ezri-ai-service",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.websocket("/ws/conversation/{user_id}")
async def websocket_conversation(websocket: WebSocket, user_id: str):
    """WebSocket endpoint for real-time AI conversations"""
    await manager.connect(websocket, user_id)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_json()
            
            logger.info(f"Received message from {user_id}: {data.get('type')}")
            
            # Process based on message type
            if data.get('type') == 'voice_data':
                # Handle voice data
                response = await process_voice_data(data, user_id)
            elif data.get('type') == 'text_message':
                # Handle text message
                response = await process_text_message(data, user_id)
            else:
                response = {"error": "Unknown message type"}
            
            # Send response back to client
            await manager.send_message(response, user_id)
            
    except WebSocketDisconnect:
        manager.disconnect(user_id)
    except Exception as e:
        logger.error(f"WebSocket error for {user_id}: {str(e)}")
        manager.disconnect(user_id)

async def process_voice_data(data: dict, user_id: str) -> dict:
    """Process voice data from user"""
    # TODO: Implement voice processing
    return {
        "type": "voice_response",
        "message": "Voice processing not yet implemented"
    }

async def process_text_message(data: dict, user_id: str) -> dict:
    """Process text message from user"""
    # TODO: Implement text message processing
    return {
        "type": "text_response",
        "message": "Text processing not yet implemented"
    }

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Global exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc) if settings.DEBUG else "An error occurred"
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
