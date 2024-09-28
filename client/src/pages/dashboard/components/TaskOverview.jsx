import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTaskStore } from "@/store/task";

export const TaskOverview = () => {
  const { tasks } = useTaskStore();
  useEffect(() => {
    useTaskStore.getState().fetchAllTasks();
  }, []);

  const incompleteTasksNo = tasks?.filter((task) => !task.completed).length;

  const handleToggleTask = (id, data) => {
    useTaskStore.getState().updateTask({ id, data });
  };

  const handleDeleteTask = (id) => {
    useTaskStore.getState().deleteTask(id);
  };

  const sortedTasks =
    tasks &&
    [...tasks]?.sort((a, b) => {
      if (a.completed === b.completed) {
        if (a.completed) {
          return b.completedAt - a.completedAt;
        }
        return b.createdAt - a.createdAt;
      }
      return a.completed ? 1 : -1;
    });

  return (
    <Card className="h-fit w-1/3 max-w-md">
      <CardHeader className="flex flex-row justify-between gap-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>tasks</CardTitle>
          <CardDescription>tasks from all your rooms</CardDescription>
        </div>
        <div className="flex items-end gap-2">
          <span className="flex justify-end text-5xl font-semibold">{incompleteTasksNo}</span>
          <div className="flex flex-col justify-end pb-1 text-sm text-muted-foreground">
            <span>{incompleteTasksNo === 1 ? "task" : "tasks"}</span>
            <span>remaining</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex max-h-64 flex-col gap-3 overflow-auto">
        {tasks?.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-muted-foreground">You have no tasks.</p>
          </div>
        ) : (
          sortedTasks?.map((task) => (
            <div key={task._id} className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-1 items-start gap-2">
                <Checkbox
                  id={`task-${task._id}`}
                  checked={task.completed}
                  onCheckedChange={() =>
                    handleToggleTask(task._id, { completed: !task.completed, completedAt: Date.now() })
                  }
                  className="mt-1"
                />
                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={`task-${task._id}`}
                    className={`break-words text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      task.completed ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {task.title}
                  </label>
                  <p className={`mt-1 truncate text-sm ${task.completed ? "text-gray-500" : "text-muted-foreground"}`}>
                    {task.room}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task._id)} className="shrink-0">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
