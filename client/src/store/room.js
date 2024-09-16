import { create } from "zustand";
import createApiCall from "./ceateApiCall";

export const useRoomStore = create((set) => ({
  rooms: [],
  currentRoom: null,
  createRoom: async (name, description) => {
    try {
      const room = await createApiCall({
        method: "POST",
        url: "http://localhost:3000/room",
        data: { name, description },
        withCredentials: true,
      });
      console.log("Room Created:", room); // Add this line to check if room is returned properly
      set((state) => ({ rooms: [...state.rooms, room] }));
      return true;
    } catch (error) {
      console.error("Error creating room:", error); // Add this line to catch and display errors
      return false;
    }
  },

  setCurrentRoom: (room) => {
    set({ currentRoom: room });
  },
  getRooms: async () => {
    try {
      const rooms = await createApiCall({
        method: "GET",
        url: "http://localhost:3000/room",
        withCredentials: true,
      });
      set({ rooms });
    } catch (error) {
      console.error(error);
    }
  },
}));
