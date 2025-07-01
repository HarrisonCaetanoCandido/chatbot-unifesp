import { GET_CHAT_ROUTE } from "@/utils/constants";
import { MdThumbDownAlt } from "react-icons/md";
import { IoMdThumbsUp } from "react-icons/io";
import { apiClient } from "@/lib/api-client";
import { useEffect, useRef } from "react";
import { useStore } from "@/store/index";
import { MdCopyAll } from "react-icons/md";
import toast from "react-hot-toast";

export default function MessageContainer() {
    const { selectedConvoId, convo, setConvo, hasConvoInit, setHasConvoInit } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getChatConvo = async () => {
            try {
                const response = await apiClient.get(GET_CHAT_ROUTE,
                    {
                        withCredentials: false,
                        params: {
                            id: selectedConvoId
                        }
                    });

                if (response.status === 200)
                    setConvo(response.data);
                else
                    console.error(`Couldnt fetch data ${response.status}`);

                if (Array.isArray(response.data) && response.data.length > 0)
                    setHasConvoInit(true);

            } catch (err: any) {
                console.error({ err });
            }
        }

        const scrollDownChat = async () => {
            if (containerRef.current)
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }

        getChatConvo();
        scrollDownChat();

    }, [selectedConvoId]); // aparentemente colocar os dois objetos como var externa ajudou o react a atualizar a conversa com mais facilidade, mas nao me parece bom

    const handleCopyText = (msg: string) => {
        navigator.clipboard.writeText(msg).then(() => {
            toast.success("Texto copiado para clipboard!")
        }).catch((err: any) => {
            console.error({ err });
        });
    }

    const handleLikeComment = (msgId: string) => {
        console.log('handleLikeComment: ', msgId);
        toast.success("Obrigado pelo feedback");
    }

    const handleDislikeComment = (msgId: string) => {
        console.log('handleDislikeComment: ', msgId);
        toast.success("Obrigado pelo feedback");
    }

    return (
        <>
            <div ref={containerRef} className="h-full flex-10 overflow-y-auto justify-center flex items-start">
                <div className=" min-h-full flex flex-col w-[90%] pt-5 pb-5 justify-center items-center">
                    {hasConvoInit ?
                        (Array.isArray(convo) && convo.map((convo) => (
                            (convo.id == selectedConvoId) && (
                                convo.metadata.map((msg: any) => (
                                    (msg.data.direction === 'SENT') && (
                                        <>
                                            <div key={msg.id} className="text-left self-end text-white w-[50%]">
                                                <div className="bg-[#2a2b33] rounded-[40px] p-10">
                                                    <p className='text-left'>{msg.data.message}</p>
                                                    <small>{new Date(msg.data.timestamp).toLocaleString()}</small>
                                                </div>
                                                <div className="flex">
                                                    <a className="ml-10 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleCopyText(msg.data.message)}>
                                                        <MdCopyAll size={30} className="text-white" />
                                                    </a>
                                                    <a className="ml-2 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleLikeComment(msg.data.message.id)}>
                                                        <IoMdThumbsUp size={30} />
                                                    </a>
                                                    <a className="ml-2 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleDislikeComment(msg.data.message.id)}>
                                                        <MdThumbDownAlt size={30} />
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    ) ||
                                    (msg.data.direction === 'RECEIVED') && (
                                        <>
                                            <div key={msg.id} className="text-left self-start text-white w-[50%]">
                                                <div className="p-10">
                                                    <p className='text-left'>{msg.data.message}</p>
                                                    <small>{new Date(msg.data.timestamp).toLocaleString()}</small>
                                                </div>
                                                <div className="flex">
                                                    <a className="ml-10 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleCopyText(msg.data.message)}>
                                                        <MdCopyAll size={30} className="text-white" />
                                                    </a>
                                                    <a className="ml-2 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleLikeComment(msg.data.message.id)}>
                                                        <IoMdThumbsUp size={30} />
                                                    </a>
                                                    <a className="ml-2 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleDislikeComment(msg.data.message.id)}>
                                                        <MdThumbDownAlt size={30} />
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                    )
                                ))
                            )))
                        ) : (
                            <div className="align-center self-center">
                                <h1 className="text-white text-2xl">Bem vindo(a) ao chatbot unifesp, como posso ajudar?</h1>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}