import React from "react";
import { XIcon } from "@/app/_assets/svg/x";

interface TwitterConnectCardProps {
  isConnected: boolean;
}

export const TwitterConnectCard: React.FC<TwitterConnectCardProps> = ({
  isConnected,
}) => {
  if (isConnected) {
    return (
      <div className="rounded-[9px] bg-[#EED1B8] [background:linear-gradient(0deg,#D1B69F_0%,#D1B69F_100%),#EED1B8] p-[5px] flex justify-start items-center gap-x-2 px-3">
        <XIcon className="w-3.5 h-3.5 mt-[1px]" />
        <div className="flex items-center flex-1 gap-x-1">
          <span className="h-2 w-2 rounded-full bg-[#126529] gap-x-1"></span>
          <span className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy text-base font-bold leading-normal tracking-[0.16px]">
            Connect Twitter
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[9px] border border-[#D1AB8D] bg-[#EED1B8] bg-opacity-50 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center gap-x-1 p-[3px]">
      <XIcon className="w-3.5 h-3.5 mt-[1px]" />
      <span className="text-[#5F3F57] text-shadow-[0px_1px_0px_rgba(0,0,0,0.20)] font-made-tommy text-base font-bold leading-normal tracking-[0.16px]">
        Connect Twitter
      </span>
    </div>
  );
};
