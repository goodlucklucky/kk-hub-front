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

import NavigationButton from "../_components/profile/navigateBtn";
import DailyRewardSection from "../_components/missions/dailyreward";
import WeeklyRewardSection from "../_components/missions/weeklyreward";

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
      <div
        className={cn(
          "flex flex-col flex-1 h-full justify-center items-center gap-y-5 px-3"
        )}
      >
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
                  icon={
                    activeComponent === "daily" ? starscoreClick : starscore
                  }
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
            {activeComponent === "daily" ? (
              <DailyRewardSection currentXp={1} maxXp={3} />
            ) : (
              <WeeklyRewardSection currentXp={2} maxXp={4} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
