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

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useInvitesStore } from "@/store/invite";

export function RoomsData() {
  const [filter, setFilter] = useState({
    selectedRole: [],
    minMembers: 0,
    name: "",
  });
  const [selectedTab, setSelectedTab] = useState("rooms");
  const getInvites = useInvitesStore((state) => state.getInvites);
  const invites = useInvitesStore((state) => state.invites);
  const inviteCount = invites.length;

  useEffect(() => {
    getInvites();
  }, [getInvites]);

  return (
    <Tabs defaultValue="rooms" onValueChange={(value) => setSelectedTab(value)}>
      <div className="flex justify-between">
        <div>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="invites" className="relative">
              Invites
              {inviteCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {inviteCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 md:grow-0">
            <span className="absolute grid h-full w-8 place-content-center text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-7 md:w-[200px] lg:w-[336px]"
              aria-label="Search"
              onChange={(e) => {
                setFilter((prevFilter) => ({ ...prevFilter, name: e.target.value }));
              }}
            />
          </div>
          {selectedTab === "rooms" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-1">
                  <ListFilter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" align="end">
                <DropdownMenuLabel>Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filter.selectedRole.includes("admin")}
                  onCheckedChange={() => {
                    setFilter((prevFilter) => {
                      const isSelected = prevFilter.selectedRole.includes("admin");
                      return {
                        ...prevFilter,
                        selectedRole: isSelected
                          ? prevFilter.selectedRole.filter((role) => role !== "admin")
                          : [...prevFilter.selectedRole, "admin"],
                      };
                    });
                  }}
                >
                  Admin
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter.selectedRole.includes("moderator")}
                  onCheckedChange={() => {
                    setFilter((prevFilter) => {
                      const isSelected = prevFilter.selectedRole.includes("moderator");
                      return {
                        ...prevFilter,
                        selectedRole: isSelected
                          ? prevFilter.selectedRole.filter((role) => role !== "moderator")
                          : [...prevFilter.selectedRole, "moderator"],
                      };
                    });
                  }}
                >
                  Moderator
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter.selectedRole.includes("member")}
                  onCheckedChange={() => {
                    setFilter((prevFilter) => {
                      const isSelected = prevFilter.selectedRole.includes("member");
                      return {
                        ...prevFilter,
                        selectedRole: isSelected
                          ? prevFilter.selectedRole.filter((role) => role !== "member")
                          : [...prevFilter.selectedRole, "member"],
                      };
                    });
                  }}
                >
                  Member
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <TabsContent value="rooms">
        <RoomsTable filterRoles={filter.selectedRole} searchName={filter.name} />
      </TabsContent>
      <TabsContent value="invites">
        <InvitesTable searchName={filter.name} />
      </TabsContent>
    </Tabs>
  );
}
