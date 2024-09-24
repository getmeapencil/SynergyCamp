import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment-timezone";

const timezones = moment.tz.names();

export const Pomodoro = () => {
  const [pomodoroType, setPomodoroType] = useState("25-5");
  const [timezone, setTimezone] = useState(moment.tz.guess());
  const [pomodoroTypeSetting, setPomodoroTypeSetting] = useState("25-5");
  const [timezoneSetting, setTimezoneSetting] = useState(moment.tz.guess());

  const [remainingTime, setRemainingTime] = useState(0);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);

  const [open, setOpen] = useState(false);

  // Define work and break durations based on pomodoro type
  const workDuration = pomodoroType === "25-5" ? 25 * 60 : 50 * 60;
  const breakDuration = pomodoroType === "25-5" ? 5 * 60 : 10 * 60;

  // Safe division to handle progress calculation
  const safeDivide = (numerator, denominator) => (denominator === 0 ? 0 : numerator / denominator);

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

      const hours = now.hours();
      const minutes = now.minutes();
      const seconds = now.seconds();
      const totalSeconds = minutes * 60 + seconds;
      console.log(hours, minutes, seconds, timezone);

      if (isWorkPeriod) {
        // Work period: Timer counts down from 25 or 50 minutes from start of the hour
        const secondsLeftInWorkPeriod = workDuration - (totalSeconds % (workDuration + breakDuration));
        setRemainingTime(secondsLeftInWorkPeriod);
        if (secondsLeftInWorkPeriod <= 0 || secondsLeftInWorkPeriod > workDuration) {
          setIsWorkPeriod(false); // Switch to break when work period ends
        }
      } else {
        // Break period: Timer counts down from 5 or 10 minutes after work period
        const secondsLeftInBreakPeriod = workDuration + breakDuration - (totalSeconds % (workDuration + breakDuration));
        setRemainingTime(secondsLeftInBreakPeriod);
        if (secondsLeftInBreakPeriod <= 0 || secondsLeftInBreakPeriod > breakDuration) {
          setIsWorkPeriod(true); // Switch to work when break period ends
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone, isWorkPeriod, pomodoroType, breakDuration, workDuration]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timezones.includes(timezoneSetting)) return;

    setPomodoroType(pomodoroTypeSetting);
    setTimezone(timezoneSetting);
    console.log("Submitted:", { pomodoroType, timezone });
    // Here you would typically send this data to your backend or perform other actions
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader className="p-4">
          <CardTitle>{isWorkPeriod ? "Work" : "Break"}</CardTitle>
          <CardDescription className="flex flex-wrap gap-1 font-mono">
            {pomodoroType === "25-5" ? <span>25:00 work, 05:00 break</span> : <span>50:00 work, 10:00 break</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 border-t p-4">
          <Progress className="h-10 rounded-lg [&>*]:bg-violet-500" value={chartHourValue} />
          <Progress className="h-10 rounded-lg [&>*]:bg-emerald-500" value={chartMinuteValue} />
          <Progress className="h-10 rounded-lg [&>*]:bg-amber-500" value={chartSecondValue} />
        </CardContent>
        <CardContent className="flex border-t p-4">
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
      </Card>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pomodoro-type">Pomodoro Type</Label>
              <Select value={pomodoroTypeSetting} onValueChange={setPomodoroTypeSetting}>
                <SelectTrigger id="pomodoro-type">
                  <SelectValue placeholder="Select a Pomodoro type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25-5">25 min work, 5 min break</SelectItem>
                  <SelectItem value="50-10">50 min work, 10 min break</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {timezoneSetting ? timezoneSetting : "Select timezone..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search timezone..." />
                    <CommandList>
                      <CommandGroup>
                        {timezones.map((tz) => (
                          <CommandItem
                            key={tz}
                            value={tz}
                            onSelect={(currentValue) => {
                              setTimezoneSetting(currentValue);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", timezoneSetting === tz ? "opacity-100" : "opacity-0")}
                            />
                            {tz}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      <CommandEmpty>No timezone found.</CommandEmpty>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" className="w-full">
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
