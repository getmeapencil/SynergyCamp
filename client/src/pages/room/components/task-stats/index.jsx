import { useEffect } from "react";
import { useTaskStatsStore } from "@/store/task-stats";
import { useParams } from "react-router-dom";
import { LoaderAnimation } from "@/components/LoaderAnimation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarFallback } from "@/utils/generateAvatarFallback";

export const TaskStats = () => {
  const taskStats = useTaskStatsStore((state) => state.taskStats);
  const { roomId } = useParams();

  useEffect(() => {
    useTaskStatsStore.getState().fetchTaskStatsByRoomId(roomId);
  }, [roomId]);

  if (!taskStats) {
    return <LoaderAnimation className="flex-1" />;
  }

  // Sort taskStats by completion percentage in descending order
  const sortedTaskStats = [...taskStats].sort((a, b) => b.completed / b.total - a.completed / a.total);

  return (
    <div className="flex-1 py-2">
      {sortedTaskStats.map((stat, index) => (
        <div key={index} className="flex justify-between px-4 py-2 hover:bg-background">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage src={stat.user.picture} />
              <AvatarFallback className="rounded-lg">{generateAvatarFallback(stat.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="text-lg">{stat.user.name}</div>
              <div className="font-mono text-sm">
                {stat.completed}/{stat.total}
              </div>
            </div>
          </div>
          <div className="grid place-content-center font-mono text-xl">
            {((stat.completed / stat.total) * 100) % 1 === 0
              ? (stat.completed / stat.total) * 100
              : ((stat.completed / stat.total) * 100).toFixed(1)}
            %
          </div>
        </div>
      ))}
    </div>
  );
};
