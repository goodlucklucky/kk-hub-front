import { FireIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

export function GiftBarge() {
  return (
    <div
      className={cn(
        "flex gap-2 p-2 bg-red-light pr-3 rounded-r-2xl",
        "[&>div]:drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)]"
      )}
    >
      <FireIcon className="size-5" />
      <div>
        <p className="font-bumper-sticker leading-4 py-1">
          special
          <br />
          gift
        </p>
        <p className="text-xs font-bold">36:08:01</p>
      </div>
    </div>
  );
}

export function DailyBarge({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-purple rounded-md px-1 pt-0.5 h-fit -mt-1">
      {children}
    </div>
  );
}
