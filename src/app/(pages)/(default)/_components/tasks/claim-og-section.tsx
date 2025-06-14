"use client";

import React from "react";
import { TaskIcon } from "@/app/_assets/svg/task";
import { ClaimIcon } from "@/app/_assets/svg/claim";
import TaskItem from "./task-item";
import Button from "@/app/_components/shared/button";
import { ITask } from "../../../../../../services/tasks";
import { useGeneral } from "@/app/_providers/generalProvider";
import toast from "react-hot-toast";

interface ClaimOGSectionProps {
  onMintClick: () => void;
  data?: ITask[];
}

export const ClaimOGSection: React.FC<ClaimOGSectionProps> = ({
  onMintClick,
  data: claimogTasks,
}) => {
  const { completionStatus } = useGeneral();

  return (
    <>
      <div className="flex flex-col gap-2 px-2">
        <div className="bg-[#D49FC4] rounded-[10px] p-2 px-4 flex items-center gap-x-2">
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
      <div className="rounded-[22px] overflow-auto border border-[#FFE0BF] bg-[#DDC2A7] shadow-[inset_0px_2px_1px_0px_rgba(95,63,87,0.20)] [background:linear-gradient(180deg,rgba(95,63,87,0.20)_11.66%,rgba(95,63,87,0.00)_248.61%),#DDC2A7] px-2 py-[9px] flex flex-col gap-y-2 flex-1 overflow-y-auto">
        {claimogTasks?.map((task, index) => (
          <TaskItem
            key={task?.id}
            title={task?.description}
            reward={task?.bonusName}
            rewardDescription="T2 Lootbox"
            taskNumber={index + 1}
            task={task}
            actionTitle={task.type}
          />
        ))}
      </div>
      <div className="flex px-2">
        <Button
          className="rounded-[10px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center"
          onClick={() => {
            if (
              (completionStatus?.completedNftBonuses || 0) <
              (claimogTasks?.length || 1)
            )
              toast.error("You need to complete all tasks first");
            else onMintClick();
          }}
        >
          <ClaimIcon className="w-4.5 h-4.5" />
          <span className="text-white text-lg font-bold py-0.5 font-made-tommy">
            Claim
          </span>
        </Button>
      </div>
    </>
  );
};
