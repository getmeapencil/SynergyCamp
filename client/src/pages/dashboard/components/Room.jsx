import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export const Room = () => {
  return (
    <div className="w-full">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Your Room</CardTitle>
          <CardDescription>Create a room of your own and host a study session.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold">Room Name</p>
          <form className="flex flex-col gap-2">
            <Input type="text" placeholder="Type room name here" aria-label="Text input" />
            <Button type="submit">Create New Room</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
