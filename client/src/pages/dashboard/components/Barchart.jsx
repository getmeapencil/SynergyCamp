import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
export const Barchart = () => {
  const data = {
    presentDayTime: 7500,
    weekTime: 1000000,
    goaltime: 200000,
  };
  dayjs.extend(duration);
  const dailyDuration = dayjs.duration(data.presentDayTime, "seconds").format("H[h] m[m] ");
  const weeklyDuration = dayjs.duration(data.weekTime, "seconds").format("H[h] m[m] ");
  const goalTime = dayjs.duration(data.goaltime, "seconds").format("H[h] m[m] ");

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="space-y-0 pb-2">
          <CardDescription>Today</CardDescription>
          <CardTitle className="text-4xl tabular-nums">{dailyDuration}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              steps: {
                label: "Hours",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <BarChart
              accessibilityLayer
              margin={{
                left: -4,
                right: -4,
              }}
              data={[
                {
                  date: "2024-09-01",
                  Hours: 12,
                },
                {
                  date: "2024-09-02",
                  Hours: 4,
                },
                {
                  date: "2024-09-03",
                  Hours: 6,
                },
                {
                  date: "2024-09-04",
                  Hours: 8,
                },
                {
                  date: "2024-09-05",
                  Hours: 2,
                },
                {
                  date: "2024-09-06",
                  Hours: 3,
                },
                {
                  date: "2024-09-07",
                  Hours: 10,
                },
              ]}
            >
              <Bar
                dataKey="Hours"
                fill="var(--color-steps)"
                radius={5}
                fillOpacity={0.6}
                activeBar={<Rectangle fillOpacity={0.8} />}
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideIndicator
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                    }}
                  />
                }
                cursor={false}
              />
              <ReferenceLine y={5} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeWidth={1}>
                <Label position="insideBottomLeft" value="Average Hours" offset={10} fill="hsl(var(--foreground))" />
                <Label
                  position="insideTopLeft"
                  value="5"
                  className="text-lg"
                  fill="hsl(var(--foreground))"
                  offset={10}
                  startOffset={100}
                />
              </ReferenceLine>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1">
          <CardDescription>
            Over the past 7 days, you have studied <span className="font-medium text-foreground">{weeklyDuration}</span>
          </CardDescription>
          <CardDescription>
            You need <span className="font-medium text-foreground">{goalTime}</span> more to reach your goal.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
