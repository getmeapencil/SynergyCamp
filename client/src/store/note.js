import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNoteStore = create(
  persist(
    (set) => ({
      note: "",
      setNote: (note) => {
        set({ note });
      },
      fontSize: 16,
      setFontSize: (fontSize) => {
        set({ fontSize });
      },
    }),
    {
      name: "dashboard-note",
    },
  ),
);
