"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Dialog } from "@radix-ui/react-dialog";
import { ChallengesContext } from "../challengesContext";
import ChallengeConfirmationDialog from "../components/challenge-confirmation-dialog";
import useScreenHeightRatio from "@/app/_hooks/use-screen-height-ratio";
import { useGeneral } from "@/app/_providers/generalProvider";
import { usePayFee } from "@/../services/game/challenges";
import { useGetExemptedUserDetails } from "@/../services/beta-testers";
import { ICheckUserBonus2, useAddBonus } from "@/../services/bonus";
import {
  bonusNames,
  ChallengeBonusDialog,
} from "../../play/_screens/snake/components/challenge-bonus-dialog";
import toast from "react-hot-toast";
import { formatBigNumber } from "@/app/_utils/number";
import { trackEvent } from "@/app/_lib/mixpanel";
import { DialogContent, DialogHeader } from "@/app/_components/ui/dialog";
import { BoxMain } from "../components/board-structure";
import { useCheckUserBonuses } from "../../play/_screens/snake/services/bonus";

import LeafImage from "@/app/_assets/images/leaf-image.png";
import WaveEffect from "@/app/_assets/images/wave-effect.png";
import PrizeBoard from "@/app/_assets/images/prize-showing-board.png";
import PrizeLevelBar from "@/app/_assets/images/point-level.png";
import ShortPointer from "@/app/_assets/images/short-pointer.png";
import LongPointer from "@/app/_assets/images/long-pointer.png";
import ButtonImg from "@/app/_assets/images/button-bg.png";
import LevelIndicator from "@/app/_assets/images/level-indicator.png";

const imagesToPreload = [
  LeafImage.src,
  WaveEffect.src,
  PrizeBoard.src,
  PrizeLevelBar.src,
  ShortPointer.src,
  LongPointer.src,
  ButtonImg.src,
  LevelIndicator.src,
];
export interface Iprops {
  params: { id: string; title: string };
  searchParams: Record<string, string>;
}

// const free_bonus = [
//   { img: "/images/free-bonus/free-bonus-1.png", description: "Just share this Tweet👇", buttonText: "Share Tweet", link: "", },
//   { img: "/images/free-bonus/free-bonus-2.png", description: "Follow us on X👇", buttonText: "Follow", link: "", },
//   { img: "/images/free-bonus/free-bonus-3.png", description: "Join Announcement Channel👇", buttonText: "Join", link: "", },
//   { img: "/images/free-bonus/free-bonus-4.png", description: "Join Community Chat👇", buttonText: "Join", link: "", },
//   { img: "/images/free-bonus/free-bonus-5.png", description: "Follow Boss👇", buttonText: "Follow", link: "", },
// ];

// eslint-disable-next-line complexity
const CompeteChallenge = (props: Iprops) => {
  const {
    setActiveChallenge,
    activeChallenge: challenge,
    refreshActiveChallenge,
    refetchChallenges,
  } = useContext(ChallengesContext);
  const abortController = useMemo(() => new AbortController(), []);
  const id = useMemo(() => props?.params?.id, [props?.params?.id]);
  const title = useMemo(() => props?.params?.title, [props?.params?.title]);
  const router = useRouter();
  // const heightRatio = useScreenHeightRatio(762);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openBonusDialog, setOpenBonusDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { myScore, sessionId, refreshMyScore } = useGeneral();
  const { mutateAsync: payFee } = usePayFee({});
  const { data: exemptedUserData } = useGetExemptedUserDetails(sessionId);

  const freeEntryBonuses = useCheckUserBonuses(
    sessionId,
    bonusNames,
    abortController
  );

  const { mutateAsync: addBonus } = useAddBonus({
    onSuccess: async (_, data) => {
      try {
        toast.success("Bonus added successfully");
        const refresh = freeEntryBonuses?.find(
          (one) => data?.bonusName === one?.data?.data?.bonus?.bonusName
        )?.refetch;

        await Promise.all([
          refresh?.(),
          refetchChallenges?.(),
          refreshActiveChallenge?.(),
        ]);
      } catch (error) {
        // error
      }
    },
  });

  useEffect(() => {
    const preventTouchBehavior = (e: TouchEvent) => e.preventDefault();

    document.addEventListener("touchmove", preventTouchBehavior, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventTouchBehavior);
    };
  }, []);

  // useTelegramBackButton();

  const isExempted = useMemo(() => {
    return exemptedUserData?.sessionId === sessionId;
  }, [exemptedUserData, sessionId]);

  const status = useMemo(() => {
    // Check if active
    const is_active = challenge?.is_active;

    // Check balance
    const balanceAvailable =
      !challenge?.entry_fee ||
      (myScore || 0) >= challenge?.entry_fee ||
      challenge?.score_summary?.paid;

    // Check attempt limit
    const participationLimit =
      !challenge?.max_participations ||
      (challenge?.score_summary?.participationCount ?? 0) <
        challenge?.max_participations +
          (challenge?.score_summary?.freeEntryBonus || 0);

    const isAvailable = is_active && balanceAvailable && participationLimit;
    return { isAvailable, is_active, balanceAvailable, participationLimit };
  }, [
    challenge?.entry_fee,
    challenge?.is_active,
    challenge?.score_summary?.paid,
    challenge?.max_participations,
    challenge?.score_summary?.participationCount,
    challenge?.score_summary?.freeEntryBonus,
    myScore,
  ]);

  const canOpenBonusDialog = useMemo(
    () =>
      freeEntryBonuses?.some((one) => one?.data?.data?.status == "pending") &&
      !status?.participationLimit &&
      !challenge?.entry_fee,
    [challenge?.entry_fee, freeEntryBonuses, status?.participationLimit]
  );

  const calculateBaseHeight = (
    score: number,
    min: number,
    baseScore: number,
    base: number
  ) => {
    const maxHeight = 40;
    const minHeight = 97;
    const totalHeight = 213;
    const percent = (baseScore * 100) / base;

    if (score <= min) {
      return totalHeight - (percent / 100) * (totalHeight - minHeight);
    } else {
      return minHeight - (percent / 100) * (minHeight - maxHeight);
    }
  };

  const scorePosition = useMemo(() => {
    const score = Math.round(challenge?.score_summary?.yourTotalScore || 0);
    const min = Math.round(challenge?.score_summary?.minScoreToBeat || 0);

    const high = challenge?.score_summary?.highestScore || 0;
    const highPrize = challenge?.score_summary?.maxPrize || 0;
    const max1 = Math.max(high, min);
    const max = max1 <= score ? score + 1 : max1 + 1;
    const base = score <= min ? min : max - min;
    const baseScore = score <= min ? score : score - min;

    const baseHeight = calculateBaseHeight(score, min, baseScore, base);

    return {
      min,
      max,
      base,
      percent: (baseScore * 100) / base,
      baseHeight,
      highPrize,
      high,
      score,
    };
  }, [
    challenge?.score_summary?.yourTotalScore,
    challenge?.score_summary?.minScoreToBeat,
    challenge?.score_summary?.highestScore,
    challenge?.score_summary?.maxPrize,
  ]);

  const preloadImages = (images: string[]) => {
    let loadedCount = 0;

    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsImagesLoaded(true);
        }
      };
    });
  };

  useEffect(() => {
    preloadImages(imagesToPreload);
  }, []);

  useEffect(() => {
    if (id) setActiveChallenge?.(`${id}`);
  }, [id, setActiveChallenge]);

  const getFormattedPrize = (prize?: number | null) => {
    return prize ? formatBigNumber(prize) : undefined;
  };

  const playTornament = useCallback(() => {
    router.push(`/game/${title}/play?challenge_id=${id}`);
    // router.push(`/snake-play?challenge_id=${id}`);
    trackEvent(`Play ${challenge?.name}`, {
      score_summary: challenge?.score_summary,
    });
  }, [challenge?.name, challenge?.score_summary, id, router]);

  useEffect(() => {
    if (isImagesLoaded) {
      // Trigger fade-in effect
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [isImagesLoaded]);

  return (
    <>
      <Dialog open={true} modal={false}>
        <DialogContent
          className={`!overflow-visible !px-[10px] !top-[60%] transition-opacity duration-500 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClose={() => router.push(".")}
          // challengeModal
          // heightRatio={heightRatio}
        >
          <BoxMain hideClose>
            <DialogHeader>
              <p className="text-center gap-2 font-bold text-2xl text-[#5F3F57]">
                {challenge?.name}
              </p>
            </DialogHeader>
            <div>
              <Image
                alt="leaf image"
                src={LeafImage}
                className="w-[55%] ml-6"
              />
              <div className="relative w-full h-[245px] bg-[#D2AE9F] rounded-3xl -mt-[14px]">
                <div className="absolute top-0 left-0 w-full z-[1] rounded-t-3xl overflow-hidden">
                  <div
                    className="w-full h-[56px]"
                    style={{
                      background:
                        "linear-gradient(0deg, #FFC700 0%, #FFC700 100%), #E3BEAA",
                    }}
                  ></div>
                  <div
                    className="w-full h-[39px]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255, 209, 100, 0.60) 0%, rgba(255, 209, 100, 0.60) 100%), linear-gradient(0deg, #F3B76A 0%, #F3B76A 100%), #E3BEAA",
                    }}
                  ></div>
                  <div
                    className="w-full h-[25px]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255, 209, 100, 0.40) 0%, rgba(255, 209, 100, 0.40) 100%), linear-gradient(0deg, #F3B76A 0%, #F3B76A 100%), #E3BEAA",
                    }}
                  ></div>
                  <div
                    className="w-full h-5"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255, 209, 100, 0.20) 0%, rgba(255, 209, 100, 0.20) 100%), linear-gradient(0deg, #F5AC7F 0%, #F5AC7F 100%), #E3BEAA",
                    }}
                  ></div>
                  <div
                    className="w-full h-5"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255, 209, 100, 0.15) 0%, rgba(255, 209, 100, 0.15) 100%), linear-gradient(0deg, #F7A094 0%, #F7A094 100%), #E3BEAA",
                    }}
                  ></div>
                  <div
                    className="w-full h-5"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(255, 209, 100, 0.00) 0%, rgba(255, 209, 100, 0.00) 100%), linear-gradient(0deg, #F7A094 0%, #F7A094 100%), #E3BEAA",
                    }}
                  ></div>
                </div>
                <Image
                  alt="Prize Board"
                  src={PrizeBoard}
                  className="absolute w-1/2 left-8 -top-4 z-20"
                />
                <div className="text-[30px] font-bold text-white leading-none tracking-[0.3px] absolute left-[35%] -translate-x-1/2 top-[-5px] z-30">
                  {(() => {
                    const prize = getFormattedPrize(scorePosition.highPrize);
                    return prize ? (
                      <>
                        <span
                          className="text-white"
                          style={{ textShadow: "1px 3px 6px rgba(0,0,0,0.4)" }}
                        >
                          {prize}
                        </span>
                        🥥
                      </>
                    ) : (
                      <div className="-ml-[16px]">⏳</div>
                    );
                  })()}
                </div>
                <div className="text-xs font-bold text-[#FFF3DDCC] leading-none tracking-[0.3px] absolute left-[33.5%] -translate-x-1/2 top-9 z-30">
                  1ST PLACE PRIZE
                </div>
                <div className="absolute flex text-[#745061BF] text-[8px] font-bold leading-none tracking-[0.08px] -rotate-90 z-30 top-[88px] left-[97px]">
                  Prize Eligible
                </div>
                <div className="absolute flex flex-col items-center top-[22px] right-2 z-30 gap-[2px]">
                  <div className="text-[#745061] text-[12px] leading-none font-semibold">
                    Beat{" "}
                    <span
                      className="text-[#FFFFFF]"
                      style={{
                        textShadow: "1px 3px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      {!scorePosition?.high ? "⏳" : scorePosition?.max}
                    </span>{" "}
                    pts to
                  </div>
                  <div className="text-base font-bold uppercase leading-none">
                    <span
                      className="text-[#FFFFFF]"
                      style={{
                        textShadow: "1px 3px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      Win {getFormattedPrize(scorePosition.highPrize)}
                    </span>
                    🥥
                  </div>
                </div>
                <div className="absolute flex flex-col items-center top-[86px] right-4 z-30 gap-[2px]">
                  <div className="text-[#745061] text-[12px] leading-none font-semibold">
                    Beat{" "}
                    <span
                      className="text-[#FFFFFF]"
                      style={{
                        textShadow: "1px 3px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      {!challenge?.score_summary?.minScoreToBeat
                        ? "⏳"
                        : scorePosition?.min}
                    </span>{" "}
                    pts to
                  </div>
                  <div className="text-[#745061] text-base font-bold uppercase leading-none">
                    QUALIFY FOR PRIZES
                  </div>
                </div>
                <Image
                  alt="Prize Eligible Level"
                  src={PrizeLevelBar}
                  className="absolute -bottom-[13px] left-[102px] z-10"
                />
                <Image
                  alt="Level indicator"
                  src={LevelIndicator}
                  className="absolute w-[98px] h-[54px] left-4 z-40 transition-[top_0.5s_ease]"
                  style={{ top: `${scorePosition?.baseHeight || 213}px` }}
                />
                <div className="absolute w-full h-[66px] top-[57px] left-0 bg-[#E3BEAA]">
                  <Image
                    alt="indicator"
                    src={ShortPointer}
                    width={129}
                    className="absolute top-0 -translate-y-1/2 right-4 z-10"
                  />
                </div>
                <div className="absolute w-full h-[125px] bottom-0 left-0 rounded-b-3xl">
                  <Image
                    alt="indicator"
                    src={LongPointer}
                    width={200}
                    className="absolute top-0 -translate-y-1/2 right-4 z-10"
                  />
                </div>
                <Image
                  alt="wave effect"
                  src={WaveEffect}
                  className="absolute w-full bottom-0 left-0"
                />
                <button
                  className="absolute z-40 right-5 bottom-5"
                  onClick={refreshActiveChallenge}
                >
                  <Image
                    alt="Button image"
                    src={ButtonImg}
                    className="w-[100px]"
                  />
                  <div className="text-[#EFF6FF] text-base font-bold leading-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    Refresh
                  </div>
                </button>
              </div>
            </div>
            <div className="bg-[#E3BEAA] rounded-2xl p-2 mt-6">
              <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
                <div>
                  <p className="text-center text-xs font-semibold text-[#5F3F57] bg-[#906C7480] p-2">
                    Your Score
                  </p>
                  <p className="text-center text-base font-bold text-[#745061] bg-[#D2AE9F] p-1">
                    {challenge?.score_summary?.yourTotalScore || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-center text-xs font-semibold text-[#5F3F57] bg-[#906C7480] p-2">
                    Current Est Prize
                  </p>
                  <p className="text-center text-base font-bold text-[#745061] bg-[#D2AE9F] p-1">
                    {challenge?.score_summary?.estimatedPrize
                      ? `${formatBigNumber(
                          challenge?.score_summary?.estimatedPrize
                        )} 🥥`
                      : "Not Prize Eligible"}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#E3BEAA] rounded-3xl p-2 text-center mt-2">
              <p className="text-[#5F3F57] text-base font-bold leading-1">
                Enter Today&apos;s Tournament
              </p>
              <div className="w-full p-2 rounded-2xl bg-[#D2AE9F] mt-2">
                <button
                  onClick={() => {
                    if (canOpenBonusDialog) {
                      setOpenBonusDialog(true);
                      console.log("canOpenBonusDialog");
                    } else if (isExempted || challenge?.score_summary?.paid)
                      playTornament();
                    else setOpenConfirmationDialog(true);
                  }}
                  disabled={!status?.isAvailable && !canOpenBonusDialog}
                  className={`w-full rounded-lg text-white font-bold text-2xl p-1 bg-[linear-gradient(180deg,_#24BE62_10%,_#1AB257_201.67%)] shadow-[0px_3px_0px_0px_#25705E]`}
                >
                  {status?.isAvailable ||
                  (challenge?.score_summary?.paid &&
                    !challenge?.name.toLowerCase().includes("free"))
                    ? "Play Now!"
                    : canOpenBonusDialog
                      ? "Want a Bonus Entry?"
                      : !status?.is_active
                        ? "Not Active"
                        : !status?.balanceAvailable
                          ? "Balance Too Low"
                          : !status?.participationLimit
                            ? "Max Attempts Reached"
                            : "Not Available"}
                </button>
                <p className="text-[#745061] text-sm font-semibold mt-3 ">
                  <span>
                    {challenge?.entry_fee
                      ? `${formatBigNumber(challenge?.entry_fee)}🥥`
                      : "No"}{" "}
                    Entry Fee
                  </span>{" "}
                  <span>
                    {challenge?.max_participations ? (
                      <>
                        ({challenge?.score_summary?.participationCount || 0} /{" "}
                        {challenge?.max_participations} Attempts)
                        {(challenge?.score_summary?.freeEntryBonus || 0) > 0 &&
                          ` + ${
                            challenge?.score_summary?.freeEntryBonus || 0
                          } bonus attempt${
                            (challenge?.score_summary?.freeEntryBonus || 0) > 1
                              ? "s"
                              : ""
                          }`}
                      </>
                    ) : (
                      <>(Unlimited Attempts)</>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </BoxMain>
        </DialogContent>
      </Dialog>
      <ChallengeConfirmationDialog
        openDialog={openConfirmationDialog}
        setOpenChanllengeDialog={setOpenConfirmationDialog}
        challenge={challenge}
        isLoading={isLoading}
        onEnterPlay={async () => {
          setIsLoading(true);
          try {
            if (challenge?.entry_fee)
              await payFee({ id: challenge?.id, sessionId });

            setTimeout(async () => {
              await refreshMyScore?.();
            }, 5000);
            playTornament();
          } catch (error) {
            console.error("Error processing points or navigation:", error);

            setIsLoading(false);
          }
        }}
      />
      <ChallengeBonusDialog
        isLoading={isLoading}
        challenge={challenge}
        open={openBonusDialog}
        setOpen={setOpenBonusDialog}
        onTweet={(userBonus: ICheckUserBonus2["data"]) => {
          setTimeout(async () => {
            try {
              await addBonus({
                userId: sessionId,
                bonusName: userBonus?.bonus?.bonusName,
              });
            } catch (error) {
              console.error("Error adding bonus:", error);
            }
          }, 5000);
        }}
        freeEntryBonuses={freeEntryBonuses}
      />
    </>
  );
};

export default CompeteChallenge;
