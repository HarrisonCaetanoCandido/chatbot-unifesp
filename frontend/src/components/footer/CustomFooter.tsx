export default function CustomFooter() {
    return (
        <>
            <footer
                className="w-full bg-[#215A36] h-[60px] 
                mx-auto text-sm text-center flex justify-center 
                items-center footer-link gap-1">
                <span>
                    <span className="text-white">© {new Date().getFullYear()} desenvolvido por </span>
                    <a
                        href="https://www.linkedin.com/in/christian-freitas21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m1-1 text-white underline hover:underline">
                        Christian Freitas</a>
                    <span> e </span>
                    <a
                        href="https://www.linkedin.com/in/hcandido/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m1-1 text-white underline hover:underline">Harrison Caetano</a>
                    <span>. </span>
                </span>
                <span>
                    <a
                        href="https://github.com/HarrisonCaetanoCandido/chatbot-unifesp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m1-1 text-blue-400 hover:underline">
                        Clique aqui para acessar o repositório do projeto
                    </a>
                    <span>.</span>
                </span>
            </footer >
        </>
    );
}