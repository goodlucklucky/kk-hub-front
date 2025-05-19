"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image, { StaticImageData } from "next/image";
//import components
import { XpBar } from "../_components/xp-bar";

//import utils
import { cn } from "@/app/_lib/utils";
//import images
import claimBack from "@assets/images/claim-back.png";
import banner from "@assets/images/header-board.png";

import { ClockIcon } from "@/app/_assets/svg/clock";
import mainBack from "@assets/images/main-back.png";
import RewardItem from "./rewardItem";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { useQueryClient } from "@tanstack/react-query";
import {
  TDailyRewardType,
  useCollectRewards,
  useCurrentDayClaimStatus,
  useDailyRewards,
} from "../../../../../services/spins/daily";
import { getRewardContent, getRewardData } from "./utils";
import { IReward } from "./claim-reward-dialog";
import toast from "react-hot-toast";
import useTimeLeft from "@/app/_hooks/useTimeLeft";

type TReward = {
  collected: boolean;
  isActive: boolean;
  isMega: boolean;
  img: StaticImageData;
  name: string;
  id: string;
  type: TDailyRewardType;
  day: number;
  require_claim: boolean;
  game_key: string;
  details: any;
  created_at: string;
  updated_at: string;
};
export default function ClaimPage() {
  const { sessionId } = useContext(GeneralContext);
  const [, setOpenClaimDialog] = useState(false);
  const timeLeft = useTimeLeft();
  const queryClient = useQueryClient();

  const { data } = useDailyRewards();
  const { data: currentClaimData } = useCurrentDayClaimStatus({ sessionId });
  // console.log("currentClaimData", currentClaimData?.data.day);

  const [, setReward] = useState<IReward | null>();
  const [rewards, setRewards] = useState<TReward[]>([]);

  useEffect(() => {
    if (!data?.data?.length) return;

    const out =
      data?.data?.map((reward) => ({
        ...reward,
        collected: reward.day <= (currentClaimData?.data?.day ?? Infinity),
        isActive:
          !currentClaimData?.data?.isClaimed &&
          reward?.day === (currentClaimData?.data?.day ?? 1),
        isMega: reward.type === TDailyRewardType.MEGA,
        img: getRewardData(reward?.type)?.image,

        name: `${reward.details.amount ?? ""} ${
          getRewardData(reward?.type)?.text
        }`,
      })) ?? [];
    setRewards(out);
  }, [
    data?.data,
    currentClaimData?.data?.day,
    currentClaimData?.data?.isClaimed,
  ]);

  const { mutateAsync: collectReward, isPending: isCollectingRewards } =
    useCollectRewards({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get-current-day-claim-status"],
        });
      },
    });

  const handleClaim = useCallback(
    async (day: number, type: TDailyRewardType, value: number) => {
      try {
        if (isCollectingRewards) return;

        const data = await collectReward({ sessionId, day });
        const rewardContent = getRewardContent(type, value, data?.rewards);

        setReward({
          img: rewardContent?.img,
          name: rewardContent?.label || "",
          type,
        });
        setOpenClaimDialog(true);

        // await refreshMyUsdt?.();
      } catch {
        toast.error(
          <div className="text-center">
            <p>Collect Failed</p>
            <small>Something went wrong!</small>
          </div>
        );
      }
    },
    [collectReward, isCollectingRewards, sessionId]
  );

  // const onClaim = useCallback(
  //   async (open: boolean) => {
  //     try {
  //       setOpenClaimDialog(open);

  //       if (open == false) await refreshMyUsdt?.();
  //     } catch (error) {
  //       // error
  //     }
  //   },
  //   [refreshMyUsdt]
  // );

  const rewardsPages = useMemo(() => {
    const chunkSize = 7;
    const pages: TReward[][] = [];

    for (let i = 0; i < rewards.length; i += chunkSize) {
      pages.push(rewards.slice(i, i + chunkSize));
    }

    return pages;
  }, [rewards]);

  // console.log("rewards Pages", rewardsPages);

  return (
    <>
      <XpBar currentXp={745} maxXp={3250} />
      <div
        className={cn(
          "flex flex-col flex-1 justify-center items-center fixed top-28 bottom-20 pt-4 pb-14 z-0"
        )}
      >
        <Image
          src={mainBack}
          alt="Main background"
          className="absolute inset-0 w-full h-[100vh] -top-28 -z-10 object-cover object-center"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <Image
          src={claimBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="eager"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0 relative mt-12 h-full">
          <div className="w-full h-16 flex justify-center items-center absolute -top-10">
            <Image
              src={banner}
              alt="banner"
              className={cn(
                "w-36 h-16 scale-x-[1.5] absolute z-10 pointer-events-none mx-auto"
              )}
              priority
            />
            <span className="text-[#491F36] text-center [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px] font-normal leading-normal tracking-[0.56px] lowercase z-20">
              Koko Chests
            </span>
          </div>
          <div className="bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1] rounded-[15px] py-6 shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] border border-[#A96415] flex flex-col overflow-y-auto pb-21 h-full">
            <div className="px-5 flex flex-col items-center gap-2 pb-2 h-full">
              <span className="text-[#8F6E75] text-center text-[15px] font-made-tommy font-bold">
                Collect daily rewards & win mystery prizes from Koko Chests!
              </span>
              <div className="flex gap-x-2 items-center">
                <span className="text-[#745061] text-center text-[12px] font-made-tommy font-bold">
                  Next Reward
                </span>
                <div className="rounded-[5px] bg-[#E3BEAA] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] flex items-center gap-1 p-1 py-0.5">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-[#745061] font-bumper-sticker text-base font-normal">
                    {timeLeft?.hours}h {timeLeft?.minutes}m {timeLeft?.seconds}s
                  </span>
                </div>
              </div>
              <div className="rounded-xl border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] w-full pt-3 relative pb-8 flex-1 overflow-y-auto">
                {rewardsPages?.map((page, index) => (
                  <div
                    className="!grid grid-cols-3 overflow-auto h-[35vh] gap-2 px-2"
                    key={index}
                  >
                    {page?.map((reward, index) => (
                      <RewardItem
                        img={reward.img}
                        collected={reward.collected}
                        day={`Day ${reward.day}`}
                        key={index}
                        onClickCollect={() => {
                          handleClaim(
                            reward?.day,
                            reward?.type,
                            Number(reward?.details?.amount) || 1
                          );
                        }}
                        isActive={reward.isActive}
                        name={reward.name}
                        isMegaReward={reward.isMega}
                      />
                    ))}
                  </div>
                ))}
                {/* <Slider /> */}
                {/* <div className="w-full px-10 absolute bottom-4 left-0 right-0 z-11">
                  <div className="bg-[#EFC6AC] rounded-[10px] border-2 border-[#db8e5e] p-1">
                    <div className="flex px-2 gap-x-2">
                      <Image
                        src={starClaim}
                        alt="koko select"
                        className="w-[30%] h-auto"
                      />
                      <div className="flex flex-col gap-y-0.5 py-2 flex-1">
                        <span className="text-[#745061] text-[12px] font-bumper-sticker font-normal leading-normal tracking-[0.32px]">
                          The Mega Reward
                        </span>
                        <span className="text-[#A17A76] text-[12px] font-made-tommy font-bold leading-normal tracking-[0.32px]">
                          Keep the streak to win something special...
                        </span>
                      </div>
                    </div>
                    <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                      <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px] py-[1px]">
                        DAY 28
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#BC9592] rounded-[4px] w-full flex justify-center items-center">
                    <span className="text-[#724C48] text-[14px]/[0.9] font-bumper-sticker font-normal leading-normal tracking-[0.32px] py-[1px]">
                      DAY 28
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
