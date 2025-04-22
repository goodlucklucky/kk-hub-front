"use client"

import { TopArrow } from "@/app/_assets/svg/top-arrow";
import TabButton from "./tab-button";

interface CurrentScoresProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CurrentScores({ activeTab, onTabChange }: CurrentScoresProps) {
  return (
    <div className="w-full justify-between bg-[#EED1B8] rounded-[10px] flex flex-col items-center gap-1 px-3 py-2.5">
      <div className="flex gap-2 items-center w-full">
        <TopArrow />
        <span className="text-[#5F3F57] font-small font-bumper-sticker text-[18px]/[28px]">
          Your Current Scores
        </span>
      </div>
      <div className="rounded-[14px] border border-[#F7D8B7] bg-[#DDC2A7] bg-gradient-to-b from-[rgba(95,63,87,0.20)] to-transparent shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] p-1.5 flex gap-1.5">
        <TabButton 
          label="Daily" 
          isActive={activeTab === "daily"} 
          onClick={() => onTabChange("daily")}
        />
        <TabButton 
          label="Weekly" 
          isActive={activeTab === "weekly"} 
          onClick={() => onTabChange("weekly")}
        />
      </div>
    </div>
  );
} 