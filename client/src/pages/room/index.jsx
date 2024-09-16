import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { SidePanel } from "./components/side-panel";
import { useParams } from "react-router-dom";

export const Room = () => {
  const [activePanel, setActivePanel] = useState("Chat");
  const { roomId } = useParams();
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <main className="flex max-h-screen flex-1">
        <div className="flex-1"></div>
        <SidePanel activePanel={activePanel} setActivePanel={setActivePanel} />
      </main>
      <SideNav activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
};
