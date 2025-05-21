"use client";

import ChallengeCard from "./challenge-card";
import { useContext } from "react";
import { ChallengesContext } from "../challengesContext";

const ChallengeBox = () => {
  const { challenges, isLoading } = useContext(ChallengesContext);
  return (
    <div className="flex flex-col gap-2 items-center">
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
