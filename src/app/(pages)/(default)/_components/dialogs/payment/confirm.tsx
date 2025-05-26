"use client";

import React, { useCallback, useState } from "react";
import Button from "@/app/_components/shared/button";
import { CloseIcon } from "@/app/_assets/svg/close";
import { DollarScoreIcon } from "@/app/_assets/svg/dollar";
import { formatNumber } from "@/app/_utils/number";

export type TClose = {
  price?: number;
  title?: string;

  onClose?: () => Promise<void> | void;
  handlePay?: () => Promise<void> | void;
  onDeposit?: () => Promise<void> | void;
  onPayDirect?: () => Promise<void> | void;
};

export default function ConfirmPayment({
  title,
  price,

  onClose,
  handlePay,
  onDeposit,
  onPayDirect,
}: TClose) {
  const [isPending, setIsPending] = useState(false);

  const handelPayment = useCallback(async () => {
    setIsPending(true);
    try {
      await handlePay?.();
    } catch {
      // console.log("error", error);
    } finally {
      setIsPending(false);
    }
  }, [handlePay]);

  return (
    <>
      <div className="bg-[#F5D6B1] rounded-t-2xl py-4 px-2 shadow-md border-2 border-[#A96415] flex flex-col">
        <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
          <CloseIcon onClick={onClose} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-[#491F36] font-bumper-sticker text-[22px] pt-2 pb-4 font-bold leading-normal">
            CONFIRM PURCHASE
          </span>
        </div>
        <div className="px-2 flex flex-col gap-y-2">
          <div>
            <div className="bg-[#E3BEAA] rounded-t-[22px] p-2 w-full flex flex-col gap-y-1">
              <span className="text-[#6C4C5F] font-made-tommy text-[16px] font-bold leading-normal text-center">
                Confirm: Buy an Item
              </span>
              <div className="flex justify-center items-center gap-x-2 font-made-tommy text-[#5F3F57] text-[22px] font-bold leading-normal">
                <DollarScoreIcon />
                {formatNumber(price || 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="bg-[#5F3F57] rounded-b-[22px] p-1 w-full flex flex-col gap-y-1">
              <span className="text-[#E3BEAA] font-made-tommy text-[16px] font-bold leading-normal text-center">
                {title?.toUpperCase?.()}
              </span>
            </div>
          </div>
          <Button
            className="rounded-[10px] border w-[80%] mx-auto border-[#91FF6A] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 flex flex-col"
            onClick={handelPayment}
            disabled={isPending}
          >
            <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px]/[18px] font-extrabold leading-normal tracking-[0.4px]">
              {isPending ? "PAYING..." : "PAY"}
            </span>
          </Button>
        </div>
      </div>
      <div className="bg-[#F5D6B1] rounded-b-2xl py-2.5 shadow-md border-2 border-[#A96415] border-t-1 border-t-[#A96415] flex -mt-4 gap-x-2 px-4 pb-6">
        <Button
          className="rounded-[6px] border border-[#CDEBEE] bg-gradient-to-b from-[#A291FF] to-[#856FFF] p-2 py-1 flex flex-col w-full"
          onClick={onDeposit}
        >
          <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[16px]/[16px] font-extrabold leading-normal tracking-[0.4px]">
            DEPOSIT FUNDS
          </span>
        </Button>
        <Button
          className="rounded-[6px] border border-[#CDEBEE] bg-gradient-to-b from-[#A291FF] to-[#856FFF] p-2 py-1 flex flex-col w-full"
          onClick={onPayDirect}
        >
          <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[16px]/[16px] font-extrabold leading-normal tracking-[0.4px]">
            PAY DIRECTLY
          </span>
        </Button>
      </div>
    </>
  );
}
