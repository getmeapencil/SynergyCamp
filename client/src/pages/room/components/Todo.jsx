import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, priority: "low", completed: false }]);
      setNewTask("");
    }
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)));
  };

  const undoCompleteTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: false } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const tasksCompleted = tasks.filter((task) => task.completed);

  return (
    <div className="flex-1 p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">To-Do List</h2>
      <div className="mb-4 flex">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new To-Do"
          className="flex-1 rounded-md border border-gray-300 p-2"
        />
        <Button className="ml-2" onClick={addTask}>
          Add
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <Card key={task.id} className="flex items-center justify-between border-l-4 p-3 shadow-md">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(e) => {
                    if (e) {
                      completeTask(task.id);
                    }
                  }}
                />
                <CardTitle className={`text-lg font-medium ${task.completed ? "line-through" : ""} `}>
                  {task.title}
                </CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => deleteTask(task.id)} className="rounded-md">
                  <Trash />
                </Button>
              </div>
            </Card>
          ))}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h2 className="mb-2 text-xl font-semibold">Completed Tasks</h2>
        {tasksCompleted.map((task) => (
          <Card key={task.id} className="flex items-center justify-between border-l-4 p-3 shadow-md">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={(e) => {
                  console.log(e);
                  if (!e) {
                    undoCompleteTask(task.id);
                  }
                }}
              />
              <CardTitle className={`text-lg font-medium`}>{task.title}</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => deleteTask(task.id)} className="rounded-md">
                <Trash />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
