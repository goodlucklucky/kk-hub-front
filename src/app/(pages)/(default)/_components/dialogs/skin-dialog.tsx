"use client";

//import modules
import Image from "next/image";
import { useState } from "react";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import Button from "@/app/_components/shared/button";

//import icons
import { CheckIcon } from "@assets/svg/check";
import { FalseIcon } from "@/app/_assets/svg/false";

import AvalancheIcon from "@assets/images/powered-avalanche.png";
import SpinnerIcon from "@assets/images/spinner.svg";
import ConfirmPayment from "./payment/confirm";
import PaymentStage from "./payment/payment";
import InitialScreen from "./payment/initial";

//interface
interface SkinDialogProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
}

type DialogState =
  | "initial"
  | "confirm"
  | "wallet"
  | "payment"
  | "success"
  | "error"
  | "loading";

const SkinDialog = ({ isOpen, onClose, item }: SkinDialogProps) => {
  const [dialogState, setDialogState] = useState<DialogState>("initial");
  // console.log("Item**********", item);
  const handleBuy = () => {
    setDialogState("confirm");
  };

  const handlePay = () => {
    setDialogState("wallet");
  };

  const handleConfirmPayment = () => {
    setDialogState("loading");
    setTimeout(() => {
      setDialogState("success");
    }, 4000);
  };

  const renderDialogContent = () => {
    switch (dialogState) {
      case "initial":
        return (
          <InitialScreen
            item={{
              id: item?.id,
              icon: item?.details?.icon,
              name: item?.name,
              title: item?.title,
              description: "Change the look of your Snake with a custom Skin!",
              price: 1.99,
            }}
            onClose={onClose}
            handleBuy={handleBuy}
          />
        );

      case "confirm":
        return (
          <ConfirmPayment
            title="SLUG SKIN"
            price={2.99}
            onClose={onClose}
            handlePay={handlePay}
            onDeposit={() => setDialogState("payment")}
            onPayDirect={() => setDialogState("payment")}
          />
        );

      // case "wallet":
      //   return <ConnectWallet onClose={onClose} />;

      case "payment":
        return (
          <PaymentStage
            onClose={onClose}
            handleConfirm={handleConfirmPayment}
          />
        );

      case "success":
        return (
          <div className="bg-[#F5D6B1] rounded-2xl py-4 px-4 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-3">
            <div className="w-full flex justify-center items-center gap-1">
              <CheckIcon className="h-5 w-4" />
              <span className="text-[#745061] text-center font-bumper-sticker text-[18px]/[20px] font-bold leading-normal">
                SUCCESS!
              </span>
            </div>
            <Button
              className="bg-[#24BE62] w-[194px] h-[28px] text-white text-center font-made-tommy text-[18px] leading-[20px] font-extrabold"
              onClick={onClose}
            >
              {"Let's Go!"}
            </Button>
          </div>
        );

      case "error":
        return (
          <div className="bg-[#F5D6B1] rounded-2xl py-4 px-4 shadow-md border-2 border-[#A96415] flex flex-col items-center gap-y-3">
            <div className="w-full flex justify-center items-center gap-1">
              <FalseIcon className="h-[20px] w-[20px]" />
              <span className="text-[#745061] text-center font-bumper-sticker text-[18px]/[20px] font-bold leading-normal">
                SOMETHING WENT WRONG
              </span>
            </div>
            <Button
              className="bg-[#24BE62] w-[194px] h-[28px] text-white text-center font-made-tommy text-[18px] leading-[20px] font-extrabold"
              onClick={onClose}
            >
              {"Let's Go!"}
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 flex justify-center items-center w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ">
          {dialogState === "loading" ? (
            <>
              <div className="flex flex-col justify-center items-center">
                <Image
                  priority
                  src={SpinnerIcon}
                  width={116}
                  alt="spinner-icon"
                  className="animate-[spin_1.5s_linear_infinite] h-[116px] w-[116px]"
                />
                <div className="py-6">
                  <p className="text-white text-center font-made-tommy text-[20px] font-extrabold leading-normal">
                    Minting in progress...
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center absolute bottom-20">
                <Image
                  src={AvalancheIcon}
                  alt="powered-avalanche"
                  className="absolute bottom-0"
                  width={145}
                  height={116}
                />
              </div>
            </>
          ) : (
            <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
              {renderDialogContent()}
            </div>
          )}
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default SkinDialog;
