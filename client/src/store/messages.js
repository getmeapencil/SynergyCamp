import { create } from "zustand";
import { useUserStore } from "./user";

export const useMessagesStore = create((set, get) => ({
  messages: [],
  sendMessage: (message) => {
    const messages = get().messages;
    const user = useUserStore.getState().user;
    const date = new Date();
    message.user = {
      _id: user._id,
      name: user.name,
      picture: user.picture,
    };
    message.createdAt = date.toUTCString();
    set({ messages: [...messages, message] });
  },
  recieveMessage: (message) => {
    const messages = get().messages;
    const date = new Date();
    messages.createdAt = date.toUTCString();
    set({ messages: [...messages, message] });
  },
}));
