import { TickIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function DayBarge({ checked }: { checked?: boolean }) {
  return (
    <div className="flex">
      <div
        className={cn(
          "text-yellow-green bg-green-dark",
          "border-3 h-fit w-5 aspect-square rounded-lg",
          "z-10 -mr-2"
        )}
      >
        {checked && <TickIcon className="size-full p-0.5" />}
      </div>
      <div
        className={cn(
          "px-2 pl-2.5 bg-yellow-green",
          "rounded-lg rounded-tl-none"
        )}
      >
        Day 4
      </div>
    </div>
  );
}
