import { useState } from "react";
import { ClockIcon, PlayIcon, GiftIcon, TickIcon } from "@/app/_assets/svg/etc";
import { ProgressBar } from "./progress";
import Image from "next/image";
import pet1 from "@assets/images/pet1.png";
import pet2 from "@assets/images/pet2.png";
import pet3 from "@assets/images/pet3.png";
import star from "@assets/images/star-group.png";
import Button from "@/app/_components/shared/button";
import {
  MissionCheckIcon,
  MissionClickIcon,
  MissionLeftIcon,
  MissionRightIcon,
  MissionIcon,
} from "@/app/_assets/svg/mission-direct";
import useTimeLeft from "@/app/_hooks/useTimeLeft";

const rewardList = [
  {
    id: 0,
    name: "Lootbox",
    image: pet1,
    tier: "Tier 2",
    status: 0, // 0: not claimed, 1: in progress, 2: claimed
  },
  {
    id: 1,
    name: "Lootbox",
    image: pet2,
    tier: "Tier 3",
    status: 1,
  },
  {
    id: 2,
    name: "Lootbox",
    image: pet3,
    tier: "Tier 4",
    status: 2,
  },
  {
    id: 3,
    name: "Lootbox",
    image: pet3,
    tier: "Tier 14",
    status: 1,
  },
];

const WeeklyRewardSection = ({
  currentXp,
  maxXp,
}: {
  currentXp: number;
  maxXp: number;
}) => {
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [rewardId, setRewardId] = useState(0);
  const timeLeft = useTimeLeft();

  return (
    <>
      <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col flex-1 overflow-y-auto gap-2">
        <div className="flex justify-between items-center">
          <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
            description
          </span>
          {currentXp < maxXp && (
            <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
              <ClockIcon className="w-4 h-4" />
              <p className="text-[#745061] font-bumper-sticker text-base font-normal">
                {timeLeft?.hours}:{timeLeft?.minutes}:{timeLeft?.seconds}
              </p>
            </div>
          )}
          {currentXp == maxXp && (
            <div className="rounded-[5px] bg-[#568262] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
              <TickIcon fill="#FDE8C6" className="w-4 h-4" />
              <p className="font-bumper-sticker text-base font-normal text-[#FDE8C6]">
                {" "}
                COMPLETED{" "}
              </p>
            </div>
          )}
        </div>
        <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px]">
          <span className="text-[#745061] font-made-tommy text-[16px]/[16px] font-[800] text-center w-[80%]">
            Mission description or objective goes here.
          </span>
        </div>
        <div className="flex justify-between items-center gap-2 mt-2">
          <div className="flex flex-col gap-1 w-[40%]">
            <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
              progress
            </span>
            <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px] h-[100px] flex flex-col">
              <p className="text-[#745061] font-made-tommy text-[16px] font-[800] leading-[18px] max-h-[40px]">
                Koko Snake Played
              </p>
              <ProgressBar
                currentXp={currentXp}
                maxXp={maxXp}
                progressColor={{ from: "#653F56", to: "#653F56" }}
                bgColor={{ from: "#BE9F96", to: "#BE9F96" }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-[60%]">
            <span className="text-[#653F56] text-[18px] font-normal font-bumper-sticker">
              reward
            </span>
            <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] py-[9px] px-[10px] h-[100px] flex items-start gap-2 relative">
              <Image
                src={rewardList[rewardId].image}
                alt="pet"
                className="w-[85px] h-[85px] rounded-[5px]"
              />
              <div className="flex flex-col w-full gap-1">
                <span className="text-[#745061] font-made-tommy text-[16px] font-[800] leading-[20px] w-[80%]">
                  {rewardList[rewardId].name}
                </span>
                <div className="flex items-center gap-1 z-10">
                  <span className="text-[#F5DDC4] font-made-tommy text-[14px] font-[800] leading-[20px] bg-[#C03F21] rounded-[5px] px-1 py-[1px]">
                    {rewardList[rewardId].tier}
                  </span>
                </div>
              </div>
              <Image
                src={star}
                alt="star"
                className="w-[66px] h-[42px] absolute right-3 bottom-3"
              />
            </div>
          </div>
        </div>
        {currentXp < maxXp && (
          <Button className="rounded-[8px] bg-[#653F56] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] w-full flex gap-x-1.5 items-center justify-center py-[3px]">
            <>
              <PlayIcon className="w-[19px] h-[19px] text-[#E3BEAA]" />
              <span className="text-[#E3BEAA] text-[20px] font-bumper-sticker font-normal leading-normal [text-shadow:0px_1px_0px_rgba(0,0,0,0.20)]">
                Start
              </span>
            </>
          </Button>
        )}
        {currentXp == maxXp && !rewardClaimed && (
          <Button className="rounded-[8px] bg-[#653F56] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] w-full flex gap-x-1.5 items-center justify-center py-[3px]">
            <GiftIcon fill="#e3beaa" className="w-5 h-5 text-red" />
            <span
              className="text-[#e3beaa] font-bumper-sticker font-normal text-[20px] tracking-wider shadow-[0px_1px_0px_rgba(0, 0, 0, 0.20)]"
              onClick={() => {
                setRewardClaimed(true);
                // Simulate reward claim
                setTimeout(() => {
                  setInProgress(false);
                }, 1500);
              }}
            >
              CLAIM REWARD
            </span>
          </Button>
        )}
        {currentXp == maxXp && rewardClaimed && (
          <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#E3BEAA] to-[#E3BEAA] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] mt-2 p-2">
            <span className="text-[#653f56] font-bumper-sticker font-normal text-[20px] tracking-wider shadow-[0px_1px_0px_rgba(0, 0, 0, 0.20)]">
              {inProgress ? "In Progress..." : "Reward Claimed"}
            </span>
          </Button>
        )}
      </div>
      <div className="flex gap-3 justify-center items-center">
        <MissionLeftIcon
          className="w-[20px] drop-shadow-[0_0.3ch_#00000080]"
          onClick={() => setRewardId((rewardId + 2) % maxXp)}
        />
        {rewardList[rewardId].status == 0 && (
          <MissionClickIcon className="w-[25px] h-[25px]" />
        )}
        {rewardList[rewardId].status == 1 && (
          <MissionIcon className="w-[25px] h-[25px]" />
        )}
        {rewardList[rewardId].status == 2 && (
          <MissionCheckIcon className="w-[25px] h-[25px]" />
        )}
        <MissionRightIcon
          className="w-[20px] drop-shadow-[0_0.3ch_#00000080]"
          onClick={() => setRewardId((rewardId + 1) % maxXp)}
        />
      </div>
    </>
  );
};

export default WeeklyRewardSection;
