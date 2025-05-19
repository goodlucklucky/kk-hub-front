"use client";

//import modules
import Image from "next/image";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";

//import assets
import banner from "@assets/images/header-board.png";

//import icons
import { CloseIcon } from "@/app/_assets/svg/close";
import { InviteCopyIcon } from "@/app/_assets/svg/copy";
import { TelegramInviteIcon } from "@/app/_assets/svg/telegram";

//interface
interface MoreSpinsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoreSpinsDialog = ({ isOpen, onClose }: MoreSpinsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <>
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2.5px]" />
            <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
              <div className="w-full h-16 flex justify-center items-center absolute -top-10">
                <Image
                  src={banner}
                  alt="banner"
                  className={cn(
                    "w-36 h-16 scale-x-[1.5] absolute z-10 pointer-events-none mx-auto"
                  )}
                />
                <span className="text-[#491F36] text-center [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px] font-normal leading-normal tracking-[0.56px] lowercase z-20">
                  MORE SPINS
                </span>
              </div>
              <div
                className="flex justify-center items-center w-full absolute -bottom-5 right-0"
                onClick={onClose}
              >
                <CloseIcon />
              </div>
              <div className="bg-[#F5D6B1] rounded-2xl p-3 py-6 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto gap-2">
                <div className="flex flex-col gap-y-1">
                  <div className="flex justify-center items-center gap-1">
                    <span className="text-[#8F6E75] text-center font-made-tommy text-[16px] font-bold leading-normal">
                      Your Total Spins
                    </span>
                    <span className="text-[#FCE7C5] text-center font-made-tommy text-[16px] font-bold leading-[20px] bg-[#8F6E75] w-5 h-5 rounded-[5px]">
                      7
                    </span>
                  </div>
                  <span className="text-[#745061] text-center font-made-tommy text-[16px] font-bold leading-normal">
                    Want more Spins?
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 rounded-[14px] bg-[#E3BEAA]">
                  <div className="w-full py-1.5 border-b-1 border-b-[#EBD8BE]">
                    <span className="text-[#745061] text-center font-made-tommy text-[14px] font-bold leading-normal px-3">
                      Claim Your Daily Free Spins
                    </span>
                  </div>
                  <div className="w-full rounded-b-[14px] p-[10px] bg-[#7450611A]">
                    <Button className="rounded-[4px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center">
                      <span className="text-white text-sm font-bold py-[1px]">
                        Claim for Free
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-1 rounded-[14px] bg-[#E3BEAA]">
                  <div className="w-full py-1.5 border-b-1 border-b-[#EBD8BE]">
                    <span className="text-[#745061] text-center font-made-tommy text-[14px] font-bold leading-normal px-3">
                      Invite a Friend = 3 Spins and +5,000 Bonus
                    </span>
                  </div>
                  <div className="w-full rounded-b-[14px] p-[10px] bg-[#7450611A] flex gap-x-1">
                    <Button className="rounded-[4px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center">
                      <TelegramInviteIcon className="w-4 h-4" />
                      <span className="text-white text-sm font-bold py-[1px]">
                        Telegram
                      </span>
                    </Button>
                    <Button className="rounded-[4px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center">
                      <InviteCopyIcon className="w-4 h-4" />
                      <span className="text-white text-sm font-bold py-[1px]">
                        Copy Invite
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col justify-center items-center gap-1 rounded-[14px] bg-[#E3BEAA]">
                    <div className="w-full py-1.5 border-b-1 border-b-[#EBD8BE]">
                      <span className="text-[#745061] text-center font-made-tommy text-[14px] font-bold leading-normal px-3">
                        Buy a Spin for $0.25
                      </span>
                    </div>
                    <div className="w-full rounded-b-[14px] p-[10px] bg-[#7450611A]">
                      <Button className="rounded-[4px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center">
                        <span className="text-white text-sm font-bold py-[1px]">
                          Buy Spin
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default MoreSpinsDialog;
