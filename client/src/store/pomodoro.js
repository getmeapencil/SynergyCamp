import { create } from "zustand";

export const usePomodoroStore = create((set) => ({
  workTime: { hours: 0, minutes: 10, seconds: 0 },
  setWorkTime: (workTime) => {
    set({ workTime });
  },
  breakTime: { hours: 0, minutes: 0, seconds: 10 },
  setBreakTime: (breakTime) => {
    set({ breakTime });
  },
  isLooping: false,
  setIsLooping: (isLooping) => {
    set({ isLooping });
  },
  isWorkSession: true,
  setIsWorkSession: (isWorkSession) => {
    set({ isWorkSession });
  },
  expiryTime: null,
  setExpiryTime: (expiryTime) => {
    set({ expiryTime });
  },
  isTimerRunning: false,
  setIsTimerRunning: (isTimerRunning) => {
    set({ isTimerRunning });
  },
}));
