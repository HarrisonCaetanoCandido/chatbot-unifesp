import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuSend } from "react-icons/lu";

export default function MessageBar() {
    const [message, setMessage] = useState("");

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            setMessage('');
        }
    }

    function handleSendButtonClick() {
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
                            onKeyPress={handleKeyPress}
                        />
                        <Button onClick={() => handleSendButtonClick()}><LuSend /></Button>
                    </div>
                </div>
            </div>
        </>
    );
}