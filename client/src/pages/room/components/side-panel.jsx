import { memo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pomodoro } from "./pomodoro";
import { Chat } from "./chat";
import { Participants } from "./participants";
import { AdminControl } from "./admin-control";
import { Task } from "./Task";
// import { Settings } from "./settings";

export const SidePanel = memo(({ activePanel, setActivePanel }) => {
  const renderPanelContent = () => {
    switch (activePanel) {
      case "Chat":
        return <Chat />;
      case "Participants":
        return <Participants />;
      case "Task":
        return <Task />;
      case "Pomodoro":
        return <Pomodoro />;
      // case "Calendar":
      //   return <div className="grid flex-1 place-content-center p-4 text-xl">Coming soon...</div>;
      case "Admin Control":
        return <AdminControl />;
      // case "Settings":
      //   return <Settings />;
      default:
        return null;
    }
  };

  if (!activePanel) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex w-full min-w-[400px] flex-col border-l border-l-border bg-background md:static md:w-1/4">
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
