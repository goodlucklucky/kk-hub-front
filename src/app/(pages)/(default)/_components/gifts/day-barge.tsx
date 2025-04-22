import React from "react";

import { TickIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";

import claimCheck from "@/app/_assets/images/claim-check.png";
import claim from "@/app/_assets/images/claim.png";
import Image from "next/image";

export default function DayBarge({ checked }: { checked?: boolean }) {
  return (
    <div className="flex justify-between w-full">
      <div className="relative select-none">
        <Image src={checked ? claimCheck : claim} alt="claim-check" />
        <div className="absolute top-[3px] left-[5px] w-full h-full">
          <div
            className={cn(
              "text-[#E3BEAA] bg-[#E3BEAA]",
              "h-fit w-3 aspect-square rounded-sm",
              "z-10 -mr-2 flex items-center justify-center cursor-pointer"
            )}
          >
            {checked && <TickIcon className="size-full p-0.5" />}
          </div>
          <span className="text-[#E3BEAA] text-[17px] font-normal absolute bottom-1 right-2.5">Day 4</span>
        </div>
      </div>
    </div>
  );
}
