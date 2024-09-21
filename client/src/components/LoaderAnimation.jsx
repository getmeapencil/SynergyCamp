import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export const LoaderAnimation = ({ className }) => {
  return (
    <div className={cn("grid place-content-center", className)}>
      <Loader className="h-10 w-10 animate-spin" />
    </div>
  );
};
