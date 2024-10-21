import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { SidePanel } from "./components/side-panel";
import { MainView } from "./components/main-view";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoomStore } from "@/store/room";
import { usePomodoro } from "@/hooks/usePomodoro";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
// import { useMembersStore } from "@/store/members";
import { useMessagesStore } from "@/store/messages";
import { Error } from "../error";

export const Room = () => {
  const { roomId } = useParams();
  const [activePanel, setActivePanel] = useState("Chat");
  // const members = useMembersStore((state) => state.members);
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const { joinRoom } = useSocketEmitters();

  useEffect(() => {
    joinRoom({ roomId });
  }, [joinRoom, roomId]);

  useEffect(() => {
    useRoomStore.getState().getCurrentRoom(roomId);
  }, [roomId]);

  useEffect(() => {
    window.onpopstate = () => {
      useMessagesStore.getState().clearMessages();
    };
  }, []);

  usePomodoro();

  if (!currentRoom) return <Error errorMessage="You currently don't belong to this room :/" />;

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
