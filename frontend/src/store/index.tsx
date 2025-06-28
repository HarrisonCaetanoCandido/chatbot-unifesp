import { create } from 'zustand';
import { fromIntroToChatSlice } from './slices/fromIntroToChatSlice';
import { conversationSlice, type Conversation } from './slices/conversationSlice';

type AppState = {
    chatInitialized: Boolean;
    setChatInitialized: (value: Boolean) => void;
    selectedConvoId?: string;
    setConvoId: (convoId: string) => void;
    convo: Conversation[];
    setConvo: (convo: Conversation) => void;
}

export const useStore = create<AppState>((set) => ({
    ...fromIntroToChatSlice(set),
    ...conversationSlice(set)
}));