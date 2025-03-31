import { TimerIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";
import SpinnerBox from "../spinner/box";

export function Step2Top() {
  return (
    <>
      <h2
        className={cn(
          "text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
          "text-2xl text-center font-bumper-sticker"
        )}
      >
        <small>Koko</small>
        <br />
        <span>Spinner</span>
      </h2>
      <div className="flex-1">
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
          <span>04:59</span>
        </p>
        <p className="">
          <span>surprise! grab your free spin now!</span>
          <br />
          <small className="text-white">
            Rewards won apply for new users only.
          </small>
        </p>
      </div>
    </>
  );
}
