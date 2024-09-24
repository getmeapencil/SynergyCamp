import { useState } from "react";
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
import { usePomodoroStore } from "@/store/pomodoro";
import moment from "moment-timezone";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/user";
import { useRoomStore } from "@/store/room";
const timezones = moment.tz.names();

export const Pomodoro = () => {
  const pomodoroType = usePomodoroStore((state) => state.pomodoroType);
  const timezone = usePomodoroStore((state) => state.timezone);
  const pomodoro = usePomodoroStore((state) => state.pomodoro);
  const {currentRoom}=useRoomStore()
  const {user}=useUserStore()

  const { editPomodoro } = useSocketEmitters();
  const { roomId } = useParams();

  const [pomodoroTypeSetting, setPomodoroTypeSetting] = useState(pomodoroType);
  const [timezoneSetting, setTimezoneSetting] = useState(timezone);

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!timezones.includes(timezoneSetting)) return;
    editPomodoro({ pomodoroType: pomodoroTypeSetting, timezone: timezoneSetting, roomId: roomId });
  };
  const currentRoomUser=currentRoom?.members?.find((member)=>member?.userId?._id===user?._id)
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader className="p-4">
          <CardTitle>{pomodoro.isWorkPeriod ? "Work" : "Break"}</CardTitle>
          <CardDescription className="flex flex-col font-mono">
            {pomodoroType === "25-5" ? <span>25:00 work, 05:00 break</span> : <span>50:00 work, 10:00 break</span>}
            <span>{timezone}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 border-t p-4">
          <Progress className="h-10 rounded-lg [&>*]:bg-violet-500" value={pomodoro.chartHourValue} />
          <Progress className="h-10 rounded-lg [&>*]:bg-emerald-500" value={pomodoro.chartMinuteValue} />
          <Progress className="h-10 rounded-lg [&>*]:bg-amber-500" value={pomodoro.chartSecondValue} />
        </CardContent>
        <CardContent className="flex border-t p-4">
          <div className="flex w-full items-center gap-2">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {pomodoro.hours}
                <span className="text-sm font-normal text-violet-600 dark:text-violet-400">hr</span>
              </div>
            </div>
            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {pomodoro.minutes}
                <span className="text-sm font-normal text-emerald-600 dark:text-emerald-400">min</span>
              </div>
            </div>
            <Separator orientation="vertical" className="mx-2 h-10 w-px" />
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                {pomodoro.seconds}
                <span className="text-sm font-normal text-amber-600 dark:text-amber-400">sec</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentRoomUser?.role === "admin" && (
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
      )}
    </div>
  );
};
