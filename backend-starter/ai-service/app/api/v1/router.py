"""
API v1 Router
"""

from fastapi import APIRouter
from app.api.v1.endpoints import conversation, sentiment, crisis, voice, insights

api_router = APIRouter()

# Include endpoint routers
api_router.include_router(
    conversation.router,
    prefix="/conversation",
    tags=["conversation"]
)

api_router.include_router(
    sentiment.router,
    prefix="/sentiment",
    tags=["sentiment"]
)

api_router.include_router(
    crisis.router,
    prefix="/crisis",
    tags=["crisis"]
)

api_router.include_router(
    voice.router,
    prefix="/voice",
    tags=["voice"]
)

api_router.include_router(
    insights.router,
    prefix="/insights",
    tags=["insights"]
)
