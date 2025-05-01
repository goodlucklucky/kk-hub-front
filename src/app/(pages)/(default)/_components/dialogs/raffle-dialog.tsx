"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@/app/_components/ui/dialog";
import { CloseIcon } from "@/app/_assets/svg/close";
import card from "@assets/images/card.png";
import backLight from "@assets/images/back-light.png";
import raffle from "@assets/images/raffle.png";
import lootbox from "@assets/images/lootbox1.png";

// Import new components
import { DialogHeader } from "./raffle/dialog-header";
import { WinningNumbers } from "./raffle/winning-numbers";
import { TicketList } from "./raffle/ticket-list";
import { NoWinMessage } from "./raffle/no-win-message";
import Button from "@/app/_components/shared/button";
import { CheckIcon } from "@/app/_assets/svg/check";

interface RaffleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: number[];
  isWinner: boolean;
  winningNumbers: number[];
  showWinner: boolean;
  isClaiming: boolean;
}

const RaffleDialog = ({
  isOpen,
  onClose,
  tickets,
  isWinner,
  winningNumbers,
  showWinner,
  isClaiming,
}: RaffleDialogProps) => {
  const [openLootbox, setOpenLootbox] = useState(false);
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
          <DialogHeader showWinner={showWinner} isClaiming={isClaiming} />
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

            {!isClaiming ? (
              <>
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
                    <div className="rounded-[10px] border-2 border-[#CDAA98] bg-[#F9CB88] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center p-2 w-full transition-all duration-70">
                      <Image
                        src={raffle}
                        alt="raffle"
                        className="w-[138px] h-[138px] transition-transform duration-700 animate-scaleUp"
                      />
                    </div>
                  )}
                  {showWinner && isWinner && (
                    <div className="rounded-[10px] border-2 border-[#CDAA98] bg-[#F9CB88] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex justify-center items-center p-2 transition-all duration-700 w-full">
                      <WinningNumbers
                        numbers={[...winningNumbers, ...winningNumbers]}
                      />
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
              </>
            ) : (
              <div className="flex flex-col justify-center items-center w-full -mt-3 gap-y-1 px-4">
                <Image src={lootbox} alt="raffle" width={100} />
                <span className="text-[#A17A76] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.56px] text-center pb-2 w-full">
                  Contrats! You won
                </span>
                {!openLootbox ? (
                  <>
                    <div className="flex flex-col w-full gap-y-1">
                      <div className="bg-[#E3BEAA] rounded-[5px] flex justify-center items-center p-1 gap-x-1">
                        <span className="text-[#653F56] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.56px] text-center">
                          Lootbox
                        </span>
                        <div className="flex justify-center items-center">
                          <span className="text-[#E3BEAA] font-made-tommy text-[12px] font-bold leading-normal tracking-[0.56px] text-center bg-[#653F56] rounded-[5px] p-[1px] px-1">
                            Tier 1
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="rounded-[6px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center mb-2"
                      onClick={() => setOpenLootbox(true)}
                    >
                      <span className="text-white text-sm font-bold py-1">
                        Open Now!
                      </span>
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col w-full gap-y-1">
                      <div className="bg-[#E3BEAA] rounded-[5px] flex justify-between px-2 items-center p-1 gap-x-1">
                        <div className="flex justify-between items-center gap-x-2">
                          <span className="text-[#653F56] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.56px] text-center pl-2">
                            Lootbox
                          </span>
                          <div className="flex justify-center items-center">
                            <span className="text-[#E3BEAA] font-made-tommy text-[12px] font-bold leading-normal tracking-[0.56px] text-center bg-[#653F56] rounded-[5px] p-[1px] px-1">
                              Tier 1
                            </span>
                          </div>
                        </div>
                        <Button
                          className="rounded-[6px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-11 flex gap-x-1 items-center justify-center"
                          onClick={() => setOpenLootbox(true)}
                        >
                          <span className="text-white font-made-tommy text-[12px] font-bold px-2">
                            Open
                          </span>
                        </Button>
                      </div>
                      <div className="bg-[#E3BEAA] rounded-[5px] flex justify-between px-2 items-center p-1 gap-x-1">
                        <div className="flex justify-between items-center gap-x-2">
                          <span className="text-[#653F56] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.56px] text-center pl-2">
                            1 Spin
                          </span>
                        </div>
                        <Button
                          className="rounded-[6px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-11 flex gap-x-1 items-center justify-center"
                          onClick={() => setOpenLootbox(true)}
                        >
                          <span className="text-white font-made-tommy text-[12px] font-bold px-2">
                            Claim
                          </span>
                        </Button>
                      </div>
                      <div className="bg-[#E3BEAA] rounded-[5px] flex justify-between px-2 items-center p-1 gap-x-1">
                        <div className="flex justify-between items-center gap-x-2">
                          <span className="text-[#653F56] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.56px] text-center pl-2">
                            1 Spin
                          </span>
                        </div>
                        <Button
                          className="rounded-[6px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-11 flex gap-x-1 items-center justify-center"
                          onClick={() => setOpenLootbox(true)}
                        >
                          <CheckIcon
                            color="#ffffff"
                            className="w-4 h-4 -mt-1"
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-[10px] border-2 border-[rgba(116,80,97,0.70)] bg-[rgba(116,80,97,0.10)] flex justify-between px-2 items-center p-1 gap-x-1 my-2 mb-4">
                      <div className="flex justify-between items-center gap-x-2">
                        <span className="text-[#653F56] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.56px] text-center pl-2">
                          Send all to Inventory
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex justify-center items-center w-full absolute -bottom-4.5 right-0"
                      onClick={onClose}
                    >
                      <CloseIcon />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default RaffleDialog;
