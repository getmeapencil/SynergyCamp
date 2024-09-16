import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";
import axios from "axios";

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  authToken: null,
  users:[],
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await createApiCall({
        method: "GET",
        route: "/auth/logout",
        withCredentials: true,
      });
      set({ user: null, isAuthenticated: false, authToken: null });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  authGoogle: async (code) => {
    try {
      const res = await createApiCall({
        method: "POST",
        route: "/auth/google",
        data: { code },
      });
      if (res?.accessToken) {
        console.log("res?.access", res?.accessToken,res?.user);
        axios.defaults.headers.Authorization = "Bearer " + res?.accessToken;
        set({ authToken: res?.accessToken, isAuthenticated: true, user: res?.user });
      }
    } catch (err) {
      console.error(err);
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
  }
}));
