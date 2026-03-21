import threading
import requests

# Armazenamento local de threads para instâncias de requests.Session para evitar o compartilhamento
# de uma única Session entre threads (thread de warmup vs threads de tratamento de requisições).
_thread_local = threading.local()

def get_session() -> requests.Session:
    """Return a thread-local requests.Session, creating it lazily."""
    session = getattr(_thread_local, "session", None)
    if session is None:
        session = requests.Session()
        _thread_local.session = session
    return session
