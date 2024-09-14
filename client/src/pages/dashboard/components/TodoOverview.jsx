import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export const TodoOverview = () => {
  return (
    <Card className="h-fit w-1/4">
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
  );
};
