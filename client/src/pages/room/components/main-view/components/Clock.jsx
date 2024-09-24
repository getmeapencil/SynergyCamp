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
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background">
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <div className="font-mono text-8xl font-bold text-primary">{formatTime(time)}</div>
        </CardContent>
      </Card>
    </div>
  );
};
