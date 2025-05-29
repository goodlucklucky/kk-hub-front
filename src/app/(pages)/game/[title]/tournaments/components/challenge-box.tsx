"use client";

import ChallengeCard from "./challenge-card";
import { useContext } from "react";
import { ChallengesContext } from "../challengesContext";

const ChallengeBox = () => {
  const { challenges, isLoading } = useContext(ChallengesContext);
  return (
    <div className="flex-1 flex flex-col overflow-auto rounded-[13px] bg-[#653F5654] w-full p-2 gap-y-1.5">
      {isLoading ? (
        <p>Loading Challenges ...</p>
      ) : (
        challenges?.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))
      )}
    </div>
  );
};

export default ChallengeBox;
