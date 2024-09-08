import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export const Streak = () => {
  const studyData = [
    {
      period: "Today",
      hours: 4, //fetch hours from backend
    },
    {
      period: "This Week",
      hours: 28, //fetch hours from backend
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Study Hours</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer
          config={{
            today: {
              label: "Today",
              color: "hsl(var(--primary))",
            },
            week: {
              label: "This Week",
              color: "hsl(var(--secondary))",
            },
          }}
          className="h-[200px] w-full"
        >
          <BarChart
            data={studyData}
            layout="vertical"
            margin={{
              left: 0,
              right: 48,
              top: 20,
              bottom: 20,
            }}
            barSize={40}
          >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => `${value}h`}
              domain={[0, "dataMax"]}
            />
            <YAxis
              type="category"
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 14 }}
              width={80}
              tickMargin={0}
              yAxisId={0}
            />
            <YAxis
              yAxisId={1}
              orientation="right"
              type="category"
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
            />
            <Bar dataKey="hours" radius={[0, 4, 4, 0]} yAxisId={0}>
              {studyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))"} />
              ))}
              <LabelList
                dataKey="hours"
                position="right"
                formatter={(value) => `${value} hrs`}
                fill="hsl(var(--foreground))"
                fontSize={14}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4 border-t pt-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Today's Study</span>
          <span className="text-2xl font-bold">{studyData[0].hours} hours</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">Weekly Study</span>
          <span className="text-2xl font-bold">{studyData[1].hours} hours</span>
        </div>
      </CardFooter>
    </Card>
  );
};
