import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Typewriter from "typewriter-effect";
import { useRoomStore } from "@/store/room";
import { useState } from "react";
import { toast } from "sonner";

export const CreateRoom = () => {
  const [name, setName] = useState("");

  const createRoom = async () => {
    if (!name.trim()) {
      toast.error("Room name can't be empty or whitespace!");
      return;
    }
    await useRoomStore.getState().createRoom(name.trim(), "");
  };

  return (
    <div className="w-full">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Your Room</CardTitle>
          <CardDescription className="flex flex-wrap gap-1">
            <span>Create a room of your own and host a</span>
            <Typewriter
              options={{
                strings: ["study", "work"],
                autoStart: true,
                loop: true,
              }}
            />
            <span>session.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className={"flex flex-col gap-2"}>
          <p className="font-bold">Room Name</p>

          <Input
            type="text"
            placeholder="Type room name here"
            aria-label="Text input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={createRoom}>Create New Room</Button>
        </CardContent>
      </Card>
    </div>
  );
};
