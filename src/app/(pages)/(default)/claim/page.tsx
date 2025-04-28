"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import _ from "lodash";
import CountUp from "react-countup";
//import components
import { NavBar, XpBar } from "../_components/xp-bar";

//import utils
import { cn } from "@/app/_lib/utils";
//import images
import claimBack from "@assets/images/claim-back.png";
import banner from "@assets/images/header-board.png";

import { ClockIcon } from "@/app/_assets/svg/clock";
import Button from "@/app/_components/shared/button";
import kokoLock from "@assets/images/koko-chest-lock.png";
import kokoUnlock from "@assets/images/koko-chest-unlock.png";
import kokoSelect from "@assets/images/koko-chest-select.png";
import spinLock from "@assets/images/spin-lock.png";
import spinUnlock from "@assets/images/spin-unlock.png";
import spinSelect from "@assets/images/spin-select.png";
import card from "@assets/images/card.png";
import { ClaimRaffleIcon } from "@/app/_assets/svg/claim";
import { CheckIcon } from "@/app/_assets/svg/check";
import TicketDialog from "../_components/dialogs/ticket-dialog";
import RaffleDialog from "../_components/dialogs/raffle-dialog";

export default function ClaimPage() {
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
      <XpBar currentXp={745} maxXp={3250} />
      <div
        className={cn(
          "flex flex-col flex-1 justify-center items-center gap-y-5"
        )}
      >
        <Image
          src={claimBack}
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
              Koko Chests
            </span>
          </div>
          <div className="bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1] rounded-[15px] py-6 pb-3 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] border border-[#A96415] flex-1 flex flex-col overflow-y-auto">
            <div className="px-5 flex flex-col items-center gap-2 pb-3">
              <span className="text-[#8F6E75] text-center text-[15px] font-made-tommy font-bold">
                Collect daily rewards & win mystery prizes from Koko Chests!
              </span>
              <div className="flex gap-x-2 items-center">
                <span className="text-[#745061] text-center text-[12px] font-made-tommy font-bold">
                  Next Reward
                </span>
                <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-[#745061] font-bumper-sticker text-base font-normal">
                    23:39:01
                  </span>
                </div>
              </div>
              <div className="rounded-xl border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] w-full grid grid-cols-3 gap-2 p-3">
                <div className="w-[76px] h-[119px]">
                  <Image src={kokoUnlock} alt="card" />
                </div>
                <div className="w-[76px] h-[119px]">
                  <Image src={spinSelect} alt="card" />
                </div>
                <div className="w-[76px] h-[119px]">
                  <Image src={spinLock} alt="card" />
                </div>
                <div className="w-[76px] h-[119px]">
                  <Image src={spinUnlock} alt="card" />
                </div>
                <div className="w-[76px] h-[119px]">
                  <Image src={kokoLock} alt="card" />
                </div>
                <div className="w-[76px] h-[119px]">
                  <Image src={kokoSelect} alt="card" width={79} height={119} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RaffleDialog
        isOpen={false}
        onClose={() => {}}
        tickets={tickets}
        isWinner={false}
        winningNumbers={[23, 3, 3223]}
        showWinner={false}
        isClaiming={false}
      />
      <TicketDialog
        isOpen={ticketDialogOpen}
        onClose={() => setTicketDialogOpen(false)}
        tickets={tickets}
      />
    </>
  );
}
