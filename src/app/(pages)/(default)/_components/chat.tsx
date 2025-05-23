//import modules
import React from "react";
import Image from "next/image";

//import components
import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";

//import assets
import woodTexture from "@assets/images/wood-texture.png";
import chatIcon from "@assets/images/star-icon.png";
import chatBottom from "@assets/images/chat-bottom.png";
import { useApp } from "@/app/_contexts/appContext";
import { MsgIcon } from "@/app/_assets/svg/template";

//interface
interface ChatMessage {
  username: string;
  message: string;
}

interface ChatCardProps {
  message: ChatMessage;
}

const ChatCard: React.FC<ChatCardProps> = ({ message }) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-golden-brown/10 text-[#804306]",
        "border-1 border-golden font-bumper-sticker [text-shadow:0px_1px_0px_rgba(0,42,84,0.10)]"
      )}
    >
      <p
        className={cn(
          "rounded-md -mt-3 -ml-1 w-fit pl-3 pr-1 bg-yellow-2 text-[12px]/[12px] py-[1px]",
          "border-1 border-golden font-bumper-sticker",
          "relative"
        )}
      >
        <Image
          src={chatIcon}
          alt="chat icon"
          className="absolute top-1/2 -translate-y-1/2 -left-2"
          width={18}
          height={18}
        />
        {message.username}
      </p>
      <p
        className={cn(
          "p-2 pt-1",
          "text-[#804306]",
          "text-[14px] leading-[15px]",
          "font-made-tommy font-medium",
          "[text-shadow:0px_1px_0px_rgba(0,42,84,0.10)]"
        )}
      >
        {message.message}
      </p>
    </div>
  );
};

const ChatContainer: React.FC = () => {
  const messages: ChatMessage[] = [
    {
      username: "lecoconut",
      message: "writes something smart that takes two lines",
    },
    {
      username: "lecoconut",
      message: "writes something smart that takes two lines",
    },
  ];

  return (
    <div
      className={cn(
        "grid gap-4 p-3 pt-5",
        "max-h-32 h-full overflow-auto",
        "rounded-[15px]",
        "border border-[#A96415]",
        "bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1]",
        "shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] overflow-y-hidden"
      )}
    >
      {messages.map((message, index) => (
        <ChatCard key={index} message={message} />
      ))}
    </div>
  );
};

export default function Chat() {
  const { isChatOpen, setIsChatOpen } = useApp();
  return (
    <div
      className={cn(
        "relative p-1",
        "flex justify-center w-[265px]",
        "rounded-[20px]",
        "border-2 border-[#FAC485]",
        "bg-gradient-to-b from-[#FAC485] to-[#8B4B4F]",
        "bg-cover bg-center bg-no-repeat h-[80px]",
        "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]"
      )}
      style={{ backgroundImage: `url(${woodTexture.src})` }}
    >
      <Image
        src={chatBottom}
        alt="chat bottom"
        className="absolute -bottom-4.5 left-1"
      />
      <ChatContainer />
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="px-2 w-[94px] absolute left-19.5 -bottom-2 flex items-center gap-x-1"
      >
        <MsgIcon className="w-[13px] h-[10px]" width={13} height={10} />
        <p className="whitespace-nowrap">Open Chat</p>
      </Button>
    </div>
  );
}
