export const useSocketEmitters = (socket) => {
  return {
    sendInvite: ({ inviteeId, roomId, inviterId }) => socket.emit("send-invite", { inviteeId, roomId, inviterId }),
  };
};
