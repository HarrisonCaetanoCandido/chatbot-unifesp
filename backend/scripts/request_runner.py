
import sys
from pathlib import Path

project_root = Path(__file__).resolve().parents[2]
sys.path.append(str(project_root))
from backend.config import GATEWAY_PORT


def request_runner(query: str):
    import requests
    import json

    response = requests.post(
        f"http://localhost:{GATEWAY_PORT}/chat",
        json={
            "query": query,
            "session_id": "123"
        }
    )

    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Call local /chat endpoint with a query string")
    parser.add_argument("query", nargs="?", default="Quantas horas de AC preciso fazer?", help="Query string to send to the API")
    args = parser.parse_args()

    request_runner(args.query)