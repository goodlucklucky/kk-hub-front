import { TimerIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";
import SpinnerBox from "../spinner/box";
import headerBoard from "@assets/images/header-board.png"
import Image from "next/image";
export function Step2Top() {
  return (
    <>
      <section className="relative z-20">
        <Image src={headerBoard} alt="header-board" width={241} height={73} className="absolute -top-[9px] left-1/2 -translate-x-1/2 bg-contain bg-no-repeat bg-center" priority />
        <h2
          className={cn(
            "text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
            "text-xl text-center font-bumper-sticker leading-[1.1]"
          )}
        >
          <span className="tracking-wider font-[22px]">Koko</span>
          <br />
          <span className="tracking-wider font-[22px]">Spinner</span>
        </h2>
      </section>
      <div className="flex-1 -mt-2">
        <SpinnerBox />
      </div>
    </>
  );
}

export function Step2Bottom() {
  return (
    <>
      <div className="bg-black/60 rounded-t-2xl p-4 px-8 text-green-light font-bumper-sticker">
        <p className="flex gap-2 items-center w-fit pb-2 mb-2 border-b-2 border-b-current/40">
          <TimerIcon />
          <span className="font-bumper-sticker font-light text-[22px]">04:59</span>
        </p>
        <p className="">
          <span className="font-bumper-sticker font-light text-[18px]">surprise! grab your free spin now!</span>
          <br />
          <small className="text-white font-made-tommy font-light text-[14px]">
            Rewards won apply for new users only.
          </small>
        </p>
      </div>
    </>
  );
}
