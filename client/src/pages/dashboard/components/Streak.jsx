import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy } from "lucide-react";

export const Streak = ({ currentStreak = 5, longestStreak = 10 }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Study Streak </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Flame className="h-5 w-5" />
              Current Streak
            </span>
            <span className="text-sm font-semibold"> {currentStreak}d</span>
          </div>
          <Progress
            value={(currentStreak / longestStreak) * 100}
            className="h-4 bg-orange-100 dark:bg-orange-900"
            indicatorClassName="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Trophy className="h-5 w-5" />
              Longest Streak
            </span>
            <span className="text-sm font-semibold">{longestStreak}d</span>
          </div>
          <Progress
            value={100}
            className="h-4 bg-blue-100 dark:bg-blue-900"
            indicatorClassName="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};
