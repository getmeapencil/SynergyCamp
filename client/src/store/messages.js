import { create } from "zustand";

export const useMessagesStore = create(() => ({
  messages: [
    {
      _id: "m1",
      user: {
        _id: "1",
        name: "John Doe",
        picture: "https://randomuser.me/api/portraits/lego/1.jpg",
        role: "admin",
      },
      text: "Hello everyone!",
      createdAt: "2021-09-02T13:04:23.338+00:00",
    },
    {
      _id: "m2",
      user: {
        _id: "2",
        name: "Jane Smith",
        picture: "https://randomuser.me/api/portraits/lego/2.jpg",
        role: "moderator",
      },
      text: "Hi John, how are you?",
      createdAt: "2021-09-02T13:05:01.123+00:00",
    },
    {
      _id: "m3",
      user: {
        _id: "3",
        name: "Alice Johnson",
        picture: "https://randomuser.me/api/portraits/lego/3.jpg",
        role: "member",
      },
      text: "Hey, anyone up for a game later?",
      createdAt: "2021-09-02T13:06:45.567+00:00",
    },
    {
      _id: "m4",
      user: {
        _id: "4",
        name: "Bob Williams",
        picture: "https://randomuser.me/api/portraits/lego/4.jpg",
        role: "member",
      },
      text: "I'm down for a game at 6!",
      createdAt: "2021-09-02T13:07:34.789+00:00",
    },
    {
      _id: "m5",
      user: {
        _id: "5",
        name: "Charlie Brown",
        picture: "https://randomuser.me/api/portraits/lego/5.jpg",
        role: "member",
      },
      text: "Can we make it 7 instead?",
      createdAt: "2021-09-02T13:08:56.432+00:00",
    },
    {
      _id: "m6",
      user: {
        _id: "1",
        name: "John Doe",
        picture: "https://randomuser.me/api/portraits/lego/1.jpg",
        role: "admin",
      },
      text: "7 works for me too!",
      createdAt: "2021-09-02T13:09:15.876+00:00",
    },
    {
      _id: "m7",
      user: {
        _id: "3",
        name: "Alice Johnson",
        picture: "https://randomuser.me/api/portraits/lego/3.jpg",
        role: "member",
      },
      text: "Great! Let's meet up at 7.",
      createdAt: "2021-09-02T13:10:42.298+00:00",
    },
  ],
}));
