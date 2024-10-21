import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame, Trophy } from "lucide-react";
import { useEffect } from "react";
import { useHistoryStore } from "@/store/history";
import { useUserStore } from "@/store/user";

export const Streak = () => {
  const { streak } = useHistoryStore();
  const { user } = useUserStore();
  console.log("user", user);
  const longestStreak = user.longestStreak;
  console.log(streak, longestStreak);
  useEffect(() => {
    useHistoryStore.getState().getStreak();
  }, []);

  return (
    <Card className="h-fit w-1/3">
      <CardHeader>
        <CardTitle>Streak</CardTitle>
        <CardDescription>Continuous days you&apos;ve exceeded your study goal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Flame className="h-5 w-5" />
              Current Streak
            </span>
            <span className="text-sm font-semibold"> {streak}d</span>
          </div>
          <Progress value={(streak / longestStreak) * 100} className="h-4 bg-muted" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Trophy className="h-5 w-5" />
              Longest Streak
            </span>
            <span className="text-sm font-semibold">{longestStreak}d</span>
          </div>
          <Progress value={100} className="h-4 bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};
