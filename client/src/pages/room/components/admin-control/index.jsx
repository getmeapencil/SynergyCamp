import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useRoomStore } from "@/store/room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Laugh } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export const AdminControl = () => {
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const { sendInvites } = useSocketEmitters();
  const roomId = useRoomStore((state) => state.currentRoom);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputWarnings, setInputWarnings] = useState({
    roomDescription: "",
    roomName: "",
  });
  const handleChange = (e, type) => {
    const value = e.target.value;
    if (type === "roomDescription") {
      if (value.length >= 100) {
        setInputWarnings((prev) => ({
          ...prev,
          roomDescription: "Maximum 100 characters allowed",
        }));
        setRoomDescription(value.slice(0, 100));
      } else {
        setInputWarnings((prev) => ({
          ...prev,
          roomDescription: "",
        }));
        setRoomDescription(value);
      }
    }
    if (type === "roomName") {
      if (value.length >= 30) {
        setInputWarnings((prev) => ({
          ...prev,
          roomName: "Maximum 30 characters allowed",
        }));
        setRoomName(value.slice(0, 30));
      } else {
        setInputWarnings((prev) => ({
          ...prev,
          roomName: "",
        }));
        setRoomName(value);
      }
    }
  };
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(null);
  };

  const handleInputKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      addEmail();
    }
  };

  const addEmail = () => {
    const trimmedEmail = inputValue.trim();
    if (trimmedEmail && validateEmail(trimmedEmail)) {
      if (!emails.includes(trimmedEmail)) {
        setEmails([...emails, trimmedEmail]);
        setInputValue("");
      } else {
        setError("This email has already been added.");
      }
    } else if (trimmedEmail) {
      setError("Please enter a valid email address.");
    }
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emails.length > 0) {
      sendInvites({ emails, roomId });
      setEmails([]);
    } else {
      setError("Please add at least one valid email address.");
    }
  };

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <Card>
        <CardHeader>
          <CardTitle className='text-md'>Invite Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              {/* <Label htmlFor="email-input">Invite Friends</Label> */}
              <Input
                id="email-input"
                type="text"
                placeholder="Type email address and press Enter key"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onBlur={addEmail}
                autocomplete="off"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            {!!emails.length && (
              <div className="flex flex-wrap gap-2 text-sm">
                {emails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-secondary-foreground"
                  >
                    <span>{email}</span>
                    <button type="button" onClick={() => removeEmail(email)} className="text-secondary-foreground">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <Button type="submit" className="w-full">
              Send Invites
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-md'>Room Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1">
                <Label htmlFor="room-name">Room Name</Label>
                <div className="flex items-center justify-center gap-4">
                  <Input
                    id="room-name"
                    value={roomName}
                    onChange={(e) => handleChange(e, "roomName")}
                    maxLength={30}
                    placeholder="Enter room name"
                  />
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <Button size="icon" className="p-2" variant="outline">
                        <Laugh />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="border-0 p-0" onCloseAutoFocus={(event) => event.preventDefault()}>
                      <EmojiPicker emojiStyle="native" style={{ fontFamily: '"Inter", sans-serif' }} />
                    </PopoverContent>
                  </Popover>
                </div>
                {inputWarnings.roomName && <p className="mt-1 p-1 text-xs text-red-400">{inputWarnings.roomName}</p>}
                {/* <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Room Avatar" />
                </Avatar> */}
              </div>
            </div>
            <div>
              <Label htmlFor="room-description">Room Description</Label>
              <Textarea
                id="room-description"
                value={roomDescription}
                onChange={(e) => {
                  handleChange(e, "roomDescription");
                }}
                maxLength={100}
                placeholder="Enter room description"
                rows={3}
              />
              {inputWarnings.roomDescription && (
                <p className="mt-1 p-1 text-xs text-red-400">{inputWarnings.roomDescription}</p>
              )}
            </div>
            <Button className="w-full">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
