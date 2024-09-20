import { io } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/store/user";
import { useInvitesStore } from "@/store/invite";
import { useMessagesStore } from "@/store/messages";
import { useRoomStore } from "@/store/room";

export const useSocket = () => {
  const authToken = useUserStore((state) => state.authToken);
  const [socket, setSocket] = useState(null);

  const initializeSocket = useCallback((token) => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      query: { token },
    });

    setSocket(newSocket);
    // Handle connection state
    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      const roomId = useRoomStore.getState().currentRoom;
      if (roomId) {
        newSocket.emit("join-room", { roomId });
      }
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnecting attempt ${attempt}`);
    });

    newSocket.on("reconnect", () => {
      console.log("Reconnected to socket server");
      const roomId = useRoomStore.getState().currentRoom;
      if (roomId) {
        newSocket.emit("join-room", { roomId });
      }
    });

    newSocket.on("incoming-invite", (invite) => {
      useInvitesStore.getState().setInvites(invite);
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
      useMessagesStore.getState().recieveMessage(message);
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
