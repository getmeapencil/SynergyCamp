import { create } from "zustand";
import createApiCall from "./ceateApiCall";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await createApiCall({
        method: "POST",
        url: "http://localhost:3000/logout",
        withCredentials: true,
      });
      set({ user: null });
    } catch (error) {
      console.error(error);
    }
  },
  fetchUser: async () => {
    try {
      const res = await createApiCall({
        method: "GET",
        url: "http://localhost:3000/user",
        withCredentials: true,
      });

      set({ user: res });
    } catch (error) {
      console.error(error);
    }
  },
}));
