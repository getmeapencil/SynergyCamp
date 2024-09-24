import { useEffect, useCallback } from "react";
import { usePomodoroStore } from "@/store/pomodoro";
import moment from "moment-timezone";

export const usePomodoro = () => {
  const pomodoroType = usePomodoroStore((state) => state.pomodoroType);
  const timezone = usePomodoroStore((state) => state.timezone);

  const remainingTime = usePomodoroStore((state) => state.remainingTime);
  const isWorkPeriod = usePomodoroStore((state) => state.isWorkPeriod);

  const setIsWorkPeriod = usePomodoroStore((state) => state.setIsWorkPeriod);
  const setRemainingTime = usePomodoroStore((state) => state.setRemainingTime);
  const pushPomodoroMessage = usePomodoroStore((state) => state.pushPomodoroMessage);

  const setPomodoro = usePomodoroStore((state) => state.setPomodoro);

  // Define work and break durations based on pomodoro type
  const workDuration = pomodoroType === "25-5" ? 25 * 60 : 50 * 60;
  const breakDuration = pomodoroType === "25-5" ? 5 * 60 : 10 * 60;

  // Safe division to handle progress calculation
  const safeDivide = useCallback((numerator, denominator) => (denominator === 0 ? 0 : numerator / denominator), []);

  const hours = 0;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const sessionDuration = isWorkPeriod ? workDuration : breakDuration;
  const chartHourValue = 100 - safeDivide(hours, Math.min(sessionDuration / (60 * 60), 24)) * 100;
  const chartMinuteValue = 100 - safeDivide(minutes, Math.min(sessionDuration / 60, 60)) * 100;
  const chartSecondValue = 100 - safeDivide(seconds, Math.min(sessionDuration, 60)) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().tz(timezone);

      const minutes = now.minutes();
      const seconds = now.seconds();
      const totalSeconds = minutes * 60 + seconds;

      if (isWorkPeriod) {
        // Work period: Timer counts down from 25 or 50 minutes from start of the hour
        const secondsLeftInWorkPeriod = workDuration - (totalSeconds % (workDuration + breakDuration));
        if (secondsLeftInWorkPeriod < 0 || secondsLeftInWorkPeriod > workDuration) {
          pushPomodoroMessage({ completed: "work" });
          setIsWorkPeriod(false); // Switch to break when work period ends
          return;
        }
        setRemainingTime(secondsLeftInWorkPeriod);
      } else {
        // Break period: Timer counts down from 5 or 10 minutes after work period
        const secondsLeftInBreakPeriod = workDuration + breakDuration - (totalSeconds % (workDuration + breakDuration));
        if (secondsLeftInBreakPeriod < 0 || secondsLeftInBreakPeriod > breakDuration) {
          pushPomodoroMessage({ completed: "break" });
          setIsWorkPeriod(true); // Switch to work when break period ends
          return;
        }
        setRemainingTime(secondsLeftInBreakPeriod);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone, isWorkPeriod, breakDuration, workDuration, pushPomodoroMessage, setRemainingTime, setIsWorkPeriod]);

  setPomodoro({
    hours,
    minutes,
    seconds,
    isWorkPeriod,
    chartHourValue,
    chartMinuteValue,
    chartSecondValue,
  });
};
