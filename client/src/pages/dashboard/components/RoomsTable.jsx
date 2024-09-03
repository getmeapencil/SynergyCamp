import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import tableData from "@/assets/roomData.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyTable } from "./EmptyTable";

export const RoomsTable = ({ filterRole, searchName }) => {
  let filteredData = tableData;
  if (filterRole.length !== 0) {
    filteredData = tableData.filter((data) => data.role === filterRole);
  }
  filteredData = filteredData.filter((data) => data.roomName.toLowerCase().includes(searchName.toLowerCase()));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
        <CardDescription>Recent rooms that you have joined.</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-72 rounded-md border">
          {filteredData.length ? (
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
                {filteredData.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{data.roomName}</div>
                    </TableCell>
                    <TableCell className="text-center sm:table-cell">
                      <Badge variant={"outline"}>{data.role}</Badge>
                    </TableCell>
                    <TableCell className="text-center sm:table-cell">{data.onlineMembers} Members</TableCell>
                    <TableCell className="text-center sm:table-cell">
                      <Button>Join Room</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyTable variant={"room"} text={"You haven't joined any study rooms yet."} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
