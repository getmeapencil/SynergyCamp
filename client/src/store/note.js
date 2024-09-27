import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNoteStore = create(
  persist(
    (set) => ({
      dashboardNote: {
        note: "",
        fontSize: 26,
      },
      setDashboardNote: (dashboardNote) => {
        set({ dashboardNote });
      },
      roomNote: {
        note: "",
        fontSize: 64,
        align: "center",
        position: "center",
      },
      setRoomNote: (roomNote) => {
        set({ roomNote });
      },
    }),
    {
      name: "mindmesh-note",
    },
  ),
);
