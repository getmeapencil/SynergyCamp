import { memo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pomodoro } from "./pomodoro";
import { Chat } from "./chat";
import { Participants } from "./participants";
import { AdminControl } from "./admin-control";
import { Task } from "./Task";
import { Settings } from "./settings";

export const SidePanel = memo(({ activePanel, setActivePanel,  members }) => {
  const renderPanelContent = () => {
    switch (activePanel) {
      case "Chat":
        return <Chat />;
      case "Participants":
        return <Participants allmembers={members} />;
      case "Task":
        return <Task />;
      case "Pomodoro":
        return <Pomodoro />;
      case "Calendar":
        return <div className="p-4">Calendar content goes here.</div>;
      case "Admin Control":
        return <AdminControl allmembers={members} />;
      case "Settings":
        return <Settings />;
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
});
SidePanel.displayName = "SidePanel";
