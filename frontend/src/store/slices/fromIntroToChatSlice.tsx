export const fromIntroToChatSlice = (set: any) => ({
    chatInitialized: false,
    setChatInitialized: (chatInitialized: Boolean) => set({ chatInitialized }),
});