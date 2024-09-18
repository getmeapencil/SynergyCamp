import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pomodoro } from "./pomodoro";
import { Chat } from "./chat";
import { Participants } from "./participants";
import { EventForm } from "./calendar";

export const SidePanel = ({ activePanel, setActivePanel }) => {
  const renderPanelContent = () => {
    switch (activePanel) {
      case "Chat":
        return <Chat />;
      case "Participants":
        return <Participants />;
      case "ToDo":
        return <div className="p-4">To-Do list content goes here.</div>;
      case "Pomodoro":
        return <Pomodoro />;
      case "Calendar":
        return <EventForm />;
      case "Admin Control":
        return <div className="p-4">Admin Control content goes here.</div>;
      case "Settings":
        return <div className="p-4">Settings content goes here.</div>;
      default:
        return null;
    }
  };

  if (!activePanel) return null;

  return (
    <div className="flex w-1/4 min-w-[400px] flex-col border-l border-l-border">
      <div className="flex justify-between border-b border-b-border p-4 text-xl font-semibold leading-none tracking-tight">
        <span>{activePanel}</span>
        <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => setActivePanel("")}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col overflow-auto">{renderPanelContent()}</div>
    </div>
  );
};
