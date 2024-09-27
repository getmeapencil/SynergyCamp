import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  fetchTasksByRoomId: async (roomId) => {
    try {
      const res = await createApiCall({
        method: "GET",
        route: `/task/${roomId}`,
        withCredentials: true,
      });
      set({ tasks: res.data });
    } catch (error) {
      console.error(error);
    }
  },
  fetchAllTasks: async () => {
    try {
      const res = await createApiCall({
        method: "GET",
        route: `/task`,
        withCredentials: true,
      });
      set({ tasks: res.data });
    } catch (error) {
      console.error(error);
    }
  },
  addTask: async ({ roomId, title }) => {
    try {
      const res = await createApiCall({
        method: "POST",
        route: "/task",
        data: { roomId, title },
        withCredentials: true,
      });
      set({ tasks: [...get().tasks, res.data] });
    } catch (error) {
      console.error(error);
    }
  },
  updateTask: async ({ id, data }) => {
    try {
      const res = await createApiCall({
        method: "PATCH",
        route: `/task/${id}`,
        data,
        withCredentials: true,
      });
      if (res.data) {
        // only update completed at , completed and title
        set({
          tasks: get().tasks.map((task) =>
            task._id === id
              ? { ...task, completedAt: res.data.completedAt, completed: res.data.completed, title: res.data.title }
              : task,
          ),
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  deleteTask: async (id) => {
    try {
      await createApiCall({
        method: "DELETE",
        route: `/task/${id}`,
        withCredentials: true,
      });
      set({ tasks: get().tasks.filter((task) => task._id !== id) });
    } catch (error) {
      console.error(error);
    }
  },
}));
