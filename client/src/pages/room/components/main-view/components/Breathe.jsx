import { useEffect, useState } from "react";

export const Breathe = () => {
  const breathingTime = 6; // Default breathing time
  const holdingTime = 3; // Default holding time
  const totalTime = breathingTime * 2 + holdingTime * 2;
  const isBreathing = true;
  const [phase, setPhase] = useState("Inhale"); // Current breathing phase
  // const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      const breathingCycle = () => {
        setPhase("Inhale");
        setTimeout(() => {
          setPhase("Hold");
          setTimeout(() => {
            setPhase("Exhale");
            setTimeout(() => {
              setPhase("Hold");
            }, breathingTime * 1000); // Exhale phase duration
          }, holdingTime * 1000); // First holding phase duration
        }, breathingTime * 1000); // Inhale phase duration
      };

      breathingCycle();
      interval = setInterval(breathingCycle, (breathingTime * 2 + holdingTime * 2) * 1000);
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [breathingTime, holdingTime, isBreathing]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background">
      <div
        className={`flex h-56 w-56 items-center justify-center rounded-full bg-primary ${
          isBreathing ? "animate-breathe" : ""
        }`}
        style={{
          animation: isBreathing ? `breathe ${totalTime}s ease-in-out infinite` : "none",
        }}
      >
        {/* <p className="relative text-background">{isBreathing ? phase : ""}</p> */}
      </div>
      {/* <button
        className={`rounded-md bg-blue-500 px-4 py-2 text-white ${isBreathing ? "bg-red-500" : "bg-blue-500"}`}
        onClick={() => setIsBreathing(!isBreathing)}
      >
        {isBreathing ? "Stop" : "Start"}
      </button> */}
    </div>
  );
};
