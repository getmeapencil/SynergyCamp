export const playSound = (path) => {
  const audio = new Audio(path);
  audio.play().catch((error) => console.error("Audio play error:", error));
};
