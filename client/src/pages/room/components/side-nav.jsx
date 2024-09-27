import { memo } from "react";
import { MessageSquare, Timer, Settings, ListTodo, Calendar, LogOut, ShieldPlus, SquareUserRound } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/store/user";

// JSON structure
const navTopItems = [
  { label: "Chat", icon: MessageSquare },
  { label: "Participants", icon: SquareUserRound },
  { label: "Task", icon: ListTodo },
  { label: "Pomodoro", icon: Timer },
  { label: "Calendar", icon: Calendar },
];

const cn = {
  div: "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:border-foreground hover:text-foreground md:h-8 md:w-8",
  icon: "h-5 w-5",
};

const cnActive = {
  div: "group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base",
  icon: "h-4 w-4 transition-all group-hover:scale-110",
};

const ActiveNavItem = ({ item }) => {
  const IconComponent = item.icon;
  return (
    <div className={cnActive.div}>
      <IconComponent className={cnActive.icon} />
      <span className="sr-only">{item.label}</span>
    </div>
  );
};

const NavItem = ({ item, setActivePanel }) => {
  const IconComponent = item.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div onClick={() => setActivePanel(item.label)} className={cn.div}>
          <IconComponent className={cn.icon} />
          <span className="sr-only">{item.label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
};

export const SideNav = memo(({ activePanel, setActivePanel, members }) => {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  const isAdmin = members.some((member) => member.id === currentUser.id && member.role === "admin");

  return (
    <aside className="z-10 hidden min-h-screen w-14 flex-col border-l bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {navTopItems.map((item, index) => {
          return activePanel === item.label ? (
            <ActiveNavItem key={index} item={item} />
          ) : (
            <NavItem key={index} item={item} setActivePanel={setActivePanel} />
          );
        })}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        {isAdmin &&
          (activePanel === "Admin Control" ? (
            <ActiveNavItem item={{ label: "Admin Control", icon: ShieldPlus }} />
          ) : (
            <NavItem item={{ label: "Admin Control", icon: ShieldPlus }} setActivePanel={setActivePanel} />
          ))}
        {activePanel === "Settings" ? (
          <ActiveNavItem item={{ label: "Settings", icon: Settings }} />
        ) : (
          <NavItem item={{ label: "Settings", icon: Settings }} setActivePanel={setActivePanel} />
        )}
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:border-destructive hover:text-destructive md:h-8 md:w-8">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Exit</span>
                </div>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">Exit</TooltipContent>
          </Tooltip>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to exit this room?</AlertDialogTitle>
              <AlertDialogDescription>Exiting the room will clear the chat history.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  navigate(-1);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>
    </aside>
  );
});
SideNav.displayName = "SideNav";
