import { DotIcon } from "@/app/_assets/svg/chat";
import Image from "next/image";
import startchat from "@assets/images/star-icon.png";

interface ChatItemProps {
  sender: string;
  message: string;
  time: string;
  isSender: boolean;
  replyTo?: string;
  replyMessage?: string;
}

export const ChatItem = ({
  sender,
  message,
  time,
  isSender,
  replyTo = "",
  replyMessage = "",
}: ChatItemProps) => {
  return isSender ? (
    <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
      <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
        <DotIcon />
      </div>
      <div className={`rounded-[10px_0px_10px_10px] border border-[#C5B3E6] bg-[#F0E6FF] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-2 pb-1 relative mt-2 ${replyTo != "" ? "pt-3.5" : ""}`}>
        <div className="text-[#653F56] text-[14px]/[14px] font-medium font-made-tommy">
          {message}
        </div>
        {replyTo != "" && (
          <div className="absolute -left-[1px] top-0 bg-[#653F56] rounded-r-[5px] text-[#F0E6FF] p-[1px] pl-1.5 flex gap-y-1">
            <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
              {replyTo}:
            </div>
            <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1 truncate w-[100px]">
              {replyMessage}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center gap-x-1 absolute -top-[13px] h-[13px] -left-[1px] bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 pt-[1px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
          {time}
        </div>
        <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] right-0 rounded-[3px] border border-[#AB7EEC] bg-[#BA96FF] font-bumper-sticker text-[12px]/[12px] font-medium px-1.5 py-[1px] pt-[2px] text-[#F0E6FF] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
          {sender}
          <Image
            src={startchat}
            alt="startchat"
            className="w-4 h-4 absolute -right-[10px]"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full flex justify-between items-center bg-[#EED1B8] rounded-[7px] py-2 px-2.5 gap-x-2">
      <div className={`rounded-[10px_0px_10px_10px] border border-[#804306] bg-[#F9CB88] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] flex-1 p-2 pb-1 relative mt-2 ${replyTo != "" ? "pt-3.5" : ""}`}>
        <div className="text-[#804306] text-[14px]/[15px] font-medium font-made-tommy">
          {message}
        </div>
        {replyTo != "" && (
          <div className="absolute -right-[1px] top-0 bg-[#653F56] rounded-l-[5px] text-[#FFD093] py-[1px] pl-1.5 flex gap-y-1">
            <div className="font-bumper-sticker text-[11px]/[12px] font-normal">
              {replyTo}:
            </div>
            <div className="font-made-tommy text-[12px]/[12px] font-medium pl-1 truncate w-[100px]">
              {replyMessage}
            </div>
          </div>
        )}
        <div className="flex justify-center items-center gap-x-1 absolute -top-[13px] h-[13px] -right-[1px] bg-[#97757AA8] font-made-tommy text-[10px]/[10px] font-medium rounded-t-[4px] px-2 pt-[1px] text-[#EED1B8] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
          {time}
        </div>
        <div className="flex justify-center items-center gap-x-1 absolute -top-[10px] left-0 rounded-[3px] border border-[#804306] bg-[#FFC920] font-bumper-sticker text-[12px]/[12px] font-medium pl-1.5 pr-0.5 py-[1px] h-[16px] text-[#804306] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
          {sender}
          <Image
            src={startchat}
            alt="startchat"
            className="w-4 h-4 absolute -left-[10px]"
          />
        </div>
      </div>
      <div className="w-11 h-11 flex justify-center items-center rounded-full bg-[#D1B69F] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.10)]">
        <DotIcon />
      </div>
    </div>
  );
};
