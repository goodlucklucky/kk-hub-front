"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import SoundPlaying from "../assets/svg/sound-playing.svg";
import SoundMuted from "../assets/svg/sound-muted.svg";
import Scoreboard from "../assets/score-board.png";
import { IPostScoreResultsDetails } from "@/../services/game/challenges";
import { formatBigNumber } from "@/app/_utils/number";
import { ConnectButton } from "@/app/_components/shared/connect-button";

interface ScoreBoardProps {
  score: number;
  time: string;
  bestTime: string;
  isMuted: boolean;
  gameOverDetails: IPostScoreResultsDetails | undefined;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}

export const ScoreBoard = ({
  score,
  time,
  bestTime,
  isMuted,
  gameOverDetails,
  setIsMuted,
}: ScoreBoardProps) => {
  const scoreToQualify = gameOverDetails?.scoreToQualify ?? 0;

  return (
    <div className="relative">
      <Image alt="Score board" src={Scoreboard} className="w-full h-full" />
      <div className="absolute w-[83%] top-1/2 -translate-y-1/2 left-[1.5%] flex justify-between items-center">
        <div className="w-[56%] flex flex-col items-center">
          <div className="text-[#5F3F57] font-bold text-sm">KOKOS:</div>
          <div className="text-xl text-center font-bold text-[#4A4A4A]">
            {formatBigNumber(score)}
            <div className="text-xs text-[#8A8A8A]">
              YOUR BEST: {scoreToQualify}
            </div>
          </div>
        </div>
        <div className="w-[44%] flex flex-col items-center">
          <div className="text-[#5F3F57] font-bold text-sm">TIME:</div>
          <div className="text-xl font-bold text-center text-[#4A4A4A]">
            {time}
            <div className="text-xs text-[#8A8A8A]">YOUR BEST: {bestTime}</div>
          </div>
        </div>
      </div>
      <ConnectButton
        size="sm"
        color="#FFC734"
        onClick={() => setIsMuted(!isMuted)}
        className={`!absolute right-[2%] top-[6%] p-2 !rounded-sm shadow-md w-[11.5%] h-[40%] ${
          isMuted ? "bg-gray-400" : "bg-[#FFD700]"
        }`}
      >
        <Image
          src={isMuted ? SoundMuted : SoundPlaying}
          key={isMuted ? `SoundMuted` : `SoundPlaying`}
          alt="volume"
          width={20}
          height={20}
          className="size-6 p-0"
        />
      </ConnectButton>
    </div>
  );
};
