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

export const Room = () => {
  const [activePanel, setActivePanel] = useState("Chat");
  const [allownavigation, setAllownavigation] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { roomId } = useParams();
  const { currentRoom } = useRoomStore();
  const { members: activeMembers } = useMembersStore();
  const { leaveRoom, joinRoom } = useSocketEmitters();
  const navigate = useNavigate();
  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    setModalOpen(true);
    return !allownavigation && currentLocation.pathname !== nextLocation.pathname;
  });
  useEffect(() => {
    if (activeMembers.length === 0) {
      joinRoom({ roomId });
    }
  }, [activeMembers]);

  useEffect(() => {
    useRoomStore.getState().getCurrentRoom(roomId);
  }, [roomId]);
  usePomodoro();
  const members =
    currentRoom?.members?.map((member) => {
      return { ...member.userId, role: member.role, joinedAt: member.joinedAt };
    }) || [];
    console.log("memebrs",members,currentRoom)
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {blocker.state === "blocked" ? (
        <>
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
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : null}
      <main className="flex max-h-screen flex-1">
        <MainView />
        <SidePanel members={members} activePanel={activePanel} setActivePanel={setActivePanel} />
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
