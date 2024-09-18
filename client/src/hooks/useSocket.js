import { useUserStore } from "@/store/user";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

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
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnecting attempt ${attempt}`);
    });

    newSocket.on("reconnect", () => {
      console.log("Reconnected to socket server");
    });

    newSocket.on("receive-invite", (invite) => {
      console.log("Invite received:", invite);
      alert(`You have been invited to join room: ${invite.roomId} by user: ${invite.inviterId}`);
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
