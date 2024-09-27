import { useSocketStore } from "@/store/socket";

export const useSocketEmitters = () => {
  const socket = useSocketStore((state) => state.socket);

  return {
    joinRoom: ({ roomId }) => socket?.emit("join-room", { roomId }), // this emmiter can be used to join any socket room
    leaveRoom: ({ roomId }) => socket?.emit("leave-room", { roomId }), // this emmiter can be used to leave any socket room
    sendInvites: ({ emails, roomId }) => socket?.emit("send-invite", { emails, roomId }),
    sendMessage: ({ message, roomId }) => socket?.emit("send-message", { message, roomId }),
    permanentBanUser: ({ userId, roomId }) => socket?.emit("permanent-ban-user", { userId, roomId }),
    temporaryBanUser: ({ userId, banDuration, roomId }) =>
      socket?.emit("temporary-ban-user", { userId, banDuration, roomId }),
    editPomodoro: ({ pomodoroType, timezone, roomId }) =>
      socket?.emit("edit-pomodoro", { pomodoroType, timezone, roomId }),
  };
};
