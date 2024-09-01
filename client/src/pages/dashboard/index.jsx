import { Barchart } from "./components/Barchart";
import { Room } from "./components/Room";
import { RoomsData } from "./components/RoomsData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
// import Logo from "@/assets/mindmesh.svg";

export const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex items-center justify-between border border-b p-4">
          <span className="flex gap-2 text-4xl font-extrabold">
            <span className="grid w-10 place-content-center">
              <svg width="40" height="40" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="45" y="30" width="90" height="452" rx="45" fill="black" />
                <rect
                  x="82.6396"
                  y="493.871"
                  width="90"
                  height="580.155"
                  rx="45"
                  transform="rotate(-135 82.6396 493.871)"
                  fill="black"
                />
                <rect
                  x="52"
                  y="115.64"
                  width="90"
                  height="522.673"
                  rx="45"
                  transform="rotate(-45 52 115.64)"
                  fill="black"
                />
                <circle cx="90" cy="90" r="90" fill="black" />
                <circle cx="90" cy="422" r="90" fill="black" />
                <rect x="377" y="30" width="90" height="452" rx="45" fill="black" />
                <circle cx="422" cy="90" r="90" fill="black" />
                <circle cx="422" cy="422" r="90" fill="black" />
              </svg>
            </span>
            MindMesh
          </span>
          {/* Add DropDown here - Show Name, username, Switch for lightmode and dark, logout  */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
              <div className="flex gap-4">
                <Card className="w-1/2">
                  <CardHeader>
                    <CardTitle>ToDo</CardTitle>
                    <CardDescription>ToDo list from all rooms.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <div className="items-top flex space-x-2">
                      <Checkbox id="terms1" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Make notes on C++
                        </label>
                        <p className="text-sm text-muted-foreground">SynergyCamp</p>
                      </div>
                    </div>
                    <div className="items-top flex space-x-2">
                      <Checkbox id="terms1" />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Work on backend of OB
                        </label>
                        <p className="text-sm text-muted-foreground">StudyHub</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div>HeatMap</div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
