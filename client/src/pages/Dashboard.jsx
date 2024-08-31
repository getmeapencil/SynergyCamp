import { Barchart } from "../components/dashboard/Barchart";
import { Room } from "@/components/Room";
import { RoomDetailsMain } from "@/components/dashboard/RoomDetailsMain";

export const Dashboard = () => {
  return (
    <>
      <div className="sm:flex">
        <div className="flex h-fit flex-col pl-4">
          <div className="flex flex-1 p-1">
            <Room />
          </div>
          <div className="flex flex-1 p-1">
            <Barchart />
          </div>
        </div>
        <div className="mt-4 h-screen w-full">
          <RoomDetailsMain />
        </div>
      </div>
    </>
  );
};
