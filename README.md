# 🤖 TCC — Chatbot Acadêmico da UNIFESP

Assistente conversacional multi-agente para alunos da Universidade Federal de São Paulo. Responde dúvidas sobre grade curricular, estágios, secretaria e processos administrativos com base em documentos oficiais da instituição.

---

## Arquitetura

```
Frontend (React + Vite + TypeScript)
        │
        ▼
API Gateway (FastAPI)
        │
        ▼
   LangGraph Graph
        │
    [router_node]  ← classifica a intenção por keywords
        │
   ┌────┼────┐
   ▼    ▼    ▼
acad career admin   ← agentes especializados
   └────┴────┘
        │
        ▼
  RAG Pipeline
  ┌──────────────────────────────┐
  │  Ollama (nomic-embed-text)   │  ← geração de embeddings
  │  Qdrant                      │  ← busca vetorial nos docs UNIFESP
  │  Ollama (llama3.2) or Groq   │  ← geração da resposta final (llm local ou Groq via API)
  └──────────────────────────────┘
        │
        ▼
     Redis  ← armazenamento de sessão
```

### Componentes

| Componente | Tecnologia | Responsabilidade |
|---|---|---|
| Frontend | React + Vite + TypeScript | Interface do usuário |
| API Gateway | FastAPI | Recebe requisições e aciona o grafo |
| Orquestração | LangGraph | Roteamento e execução dos agentes |
| Agente Academic | Llama 3.2 via Ollama or Groq (remoto) | Dúvidas sobre disciplinas, grade, TCC |
| Agente Career | Llama 3.2 via Ollama or Groq (remoto) | Estágio, mercado de trabalho, concursos |
| Agente Admin | Llama 3.2 via Ollama or Groq (remoto) | Secretaria, documentos, prazos |
| Embeddings | nomic-embed-text via Ollama | Vetorização das queries |
| Vector Store | Qdrant | Busca semântica nos documentos UNIFESP |
| Sessão | Redis | Cache de mensagens por sessão |

### Fluxo de uma requisição

1. O usuário envia uma mensagem pelo frontend
2. A API FastAPI recebe a query e invoca o grafo LangGraph
3. O `router_node` classifica a intenção via regex (academic / career / admin)
4. O agente correspondente recupera contexto via RAG:
   - A query é vetorizada pelo modelo `nomic-embed-text` no Ollama
   - O Qdrant retorna os chunks mais relevantes dos documentos UNIFESP
5. O agente monta o prompt com o contexto recuperado e chama o `llama3.2`
6. A resposta é retornada ao frontend

---

## Estrutura do Projeto

```
chatbot-unifesp/
├── frontend/               # React + Vite + TypeScript
│   └── ...
└── backend/
    ├── main.py             # Entrypoint FastAPI
    ├── graph.py            # Definição do grafo LangGraph
    ├── rag.py              # Pipeline de embeddings + busca no Qdrant
    ├── models.py           # GraphState, ChatRequest, ChatResponse
    ├── config.py           # Variáveis de ambiente
    ├── requirements.txt
    └── agents/
        ├── base.py         # Factory make_agent + chamada à LLM
        ├── router.py       # Classificação de intenção + route_decision
        ├── academic.py     # Agente de vida acadêmica
        ├── career.py       # Agente de carreira
        └── admin.py        # Agente administrativo
```

---

## Pré-requisitos

- Python 3.11+
- Node.js 20+
- [Ollama](https://ollama.com) instalado e rodando localmente
- Qdrant rodando (Docker recomendado)
- Redis rodando (Docker recomendado)

- (Opcional) Groq: serviço remoto de LLM. Se configurar `OLLAMA_GROQ_LLM_API_KEY`, o backend usará o Groq como provedor remoto; caso contrário, espera um Ollama local em `OLLAMA_BASE_URL`.

### Modelos Ollama necessários

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

Se pretende usar o Groq como provedor remoto em vez do servidor Ollama local, configure `OLLAMA_GROQ_LLM_API_KEY` e `OLLAMA_GROQ_LLM_MODEL` no arquivo `.env` (veja abaixo).

---

## Configuração

Crie um arquivo `.env` na pasta `backend/` com base nas variáveis abaixo:

```env
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_LLM_MODEL=llama3.2
OLLAMA_LLM_TEMPERATURE=0.2
OLLAMA_EMBED_MODEL=nomic-embed-text

# Opcional: usar Groq como provedor remoto (se setado, Groq é usado)
OLLAMA_GROQ_LLM_API_KEY=
OLLAMA_GROQ_LLM_MODEL=llama-3.3-70b-versatile

QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
QDRANT_COLLECTION=unifesp_docs

REDIS_URL=redis://localhost:6379

RAG_TOP_K=3

# Porta do gateway FastAPI (padrão: 8000)
GATEWAY_PORT=8000
```

---

## Como Rodar

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

A API estará disponível em `http://localhost:8000`.  
Documentação interativa: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
nvm use   # ou: nvm install 20 && nvm use 20
npm install
npm run dev
```

> ⚠️ O frontend ainda não foi integrado ao novo backend FastAPI. A comunicação com a API está em desenvolvimento.

## QDRANT

### `Create Collection on QDRANT`
```
curl -X PUT http://localhost:6333/collections/unifesp_docs \
  -H "Content-Type: application/json" \
  -d '{
    "vectors": {
      "size": 768,
      "distance": "Cosine"
    }
  }'
```

---

## API

### `GET /health`

Verifica se o serviço está no ar.

```json
{ "status": "ok", "service": "botifesp" }
```

### `POST /chat`

Envia uma mensagem ao chatbot.

**Request:**
```json
{
  "query": "Quais são os requisitos para fazer TCC?",
  "session_id": "opcional"
}
```

**Response:**
```json
{
  "query": "Quais são os requisitos para fazer TCC?",
  "intention": "academic",
  "context": "...trechos recuperados do Qdrant...",
  "answer": "Para realizar o TCC na UNIFESP..."
}
```

---

## Interfaces do Frontend

- **Home** — apresentação do projeto e acesso ao chat. Suporta exportação e importação de histórico em JSON.
- **Política de Privacidade** — rascunho para ambiente de produção.
- **Termos de Uso** — rascunho para ambiente de produção.

---

## Licença

Projeto acadêmico open-source desenvolvido como Trabalho de Conclusão de Curso (TCC) na UNIFESP.