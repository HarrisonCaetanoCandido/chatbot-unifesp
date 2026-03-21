def request_runner(query: str):
    import requests
    import json

    response = requests.post(
        "http://localhost:8000/chat",
        json={
            "query": query,
            "session_id": "123"
        },
        timeout=360
    )

    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2, ensure_ascii=False))

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Call local /chat endpoint with a query string")
    parser.add_argument("query", nargs="?", default="Quantas horas de AC preciso fazer?", help="Query string to send to the API")
    args = parser.parse_args()

    request_runner(args.query)