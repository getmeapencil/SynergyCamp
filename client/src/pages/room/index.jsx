import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { SidePanel } from "./components/side-panel";
import { MainView } from "./components/main-view";
import { useEffect } from "react";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useParams } from "react-router-dom";
import { useRoomStore } from "@/store/room";

export const Room = () => {
  const [activePanel, setActivePanel] = useState("Chat");
  const { roomId } = useParams();
  const { joinRoom } = useSocketEmitters();

  useEffect(() => {
    joinRoom({ roomId });
    useRoomStore.getState().setCurrentRoom(roomId);
  }, [roomId, joinRoom]);

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
