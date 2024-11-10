import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTaskStore } from "@/store/task";
import { useParams } from "react-router-dom";

export const Tasks = () => {
  const [newTask, setNewTask] = useState("");
  const tasks = useTaskStore((state) => state.tasks);
  // console.log("Task ~ tasks:", tasks);
  const { roomId } = useParams();
  const tasksToUse = tasks.filter((task) => task?.room?._id === roomId);

  const addTask = () => {
    if (newTask.trim()) {
      useTaskStore.getState().addTask({ title: newTask, roomId: roomId });
      setNewTask("");
    }
  };

  useEffect(() => {
    if (tasks.length === 0) {
      useTaskStore.getState().fetchAllTasks();
    }
  }, [roomId, tasks]);

  const completeTask = (taskId) => {
    useTaskStore.getState().updateTask({ id: taskId, data: { completed: true, completedAt: Date.now() } });
  };

  const undoCompleteTask = (taskId) => {
    useTaskStore.getState().updateTask({ id: taskId, data: { completed: false } });
  };

  const deleteTask = (taskId) => {
    useTaskStore.getState().deleteTask(taskId);
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

  const tasksRemaining = sortTasks(tasksToUse.filter((task) => !task.completed));
  const tasksCompleted = sortTasks(tasksToUse.filter((task) => task.completed));

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
          placeholder="Add new task"
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
              <div key={task._id} className="flex justify-between gap-3 px-4 py-2 hover:bg-background">
                <div className="mt-2 flex gap-3">
                  <Checkbox
                    id={task._id}
                    checked={task.completed}
                    onCheckedChange={(e) => {
                      if (e) {
                        completeTask(task._id);
                      }
                    }}
                    className="mt-1"
                  />
                  <label htmlFor={task._id} className={"font-medium"}>
                    {task.title}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task._id)} className="shrink-0">
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
              <div key={task._id} className="flex justify-between gap-3 px-4 py-2 hover:bg-background">
                <div className="mt-2 flex gap-3">
                  <Checkbox
                    id={task._id}
                    checked={task.completed}
                    onCheckedChange={(e) => {
                      if (!e) {
                        undoCompleteTask(task._id);
                      }
                    }}
                    className="mt-1"
                  />
                  <label htmlFor={task._id} className={"text-md font-medium text-gray-500 line-through"}>
                    {task.title}
                  </label>
                </div>
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task._id)} className="shrink-0">
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
