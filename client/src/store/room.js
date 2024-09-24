import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useRoomStore = create((set, get) => ({
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

  editRoomProfile: async ({ roomProfile, roomId }) => {
    try {
      const newRoom = await createApiCall({
        method: "POST",
        route: "/room/edit-room",
        withCredentials: true,
        data: { roomProfile, roomId },
      });
      console.log(newRoom);
      const rooms = get().rooms;
      const newRooms = rooms.filter((room) => room != newRoom._id);
      set({ rooms: [...newRooms, newRoom] });
    } catch (error) {
      console.error("Error updating room profile", error);
    }
  },
}));
