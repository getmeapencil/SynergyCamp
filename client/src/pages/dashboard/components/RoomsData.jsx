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
import { ListFilter, Search } from "lucide-react";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function RoomsData() {
  const [filter, setFilter] = useState({
    selectedRole: "",
    minMembers: 0,
    name: "",
  });
  console.log(filter)

  return (
    <Tabs defaultValue="rooms" className="">
      <div className="flex justify-between">
        <div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              aria-label="Search"
              onChange={(e) => {
                setFilter((prevFilter) => ({ ...prevFilter, name: e.target.value }));
              }}
            />
          </div>
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
                    selectedRole: prevFilter.selectedRole === "Admin" ? "" : "Admin",
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
                    selectedRole: prevFilter.selectedRole === "Moderator" ? "" : "Moderator",
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
                    selectedRole: prevFilter.selectedRole === "Member" ? "" : "Member",
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
        <RoomsTable filterRole={filter.selectedRole} searchName = {filter.name} />
      </TabsContent>
      <TabsContent value="invites">
        <InvitesTable filterRole={filter.selectedRole} searchName = {filter.name} />
      </TabsContent>
    </Tabs>
  );
}
