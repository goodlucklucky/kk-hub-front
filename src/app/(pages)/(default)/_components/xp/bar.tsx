import React from "react";

import { cn } from "@/app/_lib/utils";

import Image from "next/image";
import headerBack from "@assets/images/header-back.png";

interface XpBarProps {
  currentXp: number;
  maxXp: number;
  className?: string;
}

const XpLabel: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      "bg-[#7A6879] text-[#D9CED9] font-made-tommy text-base font-extrabold",
      "aspect-square px-1 leading-[32px]",
      "[text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]",
      className
    )}
  >
    XP
  </div>
);

const XpProgress: React.FC<{ currentXp: number; maxXp: number }> = ({
  currentXp,
  maxXp,
}) => {
  const percentage = (currentXp / maxXp) * 100;

  return (
    <div className="flex-1 flex items-center gap-4 pr-16">
      <span className="text-[15px] font-bold text-[#5F3F57] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
        {currentXp} <span className="text-[#5F3F5740]"> / </span> {maxXp}
      </span>
      <div
        className={cn(
          "flex-1 rounded-4xl h-3 overflow-hidden",
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

export const XpBar = ({ currentXp, maxXp, className }: XpBarProps) => {
  return (
    <div
      className={cn(
        "relative shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
        className
      )}
    >
      <Image
        src={headerBack}
        alt="header-back"
        width={75}
        height={50}
        className="absolute size-full inset-0 !-z-[1]"
      />
      <div
        className={cn(
          "flex items-center gap-3",
          "bg-black/[7%] backdrop-blur-[12.5px] z-1"
        )}
      >
        <XpLabel />
        <XpProgress currentXp={currentXp} maxXp={maxXp} />
      </div>
    </div>
  );
};

