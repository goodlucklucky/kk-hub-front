import { BoxIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

interface XpBarProps {
  currentXp: number;
  maxXp: number;
  className?: string;
}

const XpBar: React.FC<XpBarProps> = ({ currentXp, maxXp, className }) => {
  const percentage = (currentXp / maxXp) * 100;

  return (
    <div className={cn(
      "bg-[#F5D6B1] rounded-2xl p-3 shadow-md border-2 border-[#A96415]",
      "flex items-center gap-3",
      className
    )}>
      <div className={cn(
        "bg-[#653F56] text-[#E3BEAA]",
        "aspect-square p-2 rounded-lg",
        "flex items-center justify-center",
        "font-made-tommy text-[15px] font-bold"
      )}>
        XP
      </div>
      
      <div className="flex-1 flex items-center gap-4">
        <span className="text-[15px] font-made-tommy font-bold text-[#745061]">
          {currentXp} / {maxXp}
        </span>
        <div className={cn(
          "flex-1 rounded-4xl h-3",
          "bg-[#E3BEAA] border-2 border-[#91737733]"
        )}>
          <div
            className={cn(
              "h-full rounded-l-4xl",
              "bg-[#653F56]"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className={cn(
        "aspect-square h-full",
        "bg-[#653F56] text-[#E3BEAA]",
        "flex items-center justify-center rounded-lg",
        "border-2 border-[#91737733]"
      )}>
        <BoxIcon className="size-full p-1" />
      </div>
    </div>
  );
};

export default XpBar;
