import { create } from "zustand";
import createApiCall from "./ceateApiCall";

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await createApiCall({
        method: "POST",
        url: "http://localhost:3000/user/logout",
        withCredentials: true,
      });
      set({ user: null });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  fetchUser: async () => {
    try {
      const res = await createApiCall({
        method: "GET",
        url: "http://localhost:3000/user",
        withCredentials: true,
      });
      if (res.message === "Unauthorized") {
        set({ user: null, isAuthenticated: false });
        return false;
      } else {
        set({ user: res, isAuthenticated: true });
        return true;
      }
    } catch (error) {
      console.error(error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));
