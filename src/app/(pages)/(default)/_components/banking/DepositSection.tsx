import { cn } from "@/app/_lib/utils";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { CheckIcon } from "@/app/_assets/svg/check";
import { BonusIcon, BonusDescIcon } from "@/app/_assets/svg/bonus";
import { TapCopyIcon } from "@/app/_assets/svg/copy";
import Button from "@/app/_components/shared/button";
import { useCallback, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import WagmiConnectButton from "@/app/_components/shared/wagmiWallet";
import { Input, Select } from "./forms";
import { UsdcIcon, UsdtIcon } from "@/app/_assets/svg/etc";
import { useToken } from "../../_context/tokenContext";
import { useActiveAccount } from "thirdweb/react";
import { useThirdweb } from "../../_context/thirdwebContext";

interface DepositSectionProps {
  isConnected: boolean;
}

export const DepositSection = ({ isConnected }: DepositSectionProps) => {
  const {
    selectedCurrency,
    setSelectedCurrency,
    balance: { refresh: refreshBalance },
  } = useThirdweb();
  const { isLoadingAvailable, isTransferPending, transfer, balances } =
    useToken();

  const [amount, setAmount] = useState(0);
  const account = useActiveAccount();

  const handleCopy = useCallback(async () => {
    try {
      await window.navigator.clipboard.writeText(
        // account?.address || ""
        account?.address || ""
      );
      toast.success("Copied to clipboard");
    } catch {
      // console.error("handleCopy error: ", error);
      toast.error("Failed to copy to clipboard");
    }
  }, [account?.address]);

  const handleTransfer = useCallback(async () => {
    try {
      await transfer?.(account?.address as `0x${string}`, `${amount}`);

      toast.success("Transfer successful");

      setTimeout(() => {
        refreshBalance?.();
      }, 5000);
    } catch {
      // console.log("handleTransfer error: ", error);
      toast.error("Failed to transfer");
    }
  }, [amount, transfer, account?.address, refreshBalance]);

  return (
    <div className="mt-3 rounded-[7px] flex flex-1 flex-col w-full px-2 overflow-y-auto bg-[#E3BEAA] py-3 h-full max-h-[calc(100vh-200px)]">
      <div className="flex flex-col h-full p-2 pb-3 bg-[#EED1B8] rounded-t-[15px] gap-1.5 border-b-1 border-[#E3BEAA]">
        <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal pt-1 px-2">
          Deposit From EXTERNAL Wallet
        </span>
        <WagmiConnectButton />
        {isConnected && (
          <div className="flex flex-col gap-2 bg-[#F5DDC4] border-1 border-[#D1B69F] rounded-[10px] p-2">
            <div className="flex gap-2 justify-center items-center">
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
              <Input
                defaultValue={balances?.[selectedCurrency] || 0}
                onChange={(e) => setAmount(e?.target?.valueAsNumber || 0)}
                max={balances?.[selectedCurrency] || 0}
                type="number"
                className="w-full h-9 py-0"
              />
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[12px] leading-3 min-w-12 text-end">
                ≈ 978.99 USD
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
                MAX
              </span>
            </div>
            <Button
              className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]"
              disabled={isTransferPending}
              onClick={handleTransfer}
            >
              <CheckIcon color="#ffffff" className="size-3 -mt-1" />
              <span className="text-white font-made-tommy font-extrabold text-[12px] tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                {isTransferPending ? "Sending..." : "Confirm"}
              </span>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 pb-3 bg-[#EED1B8] rounded-b-[15px] gap-0.5">
        <div className="flex flex-col gap-1">
          <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal pt-1 px-2">
            Transfer crypto
          </span>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">
                Select Currency
              </span>
              <div
                className={cn(
                  "flex flex-col w-full items-center justify-between rounded-[10px] bg-[#D1B69F] p-1 text-sm text-[#745061]"
                )}
              >
                <div className="flex items-center gap-1 w-full justify-between px-2 py-1 h-7">
                  <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">
                    USDC
                  </span>
                  <RightArrow
                    className="w-4 h-4 rotate-90"
                    color="#917377"
                    shadow={false}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">
                Select Network
              </span>
              <div
                className={cn(
                  "flex flex-col w-full items-center justify-between rounded-[10px] bg-[#D1B69F] p-1 text-sm text-[#745061]"
                )}
              >
                <div className="flex items-center gap-1 w-full justify-between px-2 py-1 h-7">
                  <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">
                    Avalanche
                  </span>
                  <RightArrow
                    className="w-4 h-4 rotate-90"
                    color="#917377"
                    shadow={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">
                Deposit Address
              </span>
              <div
                className={cn(
                  "flex flex-col w-full items-center justify-between rounded-t-[10px] bg-[#D1B69F] px-3 py-2 text-sm text-[#745061] border-1 border-[#917377] border-b-0"
                )}
              >
                <span className="text-[#5F3F57] font-made-tommy font-semibold text-[12px] break-words max-w-full">
                  {/* {account?.address} */}
                  {account?.address}
                </span>
              </div>
              <div
                className={cn(
                  "flex w-full items-center justify-center gap-1 rounded-b-[10px] bg-[#917377] px-3 py-0.5 text-sm text-[#745061] border-1 border-[#917377] border-t-0"
                )}
                onClick={handleCopy}
              >
                <TapCopyIcon />
                <span className="text-[#EED1B8] font-bumper-sticker font-normal text-[12px]">
                  TAP TO COPY
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#E99F8C] rounded-[10px] mt-1.5 p-2 gap-2">
          <span className="bg-[#853834] rounded-full w-4.5 h-4.5 px-2 flex items-center justify-center text-[#EED1B8] text-[12px]">
            i
          </span>
          <span className="text-[#853834] font-made-tommy text-[10px] font-bold leading-normal">
            Please only deposit USDC on Avalanche (AVAX C-Chain) to this address
          </span>
        </div>
        <div className="flex flex-col mt-1.5">
          <div
            className={cn(
              "flex w-full items-center justify-center gap-1 rounded-t-[10px] bg-[#126529] px-3 py-1 text-sm text-[#745061] border-1 border-[#917377] border-b-0"
            )}
          >
            <BonusIcon className="w-4 h-4" />
            <span className="text-[#A2BAA6] font-bumper-sticker font-normal text-[12px]">
              BONUS APPLIED
            </span>
          </div>
          <div className="flex bg-[#A2BAA6] justify-start px-3 py-1 border-b-1 border-[#12652933]">
            <span className="text-[#126529] font-made-tommy font-bold text-[12px]">
              2X on your first deposit, up to 20 USD!
            </span>
          </div>
          <div className="flex bg-[#A2BAA6] justify-center items-start border-b-1 border-[#12652933] rounded-b-[10px] p-2 py-1.5 gap-1">
            <BonusDescIcon className="w-20" />
            <span className="text-[#126529A8] font-made-tommy font-medium text-[12px]">
              2.5X wagering requirement to unlock deposit bonus for withdrawal.
              Example: wager 25 USD to unlock 10 USD of bonus funds for
              withdrawal.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
