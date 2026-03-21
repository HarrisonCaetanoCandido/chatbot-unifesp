import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / ".env")

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_LLM_MODEL = os.getenv("OLLAMA_LLM_MODEL", "llama3.2")
OLLAMA_LLM_TEMPERATURE = float(os.getenv("OLLAMA_LLM_TEMPERATURE", "0.2"))
OLLAMA_EMBED_MODEL = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")
OLLAMA_GROQ_LLM_API_KEY = os.getenv("OLLAMA_GROQ_LLM_API_KEY", "")
OLLAMA_GROQ_LLM_MODEL = os.getenv("OLLAMA_GROQ_LLM_MODEL", "llama-3.3-70b-versatile")
OLLAMA_MAX_COMPLETION_TOKENS = int(os.getenv("OLLAMA_MAX_COMPLETION_TOKENS", "300"))
# Se nao temos API KEY do Groq configurada, usamos o servidor Ollama local
LOCAL_LLM = False if len(OLLAMA_GROQ_LLM_API_KEY) > 0 else True

QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", "")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "unifesp_docs")
QDRANT_CHUNK_SIZE = int(os.getenv("QDRANT_CHUNK_SIZE", "500"))
QDRANT_OVERLAP = int(os.getenv("QDRANT_OVERLAP", "50"))

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

TOP_K = int(os.getenv("RAG_TOP_K", "3"))

