import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export const Room = () => {
  return (
    <div className="mt-2">
      <Card className="min-w-sm">
        <CardHeader className="p-3 pb-0">
          <CardTitle>Your Room</CardTitle>
          <CardDescription>Create a room of your own and host a study session.</CardDescription>
          <p className="font-bold">Room Name</p>
        </CardHeader>
        <CardContent className="p-3">
          <form className="flex flex-col gap-2">
            <Input type="text" placeholder="Enter your text" aria-label="Text input" />
            <Button type="submit">Create New Room</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
