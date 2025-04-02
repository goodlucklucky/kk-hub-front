import { BoxIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function XpBar() {
  return (
    <div className="flex items-center bg-white/20 gap-3 shadow-sm">
      <div
        className={cn(
          "bg-yellow-2 text-golden-darker font-bold",
          "aspect-square p-2"
        )}
      >
        XP
      </div>
      <div className="flex-1 flex items-center gap-4">
        <span>745 / 3250</span>
        <div
          className={cn(
            "flex-1 rounded-4xl h-4",
            "bg-gradient-to-b from-gray-600 to-gray-400"
          )}
        ></div>
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
