import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { usePomodoroStore } from "@/store/pomodoro";

export const Pomodoro = () => {
  const workTime = usePomodoroStore((state) => state.workTime);
  const setWorkTime = usePomodoroStore((state) => state.setWorkTime);
  const breakTime = usePomodoroStore((state) => state.breakTime);
  const setBreakTime = usePomodoroStore((state) => state.setBreakTime);
  const isWorkSession = usePomodoroStore((state) => state.isWorkSession);
  const setIsWorkSession = usePomodoroStore((state) => state.setIsWorkSession);
  const isLooping = usePomodoroStore((state) => state.isLooping);
  const setIsLooping = usePomodoroStore((state) => state.setIsLooping);
  let expiryTime = usePomodoroStore((state) => state.expiryTime);
  const setExpiryTime = usePomodoroStore((state) => state.setExpiryTime);
  let isTimerRunning = usePomodoroStore((state) => state.isTimerRunning);
  const setIsTimerRunning = usePomodoroStore((state) => state.setIsTimerRunning);
  let pauseTime;
  console.log("Pomodoro ~ expiryTime:", expiryTime);

  const [inputWorkTime, setInputWorkTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [inputBreakTime, setInputBreakTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate the total duration in seconds
  const calculateDurationInSeconds = ({ hours, minutes, seconds }) => hours * 3600 + minutes * 60 + seconds;

  const startDuration = calculateDurationInSeconds(workTime);

  if (!expiryTime) {
    expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + startDuration);
    setExpiryTime(expiryTime);
  }

  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: expiryTime,
    autoStart: false,
    onExpire: () => toggleSession(),
  });

  // Toggle between work and break sessions
  const toggleSession = async () => {
    const nextSession = isWorkSession ? breakTime : workTime;
    const duration = calculateDurationInSeconds(nextSession);
    expiryTime = await new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + duration);
    setExpiryTime(expiryTime);
    setIsWorkSession(!isWorkSession);
    restart(expiryTime, true);
    if (!isLooping) {
      pause();
    }
  };

  // Safe division to handle progress calculation
  const safeDivide = (numerator, denominator) => (denominator === 0 ? 0 : numerator / denominator);

  const sessionDuration = isWorkSession ? startDuration : calculateDurationInSeconds(breakTime);
  const chartHourValue = 100 - safeDivide(hours, Math.min(sessionDuration / (60 * 60), 24)) * 100;
  const chartMinuteValue = 100 - safeDivide(minutes, Math.min(sessionDuration / 60, 60)) * 100;
  const chartSecondValue = 100 - safeDivide(seconds, Math.min(sessionDuration, 60)) * 100;

  // Update state based on user inputs
  const updateWorkTime = (index, value) => {
    const newWorkTime = { ...inputWorkTime };
    if (index === 0) newWorkTime.hours = parseInt(value) || 0;
    if (index === 1) newWorkTime.minutes = parseInt(value) || 0;
    if (index === 2) newWorkTime.seconds = parseInt(value) || 0;
    setInputWorkTime(newWorkTime);
  };

  const updateBreakTime = (index, value) => {
    const newBreakTime = { ...inputBreakTime };
    if (index === 0) newBreakTime.hours = parseInt(value) || 0;
    if (index === 1) newBreakTime.minutes = parseInt(value) || 0;
    if (index === 2) newBreakTime.seconds = parseInt(value) || 0;
    setInputBreakTime(newBreakTime);
  };

  const stop = () => {
    const startDuration = calculateDurationInSeconds(workTime);
    expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + startDuration);
    restart(expiryTime);
    pause();
    pauseTime = new Date();
    setIsTimerRunning(false);
  };

  useEffect(() => {
    if (isTimerRunning) {
      start();
    }
  }, [isTimerRunning, start]);

  // useEffect(() => {
  //   return () => {
  //     console.log("Pomodoro Component is unmounting");
  //     const now = new Date();
  //     const timeElapsed = now.getTime() - expiryTime.getTime();
  //     const newExpiryTime = new Date(timeElapsed + expiryTime.getTime());
  //     setExpiryTime(newExpiryTime);
  //   };
  // }, [expiryTime, setExpiryTime]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader className="p-4">
          <CardTitle>{isWorkSession ? "Work" : "Break"}</CardTitle>
          <CardDescription className="flex flex-wrap gap-1 font-mono">
            <span>
              {workTime.hours}:{workTime.minutes}:{workTime.seconds} work,
            </span>
            <span>
              {breakTime.hours}:{breakTime.minutes}:{breakTime.seconds} break
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 border-t p-4">
          <Progress className="h-10 rounded-lg [&>*]:bg-violet-500" value={chartHourValue} />
          <Progress className="h-10 rounded-lg [&>*]:bg-emerald-500" value={chartMinuteValue} />
          <Progress className="h-10 rounded-lg [&>*]:bg-amber-500" value={chartSecondValue} />
        </CardContent>
        <CardContent className="flex p-4">
          <div className="flex w-full items-center gap-2">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {hours}
                <span className="text-sm font-normal text-violet-600 dark:text-violet-400">hr</span>
              </div>
            </div>
            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {minutes}
                <span className="text-sm font-normal text-emerald-600 dark:text-emerald-400">min</span>
              </div>
            </div>
            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {seconds}
                <span className="text-sm font-normal text-amber-600 dark:text-amber-400">sec</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent className="flex justify-center gap-4 border-t p-4">
          {isRunning ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => {
                    pause();
                    pauseTime = new Date();
                    setIsTimerRunning(false);
                  }}
                >
                  <Pause />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Pause</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  onClick={() => {
                    resume();
                    setIsTimerRunning(true);
                  }}
                >
                  <Play />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Play</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={stop}>
                <Square />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Stop</TooltipContent>
          </Tooltip>
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" onClick={toggleSession}>
                <RotateCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Restart</TooltipContent>
          </Tooltip> */}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-4">
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm">Work</p>
            <div className="flex w-full gap-1">
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Hours</span>
                <InputOTP maxLength={2} onChange={(value) => updateWorkTime(0, value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Minutes</span>
                <InputOTP maxLength={2} onChange={(value) => updateWorkTime(1, value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Seconds</span>
                <InputOTP maxLength={2} onChange={(value) => updateWorkTime(2, value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1">
            <p className="text-sm">Break</p>
            <div className="flex w-full gap-2">
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Hours</span>
                <InputOTP maxLength={2} onChange={(value) => updateBreakTime(0, value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Minutes</span>
                <InputOTP maxLength={2} onChange={(value) => updateBreakTime(1, value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Seconds</span>
                <InputOTP maxLength={2} onChange={(value) => updateBreakTime(2, value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2">
            <Checkbox id="loop" checked={isLooping} onCheckedChange={setIsLooping} />
            <label
              htmlFor="loop"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Loop automatically
            </label>
          </div>
        </CardContent>

        <CardContent className="flex flex-row justify-center border-t p-4">
          <Button
            variant="secondary"
            onClick={() => {
              setWorkTime(inputWorkTime);
              setBreakTime(inputBreakTime);
              setIsWorkSession(true);
              stop();
            }}
          >
            Update pomodoro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
