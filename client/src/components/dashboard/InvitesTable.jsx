import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import inviteData from "../../assets/inviteData.json";
import { Badge } from "@/components/ui/badge";

export const InvitesTable = ({ activeOption }) => {
  return (
    <Card className={`h-3/5 overflow-y-auto ${activeOption === "rooms" ? "hidden" : ""}`}>
      <CardHeader className="px-7">
        <CardTitle>Room Invitations</CardTitle>
        <CardDescription>Recent rooms invitations recieved.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="">
              <TableHead>Room</TableHead>
              <TableHead className=" sm:table-cell">Role</TableHead>
              <TableHead className=" text-center sm:table-cell">Total Members</TableHead>
              <TableHead className="text-center sm:table-cell">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inviteData.map((data) => (
              <TableRow key={data.id} className="bg-accent">
                <TableCell className = 'flex  items-center '>
                <div>
                    <Badge className='text-lg  bg-[#F1A896] text-slate-900' >{data.roomName[0]}</Badge>
                  </div>
                  <div className="font-medium px-2" >{data.roomName}</div>
                </TableCell>
                <TableCell className=" sm:table-cell">{data.role}</TableCell>
                <TableCell className=" text-center sm:table-cell">{data.totalMembers} Members</TableCell>
                <TableCell className=" text-center sm:table-cell">
                  <Button>Join Room</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
