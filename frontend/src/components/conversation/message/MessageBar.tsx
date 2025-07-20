import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuSend } from "react-icons/lu";
import { useStore } from '@/store/index';
import { apiClient } from "@/lib/api-client";
import { ADD_MSG_ROUTE, POST_CHAT_ROUTE } from "@/utils/constants";

export default function MessageBar() {
    const [message, setMessage] = useState("");
    const { setNewMessage, selectedConvoId, setConvoId, hasConvoInit, setHasConvoInit } = useStore();
    const msgComuter = useRef(false);

    const initializeChat = async () => {
        const body = {
            msg: {
                message: message,
                timestamp: new Date(),
                direction: 'SENT'
            }
        }

        const response = await apiClient.post(POST_CHAT_ROUTE, body, { withCredentials: false });

        if (response.status === 200) {
            setConvoId(response.data[0].id);
            setMessage('');
            setHasConvoInit(true);
        } else
            console.error(`Couldnt fetch data ${response.status}`);
    }

    const sendNewMessage = async () => {
        msgComuter.current = !msgComuter.current;

        const body = {
            chatId: selectedConvoId,
            msg: {
                message: message,
                timestamp: new Date(),
                direction: !msgComuter.current ? 'SENT' : 'RECEIVED'
            }
        }

        const response = await apiClient.post(ADD_MSG_ROUTE, body, { withCredentials: false });

        if (response.status === 200) {
            setNewMessage(true);
            setMessage('')
        }
        else
            console.error("Could not add a new message to convo");
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!hasConvoInit)
                initializeChat();
            else
                sendNewMessage();
        }
    }

    function handleSendButtonClick() {
        if (!hasConvoInit)
            initializeChat();
        else
            sendNewMessage();
        setMessage('');
    }

    return (
        <>
            <div className="flex-1 w-full">
                <div className="flex items-center px-4 sm:px-6 lg:px-8 py-3 gap-4 border-t border-gray-700">
                    <div className="flex-1 flex bg-[#2a2b33] rounded-lg items-center pr-3">
                        <input
                            type="text"
                            className="flex-1 p-3 bg-transparent rounded-lg focus:outline-none text-white placeholder-white"
                            placeholder="Pergunte algo..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <Button onClick={() => handleSendButtonClick()}><LuSend /></Button>
                    </div>
                </div>
            </div>
        </>
    );
}