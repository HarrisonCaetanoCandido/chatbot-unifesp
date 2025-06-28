type MessageData = {
    message: string;
    timestamp: string;
    direction: 'SENT' | 'RECEIVED';
}

type MessageItem = {
    id: string;
    data: MessageData;
}

export type Conversation = {
    id: string;
    metadata: MessageItem[];
}

export const conversationSlice = (set: any) => ({
    selectedConvoId: undefined,
    setConvoId: (convoId: string) => set({ selectedConvoId: convoId }),
    convo: [],
    setConvo: (convo: Conversation) => set({ convo })
});