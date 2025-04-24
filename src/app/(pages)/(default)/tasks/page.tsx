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
        className="rounded-[9px] !text-sm !font-normal font-bumper-sticker border-[#9C7B8F]"
      />
    ))}
  </div>
));

TasksCategoryButtons.displayName = 'TasksCategoryButtons';

export default function TasksPage() {
  const [activeComponent, setActiveComponent] = useState<StoreCategory>("featured");
  const [activeProductCategory, setActiveProductCategory] = useState<TasksCategory>("Claim OG");
  const [isSkinDialogOpen, setIsSkinDialogOpen] = useState(false);

  const handleSkinDialogToggle = useCallback(() => {
    setIsSkinDialogOpen(prev => !prev);
  }, []);

  const handleCategoryChange = useCallback((category: StoreCategory) => {
    setActiveComponent(category);
  }, []);

  const handleProductCategoryChange = useCallback((category: TasksCategory) => {
    setActiveProductCategory(category);
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
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-32 bottom-25 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col flex-1 overflow-y-auto gap-2">
            <div className="rounded-[14px] border border-[#F7D8B7] bg-[#DDC2A7] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] [background:linear-gradient(180deg,rgba(95,63,87,0.20)_-577.52%,rgba(95,63,87,0.00)_248.61%),#DDC2A7] p-[5px]">
              <TasksCategoryButtons
                activeCategory={activeProductCategory}
                onCategoryChange={handleProductCategoryChange}
              />
            </div>
            <div className="w-full flex-1 overflow-y-auto rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] p-2 pt-3">
              <div className="w-full flex flex-col gap-2 bg-[#EED1B8] rounded-[22px] p-3 px-1 overflow-y-auto">
                <div className="flex justify-start items-center">
                  <span className="text-[#5F3F57] text-[22px] font-bumper-sticker font-normal px-1">COSMETICS</span>
                  <DiscountBadge discount={-20} />
                </div>
                <div className="justify-between items-center flex-wrap grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <MemoizedCosmeticCard
                      key={index}
                      image={cosmetic}
                      title="SLUG"
                      subtitle="SKIN"
                      price={2.99}
                      showInfo={index === 0}
                      isHot={index === 0}
                      onClick={handleSkinDialogToggle}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SkinDialog
        isOpen={isSkinDialogOpen}
        onClose={handleSkinDialogToggle}
      />
    </>
  );
}
