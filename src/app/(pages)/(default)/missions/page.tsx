"use client";

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import _ from "lodash";

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
import { GiftIcon, TickIcon } from "@/app/_assets/svg/etc"
import { ProgressBar } from "../_components/missions/progress";

// Types
type MissionCategory = "daily" | "weekly";

// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavigationButton);

export default function MissionPage() {
  const [activeComponent, setActiveComponent] =
    useState<MissionCategory>("daily");
  const [currentXp, setCurrentXp] = useState(1);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [timeLeft, setTimeLeft] = useState("23:59:59");

  // Add timer effect
  React.useEffect(() => {
    // Set initial time (24 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    const updateTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };
    
    // Update immediately and then every second
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCategoryChange = useCallback((category: MissionCategory) => {
    setActiveComponent(category);
  }, []);

  return (
    <>
      <div className={cn("flex flex-col flex-1 h-full justify-center items-center gap-y-5 px-3")}>
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
          className="absolute inset-0 w-full h-[555px] top-[70px] -z-10 rotate-180"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="bg-gradient-to-b from-[#FAC485] to-[#8B4B4F] rounded-[15px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] p-[2px]">
          <div className="bg-[url(/images/board_2.png)] rounded-[13px] p-2.5 flex flex-col gap-y-2">
            <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col">
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
            <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col flex-1 overflow-y-auto gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                  description
                </span>
                { currentXp < 3 && (
                  <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
                    <ClockIcon className="w-4 h-4" />
                    <p className="text-[#745061] font-bumper-sticker text-base font-normal">{timeLeft}</p>
                  </div>
                )}
                { currentXp == 3 && (
                  <div className="rounded-[5px] bg-[#568262] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
                    <TickIcon fill="#FDE8C6" className="w-4 h-4"/>
                    <p className="font-bumper-sticker text-base font-normal font-light text-[#FDE8C6]"> COMPLETED </p>
                  </div>
                )}
              </div>
              <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px]">
                <span className="text-[#745061] font-made-tommy text-[16px]/[16px] font-[800] text-center w-[80%]">
                  Mission description or objective goes here.
                </span>
              </div>
              <div className="flex justify-between items-center gap-2 mt-2">
                <div className="flex flex-col gap-1 w-[40%]">
                  <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                    progress
                  </span>
                  <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px] h-[100px] flex flex-col">
                    <p className="text-[#745061] font-made-tommy text-[16px] font-[800] leading-[18px] max-h-[40px]">
                      Koko Snake Played
                    </p>
                    <ProgressBar currentXp={currentXp} maxXp={3} progressColor={{ from: "#653F56", to: "#653F56"}} bgColor={{ from: "#BE9F96", to: "#BE9F96"}}/>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-[60%]">
                  <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
                    reward
                  </span>
                  <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px] h-[100px] flex items-start gap-2 relative">
                    <Image src={pet} alt="pet" className="w-[85px] h-[85px] rounded-[5px]" />
                    <div className="flex flex-col w-full gap-1">
                      <span className="text-[#745061] font-made-tommy text-[16px] font-[800] leading-[20px] w-[80%]">
                        Lootbox
                      </span>
                      <div className="flex items-center gap-1 z-10">
                        <span className="text-[#F5DDC4] font-made-tommy text-[14px] font-[800] leading-[20px] bg-[#C03F21] rounded-[5px] px-1 py-[1px]">
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
              {currentXp < 3 && (
                <Button className="rounded-[8px] bg-[#653F56] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] w-full flex gap-x-1.5 items-center justify-center py-[3px]">
                  <>
                    <StartIcon className="w-[19px] h-[19px]" />
                    <span className="text-[#E3BEAA] text-[20px] font-bumper-sticker font-normal leading-normal [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                      Start
                    </span>
                  </>
                </Button>
              )}
              {currentXp == 3 && !rewardClaimed && (
                <Button className="rounded-[8px] bg-[#653F56] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] w-full flex gap-x-1.5 items-center justify-center py-[3px]">
                  <GiftIcon fill="#e3beaa" className="w-5 h-5 text-red" />
                  <span className="text-[#e3beaa] font-bumper-sticker font-normal text-[20px] tracking-wider shadow-[0px_1px_0px_rgba(0, 0, 0, 0.20)]" 
                    onClick={() => {
                      setRewardClaimed(true)
                      // Simulate reward claim
                        setTimeout(() => {
                          setInProgress(false)
                        }, 1500);
                    }}>
                    CLAIM REWARD
                  </span>
                </Button>
              )}
              {currentXp == 3 && rewardClaimed && (
                <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#E3BEAA] to-[#E3BEAA] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] mt-2 p-2">
                  <span className="text-[#653f56] font-bumper-sticker font-normal text-[20px] tracking-wider shadow-[0px_1px_0px_rgba(0, 0, 0, 0.20)]">
                    {inProgress ? "In Progress..." : "Reward Claimed"}
                  </span>
                </Button>
              )}
            </div>
            <div className="flex gap-3 justify-center items-center">
            <MissionLeftIcon className="w-[20px]"/>
            <MissionClickIcon className="w-[25px] h-[25px]"/>
            <MissionIcon className="w-[25px] h-[25px]"/>
            <MissionCheckIcon className="w-[25px] h-[25px]"/>
            <MissionRightIcon className="w-[20px]"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
