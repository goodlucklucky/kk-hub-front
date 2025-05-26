"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  IOneChallengeResults,
  IPostScoreResultsDetails,
} from "../services/challenges";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ICheckUserBonus2, useAddBonus } from "../services/bonus";
import { TGameState } from "../constants/Snake";
import toast, { LoaderIcon } from "react-hot-toast";
import { useGeneral } from "@/app/_providers/generalProvider";
import { SnakeContext } from "../contexts/snake-context";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import DialogContainer from "@/app/_components/shared/dialog-container";
import { formatBigNumber } from "@/app/_utils/number";
import { cn } from "@/app/_lib/utils";
import Button from "@/app/_components/shared/button";
import { trackEvent } from "@/app/_lib/mixpanel";
import { ChallengeBonusDialog } from "./challenge-bonus-dialog";
import { StarsIcons } from "@/app/_assets/svg/etc";
import BoxMain from "@/app/(pages)/(default)/_components/BoxMain";

interface GameOverProps {
  yourScore: number;
  challenge?: IOneChallengeResults["data"];
  gameOverDetails?: IPostScoreResultsDetails;
  isPending?: boolean;
  canPlayAgain?: boolean;
  isLoading?: boolean;
  onPlayAgain: () => void;
  setGameState: (_state: TGameState) => void;
  refetchChallenge?: (
    _options?: RefetchOptions
  ) => Promise<QueryObserverResult<IOneChallengeResults, Error>>;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft | null => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setUTCDate(now.getUTCDate() + 1);
  nextMidnight.setUTCHours(0, 0, 0, 0);

  const difference = nextMidnight.getTime() - now.getTime();

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return null;
};

export default function GameOver({
  yourScore,
  challenge,
  gameOverDetails,
  isPending,
  isLoading,
  onPlayAgain,
  setGameState,
}: GameOverProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(true);
  const playAgainDisabled = useMemo(() => {
    return isPlayAgainDisabled(challenge, gameOverDetails);
  }, [challenge, gameOverDetails]);
  const [openBonusDialog, setOpenBonusDialog] = useState(false);
  const { sessionId } = useGeneral();
  const { freeEntryBonuses } = useContext(SnakeContext);
  const [freeEntry, setFreeEntry] = useState(0);
  // const { trackEvent } = useActions();

  const { mutateAsync: addBonus } = useAddBonus({
    onSuccess: async (_, data) => {
      try {
        toast.success("Bonus added successfully");
        const refresh = freeEntryBonuses?.find(
          (one) => data?.bonusName === one?.data?.data?.bonus?.bonusName
        )?.refetch;

        await Promise.all([refresh?.(), setFreeEntry((p) => p + 1)]);
      } catch {
        // error
      }
    },
  });

  const canOpenBonusDialog = useMemo(() => {
    return (
      freeEntryBonuses?.some((one) => one?.data?.data?.status == "pending") &&
      playAgainDisabled &&
      !challenge?.entry_fee &&
      !freeEntry
    );
  }, [challenge?.entry_fee, freeEntry, freeEntryBonuses, playAgainDisabled]);

  useEffect(() => {
    // WebApp.ready();

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const backButton = WebApp.BackButton;

  //   const handleBackClick = () => {
  //     router.push("/challenge");
  //   };

  //   // Force toggle visibility to ensure the event is sent
  //   backButton.hide();
  //   setTimeout(() => {
  //     backButton.onClick(handleBackClick);
  //     backButton.show();
  //   }, 100);

  //   return () => {
  //     backButton.offClick(handleBackClick);
  //     backButton.hide();
  //   };
  // }, [router]);

  const prizeNotEligible = useMemo(
    () =>
      !gameOverDetails?.estimatedPrize || gameOverDetails?.estimatedPrize < 0,
    [gameOverDetails?.estimatedPrize]
  );

  const canClick = useMemo(
    () => (!canOpenBonusDialog && playAgainDisabled && !freeEntry) || isLoading,
    [canOpenBonusDialog, playAgainDisabled, isLoading, freeEntry]
  );

  return (
    <>
      <Dialog open={openModal}>
        <DialogContent className="!overflow-visible z-50 !mt-0" asChild>
          <div>
            {!prizeNotEligible && (
              <div className="flex justify-center items-center h-0 w-full">
                <StarsIcons className="absolute -translate-y-8 w-10/12 h-auto z-[1]" />
                <div className="absolute translate-y-32 size-[150dvw] bg-radient-ellipse-c from-[#ffe598] from-16% to-[#FFC100]/0 to-70%" />
              </div>
            )}
            <DialogContainer title="Final Score" hideCloseButton>
              <BoxMain
                boxClassName="mb-0"
                className="text-center text-[#5F3F57] text-lg font-[700] px-2 pb-6 flex flex-col gap-2 h-full pt-10"
              >
                <div className="rounded-2xl p-2 bg-[#EED1B8] grid gap-2 border-2 border-white/60">
                  <div className="items-center rounded-xl contain-content bg-[#E3BEAA] bg-gradient-to-t from-[rgba(255,199,0,0.10)] to-[rgba(255,199,0,0.10)]">
                    <p className="text-[#5F3F57CC] text-md font-semibold p-2 py-1 flex items-center justify-between">
                      <span className="text-start">Today’s Top Score</span>
                      <span className="text-nowrap">
                        {gameOverDetails?.topScore || 0} pts
                      </span>
                    </p>
                    <div className="p-2 pt-0 text-sm">
                      <p className="text-[#745061CC] font-bold text-xs text-start leading-none">
                        Est Prize:{" "}
                        {formatBigNumber(gameOverDetails?.maxPrize || 0)}
                        🥥
                      </p>
                    </div>
                  </div>
                  <div className="items-center rounded-xl contain-content bg-[#E3BEAA] bg-gradient-to-t from-[rgba(204,0,255,0.04)] to-[rgba(204,0,255,0.04)]">
                    <p className="text-[#5F3F57CC] p-2 py-1 flex font-semibold items-center justify-between">
                      <span className="text-start">Score to Qualify</span>
                      <span className="text-nowrap">
                        {gameOverDetails?.scoreToQualify || 0} pts
                      </span>
                    </p>
                  </div>
                  <div className="items-center rounded-xl contain-content">
                    <p className="text-[#5F3F57] text-2xl font-semibold p-2 py-1 flex items-center justify-between">
                      <span className="text-start">Your Score</span>
                      <span className="text-nowrap">{yourScore} pts</span>
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "p-[2px] rounded-2xl",
                    prizeNotEligible
                      ? "bg-[#89535F]/40"
                      : "bg-gradient-to-r from-[#FF8A00] via-[#FF88FA] to-[#2D74FFCC]"
                  )}
                >
                  <div
                    className={cn(
                      prizeNotEligible
                        ? "bg-[#E3BEAA]"
                        : "bg-[#FCE5C4] bg-gradient-to-t from-[rgba(255,199,0,0.10)] to-[rgba(255,199,0,0.10)]",
                      "rounded-[calc(1rem_-_2px)] h-full w-full p-2"
                    )}
                  >
                    <p className="text-start text-[#5F3F57] text-xl font-bold mb-2">
                      Prize Eligibility
                    </p>
                    <div
                      className={cn(
                        "text-start p-2 rounded-t-xl",
                        prizeNotEligible ? "bg-[#cd9d87]" : "bg-[#FFCE508C]"
                      )}
                    >
                      <div
                        className={cn(
                          "text-base font-bold",
                          prizeNotEligible ? "text-white" : "text-[#DD8500]"
                        )}
                      >
                        {prizeNotEligible
                          ? "🚀 Almost There, Keep Going!"
                          : "🥳 Qualifying Ranking!"}
                      </div>
                      <div className="text-[#5F3F57CC] text-xs font-bold">
                        {prizeNotEligible ? (
                          <>
                            Win up to{" "}
                            {formatBigNumber(gameOverDetails?.maxPrize || 0)} 🥥
                          </>
                        ) : (
                          <>
                            <span className="text-[#5F3F57]">
                              Est Prize:{" "}
                              {formatBigNumber(
                                gameOverDetails?.estimatedPrize || 0
                              )}
                            </span>{" "}
                            {isPending ? (
                              <LoaderIcon className="size-5" />
                            ) : (
                              "🥥"
                            )}{" "}
                            (depending on final ranking)
                          </>
                        )}
                      </div>
                    </div>
                    {timeLeft && (
                      <div
                        className={cn(
                          "rounded-b-xl text-[#FFFFFFD9] text-[10px]",
                          prizeNotEligible
                            ? "bg-[rgba(167,105,79,1)]"
                            : "bg-[#DD8500]"
                        )}
                      >
                        🎁 Prizes distributed in {timeLeft.hours}h{" "}
                        {timeLeft.minutes}m {timeLeft.seconds}s
                      </div>
                    )}
                  </div>
                  {/* </div> */}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Button
                    disabled={canClick}
                    className="bg-green hover:bg-green/80 text-white text-xl font-bold btn-animate !shadow-[0_0.15rem] !shadow-[#2C7C4C] rounded-2xl"
                    onClick={() => {
                      if (canOpenBonusDialog) {
                        setOpenBonusDialog(true);
                        trackEvent("Challenge Entry Bonus Dialog");
                      } else {
                        onPlayAgain();
                        trackEvent("Challenge Play Again", {
                          name: challenge?.name,
                        });
                      }

                      setOpenModal(false);
                    }}
                  >
                    {isLoading
                      ? "Loading..."
                      : canOpenBonusDialog
                        ? "Want a Bonus Entry?"
                        : !freeEntry && playAgainDisabled
                          ? "Max Attempts Reached"
                          : "Play Again!"}
                  </Button>
                  <Button
                    className="bg-green hover:bg-green/80 text-white text-lg font-bold btn-animate !shadow-[0_0.15rem] !shadow-[#2C7C4C] rounded-2xl"
                    onClick={() => {
                      router.push(`./challenge/${challenge?.id}`);
                      trackEvent("Tournaments Page");
                      setGameState("onboarding");
                    }}
                    // size="sm"
                  >
                    Challenge Menu
                  </Button>
                </div>
              </BoxMain>
            </DialogContainer>
          </div>
        </DialogContent>
      </Dialog>
      <ChallengeBonusDialog
        isLoading={false}
        challenge={challenge}
        open={openBonusDialog}
        setOpen={(open) => {
          setOpenBonusDialog(open);
          setOpenModal(!open);
        }}
        onTweet={(userBonus: ICheckUserBonus2["data"]) => {
          setTimeout(async () => {
            try {
              await addBonus({
                userId: sessionId,
                bonusName: userBonus?.bonus?.bonusName,
              });
            } catch {
              // console.error("Error adding bonus:", error);
            }
          }, 5000);
          setOpenModal(true);
        }}
        freeEntryBonuses={freeEntryBonuses}
      />
    </>
  );
}

const isPlayAgainDisabled = (
  challenge?: IOneChallengeResults["data"],
  gameOverDetails?: IPostScoreResultsDetails
) => {
  if (!challenge || !gameOverDetails) return true;
  if (challenge.max_participations == null) return false;

  const maxParticipations =
    challenge.max_participations + (gameOverDetails.freeEntryBonus ?? 0);
  const currentParticipations = gameOverDetails.participationCount || 0;
  const additional = Number(gameOverDetails.freeEntryBonus) || 0;

  return currentParticipations >= maxParticipations && additional <= 0;
};
