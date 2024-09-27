import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useHistoryStore = create((set, get) => ({
  history: [],
  streak: 0,
  getStreak: async () => {
    try {
      const streak = await createApiCall({
        method: "GET",
        route: "/history/streak",
        withCredentials: true,
      });
      console.log(streak)
      set({ streak });
    } catch (error) {
      console.error(error);
    }
  },
}));
