import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useUserStore } from "@/store/user";
// import { Barchart } from "./components/Barchart";
import { DropdownAvatar } from "./components/DropdownAvatar";
import { CreateRoom } from "./components/CreateRoom";
import { RoomsData } from "./components/RoomsData";
import { TaskOverview } from "./components/TaskOverview";
// import { Note } from "./components/Note";
import LogoBlack from "/logo-black.svg";
import LogoWhite from "/logo-white.svg";
// import { Streak } from "./components/Streak";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useMessagesStore } from "@/store/messages";

export const Dashboard = () => {
  const { user } = useUserStore();
  const { theme } = useTheme();
  const { joinUserIdRoom } = useSocketEmitters();

  useEffect(() => {
    joinUserIdRoom();
    useMessagesStore.getState().clearMessages();
  }, [joinUserIdRoom]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <span className="flex gap-2 text-4xl font-extrabold">
          <img
            src={theme === "light" ? LogoBlack : LogoWhite}
            alt="MindMesh"
            className="grid aspect-square w-8 place-content-center"
          />
          MindMesh
        </span>
        <DropdownAvatar user={user} />
      </div>

      <div className="flex flex-col gap-4 overflow-auto p-4 lg:flex-row">
        <div className="flex flex-col gap-4 sm:flex-row lg:w-1/3 lg:flex-col">
          <CreateRoom className="sm:w-1/2 lg:w-full" />
          {/* <Barchart /> */}
          <TaskOverview className="sm:w-1/2 lg:h-fit lg:w-full" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <RoomsData />
        </div>
      </div>
    </div>
  );
};
