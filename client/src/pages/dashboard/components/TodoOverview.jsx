"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";

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
      text: "Work on backend of OB",
      room: "StudyHub",
      completed: false,
      completedAt: null,
      createdAt: Date.now(),
    },
  ]);
  const [newTodo, setNewTodo] = useState({ text: "", room: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.text && newTodo.room) {
      setTodos([{ id: Date.now(), ...newTodo, completed: false, completedAt: null, createdAt: Date.now() }, ...todos]);
      setNewTodo({ text: "", room: "" });
      setIsDialogOpen(false);
    }
  };

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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>ToDo</CardTitle>
          <CardDescription>ToDo list from all rooms.</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Todo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="todo-text">Todo</Label>
                <Input
                  id="todo-text"
                  value={newTodo.text}
                  onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="todo-room">Room</Label>
                <Input
                  id="todo-room"
                  value={newTodo.room}
                  onChange={(e) => setNewTodo({ ...newTodo, room: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleAddTodo}>Add Todo</Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {sortedTodos.map((todo) => (
          <div key={todo.id} className="flex items-start justify-between gap-2 rounded-lg p-2">
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
                <p className="mt-1 truncate text-sm text-muted-foreground">{todo.room}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTodo(todo.id)}
              className="shrink-0 text-red-500 hover:bg-red-100 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
