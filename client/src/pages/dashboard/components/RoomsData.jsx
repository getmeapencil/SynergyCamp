import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomsTable } from "./RoomsTable";
import { InvitesTable } from "./InvitesTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  ListFilter } from "lucide-react";

import { useState } from "react";

export function RoomsData() {
  const [filter, setFilter] = useState({
    selectedRole: "",
    minMembers: 0,
    searchTerm: "",
  });

  return (
    <Tabs defaultValue="rooms" className="">
      <div className="flex justify-between">
        <div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
          </TabsList>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListFilter />
                Filter{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>hi</DropdownMenuItem> */}

              <DropdownMenuCheckboxItem
                checked={filter.selectedRole == "Admin" ? true : false}
                onCheckedChange={() => {
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    selectedRole: "Admin",
                  }));
                }}
              >
                Admin
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter.selectedRole == "Moderator" ? true : false}
                onCheckedChange={() => {
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    selectedRole: "Moderator",
                  }));
                }}
              >
                Moderator
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filter.selectedRole == "Member" ? true : false}
                onCheckedChange={() => {
                  setFilter((prevFilter) => ({
                    ...prevFilter,
                    selectedRole: "Member",
                  }));
                }}
              >
                Member
              </DropdownMenuCheckboxItem>

             
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent value="rooms">
        <RoomsTable filterRole={filter.selectedRole} />
      </TabsContent>
      <TabsContent value="invites">

        <InvitesTable filterRole={filter.selectedRole} />
      </TabsContent>
    </Tabs>
  );
}
