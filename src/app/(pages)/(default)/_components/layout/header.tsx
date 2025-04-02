import { KIcon } from "@/app/_assets/svg/etc";
import { SnakeItalicIcon } from "@/app/_assets/svg/snake";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function Header() {
  return (
    <header
      className={cn(
        "flex justify-between items-center gap-4 px-4",
        "bg-white/50"
      )}
    >
      <div
        className={cn(
          "flex rounded-xl text-lg",
          "bg-yellow-2 text-golden-darker font-bold text",
          "[&>div]:drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)] shadow-[0_0.2ch] shadow-black/20"
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
          "flex flex-col mb-2 rounded-b-md",
          "bg-gradient-to-b from-golden from-40% via-golden-darker via-50% to-golden-2"
        )}
      >
        <div className={cn("-mx-0.5", "aspect-square rounded-full border")}>
          image
        </div>
        <span className="px-1.5 pb-0.5 text-xs font-bold">LVL 100</span>
      </div>
    </header>
  );
}
