import { create } from "zustand";

export const useMessagesStore = create((set, get) => ({
  messages: [],
  recieveMessage: (message) => {
    const messages = get().messages;
    const date = new Date();
    message.createdAt = date.toUTCString();
    set({ messages: [...messages, message] });
  },
  pushMessage: (message) => {
    const messages = get().messages;
    const date = new Date();
    message.createdAt = date.toUTCString();
    set({ messages: [...messages, message] });
  },
}));
