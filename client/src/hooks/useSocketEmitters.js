import { useSocketStore } from "@/store/socket";

export const useSocketEmitters = () => {
  const socket = useSocketStore((state) => state.socket);

  return {
    joinRoom: ({ roomId }) => socket?.emit("join-room", { roomId }), // this emmiter can be used to join any socket room
    leaveRoom: ({ roomId }) => socket?.emit("leave-room", { roomId }), // this emmiter can be used to leave any socket room
    sendInvites: ({ emails, roomId }) => socket?.emit("send-invite", { emails, roomId }),
    sendMessage: ({ message, roomId }) => socket?.emit("send-message", { message, roomId }),
  };
};
