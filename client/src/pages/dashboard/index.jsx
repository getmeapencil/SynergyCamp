import { Barchart } from "./components/Barchart";
import { DropdownAvatar } from "./components/DropdownAvatar";
import { Room } from "./components/Room";
import { RoomsData } from "./components/RoomsData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TodoOverview } from "./components/TodoOverview";
import { Heatmap } from "./components/Heatmap";

import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import LogoBlack from "/logo-black.svg";
import LogoWhite from "/logo-white.svg";
import { useTheme } from "@/components/theme-provider";
import { Streak } from "./components/Streak";

export const Dashboard = () => {
  const { user } = useUserStore();
  const { theme } = useTheme();

  useEffect(() => {
    // fetch user data
    if (!user) {
      useUserStore.getState().fetchUser();
    }
  }, [user]);

  return (
    <>
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
          {/* Add DropDown here - Show Name, username, Switch for lightmode and dark, logout  */}
          <DropdownAvatar user={user} />
        </div>
        <ScrollArea>
          <div className="flex gap-4 p-4 sm:flex-row">
            <div className="flex flex-col gap-4 sm:w-1/3">
              <Room />
              <Barchart />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <RoomsData />
              <div className="flex flex-1 gap-4">
                <TodoOverview />
                <div className="w-2/3">
                  <Streak />
                </div>
                <Heatmap />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
