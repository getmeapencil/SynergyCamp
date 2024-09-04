import { BsHouseExclamation } from "react-icons/bs";
import { LuMailWarning } from "react-icons/lu";

export const EmptyTable = ({ variant, text }) => {
  return (
    <div className="grid h-72 place-content-center gap-4 text-center">
      <span className="grid place-content-center text-9xl text-muted-foreground">
        {variant === "room" ? <BsHouseExclamation /> : <LuMailWarning />}
      </span>
      <p className="text-center text-xl text-muted-foreground">{text}</p>
    </div>
  );
};
