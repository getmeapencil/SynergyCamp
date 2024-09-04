import { BsHouseExclamation } from "react-icons/bs";
import { LuMailWarning } from "react-icons/lu";
import { MdSearchOff } from "react-icons/md";
export const EmptyTable = ({ variant, text }) => {
  return (
    <div className="grid h-72 place-content-center gap-4 text-center">
      <span className="grid place-content-center text-9xl text-muted-foreground">
        {variant === "room" ? <BsHouseExclamation /> : variant === "emptysearch" ? <MdSearchOff /> : <LuMailWarning />}
      </span>
      <p className="text-center text-xl text-muted-foreground">{text}</p>
    </div>
  );
};
