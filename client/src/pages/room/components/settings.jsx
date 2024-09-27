import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Settings = () => {
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
        </CardContent>
      </Card>
    </div>
  );
};
