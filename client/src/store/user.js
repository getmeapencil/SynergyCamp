import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await createApiCall({
        method: "POST",
        route: "/user/logout",
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
        route: "/user",
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
