import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Array of inspirational quotes
const quotes = [
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "The best way to get started is to quit talking and begin doing.",
  "Don’t let yesterday take up too much of today.",
  "You learn more from failure than from success. Don’t let it stop you. Failure builds character.",
  "It’s not whether you get knocked down, it’s whether you get up.",
];

export const Inspiration = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false); // To track the fading transition

  useEffect(() => {
    if (quotes.length > 1) {
      const intervalId = setInterval(() => {
        // Start fading out before changing the quote
        setIsFading(true);

        // Change quote after fade-out completes
        setTimeout(() => {
          setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
          setIsFading(false); // Start fading in the new quote
        }, 500); // Half-second delay for fade-out
      }, 10000); // Change quote every 5 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, []);

  return (
    <Card className="h-fit w-2/4">
      <CardHeader>
        <CardTitle>Inspiration</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-5xl">
        <div
          className={`transition-opacity duration-500 ${isFading && quotes.length > 1 ? "opacity-0" : "opacity-100"}`}
        >
          {quotes[currentQuoteIndex]}
        </div>
      </CardContent>
    </Card>
  );
};
