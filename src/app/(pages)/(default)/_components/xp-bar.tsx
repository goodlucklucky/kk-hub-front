import React from "react";
import { useRouter } from "next/navigation";

import { BoxIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";

import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";

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

const LeftBack: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={cn(
        "border border-[#B1B5CC] bg-[#B1B5CC] backdrop-blur-[12.5px]",
        "aspect-square p-2 h-10",
        "flex items-center justify-center",
        "cursor-pointer",
        className
      )}
    >
      <CustomRightArrow className="w-[14px] h-[21px] rotate-180"/>
    </div>
  );
};

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

export const XpBar = ({ currentXp, maxXp, className }: XpBarProps) => {
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

export const NavBar = ({className, title}: {className?: string, title: string}) => {
  return (
    <div className={cn(
      "flex items-center gap-3",
      "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
      "bg-[rgba(0,0,0,0.20)] backdrop-blur-[12.5px] z-10",
      className
    )}>
      <LeftBack />
      <span className="text-[#ECEFFF] text-2xl font-normal leading-normal font-bumper-sticker [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
        {title}
      </span>
    </div>
  );
}
