import { useTimer } from "react-timer-hook";
import { Play, Pause, RotateCcw, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";

const DURATION = 10 * 60; // 10 minutes

export function Pomodoro() {
  const expiryTime = new Date();
  expiryTime.setSeconds(expiryTime.getSeconds() + DURATION);

  const { seconds, minutes, hours, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp: expiryTime,
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });

  const safeDivide = (numerator, denominator) => (denominator === 0 ? 0 : numerator / denominator);

  const chartHourValue = 100 - safeDivide(hours, Math.min(DURATION / (60 * 60), 24)) * 100;
  const chartMinuteValue = 100 - safeDivide(minutes, Math.min(DURATION / 60, 60)) * 100;
  const chartSecondValue = 100 - safeDivide(seconds, Math.min(DURATION, 60)) * 100;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader className="p-4">
          <CardTitle>Break</CardTitle>
          <CardDescription className="flex flex-wrap gap-1">
            <span>50 min work,</span>
            <span>10 min break</span>
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
                <Button size="icon" onClick={pause}>
                  <Pause />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Pause</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" onClick={resume}>
                  <Play />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Play</TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + DURATION);
                  restart(time);
                  pause();
                }}
              >
                <Square />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Stop</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={() => {
                  const time = new Date();
                  time.setSeconds(time.getSeconds() + DURATION);
                  restart(time);
                }}
              >
                <RotateCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Restart</TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-4">
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm">Work</p>
            <div className="flex w-full gap-1">
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Hours</span>
                <InputOTP maxLength={2}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Minutes</span>
                <InputOTP maxLength={2}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Seconds</span>
                <InputOTP maxLength={2}>
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
                <InputOTP maxLength={2}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Minutes</span>
                <InputOTP maxLength={2}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">Seconds</span>
                <InputOTP maxLength={2}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-2">
            <Checkbox id="loop" />
            <label
              htmlFor="loop"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Loop automatically
            </label>
          </div>
        </CardContent>
        <CardContent className="flex flex-row justify-center border-t p-4">
          <Button variant="secondary">Update pomodoro</Button>
        </CardContent>
      </Card>
    </div>
  );
}
