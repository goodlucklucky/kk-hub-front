'use client';

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { NavBar } from "../_components/xp-bar";
import CosmeticCard from "../_components/store/cosmetic-card";
import { ClaimOGSection } from "../_components/tasks/claim-og-section";
import { KokoTasksSection } from "../_components/tasks/koko-tasks-section";
import { PartnerSection } from "../_components/tasks/partner-section";
import MintDialog from "../_components/dialogs/mint-dialog";
import NavigationButton from "../_components/profile/navigateBtn";

//import utils
import { cn } from "@/app/_lib/utils";

//import images
import forestBack from '@assets/images/forest-back.png';
import mainBack from '@assets/images/main-back.png';
import { XIcon } from "@/app/_assets/svg/x";

// Types
type TasksCategory = 'Claim OG' | 'Koko Tasks' | 'Partner';


// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavigationButton);

// Product category buttons component
const TasksCategoryButtons = memo(({ activeCategory, onCategoryChange, categories }: { activeCategory: TasksCategory, onCategoryChange: (category: TasksCategory) => void, categories: TasksCategory[] }) => (
  <div className="w-full flex gap-x-1">
    {categories.map((category) => (
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
  const [activeTaskCategory, setActiveTaskCategory] = useState<TasksCategory>("Claim OG");
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isConnectTwitter, setIsConnectTwitter] = useState(true);

  const handleTaskCategoryChange = useCallback((category: TasksCategory) => {
    setActiveTaskCategory(category);
  }, []);

  const renderTaskSection = () => {
    switch (activeTaskCategory) {
      case 'Claim OG':
        return <ClaimOGSection onMintClick={() => setIsMintDialogOpen(true)} />;
      case 'Koko Tasks':
        return <KokoTasksSection />;
      case 'Partner':
        return <PartnerSection />;
      default:
        return null;
    }
  };

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
              <TasksCategoryButtons
                activeCategory={activeTaskCategory}
                onCategoryChange={handleTaskCategoryChange}
                categories={['Claim OG', 'Koko Tasks', 'Partner']}
              />
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
            </div>
            {renderTaskSection()}
          </div>
        </div>
      </div >
      <MintDialog
        isOpen={isMintDialogOpen}
        onClose={() => setIsMintDialogOpen(!isMintDialogOpen)}
        isMinting={isMinting}
        setIsMinting={setIsMinting}
      />
    </>
  );
}
