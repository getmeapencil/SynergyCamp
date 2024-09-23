export const Breathe = () => {
  const breathingTime = 6;
  const holdingTime = 3;
  const totalTime = breathingTime * 2 + holdingTime * 2;
  const isBreathing = true;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background">
      <div
        className={`flex h-56 w-56 items-center justify-center rounded-full bg-primary ${
          isBreathing ? "animate-breathe" : ""
        }`}
        style={{
          animation: isBreathing ? `breathe ${totalTime}s ease-in-out infinite` : "none",
        }}
      ></div>
    </div>
  );
};
