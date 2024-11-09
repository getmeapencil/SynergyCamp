import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useTaskStatsStore = create((set) => ({
  taskStats: [],
  fetchTaskStatsByRoomId: async (roomId) => {
    try {
      const res = await createApiCall({
        method: "GET",
        route: `/task-stats/${roomId}`,
        withCredentials: true,
      });
      set({ taskStats: res.data });
    } catch (error) {
      console.error(error);
    }
  },
}));
