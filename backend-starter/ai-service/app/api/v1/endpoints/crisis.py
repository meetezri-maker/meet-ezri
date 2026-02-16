"""
Crisis Detection Endpoints - Placeholder
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

class CrisisRequest(BaseModel):
    text: str
    conversation_history: List[dict] = []

class CrisisResponse(BaseModel):
    crisis_detected: bool
    severity: str  # 'low', 'medium', 'high', 'critical'
    detected_signals: List[str]
    safety_state: str  # 'NORMAL', 'ELEVATED_CONCERN', 'HIGH_RISK', 'SAFETY_MODE'
    recommended_actions: List[str]

@router.post("/detect", response_model=CrisisResponse)
async def detect_crisis(request: CrisisRequest):
    """
    Detect crisis signals in text
    TODO: Implement ML-based crisis detection
    """
    return CrisisResponse(
        crisis_detected=False,
        severity="low",
        detected_signals=[],
        safety_state="NORMAL",
        recommended_actions=[]
    )
