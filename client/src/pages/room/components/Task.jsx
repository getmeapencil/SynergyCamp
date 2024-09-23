import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Task = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Make notes on C",
      room: "SynergyCamp",
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        room: "Default", // You can modify this as needed
        completed: false,
        completedAt: null,
        createdAt: Date.now(),
      };
      setTasks([newTaskObj, ...tasks]);
      setNewTask("");
    }
  };

  const completeTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true, completedAt: Date.now() } : task)));
  };

  const undoCompleteTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: false, completedAt: null } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const sortTasks = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      if (a.completed && b.completed) {
        return b.completedAt - a.completedAt;
      }
      if (!a.completed && !b.completed) {
        return b.createdAt - a.createdAt;
      }
      return a.completed ? 1 : -1;
    });
  };

  const tasksRemaining = sortTasks(tasks.filter((task) => !task.completed));
  const tasksCompleted = sortTasks(tasks.filter((task) => task.completed));

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex-1">
      <div className="flex gap-2 p-3 pb-1">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new tasks"
          className="flex-1 rounded-md"
          onKeyDown={handleEnterPress}
        />
        <Button size="icon" variant="outline" onClick={addTask}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["remaining"]}>
        <AccordionItem value="remaining">
          <AccordionTrigger className="px-4 hover:no-underline">
            {`${tasksRemaining.length} Remaining`}
          </AccordionTrigger>
          <AccordionContent className="text-md">
            {tasksRemaining.map((task) => (
              <div key={task.id} className="flex justify-between gap-3 px-4 py-2 hover:bg-background">
                <div className="mt-2 flex gap-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={(e) => {
                      if (e) {
                        completeTask(task.id);
                      }
                    }}
                    className="mt-1"
                  />
                  <label htmlFor={`task-${task.id}`} className="font-medium">
                    {task.text}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="shrink-0">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            {!tasksRemaining.length && (
              <div className="flex justify-between gap-3 px-4 py-4 hover:bg-background">No tasks to show here.</div>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="completed">
          <AccordionTrigger className="px-4 hover:no-underline">
            {`${tasksCompleted.length} Completed`}
          </AccordionTrigger>
          <AccordionContent className="text-md">
            {tasksCompleted.map((task) => (
              <div key={task.id} className="flex justify-between gap-3 px-4 py-2 hover:bg-background">
                <div className="mt-2 flex gap-3">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={(e) => {
                      if (!e) {
                        undoCompleteTask(task.id);
                      }
                    }}
                    className="mt-1"
                  />
                  <label htmlFor={`task-${task.id}`} className="text-md font-medium text-gray-500 line-through">
                    {task.text}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="shrink-0">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            {!tasksCompleted.length && (
              <div className="flex justify-between gap-3 px-4 py-4 hover:bg-background">No tasks to show here.</div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
