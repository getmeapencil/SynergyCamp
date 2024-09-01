import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export const TodoOverview = () => {
  return (
    <Card className="w-1/3">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>ToDo</CardTitle>
          <CardDescription>ToDo list from all rooms.</CardDescription>
        </div>
        <div className="text-5xl">2/5</div>
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
          <Checkbox id="terms2" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Work on backend of OB
            </label>
            <p className="text-sm text-muted-foreground">StudyHub</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
