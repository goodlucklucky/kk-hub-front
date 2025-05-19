import React from "react";
import TaskItem from "./task-item";
import { ITask } from "../../../../../../services/tasks";

export const PartnerSection = ({ data: partnerTasks }: { data: ITask[] }) => {
  return (
    <div className="rounded-[22px] overflow-auto border border-[#FFE0BF] bg-[#DDC2A7] shadow-[inset_0px_2px_1px_0px_rgba(95,63,87,0.20)] [background:linear-gradient(180deg,rgba(95,63,87,0.20)_11.66%,rgba(95,63,87,0.00)_248.61%),#DDC2A7] px-2 py-[9px] flex flex-col gap-y-2 flex-1">
      {partnerTasks?.map((task, index) => (
        <TaskItem
          key={task?.id}
          taskNumber={index + 1}
          title={task?.description}
          reward={task?.bonusName}
          actionTitle={task?.type}
          task={task}
        />
      ))}
    </div>
  );
};
