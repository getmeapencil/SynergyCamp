import { useUserStore } from "@/store/user";
import { useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocketIO() {
  const { authToken } = useUserStore();
  const socketRef = useRef();

  useEffect(() => {
    if (!authToken) {
      return;
    }
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      query: {
        token: authToken,
      },
    });

    // Set the socket reference on connect
    socket.on("connect", () => {
      console.log("i connected");
      socketRef.current = socket;
    });

    let reconnectTimeout;
    socket.on("disconnect", () => {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = setTimeout(() => {
        socket.connect();
      }, 4000);
    });

    // Listening for the "receive-invite" event
    socket.on("receive-invite", (invite) => {
      console.log("Invite received:", invite);
      alert(`You have been invited to join room: ${invite.roomId} by user: ${invite.inviterId}`);
      // You can handle the invite UI update or notification here
    });

    return () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      socket.disconnect();
    };
  }, [authToken]);

  const emit = (event, payload) => {
    if (socketRef.current) {
      socketRef.current.emit(event, payload);
    }
  };

  const sendInvite = useCallback(
    (userId, roomId, inviterId) => {
      console.log("called");
      if (socketRef.current) {
        socketRef.current.emit("send-invite", { inviteeId: userId, roomId: roomId, inviterId: inviterId });
      }
    },
    [socketRef],
  );

  return {
    emit,
    sendInvite,
  };
}
