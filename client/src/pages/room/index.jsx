import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { SidePanel } from "./components/side-panel";
import { MainView } from "./components/main-view";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoomStore } from "@/store/room";
import { usePomodoro } from "@/hooks/usePomodoro";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useMembersStore } from "@/store/members";
import { useMessagesStore } from "@/store/messages";

export const Room = () => {
  const { roomId } = useParams();
  const [activePanel, setActivePanel] = useState("Chat");
  const members = useMembersStore((state) => state.members);
  const { joinRoom, leaveRoom } = useSocketEmitters();

  useEffect(() => {
    if (members?.length === 0) {
      joinRoom({ roomId });
    }
  }, [members, joinRoom, roomId]);

  useEffect(() => {
    useRoomStore.getState().getCurrentRoom(roomId);
  }, [roomId]);

  useEffect(() => {
    window.onpopstate = () => {
      leaveRoom({ roomId });
      useMessagesStore.getState().clearMessages();
    };
  }, [leaveRoom, roomId]);

  usePomodoro();

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <main className="flex max-h-screen flex-1">
        <MainView />
        <SidePanel  activePanel={activePanel} setActivePanel={setActivePanel} />
      </main>
      <SideNav members ={members} roomId={roomId} activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
};
