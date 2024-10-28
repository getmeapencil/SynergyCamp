import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Typewriter from "typewriter-effect";
import { useRoomStore } from "@/store/room";
import { useState } from "react";
import { toast } from "sonner";
import moment from "moment-timezone";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const CreateRoom = ({ className }) => {
  const [name, setName] = useState("");

  const createRoom = async () => {
    if (!name.trim()) {
      toast.error("Room name can't be empty or whitespace!");
      return;
    }
    await useRoomStore.getState().createRoom({ name: name.trim(), description: "", timezone: moment.tz.guess() });
  };

  return (
    <div className={className}>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0} className="inline-flex">
                <Button onClick={createRoom} className="flex-1" disabled>
                  Create New Room
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unavailable. Ask developer for an invite.</p>
            </TooltipContent>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  );
};
