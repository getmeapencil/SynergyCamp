import { useState } from "react";
// import {  ProgressBar } from 'shadcn-ui'; // Assuming Shadcn provides these components
import { Card, CardTitle } from "@/components/ui/card";
// import {ProgressBar } from '@/components/ui/progress-bar';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

export const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Study Algorithms", priority: "high", dueDate: "2024-09-25", completed: false },
    { id: 2, title: "Complete Project Report", priority: "medium", dueDate: "2024-09-28", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, title: newTask, priority: "low", dueDate: "date", completed: false },
      ]);
      setNewTask("");
    }
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex-1 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">To-Do List</h2>

      <div className="mb-4 flex">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 rounded-md border border-gray-300 p-2"
        />
        <Button className="ml-2" onClick={addTask}>
          Add
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="flex items-center justify-between border-l-4 p-3 shadow-md">
            <div>
              <CardTitle className={`text-lg font-medium ${task.completed ? "line-through" : ""} `}>
                {task.title}
              </CardTitle>

              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                {task.dueDate}
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => completeTask(task.id)} className="rounded-md" variant="secondary">
                ✔
              </Button>
              <Button variant="destructive" onClick={() => deleteTask(task.id)} className="rounded-md">
                ✖
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Progress Bar (optional, if you have progress data) */}
      <Progress className="mt-4" value={(tasks.filter((task) => task.completed).length / tasks.length) * 100} />
    </div>
  );
};
