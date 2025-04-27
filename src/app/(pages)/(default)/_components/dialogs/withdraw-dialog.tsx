'use client';

//import modules
import Image from "next/image";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import Button from "@/app/_components/shared/button";

//import assets
import confirmBack from "@assets/images/confirm-back.png";

//import icons
import { CloseIcon } from "@/app/_assets/svg/close";

//interface
interface WithdrawDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const WithdrawDialog = ({ isOpen, onClose }: WithdrawDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="flex flex-col justify-center items-center flex-1">
            <div className="w-full flex flex-col justify-center items-center relative h-[184px] gap-y-2 pb-2">
              <div className="flex justify-center items-center w-full absolute -bottom-3.5 right-0">
                <CloseIcon />
              </div>
              <div className="w-full flex justify-center items-center gap-1">
                <span className="text-[#653F56] text-center font-bumper-text text-[20px] font-bold leading-normal">PRIZE WITHDRAWALS</span>
              </div>
              <div className="flex flex-col justify-center items-start w-[297px] bg-[#E3BEAA] rounded-[10px] p-4 py-2">
                <span className="text-[#745061] text-center font-made-tommy text-[15px] font-bold leading-normal">Min Withdrawal = 10 USDT</span>
                <span className="text-[#745061cb] text-center font-made-tommy text-[15px] font-bold leading-normal">Check back at 10 USDT</span>
              </div>
              <Image
                priority
                src={confirmBack}
                width={354}
                alt="spinner-icon"
                className="h-[184px] w-[354px] absolute top-0 -z-10"
              />
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
}

export default WithdrawDialog;