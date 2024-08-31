import { Barchart } from "./components/Barchart";
import { Room } from "./components/Room";
import { RoomsData } from "./components/RoomsData";

export const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen flex-col gap-4 p-4 sm:flex-row">
        <div className="flex flex-col gap-4 sm:w-1/3">
          <Room />
          <Barchart />
        </div>
        <div className="flex-1">
          <RoomsData />
        </div>
      </div>
    </>
  );
};
