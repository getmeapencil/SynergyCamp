import { useSocketStore } from "@/store/socket";

export const useSocketEmitters = () => {
  const socket = useSocketStore((state) => state.socket);

  return {
    joinRoom: ({ roomId }) => socket?.emit("join-room", { roomId }),
    sendInvites: ({ emails, roomId }) => socket?.emit("send-invite", { emails, roomId }),
    sendMessage: ({ message, roomId }) => socket?.emit("send-message", { message, roomId }),
    editPomodoro: ({ pomodoroType, timezone, roomId }) =>
      socket?.emit("edit-pomodoro", { pomodoroType, timezone, roomId }),
  };
};
