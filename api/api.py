from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import requests
import os

app = Flask(__name__)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

TOP_K = 3
COLLECTION_NAME = ""
OPENAI_API_KEY = ""
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
MODEL = "gpt-3.5-turbo"

from qdrant_client import QdrantClient

client = QdrantClient(url="",
        api_key=""
      )

def recuperar_contexto(pergunta: str, top_k=TOP_K) -> str:
    pergunta_embedding = embedder.encode(pergunta).tolist()
    result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=pergunta_embedding,
        limit=top_k,
    )
    trechos = [hit.payload["content"] for hit in result]
    return "\n---\n".join(trechos)

def gerar_resposta_com_chatgpt(contexto: str, pergunta: str) -> str:
    prompt = (
        "Você é um assistente da coordenação da Universidade Federal de São Paulo.\n"
        f"Use o contexto abaixo para responder à pergunta de forma precisa e direta.\n"
        f"Contexto:\n{contexto.strip()}\n\n"
        f"Pergunta: {pergunta}\n"
        "Resposta:"
    )

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "Você é um assistente da coordenação da Universidade Federal de São Paulo."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2
    }

    response = requests.post(OPENAI_API_URL, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        resposta = data["choices"][0]["message"]["content"].strip()
        return resposta
    else:
        return f"Erro: {response.status_code} - {response.text}"

@app.route("/responder", methods=["POST"])
def responder_api():
    data = request.get_json()
    pergunta = data.get("pergunta")

    if not pergunta:
        return jsonify({"erro": "Campo 'pergunta' é obrigatório."}), 400

    try:
        contexto = recuperar_contexto(pergunta)
        resposta = gerar_resposta_com_chatgpt(contexto, pergunta)
        return jsonify({
            "pergunta": pergunta,
            "contexto": contexto,
            "resposta": resposta
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)