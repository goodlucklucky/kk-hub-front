"use client";

// import { TopArrow } from "@/app/_assets/svg/top-arrow";
import TabButton from "./tab-button";

interface CurrentScoresProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CurrentScores({
  activeTab,
  onTabChange,
}: CurrentScoresProps) {
  return (
    <div className="w-full justify-between flex flex-col items-center px-3">
      <div className="w-full text-[#5F3F57] text-center font-normal font-bumper-sticker text-[16px]/[28px] drop-shadow-[0px_2px_0px_rgba(0,0,0,0.20)]">
        Your Current Scores
      </div>
      <div className="rounded-[14px] w-full border border-[#F7D8B7] bg-[#DDC2A7] bg-gradient-to-b from-[rgba(95,63,87,0.20)] from-[-577.52%] to-[rgba(95,63,87,0.00)] to-[248.61%] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] p-1 flex gap-1.5">
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
