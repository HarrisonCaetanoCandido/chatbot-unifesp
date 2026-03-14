import uuid
import requests
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
from config import (
    QDRANT_URL,
    QDRANT_COLLECTION,
    OLLAMA_BASE_URL,
    OLLAMA_EMBED_MODEL,
    QDRANT_CHUNK_SIZE,
    QDRANT_OVERLAP
)

def chunk_text(text: str) -> list[str]:
    chunks = []
    start = 0
    while start < len(text):
        end = start + QDRANT_CHUNK_SIZE
        chunks.append(text[start:end])
        start = end - QDRANT_OVERLAP
    return chunks

def get_embedding(text: str) -> list[float]:
    r = requests.post(
        f"{OLLAMA_BASE_URL}/api/embeddings",
        json={"model": OLLAMA_EMBED_MODEL, "prompt": text}
    )
    r.raise_for_status()
    return r.json()["embedding"]

def ingest(filepath: str):
    with open(filepath, "r", encoding="utf-8") as f:
        text = f.read()

    chunks = chunk_text(text)
    client = QdrantClient(url=QDRANT_URL)

    points = []
    for i, chunk in enumerate(chunks):
        embedding = get_embedding(chunk)
        points.append(PointStruct(
            id=str(uuid.uuid4()),
            vector=embedding,
            payload={"content": chunk, "source": filepath, "chunk_index": i}
        ))

    client.upsert(collection_name=QDRANT_COLLECTION, points=points)
    print(f"✅ {len(points)} chunks inseridos de '{filepath}'")

if __name__ == "__main__":
    import sys
    ingest(sys.argv[1])