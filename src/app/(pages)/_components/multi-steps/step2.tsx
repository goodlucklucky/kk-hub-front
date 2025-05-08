import { TimerIcon } from "@assets/svg/etc";
import React from "react";
import SpinnerBox from "../spinner/box";
import PageTitleBanner from "@/app/_components/shared/page-title-banner";

export function Step2Top() {
  return (
    <div>
      <PageTitleBanner
        className={`relative top-6 mx-auto -mt-6`}
        titleBanner={
          <p className="text-center text-2xl leading-5">
            KOKO
            <br />
            spinner
          </p>
        }
        spinner
      />
      <SpinnerBox />
    </div>
  );
}

export function Step2Bottom() {
  return (
    <>
      <div className="bg-black/60 rounded-t-2xl pt-2 px-4 2xs:p-4 2xs:px-8 text-green-light font-bumper-sticker">
        <p className="flex gap-2 items-center w-fit 2xs:pb-2 2xs:mb-2 border-b-2 border-b-current/40">
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
