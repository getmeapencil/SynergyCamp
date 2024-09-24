import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";
import { usePomodoroStore } from "./pomodoro";
import { useUserStore } from "./user";

export const useRoomStore = create((set) => ({
  rooms: [],
  currentRoom: undefined,
  createRoom: async ({ name, description, timezone }) => {
    try {
      const room = await createApiCall({
        method: "POST",
        route: "/room",
        data: { name, description, timezone },
        withCredentials: true,
      });
      set((state) => ({ rooms: [...state.rooms, room] }));
    } catch (error) {
      console.error("Error creating room:", error); // Add this line to catch and display errors
    }
  },
  setCurrentRoom: (roomId) => {
    set({ currentRoom: roomId });
  },
  getCurrentRoom: async (roomId) => {
    try {
      const currentRoom = await createApiCall({
        method: "GET",
        route: `/room/${roomId}`,
        withCredentials: true,
      });
      set({ currentRoom });
      useUserStore.getState().setCurrentRoomUser(currentRoom);
      usePomodoroStore.getState().setPomodoroTypeAndTZ(currentRoom.pomodoro);
    } catch (error) {
      console.error(error);
    }
  },
  getRooms: async () => {
    try {
      const rooms = await createApiCall({
        method: "GET",
        route: "/room",
        withCredentials: true,
      });
      set({ rooms });
    } catch (error) {
      console.error(error);
    }
  },
}));
