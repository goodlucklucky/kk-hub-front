"use client";

import { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import ResultCard from "../components/result-card";
import CloseButton from "@/app/_assets/images/close-button.png";
import {
  ChallengeStatusEnum,
  EChallengeCurrency,
  useChallenges,
} from "@/../services/game/challenges";
import { useGeneral } from "@/app/_providers/generalProvider";
import useScreenHeightRatio from "@/app/_hooks/use-screen-height-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/_components/ui/dialog";
import { BoxMain } from "./board-structure";
import moment from "moment";
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
  const router = useRouter();
  const heightRatio = useScreenHeightRatio(761);

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
    <Dialog open modal={false}>
      <DialogContent
        title="RESULT DETAILS"
        // size="2xl"
        // challengeModal
        className="mt-8 !overflow-none !top-[48%]"
        // heightRatio={heightRatio}
      >
        <BoxMain className="space-y-2 pt-1" hideClose>
          <DialogHeader className="font-bold text-md text-[#5F3F57]">
            Previous Tournament Results
            <div className="font-bold text-sm text-[#5F3F57] opacity-75">
              {moment().subtract(1, "days").format("MMMM D, YYYY")}
            </div>
          </DialogHeader>
          <BoxMain
            className="bg-[#DDC2A7] overflow-none py-0 mt-0 min-h-[255px] border-1 border-[#FFF4DE] p-2 rounded-2xl space-y-2 overflow-auto flex-col"
            hideClose
          >
            {results?.map((result, index) => (
              <ResultCard {...result} key={index} />
            ))}
          </BoxMain>
        </BoxMain>
        <Image
          onClick={() => router.back()}
          src={CloseButton}
          alt="Close button"
          width={86}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[58%] z-[1000]"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ResultDetails;
