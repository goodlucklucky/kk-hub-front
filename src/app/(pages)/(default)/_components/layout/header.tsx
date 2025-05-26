"use client";

//import modules
import React from "react";
import Image from "next/image";
import { useApp } from "@/app/_contexts/appContext";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import { SnakeItalicIcon } from "@/app/_assets/svg/snake";
import headerBack from "@assets/images/header-back.png";
import kokoLog from "@/app/_assets/images/koko-logo.png";
// import { KIcon } from "@/app/_assets/svg/etc";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { useThirdweb } from "../../_context/thirdwebContext";
import { formatNumber } from "@/app/_utils/number";

export default function Header() {
  const {
    balance: { total },
  } = useThirdweb();
  const { isBankingOpen, setIsBankingOpen, isProfileOpen, setIsProfileOpen } =
    useApp();
  return (
    <header className={cn("[&>*]:z-0 relative")}>
      <Image
        src={headerBack}
        alt="header-back"
        width={75}
        height={75}
        className="absolute size-full inset-0 !-z-[1]"
      />
      <div className=" flex justify-between items-center gap-4 z-10">
        <div
          className={cn(
            "flex rounded-lg text-lg ml-2",
            "bg-yellow-2 text-golden-darker font-bold text",
            "[&>div:not(:has(svg))]:drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)] [&>div:not(:has(svg))]:shadow-[0_0.2ch] [&>div:not(:has(svg))]:shadow-black/20"
          )}
          onClick={() => setIsBankingOpen(!isBankingOpen)}
        >
          <div className="flex items-center gap-2 px-2 py-2">
            <SnakeItalicIcon className="size-7" />
            <p>
              {formatNumber(total || 0, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </p>
            <RightArrow
              className="size-[13px]"
              color="#CCA11A"
              shadow={false}
            />
          </div>
        </div>
        <div
          // href={"/profile"}
          className={cn("flex flex-col", "relative w-14 h-[75px]")}
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <Image
            src={kokoLog}
            alt="koko-logo"
            width={54}
            height={72}
            className="absolute w-[54px] h-[72px] top-0 right-0 inset-0 object-cover object-center rounded-b-md"
          />
          <span className="px-1.5 text-[10px] font-bold text-yellow-2 absolute bottom-1 right-0 ">
            LVL 100
          </span>
        </div>
      </div>
    </header>
  );
}
