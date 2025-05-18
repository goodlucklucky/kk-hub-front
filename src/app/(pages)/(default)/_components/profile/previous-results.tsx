"use client"

import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";

interface PreviousResultsProps {
  leftColor: string;
  rightColor: string;
}

export default function PreviousResults({ leftColor, rightColor }: PreviousResultsProps) {
  return (
    <div className="flex justify-around gap-1 w-full px-2">
      <div className="p-1.5 px-3 flex-1 whitespace-nowrap rounded-full bg-[#91737754] flex text-[14px] text-[#653F56] font-made-tommy font-semibold items-center justify-between">
        Previous Results
        <CustomRightArrow color={leftColor} />
      </div>
      <div className="p-1.5 px-3 flex-1 whitespace-nowrap rounded-full bg-[#A2BAA6] flex text-[14px] text-[#126529] font-made-tommy font-semibold items-center justify-between">
        Check Prize
        <CustomRightArrow color={rightColor} />
      </div>
    </div>
  );
} 