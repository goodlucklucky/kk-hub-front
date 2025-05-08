'use client';

import React from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { NavBar } from "../(default)/_components/xp-bar";
import Chat from "../(default)/_components/chat";
import PreviousResults from "../(default)/_components/profile/previous-results";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons

//import images
import statsBack from '@assets/images/stats-back.png';
import statsIcon from '@assets/images/stats-icon.png';
import Cup from '@assets/images/cup1.png';
import Tour1 from '@assets/images/tour-1.png';
import Tour2 from '@assets/images/tour-2.png';
import Tour3 from '@assets/images/tour-3.png';

import Header from "../(default)/_components/layout/header";
import { SunIcon } from "@/app/_assets/svg/sun";
import { CalendarIcon } from "@/app/_assets/svg/calendar";
import { LightningIcon } from "@/app/_assets/svg/lightning";
import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { LeafIcon } from "@/app/_assets/svg/leaf";
import { MarkPanelIcon } from "@/app/_assets/svg/mark-panel";
import Button from "@/app/_components/shared/button";

export default function StatsPage() {

  return (
    <div className={cn("min-h-dvh flex flex-col")}>
      <Header />
      <main className="grow flex flex-col">
        <NavBar title="Snake Tournaments" className="bg-[#9981ae]" />
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
          {/* <div className="bg-[url(/images/tournament-panel.png)] flex flex-col gap-1.5 bg-cover bg-center bg-no-repeat relative top-20 w-[370px] h-[630px] z-50 rounded-3xl mx-auto p-4 pt-5">
            <div className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-extrabold leading-normal tracking-[0.22px]">Tournaments</div>
            <div className="w-full flex rounded-[22px] border border-[#F7D8B7] bg-[#DDC2A7] bg-[linear-gradient(180deg,rgba(95,63,87,0.20)_-577.52%,rgba(95,63,87,0.00)_248.61%)] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] p-1 py-[5px]">
              <div className="w-full flex justify-center items-center gap-1">
                <LightningIcon />
                <span className="rounded-[12px] bg-[rgba(73,31,54,0.70)] text-[#D7BCA3] font-made-tommy text-[10px] font-bold tracking-[0.07px] leading-normal px-1 py-[1px]">
                  coming soon
                </span>
              </div>
              <div className="rounded-full border border-[#D1AB8D] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(252,234,208,0.50)_0%,rgba(252,234,208,0.50)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] w-full flex justify-center items-center gap-1 py-0.5">
                <SunIcon />
                <span className="text-[#5F3F57] text-center font-made-tommy text-[18px] font-bold leading-normal">Daily</span>
              </div>
              <div className="w-full flex justify-center items-center gap-1">
                <CalendarIcon />
                <span className="rounded-[12px] bg-[rgba(73,31,54,0.70)] text-[#D7BCA3] font-made-tommy text-[10px] font-bold tracking-[0.07px] leading-normal px-1 py-[1px]">
                  coming soon
                </span>
              </div>
            </div>
            <div className="p-2 px-4 rounded-full bg-[#EED1B8] flex text-[14px] text-[#745061] font-made-tommy font-semibold items-center justify-between w-full">
              Previous Results
              <CustomRightArrow color={'#745061'} />
            </div>
            <div className="flex-1 flex flex-col overflow-auto rounded-[13px] bg-[#653F5654] w-full p-2 gap-y-1.5">
              <div className="rounded-[14px] bg-[#EED1B8] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] flex flex-col gap-1.5 p-2">
                <div className="flex justify-between gap-1.5">
                  <div className="rounded-[6px] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(233,140,0,0.40)_0%,rgba(233,140,0,0.40)_100%)] flex-1 flex justify-start items-center px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold"> Free Entry Tournament
                    </span>
                  </div>
                  <div className="rounded-[6px] bg-[#7FCA72] flex items-center gap-1 p-1 px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      Play
                    </span>
                    <CustomRightArrow color={'#745061'} />
                  </div>
                </div>
                <div className="flex justify-between gap-1.5 p-2 rounded-[6px] bg-[#E3BEAA]">
                  <div className="flex items-center gap-1 border-r-2 border-r-[#74506140] pl-1 pr-4">
                    <Image src={Cup} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">1st Place Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">$1</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-1 pl-1">
                    <Image src={Tour1} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">Your Current Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">Not Yet Entered</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[14px] bg-[#EED1B8] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] flex flex-col gap-1.5 p-2">
                <div className="flex justify-between gap-1.5">
                  <div className="rounded-[6px] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(217,0,0,0.24)_0%,rgba(217,0,0,0.24)_100%)] flex-1 flex justify-start items-center px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      $0.25 Entry Tournament
                    </span>
                  </div>
                  <div className="rounded-[6px] bg-[#7FCA72] flex items-center gap-1 p-1 px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      Play
                    </span>
                    <CustomRightArrow color={'#745061'} />
                  </div>
                </div>
                <div className="flex justify-between gap-1.5 p-2 rounded-[6px] bg-[#E3BEAA]">
                  <div className="flex items-center gap-1 border-r-2 border-r-[#74506140] pl-1 pr-4">
                    <Image src={Cup} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">1st Place Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">$5</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-1 pl-1">
                    <Image src={Tour3} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">Your Current Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[10px] font-extrabold leading-normal tracking-[0.12px]">Improve Score to Quality</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[14px] bg-[#EED1B8] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] flex flex-col gap-1.5 p-2">
                <div className="flex justify-between gap-1.5">
                  <div className="rounded-[6px] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(130,0,233,0.24)_0%,rgba(130,0,233,0.24)_100%)] flex-1 flex justify-start items-center px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      $0.50 Entry Tournament
                    </span>
                  </div>
                  <div className="rounded-[6px] bg-[#7FCA72] flex items-center gap-1 p-1 px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      Play
                    </span>
                    <CustomRightArrow color={'#745061'} />
                  </div>
                </div>
                <div className="flex justify-between gap-1.5 p-2 rounded-[6px] bg-[#E3BEAA]">
                  <div className="flex items-center gap-1 border-r-2 border-r-[#74506140] pl-1 pr-4">
                    <Image src={Cup} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">1st Place Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">$7.50</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-1 pl-1">
                    <Image src={Tour2} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">Your Current Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">50K</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[14px] bg-[#EED1B8] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] flex flex-col gap-1.5 p-2">
                <div className="flex justify-between gap-1.5">
                  <div className="rounded-[6px] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(0,148,255,0.24)_0%,rgba(0,148,255,0.24)_100%)] flex-1 flex justify-start items-center px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold"> $1 Entry Tournament
                    </span>
                  </div>
                  <div className="rounded-[6px] bg-[#7FCA72] flex items-center gap-1 p-1 px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      Play
                    </span>
                    <CustomRightArrow color={'#745061'} />
                  </div>
                </div>
                <div className="flex justify-between gap-1.5 p-2 rounded-[6px] bg-[#E3BEAA]">
                  <div className="flex items-center gap-1 border-r-2 border-r-[#74506140] pl-1 pr-4">
                    <Image src={Cup} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">1st Place Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">$10</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-1 pl-1">
                    <Image src={Tour2} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">Your Current Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">30.5K</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-[14px] bg-[#EED1B8] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] flex flex-col gap-1.5 p-2">
                <div className="flex justify-between gap-1.5">
                  <div className="rounded-[6px] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(0,222,9,0.24)_0%,rgba(0,222,9,0.24)_100%)] flex-1 flex justify-start items-center px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold"> Free Entry Tournament
                    </span>
                  </div>
                  <div className="rounded-[6px] bg-[#7FCA72] flex items-center gap-1 p-1 px-4">
                    <span className="text-[#5F3F57] font-made-tommy text-[14px] font-bold">
                      Play
                    </span>
                    <CustomRightArrow color={'#745061'} />
                  </div>
                </div>
                <div className="flex justify-between gap-1.5 p-2 rounded-[6px] bg-[#E3BEAA]">
                  <div className="flex items-center gap-1 border-r-2 border-r-[#74506140] pl-1 pr-4">
                    <Image src={Cup} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">1st Place Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">$1</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-1 pl-1">
                    <Image src={Tour1} alt="Cup" />
                    <div className="flex flex-col justify-between">
                      <span className="text-[#745061] font-made-tommy text-[10px] font-bold leading-normal tracking-[0.1px]">Your Current Prize</span>
                      <span className="text-[#745061] font-made-tommy text-[12px] font-extrabold leading-normal tracking-[0.12px]">Not Yet Entered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[8px_8px_22px_22px] bg-[#A970B5] w-full flex justify-center py-1.5">
              <span className="text-white font-made-tommy text-[12px] font-bold">🎁 Prizes distributed in 10h 30m 6s</span>
            </div>
          </div> */}
          <div className="bg-[url(/images/tournament-panel.png)] flex flex-col gap-1.5 bg-cover bg-center bg-no-repeat relative top-20 w-[370px] h-[630px] z-50 rounded-3xl mx-auto p-4 pt-5">
            <div className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-extrabold leading-normal tracking-[0.22px]">$0.25 Entry Tournament</div>
            <div className="relative flex justify-center items-center">
              <LeafIcon className="absolute -top-5" />
              <MarkPanelIcon className="absolute top-10" />
              <div className="flex w-full top-10 absolute justify-center">
                <span className="text-white text-center text-[26px] font-made-tommy font-extrabold tracking-[1.3px] uppercase [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)] pt-[7px]">
                  $1000.00
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-[80px] z-10">
              <div className="rounded-t-[22px] border-[3px] border-[#C6654E] bg-[#FFD384] bg-gradient-to-b from-[#FFD384] to-[#FFD384] ">
                sdfsdf
              </div>
              <div className="rounded-b-[22px] bg-[#5F3F57] p-2.5">
              </div>
            </div>
            <div className="flex rounded-[14px] bg-[#E3BEAA] p-2 gap-1.5">
              <div className="w-full flex flex-col">
                <div className="flex justify-center items-center p-1.5 rounded-[6px_0px_0px_0px] bg-[#906c74a6]">
                  <span className="text-[#5F3F57] text-[13px] font-bold font-made-tommy">Your Score</span>
                </div>
                <div className="flex justify-center items-center bg-[#D2AE9F] rounded-[0px_0px_0px_6px] py-1">
                  <span className="text-[#745061] text-[16px] font-bold font-made-tommy">25</span>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <div className="flex justify-center items-center p-1.5 rounded-[0px_6px_0px_0px] bg-[#906c74a6]">
                  <span className="text-[#5F3F57] text-[13px] font-bold font-made-tommy">Current Est Prize</span>
                </div>
                <div className="flex justify-center items-center bg-[#D2AE9F] rounded-[0px_0px_6px_0px] py-1">
                  <span className="text-[#745061] text-[16px] font-bold font-made-tommy">$100</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-[14px] bg-[#E3BEAA] p-2 gap-1.5">
              <div className="text-[#5F3F57] text-center font-made-tommy text-[16px] font-extrabold leading-normal tracking-[0.16px] w-full">
                Enter Today's Tournament
              </div>
              <div className="flex flex-col bg-[#D2AE9F] rounded-[14px] p-2 gap-1.5">
                <Button className="rounded-[6px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]">
                  <div className="text-[#EFF6FF] text-center font-made-tommy text-[18px]/[20px] font-extrabold tracking-[0.4px] [text-shadow:0px_1px_0px_rgba(62,36,105,0.20)]">
                    Play Now!
                  </div>
                </Button>
                <div className="text-[#745061] text-center font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px]">
                  $0.25 Entry Fee (Unlimited Attempts)
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </div >
  );
}

