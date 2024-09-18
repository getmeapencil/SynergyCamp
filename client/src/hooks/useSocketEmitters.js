import { useSocketStore } from "@/store/socket";

export const useSocketEmitters = () => {
  const socket = useSocketStore((state) => state.socket);

  return {
    sendInvite: ({ inviteeId, roomId, inviterId }) => socket.emit("send-invite", { inviteeId, roomId, inviterId }),
  };
};
