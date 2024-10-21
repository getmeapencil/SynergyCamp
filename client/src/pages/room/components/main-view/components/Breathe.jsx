export const Breathe = () => {
  const breathingTime = 6;
  const holdingTime = 2;
  const totalTime = breathingTime * 2 + holdingTime * 2;
  const isBreathing = true;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background">
      <div
        className={`flex h-48 w-48 items-center justify-center rounded-full bg-primary lg:h-56 lg:w-56 ${
          isBreathing ? "animate-breathe" : ""
        }`}
        style={{
          animation: isBreathing ? `breathe ${totalTime}s ease-in-out infinite` : "none",
        }}
      ></div>
    </div>
  );
};
