import { apiClient } from "@/lib/api-client";
import { GET_CHAT_ROUTE } from "@/utils/constants";
import { useEffect, useRef } from "react";
import { useStore } from "@/store/index";
import { MdCopyAll } from "react-icons/md";
import toast from "react-hot-toast";

export default function MessageContainer() {
    const { selectedConvoId, setConvoId, convo, setConvo } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getChatConvo = async () => {
            try {
                const response = await apiClient.get(GET_CHAT_ROUTE, { withCredentials: false });

                if (response.status === 200) {
                    setConvo(response.data);
                    if (!selectedConvoId)
                        setConvoId('1');
                }
                else
                    console.error(`Couldnt fetch data ${response.status}`);

            } catch (err: any) {
                console.error({ err });
            }
        }

        const scrollDownChat = async () => {
            if(containerRef.current) 
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }

        getChatConvo();
        scrollDownChat();

    }, []);

    const handleCopyText = (msg: string) => {
        navigator.clipboard.writeText(msg).then(() => {
            toast.success("Texto copiado para clipboard!")
        }).catch((err: any) => {
            console.error({ err });
        });
    }

    return (
        <>
            <div ref={containerRef} className="h-full flex-10 overflow-y-auto justify-center flex items-start">
                <div className=" min-h-full flex flex-col w-[90%] pt-5 pb-5">
                    {Array.isArray(convo) && convo.map((convo) => (
                        (convo.id == selectedConvoId) && (
                            convo.metadata.map((msg) => (
                                (msg.data.direction === 'SENT') && (
                                    <>
                                        <div key={msg.id} className="text-left self-end text-white w-[50%]">
                                            <div className="bg-[#2a2b33] rounded-[40px] p-10">
                                                <p className='text-left'>{msg.data.message}</p>
                                                <small>{new Date(msg.data.timestamp).toLocaleString()}</small>
                                            </div>
                                            <a className="ml-10 mt-5 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleCopyText(msg.data.message)}>
                                                <MdCopyAll size={30} className="text-white" />
                                            </a>
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
                                            <a className="ml-10 hover:bg-white/10 flex justify-center items-center h-[20px] w-[20px] rounded-[5px]" onClick={() => handleCopyText(msg.data.message)}>
                                                <MdCopyAll size={30} className="text-white" />
                                            </a>
                                        </div>
                                    </>
                                )
                            ))
                        )))}
                </div>
            </div>
        </>
    );
}