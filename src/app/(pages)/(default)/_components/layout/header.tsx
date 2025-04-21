import { KIcon } from "@/app/_assets/svg/etc";
import { SnakeItalicIcon } from "@/app/_assets/svg/snake";
import { cn } from "@/app/_lib/utils";
import React from "react";

import headerBack from '@assets/images/header-back.png';
import Image from "next/image";

export default function Header() {
  return (
    <header
      className={cn(
        "flex justify-between items-center gap-4 h-[75px] px-4",
      )}
    >
      <div
        className={cn(
          "flex rounded-[10px] text-lg",
          "bg-yellow-2 text-golden-darker font-bold text",
          "[&>div]:drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)] shadow-[0_0.2ch] shadow-black/20",
        )}
      >
        <div className="flex items-center gap-2 p-2">
          <SnakeItalicIcon className="size-8" />
          <p>105.04</p>
        </div>
        <div className="w-px bg-golden-darker/20" />
        <div className="flex items-center gap-2 p-2">
          <KIcon className="size-8" />
          <p>93.44</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col rounded-b-md",
          "bg-gradient-to-b from-golden from-40% via-golden-darker via-50% to-golden-2",
          "relative w-13"
        )}
      >
        <div className={cn("-mx-0.5", "aspect-square rounded-full border")}>
          image
        </div>
        <span className="px-1.5 text-[10px] font-bold text-yellow-2 absolute bottom-0.5 shadow-[0_1px_0_0_#00000033]">LVL 100</span>
      </div>
      <Image src={headerBack} alt="header-back" height={75} className="absolute w-full inset-0 -z-8 h-[75px]" />
    </header>
  );
}
