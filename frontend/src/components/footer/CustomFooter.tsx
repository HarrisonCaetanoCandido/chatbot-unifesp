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
                    <span className="text-white"> e </span>
                    <a
                        href="https://www.linkedin.com/in/hcandido/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m1-1 text-white underline hover:underline">Harrison Caetano</a>
                    <span className="text-white">. </span>
                </span>
                <span className="text-white">
                    Consulte os<span> </span>
                    <a href="/termos-de-uso" className="underline text-blue-500">Termos de Uso</a> e a <a href="/politica-de-privacidade" className="underline text-blue-500">Política de Privacidade</a>
                    <span className="text-white">.</span>
                </span>
            </footer >
        </>
    );
}