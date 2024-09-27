import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMembersStore } from "@/store/members";
import { useRoomStore } from "@/store/room";
import { useUserStore } from "@/store/user";
import { createApiCall } from "@/utils/createApiCall";

export const Settings = () => {
  const currentRoom = useRoomStore((state) => state.currentRoom);
  const roomId = currentRoom._id;
  const currentUser = useUserStore((state) => state.user);
  const memberId = currentUser._id;
  const members = useMembersStore((state) => state.members);
  const isAdmin = members.some((member) => member.id === currentUser.id && member.role === "admin");
  const handleLeaveRoom = async () => {
    const response = await createApiCall({
      method: "DELETE",
      route: `/room/permanentleave`,
      withCredentials: true,
      data: { roomId, memberId },
    });
    console.log(response);
  };
  return (
    <div className="flex flex-1 flex-col p-4">
      <Card>
        <CardHeader>
          <CardTitle>Sound Notifications</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="mute-messages" className="flex flex-col space-y-1">
              <span>Mute sound notification for messages</span>
            </Label>
            <Switch id="mute-messages" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="mute-tasks" className="flex flex-col space-y-1">
              <span>Mute sound notification for Task completion</span>
            </Label>
            <Switch id="mute-tasks" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="mute-pomodoro" className="flex flex-col space-y-1">
              <span>Mute sound notification for pomodoro</span>
            </Label>
            <Switch id="mute-pomodoro" />
          </div>
          {!isAdmin && (
            <div className="flex items-center justify-between space-x-2">
              <Button variant="destructive" onClick={handleLeaveRoom} className="w-full">
                Leave Room Permanently
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
