import React from "react";
import Image from "next/image";
import { formatNumber } from "@/app/_utils/number";
import { CloseIcon } from "@/app/_assets/svg/close";
import Button from "@/app/_components/shared/button";
import { TItem } from "./type";

export type TClose = {
  item?: TItem;

  onClose?: () => Promise<void> | void;
  handleBuy?: () => Promise<void> | void;
};

export default function InitialScreen({ item, onClose, handleBuy }: TClose) {
  return (
    <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col">
      <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
        <CloseIcon onClick={onClose} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-[#491F36] font-bumper-sticker text-[22px] pt-2 pb-4 font-bold leading-normal">
          {item?.title}
        </span>
      </div>
      <div className="bg-[#EED1B8] rounded-[22px] p-3 px-1 overflow-y-auto flex flex-col gap-y-1 justify-center items-center">
        <div className="w-35 h-40 rounded-[6px] border border-white bg-gradient-to-br from-[rgba(255,248,183,0.75)] to-[rgba(246,237,197,0.75)] p-[15px] rotate-[8deg]">
          {item && (
            <Image
              src={item?.icon || ""}
              alt={item?.title || ""}
              fill
              style={{ objectFit: "contain" }}
              sizes="100%"
              priority
            />
          )}
        </div>
        <span className="text-[#5F3F57] font-made-tommy text-[22px] font-bold leading-normal pt-4">
          {item?.name}
        </span>
        <span className="text-[#745061] font-made-tommy text-[16px] font-bold leading-normal text-center">
          {item?.description}
        </span>
        <div className="bg-[#E3BEAA] rounded-[14px] p-2 w-full flex flex-col gap-y-2">
          <Button
            className="!shadow-[0_1px] !shadow-[#2C7C4C] rounded-[14px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 w-full flex flex-col"
            onClick={handleBuy}
          >
            <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[20px]/[20px] font-extrabold leading-normal tracking-[0.4px]">
              Buy
            </span>
          </Button>
          <span className="text-[#5F3F57] font-made-tommy text-[16px] font-bold leading-normal text-center">
            {formatNumber(item?.price || 0, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
