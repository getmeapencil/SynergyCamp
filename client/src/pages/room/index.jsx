import { useState } from "react";
import { SideNav } from "./components/side-nav";

export function Room() {
  const [activePanel, setActivePanel] = useState("Chat");

  const renderPanelContent = () => {
    switch (activePanel) {
      case "Chat":
        return <div>Chat content goes here.</div>;
      case "ToDo":
        return <div>To-Do list content goes here.</div>;
      case "Pomodoro":
        return <div>Pomodoro timer content goes here.</div>;
      case "Calendar":
        return <div>Calendar content goes here.</div>;
      case "Admin Control":
        return <div>Admin Control content goes here.</div>;
      case "Settings":
        return <div>Settings content goes here.</div>;
      default:
        return <div>Select a panel</div>;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav activePanel={activePanel} setActivePanel={setActivePanel} />
      <main className="flex-1 p-6">{renderPanelContent()}</main>
    </div>
  );
}
