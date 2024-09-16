import {
  MessageSquare,
  Timer,
  Settings,
  ListTodo,
  Calendar,
  LogOut,
  ShieldPlus,
  SquareUserRound,
  Users,
} from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// JSON structure
const navTopItems = [
  { label: "Chat", icon: MessageSquare },
  { label: "Participants", icon: SquareUserRound },
  { label: "ToDo", icon: ListTodo },
  { label: "Pomodoro", icon: Timer },
  { label: "Calendar", icon: Calendar },
  { label: "Invite Friends", icon: Users },
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

export const SideNav = ({ activePanel, setActivePanel }) => {
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
        {activePanel === "Admin Control" ? (
          <ActiveNavItem item={{ label: "Admin Control", icon: ShieldPlus }} />
        ) : (
          <NavItem item={{ label: "Admin Control", icon: ShieldPlus }} setActivePanel={setActivePanel} />
        )}
        {activePanel === "Settings" ? (
          <ActiveNavItem item={{ label: "Settings", icon: Settings }} />
        ) : (
          <NavItem item={{ label: "Settings", icon: Settings }} setActivePanel={setActivePanel} />
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:border-destructive hover:text-destructive md:h-8 md:w-8">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Exit</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Exit</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
