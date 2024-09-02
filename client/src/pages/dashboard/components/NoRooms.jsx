import { Card, CardContent } from "@/components/ui/card";
import { BsHouseExclamation } from "react-icons/bs";

export const NoRooms = () => {
  return (
    <div>
      <Card className="mx-auto w-full max-w-md overflow-hidden border-none">
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-6">
          <div className="mb-6">
            <BsHouseExclamation size={100} color="#4a90e2" />
          </div>
          <p className="text-center text-xl text-gray-500">You have not joined any study rooms yet.</p>
        </CardContent>
      </Card>
    </div>
  );
};
