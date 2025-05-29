import React from "react";

import { cn } from "@/app/_lib/utils";

import Image from "next/image";
import headerBack from "@assets/images/header-back.png";
import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { useParams, useRouter } from "next/navigation";

interface XpBarProps {
  currentXp: number;
  maxXp: number;
  className?: string;
  onClick?: () => void;
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

export const XpBar = ({ currentXp, maxXp, className, onClick }: XpBarProps) => {
  return (
    <div
      className={cn(
        "relative shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)] z-1",
        className
      )}
      onClick={onClick}
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


const LeftBack: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const { title } = useParams();

  return (
    <div
      onClick={() => router.push(`/game/${title}`)}
      className={cn(
        "border border-[#B1B5CC] bg-[#B1B5CC] backdrop-blur-[12.5px]",
        "aspect-square p-2 h-[32px] z-1",
        "flex items-center justify-center",
        "cursor-pointer",
        className
      )}
    >
      <CustomRightArrow className="w-[14px] h-[21px] rotate-180" />
    </div>
  );
};

export const BackHomeBar = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
        "!bg-[#67478080] backdrop-blur-[12.5px] z-1 h-[32px]",
        className
      )}
    >
      <LeftBack />
      <span className="text-[#ECEFFFA8] text-2xl font-normal leading-normal font-bumper-sticker [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
        BACK TO
      </span>
      <span className="text-[#ECEFFF] text-2xl font-normal leading-normal font-bumper-sticker [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
        HOME
      </span>
    </div>
  );
};