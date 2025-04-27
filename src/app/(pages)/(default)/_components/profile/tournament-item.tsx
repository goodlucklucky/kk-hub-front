"use client"

import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";

interface TournamentItemProps {
  title: string;
  message: string;
  bgColor: string;
  messageBgColor: string;
  messageTextColor?: string;
}

export default function TournamentItem({
  title,
  message,
  bgColor,
  messageBgColor,
  messageTextColor = "#745061"
}: TournamentItemProps) {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <div className={`rounded-t-[6px] ${bgColor} w-full flex items-center justify-between text-[#745061] text-[14px] font-made-tommy font-semibold px-3 py-2`}>
        {title}
        <CustomRightArrow color="#917377" />
      </div>
      <div className={`w-full rounded-b-[6px] ${messageBgColor} shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[${messageTextColor}] text-[12px] font-made-tommy font-semibold px-3 py-1`}>
        {message}
      </div>
    </div>
  );
} 