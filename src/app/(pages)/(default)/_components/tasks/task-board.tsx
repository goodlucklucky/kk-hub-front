import React from "react";

interface TaskBoardProps {
  children: React.ReactNode;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ children }) => {
  return (
    <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-32 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
      <div className="bg-[#F5D6B1] rounded-2xl p-[7px] py-2.5 shadow-md border-2 border-[#A96415] flex flex-col overflow-y-auto gap-2">
        {children}
      </div>
    </div>
  );
};
