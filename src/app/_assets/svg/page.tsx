'use client';

import React from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { NavBar } from "../(default)/_components/xp-bar";
import Chat from "../(default)/_components/chat";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons

//import images
import statsBack from '@assets/images/stats-back.png';
import statsIcon from '@assets/images/stats-icon.png';
import statsPanel from '@assets/images/stats-panel.png';
import Header from "../(default)/_components/layout/header";
import Button from "@/app/_components/shared/button";
import { StatsWalletIcon } from "@/app/_assets/svg/stats-wallet";
import EarningsSection from "../(default)/_components/profile/earnings-section";
import { DollarIcon, DollarScoreIcon } from "@/app/_assets/svg/dollar";
import { TopArrow } from "@/app/_assets/svg/top-arrow";
import { StarStatsIcon } from "@/app/_assets/svg/star";

export default function StatsPage() {

  return (
    <div className={cn("min-h-dvh flex flex-col")}>
      <Header />
      <main className="grow flex flex-col">
        <NavBar title="Snake Home" className="bg-[#9981ae]" />
        <div className={cn("flex flex-col flex-1 h-full items-center gap-y-5")}>
          <Image
            src={statsBack}
            alt="Main background"
            className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
            loading='lazy'
            priority={false}
          />
          <div className="flex gap-2 mt-4 absolute top-8 left-5">
            <Chat />
          </div>
          <Image
            src={statsIcon}
            alt="Stats icon"
            className="absolute top-26 right-0"
            loading='lazy'
            priority={false}
          />
          <div className={cn("rounded-2xl flex-1 relative h-full w-full flex items-center justify-center", "mx-auto")} >
            <div className="relative top-4">
              <Image
                src={statsPanel}
                alt="Stats panel"
                className="w-[370px] h-[584px] z-20"
                loading='lazy'
              />
              <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-1">
                <div className="w-full h-9 flex items-center justify-center">
                  <div className="text-[#491F36] [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px]/[25px] font-normal tracking-[0.56px] lowercase z-20 pt-1.5">
                    STATS
                  </div>
                </div>
                <div className="w-full flex-1 p-2.5 px-4.5 pb-4.5 flex flex-col gap-y-1">
                  <div className="w-full bg-[#EED1B8] rounded-t-[22px] rounded-b-[10px] flex flex-col gap-y-1 p-1.5 pb-2">
                    <div className="text-[#745061] text-center font-made-tommy text-xs font-bold leading-normal tracking-[0.12px]">Top up your wallet...</div>
                    <Button className="w-full rounded-[6px] border border-[#A291FF] bg-gradient-to-b from-[#A291FF] to-[#856FFF] text-white text-center font-made-tommy text-xs font-bold leading-normal tracking-[0.12px] p-0 flex items-center justify-center gap-x-2">
                      <StatsWalletIcon />
                      <div className="text-[#EFF6FF] text-center [text-shadow:0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.36px]">Wallet</div>
                    </Button>
                  </div>
                  <div className={"w-full justify-between bg-[#EED1B8] rounded-full flex items-center gap-2 px-2.5 py-2"}>
                    <div className="flex gap-2 items-center">
                      <DollarScoreIcon />
                      <span className="text-[#5F3F57] font-bold font-made-tommy text-[16px]/[28px]">
                        All Time Earnings
                      </span>
                    </div>
                    <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[25px] flex items-center justify-end px-1 gap-1">
                      <DollarIcon />
                      <span className="text-[#FFE4D4] font-made-tommy text-[18px] leading-[28px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
                        235.50
                      </span>
                    </div>
                  </div>
                  <div className="w-full justify-between bg-[#EED1B8] rounded-[22px] flex flex-col items-center gap-1 px-2.5 py-2">
                    <div className="flex gap-2 items-center w-full">
                      <TopArrow />
                      <span className="text-[#5F3F57] font-bold font-made-tommy text-[16px]/[28px]">
                        Scores
                      </span>
                    </div>
                    <div className="flex gap-2 items-center w-full">
                      <div className="flex items-center justify-between w-full bg-[#E3BEAA] rounded-[5px]">
                        <div className="text-[#745061] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] p-1 px-2 pl-3">
                          Game Played
                        </div>
                        <div className="rounded-r-[5px] bg-[#917377] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] p-2 text-[#FFE4D4] font-made-tommy text-[14px] font-bold tracking-[0.36px]">111</div>
                      </div>
                      <div className="flex items-center justify-between w-full bg-[#E3BEAA] rounded-[5px]">
                        <div className="text-[#745061] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] p-1 px-2 pl-3">
                          Your ATH
                        </div>
                        <div className="rounded-r-[5px] bg-[#917377] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] p-2 text-[#FFE4D4] font-made-tommy text-[14px] font-bold tracking-[0.36px]">99 pts</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-[#EED1B8] rounded-[22px] flex flex-col items-center gap-1 px-2.5 py-2 flex-1">
                    <div className="flex gap-2 items-center w-full">
                      <StarStatsIcon />
                      <span className="text-[#5F3F57] font-bold font-made-tommy text-[16px]/[28px]">
                        Your Current Scores
                      </span>
                    </div>
                    <div className="w-full rounded-[14px] border border-[#F7D8B7] bg-[#DDC2A7] bg-gradient-to-b from-[rgba(95,63,87,0.20)] to-[rgba(95,63,87,0.00)] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] flex p-1 gap-1">
                      <div className="rounded-[9px] border border-[#D1AB8D] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(252,234,208,0.50)_0%,rgba(252,234,208,0.50)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] w-full">
                        sdfsd
                      </div>
                      <div className="rounded-[9px] border border-[#D1AB8D] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(252,234,208,0.50)_0%,rgba(252,234,208,0.50)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] w-full">
                        sdfsd
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
