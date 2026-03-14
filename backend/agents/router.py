import re
from models import GraphState

# keywords por dominio, tres inicialmente, mas podemos expandir
ACADEMIC_KW= r"[dD]isciplina|[gG]rade|[cC]urriculo|[tT]rancamento|[mM]atricula|[nN]ota|[pP]rofessor|[aA]luno|[sS]emestre|[cC]urso|[eE]xame|[hH]orario|[vV]estibular"
CAREER_KW = r"[eE]stágio|[oO]portunidade|[eE]mprego|[cC]arreira|[mM]ercado|[pP]rofissão|[cC]oncurso|[eE]mpresa|[rR]egião|[rR]ecrutamento"
ADMIN_KW= r"[mM]atricula|[sS]ecretaria|[cC]arteirinha|[hH]orário|[pP]rédio|[cC]ampus|[aA]tendimento|[dD]ocumento|[hH]istorico|[sS]erviço"

def router_node(state: GraphState) -> GraphState:
    """
    Node de roteamento que decide qual agente deve ser ativado com base na mensagem do usuário.
    """
    message = state["query"]

    if re.search(ACADEMIC_KW, message):
        intent = "academic"
    elif re.search(CAREER_KW, message):
        intent = "career"
    elif re.search(ADMIN_KW, message):
        intent = "admin"
    else:
        intent = "academic"

    return {**state, "intention": intent}

def route_decision(state: GraphState) -> str:
    """
    Função de decisão para as edges condicionais do grafo.
    Retorna o nome do próximo node com base na intenção detectada.
    """
    return state["intention"]


