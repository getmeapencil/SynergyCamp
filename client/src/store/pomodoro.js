import { create } from "zustand";
import moment from "moment-timezone";
import { useMessagesStore } from "./messages";
import { v4 as uuidv4 } from "uuid";
import { playSound } from "@/utils/playSound";

export const usePomodoroStore = create((set) => ({
  pomodoroType: "25-5",
  timezone: moment.tz.guess(),
  setPomodoro: ({ pomodoroType, timezone }) => {
    set({ pomodoroType });
    set({ timezone });
  },
  remainingTime: 0,
  isWorkPeriod: true,
  setRemainingTime: (remainingTime) => {
    set({ remainingTime });
  },
  setIsWorkPeriod: (isWorkPeriod) => {
    set({ isWorkPeriod });
  },
  pushPomodoroMessage: ({ completed }) => {
    const text = completed === "work" ? "Work session completed. Take a break!" : "Break is over. Get back to work!";
    const sound = completed === "work" ? "/pomodoro-complete-work.wav" : "/pomodoro-complete-break.wav";
    const message = {
      _id: uuidv4(),
      text: text,
      notification: {
        type: "pomodoro-alert",
      },
    };
    useMessagesStore.getState().pushMessage(message);
    playSound(sound);
  },
}));
