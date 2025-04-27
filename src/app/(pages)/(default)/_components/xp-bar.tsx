import { BoxIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

interface XpBarProps {
  currentXp: number;
  maxXp: number;
  className?: string;
}

const XpLabel: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      "bg-yellow-2 text-golden-darker font-bold",
      "aspect-square p-2",
      className
    )}
  >
    XP
  </div>
);

const XpProgress: React.FC<{ currentXp: number; maxXp: number }> = ({ currentXp, maxXp }) => {
  const percentage = (currentXp / maxXp) * 100;
  
  return (
    <div className="flex-1 flex items-center gap-4">
      <span className="text-[15px] font-bold text-golden-darker">
        {currentXp} / {maxXp}
      </span>
      <div
        className={cn(
          "flex-1 rounded-4xl h-3",
          "bg-gradient-to-b from-[#655364] to-[#978396] shadow-[0_2px_0_0_#00000033]"
        )}
      >
        <div
          className={cn(
            "h-full rounded-l-4xl",
            "bg-gradient-to-b from-[#FFC920] to-[#EFB500]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const BoxButton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      "aspect-square h-full flex items-center justify-center",
      "bg-red text-yellow-2",
      className
    )}
  >
    <BoxIcon className="size-full p-1" />
  </div>
);

export default function XpBar({ currentXp, maxXp, className }: XpBarProps) {
  return (
    <div className={cn(
      "flex items-center gap-3",
      "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
      "bg-white/20 backdrop-blur-[12.5px]",
      className
    )}>
      <XpLabel />
      <XpProgress currentXp={currentXp} maxXp={maxXp} />
      <BoxButton />
    </div>
  );
}