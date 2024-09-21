import { useMessagesStore } from "@/store/messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarFallback } from "@/utils/generateAvatarFallback";
import { formatDateWithWeekday, formatDateTime } from "@/utils/formatDate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Laugh, SendHorizontal } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useState, useRef, useEffect } from "react";
import { useSocketEmitters } from "@/hooks/useSocketEmitters";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const messages = useMessagesStore((state) => state.messages);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { theme } = useTheme();
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { sendMessage } = useSocketEmitters();
  const { roomId } = useParams();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = () => {
    if (text.trim() === "") return;
    const message = {
      text: text.trim(),
    };
    sendMessage({ message, roomId });
    setText("");
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (obj) => {
    setText((prevText) => prevText + obj.emoji);

    if (inputRef.current) {
      console.log("handleEmojiSelect ~ inputRef.current:", inputRef.current);
      inputRef.current.focus();
    }

    setIsOpen(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    !isOpen && inputRef.current.focus();
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-3 overflow-auto">
        {messages.map((message) => {
          return message.notification ? (
            <div key={message._id} className="flex justify-center bg-muted p-1 text-sm text-muted-foreground">
              {message.text}
            </div>
          ) : (
            <div key={message._id} className="flex w-full gap-2 p-2 px-4 hover:bg-background">
              <div className="">
                <Avatar className="rounded-lg">
                  <AvatarImage src={message.user?.picture} />
                  <AvatarFallback className="rounded-lg">{generateAvatarFallback(message.user?.name)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{message.user?.name}</span>
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
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 border-t px-2 py-4">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline">
              <Laugh />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-0 p-0" onCloseAutoFocus={(event) => event.preventDefault()}>
            <EmojiPicker
              theme={theme}
              emojiStyle="native"
              onEmojiClick={handleEmojiSelect}
              style={{ fontFamily: '"Inter", sans-serif' }}
            />
          </PopoverContent>
        </Popover>
        <Input
          ref={inputRef}
          value={text}
          onChange={handleTextChange}
          className="flex-1"
          placeholder="Type a message"
          onKeyDown={handleEnterPress}
        />
        <Button size="icon" variant="outline" onClick={handleSendMessage}>
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
};
