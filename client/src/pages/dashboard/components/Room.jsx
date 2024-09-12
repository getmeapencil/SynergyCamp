import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRoomStore } from "@/store/room";
import { useState } from "react";

export const Room = () => {
  const [name, setName] = useState("");

  const createRoom = async () => {
    console.log("Creating Room:", name);
    await useRoomStore.getState().createRoom(name, "");
  };
  return (
    <div className="w-full">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Your Room</CardTitle>
          <CardDescription>Create a room of your own and host a study session.</CardDescription>
        </CardHeader>
        <CardContent className={"flex flex-col gap-2"}>
          <p className="font-bold">Room Name</p>

          <Input
            type="text"
            placeholder="Type room name here"
            aria-label="Text input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button disabled={name.length === 0} onClick={() => createRoom()}>
            Create New Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
