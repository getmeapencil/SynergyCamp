import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { SidePanel } from "./components/side-panel";
import { MainView } from "./components/main-view";

export const Room = () => {
  const [activePanel, setActivePanel] = useState("Chat");

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <main className="flex max-h-screen flex-1">
        <MainView />
        <SidePanel activePanel={activePanel} setActivePanel={setActivePanel} />
      </main>
      <SideNav activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
};
