from langgraph.graph import StateGraph, END
from models import GraphState
from agents.router import router_node, route_decision
from agents.academic import academic_node
from agents.career import career_node
from agents.admin import admin_node


def build_graph():
    """
    Constrói e compila o grafo LangGraph do botifesp.

    Fluxo:
        START → router → (academic | career | admin) → END
    """
    graph = StateGraph(GraphState)

    graph.add_node("router", router_node)
    graph.add_node("academic", academic_node)
    graph.add_node("career", career_node)
    graph.add_node("admin", admin_node)

    graph.set_entry_point("router")

    graph.add_conditional_edges(
        "router",
        route_decision,
        {
            "academic": "academic",
            "career": "career",
            "admin": "admin",
        },
    )

    graph.add_edge("academic", END)
    graph.add_edge("career", END)
    graph.add_edge("admin", END)

    return graph.compile()


botifesp_graph = build_graph()