import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useRoomStore = create((set) => ({
  rooms: [],
  currentRoom: undefined,
  createRoom: async (name, description) => {
    try {
      const room = await createApiCall({
        method: "POST",
        route: "/room",
        data: { name, description },
        withCredentials: true,
      });
      console.log("Room Created:", room); // Add this line to check if room is returned properly
      set((state) => ({ rooms: [...state.rooms, room] }));
    } catch (error) {
      console.error("Error creating room:", error); // Add this line to catch and display errors
    }
  },
  setCurrentRoom: (roomId) => {
    set({ currentRoom: roomId });
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
