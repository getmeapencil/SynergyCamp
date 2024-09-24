import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";
import axios from "axios";

export const useUserStore = create((set, get) => ({
  user: null,
  currentRoomUser: null,
  isAuthenticated: false,
  authToken: null,
  users: [],
  triedTokenRefresh: false,
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
        withCredentials: true,
      });
      if (res?.accessToken) {
        axios.defaults.headers.Authorization = "Bearer " + res?.accessToken;
        set({ authToken: res?.accessToken, isAuthenticated: true, user: res?.user });
      }
    } catch (err) {
      console.error(err);
    }
  },
  tryTokenRefresh: async () => {
    try {
      if (get().triedTokenRefresh) return false;
      const { accessToken, user } = await createApiCall({
        method: "GET",
        route: "/auth/refresh",
        withCredentials: true,
      });
      set({ authToken: accessToken, triedTokenRefresh: true, isAuthenticated: true, user });
      axios.defaults.headers.Authorization = "Bearer " + accessToken;
    } catch (error) {
      console.error(error);
      set({ triedTokenRefresh: true });
    }
  },
  setCurrentRoomUser: (currentRoom) => {
    const userId = get().user._id;
    const currentRoomUser = currentRoom.members.find((member) => member.userId === userId);
    set({ currentRoomUser });
  },
}));
