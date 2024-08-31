import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import tableData from "@/assets/roomData.json";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const RoomsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
        <CardDescription>Recent rooms that you have joined.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sm:table-cell">Room</TableHead>
                <TableHead className="text-center sm:table-cell">Role</TableHead>
                <TableHead className="text-center sm:table-cell">Online</TableHead>
                <TableHead className="text-center sm:table-cell">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{data.roomName}</div>
                  </TableCell>
                  <TableCell className="text-center sm:table-cell">{data.role}</TableCell>
                  <TableCell className="text-center sm:table-cell">{data.onlineMembers} Members</TableCell>
                  <TableCell className="text-center sm:table-cell">
                    <Button>Join Room</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
