import requests
from rag import recover_context
from config import OLLAMA_BASE_URL, OLLAMA_LLM_MODEL
from models import GraphState

def _call_ollama(prompt: str) -> str:
    """Chama o modelo LLM via Ollama e retorna a resposta."""
    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/generate",
        json={
            "model": OLLAMA_LLM_MODEL, 
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": 0.2}
            }
    )

    response.raise_for_status()
    return response.json()["response"].strip()

def make_agent(system_prompt: str):
    """Factory para criar um nó de agente para o LangGraph.
    Cada agente especializado usa o mesmo fluxo:
    1. Recupera contexto relevante via RAG
    2. Monta prompt com system_prompt específico do domínio
    3. Chama ollama e retorna state atualizado
    """
    def agent_node(state: GraphState) -> GraphState:
        query = state["query"]
        context = recover_context(query)

        prompt = (
            f"{system_prompt}\n\n"
            f"Use o contexto abaixo para responder à pergunta de forma precisa, direta, clara e humanizada.\n\n"
            f"Como se estivesse conversando com um colega.\n\n"
            f"Use no máximo 3 parágrafos curtos ou uma lista simples quando necessário.\n\n"
            f"Não repita informações do contexto literalmente. Vá direto ao ponto.\n\n"
            f"Contexto:\n{context.strip()}\n\n"
            f"Pergunta: {query}\n"
            f"Resposta:"
        )

        answer = _call_ollama(prompt)
        return {**state, "context": context, "answer": answer}

    return agent_node