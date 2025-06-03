"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/shared/button";
import { CloseIcon } from "@/app/_assets/svg/close";
import brown_dollar_circle from "@assets/svg/brown-dollar-circle.svg";
import { formatNumber } from "@/app/_utils/number";
import { cn } from "@/app/_lib/utils";
import { WalletIcon } from "@/app/_assets/svg/wallet";

const defaultContent = {
  title: "CONFIRM PURCHASE",
  itemTime: "Buy an Item",
  description: "",
  button: "PAY",
};

export type TClose = {
  price?: number;
  title?: string;

  onClose?: () => Promise<void> | void;
  handlePay?: () => Promise<void> | void;
  onDeposit?: () => Promise<void> | void;
  onPayDirect?: () => Promise<void> | void;

  content?: {
    title?: React.ReactNode | string;
    itemTime?: React.ReactNode | string;
    description?: React.ReactNode | string;
    button?: React.ReactNode | string;
  };
};

export default function ConfirmPayment({
  title,
  price,

  onClose,
  handlePay,
  onDeposit,
  onPayDirect,

  content,
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
      <div className="bg-[#F5D6B1] rounded-2xl py-4 px-2 shadow-md border-2 border-[#A96415] flex flex-col gap-y-3">
        <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
          <CloseIcon onClick={onClose} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <span
            className={cn(
              "text-[#5F3F57] text-center font-bumper-sticker text-[26px]",
              "flex justify-center items-center gap-1.5"
            )}
          >
            {content?.title || defaultContent.title}
          </span>
        </div>
        <div className="px-2 flex flex-col gap-y-2">
          <div className="flex flex-col rounded-3xl contain-content bg-[#E3BEAA] ">
            <div className="p-2 w-full flex flex-col gap-y-1">
              <span className="text-[#6C4C5F] font-made-tommy text-[16px] font-bold leading-normal text-center">
                Confirm: {content?.itemTime || defaultContent?.itemTime}
              </span>
              <div className="flex justify-center items-center gap-x-2 text-[#5F3F57] text-center font-made-tommy text-[24px] font-bold">
                <Image
                  src={brown_dollar_circle}
                  alt="brown_dollar_circle"
                />
                {formatNumber(price || 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            {content?.description ? (
              <>
                <hr className="border-[rgba(138,105,114,0.20)] border-1" />
                <p className="text-[rgba(95,63,87,0.75)] leading-[28px] text-center font-bumper-sticker text-[10px]">
                  {content?.description || defaultContent?.description}
                </p>
              </>
            ) : (
              <div className="bg-[#5F3F57] p-1 w-full flex flex-col gap-y-1">
                <span className="text-[#E3BEAA] font-made-tommy text-[16px] font-bold leading-normal text-center">
                  {title?.toUpperCase?.()}
                </span>
              </div>
            )}
          </div>
          <Button
            className="rounded-[10px] h-[34px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] mx-5"
            onClick={handelPayment}
            disabled={isPending}
          >
            <span className="text-[#EEFDF4] text-center font-bumper-sticker text-[18px] xs:text-[20px] tracking-[0.18px] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)] font-normal">
              {isPending
                ? "PAYING..."
                : content?.button || defaultContent?.button}
            </span>
          </Button>
        </div>
        <hr className="border-[#A96415] border-0.5 -mx-2 mt-2" />
        <div className="flex gap-2 justify-between">
          <Button
            className="w-full flex flex-1 gap-1 items-center justify-center h-[28px] rounded-[6px]"
            onClick={onDeposit}
          >
            <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] uppercase">
              Deposit funds
            </span>
          </Button>
          <Button
            className="w-full flex flex-1 gap-1 items-center justify-center h-[28px] rounded-[6px]"
            onClick={onPayDirect}
          >
            <WalletIcon width={12} color="#FFF" />
            <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] uppercase">
              Pay Directly
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
