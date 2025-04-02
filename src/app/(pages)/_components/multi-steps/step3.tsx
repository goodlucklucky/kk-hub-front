import { BackHandIcon, KeyIcon, PlayIcon, UsdIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";
import poweredAvalanche from "@assets/images/powered-avalanche.png";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/_components/shared/button";

export function Step3Top() {
  return (
    <>
      <h2
        className={cn(
          "text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
          "mb-8 text-2xl text-center font-bumper-sticker"
        )}
      >
        <small>TENS OF GAMES</small>
        <br />
        <span>MILLIONS IN PRIZES</span>
      </h2>
      <div className="text-golden-bright px-8 relative font-bold">
        <h3 className="text-center">Live Overview</h3>
        <div className="bg-light w-full rounded-b-2xl rounded-t p-0.5 contain-content">
          <div className="w-full rounded-b-2xl rounded-t-sm contain-content text-center bg-golden-bright text-golden-dark">
            <div className="bg-golden-dark/15 py-3">
              <p className="flex gap-2 items-center justify-center text-lg font-bold">
                <UsdIcon className="size-6" />
                <span>101,039.03</span>
              </p>
              <p className="font-semibold">Total Prizes</p>
            </div>
            <div className="py-3">
              <p className="flex gap-2 items-center justify-center text-lg font-bold">
                <PlayIcon className="size-5" />
                <span>757,493</span>
              </p>
              <p className="font-semibold">Games Played</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Step3Bottom() {
  return (
    <>
      <Image
        src={poweredAvalanche}
        alt="Powered by Avalanche"
        className="mx-auto w-1/3"
      />
      <p
        className={cn(
          "m-4 mt-auto mx-8 text-green-light bg-black/60 rounded-2xl p-2 px-4",
          "flex gap-4 items-center font-bumper-sticker"
        )}
      >
        <BackHandIcon className="size-14" />
        <span>Return to THE Wheel and Spin for a free gift!</span>
      </p>
      <Link href={"/home"} className="mx-8 mb-8">
        <Button
          className={cn(
            "flex gap-2 items-center justify-center rounded-2xl font-bold w-full p-2"
          )}
        >
          <KeyIcon />
          <span className="drop-shadow-md">Enter Now</span>
        </Button>
      </Link>
    </>
  );
}
