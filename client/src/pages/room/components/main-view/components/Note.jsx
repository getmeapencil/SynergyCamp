import { useUserStore } from "@/store/user";

export const Note = ({ note, fontSize, align, position }) => {
  const user = useUserStore((state) => state.user);

  const firstName = user?.name?.split(" ")[0] || "there";

  const gradientText = (text) => {
    return (
      <span className="animate-gradient-x bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {text}
      </span>
    );
  };

  const getPositionStyle = () => {
    switch (position) {
      case "top":
        return { top: "2rem", bottom: "auto" };
      case "bottom":
        return { top: "auto", bottom: "2rem" };
      default:
        return { top: "50%", transform: "translateY(-50%)" };
    }
  };

  return (
    <div className="relative flex flex-1 overflow-auto bg-background">
      <div
        style={{
          fontSize: `${fontSize}px`,
          textAlign: align,
          position: "absolute",
          left: 0,
          right: 0,
          ...getPositionStyle(),
        }}
        className="whitespace-pre-line px-8 leading-tight"
      >
        {note || (
          <>
            <strong className="font-bold">{gradientText(`Hello, ${firstName}`)}</strong>
            <br />
            Let&apos;s be productive today.
          </>
        )}
      </div>
    </div>
  );
};
