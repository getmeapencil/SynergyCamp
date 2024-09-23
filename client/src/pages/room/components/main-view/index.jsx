import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useTheme } from "@/components/theme-provider";
import LogoBlack from "/logo-black.svg";
import LogoWhite from "/logo-white.svg";
import { Breathe } from "./components/Breathe";
import { Companions } from "./components/Companions";

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
];

export const MainView = () => {
  const [open, setOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("Companions");
  const { theme: appTheme } = useTheme();

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
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-b-border p-2 font-semibold leading-none tracking-tight">
        <span className="flex gap-2 text-2xl font-extrabold">
          <img
            src={appTheme === "light" ? LogoBlack : LogoWhite}
            alt="MindMesh"
            className="grid aspect-square w-5 place-content-center"
          />
          MindMesh
        </span>
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
};
