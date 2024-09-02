import { Card, CardContent } from "@/components/ui/card";
import { LucideMailWarning } from "lucide-react";

export const NoInvites = () => {
  return (
    <div>
      <Card className="mx-auto w-full max-w-md overflow-hidden border-none">
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-6">
          <div className="mb-6">
            <LucideMailWarning size={100} color="#4a90e2" />
          </div>
          <p className="text-center text-xl text-gray-500">You have not Recieved any room invites yet.</p>
        </CardContent>
      </Card>
    </div>
  );
};
