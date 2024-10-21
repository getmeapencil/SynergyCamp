import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format, with 12 instead of 0 for midnight
    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background">
      <Card>
        <CardContent className="flex items-center justify-center p-4 xl:p-6">
          <div className="font-mono text-5xl font-bold text-primary xl:text-8xl">{formatTime(time)}</div>
        </CardContent>
      </Card>
    </div>
  );
};
