'use client';

import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { ClaimOGSection } from "../../../(default)/_components/tasks/claim-og-section";
import { KokoTasksSection } from "../../../(default)/_components/tasks/koko-tasks-section";
import { PartnerSection } from "../../../(default)/_components/tasks/partner-section";
import MintDialog from "../../../(default)/_components/dialogs/mint-dialog";
import NavigationButton from "../../../(default)/_components/profile/navigateBtn";

//import utils
import { cn } from "@/app/_lib/utils";

//import images
import forestBack from '@assets/images/forest-back.png';
import mainBack from '@assets/images/main-back.png';
import Header from "../../../(default)/_components/layout/header";
import Footer from "../../../(default)/_components/layout/footer";

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

  const handleTaskCategoryChange = useCallback((category: TasksCategory) => {
    setActiveTaskCategory(category);
  }, []);

  const renderTaskSection = () => {
    switch (activeTaskCategory) {
      case 'Claim OG':
        return <ClaimOGSection onMintClick={() => {
          setIsMintDialogOpen(true)
          setIsMinting(true)
        }} />;
      case 'Koko Tasks':
        return <KokoTasksSection />;
      case 'Partner':
        return <PartnerSection />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col min-h-screen">
      <Header />
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
          className="absolute inset-0 w-full h-[555px] top-[70px] -z-10 rotate-180"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed top-22 bottom-26 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
          <div className="bg-[#F5D6B1] rounded-2xl p-[7px] py-2.5 shadow-md border-2 border-[#A96415] flex flex-col overflow-y-auto gap-2 h-full">
            <div className="flex flex-col gap-2 px-2">
              <TasksCategoryButtons
                activeCategory={activeTaskCategory}
                onCategoryChange={handleTaskCategoryChange}
                categories={['Claim OG', 'Koko Tasks', 'Partner']}
              />
            </div>
            {renderTaskSection()}
          </div>
        </div>
      </div >
      <Footer footerCategory="game" />
      <MintDialog
        isOpen={isMintDialogOpen}
        onClose={() => setIsMintDialogOpen(!isMintDialogOpen)}
        isMinting={isMinting}
        setIsMinting={setIsMinting}
      />
    </div>
  );
}
