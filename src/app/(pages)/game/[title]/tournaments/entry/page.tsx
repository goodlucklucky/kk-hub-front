"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
//import components
import { NavBar } from "../../../../(default)/_components/xp/bar";
import Chat from "../../../../(default)/_components/chat";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons

//import images
import statsBack from "@assets/images/stats-back.png";
import statsIcon from "@assets/images/stats-icon.png";
import Cup from "@assets/images/cup1.png";

import Header from "../../../../(default)/_components/layout/header";
import { LeafIcon } from "@/app/_assets/svg/leaf";
import { MarkPanelIcon } from "@/app/_assets/svg/mark-panel";
import Button from "@/app/_components/shared/button";
import tour_progress_back from "@assets/images/tour-progress-back.png";
import tour_your_scorebadge from "@assets/svg/tour-your-scorebadge.svg";
import tour_pointing_arrow from "@assets/svg/tour-pointing-arrow.svg";
import tour_refresh_back from "@assets/svg/tour-refresh-back.svg";
import TourDialog from "../../../../(default)/_components/dialogs/tour-dialog";
import PayDialog from "../../../../(default)/_components/dialogs/pay-dialog";

export default function TournamentEntryPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const handlePay = useCallback(
    (e: any, payData: any = null) => {
      e?.preventDefault();
      setOpenDialog(false);
      if (payData) {
        setIsPaying(true);
        setOpenPayDialog(true);
      }
    },
    [setOpenDialog, setOpenPayDialog, setIsPaying]
  );

  return (
    <div className={cn("min-h-dvh flex flex-col")}>
      <Header />
      <main className="grow flex flex-col">
        <NavBar title="Snake Tournaments" className="bg-[#9981ae]" />
        <div
          className={cn(
            "flex flex-col flex-1 h-full items-center gap-y-5 px-2"
          )}
        >
          <Image
            src={statsBack}
            alt="Main background"
            className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
            loading="lazy"
            priority={false}
          />
          <div className="flex gap-2 mt-4 absolute top-8 left-5">
            <Chat />
          </div>
          <Image
            src={statsIcon}
            alt="Stats icon"
            className="absolute top-26 right-0"
            loading="lazy"
            priority={false}
          />
          <div className="bg-[url(/images/tournament-panel.png)] bg-[size:100%_100%] fixed top-48 left-3 right-3 bottom-3 bg-no-repeat z-10 rounded-3xl mx-auto p-3 2xs:p-4 pt-2 2xs:pt-3 xs:pt-5">
            <div className="flex flex-col gap-1.5 w-full h-full overflow-y-auto">
              <div className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-extrabold tracking-[0.22px]">
                $0.25 Entry Tournament
              </div>
              <div className="relative flex justify-center items-center">
                <LeafIcon
                  className="absolute -top-8 xs:-top-5"
                  style={{ width: "50%" }}
                />
                <MarkPanelIcon
                  className="absolute top-7 xs:top-10"
                  style={{ width: "50%" }}
                />
                <div className="flex w-full top-7 xs:top-10 absolute justify-center">
                  <span className="text-white text-center text-[26px] font-made-tommy font-extrabold tracking-[1.3px] uppercase [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)] pt-[7px]">
                    $1000.00
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col mt-[70px] xs:mt-[80px] z-10">
                <div className="rounded-t-[22px] border-[3px] border-[#C6654E] bg-[#FFD384] min-h-[200px] bg-gradient-to-b from-[#FFD384] to-[#FFD384] flex-1 px-1 flex justify-center items-center pt-2.5 relative">
                  <button className="absolute top-2 right-2 w-[66px] h-[22px]">
                    <Image
                      src={tour_refresh_back}
                      alt="refresh_back"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <p className="relative z-10 text-[#FFF3DD] text-center font-made-tommy text-[12px] font-extrabold tracking-[0.24px] [text-shadow:0px_1px_0px_rgba(62,36,105,0.10)]">
                      Refresh
                    </p>
                  </button>
                  <div className="relative w-full">
                    <Image
                      src={tour_progress_back}
                      alt="tour_progress_back"
                      className="w-full h-[40px]"
                    />
                    <div className="absolute top-1/2 left-1 right-1 -translate-y-1/2">
                      <div className="w-full h-[16px] rounded-[8px] border border-[#FFEA7C] bg-[#FF5252] bg-gradient-to-r from-[#FF5252] to-[#FF5252] flex-shrink-0 overflow-hidden flex justify-end items-center">
                        <div className="w-[86%] h-[15px] flex-shrink-0 rounded-r-[8px] bg-gradient-to-r from-[#4CAF50] from-[84%] to-[#91FF6A] to-[100%]">
                          <div className="w-full flex-shrink-0 h-full text-white text-center font-made-tommy text-[10px] font-extrabold tracking-[10px] uppercase">
                            prize zone
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[calc(100%-5px)] left-12 -translate-x-1/2">
                      <Image
                        src={tour_your_scorebadge}
                        alt="tour_your_scorebadge"
                      />
                      <p className="absolute bottom-3 w-full text-[#5F3F57] text-center font-made-tommy text-[16px] font-extrabold">
                        25
                      </p>
                    </div>
                    <div className="absolute bottom-[calc(100%)] left-12 -translate-x-1/2">
                      <Image
                        src={tour_pointing_arrow}
                        alt="tour_pointing_arrow"
                      />
                      <div className="absolute bottom-10 left-2 -translate-x-1/2">
                        <p className="text-[#745061] text-center font-made-tommy text-[12px] font-bold leading- tracking-[0.12px] whitespace-nowrap">
                          Current
                          <br />
                          Eligible Winners:
                        </p>
                        <p className="text-white text-center font-made-tommy text-[18px] font-extrabold leading-2 tracking-[0.36px] [-webkit-text-stroke:0.5px_rgba(116,80,97,0.75)] pt-1">
                          134
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-[calc(100%+5px)] xs:bottom-[calc(100%+10px)] right-1 flex">
                      <div>
                        <p className="text-white text-right font-made-tommy text-[18px] font-extrabold tracking-[0.36px] uppercase [-webkit-text-stroke:0.5px_rgba(116,80,97,0.75)]">
                          Win $1000!
                        </p>
                        <p className="text-[#745061] text-right font-made-tommy text-[12px] font-bold tracking-[0.12px]">
                          Finish 1st to
                        </p>
                      </div>
                      <Image
                        src={Cup}
                        alt="Cup"
                        className="h-[45px] w-[45px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-b-[22px] bg-[#5F3F57] p-2.5"></div>
              </div>
              <div className="flex rounded-[14px] bg-[#E3BEAA] p-1.5 xs:p-2 gap-1.5">
                <div className="w-full flex flex-col">
                  <div className="flex justify-center items-center p-0.5 xs:p-1.5 rounded-[6px_0px_0px_0px] bg-[#906c74a6]">
                    <span className="text-[#5F3F57] text-[13px] font-bold font-made-tommy">
                      Your Score
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-[#D2AE9F] rounded-[0px_0px_0px_6px] py-0.5 xs:py-1">
                    <span className="text-[#745061] text-[16px] font-bold font-made-tommy">
                      25
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <div className="flex justify-center items-center p-0.5 xs:p-1.5 rounded-[0px_6px_0px_0px] bg-[#906c74a6]">
                    <span className="text-[#5F3F57] text-[13px] font-bold font-made-tommy">
                      Current Est Prize
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-[#D2AE9F] rounded-[0px_0px_6px_0px] py-0.5 xs:py-1">
                    <span className="text-[#745061] text-[16px] font-bold font-made-tommy">
                      $100
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-[14px] bg-[#E3BEAA] p-1.5 xs:p-2 gap-1 xs:gap-1.5">
                <div className="text-[#5F3F57] text-center font-made-tommy text-[16px] font-extrabold tracking-[0.16px] w-full">
                  Enter Today's Tournament
                </div>
                <div className="flex flex-col bg-[#D2AE9F] rounded-[14px] p-1.5 xs:p-2 gap-1 xs:gap-1.5">
                  <Button
                    className="rounded-[6px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]"
                    onClick={() => setOpenDialog(true)}
                  >
                    <div className="text-[#EFF6FF] text-center font-made-tommy text-[18px]/[20px] font-extrabold tracking-[0.4px] [text-shadow:0px_1px_0px_rgba(62,36,105,0.20)]">
                      Play Now!
                    </div>
                  </Button>
                  <div className="text-[#745061] text-center font-made-tommy text-[14px] font-bold tracking-[0.14px]">
                    $0.25 Entry Fee (Unlimited Attempts)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <TourDialog isOpen={openDialog} onClose={handlePay} />
      <PayDialog
        isPaying={isPaying}
        isOpen={openPayDialog}
        onClose={() => {
          setOpenPayDialog(false);
          setIsPaying(false);
        }}
        setIsPaying={setIsPaying}
      />
    </div>
  );
}
