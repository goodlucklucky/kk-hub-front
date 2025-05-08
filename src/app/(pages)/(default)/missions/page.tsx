"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { NavBar } from "../_components/xp-bar";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons
import item from "@assets/svg/item-star.svg";
import itemClick from "@assets/svg/item-star-click.svg";
import starscore from "@assets/svg/star-score.svg";
import starscoreClick from "@assets/svg/star-score-click.svg";
//import images
import forestBack from "@assets/images/forest-back.png";
import mainBack from "@assets/images/main-back.png";
import pet from "@assets/images/pet1.png";
import star from "@assets/images/star-group.png";

import NavigationButton from "../_components/profile/navigateBtn";
import { ClockIcon } from "@/app/_assets/svg/clock";
import Button from "@/app/_components/shared/button";
import { StartIcon } from "@/app/_assets/svg/start";
import { MissionCheckIcon, MissionClickIcon, MissionLeftIcon, MissionRightIcon, MissionIcon } from "@/app/_assets/svg/mission-direct";

// Types
type MissionCategory = "daily" | "weekly";

// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavigationButton);

export default function MissionPage() {
  const [activeComponent, setActiveComponent] =
    useState<MissionCategory>("daily");

  const handleCategoryChange = useCallback((category: MissionCategory) => {
    setActiveComponent(category);
  }, []);

  return (
    <>
      <NavBar title={"Missions"} />
      <div className={cn("flex flex-col flex-1 h-full items-center gap-y-5 py-3")}>
        <Image
          src={mainBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <Image
          src={forestBack}
          alt="Forest background"
          className="absolute inset-0 w-full h-[505px] top-[115px] -z-10 rotate-180"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center w-[95%] z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0 flex-1">
          <div className="bg-[#F5D6B1] rounded-2xl p-2.5 py-2 shadow-md border-2 border-[#A96415] flex flex-col">
            <div className="flex justify-center gap-1.5">
              <MemoizedNavigationButton
                icon={activeComponent === "daily" ? starscoreClick : starscore}
                label="Daily"
                isActive={activeComponent === "daily"}
                onClick={() => handleCategoryChange("daily")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
              />
              <MemoizedNavigationButton
                icon={activeComponent === "weekly" ? itemClick : item}
                label="Weekly"
                isActive={activeComponent === "weekly"}
                onClick={() => handleCategoryChange("weekly")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
              />
            </div>
          </div>
          <div className="bg-[#F5D6B1] rounded-2xl p-2.5 shadow-md border-2 border-[#A96415] flex flex-col flex-1 overflow-y-auto gap-2">
            <div className="flex justify-between items-center">
              <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                description
              </span>
              <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
                <ClockIcon className="w-4 h-4" />
                <span className="text-[#745061] font-bumper-sticker text-base font-normal">
                  23:39:01
                </span>
              </div>
            </div>
            <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px]">
              <div className="text-[#745061] font-made-tommy text-[16px]/[20px] font-bold tracking-[0.56px]">
                Mission description or objective goes here.
              </div>
            </div>
            <div className="flex justify-between items-start gap-2 mt-2 flex-1">
              <div className="flex flex-col gap-1 w-[40%]">
                <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                  progress
                </span>
                <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px] h-[103px] flex flex-col justify-between">
                  <div className="text-[#745061] font-made-tommy text-[16px]/[18px] font-[800] tracking-[0.56px]">
                    Koko Snake Played
                  </div>
                  <div className="flex flex-col flex-1 justify-end">
                    <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                      1/3
                    </span>
                    <div className="w-[100%] h-[10px] bg-[#BE9F96] rounded-[10px]">
                      <div className="w-[33.3%] h-[10px] bg-[#653F56] rounded-l-[5px]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 w-[60%]">
                <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                  reward
                </span>
                <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px] flex items-start gap-2 relative">
                  <Image src={pet} alt="pet" className="w-[85px] h-[85px]" />
                  <div className="flex flex-col w-full gap-1">
                    <span className="text-[#745061] font-made-tommy text-[16px] font-[800] leading-[20px] tracking-[0.56px] w-[80%]">
                      Lootbox
                    </span>
                    <div className="flex items-center gap-1 z-10">
                      <span className="text-[#F5DDC4] font-made-tommy text-[14px] font-[800] leading-[20px] tracking-[0.56px] bg-[#C03F21] rounded-[5px] px-1 py-[1px]">
                        Tier 2
                      </span>
                    </div>
                  </div>
                  <Image
                    src={star}
                    alt="star"
                    className="w-[66px] h-[42px] absolute right-3 bottom-3"
                  />
                </div>
              </div>
            </div>
            <Button className="rounded-[8px] border border-[#9C7B8F] bg-[#653F56] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] w-full flex gap-x-1.5 items-center justify-center py-[3px]">
              <>
                <StartIcon className="w-[19px] h-[19px]" />
                <span className="text-[#E3BEAA] text-[20px] font-bumper-sticker font-normal leading-normal [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                  Start
                </span>
              </>
            </Button>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <MissionLeftIcon className="w-[20px]" />
            <MissionClickIcon className="w-[25px] h-[25px]" />
            <MissionIcon className="w-[25px] h-[25px]" />
            <MissionCheckIcon className="w-[25px] h-[25px]" />
            <MissionRightIcon className="w-[20px]" />
          </div>
        </div>
      </div>
    </>
  );
}
