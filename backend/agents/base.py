import requests
import time
import threading
from utils.http import get_session
from rag import recover_context
from config import OLLAMA_BASE_URL, OLLAMA_LLM_MODEL, OLLAMA_LLM_TEMPERATURE, OLLAMA_GROQ_LLM_API_KEY, OLLAMA_GROQ_LLM_MODEL, LOCAL_LLM, OLLAMA_MAX_COMPLETION_TOKENS
from models import GraphState
from groq import Groq

groq = Groq(api_key=OLLAMA_GROQ_LLM_API_KEY)

def _call_ollama(prompt: str, system_prompt: str,stream: bool = False, timeout: int = 300) -> str:
    """Chama o modelo LLM via Ollama e retorna a resposta."""
    print(f"[DEBUG] Tamanho do prompt: {len(prompt)} chars")

    if(LOCAL_LLM == False):
        print("[DEBUG] Usando Groq para chamada ao modelo Ollama")
        start = time.perf_counter()
        completion = groq.chat.completions.create(
            model=OLLAMA_GROQ_LLM_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=OLLAMA_LLM_TEMPERATURE,
            max_completion_tokens=OLLAMA_MAX_COMPLETION_TOKENS
        ) 
        elapsed = time.perf_counter() - start
        print(f"[DEBUG] Groq /api/generate elapsed={elapsed:.2f}s")
        return completion.choices[0].message.content.strip()
    else:
        print("[DEBUG] Usando chamada direta via requests para modelo local")
        payload = {
            "model": OLLAMA_LLM_MODEL,
            "prompt": prompt,
            "stream": stream,
            "options": {"temperature": OLLAMA_LLM_TEMPERATURE},
        }

        # Incluir sys_prompt quando fornecido para que o server local ollama
        # receba o mesmo contexto de sistema usado no caminho Groq.
        if system_prompt:
            payload["system"] = system_prompt

        start = time.perf_counter()
        response = get_session().post(f"{OLLAMA_BASE_URL}/api/generate", json=payload, timeout=timeout)
        elapsed = time.perf_counter() - start
        print(f"[DEBUG] Ollama /api/generate elapsed={elapsed:.2f}s status={response.status_code}")

        response.raise_for_status()
        if stream:
            return response.text
        return response.json().get("response", "").strip()


def warmup_model() -> None:
    try:
        if LOCAL_LLM == False:
            print("[DEBUG] Pulando warmup. LLM disponibilizada via Groq")
            return
        print("[INFO] Realizando warmup do modelo Ollama local...")
        _call_ollama("Aquecimento do modelo. Responda com 'ok' ou similar.", "Este é um prompt de warmup para preparar o modelo para respostas rápidas. Responda com 'ok' ou similar para indicar que está pronto.")
        print("[INFO] Warmup realizado no modelo Ollama local.")
    except Exception as e:
        print(f"[WARN] Warmup falhou: {e}")


def make_agent(system_prompt: str):
    def agent_node(state: GraphState) -> GraphState:
        query = state["query"]
        context = recover_context(query)

        prompt = (
            f"Use o contexto abaixo para responder à pergunta de forma precisa, direta, clara e humanizada,\n\n"
            f"como se estivesse conversando com um colega.\n\n"
            f"Use no máximo 3 parágrafos curtos ou uma lista simples quando necessário.\n\n"
            f"Não repita informações do contexto literalmente. Vá direto ao ponto.\n\n"
            f"Contexto:\n{context.strip()}\n\n"
            f"Pergunta: {query}\n"
            f"Resposta:"
        )

        answer = _call_ollama(prompt, system_prompt=system_prompt, stream=False)
        return {**state, "context": context, "answer": answer}

    return agent_node