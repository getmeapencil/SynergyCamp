import { useState } from "react";
import { useMembersStore } from "@/store/members";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarFallback } from "@/utils/generateAvatarFallback";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const Participant = ({ member }) => {
  const [banDuration, setBanDuration] = useState("");
  const [isTempBanDialogOpen, setIsTempBanDialogOpen] = useState(false);
  const [isPermBanDialogOpen, setIsPermBanDialogOpen] = useState(false);

  return (
    <div className="flex justify-between px-4 py-2 hover:bg-background">
      <div className="flex gap-2">
        <Avatar className="rounded-lg">
          <AvatarImage src={member.picture} />
          <AvatarFallback className="rounded-lg">{generateAvatarFallback(member.name)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <div className="text-lg">{member.name}</div>
          <Badge variant="outline" className="h-fit w-fit text-xs capitalize text-muted-foreground">
            {member.role}
          </Badge>
        </div>
      </div>
      {member.role !== "admin" && (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-1">
                  <span>Change Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Check
                        className={cn("mr-2 h-4 w-4", member.role === "moderator" ? "opacity-100" : "opacity-0")}
                      />
                      <span>Moderator</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className={cn("mr-2 h-4 w-4", member.role === "member" ? "opacity-100" : "opacity-0")} />
                      <span>Member</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-1">
                  <span>Temporary Ban</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setBanDuration("a day");
                        setIsTempBanDialogOpen(true);
                      }}
                    >
                      <span>a day</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setBanDuration("a week");
                        setIsTempBanDialogOpen(true);
                      }}
                    >
                      <span>a week</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setBanDuration("a month");
                        setIsTempBanDialogOpen(true);
                      }}
                    >
                      <span>a month</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem className="focus:text-red-500" onClick={() => setIsPermBanDialogOpen(true)}>
                Permanent Ban
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isTempBanDialogOpen} onOpenChange={() => setIsTempBanDialogOpen(!isTempBanDialogOpen)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Do you want to temporarily ban this user?</DialogTitle>
                <DialogDescription>
                  This action will restrict their access for {banDuration}. Do you want to proceed?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="destructive">
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isPermBanDialogOpen} onOpenChange={() => setIsPermBanDialogOpen(!isPermBanDialogOpen)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Do you want to permanently ban this user? </DialogTitle>
                <DialogDescription>
                  This action will revoke their access indefinitely and cannot be undone. Do you want to proceed?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="destructive">
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export const Participants = () => {
  const members = useMembersStore((state) => state.members);

  const onlineMembers = members.filter((member) => member.online);
  const offlineMembers = members.filter((member) => !member.online);

  return (
    <div className="flex h-full flex-col gap-3">
      <Accordion type="multiple" defaultValue={["online", "offline"]}>
        <AccordionItem value="online">
          <AccordionTrigger className="p-4 hover:no-underline">Online</AccordionTrigger>
          <AccordionContent>
            {onlineMembers.map((member) => (
              <Participant key={member._id} member={member} />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="offline">
          <AccordionTrigger className="p-4 hover:no-underline">Offline</AccordionTrigger>
          <AccordionContent>
            {offlineMembers.map((member) => (
              <Participant key={member._id} member={member} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="p-4 text-transparent">
        I will like to thank Suruchi for helping me to write this code by providing emotional support and sending
        stackoverflow solution to a problem I was very obsessively stuck with.
      </div>
    </div>
  );
};
