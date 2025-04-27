import { cn } from "@/app/_lib/utils";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { CheckIcon } from "@/app/_assets/svg/check";
import { SendIcon } from "@/app/_assets/svg/send";
import Button from "@/app/_components/shared/button";
import { WalletConnection } from "./WalletConnection";

interface WithdrawSectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WithdrawSection = ({ isConnected, onConnect, onDisconnect }: WithdrawSectionProps) => {
  return (
    <div className="mt-3 rounded-[7px] flex flex-1 flex-col w-full px-2 overflow-y-auto bg-[#E3BEAA] py-3">
      <div className="flex flex-col h-full p-2 pb-3 bg-[#EED1B8] rounded-t-[15px] gap-1.5 border-b-1 border-[#E3BEAA]">
        <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal pt-1 px-2">
          withdraw From EXTERNAL Wallet
        </span>
        <WalletConnection isConnected={isConnected} onConnect={onConnect} onDisconnect={onDisconnect} />
        {isConnected && (
          <div className="flex flex-col gap-2 bg-[#F5DDC4] border-1 border-[#D1B69F] rounded-[10px] p-2">
            <div className="flex gap-2 justify-center items-center">
              <div className={cn(
                "flex flex-col flex-1 items-center justify-between rounded-[10px] bg-[#D1B69F] p-1 text-sm text-[#745061]",
              )}>
                <div className="flex items-center gap-1 w-full justify-between px-2 py-1 h-7">
                  <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">USDC</span>
                  <RightArrow className="w-4 h-4 rotate-90" color="#917377" shadow={false} />
                </div>
              </div>
              <div className="rounded-[5px] border border-[#D1B69F] bg-gradient-to-b from-[#D0D0D0] to-[#F4F4F0] shadow-[inset_0px_3px_6px_0px_rgba(0,0,0,0.20)] flex justify-start items-center px-2 h-full flex-1">
                <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">999.99</span>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[12px] px-2">
                ~4.06 USDC max.
              </span>
            </div>
            <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]">
              <CheckIcon color="#ffffff" className="w-3 h-3 -mt-1" />
              <span className="text-white font-made-tommy font-extrabold text-[12px] tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Confirm
              </span>
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col p-2 pb-3 bg-[#EED1B8] rounded-b-[15px] gap-0.5">
        <div className="flex flex-col gap-1">
          <span className="text-[#745061] font-bumper-sticker text-[16px] font-normal leading-normal pt-1 px-2">withdraw to address</span>
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Select Currency</span>
              <div className={cn(
                "flex flex-col w-full items-center justify-between rounded-[10px] bg-[#D1B69F] p-1 text-sm text-[#745061]",
              )}>
                <div className="flex items-center gap-1 w-full justify-between px-2 py-1 h-7">
                  <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">USDC</span>
                  <RightArrow className="w-4 h-4 rotate-90" color="#917377" shadow={false} />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Select Network</span>
              <div className={cn(
                "flex flex-col w-full items-center justify-between rounded-[10px] bg-[#D1B69F] p-1 text-sm text-[#745061]",
              )}>
                <div className="flex items-center gap-1 w-full justify-between px-2 py-1 h-7">
                  <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px]">Avalanche</span>
                  <RightArrow className="w-4 h-4 rotate-90" color="#917377" shadow={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex flex-col w-full">
              <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Withdrawal Address</span>
              <div className="rounded-[5px] border border-[#D1B69F] bg-gradient-to-b from-[#D0D0D0] to-[#F4F4F0] shadow-[inset_0px_3px_6px_0px_rgba(0,0,0,0.20)] flex justify-center items-center px-2 h-full">
                <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px] py-0.5 pt-1.5">
                  0x10e0271ec47d55511a047516fxed3
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-[#E99F8C] rounded-[10px] mt-1.5 p-2 gap-2">
          <span className="bg-[#853834] rounded-full w-4.5 h-4.5 px-2 flex items-center justify-center text-[#EED1B8] text-[12px]">i</span>
          <span className="text-[#853834] font-made-tommy text-[10px] font-bold leading-normal">
            Please make sure the address accepts USDC on Avalanche (AVAX C-Chain). Funds cannot be recovered
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">Withdrawal Amount</span>
            <div className="rounded-[5px] border border-[#D1B69F] bg-gradient-to-b from-[#D0D0D0] to-[#F4F4F0] shadow-[inset_0px_3px_6px_0px_rgba(0,0,0,0.20)] flex justify-start items-center px-2 h-full">
              <span className="text-[#5F3F57] font-made-tommy font-bold text-[14px] py-0.5 pt-1.5">
                4.06
              </span>
            </div>
            <div className="flex flex-col gap-0 mt-2">
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[10px] px-3">
                Max: 4.06 USDC
              </span>
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[10px] px-3">
                Transaction fee: 4.06 USDC
              </span>
              <span className="text-[#7C5C6B] font-made-tommy font-bold text-[10px] px-3">
                Will recieve: 4.06 USDC
              </span>
            </div>
          </div>
        </div>
        <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257] mt-2">
          <SendIcon color="#ffffff" className="w-3 h-3" />
          <span className="text-white font-made-tommy font-extrabold text-[12px] tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
            Send It
          </span>
        </Button>
      </div>
    </div>
  );
}; 