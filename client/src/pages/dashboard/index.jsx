import { Barchart } from "./components/Barchart";
import { DropdownAvatar } from "./components/DropdownAvatar";
import { Room } from "./components/Room";
import { RoomsData } from "./components/RoomsData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TodoOverview } from "./components/TodoOverview";
import { Heatmap } from "./components/Heatmap";
import { MindMeshLogo } from "@/assets/mindmesh-logo";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    // fetch user data
    if (!user) {
      useUserStore.getState().fetchUser();
    }
  }, [user]);
  console.log(user)
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between border border-b p-4">
          <span className="flex gap-2 text-4xl font-extrabold">
            <span className="grid aspect-square w-10 place-content-center">
              <MindMeshLogo />
            </span>
            MindMesh
          </span>
          {/* Add DropDown here - Show Name, username, Switch for lightmode and dark, logout  */}
          <DropdownAvatar user={user}/>
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
                <Heatmap />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
