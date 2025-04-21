import { cn } from "@/app/_lib/utils";
import React from "react";
import { DailyBarge, GiftBarge } from "./barge";
import DayBarge from "./day-barge";

import { RightArrow2 } from "@/app/_assets/svg/right-arrow";

export default function Gifts({ isOpen, setIsOpen, setIsMinting }: { isOpen: boolean, setIsOpen: () => void, setIsMinting: (isMinting: boolean) => void }) {
  return (
    <div className="flex items-center justify-center gap-3 pl-0 w-[330px]">
      {/* <GiftBarge /> */}
      <div
        className={cn(
          "flex-1 flex",
          "rounded-b-[20px]",
          "bg-[url('/images/claim-back.png')] w-[330px] bg-cover bg-no-repeat bg-center",
          "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
          "font-bumper-sticker",
          "h-[85px] w-full px-2"
        )}
      >
        <div
          className={cn(
            "flex-1 flex",
            "rounded-b-[15px]",
            "border border-[#A96415]",
            "bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1]",
            "shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)]",
            "font-bumper-sticker",
            "h-[75px] w-full",
            "flex justify-center items-center px-3 pt-1.5"
          )}>
          <div className="flex-1 h-[57px] bg-[#CDAA98] rounded-l-[7px]">
            <div
              className={cn(
                "flex gap-2 rounded-md w-fit pl-2",
                "-mt-1 -ml-1 ",
                "bg-[#653F56] shadow-[0_0.25ch_rgba(0,0,0,0.2)]",
                "text-[#E3BEAA]"
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
          <RightArrow2 className="h-[57px] w-fit" fill="#E3BEAA" onClick={() => { setIsOpen(); setIsMinting(true); }} />
        </div>
      </div>
    </div>
  );
}
