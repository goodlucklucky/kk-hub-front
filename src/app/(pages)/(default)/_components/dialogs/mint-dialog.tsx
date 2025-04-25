'use client';

//import modules
import Image from "next/image";
import { useEffect } from "react";

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
import { CheckIcon } from "@assets/svg/check";

//interface
interface MintDialogProps {
  isMinting: boolean;
  isOpen: boolean;
  onClose: () => void;
  setIsMinting: (isMinting: boolean) => void;
}

const MintDialog = ({ isMinting, isOpen, onClose, setIsMinting }: MintDialogProps) => {
  useEffect(() => {
    if (!isMinting) {
      //To do: call api to mint
      const interval = setInterval(() => {
        setIsMinting(true);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMinting, setIsMinting]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="flex flex-col justify-center items-center flex-1">
            {!isMinting
              ?
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
              :
              <div className="w-full flex flex-col justify-center items-center relative h-[154px] gap-y-1">
                <div className="w-full flex justify-center items-center gap-1">
                  <CheckIcon className="h-[28px] w-[20px]" />
                  <span className="text-[#745061] text-center font-made-tommy text-[18px] font-bold leading-normal">Claim Successful!</span>
                </div>
                <span className="text-[#745061] text-center font-made-tommy text-[16px] font-medium leading-normal">Check your Kokomo platform wallet</span>
                <Image
                  priority
                  src={confirmBack}
                  width={354}
                  alt="spinner-icon"
                  className="h-[154px] w-[354px] absolute top-0 -z-10"
                />
                <Button className="bg-[#24BE62] w-[194px] h-[28px] text-white text-center font-made-tommy text-[18px] leading-[20px] font-extrabold" onClick={onClose}>Great!</Button>
              </div>
            }
          </div>
          <div className="w-full flex justify-center absolute bottom-20">
            <Image src={AvalancheIcon} alt="powered-avalanche" className="absolute bottom-0" width={145} height={116} />
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default MintDialog;