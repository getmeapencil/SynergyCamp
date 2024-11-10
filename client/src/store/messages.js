import { create } from "zustand";
// import { notifyUser } from "@/utils/notifyUser";
// import { useUserStore } from "./user";

export const useMessagesStore = create((set, get) => ({
  messages: [],
  recieveMessage: (message) => {
    const messages = get().messages;
    const date = new Date();
    message.createdAt = date.toUTCString();
    set({ messages: [...messages, message] });
    // if (message.user._id === useUserStore.getState().user._id) return;
    // notifyUser({ message: message.text, icon: message.user.picture });
  },
  pushMessage: (message) => {
    const messages = get().messages;
    const date = new Date();
    message.createdAt = date.toUTCString();
    set({ messages: [...messages, message] });
  },
  clearMessages: () => {
    set({ messages: [] });
  },
  clearNotifications: () => {
    const messages = get().messages.filter((message) => !message.notification);
    set({ messages });
  },
}));
