import { useCallback } from "react";
import { useSocketStore } from "@/store/socket";

export const useSocketEmitters = () => {
  const socket = useSocketStore((state) => state.socket);

  return {
    joinRoom: useCallback(({ roomId }) => socket?.emit("join-room", { roomId }), [socket]),
    joinUserIdRoom: () => socket?.emit("join-userId-room", {}),
    leaveRoom: ({ roomId }) => socket?.emit("leave-room", { roomId }),
    sendInvites: ({ emails, roomId }) => socket?.emit("send-invite", { emails, roomId }),
    sendMessage: ({ message, roomId }) => socket?.emit("send-message", { message, roomId }),
    permanentBanUser: ({ userId, roomId }) => socket?.emit("permanent-ban-user", { userId, roomId }),
    temporaryBanUser: ({ userId, banDuration, roomId }) =>
      socket?.emit("temporary-ban-user", { userId, banDuration, roomId }),
    editPomodoro: ({ pomodoroType, timezone, roomId }) =>
      socket?.emit("edit-pomodoro", { pomodoroType, timezone, roomId }),
  };
};
