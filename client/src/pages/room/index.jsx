import { useState } from "react";
import { SideNav } from "./components/side-nav";
import { SidePanel } from "./components/side-panel";
import { MainView } from "./components/main-view";
import { useEffect } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import { useRoomStore } from "@/store/room";
import { usePomodoro } from "@/hooks/usePomodoro";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useMembersStore } from "@/store/members";
import { useMessagesStore } from "@/store/messages";

export const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("Chat");
  const [allownavigation, setAllownavigation] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const members = useMembersStore((state) => state.members);
  const { leaveRoom, joinRoom } = useSocketEmitters();
  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    setModalOpen(true);
    return !allownavigation && currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (members.length === 0) {
      joinRoom({ roomId });
    }
  }, [members, joinRoom, roomId]);

  useEffect(() => {
    useRoomStore.getState().getCurrentRoom(roomId);
  }, [roomId]);

  usePomodoro();

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {blocker.state === "blocked" && (
        <AlertDialog open={modalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to exit this room?</AlertDialogTitle>
              <AlertDialogDescription>Exiting the room will clear the chat history.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setAllownavigation(true);
                  setModalOpen(false);
                  navigate(-1);
                  leaveRoom({ roomId });
                  useMessagesStore.getState().clearMessages();
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <main className="flex max-h-screen flex-1">
        <MainView />
        <SidePanel activePanel={activePanel} setActivePanel={setActivePanel} />
      </main>
      <SideNav
        setAllownavigation={setAllownavigation}
        roomId={roomId}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
    </div>
  );
};
