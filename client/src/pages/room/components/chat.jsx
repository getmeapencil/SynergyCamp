import { useMessagesStore } from "@/store/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarFallback } from "@/utils/generateAvatarFallback";
import { formatDateWithWeekday, formatDateTime } from "@/utils/formatDate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Laugh, SendHorizontal } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useState } from "react";

export const Chat = () => {
  const messages = useMessagesStore((state) => state.messages);
  const { theme } = useTheme();
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-3 overflow-auto">
        {messages.map((message) => (
          <div className="flex w-full gap-2 p-2 px-4 hover:bg-background" key={message._id}>
            <div className="">
              <Avatar className="rounded-lg">
                <AvatarImage src={message.user.picture} />
                <AvatarFallback className="rounded-lg">{generateAvatarFallback(message.user.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm">{message.user.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-xs text-muted-foreground">
                      {formatDateTime(new Date(message.createdAt))}
                    </TooltipTrigger>
                    <TooltipContent>{formatDateWithWeekday(new Date(message.createdAt))}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t px-2 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size="icon" variant="outline">
              <Laugh />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-0 p-0">
            <EmojiPicker
              theme={theme}
              emojiStyle="native"
              onEmojiClick={(obj) => setText(text + obj.emoji)}
              style={{ fontFamily: '"Inter", sans-serif' }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
        <Input value={text} onChange={handleTextChange} className="flex-1" placeholder="Type a message" />
        <Button size="icon" variant="outline">
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
};
