import { UserModel } from "../../models/user.js";
import { InviteModel } from "../../models/invite.js";
import { RoomModel } from "../../models/room.js";

export const invite = async ({ emails, roomId, senderId }) => {
  try {
    const successfulInvites = [];
    const failedInvites = [];

    for (let email of emails) {
      const user = await UserModel.findOne({ email });
      const invite = await InviteModel.findOne({ roomId, invitee: user?._id });
      if (user && (!invite)) {
        const invite = new InviteModel({
          invitee: user._id,
          invitedBy: senderId,
          roomId: roomId,
          status: "pending",
        });

        await invite.save();

        const room = await RoomModel.findById(roomId).select("name members createdBy").populate({
          path: "createdBy",
          select: "name picture email",
        });

        const response = {
          invitee: String(user._id),
          room: {
            inviteId: String(invite._id),
            roomName: room.name,
            totalMembers: room.members.length,
            invitedBy: {
              name: room.createdBy.name,
              picture: room.createdBy.picture,
              email: room.createdBy.email,
            },
          },
        };

        successfulInvites.push(response);
      } else {
        failedInvites.push(email);
      }
    }

    return {
      successfulInvites,
      failedInvites,
    };
  } catch (e) {
    console.log(e);
    return {
      error: e.message,
    };
  }
};

export const getInvites = async (req, res) => {
  try {
    const invites = await InviteModel.find({ invitee: req.user._id, status: "pending" });

    const response = await Promise.all(
      invites.map(async (invite) => {
        const room = await RoomModel.findById(invite.roomId).select("name members createdBy").populate({
          path: "createdBy",
          select: "name picture email",
        });

        return {
          inviteId: String(invite._id),
          roomName: room.name,
          totalMembers: room.members.length,
          invitedBy: {
            name: room.createdBy.name,
            picture: room.createdBy.picture,
            email: room.createdBy.email,
          },
        };
      }),
    );

    res.json(response);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { inviteId } = req.body;
    const invite = await InviteModel.findById(inviteId);

    if (invite.status === "accepted" || invite.status === "rejected") {
      res.status(500).json("Invitation has been already processed");
      return;
    }

    const room = await RoomModel.findById(invite.roomId);
    room.members.push({ userId: invite.invitee, role: "member" });
    await room.save();

    invite.status = "accepted";
    await invite.save();

    res.status(200).json("Invite accepted!");
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};

export const rejectInvite = async (req, res) => {
  try {
    const { inviteId } = req.body;
    const invite = await InviteModel.findById(inviteId);

    invite.status = "rejected";
    await invite.save();

    res.status(200).json("Invite rejected!");
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
