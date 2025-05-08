"use client"

import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";

interface PreviousResultsProps {
  leftColor: string;
  rightColor: string;
}

export default function PreviousResults({ leftColor, rightColor }: PreviousResultsProps) {
  return (
    <div className="flex justify-around gap-1">
      <div className="p-2 px-4 w-[155px] rounded-full bg-[#91737754] flex text-[14px] text-[#653F56] font-made-tommy font-semibold items-center justify-between">
        Previous Results
        <CustomRightArrow color={leftColor} />
      </div>
      <div className="p-2 px-4 w-[155px] rounded-full bg-[#A2BAA6] flex text-[14px] text-[#126529] font-made-tommy font-semibold items-center justify-between">
        Check Prize
        <CustomRightArrow color={rightColor} />
      </div>
    </div>
  );
} 