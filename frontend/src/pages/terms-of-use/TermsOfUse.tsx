import CustomFooter from "@/components/footer/CustomFooter";
import CustomHeader from "@/components/header/CustomHeader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'

export default function TermsOfUse() {

    useEffect(() => {
        const tstId = toast(() => (
            <a className="text-white" href="/">
                Voltar ao <b>Chat</b>
            </a>
        ), {
            duration: Infinity,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        return () => {
            toast.dismiss(tstId);
        };
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader />
            <section className="flex-1 bg-white px-8 py-6 w-full max-w-5xl mx-auto text-left text-gray-800 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-4">Termos de Uso</h1>
                <p className="mb-4"><strong>Última atualização:</strong> 19 de junho de 2025</p>
                <p className="mb-4">Seja bem-vindo ao Chatbot Unifesp! Ao utilizar esta aplicação, você concorda com os seguintes termos:</p>

                <h3 className="text-xl font-semibold mb-2">1. Objetivo da aplicação</h3>
                <p className="mb-4">O Chatbot Unifesp é uma ferramenta experimental desenvolvida como parte de um projeto acadêmico, com o objetivo de fornecer informações sobre processos internos da graduação do ICT-Unifesp.</p>

                <h3 className="text-xl font-semibold mb-2">2. Uso adequado</h3>
                <p className="mb-2">O usuário concorda em utilizar o chatbot apenas para fins informativos e acadêmicos. Não é permitido:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Utilizar o chatbot de forma abusiva ou ofensiva.</li>
                    <li>Tentar manipular ou explorar falhas do sistema.</li>
                    <li>Inserir informações falsas com o objetivo de prejudicar o desempenho do chatbot.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">3. Limitação de responsabilidade</h3>
                <p className="mb-2">Embora busquemos fornecer informações precisas, o Chatbot Unifesp:</p>
                <ul className="list-disc list-inside mb-2">
                    <li>Pode apresentar erros ou respostas imprecisas.</li>
                    <li>Não substitui o atendimento oficial da Unifesp.</li>
                    <li>Não deve ser usado como única fonte de decisão para questões acadêmicas importantes.</li>
                </ul>
                <p className="mb-4">Recomendamos sempre validar as informações junto aos canais oficiais da universidade.</p>

                <h3 className="text-xl font-semibold mb-2">4. Propriedade intelectual</h3>
                <p className="mb-4">O conteúdo do chatbot, incluindo código-fonte, estrutura de dados e modelo de IA, é de autoria de Harrison Caetano Cândido e Christian Freitas, no âmbito de um projeto acadêmico da Unifesp.</p>

                <h3 className="text-xl font-semibold mb-2">5. Privacidade</h3>
                <p className="mb-4">Ao utilizar o chatbot, você concorda com a nossa <Link to='/politica-de-privacidade' className="text-blue-600 underline">Política de Privacidade</Link>, disponível neste mesmo site.</p>

                <h3 className="text-xl font-semibold mb-2">6. Jurisdição</h3>
                <p className="mb-4">Este serviço é regido pelas leis brasileiras. Em caso de conflitos, o foro será o da Comarca de São José dos Campos/SP.</p>

                <h3 className="text-xl font-semibold mb-2">7. Contato</h3>
                <p className="mb-2">Para dúvidas ou solicitações relacionadas ao uso ou aos seus dados:</p>
                <ul className="list-disc list-inside">
                    <li>h.candido20@unifesp.br</li>
                    <li>christian.freitas@unifesp.br</li>
                </ul>
            </section>
            <CustomFooter />
        </div>
    );
}
