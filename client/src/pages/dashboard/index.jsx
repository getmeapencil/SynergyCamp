import { Barchart } from "./components/Barchart";
import { DropdownAvatar } from "./components/DropdownAvatar";
import { Room } from "./components/Room";
import { RoomsData } from "./components/RoomsData";
import { ScrollArea } from "@/components/ui/scroll-area";
export const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between border border-b p-4">
          <span className="text-4xl font-extrabold">MindMesh</span>
          {/* Add DropDown here - Show Name, username, Switch for lightmode and dark, logout  */}
          <DropdownAvatar/>
        </div>
        <ScrollArea>
          <div className="flex gap-4 p-4 sm:flex-row">
            <div className="flex flex-col gap-4 sm:w-1/3">
              <Room />
              <Barchart />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <RoomsData />
              {/* More components to come here */}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
