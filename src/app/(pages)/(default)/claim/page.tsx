"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { XpBar } from "../_components/xp-bar";
import TicketDialog from "../_components/dialogs/ticket-dialog";
import RaffleDialog from "../_components/dialogs/raffle-dialog";

//import utils
import { cn } from "@/app/_lib/utils";
//import images
import claimBack from "@assets/images/claim-back.png";
import banner from "@assets/images/header-board.png";

import { ClockIcon } from "@/app/_assets/svg/clock";
import kokoSelect from "@assets/images/koko-chest-select.png";
import spinner from "@assets/images/spinner.png";
import chestLock from "@assets/images/chest-lock.png";
import { CheckIcon } from "@/app/_assets/svg/check";
import starClaim from "@assets/images/star-claim.png";
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
              priority
            />
            <span className="text-[#491F36] text-center [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px] font-normal leading-normal tracking-[0.56px] lowercase z-20">
              Koko Chests
            </span>
          </div>
          <div className="bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1] rounded-[15px] py-6 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] border border-[#A96415] flex-1 flex flex-col overflow-y-auto pb-19">
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
              <div className="rounded-xl border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] w-full p-3 relative pb-8">
                <div className="w-full grid grid-cols-3 gap-2">
                  <div className="w-[76px] relative mt-8 mx-auto">
                    <Image
                      src={chestLock}
                      alt="chest lock"
                      className="absolute -top-8.5 left-0 z-10 w-full h-auto"
                      priority
                    />
                    <div className="w-full flex justify-center items-center h-[25px] border-2 border-[#e27b62] rounded-t-[9px] bg-[#80220abd] border-b-[#80220abd]">
                    </div>
                    <div className="w-full justify-end items-center h-[63px] border-2 border-b-[#755261CC] border-l-[#A17A76] border-r-[#A17A76] rounded-b-[9px] bg-[#E0BEA4] border-t-[#E0BEA4] relative p-0.5 flex flex-col gap-y-0.5">
                      <div className="text-[#653F56] text-[13px]/[0.9] font-made-tommy font-extrabold text-center h-[24px] flex items-center justify-center">
                        Koko chest
                      </div>
                      <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center h-[21px]">
                        <CheckIcon color="#E0BEA4" className="w-4 h-4 pb-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="w-[76px] relative mt-8 mx-auto">
                    <Image
                      src={spinner}
                      alt="chest lock"
                      className="absolute -top-8.5 left-0 z-10 w-full h-auto"
                      priority
                    />
                    <div className="w-full flex justify-center items-center h-[25px] border-2 border-[#e27b62] rounded-t-[9px] bg-[#80220abd] border-b-[#80220abd]">
                    </div>
                    <div className="w-full justify-end items-center h-[63px] border-2 border-b-[#755261CC] border-l-[#A17A76] border-r-[#A17A76] rounded-b-[9px] bg-[#E0BEA4] border-t-[#E0BEA4] relative p-0.5 flex flex-col gap-y-0.5">
                      <div className="text-[#653F56] text-[13px]/[0.9] font-made-tommy font-extrabold text-center h-[24px] flex items-center justify-center">
                        2 Spins
                      </div>
                      <div className="bg-[#D85331] rounded-[4px] w-full flex justify-center items-center">
                        <span className="text-[#FFF2EE] text-center text-[14px] font-bumper-sticker font-normal leading-normal tracking-[0.28px] [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                          Collect
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[76px] relative mt-8 mx-auto">
                    <Image
                      src={chestLock}
                      alt="chest lock"
                      className="absolute -top-8.5 left-0 z-10 w-full h-auto"
                      priority
                    />
                    <div className="w-full flex justify-center items-center h-[25px] border-2 border-[#e27b62] rounded-t-[9px] bg-[#80220abd] border-b-[#80220abd]">
                    </div>
                    <div className="w-full justify-end items-center h-[63px] border-2 border-b-[#755261CC] border-l-[#A17A76] border-r-[#A17A76] rounded-b-[9px] bg-[#E0BEA4] border-t-[#E0BEA4] relative p-0.5 flex flex-col gap-y-0.5">
                      <div className="text-[#653F56] text-[13px]/[0.9] font-made-tommy font-extrabold text-center h-[24px] flex items-center justify-center">
                        Koko chest
                      </div>
                      <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                        <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px]">
                          DAY 6
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[76px] relative mt-8 mx-auto">
                    <Image
                      src={spinner}
                      alt="chest lock"
                      className="absolute -top-8.5 left-0 z-10 w-full h-auto"
                      priority
                    />
                    <div className="w-full flex justify-center items-center h-[25px] border-2 border-[#e27b62] rounded-t-[9px] bg-[#80220abd] border-b-[#80220abd]">
                    </div>
                    <div className="w-full justify-end items-center h-[63px] border-2 border-b-[#755261CC] border-l-[#A17A76] border-r-[#A17A76] rounded-b-[9px] bg-[#E0BEA4] border-t-[#E0BEA4] relative p-0.5 flex flex-col gap-y-0.5">
                      <div className="text-[#653F56] text-[13px]/[0.9] font-made-tommy font-extrabold text-center h-[24px] flex items-center justify-center">
                        4 Spins
                      </div>
                      <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                        <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px]">
                          DAY 7
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[76px] relative mt-8 mx-auto">
                    <Image
                      src={spinner}
                      alt="chest lock"
                      className="absolute -top-8.5 left-0 z-10 w-full h-auto"
                      priority
                    />
                    <div className="w-full flex justify-center items-center h-[25px] border-2 border-[#e27b62] rounded-t-[9px] bg-[#80220abd] border-b-[#80220abd]">
                    </div>
                    <div className="w-full justify-end items-center h-[63px] border-2 border-b-[#755261CC] border-l-[#A17A76] border-r-[#A17A76] rounded-b-[9px] bg-[#E0BEA4] border-t-[#E0BEA4] relative p-0.5 flex flex-col gap-y-0.5">
                      <div className="text-[#653F56] text-[13px]/[0.9] font-made-tommy font-extrabold text-center h-[24px] flex items-center justify-center">
                        5 Spins
                      </div>
                      <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                        <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px]">
                          DAY 8
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[76px] relative mt-8 mx-auto">
                    <Image
                      src={chestLock}
                      alt="chest lock"
                      className="absolute -top-8.5 left-0 z-10 w-full h-auto"
                      priority
                    />
                    <div className="w-full flex justify-center items-center h-[25px] border-2 border-[#e27b62] rounded-t-[9px] bg-[#80220abd] border-b-[#80220abd]">
                    </div>
                    <div className="w-full justify-end items-center h-[63px] border-2 border-b-[#755261CC] border-l-[#A17A76] border-r-[#A17A76] rounded-b-[9px] bg-[#E0BEA4] border-t-[#E0BEA4] relative p-0.5 flex flex-col gap-y-0.5">
                      <div className="text-[#653F56] text-[13px]/[0.9] font-made-tommy font-extrabold text-center h-[24px] flex items-center justify-center">
                        Koko chest
                      </div>
                      <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                        <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px]">
                          DAY 9
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-5 absolute -bottom-20 left-0 right-0">
                  <div className="bg-[#EFC6AC] rounded-[10px] border-2 border-[#cc7138] p-1">
                    <div className="flex px-2 gap-x-2">
                      <Image src={starClaim} alt="koko select" className="w-20 h-auto" />
                      <div className="flex flex-col gap-y-0.5 py-2 flex-1">
                        <span className="text-[#745061] text-[12px] font-bumper-sticker font-normal leading-normal tracking-[0.32px]">The Mega Reward</span>
                        <span className="text-[#A17A76] text-[12px] font-made-tommy font-bold leading-normal tracking-[0.32px]">Keep the streak to win something special...</span>
                      </div>
                    </div>
                    <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                      <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px] py-[1px]">
                        DAY 28
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RaffleDialog
        isOpen={false}
        onClose={() => { }}
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
