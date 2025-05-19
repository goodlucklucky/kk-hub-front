"use client";

import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { formatNumber } from "@/app/_utils/number";

interface TournamentItemProps {
  title: string;
  message: string;
  bgColor: string;
  messageBgColor: string;
  messageTextColor?: string;
  score: number;
}

export default function TournamentItem({
  title,
  message,
  bgColor,
  messageBgColor,
  messageTextColor = "#745061",
  score,
}: TournamentItemProps) {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <div
        className={`rounded-t-[6px] w-full flex items-center justify-between text-white text-[14px] font-made-tommy font-semibold px-3 py-2`}
        style={{ backgroundColor: bgColor }}
      >
        {title}
        <div className="flex items-center gap-5">
          <span
            className={` bg-white/50 text-[14px] px-1.5 font-made-tommy text-lg rounded-lg`}
            style={{ color: bgColor }}
          >
            {score === 0 ? "No Score" : `${formatNumber(score)}  PTS`}
          </span>
          <CustomRightArrow color="white" width={20} height={14} />
        </div>
      </div>
      <div
        className={`w-full rounded-b-[6px] bg-[${messageBgColor}] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[${messageTextColor}] text-[12px] font-made-tommy font-semibold px-3 py-1`}
      >
        {message}
      </div>
    </div>
  );
}
