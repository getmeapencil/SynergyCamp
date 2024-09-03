import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import inviteData from "@/assets/inviteData.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NoInvites } from "./NoInvites";

export const InvitesTable = ({ filterRole, searchName }) => {
  let filteredData = inviteData.filter((data) => data.role == filterRole);
  if (filteredData.length == 0) {
    filteredData = inviteData;
  }
  filteredData = filteredData.filter((data) => data.roomName.toLowerCase().includes(searchName.toLowerCase()));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invites</CardTitle>
        <CardDescription>Rooms you&apos;ve been invited to.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 rounded-md border">
          {inviteData.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sm:table-cell">Room</TableHead>
                  <TableHead className="text-center sm:table-cell">Role</TableHead>
                  <TableHead className="text-center sm:table-cell">Total Members</TableHead>
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
                    <TableCell className="text-center sm:table-cell">{data.totalMembers} Members</TableCell>
                    <TableCell className="text-center sm:table-cell">
                      <div className="flex place-content-center gap-2">
                        <Button variant="outline" className="border-green-300 hover:bg-green-300">
                          Accept
                        </Button>
                        <Button variant="outline" className="border-red-300 hover:bg-red-300">
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <NoInvites />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
