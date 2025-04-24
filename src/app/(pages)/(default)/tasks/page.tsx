'use client';

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { NavBar } from "../_components/xp-bar";
import CosmeticCard from "../_components/store/cosmetic-card";
import DiscountBadge from "../_components/store/discount-badge";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons
import item from "@assets/svg/item-star.svg";
import itemClick from "@assets/svg/item-star-click.svg";
import starscore from "@assets/svg/star-score.svg";
import starscoreClick from "@assets/svg/star-score-click.svg";
import inventory from "@assets/svg/inventory.svg";
import inventoryClick from "@assets/svg/inventory-click.svg";

//import images
import forestBack from '@assets/images/forest-back.png';
import mainBack from '@assets/images/main-back.png';
import cosmetic from '@assets/images/cosmetics.png';

import SkinDialog from "../_components/dialogs/skin-dialog";
import NavigationButton from "../_components/profile/navigateBtn";
import { XIcon } from "@/app/_assets/svg/x";
import { TaskIcon } from "@/app/_assets/svg/task";
import { CheckIcon } from "@/app/_assets/svg/check";
import TaskItem from "../_components/tasks/task-item";
import Button from "@/app/_components/shared/button";
import { ClaimIcon } from "@/app/_assets/svg/claim";
// Types
type StoreCategory = 'featured' | 'items' | 'kokitos' | 'social';
type TasksCategory = 'Claim OG' | 'Koko Tasks' | 'Partner';

// Memoized CosmeticCard component
const MemoizedCosmeticCard = memo(CosmeticCard);

// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavigationButton);

// Product category buttons component
const TasksCategoryButtons = memo(({ activeCategory, onCategoryChange }: { activeCategory: TasksCategory, onCategoryChange: (category: TasksCategory) => void }) => (
  <div className="w-full flex gap-x-1">
    {(['Claim OG', 'Koko Tasks', 'Partner'] as const).map((category) => (
      <MemoizedNavigationButton
        key={category}
        label={category}
        isActive={activeCategory === category}
        onClick={() => onCategoryChange(category)}
        className="rounded-[9px] !text-sm !font-normal font-bumper-sticker border-[#9C7B8F] bg-[#653F56]"
      />
    ))}
  </div>
));

TasksCategoryButtons.displayName = 'TasksCategoryButtons';

export default function TasksPage() {
  const [activeComponent, setActiveComponent] = useState<StoreCategory>("featured");
  const [activeTaskCategory, setActiveTaskCategory] = useState<TasksCategory>("Claim OG");
  const [isSkinDialogOpen, setIsSkinDialogOpen] = useState(false);
  const [isConnectTwitter, setIsConnectTwitter] = useState(true);

  const handleSkinDialogToggle = useCallback(() => {
    setIsSkinDialogOpen(prev => !prev);
  }, []);

  const handleTaskCategoryChange = useCallback((category: TasksCategory) => {
    setActiveTaskCategory(category);
  }, []);

  return (
    <>
      <NavBar title={'Tasks'} />
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
              <div className="rounded-[14px] border border-[#F7D8B7] bg-[#DDC2A7] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] [background:linear-gradient(180deg,rgba(95,63,87,0.20)_-577.52%,rgba(95,63,87,0.00)_248.61%),#DDC2A7] p-[5px]">
                <TasksCategoryButtons
                  activeCategory={activeTaskCategory}
                  onCategoryChange={handleTaskCategoryChange}
                />
              </div>
              {
                isConnectTwitter
                  ?
                  <div className="rounded-[9px] bg-[#EED1B8] [background:linear-gradient(0deg,#D1B69F_0%,#D1B69F_100%),#EED1B8] p-[5px] flex justify-start items-center gap-x-2 px-3">
                    <XIcon className="w-3.5 h-3.5 mt-[1px]" />
                    <div className="flex items-center flex-1 gap-x-1">
                      <span className="h-2 w-2 rounded-full bg-[#126529] gap-x-1"></span>
                      <span className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy text-base font-bold leading-normal tracking-[0.16px]">Connect Twitter</span>
                    </div>
                  </div>
                  :
                  <div className="rounded-[9px] border border-[#D1AB8D] bg-[#EED1B8] bg-opacity-50 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-x-1 p-[3px]">
                    <XIcon className="w-3.5 h-3.5 mt-[1px]" />
                    <span className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy text-base font-bold leading-normal tracking-[0.16px]">
                      Connect Twitter
                    </span>
                  </div>
              }
              <div className="bg-[#D49FC4] rounded-[10px] p-3 px-4 flex items-center gap-x-2">
                <TaskIcon />
                <div className="flex flex-col">
                  <span className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy font-bold leading-normal tracking-[0.16px] text-xs mt-1">
                    Claim your free Kokomo OG NFT
                  </span>
                  <span className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-bumper-sticker font-normal leading-normal tracking-[0.16px] text-lg">
                    Your free Kokomo OG NFT
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-[#FFE0BF] bg-[#DDC2A7] shadow-[inset_0px_2px_1px_0px_rgba(95,63,87,0.20)] [background:linear-gradient(180deg,rgba(95,63,87,0.20)_11.66%,rgba(95,63,87,0.00)_248.61%),#DDC2A7] px-2 py-[9px] flex flex-col gap-y-2">
              <TaskItem
                title="Follow us on X"
                reward="T2 Lootbox"
                taskNumber={1}
                isCompleted={true}
                actionTitle="Verify"
              />
              <TaskItem
                title="Join our Telegram community"
                reward="T2 Lootbox"
                taskNumber={2}
                isCompleted={false}
                actionTitle="Invite"
              />
              <TaskItem
                title="Invite a Friend"
                reward="T2 Lootbox"
                taskNumber={3}
                isCompleted={false}
                actionTitle="Invite"
                isFriend={true}
              />
            </div>
            <div className="flex px-2">
              <Button className='rounded-[10px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center'>
                <ClaimIcon className="w-4.5 h-4.5" />
                <span className='text-white text-lg font-bold py-0.5 font-made-tommy'>Claim</span>
              </Button>
            </div>
          </div>
        </div>
      </div >
      <SkinDialog
        isOpen={isSkinDialogOpen}
        onClose={handleSkinDialogToggle}
      />
    </>
  );
}
