import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useHistoryStore = create((set, get) => ({
  history: [],
  streak: 0,
  last7days: [],
  getStreak: async () => {
    try {
      const streak = await createApiCall({
        method: "GET",
        route: "/history/streak",
        withCredentials: true,
      });
      set({ streak: streak });
    } catch (error) {
      console.error(error);
    }
  },
  getLast7days: async () => {
    try {
      const last7days = await createApiCall({
        method: "GET",
        route: "/history/last7days",
        withCredentials: true,
      });
      // console.log(last7days)
      set({ last7days });
    } catch (error) {
      console.error(error);
    }
  },
}));
