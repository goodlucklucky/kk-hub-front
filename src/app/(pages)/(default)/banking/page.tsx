"use client";

//import modules
import { useState } from "react";
//import components
import NavigationButton from "../_components/profile/navigateBtn";
import { BalanceHeader } from "../_components/banking/BalanceHeader";
import { DepositSection } from "../_components/banking/DepositSection";
import { WithdrawSection } from "../_components/banking/WithdrawSection";

//import assets
import topArrowClick from "@assets/svg/top-click.svg";
import topArrow from "@assets/svg/top.svg";
import downArrowClick from "@assets/svg/down-click.svg";
import downArrow from "@assets/svg/down.svg";
import { CloseIcon } from "@/app/_assets/svg/close";

type BankingComponent = "deposit" | "withdraw";

export default function Banking() {
  const [activeComponent, setActiveComponent] = useState<BankingComponent>("deposit");
  const [isConnected, setIsConnected] = useState(true);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px] z-10" />
      <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] h-[83%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
        <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
          <CloseIcon />
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
    </>
  );
}
