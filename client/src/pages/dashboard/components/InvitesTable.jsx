import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmptyTable } from "./EmptyTable";
import { useInvitesStore } from "@/store/invite";
import { generateAvatarFallback } from "@/utils/generateAvatarFallback";
import { useEffect } from "react";

export const InvitesTable = ({ filterRoles, searchName }) => {
  const inviteData = useInvitesStore((state) => state.invites);
  let filteredData = inviteData;
  
  filteredData = filteredData.filter((data) => data.roomName.toLowerCase().includes(searchName.toLowerCase()));

  useEffect(() => {
    useInvitesStore.getState().getInvites();
  }, []);

  const noSearchResults = searchName && filteredData.length === 0;

  const handleAcceptInvite = (inviteId) => {
    useInvitesStore.getState().acceptInvite(inviteId);
  };

  const handleRejectInvite = (inviteId) => {
    useInvitesStore.getState().rejectInvite(inviteId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invites</CardTitle>
        <CardDescription>Rooms you&apos;ve been invited to.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 rounded-md border">
          {filteredData.length ? (
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="sm:table-cell">Invited by</TableHead>
                  <TableHead className="text-center sm:table-cell">Room</TableHead>
                  <TableHead className="hidden text-center sm:table-cell">Total Members</TableHead>
                  <TableHead className="text-center sm:table-cell">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((data) => (
                  <TableRow key={data.inviteId}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={data.invitedBy.picture} />
                        <AvatarFallback>{generateAvatarFallback(data.invitedBy.name)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{data.invitedBy.name}</div>
                    </TableCell>
                    <TableCell className="text-center sm:table-cell">{data.roomName}</TableCell>
                    <TableCell className="hidden text-center sm:table-cell">{data.totalMembers} Members</TableCell>
                    <TableCell className="text-center">
                      <div className="flex place-content-center gap-2">
                        <Button
                          variant="outline"
                          className="border-green-300 hover:bg-green-300 dark:border-green-700 hover:dark:bg-green-700"
                          onClick={() => handleAcceptInvite(data.inviteId)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          className="border-red-300 hover:bg-red-300 dark:border-red-700 hover:dark:bg-red-700"
                          onClick={() => handleRejectInvite(data.inviteId)}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : noSearchResults ? (
            <EmptyTable variant={"invite"} text={"No invites received by that name."} />
          ) : (
            <EmptyTable variant={"invite"} text={"You haven't received any room invites yet."} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
