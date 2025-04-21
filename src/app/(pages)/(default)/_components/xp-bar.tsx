import { BoxIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function XpBar() {
  return (
    <div className={cn(
      "flex items-center bg-white gap-3",
      "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
      "bg-white/20",
      "backdrop-blur-[12.5px]"
    )}>
      <div
        className={cn(
          "bg-yellow-2 text-golden-darker font-bold",
          "aspect-square p-2"
        )}
      >
        XP
      </div>
      <div className="flex-1 flex items-center gap-4">
        <span className="text-[15px] font-bold text-golden-darker">745 / 3250</span>
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
            style={{ width: `${(745 / 3250) * 100}%` }}
          />
        </div>
      </div>
      <div
        className={cn(
          "aspect-square h-full flex items-center justify-center",
          "bg-red text-yellow-2"
        )}
      >
        <BoxIcon className="size-full p-1" />
      </div>
    </div>
  );
}
