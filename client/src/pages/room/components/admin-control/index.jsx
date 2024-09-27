import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useRoomStore } from "@/store/room";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useTheme } from "@/components/theme-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import { DeleteDialog } from "./components/DeleteDialog";
import { useUserStore } from "@/store/user";

export const AdminControl = () => {
  const { theme } = useTheme();
  const { roomId } = useParams();
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const { sendInvites } = useSocketEmitters();
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const [roomProfile, setRoomProfile] = useState({
    roomName: `${currentRoom.name}`,
    roomDescription: `${currentRoom.description ? currentRoom.description : ""}`,
    roomAvatar: `${currentRoom.avatar ? currentRoom.avatar : "1f6a4"}`,
  });
  const [inputWarnings, setInputWarnings] = useState({
    roomDescription: "",
    roomName: "",
  });

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

  const handleChange = (e, type) => {
    const value = e.target.value;
    if (type === "roomDescription") {
      if (value.length >= 100) {
        setInputWarnings((prev) => ({
          ...prev,

          roomDescription: "Maximum 100 characters allowed",
        }));
        setRoomProfile((prev) => ({
          ...prev,
          roomDescription: e.target.value.slice(0, 100),
        }));
      } else {
        setInputWarnings((prev) => ({
          ...prev,
          roomDescription: "",
        }));
        setRoomProfile((prev) => ({
          ...prev,
          roomDescription: e.target.value,
        }));
      }
    }
    if (type === "roomName") {
      if (value.length >= 30) {
        setInputWarnings((prev) => ({
          ...prev,
          roomName: "Maximum 30 characters allowed",
        }));
        setRoomProfile((prev) => ({
          ...prev,
          roomName: e.target.value.slice(0, 30),
        }));
      } else {
        setInputWarnings((prev) => ({
          ...prev,
          roomName: "",
        }));
        setRoomProfile((prev) => ({
          ...prev,
          roomName: e.target.value,
        }));
      }
    }
  };

  const handleEmojiSelect = (obj) => {
    setIsEmojiPickerOpen(false);
    setRoomProfile((prev) => ({
      ...prev,
      roomAvatar: obj.unified,
    }));
  };

  const handleRoomProfileSubmit = async (e) => {
    e.preventDefault();
    await useRoomStore.getState().editRoomProfile({ roomProfile, roomId });
  };

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Invite Friends</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email-input">Emails</Label>
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
          <CardTitle className="text-md">Room Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRoomProfileSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="room-name">Name</Label>
              <div className="flex gap-2">
                <Input
                  id="room-name"
                  className="flex-1"
                  value={roomProfile.roomName}
                  onChange={(e) => {
                    handleChange(e, "roomName");
                  }}
                  maxLength={30}
                  placeholder="Enter room name"
                />
                <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button size="icon" variant="outline" className="shrink-0">
                      <Emoji emojiStyle={EmojiStyle.NATIVE} unified={roomProfile.roomAvatar} size={20} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="border-0 p-0" align="end">
                    <EmojiPicker
                      theme={theme}
                      emojiStyle="native"
                      onEmojiClick={handleEmojiSelect}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                      lazyLoadEmojis={true}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {inputWarnings.roomName && <p className="text-xs text-red-400">{inputWarnings.roomName}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="room-description">Description</Label>
              <Textarea
                id="room-description"
                value={roomProfile.roomDescription}
                onChange={(e) => {
                  handleChange(e, "roomDescription");
                }}
                maxLength={100}
                placeholder="Enter room description"
                rows={3}
              />
              {inputWarnings.roomDescription && <p className="text-xs text-red-400">{inputWarnings.roomDescription}</p>}
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* <Button onClick={handleDeleteRoom} className="w-full gap-2" variant="destructive">
        <Trash />
        Delete Room
      </Button> */}
      <Card>
        <DeleteDialog currentRoom={currentRoom} />
      </Card>
    </div>
  );
};
