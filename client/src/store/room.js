import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";
import { usePomodoroStore } from "./pomodoro";
import { toast } from "sonner";
import { useUserStore } from "./user";

export const useRoomStore = create((set, get) => ({
  rooms: [],
  currentRoom: undefined,
  userRole: undefined,
  isTempBanDialogOpen: false,
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
  getCurrentRoom: async (roomId) => {
    try {
      const currentRoom = await createApiCall({
        method: "GET",
        route: `/room/${roomId}`,
        withCredentials: true,
      });
      console.log("getCurrentRoom: ~ currentRoom:", currentRoom);
      set({ currentRoom });
      // get user role
      const userId = useUserStore.getState().user._id;
      const userRole = currentRoom.members.find((member) => member.userId._id === userId).role;
      set({ userRole });
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
  editRoomProfile: async ({ roomProfile, roomId }) => {
    try {
      const newRoom = await createApiCall({
        method: "POST",
        route: "/room/edit-room-profile",
        withCredentials: true,
        data: { roomProfile, roomId },
      });
      const rooms = get().rooms.filter((room) => room != newRoom._id);
      set({ currentRoom: newRoom });
      set({ rooms: [...rooms, newRoom] });
      toast.success("Room profile updated!");
    } catch (error) {
      console.error("Error updating room profile", error);
      toast.error("Failed to update room profile!");
    }
  },
  changeUserRole: async ({ userId, roomId, role }) => {
    try {
      const updatedRoom = await createApiCall({
        method: "POST",
        route: "/room/change-user-role",
        data: { userId, roomId, role },
        withCredentials: true,
      });
      const rooms = get().rooms.filter((room) => room._id !== updatedRoom._id);
      set({ rooms: [...rooms, updatedRoom] });
      set({ currentRoom: updatedRoom });
      toast.success("User role updated!");
    } catch (error) {
      console.error("Error updating user role", error);
      toast.error("Failed to update user role!");
    }
  },
}));
