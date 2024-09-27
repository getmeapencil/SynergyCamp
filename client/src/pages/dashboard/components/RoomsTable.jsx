import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { EmptyTable } from "./EmptyTable";
import { useRoomStore } from "@/store/room";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router-dom";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { Emoji, EmojiStyle } from "emoji-picker-react";

export const RoomsTable = ({ filterRoles, searchName }) => {
  const { rooms } = useRoomStore();
  const { user } = useUserStore();
  const [filteredData, setFilteredData] = useState([]);
  const userId = user?._id;
  const { joinRoom } = useSocketEmitters();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredRooms = rooms.filter((room) => {
      const memberRole = room.members.find((member) => member.userId === userId)?.role;
      const matchesRole = filterRoles.length === 0 || filterRoles.includes(memberRole);
      const matchesSearch = room.name.toLowerCase().includes(searchName.toLowerCase());

      return matchesRole && matchesSearch;
    });

    setFilteredData(filteredRooms);
  }, [filterRoles, searchName, rooms, userId]);

  useEffect(() => {
    useRoomStore.getState().getRooms();
  }, []);

  const calculateTotalMembers = (data) => {
    const length = data.members.length;
    return length;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rooms</CardTitle>
        <CardDescription>Recent rooms that you have joined.</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-72 rounded-md border">
          {filteredData?.length ? (
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
                {filteredData.map((data) => {
                  const role = data?.members?.find((member) => member.userId === userId)?.role;
                  return (
                    <TableRow key={data._id}>
                      <TableCell className="flex items-center gap-2">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md border bg-background text-sm font-medium">
                          <Emoji emojiStyle={EmojiStyle.NATIVE} unified={data.avatar} size={20} />
                        </div>

                        <div className="font-medium">{data.name}</div>
                      </TableCell>
                      <TableCell className="text-center capitalize sm:table-cell">
                        <Badge variant={"outline"}>{role}</Badge>
                      </TableCell>
                      <TableCell className="text-center sm:table-cell">{calculateTotalMembers(data)} Members</TableCell>
                      <TableCell className="text-center sm:table-cell">
                        <Button
                          onClick={() => {
                            navigate(`/room/${data._id}`);
                            joinRoom({ roomId: data._id });
                          }}
                        >
                          Enter Room
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : filteredData?.length === 0 ? (
            <EmptyTable variant={"room"} text={"No rooms found by that name."} />
          ) : (
            <EmptyTable variant={"room"} text={"You haven't joined any study rooms yet."} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
