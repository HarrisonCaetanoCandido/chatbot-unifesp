import requests 
from qdrant_client import QdrantClient
from config import (
    OLLAMA_BASE_URL,
    OLLAMA_EMBED_MODEL,
    QDRANT_URL,
    QDRANT_API_KEY,
    QDRANT_COLLECTION,
    TOP_K
)
from typing import List

qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

def get_embedding(text: str) -> List[float]:
    """Gera embedding via Ollama (nomic-embed-text)"""
    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/embeddings",
        json={"model": OLLAMA_EMBED_MODEL, "prompt": text}
    )
    response.raise_for_status()
    return response.json()["embedding"]

def recover_context(query: str, top_k: int = TOP_K) -> str:
    """Recupera os chunks mais relevantes do Qdrant"""
    query_embedding = get_embedding(query)

    # pensar se nao é uma boa explorar metricas de proximidade mais eficientes em tempo de execucao
    search_result = qdrant.query_points(
        collection_name=QDRANT_COLLECTION,
        query=query_embedding,
        limit=top_k
    ).points
    excerpt = [hit.payload.get("content", "") for hit in search_result]
    return "\n---\n".join(excerpt)