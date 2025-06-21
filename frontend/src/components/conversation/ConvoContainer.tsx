import MessageBar from "./message/MessageBar";
import ChatHeader from "./message/ChatHeader";
import MessageContainer from "./message/MessageContainer";

export default function ConvoContainer() {
    return (
        <>
            <div className="flex flex-col h-full w-full overflow-hidden">
                <ChatHeader />
                <MessageContainer />
                <MessageBar />
            </div>
        </>
    );
}