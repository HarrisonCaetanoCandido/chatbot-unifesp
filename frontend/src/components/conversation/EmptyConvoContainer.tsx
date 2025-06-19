import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { FaRobot } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";

export default function EmptyConvoContainer() {
    let boolStartConvo: Boolean = false;

    function createConvo() {
        boolStartConvo = true;
        alert("Convo started");
    }

    return (
        <>
            <section className="bg-[#FFFFFF] flex justify-center items-center h-full">
                <div className='w-[60%]'>
                    <div className="max-w-x1 w-full flex flex-col">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem className="text-gray-700 text-sm flex flex-col items-center">
                                    <FaRobot size={50} /><br />
                                    <p>
                                        Olá, estudante! Seja bem-vindo(a) ao <strong>Chatbot Unifesp</strong>.<br />
                                        Esta aplicação foi desenvolvida como parte do projeto final da disciplina
                                        <strong> Aspectos e Implementação de Bancos de Dados</strong>, ministrada pela professora
                                        Dra. Daniela Leal Musa. <br />
                                        O objetivo é facilitar o entendimento de alguns dos principais processos internos
                                        vivenciados por estudantes de graduação do ICT-Unifesp ao longo de sua trajetória acadêmica.
                                    </p><br />
                                </CarouselItem>
                                <CarouselItem className="text-gray-700 text-sm flex flex-col items-center">
                                    <MdLibraryBooks size={50} /><br />
                                    <p>
                                        A proposta do chatbot é oferecer respostas rápidas e interativas para dúvidas pontuais,
                                        ajudando você a tomar melhores decisões durante a graduação. <br />
                                        Temas como <strong>colação de grau</strong>, <strong>estágios</strong>,
                                        <strong> matriz curricular</strong>, <strong>contato com servidores </strong>
                                        e outros assuntos acadêmicos são tratados de forma direta e quase instantânea.
                                    </p>
                                </CarouselItem>
                                <CarouselItem className="text-gray-700 text-sm flex flex-col items-center">
                                    <MdAccessTimeFilled size={50} /><br />
                                    <p>
                                        Até o momento, nosso foco principal foi treinar um modelo de LLM para responder dúvidas
                                        relacionadas à <strong>integralização do BCT</strong>, utilizando como base os documentos
                                        digitais disponibilizados publicamente pela DAE de São José dos Campos.<br />
                                        Você pode acessá-los clicando <a className="underline" href="https://dae-sjc.unifesp.br/minicursos/4-integralizando-o-bct">aqui</a>.
                                    </p>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="text-white hover:text-white rounded-full p-2" />
                            <CarouselNext className="text-white hover:text-white rounded-full p-2" />
                        </Carousel>
                        <Button onClick={createConvo}>Iniciar Chat</Button>
                    </div>
                </div>
            </section>
        </>
    );
}