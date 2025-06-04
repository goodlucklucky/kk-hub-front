"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import moment from "moment";

import ResultCard from "../components/result-card";
import {
  ChallengeStatusEnum,
  EChallengeCurrency,
  useChallenges,
} from "@/../services/game/challenges";
import { useGeneral } from "@/app/_providers/generalProvider";
import statsPanel from "@assets/images/stats-panel.png";
import { cn } from "@/app/_lib/utils";
// import mixpanel from "mixpanel-browser";

export type ResultType = {
  name: string;
  titleColor: string;
  yourScore: number | null;
  bestScore: number | null;
  yourPrize: number | null;
  currency: EChallengeCurrency;
};

const ResultDetails = () => {
  const { sessionId } = useGeneral();

  // useTelegramBackButton();

  const { data: challenges } = useChallenges(
    sessionId,
    "daily",
    ChallengeStatusEnum.FINISHED,
    {
      min: moment()
        .subtract(1, "days")
        .startOf("day")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSZ"),
      max: moment()
        .subtract(1, "days")
        .endOf("day")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSZ"),
    }
  );

  useEffect(() => {
    if (challenges?.data) {
      // mixpanel?.track("View Challenges", {
      //   sessionId,
      //   challenges: challenges.data.map((challenge) => ({
      //     name: challenge.name,
      //     yourScore: challenge.score_summary?.myLatestScore || null,
      //     bestScore: challenge.score_summary?.myLatestHighScore || null,
      //     yourPrize: challenge.score_summary?.highPrize || null,
      //   })),
      // });
    }
  }, [challenges, sessionId]);

  const results = useMemo(() => {
    if (challenges?.data && challenges?.data?.length > 0)
      return challenges?.data?.map?.((challenge) => ({
        name: challenge.name,
        titleColor: challenge.details.color,
        yourScore: challenge.score_summary?.myLatestScore || null,
        bestScore: challenge.score_summary?.myLatestHighScore || null,
        yourPrize: challenge.score_summary?.highPrize || null,
        currency: challenge?.currency,
      }));
    else return [];
  }, [challenges?.data]);

  return (
    <div className={cn("flex flex-1 h-full items-center justify-center p-4")}>
      <div
        className={cn(
          "rounded-2xl relative w-full flex items-center justify-center",
        )}
      >
        <div className="relative w-full min-h-[70vh]">
          <Image
            src={statsPanel}
            alt="Stats panel"
            className="w-full h-full inset-0 z-20"
            loading="lazy"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-y-1">
            <div className="w-full h-[6%] flex items-center justify-center">
              <div className="text-[#491F36] [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px]/[25px] font-normal tracking-[0.56px] uppercase z-20 pt-1.5">
                Result Details
              </div>
            </div>
            <div className="w-full flex-1 p-3 2xs:p-4 xs:p-5 sm:p-6 flex flex-col gap-y-1 overflow-y-auto">
              <div className="font-bold text-md text-[#5F3F57] w-full text-center flex flex-col items-center items-center">
                Previous Tournament Results
                <div className="font-bold text-sm text-[#5F3F57] opacity-75">
                  {moment().subtract(1, "days").format("MMMM D, YYYY")}
                </div>
              </div>
              <div
                className="bg-[#DDC2A7] overflow-none mt-0 h-full min-h-[255px] border-1 border-[#FFF4DE] p-2 rounded-2xl space-y-2 overflow-auto flex-col"
                // hideClose
              >
                {results?.map((result, index) => (
                  <ResultCard {...result} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDetails;
