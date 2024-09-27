import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRoomStore } from "@/store/room";
import { useUserStore } from "@/store/user";
import { createApiCall } from "@/utils/createApiCall";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { roomId } = useParams();
  const userRole = useRoomStore((state) => state.userRole);
  const userId = useUserStore((state) => state.user._id);
  const navigate = useNavigate();

  const handleLeaveRoom = async () => {
    const response = await createApiCall({
      method: "DELETE",
      route: `/room/permanent-leave`,
      withCredentials: true,
      data: { roomId, userId },
    });
    console.log(response);
    navigate(-1);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
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
        </CardContent>
      </Card>
      {userRole !== "admin" && (
        <div className="flex items-center justify-between space-x-2">
          <Button variant="destructive" onClick={handleLeaveRoom} className="w-full">
            Leave Room Permanently
          </Button>
        </div>
      )}
    </div>
  );
};
