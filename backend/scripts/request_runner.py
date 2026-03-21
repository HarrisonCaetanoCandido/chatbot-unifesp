def request_runner(query: str):
    import json
    import sys
    from pathlib import Path
    import requests

    project_root = Path(__file__).resolve().parents[2]
    if str(project_root) not in sys.path:
        sys.path.insert(0, str(project_root))

    from backend.utils.http import get_session

    try:
        response = get_session().post(
            "http://localhost:8000/chat",
            json={"query": query, "session_id": "123"},
            timeout=360,
        )
        response.raise_for_status()
        print(f"Status: {response.status_code}")
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    except requests.Timeout:
        print("[ERRO] Requisição excedeu o tempo limite.", file=sys.stderr)
    except requests.RequestException as e:
        print(f"[ERRO] Falha na requisição: {e}", file=sys.stderr)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Call local /chat endpoint with a query string")
    parser.add_argument("query", nargs="?", default="Quantas horas de AC preciso fazer?", help="Query string to send to the API")
    args = parser.parse_args()

    request_runner(args.query)