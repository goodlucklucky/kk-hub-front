"use client";

//import modules
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

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
import ConfirmPayment from "./confirm";
import PaymentStage from "./payment";
import InitialScreen from "./initial";
import { TItem } from "./type";
import { useInAppTransfer } from "@/app/_hooks/useInAppTransfer";
import toast from "react-hot-toast";
import { useToken } from "../../../_context/tokenContext";
import { useBuyStore } from "../../../../../../../services/store";
import { useGeneral } from "@/app/_providers/generalProvider";

type TDialogProps = {
  item: TItem;
  isOpen: boolean;
  onClose: () => void;
};

type DialogState =
  | "initial"
  | "confirm"
  | "wallet"
  | "payment"
  | "success"
  | "error"
  | "loading";

export default function PaymentDialog({ isOpen, item, onClose }: TDialogProps) {
  const [dialogState, setDialogState] = useState<DialogState>("initial");
  const toWallet = useMemo(
    () => process.env.NEXT_PUBLIC_STORE_WALLET as `0x${string}`,
    []
  );
  const { sessionId } = useGeneral();

  const { inAppTransfer } = useInAppTransfer();
  const { transfer: externalTransfer } = useToken();
  const { mutateAsync: confirm } = useBuyStore();

  const handleConfirm = useCallback(
    async ({
      txHashes,
      payment_method = "in-app",
    }: {
      txHashes: string;
      payment_method?: "in-app" | "external";
    }) => {
      try {
        await confirm({
          txHash: txHashes,
          payment_item_type: "store",
          price: item?.price || 0,
          item_id: item?.id,
          payment_method,
          sessionId,
        });
      } catch (error) {
        // console.error("Error during confirmation:", error);
        throw error;
      }
    },
    [confirm, item?.id, item?.price, sessionId]
  );

  const handleContinue = useCallback(() => {
    setDialogState("confirm");
  }, []);

  const handleInAppPay = useCallback(async () => {
    try {
      setDialogState("loading");

      const { data, error } = await inAppTransfer({
        to: toWallet,
        // amount: item?.price || 0,
        amount: 0.05,
      });
      if (error) {
        toast.error(error);
        return setDialogState("error");
      }

      // console.log("data", data);
      await handleConfirm({
        txHashes: data?.txHashes?.join(",") || "",
        payment_method: "in-app",
      });

      setDialogState("success");
    } catch {
      // console.log("Error during payment:", error);
      setDialogState("error");
    }
  }, [toWallet, inAppTransfer, handleConfirm]);

  const handleExternalPayment = useCallback(async () => {
    try {
      setDialogState("loading");

      const data = await externalTransfer?.(toWallet, `${item?.price || 0}`);
      // console.log("Payment data:", data);

      await handleConfirm({
        txHashes: data || "",
        payment_method: "external",
      });

      setDialogState("success");
    } catch {
      // console.error("Error during payment:", error);
      setDialogState("error");
    }
  }, [toWallet, item?.price, externalTransfer, handleConfirm]);

  const handleClose = useCallback(() => {
    setDialogState("initial");
    onClose();
  }, [onClose]);

  const renderDialogContent = () => {
    switch (dialogState) {
      case "initial":
        return (
          <InitialScreen
            item={item}
            onClose={handleClose}
            handleBuy={handleContinue}
          />
        );

      case "confirm":
        return (
          <ConfirmPayment
            title={item?.name}
            price={item?.price}
            onClose={handleClose}
            handlePay={handleInAppPay}
            onDeposit={() => setDialogState("payment")}
            onPayDirect={() => setDialogState("payment")}
          />
        );

      // case "wallet":
      //   return <ConnectWallet onClose={onClose} />;

      case "payment":
        return (
          <PaymentStage
            item={item}
            onClose={handleClose}
            handleConfirm={handleExternalPayment}
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
              onClick={handleClose}
            >
              Let's Go!
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
              onClick={handleClose}
            >
              Let's Go!
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                    Payment in progress...
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
}
