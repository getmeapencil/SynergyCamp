import { io } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/user";
import { useInvitesStore } from "@/store/invite";
import { useMessagesStore } from "@/store/messages";
import { useRoomStore } from "@/store/room";
import { usePomodoroStore } from "@/store/pomodoro";
import { playSound } from "@/utils/playSound";
import { useMembersStore } from "@/store/members";

export const useSocket = () => {
  const authToken = useUserStore((state) => state.authToken);
  const [socket, setSocket] = useState(null);

  const initializeSocket = useCallback((token) => {
    const newSocket = io(import.meta.env.VITE_WEBSOCKET_URL, {
      query: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);
    // Handle connection state
    newSocket.on("connect", () => {
      const roomId = useRoomStore.getState().currentRoom?._id;
      if (roomId) {
        newSocket.emit("join-room", { roomId });
      }
    });
    newSocket.on("user-status", (users) => {
      if (!users) return;
      useMembersStore.getState().setMembers(users);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnecting attempt ${attempt}`);
    });

    newSocket.on("reconnect", () => {
      console.log("Reconnected to socket server");
      const roomId = useRoomStore.getState().currentRoom?._id;
      if (roomId) {
        newSocket.emit("join-room", { roomId });
      }
    });

    newSocket.on("incoming-invite", (invite) => {
      useInvitesStore.getState().setInvites(invite);
    });

    newSocket.on("invite-success", () => {
      toast("Invite sent successfully");
    });

    newSocket.on("invite-error", (error) => {
      console.log("Invite unsuccessful:", error);
      if (error.failedInvites) {
        toast("Failed to send invites to following emails:", {
          description: error.failedInvites.join(" "),
        });
      } else if (error.error) {
        toast("Failed to send invites:", {
          description: error.error,
        });
      }
    });

    newSocket.on("incoming-message", (message) => {
      if (message.notification?.type === "leaving-room" && message.user?._id === useUserStore.getState().user._id) {
        return;
      }
      useMessagesStore.getState().recieveMessage(message);
      if (message.notification) return;
      playSound("/message.mp3");
    });

    newSocket.on("permanent-banned", (data) => {
      if (data?.userId === useUserStore.getState().user._id) {
        toast("You have been permanently banned from the room", {
          type: "error",
        });
        // Redirect to home page
        window.location.href = "/dashboard";
      } else {
        useMembersStore.getState().removeMember(data?.userId);
      }
    });

    newSocket.on("temporary-banned", (data) => {
      if (data?.userId === useUserStore.getState().user._id) {
        toast(`You have been temporarily banned from the room for ${data?.banEndTime}`, {
          type: "error",
        });
        // Redirect to home page
        window.location.href = "/dashboard";
      } else {
        useMembersStore.getState().removeMember(data?.userId);
      }
    });

    newSocket.on("edit-pomodoro", ({ pomodoroType, timezone }) => {
      usePomodoroStore.getState().setPomodoroTypeAndTZ({ pomodoroType, timezone });
    });

    return newSocket;
  }, []);

  useEffect(() => {
    if (authToken) {
      const socketInstance = initializeSocket(authToken);

      // Cleanup on component unmount
      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    }
  }, [authToken, initializeSocket]);

  return socket;
};
