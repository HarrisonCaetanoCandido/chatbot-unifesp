from typing import TypedDict, Optional
from pydantic import BaseModel

class GraphState(TypedDict):
    query: str
    intention: Optional[str]
    context: Optional[str]
    answer: Optional[str]

class ChatRequest(BaseModel):
    query: str
    session_id: Optional[str]

class ChatResponse(BaseModel):
    query: str
    intention: str
    context: str
    answer: str