import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]);
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

  const tasksRemaining = tasks.filter((task) => !task.completed);
  const tasksCompleted = tasks.filter((task) => task.completed);

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
          <Plus />
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["remaining"]}>
        <AccordionItem value="remaining">
          <AccordionTrigger className="px-4 hover:no-underline">{`${tasksRemaining.length} Remaining`}</AccordionTrigger>
          <AccordionContent className="text-md">
            {tasksRemaining.map((task) => (
              <div key={task.id} className="flex justify-between gap-3 px-4 py-2 hover:bg-background">
                <div className="mt-2 flex gap-3">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={(e) => {
                      if (e) {
                        completeTask(task.id);
                      }
                    }}
                    className="mt-1"
                  />
                  <label htmlFor={task.id} className={"font-medium"}>
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
          <AccordionTrigger className="px-4 hover:no-underline">{`${tasksCompleted.length} Completed`}</AccordionTrigger>
          <AccordionContent className="text-md">
            {tasksCompleted.map((task) => (
              <div key={task.id} className="flex justify-between gap-3 px-4 py-2 hover:bg-background">
                <div className="mt-2 flex gap-3">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={(e) => {
                      if (!e) {
                        undoCompleteTask(task.id);
                      }
                    }}
                    className="mt-1"
                  />
                  <label htmlFor={task.id} className={"text-md font-medium text-gray-500 line-through"}>
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
