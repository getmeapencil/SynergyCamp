import { Barchart } from "./components/Barchart";
import { Room } from "./components/Room";
import { RoomsData } from "./components/RoomsData";

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
          <RoomsData />
        </div>
      </div>
    </>
  );
};
