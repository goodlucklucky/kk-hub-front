"use client";

//import components
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";

//import icons
import { CloseIcon } from "@/app/_assets/svg/close";
import { ClaimRaffleIcon } from "@/app/_assets/svg/claim";
import { IEnterRaffle } from "../../../../../../services/raffle";

//interface
interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: IEnterRaffle[];
}

const TicketDialog = ({ isOpen, onClose, tickets }: TicketDialogProps) => {
  // console.log("Tickets", tickets);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#D9D9D9BF]" />

        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
          <div className="bg-[#F5D6B1] rounded-2xl p-3 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto">
            <div
              className="flex justify-center items-center w-full absolute -bottom-4.5 right-0"
              onClick={onClose}
            >
              <CloseIcon />
            </div>
            <span className="text-[#D1B69F] text-center font-made-tommy text-[18px] font-bold leading-normal absolute top-4 right-5 px-1 bg-[#745061] rounded-[5px] py-0">
              {tickets.length}
            </span>
            <div className="w-full flex flex-col justify-center items-center relative gap-y-1 py-2 pb-4">
              <div className="w-full flex justify-center items-center gap-1">
                <span className="text-[#745061] text-center font-bumper-sticker text-[18px] font-normal leading-normal">
                  my tickets
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 w-full px-2 mt-2">
                {tickets.map((ticket, index) => (
                  <div
                    key={index}
                    className="bg-[#D1B69F] rounded-[10px] flex items-center justify-center gap-y-1 py-1 gap-x-1"
                  >
                    <ClaimRaffleIcon color="#7C5C6B" className="w-5 h-5" />
                    <span className="text-[#5F3F57] text-center font-made-tommy text-[14px] font-bold leading-normal">
                      {ticket.ticketNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketDialog;
