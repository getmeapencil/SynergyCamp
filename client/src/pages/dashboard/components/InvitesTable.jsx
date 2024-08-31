import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../../../components/ui/button";
import inviteData from "../../../assets/inviteData.json";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const InvitesTable = () => {
  return (
    <Card className={`h-80 overflow-y-auto`}>
      <CardHeader className="px-7">
        <CardTitle>Room Invitations</CardTitle>
        <CardDescription>Recent rooms invitations recieved.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="">
              <TableHead>Room</TableHead>
              <TableHead className="sm:table-cell">Role</TableHead>
              <TableHead className="text-center sm:table-cell">Total Members</TableHead>
              <TableHead className="text-center sm:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inviteData.map((data) => (
              <TableRow key={data.id} className="bg-accent">
                <TableCell className="flex items-center">
                  <div>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="px-2 font-medium">{data.roomName}</div>
                </TableCell>
                <TableCell className="sm:table-cell">{data.role}</TableCell>
                <TableCell className="text-center sm:table-cell">{data.totalMembers} Members</TableCell>
                <TableCell className="text-center sm:table-cell">
                  <Button className="mx-1 bg-green-500 hover:bg-green-600">Accept</Button>
                  <Button variant="destructive" className="hover:bg-red-600">
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
