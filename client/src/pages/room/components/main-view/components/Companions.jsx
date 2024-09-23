import { Button } from "@/components/ui/button";
import { Mic, Volume2, Video, PhoneOff } from "lucide-react";
import Companion1 from "@/assets/companion-1.gif";
import Companion2 from "@/assets/companion-2.gif";
import Companion3 from "@/assets/companion-3.gif";
import Companion4 from "@/assets/companion-4.gif";

const companions = [
  {
    src: Companion1,
    name: "Shizuku T",
  },
  {
    src: Companion2,
    name: "Umi M",
  },
  {
    src: Companion3,
    name: "Izuku M",
  },
  {
    src: Companion4,
    name: "Jiro H",
  },
];

export const Companions = () => {
  return (
    <div className="flex flex-1 flex-col overflow-auto bg-background">
      <div className="grid w-full flex-1 grid-cols-1 gap-4 overflow-auto p-6 lg:grid-cols-2">
        {companions.map((companion, index) => (
          <div key={index} className="relative w-full pb-[56.25%]">
            <img
              src={companion.src}
              alt={`Companion ${index}`}
              className="absolute inset-0 h-full w-full rounded-2xl border object-cover"
            />
            <span className="absolute bottom-2 left-2 rounded-md bg-background/75 px-2">{companion.name}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full shrink-0 justify-center gap-4 border-t p-4">
        <Button size="icon" disabled>
          <Mic />
        </Button>
        <Button size="icon" disabled>
          <Volume2 />
        </Button>
        <Button size="icon" disabled>
          <Video />
        </Button>
        <Button size="icon" variant="destructive" disabled>
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
};
