from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest, ChatResponse
from graph import botifesp_graph
import threading
from agents.base import warmup_model
from config import GATEWAY_PORT

app = FastAPI(title="CHATBOT UNIFESP API", version="0.1.0", PORT=GATEWAY_PORT)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    def _bg_warmup():
        try:
            warmup_model()
        except Exception as e:
            print(f"[WARN] Warmup falhou: {e}")

    threading.Thread(target=_bg_warmup, daemon=True).start()


@app.get("/health")
def health():
    return {"status": "ok", "service": "botifesp"}


@app.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest):
    """
    Endpoint principal. Recebe a pergunta do usuário,
    passa pelo grafo LangGraph e retorna a resposta gerada localmente.
    """
    try:
        state = botifesp_graph.invoke({"query": body.query})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

    return ChatResponse(
        query=state["query"],
        intention=state.get("intention", "academic"),
        context=state.get("context", ""),
        answer=state.get("answer", ""),
    )