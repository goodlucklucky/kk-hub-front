import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import Button from "./button";
import { cn } from "@/app/_lib/utils";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import { useCallback } from "react";

export default function WagmiConnectButton() {
  const { open } = useWeb3Modal();
  const { disconnectAsync } = useDisconnect();
  const { address, isConnected } = useAccount();

  const chainId = useChainId();

  const getChainName = useCallback((id: number) => {
    const chains: { [key: number]: string } = {
      1: "Ethereum",
      56: "BSC",
      43114: "Avalanche",
      11155111: "Sepolia",
    };
    return chains[id] || `Chain ${id}`;
  }, []);

  const formatAddress = useCallback((addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  }, []);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnectAsync();
    } catch {
      // console.log("error", error);
    }
  }, [disconnectAsync]);

  if (isConnected && address) {
    return (
      <div className="flex justify-between w-full gap-x-1">
        <div
          className="flex bg-[#C7A797] w-full rounded-[17px] p-2 items-center gap-x-1"
          onClick={() => open({ view: "Account" })}
        >
          <WalletIcon />
          <div className="w-1 h-1 p-1 bg-[#126529] rounded-full" />
          <div className="flex justify-between items-center w-full text-[#5F3F57] font-bumper-sticker text-[16px] font-bold leading-normal">
            <span>CONNECTED</span>
            <span className="text-made-tommy text-[12px] leading-3 font-bold text-end">
              <span>{formatAddress(address)}</span>
              <br />
              <small>{getChainName(chainId)}</small>
            </span>
          </div>
        </div>
        <CloseSocialIcon className="w-10 h-10" onClick={handleDisconnect} />
      </div>
    );
  }

  return (
    <Button
      className={cn(
        "flex gap-2 items-center justify-center font-bumper-sticker rounded-[6px] font-normal w-full py-[2px] tracking-[0.32px]"
      )}
      onClick={async () => {
        try {
          // console.log("open");
          // const a = await open({ view: "Connect" });
          await open({ view: "Connect" });
          // console.log("a", a);
        } catch {
          // console.log("error", error);
        }
      }}
    >
      <WalletIcon color="#ffffff" className="w-3 h-3" />
      <span className="drop-shadow-md text-[16px]">CONNECT WALLET</span>
    </Button>
  );
}
