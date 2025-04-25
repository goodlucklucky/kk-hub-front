"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import _ from "lodash";
import CountUp from "react-countup";
//import components
import { NavBar } from "../_components/xp-bar";

//import utils
import { cn } from "@/app/_lib/utils";
//import images
import spinnerBack from "@assets/images/spinner-back.png";
import banner from "@assets/images/header-board.png";

import SkinDialog from "../_components/dialogs/skin-dialog";
import { ClockIcon } from "@/app/_assets/svg/clock";
import Button from "@/app/_components/shared/button";
import card from "@assets/images/card.png";
import { ClaimIcon, ClaimRaffleIcon } from "@/app/_assets/svg/claim";
import { CheckIcon } from "@/app/_assets/svg/check";
import TicketDialog from "../_components/dialogs/ticket-dialog";
import RaffleDialog from "../_components/dialogs/raffle-dialog";

export default function RafflePage() {
  const [isSkinDialogOpen, setIsSkinDialogOpen] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const [claimTicket, setClaimTicket] = useState(false);
  const [tickets, setTickets] = useState([124, 312, 242, 434, 734]);
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const handleSkinDialogToggle = useCallback(() => {
    setIsSkinDialogOpen((prev) => !prev);
  }, []);

  const handleClaimTicket = useCallback(() => {
    setStartAnimation(true);
    setClaimTicket(true);
  }, []);

  return (
    <>
      <NavBar title={"KoKo RAFFLE"} />
      <div
        className={cn(
          "flex flex-col flex-1 justify-center items-center gap-y-5"
        )}
      >
        <Image
          src={spinnerBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center w-[90%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0 relative">
          <div className="w-full h-16 flex justify-center items-center absolute -top-10">
            <Image
              src={banner}
              alt="banner"
              className={cn(
                "w-36 h-16 scale-x-[1.5] absolute z-10 pointer-events-none mx-auto"
              )}
            />
            <span className="text-[#491F36] text-center [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px] font-normal leading-normal tracking-[0.56px] lowercase z-20">
              Daily Draw
            </span>
          </div>
          <div className="bg-[#F5D6B1] rounded-2xl py-6 pb-3 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto">
            <div className="px-3 flex flex-col items-center gap-2 border-b border-[#A96415] pb-3">
              <div className="rounded-[10px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] w-full justify-center items-center h-[154px]">
                <div className="w-full h-full flex justify-center items-center mt-1">
                  <Image
                    src={card}
                    alt="card"
                    className="object-cover w-auto h-30 fixed rotate-[5deg] origin-left"
                  />
                  <Image
                    src={card}
                    alt="card"
                    className="object-cover w-auto h-30 fixed rotate-[2.5deg] origin-left"
                  />
                  <Image
                    src={card}
                    alt="card"
                    className="object-cover w-auto h-30 fixed"
                  />
                  {startAnimation ? (
                    <CountUp
                      start={0}
                      end={123}
                      duration={2.5}
                      className="text-[#8A6C48] text-[40px] font-bumper-sticker font-normal rotate-[-2deg] z-20 mr-4"
                    />
                  ) : (
                    <span className="text-[#8A6C48] text-[40px] font-bumper-sticker font-normal rotate-[-2deg] z-20 mr-4">
                      ???
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[#653F56] font-bumper-sticker text-lg mt-1">
                UNTIL NEXT DRAW
              </span>
              <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
                <ClockIcon className="w-4 h-4" />
                <span className="text-[#745061] font-bumper-sticker text-base font-normal">
                  23:39:01
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full px-3 pt-2">
              <span className="text-[#8F6E75] font-made-in-heaven text-sm font-bold text-center">
                Enter the Daily Draw for a chance to win USDT, Spins, Koko
                Chests, and more!
              </span>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleClaimTicket}
                  className="rounded-[6px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center"
                >
                  {claimTicket ? (
                    <>
                      <CheckIcon color="#ffffff" className="w-4 h-4 -mt-1" />
                      <span className="text-white text-sm font-bold py-1">
                        Ticket Claimed
                      </span>
                    </>
                  ) : (
                    <>
                      <ClaimRaffleIcon className="w-4 h-4" />
                      <span className="text-white text-sm font-bold py-1">
                        Claim Tickets
                      </span>
                    </>
                  )}
                </Button>
                <div
                  className="flex justify-center gap-1 bg-[#D1B69F] rounded-[6px] p-1 py-1.5"
                  onClick={() => setTicketDialogOpen(true)}
                >
                  <span className="text-[#5F3F57] font-made-in-heaven text-sm font-bold text-center">
                    My Entries
                  </span>
                  <span className="text-[#FCE7C5] text-center font-made-tommy text-[16px] font-bold leading-[20px] bg-[#8F6E75] px-0.5 h-5 rounded-[5px]">
                    12
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RaffleDialog
        isOpen={true}
        onClose={() => {}}
        tickets={tickets}
        isWinner={true}
        winningNumbers={[23, 3, 3223]}
        showWinner={true}
      />
      <TicketDialog
        isOpen={ticketDialogOpen}
        onClose={() => setTicketDialogOpen(false)}
        tickets={tickets}
      />
    </>
  );
}
