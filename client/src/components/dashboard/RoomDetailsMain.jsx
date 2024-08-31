import { useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import { InvitesTable } from "./invitesTable";
import { RoomInfo } from "./RoomInfo";

export const RoomDetailsMain = () => {
  const [activeOption, setActiveOption] = useState("rooms");
  return (
    <div className="h-5/6">
      <ToggleSwitch activeOption={activeOption} setActiveOption={setActiveOption} />
      <InvitesTable activeOption={activeOption} />
      <RoomInfo activeOption={activeOption} />
    </div>
  );
};
