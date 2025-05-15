import { cn } from "@/app/_lib/utils";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { CheckIcon } from "@/app/_assets/svg/check";
import { BonusIcon, BonusDescIcon } from "@/app/_assets/svg/bonus";
import { TapCopyIcon } from "@/app/_assets/svg/copy";
import Button from "@/app/_components/shared/button";
import { WalletConnection } from "./WalletConnection";
import { AvalancheIcon, BSCIcon, EthereumIcon, USDCIcon, USDTIcon } from "@/app/_assets/svg/coin";
import { Select } from "@/app/_components/shared/select";

interface DepositSectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const DepositSection = ({ isConnected, onConnect, onDisconnect }: DepositSectionProps) => {
  const handleCopy = () => {
    const address = "0x10e0271ec47d55511a047516f2a7301801d55eab";
    navigator.clipboard?.writeText(address);
  };

  return (
    <div className="mt-3 rounded-[7px] flex flex-1 flex-col w-full px-2 overflow-y-auto bg-[#E3BEAA] py-3 h-full max-h-[calc(100vh-200px)]">
      <div className="flex flex-col h-full p-2 pb-3 bg-[#EED1B8] rounded-t-[15px] gap-1.5 border-b-1 border-[#E3BEAA]">
        <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal pt-1 px-2">
          Deposit From EXTERNAL Wallet
        </span>
        <WalletConnection isConnected={isConnected} onConnect={onConnect} onDisconnect={onDisconnect} />
        {isConnected && (
          <div className="flex flex-col gap-2 bg-[#F5DDC4] border-1 border-[#D1B69F] rounded-[10px] p-2">
            <div className="flex gap-2 justify-center items-center">
              <Select
                triggerClassName="flex-3 rounded-[20px]"
                defaultValue="USDC"
                options={[
                  {
                    value: "USDC",
                    label: (
                      <div className="flex items-center gap-1">
                        <USDCIcon width={20} height={20} />
                        <span>USDC</span>
                      </div>
                    ),
                  },
                  {
                    value: "USDT",
                    label: (
                      <div className="flex items-center gap-1">
                        <USDTIcon width={20} height={20} />
                        <span>USDT</span>
                      </div>
                    ),
                  },
                ]}
              />
              <div className="flex-2 rounded-[5px] border border-[#D1B69F] bg-gradient-to-b from-[#D0D0D0] to-[#F4F4F0] shadow-[inset_0px_3px_6px_0px_rgba(0,0,0,0.20)] flex justify-center items-center pl-2">
                <input
                  type="number"
                  className="text-[#5F3F57] font-made-tommy font-bold text-[16px] py-0.5 pt-1.5 w-full bg-transparent outline-none"
                  placeholder="0.00"
                  defaultValue="999.99"
                />
              </div>
              <span className="flex-3 text-[#7C5C6B] font-made-tommy font-bold text-[12px]">
                ≈ 978.99 USD
              </span>
            </div>
            <div className="flex justify-start items-center">
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[12px] px-2">
                Available: 1024.33 USDC
              </span>
              <span className="text-[#653F56] font-made-tommy font-bold text-[12px] px-1 border border-[#917377] rounded-[5px] -mt-1 bg-[#EED1B8] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]">MAX</span>
            </div>
            <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257] py-0.5">
              <CheckIcon color="#ffffff" className="w-3 h-3 -mt-1" />
              <span className="text-white font-made-tommy font-extrabold text-[14px] tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Confirm
              </span>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 pb-3 bg-[#EED1B8] rounded-b-[15px] gap-0.5">
        <div className="flex flex-col gap-1">
          <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal pt-1 px-2">SEND TO PLATFORM WALLET</span>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Select Currency</span>
              <Select
                defaultValue="USDC"
                options={[
                  {
                    value: "USDC",
                    label: (
                      <div className="flex items-center gap-1">
                        <USDCIcon width={20} height={20} />
                        <span>USDC</span>
                      </div>
                    ),
                  },
                  {
                    value: "USDT",
                    label: (
                      <div className="flex items-center gap-1">
                        <USDTIcon width={20} height={20} />
                        <span>USDT</span>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Select Network</span>
              <Select
                defaultValue="Avalanche"
                options={[
                  {
                    value: "Avalanche",
                    label: (
                      <div className="flex items-center gap-1">
                        <AvalancheIcon width={16} height={14} />
                        <span>Avalanche</span>
                      </div>
                    ),
                  },
                  {
                    value: "Ethereum",
                    label: (
                      <div className="flex items-center gap-1">
                        <EthereumIcon width={16} height={18} />
                        <span>Ethereum</span>
                      </div>
                    ),
                  },
                  {
                    value: "BSC",
                    label: (
                      <div className="flex items-center gap-1">
                        <BSCIcon width={16} height={14} />
                        <span>BSC</span>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Deposit Address</span>
              <div className={cn(
                "flex w-full items-center justify-center rounded-t-[10px] bg-[#D1B69F] px-2 py-1.5 text-sm text-[#745061] border-1 border-[#917377] border-b-0",
              )}>
                <span className="text-[#5F3F57] font-made-tommy font-semibold text-[12px] truncate">0x10e0271ec47d55511a047516f2a7301801d</span>
                <span className="text-[#5F3F57] font-made-tommy font-semibold text-[12px] whitespace-nowrap">55eab</span>
              </div>
              <div className={cn(
                "flex w-full items-center justify-center gap-1 rounded-b-[10px] bg-[#917377] px-3 py-0.5 text-sm text-[#745061] border-1 border-[#917377] border-t-0 cursor-pointer",
              )} onClick={handleCopy}>
                <TapCopyIcon /><span className="text-[#EED1B8] font-bumper-sticker font-normal text-[12px]">TAP TO COPY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#E99F8C] rounded-[10px] mt-1.5 p-1 px-2 gap-2">
          <span className="bg-[#853834] rounded-full w-4.5 h-4.5 px-2 flex items-center justify-center text-[#EED1B8] text-[12px]">i</span>
          <span className="text-[#853834] font-made-tommy text-[10px] font-bold leading-normal">
            Please only deposit USDC on Avalanche (AVAX C-Chain) to this address
          </span>
        </div>
        <div className="flex flex-col mt-1.5">
          <div className={cn(
            "flex w-full items-center justify-center gap-1 rounded-t-[10px] bg-[#126529] px-3 py-1 text-sm text-[#745061] border-1 border-[#917377] border-b-0",
          )}>
            <BonusIcon className="w-4 h-4" />
            <span className="text-[#A2BAA6] font-bumper-sticker font-normal text-[12px]">BONUS APPLIED</span>
          </div>
          <div className="flex bg-[#A2BAA6] justify-start px-3 py-1 border-b-1 border-[#12652933]">
            <span className="text-[#126529] font-made-tommy font-bold text-[12px]">
              2X on your first deposit, up to 20 USD!
            </span>
          </div>
          <div className="flex bg-[#A2BAA6] justify-center items-start border-b-1 border-[#12652933] rounded-b-[10px] p-2 py-1.5 gap-1">
            <BonusDescIcon className="w-20" />
            <span className="text-[#126529A8] font-made-tommy font-medium text-[12px]">
              2.5X wagering requirement to unlock deposit bonus for withdrawal. Example: wager 25 USD to unlock 10 USD of bonus funds for withdrawal.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 