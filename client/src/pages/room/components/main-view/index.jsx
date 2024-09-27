import { useState, memo } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Breathe } from "./components/Breathe";
import { Companions } from "./components/Companions";
import { Clock } from "./components/Clock";
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
];

export const MainView = memo(() => {
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Companions");
  const currentRoom = useRoomStore((state) => state.currentRoom);
  if (!currentRoom) return null;
  const avatar = currentRoom.avatar ? currentRoom.avatar : "1f6a4";
  const roomName = currentRoom.name ? currentRoom.name : "";

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
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-b-border p-2 font-semibold leading-none tracking-tight">
        <div className="flex gap-2 text-2xl font-extrabold">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md border bg-background text-sm font-medium">
            <Emoji emojiStyle={EmojiStyle.NATIVE} unified={avatar} size={20} />
          </div>
          {roomName}
        </div>
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
      {renderTheme()}
    </div>
  );
});
MainView.displayName = "MainView";
