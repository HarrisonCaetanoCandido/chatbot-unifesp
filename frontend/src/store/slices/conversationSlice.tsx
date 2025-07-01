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
    hasConvoInit: false,
    setHasConvoInit: (value: Boolean) => set({ hasConvoInit: value }),
    selectedConvoId: undefined,
    setConvoId: (convoId: string) => set({ selectedConvoId: convoId }),
    convo: undefined,
    setConvo: (convo: Conversation) => set({ convo })
});