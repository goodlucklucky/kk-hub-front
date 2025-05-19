import React, { useContext, useState } from "react";
import TournamentItem from "./tournament-item";
import PreviousResults from "./previous-results";
import CurrentScores from "./current-scores";
import EarningsSection from "./earnings-section";
import { useChallenges } from "../../../../../../services/game/challenges";
import { GeneralContext } from "@/app/_providers/generalProvider";

export const Scores = () => {
  const { sessionId, myUsdt } = useContext(GeneralContext);
  const [activeTab, setActiveTab] = useState("daily");
  const { data } = useChallenges(sessionId, activeTab);

  return (
    <div className="flex-1 flex flex-col gap-2 overflow-auto">
      <EarningsSection
        amount={(myUsdt || 0)?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        })}
      />
      <CurrentScores
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
      <PreviousResults leftColor="#653F5654" rightColor="#12652980" />
      <div className="w-full flex-1 overflow-y-auto rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] p-2">
        <div className="w-full flex flex-col gap-2 bg-[#EED1B8] rounded-[22px] p-3 overflow-y-auto">
          {data &&
            data.data.map((item) => (
              <TournamentItem
                key={item?.id}
                title={item.name}
                message={item.description}
                bgColor={`${item.details.color}`}
                messageBgColor="#E3BEAA"
                score={item.score_summary?.yourTotalScore || 0}
              />
            ))}
          {/* <TournamentItem
            title="Snake: $0.25 Tournament"
            message="Current Estimated Earnings: $100"
            bgColor="bg-[#E99F8C]"
            messageBgColor="bg-[#D7BDA4]"
          />
          <TournamentItem
            title="Flappy Dunk: $10 1v1"
            message="Improve your Score to qualify for a prize!"
            bgColor="bg-[#D49FC4]"
            messageBgColor="bg-[#E99F8C]"
            messageTextColor="#853834"
          />
          <TournamentItem
            title="50 KOKO Entry Tournament"
            message="Improve your Score to qualify for a prize!"
            bgColor="bg-[#B5C2C9]"
            messageBgColor="bg-[#D7BDA4]"
          />
          <TournamentItem
            title="$10 Challenge"
            message="Improve your Score to qualify for a prize!"
            bgColor="bg-[#B5D48E]"
            messageBgColor="bg-[#D7BDA4]"
          /> */}
        </div>
      </div>
    </div>
  );
};
