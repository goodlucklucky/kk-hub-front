import { cn } from "@/app/_lib/utils";
import React from "react";
import { DailyBarge, GiftBarge } from "./barge";
import DayBarge from "./day-barge";

export default function Gifts() {
  return (
    <div className="flex items-center mt-2 gap-3 p-2 pl-0">
      <GiftBarge />
      <div
        className={cn(
          "flex-1 flex rounded-2xl",
          "bg-green-2 shadow-sm",
          "font-bumper-sticker"
        )}
      >
        <div className="flex-1">
          <div
            className={cn(
              "flex gap-2 rounded-md w-fit pl-2",
              "-mt-1 -ml-1 ",
              "bg-golden-brown shadow-[0_0.25ch_rgba(0,0,0,0.2)]"
            )}
          >
            <p className="pt-0.5">daily claim</p>
            <DailyBarge>
              <span>4/28</span>
            </DailyBarge>
            <DailyBarge>
              <span>23:39:01</span>
            </DailyBarge>
          </div>
          <div className={cn("px-1 py-2 text-green-dark", "flex gap-2")}>
            <DayBarge checked />
            <DayBarge />
            <DayBarge />
          </div>
        </div>
        <button
          className={cn(
            "font-made-tommy flex items-center justify-center",
            "bg-green-dark/40 px-2"
          )}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
