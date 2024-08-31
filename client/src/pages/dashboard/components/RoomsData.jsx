import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomsTable } from "./RoomsTable";
import { InvitesTable } from "./InvitesTable";

export function RoomsData() {
  return (
    <Tabs defaultValue="rooms" className="">
      <TabsList className="grid w-1/3 grid-cols-2">
        <TabsTrigger value="rooms">Rooms</TabsTrigger>
        <TabsTrigger value="invites">Invites</TabsTrigger>
      </TabsList>
      <TabsContent value="rooms">
        <RoomsTable />
      </TabsContent>
      <TabsContent value="invites">
        <InvitesTable />
      </TabsContent>
    </Tabs>
  );
}
