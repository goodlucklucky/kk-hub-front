"use client";

import React, { useMemo } from "react";
import EarningsSection from "../../profile/earnings-section";
import CurrentScores from "../../profile/current-scores";
import PreviousResults from "../../profile/previous-results";
import TournamentItem from "../../profile/tournament-item";

import { useThirdweb } from "../../../_context/thirdwebContext";
import {
  ChallengeStatusEnum,
  useMultiplerChallenges,
} from "@/../services/game/challenges";
import { useGeneral } from "@/app/_providers/generalProvider";
import { gameKeys } from "@/app/(pages)/game/[title]/tournaments/constants/gameKeys";

export default function ScoresSection() {
  const {
    balance: { total },
  } = useThirdweb();
  const { sessionId } = useGeneral();

  const { data: challenges } = useMultiplerChallenges(
    sessionId,
    "daily",
    ChallengeStatusEnum.ACTIVE,
    {},
    Object.values(gameKeys)
  );

  const data = useMemo(
    () => challenges?.map((item) => item?.data)?.flat(),
    [challenges]
  );

  return (
    <div className="flex-1 flex flex-col gap-2">
      <EarningsSection
        amount={(total || 0)?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
      />
      <CurrentScores activeTab={"daily"} onTabChange={() => {}} />
      <div className="w-full overflow-y-hidden flex-1 rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_2px_2px_0px_rgba(0,0,0,0.20)] pt-1">
        <div className="w-full h-full overflow-y-auto p-2 pt-1">
          <div className="w-full flex flex-col gap-2 bg-[#EED1B8] rounded-[22px] p-3 overflow-y-auto">
            {data &&
              data?.map((item) => (
                <TournamentItem
                  key={item?.id}
                  title={`${item?.name}`}
                  message={`${item?.game_key} - ${item?.description}`}
                  color={`${item?.details.color}`}
                  score={item.score_summary?.yourTotalScore || 0}
                />
              ))}
          </div>
        </div>
      </div>
      <PreviousResults leftColor="#653F5654" rightColor="#12652980" />
    </div>
  );
}
