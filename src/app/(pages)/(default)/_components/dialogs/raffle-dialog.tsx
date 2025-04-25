"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import { CloseIcon } from "@/app/_assets/svg/close";
import card from "@assets/images/card.png";
import backLight from "@assets/images/back-light.png";
import raffle from "@assets/images/raffle.png";

// Import new components
import { DialogHeader } from "./raffle/dialog-header";
import { WinningNumbers } from "./raffle/winning-numbers";
import { TicketList } from "./raffle/ticket-list";
import { NoWinMessage } from "./raffle/no-win-message";

interface RaffleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: number[];
  isWinner: boolean;
  winningNumbers: number[];
  showWinner: boolean;
}

const RaffleDialog = ({
  isOpen,
  onClose,
  tickets,
  isWinner,
  winningNumbers,
  showWinner,
}: RaffleDialogProps) => {
  const [isFadeCycle, setIsFadeCycle] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFadeCycle(false);
    }, 2500);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/75" />
        {!showWinner && (
          <Image
            src={backLight}
            alt="back-light"
            className="absolute top-0 left-0 w-full h-full object-cover z-100 animate-fade-cycle"
            priority
          />
        )}
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
          <DialogHeader showWinner={showWinner} />

          <div
            className={`bg-[#F5D6B1] rounded-2xl shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto py-10 gap-y-2 justify-center items-center ${
              !showWinner ? "pb-15" : isWinner ? "pb-2" : "pb-8"
            }`}
          >
            {!showWinner ? (
              <>
                <div className="flex justify-center items-end absolute -bottom-8">
                  <Image
                    src={card}
                    alt="card"
                    className="object-cover w-auto h-20 fixed rotate-[5deg] origin-left"
                  />
                  <Image
                    src={card}
                    alt="card"
                    className="object-cover w-auto h-20 fixed rotate-[2.5deg] origin-left"
                  />
                  <Image
                    src={card}
                    alt="card"
                    className="object-cover w-auto h-20 fixed"
                  />
                  <span className="text-[#8A6C48] text-[30px] font-bumper-sticker font-normal rotate-[-2deg] z-20 mr-4 mb-4.5">
                    369
                  </span>
                </div>
              </>
            ) : !isWinner ? (
              <div
                className="flex justify-center items-center w-full absolute -bottom-4.5 right-0"
                onClick={onClose}
              >
                <CloseIcon />
              </div>
            ) : null}

            <span
              className={`text-[#745061] font-bumper-sticker text-[24px] font-normal leading-normal tracking-[0.56px] text-center pb-2 w-full ${
                showWinner && !isWinner && "border-b-1 border-[#A96415]"
              }`}
            >
              {showWinner
                ? isWinner
                  ? "WINNING NUMBERS!"
                  : "nothing this time"
                : "the draw is now!"}
            </span>

            <div className="px-4 w-full">
              {!showWinner && (
                <div className="rounded-[10px] border-2 border-[#CDAA98] bg-[#F9CB88] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center p-2 w-full transition-all duration-700 w-full">
                  <Image
                    src={raffle}
                    alt="raffle"
                    className="w-[138px] h-[138px] transition-transform duration-700 animate-scaleUp"
                  />
                </div>
              )}
              {showWinner && isWinner && (
                <div className="rounded-[10px] border-2 border-[#CDAA98] bg-[#F9CB88] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center p-2 w-full transition-all duration-700 w-full">
                  <WinningNumbers numbers={[...winningNumbers, ...winningNumbers]} />
                </div>
              )}
            </div>
            {showWinner ? (
              isWinner ? (
                <TicketList tickets={tickets} />
              ) : (
                <NoWinMessage />
              )
            ) : null}
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default RaffleDialog;
