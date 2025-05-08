'use client';

//import modules
import { useState } from "react";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import NavigationButton from "@/app/(pages)/(default)/_components/profile/navigateBtn";
import { BalanceHeader } from "@/app/(pages)/(default)/_components/banking/BalanceHeader";
import { DepositSection } from "@/app/(pages)/(default)/_components/banking/DepositSection";
import { WithdrawSection } from "@/app/(pages)/(default)/_components/banking/WithdrawSection";

//import assets
import topArrowClick from "@assets/svg/top-click.svg";
import topArrow from "@assets/svg/top.svg";
import downArrowClick from "@assets/svg/down-click.svg";
import downArrow from "@assets/svg/down.svg";
import { CloseIcon } from "@/app/_assets/svg/close";

type BankingComponent = "deposit" | "withdraw";

//interface
interface BankDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BankDialog = ({ isOpen, onClose, }: BankDialogProps) => {
  const [activeComponent, setActiveComponent] = useState<BankingComponent>("deposit");
  const [isConnected, setIsConnected] = useState(true);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px] z-10" />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] h-[83%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon onClick={onClose} />
            </div>
            <BalanceHeader activeComponent={activeComponent} />
            <div className="bg-[#F5D6B1] rounded-2xl p-3 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto">
              <div className="flex justify-center gap-1.5">
                <NavigationButton
                  icon={activeComponent === "deposit" ? topArrowClick : topArrow}
                  label="Deposit"
                  isActive={activeComponent === "deposit"}
                  onClick={() => setActiveComponent("deposit")}
                />
                <NavigationButton
                  icon={activeComponent === "withdraw" ? downArrowClick : downArrow}
                  label="Withdraw"
                  isActive={activeComponent === "withdraw"}
                  onClick={() => setActiveComponent("withdraw")}
                />
              </div>
              {activeComponent === "deposit" && (
                <DepositSection
                  isConnected={isConnected}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              )}
              {activeComponent === "withdraw" && (
                <WithdrawSection
                  isConnected={!isConnected}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              )}
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default BankDialog;