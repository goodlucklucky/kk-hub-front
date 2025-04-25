import React from 'react';
import TaskItem from "./task-item";

export const PartnerSection: React.FC = () => {
  return (
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
        actionTitle="Verify"
      />
      <TaskItem
        title="Invite a Friend"
        reward="T2 Lootbox"
        taskNumber={3}
        isCompleted={false}
        actionTitle="Invite"
        isFriend={true}
      />
      <TaskItem
        title="Join our Discord community"
        reward="T2 Lootbox"
        taskNumber={4}
        isCompleted={false}
        actionTitle="Visit"
      />
    </div>
  );
}; 