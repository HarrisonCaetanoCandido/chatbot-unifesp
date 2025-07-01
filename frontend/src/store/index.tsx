import { create } from 'zustand';
import { fromIntroToChatSlice } from './slices/fromIntroToChatSlice';
import { conversationSlice, type Conversation } from './slices/conversationSlice';
import { persist } from 'zustand/middleware';

type AppState = {
  hasConvoInit: boolean;
  setHasConvoInit: (value: Boolean) => void;
  chatInitialized: boolean;
  setChatInitialized: (value: boolean) => void;
  selectedConvoId?: string;
  setConvoId: (convoId: string) => void;
  convo?: Conversation;
  setConvo: (convo: Conversation) => void;
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...fromIntroToChatSlice(set),
      ...conversationSlice(set),
    }),
    {
      name: 'convo-storage',
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
