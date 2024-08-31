import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomsTable } from "./RoomsTable";
import { InvitesTable } from "./InvitesTable";

export function RoomsData() {
  return (
    <Tabs defaultValue="account" className="">
      <TabsList className="grid w-1/2 grid-cols-2">
        <TabsTrigger value="account">Rooms </TabsTrigger>
        <TabsTrigger value="password">Invitations</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <RoomsTable />
      </TabsContent>
      <TabsContent value="password">
        <InvitesTable />
      </TabsContent>
    </Tabs>
  );
}
