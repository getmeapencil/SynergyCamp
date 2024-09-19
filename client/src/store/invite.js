import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";

export const useInvitesStore = create((set, get) => ({
  invites: [],
  setInvites: (invite) => {
    set({ invites: [...get().invites, invite] });
  },
  getInvites: async () => {
    try {
      const invites = await createApiCall({
        method: "GET",
        route: "/invite",
        withCredentials: true,
      });
      set({ invites });
    } catch (error) {
      console.error(error);
    }
  },
  acceptInvite: async (inviteId) => {
    try {
      await createApiCall({
        method: "POST",
        route: "/invite/accept",
        data: { inviteId },
        withCredentials: true,
      });
      const invites = get().invites.filter((invite) => invite.inviteId !== inviteId);
      set({ invites: [...invites] });
    } catch (error) {
      console.error("Error accepting invite:", error);
    }
  },
  rejectInvite: async (inviteId) => {
    try {
      await createApiCall({
        method: "POST",
        route: "/invite/reject",
        data: { inviteId },
        withCredentials: true,
      });
      const invites = get().invites.filter((invite) => invite.inviteId !== inviteId);
      set({ invites: [...invites] });
    } catch (error) {
      console.error("Error rejecting invite:", error);
    }
  },
}));
