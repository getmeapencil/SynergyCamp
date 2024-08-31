import { useState, useEffect, useRef } from "react";
export const ToggleSwitch = ({activeOption, setActiveOption}) => {
  
  const [leftPosition, setLeftPosition] = useState(0);
  const roomsRef = useRef(null)
  const invitesRef = useRef(null);

  useEffect(() => {
    const activeButton = activeOption === "rooms" ? roomsRef.current : invitesRef.current;
    if (activeButton) {
      setLeftPosition(activeButton.offsetLeft);
    }
  }, [activeOption]);

  return (
    <div className="flex  p-2">
      <div className="relative flex rounded-md bg-slate-300 p-1.5">
        <div
          className="absolute rounded-md bg-white transition-all duration-300 ease-in-out"
          style={{
            left: leftPosition,
            top: "5px",
            bottom: "5px",
            width: activeOption === "rooms" ? roomsRef.current?.offsetWidth : invitesRef.current?.offsetWidth,
          }}
        />
        <button
          ref={roomsRef}
          className={`relative z-10 rounded-md px-7 py-3 text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none ${
            activeOption === "rooms" ? "text-slate-800 " : "text-slate-500  hover:text-slate-800"
          }`}
          onClick={() => setActiveOption("rooms")}
          aria-pressed={activeOption === "rooms"}
        >
          Rooms
        </button>
        <button
          ref={invitesRef}
          className={`relative z-10  rounded-md px-7 py-3 text-sm font-medium transition-colors duration-300 ease-in-out focus:outline-none ${
            activeOption === "invites" ? "text-slate-800 " : "text-slate-500 hover:text-slate-800"
          }`}
          onClick={() => setActiveOption("invites")}
          aria-pressed={activeOption === "invites"}
        >
          Invites
        </button>
      </div>
    </div>
  );
};
