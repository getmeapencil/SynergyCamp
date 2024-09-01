import { Button } from "@/components/ui/button";

export function Auth() {
  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="hidden bg-foreground lg:flex flex-col justify-between p-6">
        <h1 className="text-white text-2xl font-bold">Mind Mesh</h1>
        <div className="flex-grow"></div> {/* Empty div to push content to the bottom */}
        <p className="text-white text-base font-medium">
          Boost Your Productivity Together -
          <div>Study and Work with Friends in Real-Time</div>
        </p>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="mx-auto grid w-[300px] gap-4">
          <div className="grid gap-1 text-center">
            <h5 className="text-lg font-medium">Sign up / Sign In</h5>
    
            <Button type="submit" className="w-full">
            <img 
                
                alt="Google" 
                className="h-6 w-auto" 
              />
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
