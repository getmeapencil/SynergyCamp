import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyTable } from "./EmptyTable";
import { useRoomStore } from "@/store/room";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router-dom";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";

export const RoomsTable = ({ filterRole, searchName }) => {
  const { rooms,allUsers } = useRoomStore();
  const { user } = useUserStore();
  const [filteredData, setFilteredData] = useState([]);
  const userId = user?._id;
  const {joinRoom}=useSocketEmitters();
  const navigate = useNavigate();
  useEffect(() => {
    if (filterRole?.length === 0) {
      setFilteredData(rooms);
    } else {
      setFilteredData(() => {
        return rooms.filter((data) => data.role === filterRole);
      });
    }
  }, [filterRole]);

  useEffect(() => {
    useRoomStore.getState().getRooms();
  }, []);
  useEffect(() => {
    if (rooms) {
      setFilteredData(rooms);
    }
  }, [rooms]);
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
                  <TableHead className="text-center sm:table-cell">Online</TableHead>
                  <TableHead className="text-center sm:table-cell">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((data) => {
                  const role = data?.members?.find((member) => member.userId === userId)?.role;
                  return (
                    <TableRow key={data._id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{data.name}</div>
                      </TableCell>
                      <TableCell className="text-center capitalize sm:table-cell">
                        <Badge variant={"outline"}>{role}</Badge>
                      </TableCell>
                      <TableCell className="text-center sm:table-cell">{data.onlineMembers} Members</TableCell>
                      <TableCell className="text-center sm:table-cell">
                        <Button
                          onClick={() => {
                            navigate(`/room/${data._id}`);
                            joinRoom({roomId:data._id});
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
