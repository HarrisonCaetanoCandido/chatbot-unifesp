import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useStore } from "@/store";

export default function ChatHeader() {
    let toggleExportChat: Boolean = false;
    const { setChatInitialized } = useStore();

    const handleExportChat = () => {
        if (!toggleExportChat)
            toast.success("Chat exportado com sucesso!");
        else
            toast.error("O chat não pôde ser exportado!");
        toggleExportChat = !toggleExportChat;
    }

    return (
        <>
            <div className='flex-1 border-1 w-full flex items-center px-4 sm:px-6 lg:px-8 py-3 gap-4 border-gray-700'>
                <Button onClick={() => setChatInitialized(false)}>Ler a introdução</Button>
                <Button onClick={() => handleExportChat()}>Exportar a conversa</Button>
            </div>
        </>
    );
}