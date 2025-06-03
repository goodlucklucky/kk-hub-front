"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
import statsPanel from "@assets/images/stats-panel.png";
import backLight from "@assets/images/back-light.png";
import BoxMain from "@/app/(pages)/(default)/_components/BoxMain";
import {
  IOneChallengeResults,
  IPostScoreResultsDetails,
} from "@/../services/game/challenges";

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
  const { title } = useParams();
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
          <div className="[&>div]:!z-10">
            {!prizeNotEligible && (
              <div className="flex justify-center items-center h-full w-full absolute -top-10 left-0 !z-1">
                <Image
                  src={backLight}
                  alt="back-light"
                  className="absolute -top-10 left-0 w-full h-full !z-0 object-cover animate-fade-cycle animate-duration-3000 animate-ease-in-out [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                  priority
                />
              </div>
            )}
            <DialogContainer title="" hideCloseButton>
              <BoxMain boxClassName="bg-none mb-0" className="relative p-0 rounded-none bg-[transparent] z-10">
                <Image
                  src={statsPanel}
                  alt="Stats panel"
                  className="w-full h-full z-0 absolute top-0 left-0"
                  loading="lazy"
                />
                <div className="flex flex-col gap-y-1">
                  <div className="w-full h-[6%] flex items-center justify-center">
                    <div className="text-[#491F36] [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] uppercase font-bumper-sticker text-[25px]/[25px] font-normal tracking-[0.56px] lowercase z-1 pt-1">
                      Game Over
                    </div>
                  </div>

                </div>
                <div className="text-center text-[#5F3F57] text-lg font-[700] p-3 pb-5 pt-2 flex flex-col gap-2 h-full relative">
                  <div className="rounded-2xl p-2 bg-[#EED1B8] grid gap-1.5 border-2 border-white/60">
                    <div className="items-center rounded-[14px_14px_8px_8px] contain-content bg-[#E3BEAA] bg-gradient-to-t from-[rgba(255,199,0,0.10)] to-[rgba(255,199,0,0.10)]">
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
                    <div className="items-center rounded-[8px_8px_14px_14px] contain-content bg-[#E3BEAA] bg-gradient-to-t from-[rgba(204,0,255,0.04)] to-[rgba(204,0,255,0.04)]">
                      <p className="text-[#5F3F57CC] p-2 py-1 flex font-semibold items-center justify-between">
                        <span className="text-start">Score to Qualify</span>
                        <span className="text-nowrap">
                          {gameOverDetails?.scoreToQualify || 0} pts
                        </span>
                      </p>
                    </div>
                    <div className="items-center rounded-xl contain-content">
                      <p className="text-[#5F3F57] text-[24px] font-bold px-2 flex items-center justify-between">
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
                          : "bg-[#FCE5C4]",
                        "rounded-[calc(1rem_-_2px)] h-full w-full p-2"
                      )}
                    >
                      <p className="text-start text-[#5F3F57] text-[20px] mb-1 pl-2 font-semibold">
                        Prize Eligibility
                      </p>
                      <div
                        className={cn(
                          "text-start p-[10px] rounded-t-[8px]",
                          prizeNotEligible ? "bg-[#cd9d87]" : "bg-[#FFCE508C]"
                        )}
                      >
                        <div
                          className={cn(
                            "text-[16px] font-semibold",
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
                                <LoaderIcon className="inline-block size-5" />
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
                            "rounded-b-[8px] text-[#FFFFFFD9] text-[10px] py-1 font-semibold",
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
                  <div className="w-full flex flex-col gap-3">
                    <Button
                      disabled={canClick}
                      className="text-white text-[20px] font-bold btn-animate !shadow-[0_1px] !shadow-[#2C7C4C] rounded-[14px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]"
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
                      className="text-white text-[18px] p-0 font-bold btn-animate !shadow-[0_1px] !shadow-[#2C7C4C] rounded-[14px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]"
                      onClick={() => {
                        router.push(`/game/${title}/tournaments/${challenge?.id}`);
                        trackEvent("Tournaments Page");
                        setGameState("onboarding");
                      }}
                      // size="sm"
                    >
                      Challenge Menu
                    </Button>
                  </div>
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
