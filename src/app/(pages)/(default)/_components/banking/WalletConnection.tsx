import { cn } from "@/app/_lib/utils";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import Button from "@/app/_components/shared/button";

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnection = ({
  isConnected,
  onConnect,
  onDisconnect,
}: WalletConnectionProps) => {
  if (!isConnected) {
    return (
      <Button
        className={cn(
          "flex gap-2 items-center justify-center font-bumper-sticker rounded-[6px] font-bold w-full py-[2px]"
        )}
        onClick={onConnect}
      >
        <WalletIcon color="#ffffff" className="w-3 h-3" />
        <span className="drop-shadow-md text-[16px]">CONNECT WALLET</span>
      </Button>
    );
  }

  return (
    <div className="flex justify-between w-full gap-x-1">
      <div className="flex bg-[#C7A797] w-full rounded-[17px] p-2 items-center gap-x-1">
        <WalletIcon />
        <div className="w-1 h-1 p-1 bg-[#126529] rounded-full" />
        <div className="flex justify-between items-center w-full text-[#5F3F57] font-bumper-sticker text-[16px] font-bold leading-normal">
          <span>CONNECTED</span>
          <span className="font-made-tommy text-[12px] font-bold leading-normal">
            0x10dx...5eab
          </span>
        </div>
      </div>
      <CloseSocialIcon className="w-10 h-10" onClick={onDisconnect} />
    </div>
  );
};
