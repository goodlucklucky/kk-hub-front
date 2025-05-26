"use client";

import { CloseIcon } from "@/app/_assets/svg/close";
import WagmiConnectButton from "@/app/_components/shared/wagmiWallet";
import React, { useMemo } from "react";
import Button from "@/app/_components/shared/button";
import { CheckIcon } from "@/app/_assets/svg/check";
import { useAccount } from "wagmi";
import { cn } from "@/app/_lib/utils";
import { TItem } from "./type";
import { formatNumber } from "@/app/_utils/number";
import { Select } from "../../banking/forms";
import { useThirdweb } from "../../../_context/thirdwebContext";
import { UsdcIcon, UsdtIcon } from "@/app/_assets/svg/etc";
import { useToken } from "../../../_context/tokenContext";
import { LoaderIcon } from "react-hot-toast";

export type TClose = {
  item?: TItem;

  onClose?: () => Promise<void> | void;
  handleConfirm?: () => Promise<void> | void;
};

export default function PaymentStage({ item, onClose, handleConfirm }: TClose) {
  const { isConnected } = useAccount();
  const { selectedCurrency, setSelectedCurrency } = useThirdweb();
  const { isLoadingAvailable, balances } = useToken();

  const isBalanceSufficient = useMemo(() => {
    return (Number(balances?.[selectedCurrency]) || 0) >= (item?.price || 0);
  }, [balances, selectedCurrency, item?.price]);

  return (
    <div className="bg-[#F5D6B1] rounded-2xl py-4 px-4 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-3">
      <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
        <CloseIcon onClick={onClose} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-[#491F36] font-bumper-sticker text-[22px] pt-2 font-bold leading-normal flex gap-2 items-center">
          {isConnected ? "PAY DIRECTLY" : "CONNECT WALLET"}
        </span>
      </div>
      <div
        className={cn(
          "w-full",
          isConnected &&
            "flex flex-col items-center gap-x-1 gap-y-2 bg-[#E3BEAA] rounded-[17px] p-2"
        )}
      >
        <WagmiConnectButton />
        {isConnected && (
          <>
            <div className="flex gap-2 justify-around items-center w-full">
              <Select
                className="w-auto"
                name="currency"
                options={[
                  { label: "USDC", value: "usdc", icon: <UsdcIcon /> },
                  { label: "USDT", value: "usdt", icon: <UsdtIcon /> },
                ]}
                value={selectedCurrency}
                onChange={setSelectedCurrency as any}
              />
              <span className="text-[#745061] font-bumper-sticker text-2xl font-bold leading-normal">
                $
                {formatNumber(item?.price || 0, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-start items-center">
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[12px] px-2 flex items-center gap-1 flex-wrap">
                <span>Available:</span>
                {isLoadingAvailable ? (
                  <LoaderIcon className="size-5 inline" />
                ) : (
                  <span>{balances?.[selectedCurrency]}</span>
                )}
                {selectedCurrency?.toUpperCase()}
              </span>
              <span className="text-[#653F56] font-made-tommy font-bold text-[12px] px-2 border border-[#917377] rounded-[5px] -mt-1 bg-[#EED1B8]">
                {isBalanceSufficient ? "MAX" : "INSUFFICIENT BALANCE"}
              </span>
            </div>
          </>
        )}
      </div>
      {isConnected && (
        <Button
          className="rounded-[10px] border w-full mx-auto border-[#91FF6A] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] p-2 py-1 flex items-center justify-center gap-x-1"
          onClick={handleConfirm}
          disabled={!isBalanceSufficient}
        >
          <CheckIcon color={"#ffffff"} className="w-3.5" />
          <span className="text-[#EFF6FF] text-center text-shadow-[0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px]/[18px] font-extrabold leading-normal tracking-[0.4px]">
            Confirm Payment
          </span>
        </Button>
      )}
      <span className="font-made-tommy text-[10px] font-bold text-[#5F3F57BF]">
        Accepted coins (Avalanche C-Chain): USDC, USDT
      </span>
    </div>
  );
}
