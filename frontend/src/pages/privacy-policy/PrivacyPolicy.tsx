import CustomFooter from "@/components/footer/CustomFooter";
import CustomHeader from "@/components/header/CustomHeader";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PrivacyPolicy() {
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
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <CustomHeader />
            <section className="flex-1 bg-white px-8 py-6 w-full max-w-5xl mx-auto text-left text-gray-800 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>
                <p className="mb-4"><strong>Última atualização:</strong> 19 de junho de 2025</p>

                <h3 className="text-xl font-semibold mb-2">1. Coleta de dados</h3>
                <p className="mb-4">Durante o uso do Chatbot Unifesp, podemos coletar os seguintes dados pessoais:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Nome</li>
                    <li>Email</li>
                    <li>Matrícula</li>
                    <li>Conteúdo das mensagens enviadas ao chatbot</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">2. Uso dos dados</h3>
                <p className="mb-4">Os dados coletados serão utilizados exclusivamente para aprimorar os serviços do chatbot, incluindo o possível reprocessamento e melhoria do modelo de IA.</p>

                <h3 className="text-xl font-semibold mb-2">3. Armazenamento e segurança</h3>
                <p className="mb-4">Adotamos medidas técnicas e organizacionais adequadas para proteger os dados coletados contra acesso não autorizado, alteração ou destruição.</p>

                <h3 className="text-xl font-semibold mb-2">4. Compartilhamento de dados</h3>
                <p className="mb-4">Os dados coletados não serão compartilhados com terceiros, exceto quando exigido por lei ou por solicitação oficial da Unifesp.</p>

                <h3 className="text-xl font-semibold mb-2">5. Direitos do usuário</h3>
                <p className="mb-4">Você pode solicitar a exclusão dos seus dados a qualquer momento, entrando em contato pelos emails abaixo.</p>

                <h3 className="text-xl font-semibold mb-2">6. Contato</h3>
                <p className="mb-2">Em caso de dúvidas ou solicitações relacionadas à privacidade:</p>
                <ul className="list-disc list-inside">
                    <li>h.candido20@unifesp.br</li>
                    <li>christian.freitas@unifesp.br</li>
                </ul>
            </section>
            <CustomFooter />
        </div>
    );
}