"use client";

//import modules
import Image from "next/image";
import { useEffect, useState } from "react";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import Button from "@/app/_components/shared/button";

//import assets
import SpinnerIcon from "@assets/images/spinner.svg";
import AvalancheIcon from "@assets/images/powered-avalanche.png";
import confirmBack from "@assets/images/confirm-back.png";

//import icons
import { CheckIcon, FailIcon } from "@assets/svg/check";

//interface
interface PayDialogProps {
  isPaying: boolean;
  isOpen: boolean;
  onClose: () => void;
  setIsPaying: (isPaying: boolean) => void;
}

const PayDialog = ({
  isPaying,
  isOpen,
  onClose,
  setIsPaying,
}: PayDialogProps) => {
  const [isSuccess] = useState(false);
  useEffect(() => {
    if (isPaying) {
      //To do: call api to pay
      const interval = setInterval(() => {
        setIsPaying(false);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaying, setIsPaying]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="flex flex-col justify-center items-center flex-1">
            {isPaying ? (
              <div className="flex flex-col justify-center items-center">
                <Image
                  priority
                  src={SpinnerIcon}
                  width={116}
                  alt="spinner-icon"
                  className="animate-[spin_1.5s_linear_infinite] h-[116px] w-[116px]"
                />
                <div className="py-6">
                  <p className="text-white text-center font-made-tommy text-[20px] font-extrabold">
                    Confirming payment...
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center relative h-[154px] gap-y-3">
                <div className="w-full flex justify-center items-center gap-1">
                  {isSuccess ? (
                    <CheckIcon className="h-[28px] w-[20px] -mt-1" />
                  ) : (
                    <FailIcon className="h-[28px] w-[20px] -mt-1" />
                  )}
                  {isSuccess ? (
                    <span className="text-[#745061] text-center font-bumper-sticker text-[18px] font-normal uppercase">
                      Success!
                    </span>
                  ) : (
                    <span className="text-[#745061] text-center font-bumper-sticker text-[18px] font-normal uppercase">
                      Something wrong
                    </span>
                  )}
                </div>
                <Image
                  priority
                  src={confirmBack}
                  width={354}
                  alt="spinner-icon"
                  className="h-[154px] w-[354px] absolute top-0 -z-10"
                />
                <Button
                  className="bg-[#24BE62] w-[194px] h-[28px] text-white text-center font-made-tommy text-[18px] leading-[20px] font-extrabold rounded-[10px]"
                  onClick={onClose}
                >
                  {isSuccess ? "Play!" : "Try again!"}
                </Button>
              </div>
            )}
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
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default PayDialog;
