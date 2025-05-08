import React from 'react';
import { CheckIcon } from "@/app/_assets/svg/check";
import Button from '@/app/_components/shared/button';
import { CopyIcon } from '@/app/_assets/svg/copy';
import { ShareIcon } from '@/app/_assets/svg/share';

interface TaskItemProps {
  title: string;
  reward: string;
  taskNumber: number;
  isCompleted?: boolean;
  actionTitle?: string;
  isFriend?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  reward,
  taskNumber,
  isCompleted = false,
  actionTitle,
  isFriend = false
}) => {
  return (
    <div className="rounded-[14px] border border-[#F1DCB8] bg-[#E3BEAA] bg-opacity-50 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] [background:linear-gradient(0deg,rgba(249,227,198,0.50)_0%,rgba(249,227,198,0.50)_100%),#E3BEAA] flex">
      <div className={`flex flex-col w-6 rounded-[14px_0px_0px_14px] ${!isCompleted ? "bg-[#653F56]" : "bg-[#25BF63]"}`}>
        <div className={`flex flex-col h-6 rounded-[13px_0px_0px_0px] justify-center items-center text-[#EFF6FF] font-made-tommy font-bold text-xs leading-normal tracking-[0.16px] ${!isCompleted ? "bg-[#82616B]" : "bg-[#609F70]"}`}>
          {taskNumber}
        </div>
        <div className='flex flex-1'>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-around text-[#5F3F57] font-made-tommy font-bold text-base leading-normal tracking-[0.16px] pt-2 pb-1 px-3 gap-y-1">
        <div className="flex flex-col">{title}</div>
        <div className="flex justify-between items-center h-8 rounded-[6px] border-1 border-[#F1DCB8] bg-[#E3BEAA] px-2 pr-1.5">
          <span className="text-sm font-made-tommy font-bold text-[#745061]">{reward}</span>
          {
            isCompleted
              ?
              <CheckIcon color="#745061" className="w-4 h-4" />
              :
              <Button className='rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5'>
                <span className='text-white text-xs font-bold px-2 py-0'>{actionTitle}</span>
              </Button>
          }
        </div>
        {
          (isFriend && !isCompleted) && <div className='flex items-center gap-x-1 my-1'>
            <Button className='rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center'>
              <ShareIcon className='w-3.5 h-3.5' />
              <span className='text-white text-xs font-bold py-[1px]'>Share</span>
            </Button>
            <Button className='rounded-[2px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-0.5 w-full flex gap-x-1 items-center justify-center'>
              <CopyIcon className='w-3.5 h-3.5' />
              <span className='text-white text-xs font-bold py-[1px]'>Copy Link</span>
            </Button>
          </div>
        }
      </div>
    </div>
  );
};

export default TaskItem; 