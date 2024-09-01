import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Heatmap = () => {
  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle>Heatmap</CardTitle>
        <CardDescription>All your study session streak.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2"></CardContent>
    </Card>
  );
};
