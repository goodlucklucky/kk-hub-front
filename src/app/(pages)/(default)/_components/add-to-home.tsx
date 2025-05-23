//import modules
import React from "react";

//import utils
import { cn } from "@/app/_lib/utils";

export default function AddToHome() {
  return (
    <div
      className={cn(
        "rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] font-bumper-sticker flex-1",
        "relative h-[80px] border border-[#B1B5CC] flex items-center justify-stretch"
      )}
    >
      <div className="flex items-start justify-center text-[25px] text-[#FFF] text-center font-sans font-bold [text-shadow:1px_1px_0px_rgba(0,0,0,0.20)] w-[20px] h-full bg-[#A2A6BA] z-1 rounded-l-[20px]">+</div>
      <p className="bg-[#B1B5CC] flex flex-1 flex-col gap-y-1 px-2 h-full rounded-r-[20px] justify-center text-[#FFF] text-[16px]/[16px] [text-shadow:0px_2px_0px_rgba(0,0,0,0.20)] font-bumper-sticker font-normal">
        <span>Add to</span>
        <span>Home</span>
        <span>Screen</span>
      </p>
      <p className="absolute bg-[#ED4721] text-[#FFF] text-[12px] font-bold -top-3 -right-0 rounded-sm px-1 [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy">
        +10 XP
      </p>
    </div>
  );
}
