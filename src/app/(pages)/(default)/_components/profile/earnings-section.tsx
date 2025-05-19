"use client";

import { DollarIcon, DollarScoreIcon } from "@/app/_assets/svg/dollar";
import { cn } from "@/app/_lib/utils";

interface EarningsSectionProps {
  amount: string;
  className?: string;
}

export default function EarningsSection({
  amount,
  className,
}: EarningsSectionProps) {
  return (
    <div
      className={cn(
        "w-full justify-between bg-[#EED1B8] rounded-[10px] flex items-center gap-2 px-3 py-2.5",
        className
      )}
    >
      <div className="flex gap-2 items-center">
        <DollarScoreIcon />
        <span className="text-[#5F3F57] font-bold font-made-tommy text-[16px]/[28px]">
          All Time Earnings
        </span>
      </div>
      <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1 gap-1">
        <DollarIcon />
        <span className="text-[#FFE4D4] font-made-tommy text-[18px] leading-[28px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
          {amount}
        </span>
      </div>
    </div>
  );
}
