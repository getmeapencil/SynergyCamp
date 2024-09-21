import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const TodoOverview = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Make notes on C",
      room: "SynergyCamp",
      completed: false,
      completedAt: null,
      createdAt: Date.now() - 1000,
    },
    {
      id: 2,
      text: "Work on backend of OB Work on backend of OB Work on backend of OB Work on backend of OB",
      room: "StudyHub",
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
    {
      id: 3,
      text: "Work on backend of OB",
      room: "StudyHub",
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
    {
      id: 4,
      text: "Work on backend of OB",
      room: "StudyHub",
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
    {
      id: 5,
      text: "Work on backend of OB",
      room: "StudyHub",
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
  ]);

  const incompleteTasksNo = todos.filter((todo) => !todo.completed).length;

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? Date.now() : null,
            }
          : todo,
      ),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
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
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Tasks from all your rooms.</CardDescription>
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
        {sortedTodos.map((todo) => (
          <div key={todo.id} className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-start gap-2">
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={() => handleToggleTodo(todo.id)}
                className="mt-1"
              />
              <div className="min-w-0 flex-1">
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`break-words text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                    todo.completed ? "text-gray-500 line-through" : ""
                  }`}
                >
                  {todo.text}
                </label>
                <p className={`mt-1 truncate text-sm ${todo.completed ? "text-gray-500" : "text-muted-foreground"}`}>
                  {todo.room}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteTodo(todo.id)} className="shrink-0">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
