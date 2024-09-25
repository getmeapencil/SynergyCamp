import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  fetchTasks: async (roomId) => {
    console.log("fetch task",roomId)
    try {
      const res = await createApiCall({
        method: "GET",
        route: `/task`,
        query: { roomId },
        withCredentials: true,
      });
      set({ tasks: res.data });
      console.log(res.data,res)
    } catch (error) {
      console.error(error);
    }
  },
  addTask: async ({roomId, title}) => {
    console.log(title,roomId,"I am called addtaslk")
    try {
      const res = await createApiCall({
        method: "POST",
        route: "/task",
        data: { roomId, title },
        withCredentials: true,
      });
      console.log(res.data,res)
      set({ tasks: [...get().tasks, res.data] });
    } catch (error) {
      console.error(error);
    }
  },
  updateTask: async ({id, data}) => {
    try {
      const res = await createApiCall({
        method: "PATCH",
        route: `/task/${id}`,
        data,
        withCredentials: true,
      });
      console.log(res.data,res)
      set({ tasks: get().tasks.map((task) => (task._id === id ? res.data : task)) });
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
