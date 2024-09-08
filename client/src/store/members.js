import { create } from "zustand";

export const useMembersStore = create(() => ({
  members: [
    {
      _id: "1",
      name: "John Doe",
      picture: "https://randomuser.me/api/portraits/lego/1.jpg",
      online: true,
      role: "admin",
    },
    {
      _id: "2",
      name: "Jane Smith",
      picture: "https://randomuser.me/api/portraits/lego/2.jpg",
      online: false,
      role: "moderator",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      picture: "https://randomuser.me/api/portraits/lego/3.jpg",
      online: true,
      role: "member",
    },
    {
      _id: "4",
      name: "Bob Williams",
      picture: "https://randomuser.me/api/portraits/lego/4.jpg",
      online: false,
      role: "member",
    },
    {
      _id: "5",
      name: "Charlie Brown",
      picture: "https://randomuser.me/api/portraits/lego/5.jpg",
      online: true,
      role: "member",
    },
  ],
}));
