"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
//import components
import Chat from "../../../(default)/_components/chat";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons

//import images
import statsBack from "@assets/images/stats-back.png";
import statsIcon from "@assets/images/stats-icon.png";
import ChallengeBox from "./components/challenge-box";

import { SunIcon } from "@/app/_assets/svg/sun";
import { CalendarIcon } from "@/app/_assets/svg/calendar";
import { LightningIcon } from "@/app/_assets/svg/lightning";
import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { Button } from "@/app/_components/ui/button";
import { QuestionMarkIcon } from "@/app/_assets/svg/template";
import { trackEvent } from "@/app/_lib/mixpanel";
import { TimeLeft } from "@/app/_hooks/useTimeLeft";
import { calculateTimeLeft } from "@/app/_hooks/useTimeLeft";

export default function StatsPage() {
  const router = useRouter();
  const { title } = useParams();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn("flex flex-col flex-1 h-full items-center gap-y-5 px-2")}
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
        className="absolute top-[70px] right-0 -z-1"
        loading="lazy"
        priority={false}
      />
      <Button className="bg-[url(/images/yellow-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-10 p-1 m-1 absolute top-20 right-0 flex items-center justify-center">
        <QuestionMarkIcon
          width={20}
          height={20}
          className="w-[20px] h-[20px]"
        />
      </Button>
      <div className="bg-[url(/images/tournament-panel.png)] bg-[size:100%_100%] fixed top-36 left-3 right-3 bottom-3 flex flex-col gap-1.5 bg-center bg-no-repeat z-10 rounded-3xl mx-auto p-4 pt-3">
        <div className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-extrabold tracking-[0.22px]">
          Tournaments
        </div>
        <div className="w-full flex rounded-[22px] border border-[#F7D8B7] bg-[#DDC2A7] bg-[linear-gradient(180deg,rgba(95,63,87,0.20)_-577.52%,rgba(95,63,87,0.00)_248.61%)] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] p-1 py-[5px]">
          <div className="w-full flex justify-center items-center gap-1">
            <LightningIcon />
            <span className="rounded-[12px] bg-[rgba(73,31,54,0.70)] text-[#D7BCA3] font-made-tommy text-[10px] font-bold tracking-[0.07px] px-1 py-[1px]">
              Coming soon
            </span>
          </div>
          <div className="rounded-full border border-[#D1AB8D] bg-[#EED1B8] bg-[linear-gradient(0deg,rgba(252,234,208,0.50)_0%,rgba(252,234,208,0.50)_100%)] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] w-full flex justify-center items-center gap-1 py-0.5">
            <SunIcon />
            <span className="text-[#5F3F57] text-center font-made-tommy text-[18px] font-bold">
              Daily
            </span>
          </div>
          <div className="w-full flex justify-center items-center gap-1">
            <CalendarIcon />
            <span className="rounded-[12px] bg-[rgba(73,31,54,0.70)] text-[#D7BCA3] font-made-tommy text-[10px] font-bold tracking-[0.07px] px-1 py-[1px]">
              Coming soon
            </span>
          </div>
        </div>
        <div
          className="p-2 px-4 rounded-full bg-[#EED1B8] flex text-[14px] text-[#745061] font-made-tommy font-semibold items-center justify-between w-full"
          onClick={() => {
            router.push(`/game/${title}/tournaments/result-details`);
            trackEvent(`Tournaments Results Details`);
          }}
        >
          Previous Results
          <CustomRightArrow color={"#745061"} />
        </div>
        <ChallengeBox />
        {timeLeft && (
          <div className="rounded-[8px_8px_22px_22px] bg-[#A970B5] w-full flex justify-center py-1.5">
            <span className="text-white font-made-tommy text-[12px] font-bold">
              🎁 Prizes distributed in {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
