import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNoteStore = create(
  persist(
    (set) => ({
      dashboardNote: {
        note: "",
        fontSize: 16,
      },
      setDashboardNote: (dashboardNote) => {
        set({ dashboardNote });
      },
      roomNote: {
        note: "",
        fontSize: "16px",
      },
      setRoomNote: (dashboardNote) => {
        set({ dashboardNote });
      },
    }),
    {
      name: "mindmesh-note",
    },
  ),
);
