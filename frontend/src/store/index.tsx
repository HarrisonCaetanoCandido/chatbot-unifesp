import { create } from 'zustand';
import { fromIntroToChatSlice } from './slices/fromIntroToChatSlice';

interface StoreState {
    chatInitialized: Boolean;
    setChatInitialized: (value: Boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
    ...fromIntroToChatSlice(set),
}));