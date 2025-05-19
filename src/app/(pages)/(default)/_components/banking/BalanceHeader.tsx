"use client";

import { CoinIcon } from "@/app/_assets/svg/coin";
import { DollarScoreIcon } from "@/app/_assets/svg/dollar";
import { QuestionIcon } from "@/app/_assets/svg/question";
import { formatNumber } from "@/app/_utils/number";
import { useThirdweb } from "../../_context/thirdwebContext";

interface BalanceHeaderProps {
  activeComponent: "deposit" | "withdraw";
}

export const BalanceHeader = ({ activeComponent }: BalanceHeaderProps) => {
  const {
    balance: { total },
  } = useThirdweb();

  return (
    <div className="flex flex-col w-full justify-between items-center gap-x-3 bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1] rounded-[15px] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] border border-[#A96415]">
      <div className="py-2 px-4 border-b-1 border-[#E3BEAA] w-full flex justify-between">
        <div className="flex gap-1 items-center">
          <CoinIcon />
          <span className="text-[#5F3F57] font-made-tommy text-[18px] font-bold leading-normal">
            {activeComponent === "deposit" ? "Wallet" : "Platform"} Balance
          </span>
        </div>
        <div className="flex items-center justify-center gap-1 bg-[#5F3F57] rounded-[7px] px-[6px] py-[2px]">
          <DollarScoreIcon color="#5F3F57" bgColor="#EED1B8" />
          <span className="text-[#EED1B8] font-made-tommy text-[18px] font-bold leading-normal">
            {formatNumber(total || 0, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full py-2 px-4">
        <span className="text-[#5F3F57CC] font-made-tommy text-[12px] font-bold leading-normal">
          Available for Withdrawal:{" "}
          {formatNumber(total || 0, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}{" "}
          USD
        </span>
        <div className="flex gap-1 items-center">
          <span className="text-[#5F3F57CC] font-made-tommy text-[12px] font-bold leading-normal">
            Deposit Bonus (Locked): 0.00 USD
          </span>
          <QuestionIcon className="-mt-0.5" />
        </div>
      </div>
    </div>
  );
};
