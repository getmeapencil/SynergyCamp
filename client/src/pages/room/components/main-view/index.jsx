import { useState, memo } from "react";
import { Check, ChevronsUpDown, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Breathe } from "./components/Breathe";
import { Companions } from "./components/Companions";
import { Clock } from "./components/Clock";
import { ThemeNote } from "./components/ThemeNote";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNoteStore } from "@/store/note";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRoomStore } from "@/store/room";

import { Emoji, EmojiStyle } from "emoji-picker-react";

const themes = [
  {
    label: "Companions",
  },
  {
    label: "Breathe",
  },
  {
    label: "Library",
  },
  {
    label: "Tea",
  },
  {
    label: "Clock",
  },
  {
    label: "Note",
  },
];

export const MainView = memo(() => {
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Companions");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const roomNote = useNoteStore((state) => state.roomNote);
  const setRoomNote = useNoteStore((state) => state.setRoomNote);
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const avatar = currentRoom?.avatar ? currentRoom?.avatar : "1f6a4";
  const roomName = currentRoom?.name ? currentRoom?.name : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNote = formData.get("note");
    const newFontSize = parseInt(formData.get("fontSize"), 10);
    const newAlign = formData.get("align");
    const newPosition = formData.get("position");
    setRoomNote({
      note: newNote,
      fontSize: newFontSize,
      align: newAlign,
      position: newPosition,
    });
    setIsDialogOpen(false);
  };

  const renderTheme = () => {
    switch (currentTheme) {
      case "Breathe":
        return <Breathe />;
      case "Companions":
        return <Companions setCurrentTheme={setCurrentTheme} />;
      case "Library":
        return <div className="flex-1 bg-[url('@/assets/main-view-bg-1.jpg')] bg-cover"></div>;
      case "Tea":
        return <div className="flex-1 bg-[url('@/assets/main-view-bg-2.jpg')] bg-cover"></div>;
      case "Clock":
        return <Clock />;
      case "Note":
        return (
          <ThemeNote
            note={roomNote.note}
            fontSize={roomNote.fontSize}
            align={roomNote.align}
            position={roomNote.position}
          />
        );
      default:
        return null;
    }
  };

  if (!currentRoom) return null;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-b-border p-2 font-semibold leading-none tracking-tight">
        <div className="flex gap-2 text-2xl font-extrabold">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md border bg-background text-sm font-medium">
            <Emoji emojiStyle={EmojiStyle.NATIVE} unified={avatar} size={20} />
          </div>
          {roomName}
        </div>
        <div className="flex items-center gap-2">
          {currentTheme === "Note" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PencilIcon className="h-4 w-4" />
                  <span className="sr-only">Edit note</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <Textarea
                      id="note"
                      name="note"
                      placeholder="Anything from favorite quote to your goals"
                      defaultValue={roomNote.note}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size (px)</Label>
                    <Input
                      id="fontSize"
                      name="fontSize"
                      type="number"
                      defaultValue={roomNote.fontSize}
                      min={8}
                      max={72}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Alignment</Label>
                    <RadioGroup defaultValue={roomNote.align} name="align" className="flex">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="align-left" />
                        <Label htmlFor="align-left">Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="center" id="align-center" />
                        <Label htmlFor="align-center">Center</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="align-right" />
                        <Label htmlFor="align-right">Right</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <RadioGroup defaultValue={roomNote.position} name="position" className="flex">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="top" id="position-top" />
                        <Label htmlFor="position-top">Top</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="center" id="position-center" />
                        <Label htmlFor="position-center">Center</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bottom" id="position-bottom" />
                        <Label htmlFor="position-bottom">Bottom</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button type="submit" className="w-full">
                    Save Note
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                {currentTheme ? themes.find((theme) => theme.label === currentTheme)?.label : "Select theme..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search theme..." />
                <CommandList>
                  <CommandEmpty>No theme found.</CommandEmpty>
                  <CommandGroup>
                    {themes.map((theme) => (
                      <CommandItem
                        key={theme.label}
                        value={theme.label}
                        onSelect={(currentValue) => {
                          setCurrentTheme(currentValue === currentTheme ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", currentTheme === theme.label ? "opacity-100" : "opacity-0")}
                        />
                        {theme.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {renderTheme()}
    </div>
  );
});

MainView.displayName = "MainView";
