import { create } from "zustand";

export const useMembersStore = create((set, get) => ({
  members: [],
  setMembers: (members) => set({ members }),
  addMember: (member) => {
    console.log("member", member)
    if (get().members.find((m) => m._id === member._id)) return;
    set((state) => ({ members: [...state.members, member] }));
  },
  removeMember: (id) => set((state) => ({ members: state.members.filter((member) => member.userId !== id) })),
  updateMember: (id, member) =>
    set((state) => ({
      members: state.members.map((m) => {
        if (m.userId === id) {
          return member;
        }
        return m;
      }),
    })),
}));
