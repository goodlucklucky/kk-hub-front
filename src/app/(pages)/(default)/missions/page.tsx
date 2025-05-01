'use client';

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { NavBar } from "../_components/xp-bar";
import NavBtn from "../_components/missions/navigateBtn";

//import utils
import { cn } from "@/app/_lib/utils";

//import images
import forestBack from '@assets/images/forest-back.png';
import mainBack from '@assets/images/main-back.png';
import DailyRewardSection from "../_components/missions/dailyreward";
import WeeklyRewardSection from "../_components/missions/weeklyreward";
import { ThreeIcon, ThreeIconClick } from "@/app/_assets/svg/etc";
import arrowLeft from "@/app/_assets/svg/arrowLeft.svg";
import circle from "@/app/_assets/svg/circle.svg";
import circleSelect from "@/app/_assets/svg/circle-select.svg";
import circleTick from "@/app/_assets/svg/circle-tick.svg"
import arrowRight from "@/app/_assets/svg/arrowRight.svg";

// Missions categories
type MissionsCategory = 'Daily' | 'Weekly';


// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavBtn);

// Product category buttons component
const MissionCategoryButtons = memo(({ activeCategory, onCategoryChange, categories }: { activeCategory: MissionsCategory, onCategoryChange: (category: MissionsCategory) => void, categories: MissionsCategory[] }) => (
  <div className="w-full flex gap-x-1">
    {categories.map((category) => (
      <MemoizedNavigationButton
        key={category}
        label={category}
        icon={activeCategory === category ? <ThreeIconClick /> : <ThreeIcon />}
        isActive={activeCategory === category}
        onClick={() => onCategoryChange(category)}
        className="rounded-[9px] !text-sm !font-normal font-bumper-sticker border-[#9C7B8F] bg-[#653F56]"
      />
    ))}
  </div>
));

MissionCategoryButtons.displayName = 'MissionCategoryButtons';

export default function MissionsPage() {
  const [activeTaskCategory, setActiveTaskCategory] = useState<MissionsCategory>("Daily");

  // value is hardcoded as of now
  const dailyXp = 1
  const weeklyXp = 3

  const handleTaskCategoryChange = useCallback((category: MissionsCategory) => {
    setActiveTaskCategory(category);
  }, []);

  const renderMissionSection = () => {
    switch (activeTaskCategory) {
      case 'Daily':
        return <DailyRewardSection currentXp={dailyXp} />;
      case 'Weekly':
        return <WeeklyRewardSection currentXp={weeklyXp} />;
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar title={'Missions'} />
      <div className={cn("flex flex-col flex-1 h-full items-center gap-y-5")}>
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
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-32 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
          <div className="bg-[#F5D6B1] rounded-2xl p-[7px] py-2.5 shadow-md border-2 border-[#A96415] flex flex-col overflow-y-auto gap-2">
            <div className="flex flex-col flex-1 gap-2 px-2">
              <MissionCategoryButtons
                activeCategory={activeTaskCategory}
                onCategoryChange={handleTaskCategoryChange}
                categories={['Daily', 'Weekly']}
              />
            </div>
          </div>

          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col overflow-y-auto justify-between">
            {renderMissionSection()}
          </div>

          <div className="flex items-center justify-center gap-1 my-2">
            <Image
              src={arrowLeft}
              alt="Arrow"
              className="w-5 h-5 mx-3"
              loading="eager"
              priority
            />
            <Image
              src={circleSelect}
              alt="circleSelect"
              className="w-5 h-5"
              loading="eager"
              priority
            />
            <Image
              src={circle}
              alt="circle"
              className="w-5 h-5 mx-3"
              loading="eager"
              priority
            />
            <Image
              src={circleTick}
              alt="circleTick"
              className="w-5 h-5"
              loading="eager"
              priority
            />
            <Image
              src={arrowRight}
              alt="Arrow"
              className="w-5 h-5 mx-3"
              loading="eager"
              priority
            />
          </div>
        </div>
      </div >
    </>
  );
}
