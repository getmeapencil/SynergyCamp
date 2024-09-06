import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Room() {
  const [activePanel, setActivePanel] = useState("Chat");

  const renderPanelContent = () => {
    switch (activePanel) {
      case "Chat":
        return <div className="p-4">Chat content goes here.</div>;
      case "ToDo":
        return <div className="p-4">To-Do list content goes here.</div>;
      case "Pomodoro":
        return <div className="p-4">Pomodoro timer content goes here.</div>;
      case "Calendar":
        return <div className="p-4">Calendar content goes here.</div>;
      case "Admin Control":
        return <div className="p-4">Admin Control content goes here.</div>;
      case "Settings":
        return <div className="p-4">Settings content goes here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <main className="flex flex-1">
        <div className="flex-1"></div>
        <div className="w-1/4 min-w-[400px] border-l border-l-border">
          <div className="flex justify-between border-b border-b-border p-4 font-medium">
            <span>Topbar</span>
            <Button className="h-6 w-6" variant="ghost" size="icon" onClick={() => setActivePanel("")}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {renderPanelContent()}
        </div>
      </main>
      <SideNav activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
}
