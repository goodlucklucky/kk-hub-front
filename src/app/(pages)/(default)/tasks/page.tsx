"use client";

import React, { useState, useCallback, memo, useContext } from "react";
import Image from "next/image";
//import components
import MintDialog from "../_components/dialogs/mint-dialog";
import NavigationButton from "../_components/profile/navigateBtn";

//import utils
import { cn } from "@/app/_lib/utils";

//import images
import forestBack from "@assets/images/forest-back.png";
import mainBack from "@assets/images/main-back.png";
import { trackEvent } from "@/app/_lib/mixpanel";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { useActiveAccount } from "thirdweb/react";
import { useAirdropNft } from "../../../../../services/nft";
import TaskSection from "../_components/tasks/task-section";

// Types
type TasksCategory = "Claim OG" | "Koko Tasks" | "Partner";

// Memoized NavigationButton component
const MemoizedNavigationButton = memo(NavigationButton);

// Product category buttons component
const TasksCategoryButtons = memo(
  ({
    activeCategory,
    onCategoryChange,
    categories,
  }: {
    activeCategory: TasksCategory;
    onCategoryChange: (category: TasksCategory) => void;
    categories: TasksCategory[];
  }) => (
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
  )
);

TasksCategoryButtons.displayName = "TasksCategoryButtons";

export default function TasksPage() {
  const { sessionId } = useContext(GeneralContext);
  const account = useActiveAccount();
  const { mutateAsync: claimAirDrop } = useAirdropNft();

  const [activeTaskCategory, setActiveTaskCategory] =
    useState<TasksCategory>("Claim OG");
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const handleTaskCategoryChange = useCallback((category: TasksCategory) => {
    setActiveTaskCategory(category);
  }, []);

  const handleMint = useCallback(async () => {
    setIsMintDialogOpen(true);
    setIsMinting(true);
    try {
      await claimAirDrop({
        wallet: `${account?.address}`,
        sessionId,
        type: "welcome",
      });
      trackEvent("MintWelcome NFT", {
        wallet: account?.address,
        sessionId,
        type: "welcome",
      });
    } catch {
      // console.log("Error in claimAirDrop", error);
    } finally {
      setIsMinting(false);
    }
  }, [account?.address, claimAirDrop, sessionId]);

  return (
    <>
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
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-22 bottom-26 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
          <div className="bg-[#F5D6B1] rounded-2xl p-[7px] py-2.5 shadow-md border-2 border-[#A96415] flex flex-col overflow-y-auto gap-2 h-full">
            <div className="flex flex-col gap-2 px-2">
              <TasksCategoryButtons
                activeCategory={activeTaskCategory}
                onCategoryChange={handleTaskCategoryChange}
                categories={["Claim OG", "Koko Tasks", "Partner"]}
              />
            </div>
            <TaskSection tab={activeTaskCategory} onMintClick={handleMint} />
          </div>
        </div>
      </div>
      <MintDialog
        isOpen={isMintDialogOpen}
        onClose={() => setIsMintDialogOpen(!isMintDialogOpen)}
        isMinting={isMinting}
      />
    </>
  );
}
