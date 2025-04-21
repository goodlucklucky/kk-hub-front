
//import modules
import React from "react";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import { PlusIcon } from "@/app/_assets/svg/plus";

export default function AddToHome() {
  return (
    <div
      className={cn(
        "bg-[#B1B5CC] rounded-tl-[20px] rounded-tr-[10px] rounded-br-[20px] rounded-bl-[20px] p-2.5 pr-6 font-bumper-sticker flex-1",
        "grid gap-1 relative h-30 border border-[#B1B5CC] backdrop-blur-[12.5px]"
      )}
    >
      <PlusIcon />
      <p className="flex flex-col gap-y-1 text-[#FFF] text-[18px]/[18px] [text-shadow:0px_2px_0px_rgba(0,0,0,0.20)] font-bumper-sticker font-normal">
        <span>Add to</span>
        <span>Home</span>
        <span>Screen</span>
      </p>
      <p className="absolute bg-[#ED4721] text-[#FFF] text-[12px] font-bold -top-1 -right-0 rounded-sm p-1 [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy">
        +10 XP
      </p>
    </div>
  );
}
