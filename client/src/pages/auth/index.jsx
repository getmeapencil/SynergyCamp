import { Button } from "@/components/ui/button";

export const Auth = () => {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-foreground p-6 lg:flex">
        <h1 className="text-4xl font-extrabold text-white">MindMesh</h1>
        <div className="flex-grow"></div> {/* Empty div to push content to the bottom */}
        <p className="text-3xl font-medium text-white">
          Boost Your Productivity Together -<div>Study and Work with Friends in Real-Time</div>
        </p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="mx-auto grid w-[300px] gap-4">
          <div className="grid gap-1 text-center">
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col">
                <div className="flex-1 border-b"></div>
                <div className="flex-1"></div>
              </div>
              <div>Continue with</div>
              <div className="flex flex-1 flex-col">
                <div className="flex-1 border-b"></div>
                <div className="flex-1"></div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
