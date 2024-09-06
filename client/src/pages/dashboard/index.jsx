import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/store/user";
import { Barchart } from "./components/Barchart";
import { DropdownAvatar } from "./components/DropdownAvatar";
import { CreateRoom } from "./components/CreateRoom";
import { RoomsData } from "./components/RoomsData";
import { TodoOverview } from "./components/TodoOverview";
import { Heatmap } from "./components/Heatmap";
import LogoBlack from "/logo-black.svg";
import LogoWhite from "/logo-white.svg";

export const Dashboard = () => {
  const { user } = useUserStore();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch user data
    if (!user) {
      useUserStore
        .getState()
        .fetchUser()
        .then((res) => {
          if (!res) {
            navigate("/auth");
          }
        });
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border border-b p-4">
        <span className="flex gap-2 text-4xl font-extrabold">
          <img
            src={theme === "light" ? LogoBlack : LogoWhite}
            alt="MindMesh"
            className="grid aspect-square w-8 place-content-center"
          />
          MindMesh
        </span>
        <DropdownAvatar user={user} />
      </div>
      <ScrollArea>
        <div className="flex gap-4 p-4 sm:flex-row">
          <div className="flex flex-col gap-4 sm:w-1/3">
            <CreateRoom />
            <Barchart />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <RoomsData />
            <div className="flex flex-1 gap-4">
              <TodoOverview />
              <Heatmap />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
