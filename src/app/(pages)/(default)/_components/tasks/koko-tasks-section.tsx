import React from 'react';
import { ShareIcon } from "@/app/_assets/svg/share";
import { CopyIcon } from "@/app/_assets/svg/copy";
import TaskItem from "./task-item";
import Button from "@/app/_components/shared/button";

export const KokoTasksSection: React.FC = () => {
  return (
    <>
      <div className="rounded-[22px] border border-[#FFE0BF] bg-[#DDC2A7] shadow-[inset_0px_2px_1px_0px_rgba(95,63,87,0.20)] [background:linear-gradient(180deg,rgba(95,63,87,0.20)_11.66%,rgba(95,63,87,0.00)_248.61%),#DDC2A7] px-2 py-[9px] flex flex-col gap-y-2 flex-1 overflow-y-auto">
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
      <div className="flex flex-col px-2 rounded-[15px] w-full">
        <div className="w-full bg-[#24BE62] rounded-t-[15px] text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-bumper-sticker text-base font-normal leading-[18px] tracking-[-0.32px] py-1.5">
          Invite Friends for More Rewards!
        </div>
        <div className="flex flex-col flex-1 bg-[#E3BEAA] rounded-b-[15px] py-2 justify-center items-center gap-y-1">
          <div className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy text-sm font-extrabold leading-[18px] tracking-[-0.32px]">
            1 Spin per each invitation
          </div>
          <div className="text-[#745061] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy text-xs font-bold leading-[18px] tracking-[-0.32px]">
            +5% of volume fees your frens generate – forever!
          </div>
          <div className="flex gap-x-1.5 w-full px-6">
            <Button className='rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center'>
              <ShareIcon className='w-3.5 h-3.5' />
              <span className='text-white text-xs font-bold py-[1px]'>Share</span>
            </Button>
            <Button className='rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center'>
              <CopyIcon className='w-3.5 h-3.5' />
              <span className='text-white text-xs font-bold py-[1px]'>Copy Link</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}; 