import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import { useHistoryStore } from "@/store/history";
export const Barchart = () => {
  const {last7days}=useHistoryStore()
  const [barchartData,setbarchartData]=useState([])

  dayjs.extend(duration);
  const totalHours = last7days.reduce((total, day) => total + parseFloat(day.hoursSpanned), 0);
  const todayData = last7days[6]; // Assuming last7days[6] is today
  let todayHours = 0, todayMinutes = 0;

  if (todayData) {
    const hoursSpanned = parseFloat(todayData.hoursSpanned);
    todayHours = Math.floor(hoursSpanned); // Whole hours
    todayMinutes = Math.round((hoursSpanned - todayHours) * 60); // Remaining minutes
  }
  const dailyDuration = `${todayHours}h ${todayMinutes}m`; 
  useEffect(() => {
    useHistoryStore.getState().getLast7days()
  }, []);
  useEffect(() => {
    let dydata = last7days.map((day) => {
      return {
        date: day.date,
        Hours: day.hoursSpanned,
      };
    })
    setbarchartData(dydata)
  }, [last7days]);
  console.log("last7days",last7days)
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
              data={barchartData}
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
            Over the past 7 days, you have studied <span className="font-medium text-foreground">{totalHours}hours</span>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
