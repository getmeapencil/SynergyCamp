import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/store/user";
import { LogOut, Moon, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

export const DropdownAvatar = ({ user }) => {
  const { theme, setTheme } = useTheme();
  const navi = useNavigate();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={user?.picture} alt="avatar" />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2 font-medium">
            <User className="h-4 w-4" />
            <span>{user?.name}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex w-full items-center justify-between">
              <Label htmlFor="theme-toggle" className="flex items-center space-x-2">
                <Moon className="h-4 w-4" />
                <span>Dark Mode</span>
              </Label>
              <Switch
                id="theme-toggle"
                checked={theme === "dark"}
                onCheckedChange={(checked) => {
                  checked ? setTheme("dark") : setTheme("light");
                }}
              />
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex gap-2 font-medium">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2 font-medium focus:text-red-500"
            onClick={() => {
              useUserStore.getState().logout();
              navi("/auth");
            }}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
