import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { usePomodoroStore } from "@/store/pomodoro";

export const Pomodoro = () => {
  const pomodoro = usePomodoroStore((state) => state.pomodoro);
  const pomodoroType = usePomodoroStore((state) => state.pomodoroType);
  const timezone = usePomodoroStore((state) => state.timezone);

  return (
    <div className="flex flex-1 items-center justify-center bg-background">
      <Card className="w-fit">
        <CardHeader className="p-4">
          <CardTitle className="text-3xl lg:text-4xl">{pomodoro.isWorkPeriod ? "Work" : "Break"}</CardTitle>
          <CardDescription className="flex flex-col font-mono lg:text-lg">
            {pomodoroType === "25-5" ? <span>25:00 work, 05:00 break</span> : <span>50:00 work, 10:00 break</span>}
            <span>{timezone}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <div className="font-mono text-7xl font-bold tabular-nums lg:text-8xl">
            {String(pomodoro.hours).padStart(2, "0")}:{String(pomodoro.minutes).padStart(2, "0")}:
            {String(pomodoro.seconds).padStart(2, "0")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
