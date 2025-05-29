"use client";

import React, { useContext } from "react";
import Image from "next/image";
//import components
import Chat from "../../../(default)/_components/chat";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons

//import images
import statsBack from "@assets/images/stats-back.png";
import statsIcon from "@assets/images/stats-icon.png";
import statsPanel from "@assets/images/stats-panel.png";
import Header from "../../../(default)/_components/layout/header";
import Button from "@/app/_components/shared/button";
import { StatsWalletIcon } from "@/app/_assets/svg/stats-wallet";
import { TopArrow } from "@/app/_assets/svg/top-arrow";
import { StarStatsIcon } from "@/app/_assets/svg/star";
import { SunIcon } from "@/app/_assets/svg/sun";
import { CalendarIcon } from "@/app/_assets/svg/calendar";
import PreviousResults from "../../../(default)/_components/profile/previous-results";
import EarningsSection from "@/app/(pages)/(default)/_components/profile/earnings-section";
import { GeneralContext } from "@/app/_providers/generalProvider";
import TournamentItem from "@/app/(pages)/(default)/_components/profile/tournament-item";
import {
  useChallenges,
  useGetATH,
} from "../../../../../../services/game/challenges";
import { QuestionMarkIcon } from "@/app/_assets/svg/template";
import { useApp } from "@/app/_contexts/appContext";

export default function StatsPage() {
  const { sessionId, myUsdt } = useContext(GeneralContext);
  const { data } = useChallenges(sessionId, "daily");
  const { data: ath } = useGetATH(sessionId);
  const { setIsBankingOpen } = useApp();
  return (
    <div className={cn("flex flex-col flex-1 h-full items-center gap-y-1")}>
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
        className="absolute top-[70px] right-0 -z-1"
        loading="lazy"
        priority={false}
      />
      <Button className="bg-[url(/images/yellow-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-10 p-1 m-1 absolute top-20 right-0 flex items-center justify-center">
        <QuestionMarkIcon width={20} height={20} className="w-[20px] h-[20px]" />
      </Button>
      <div
        className={cn(
          "rounded-2xl relative w-full flex items-center justify-center",
          "fixed top-33 right-0 left-0 bottom-0 p-3"
        )}
      >
        <div className="relative w-full h-full">
          <Image
            src={statsPanel}
            alt="Stats panel"
            className="w-full h-full z-20"
            loading="lazy"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-1">
            <div className="w-full h-[6%] flex items-center justify-center">
              <div className="text-[#491F36] [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px]/[25px] font-normal tracking-[0.56px] lowercase z-20 pt-1.5">
                STATS
              </div>
            </div>
            <div className="w-full flex-1 p-3 2xs:p-4 xs:p-5 sm:p-6 flex flex-col gap-y-1 overflow-y-auto">
              <div className="w-full bg-[#EED1B8] rounded-t-[22px] rounded-b-[10px] flex flex-col gap-y-1 p-1.5 pb-2">
                <div className="text-[#745061] text-center font-made-tommy text-xs font-bold leading-normal tracking-[0.12px]">
                  Top up your wallet...
                </div>
                <Button
                  className="w-full rounded-[6px] bg-gradient-to-b from-[#A291FF] to-[#856FFF] text-white text-center font-made-tommy text-xs font-bold leading-normal tracking-[0.12px] p-0 flex items-center justify-center gap-x-2"
                  onClick={() => setIsBankingOpen(true)}
                >
                  <StatsWalletIcon />
                  <div className="text-[#EFF6FF] text-center [text-shadow:0px_1px_0px_rgba(62,36,105,0.20)] font-made-tommy text-[18px] font-extrabold leading-normal tracking-[0.36px]">
                    Wallet
                  </div>
                </Button>
              </div>
              <EarningsSection
                amount={(myUsdt || 0)?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
                className={
                  "w-full justify-between bg-[#EED1B8] rounded-full flex items-center gap-2 px-2.5 py-1 2xs:py-2"
                }
              />
              <div className="w-full justify-between bg-[#EED1B8] rounded-[22px] flex flex-col items-center gap-1 px-2.5 py-1 2xs:py-2">
                <div className="flex gap-2 items-center w-full">
                  <TopArrow />
                  <span className="text-[#5F3F57] font-bold font-made-tommy text-[16px]/[28px]">
                    Scores
                  </span>
                </div>
                <div className="flex gap-2 items-center w-full">
                  <div className="flex items-center justify-between w-full bg-[#E3BEAA] rounded-[5px]">
                    <div className="text-[#745061] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] p-1 px-2 pl-3">
                      Game Played
                    </div>
                    <div className="rounded-r-[5px] bg-[#917377] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] px-2 py-1.5 text-[#FFE4D4] font-made-tommy text-[14px] font-bold tracking-[0.36px]">
                      {ath?.data.gamesPlayed ?? "0"}
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full bg-[#E3BEAA] rounded-[5px]">
                    <div className="text-[#745061] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] p-1 px-2 pl-3">
                      Your ATH
                    </div>
                    <div className="rounded-r-[5px] bg-[#917377] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] px-2 py-1.5 text-[#FFE4D4] font-made-tommy text-[14px] font-bold tracking-[0.36px]">
                      {ath?.data.ath ?? "0"} pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full bg-[#EED1B8] rounded-[22px] flex flex-col items-center gap-y-2 px-2.5 py-1 2xs:py-2 flex-1 overflow-y-auto">
                <div className="flex gap-2 items-center w-full">
                  <StarStatsIcon />
                  <span className="text-[#5F3F57] font-bold font-made-tommy text-[16px]/[28px]">
                    Your Current Scores
                  </span>
                </div>
                <div className="w-full rounded-[14px] border border-[#F7D8B7] bg-[#DDC2A7] bg-gradient-to-b from-[rgba(95,63,87,0.20)] to-[rgba(95,63,87,0.00)] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] flex p-1 gap-1">
                  <div className="rounded-[9px] border border-[#D1AB8D] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(252,234,208,0.50)_0%,rgba(252,234,208,0.50)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] w-full flex justify-center items-center gap-1">
                    <SunIcon />
                    <span className="text-[#5F3F57] text-center font-made-tommy text-[16px] font-bold leading-normal">
                      Daily
                    </span>
                  </div>
                  <div className="w-full flex justify-center items-center gap-1">
                    <CalendarIcon />
                    <span className="rounded-[12px] bg-[rgba(73,31,54,0.70)] text-[#D7BCA3] font-made-tommy text-[10px] font-bold tracking-[0.07px] leading-normal px-1 py-[1px]">
                      Coming soon
                    </span>
                  </div>
                </div>
                <PreviousResults
                  leftColor="#653F5654"
                  rightColor="#12652980"
                />
                <div className="flex-1 flex flex-col overflow-y-auto rounded-[13px] bg-[#653F5654] w-full p-2 gap-y-2 min-h-[50px]">
                  {data &&
                    data.data.map((item) => (
                      <TournamentItem
                        key={item?.id}
                        title={item.name}
                        message={item.description}
                        color={`${item.details.color}`}
                        score={item.score_summary?.yourTotalScore || 0}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
