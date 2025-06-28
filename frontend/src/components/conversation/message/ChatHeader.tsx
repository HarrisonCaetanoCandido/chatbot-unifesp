import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useStore } from "@/store";
import { useRef } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import './ChatHeader.css'

export default function ChatHeader() {
    let toggleExportChat: Boolean = false;
    const { setChatInitialized } = useStore();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { selectedConvoId, convo } = useStore();

    const handleExportChat = () => {
        if (!toggleExportChat) {
            const dataToExport = convo.map((conversation) => {
                if (conversation.id == selectedConvoId)
                    return conversation;
            });

            const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "conversa.json";
            link.click();
            toast.success("Chat exportado com sucesso!");
        }
        else
            toast.error("O chat não pôde ser exportado!");
        toggleExportChat = !toggleExportChat;
    }

    const handleImportChatButton = () => {
        fileInputRef.current?.click();
    }

    const handleImportChat = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file)
            toast.success(`Arquivo selecionado: ${file.name}`);
    }

    return (
        <>
            <div className='flex-1 border-1 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 gap-4 border-gray-700'>
                <div className="biggerScreenMenu w-full flex justify-between">
                    <Button onClick={() => setChatInitialized(false)}>Ler a introdução</Button>
                    <div className="flex gap-5">
                        <Button onClick={() => handleImportChatButton()}>Importar uma conversa</Button>
                        <Button onClick={() => handleExportChat()}>Exportar a conversa</Button>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImportChat}
                        className="hidden" />
                </div>
                <div className="smallerScreenMenu">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="text-white" variant="outline">Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <a onClick={() => setChatInitialized(false)}>Ler a introdução</a>
                                    <DropdownMenuShortcut>⇧⌘L</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <a onClick={() => handleExportChat()}>Exportar a conversa</a>
                                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a onClick={() => handleImportChatButton()}>Importar uma conversa</a>
                                    <DropdownMenuShortcut>⌘I</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
}