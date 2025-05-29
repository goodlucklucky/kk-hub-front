"use client";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
//import components
import Chat from "../../../../(default)/_components/chat";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons

//import images
import statsBack from "@assets/images/stats-back.png";
import statsIcon from "@assets/images/stats-icon.png";
import Cup from "@assets/images/cup1.png";

import { LeafIcon } from "@/app/_assets/svg/leaf";
import { MarkPanelIcon } from "@/app/_assets/svg/mark-panel";
import Button from "@/app/_components/shared/button";
import tour_progress_back from "@assets/images/tour-progress-back.png";
import tour_your_scorebadge from "@assets/svg/tour-your-scorebadge.svg";
import tour_pointing_arrow from "@assets/svg/tour-pointing-arrow.svg";
import tour_refresh_back from "@assets/svg/tour-refresh-back.svg";
import TourDialog from "../../../../(default)/_components/dialogs/tour-dialog";
import PayDialog from "../../../../(default)/_components/dialogs/pay-dialog";
import ChallengeConfirmationDialog from "../components/challenge-confirmation-dialog";
import { QuestionMarkIcon } from "@/app/_assets/svg/template";
import { ChallengesContext } from "../challengesContext";
import { useGeneral } from "@/app/_providers/generalProvider";
import { usePayFeeV2 } from "@/../services/game/challenges";
import { useGetExemptedUserDetails } from "@/../services/beta-testers";
import { ICheckUserBonus2, useAddBonus } from "@/../services/bonus";
import { bonusNames, ChallengeBonusDialog } from "../../play/_screens/snake/components/challenge-bonus-dialog";
import toast from "react-hot-toast";
import {
  availableBalance,
  formatBigNumber,
  getPrizeString,
} from "@/app/_utils/number";
import { trackEvent } from "@/app/_lib/mixpanel";
import { useCheckUserBonuses } from "../../play/_screens/snake/services/bonus";

import { useThirdweb } from "@/app/(pages)/(default)/_context/thirdwebContext";
import { useTransfer } from "@/app/_hooks/useTransfer";
import { coinAddresses } from "@/app/_constants/coinAddresses";
export interface Iprops {
  params: { id: string; title: string };
  searchParams: Record<string, string>;
}

export default function TournamentEntryPage(props: Iprops) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const handlePay = useCallback(
    (e: any, payData: any = null) => {
      e?.preventDefault();
      setOpenDialog(false);
      if (payData) {
        setIsPaying(true);
        setOpenPayDialog(true);
      }
    },
    [setOpenDialog, setOpenPayDialog, setIsPaying]
  );
  
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
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openBonusDialog, setOpenBonusDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { myScore, sessionId, refreshMyScore } = useGeneral();
  const {
    balance: { total: myUsd, usdc, usdt, refresh: refreshBalance },
  } = useThirdweb();

  const { usdc: myUsdc, usdt: myUsdt } = useMemo(
    () => ({
      usdc: Number(usdc?.data?.displayValue) || 0,
      usdt: Number(usdt?.data?.displayValue) || 0,
    }),
    [usdc?.data?.displayValue, usdt?.data?.displayValue]
  );

  const { mutateAsync: payFee } = usePayFeeV2({});
  const { data: exemptedUserData } = useGetExemptedUserDetails(sessionId);

  const { transfer } = useTransfer();

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
      } catch {
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

    const currentBalance = availableBalance(
      { kokos: myScore, USD: Number(myUsd) || 0 },
      challenge?.currency
    );

    // Check balance
    const balanceAvailable =
      !challenge?.entry_fee ||
      (currentBalance || 0) >= challenge?.entry_fee ||
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
    challenge?.currency,
    challenge?.score_summary?.paid,
    challenge?.max_participations,
    challenge?.score_summary?.participationCount,
    challenge?.score_summary?.freeEntryBonus,
    myScore,
    myUsd,
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


  const playTornament = useCallback(() => {
    router.push(`/game/${title}/play?challenge_id=${id}`);
    trackEvent(`Play ${challenge?.name}`, {
      score_summary: challenge?.score_summary,
    });
  }, [challenge?.name, challenge?.score_summary, id, router, title]);

  const payFeeHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      if (challenge?.entry_fee) {
        const usdcContract = coinAddresses?.usdc?.[43114];
        const usdtContract = coinAddresses?.usdt?.[43114];

        const txHashes: string[] = [];

        const payAmount = challenge?.entry_fee || 0;
        let transferUsdc = 0;
        let transferUsdt = 0;

        if (myUsdc > myUsdt) {
          transferUsdc = payAmount > myUsdc ? myUsdc : payAmount;
          transferUsdt = payAmount - transferUsdc;
        } else {
          transferUsdt = payAmount > myUsdt ? myUsdt : payAmount;
          transferUsdc = payAmount - transferUsdt;
        }

        if (transferUsdc <= 0 && transferUsdt <= 0) {
          toast.error("Insufficient balance");
          return;
        }

        if (transferUsdc > 0) {
          const { data: res, error } = await transfer({
            contract_address: usdcContract,
            to: challenge?.wallet?.backend_wallet,
            amount: `${transferUsdc}`,
          });
          if (error) throw error;
          // console.log("handleManualWithdraw res: ", res);
          txHashes.push(`${res?.transactionHash}`);
        }

        if (transferUsdt > 0) {
          const { data: res, error } = await transfer({
            contract_address: usdtContract,
            to: challenge?.wallet?.backend_wallet,
            amount: `${transferUsdt}`,
          });
          if (error) throw error;
          // console.log("handleManualWithdraw res: ", res);
          txHashes.push(`${res?.transactionHash}`);
        }

        await payFee({
          id: challenge?.id,
          sessionId,
          txHash: txHashes?.join(","),
        });
      }

      setTimeout(async () => {
        await refreshMyScore?.();
        await refreshBalance?.();
      }, 5000);
      playTornament();
    } catch {
      // console.error("Error processing points or navigation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    transfer,
    payFee,
    refreshBalance,
    refreshMyScore,
    playTornament,
    challenge?.entry_fee,
    challenge?.id,
    challenge?.wallet?.backend_wallet,
    sessionId,
    myUsdc,
    myUsdt,
  ]);

  useEffect(() => {
    if (id) setActiveChallenge?.(`${id}`);
  }, [id, setActiveChallenge]);

  const getFormattedPrize = (prize?: number | null) => {
    return prize ? formatBigNumber(prize) : undefined;
  };

  const prize = getFormattedPrize(scorePosition.highPrize);

  return (
    <>
      <div
        className={cn(
          "flex flex-col flex-1 h-full items-center gap-y-5 px-2"
        )}
      >
        <Image
          src={statsBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="lazy"
          priority={false}
        />
        <div className="flex gap-2 mt-4 absolute top-8 left-5">
          <Chat />
        </div>
        <Image
          src={statsIcon}
          alt="Stats icon"
          className="absolute top-[70px] right-0 -z-1"
          loading="lazy"
          priority={false}
        />
        <Button className="bg-[url(/images/yellow-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-10 p-1 m-1 absolute top-20 right-0 flex items-center justify-center">
          <QuestionMarkIcon width={20} height={20} className="w-[20px] h-[20px]" />
        </Button>
        <div className="bg-[url(/images/tournament-panel.png)] bg-[size:100%_100%] fixed top-36 left-3 right-3 bottom-3 bg-no-repeat z-10 rounded-3xl mx-auto p-3 2xs:p-4 pt-2 2xs:pt-3 xs:pt-5">
          <div className="rouded-[15px] overflow-hidden h-full">
            <div className="flex flex-col gap-1.5 w-full h-full overflow-y-auto">
              <div className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-extrabold tracking-[0.22px]">
                {challenge?.name}
              </div>
              <div className="relative flex justify-center items-center">
                <LeafIcon
                  className="absolute -top-8 xs:-top-5"
                  style={{ width: "50%" }}
                />
                <MarkPanelIcon
                  className="absolute top-7 xs:top-10 z-3"
                  style={{ width: "50%" }}
                />
                <div className="flex flex-col w-full top-7 xs:top-10 absolute items-center z-5 gap-y-1">
                  <p className="text-white text-center text-[26px] font-made-tommy font-extrabold tracking-[1.3px] uppercase [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)] pt-[7px]">
                    {prize ? getPrizeString(prize, challenge?.currency) : "⏳"}
                  </p>
                  <p className="text-[rgba(255,243,221,0.80)] text-center font-made-tommy text-[12px] font-extrabold leading-[12px] tracking-[0.24px] uppercase">1st place prize!</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col mt-[70px] xs:mt-[80px] z-1">
                <div className="rounded-t-[22px] border-[3px] border-[#C6654E] bg-[#FFD384] min-h-[200px] bg-gradient-to-b from-[#FFD384] to-[#FFD384] flex-1 px-1 flex justify-center items-center pt-2.5 relative">
                  <button 
                    className="absolute top-2 right-2 w-[66px] h-[22px]"
                    onClick={refreshActiveChallenge}
                  >
                    <Image
                      src={tour_refresh_back}
                      alt="refresh_back"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <p className="relative z-2 text-[#FFF3DD] text-center font-made-tommy text-[12px] font-extrabold tracking-[0.24px] [text-shadow:0px_1px_0px_rgba(62,36,105,0.10)]">
                      Refresh
                    </p>
                  </button>
                  <div className="relative w-full">
                    <Image
                      src={tour_progress_back}
                      alt="tour_progress_back"
                      className="w-full h-[40px]"
                    />
                    <div className="absolute top-1/2 left-1 right-1 -translate-y-1/2">
                      <div className="w-full h-[16px] rounded-[8px] border border-[#FFEA7C] bg-[#FF5252] bg-gradient-to-r from-[#FF5252] to-[#FF5252] flex-shrink-0 overflow-hidden flex justify-end items-center">
                        <div className="w-[86%] h-[15px] flex-shrink-0 rounded-r-[8px] bg-gradient-to-r from-[#4CAF50] from-[84%] to-[#91FF6A] to-[100%]">
                          <div className="w-full flex-shrink-0 h-full text-white text-center font-made-tommy text-[10px] font-extrabold tracking-[10px] uppercase">
                            prize zone
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[calc(100%-5px)] left-12 -translate-x-1/2">
                      <Image
                        src={tour_your_scorebadge}
                        alt="tour_your_scorebadge"
                      />
                      <p className="absolute bottom-3 w-full text-[#5F3F57] text-center font-made-tommy text-[16px] font-extrabold">
                        {challenge?.score_summary?.yourTotalScore || "-"}
                      </p>
                    </div>
                    <div className="absolute bottom-[calc(100%)] left-12 -translate-x-1/2">
                      <Image
                        src={tour_pointing_arrow}
                        alt="tour_pointing_arrow"
                      />
                      <div className="absolute bottom-10 left-2 -translate-x-1/2">
                        <p className="text-[#745061] text-center font-made-tommy text-[12px] font-bold leading- tracking-[0.12px] whitespace-nowrap">
                          Current
                          <br />
                          Eligible Winners:
                        </p>
                        <p className="text-white text-center font-made-tommy text-[18px] font-extrabold leading-2 tracking-[0.36px] [-webkit-text-stroke:0.5px_rgba(116,80,97,0.75)] pt-1">
                        {(challenge?.score_summary && typeof challenge.score_summary === 'object' && 
                          'totalWinners' in challenge.score_summary && 
                          typeof challenge.score_summary.totalWinners === 'number' && 
                          challenge.score_summary.totalWinners > 0) 
                            ? String(challenge.score_summary.totalWinners) 
                            : "⏳"}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-[calc(100%+5px)] xs:bottom-[calc(100%+10px)] right-1 flex">
                      <div>
                        <p className="text-white text-right font-made-tommy text-[18px] font-extrabold tracking-[0.36px] uppercase [-webkit-text-stroke:0.5px_rgba(116,80,97,0.75)]">
                          Win{" "}
                          {getPrizeString(
                            formatBigNumber(scorePosition.highPrize),
                            challenge?.currency
                          )}!
                        </p>
                        <p className="text-[#745061] text-right font-made-tommy text-[12px] font-bold tracking-[0.12px]">
                          Finish 1st to
                        </p>
                      </div>
                      <Image
                        src={Cup}
                        alt="Cup"
                        className="h-[45px] w-[45px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="rounded-b-[22px] bg-[#5F3F57] p-2.5"></div>
              </div>
              <div className="flex rounded-[14px] bg-[#E3BEAA] p-1.5 xs:p-2 gap-1.5">
                <div className="w-full flex flex-col">
                  <div className="flex justify-center items-center p-0.5 xs:p-1.5 rounded-[6px_0px_0px_0px] bg-[#906c74a6]">
                    <span className="text-[#5F3F57] text-[13px] font-bold font-made-tommy">
                      Your Score
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-[#D2AE9F] rounded-[0px_0px_0px_6px] py-0.5 xs:py-1">
                    <span className="text-[#745061] text-[16px] font-bold font-made-tommy">
                      {challenge?.score_summary?.yourTotalScore || "-"}
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <div className="flex justify-center items-center p-0.5 xs:p-1.5 rounded-[0px_6px_0px_0px] bg-[#906c74a6]">
                    <span className="text-[#5F3F57] text-[13px] font-bold font-made-tommy">
                      Current Est Prize
                    </span>
                  </div>
                  <div className="flex justify-center items-center bg-[#D2AE9F] rounded-[0px_0px_6px_0px] py-0.5 xs:py-1">
                    <span className="text-[#745061] text-[16px] font-bold font-made-tommy">
                      {challenge?.score_summary?.estimatedPrize
                        ? getPrizeString(
                            formatBigNumber(
                              challenge?.score_summary?.estimatedPrize
                            ),
                            challenge?.currency
                          )
                        : "Not Prize Eligible"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-[14px] bg-[#E3BEAA] p-1.5 xs:p-2 gap-1 xs:gap-1.5">
                <div className="text-[#5F3F57] text-center font-made-tommy text-[16px] font-extrabold tracking-[0.16px] w-full">
                  Enter Today's Tournament
                </div>
                <div className="flex flex-col bg-[#D2AE9F] rounded-[14px] p-1.5 xs:p-2 gap-1 xs:gap-1.5">
                  <Button
                    className="rounded-[6px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]"
                    onClick={() => setOpenDialog(true)}
                  >
                    <div className="text-[#EFF6FF] text-center font-made-tommy text-[18px]/[20px] font-extrabold tracking-[0.4px] [text-shadow:0px_1px_0px_rgba(62,36,105,0.20)]">
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
                    </div>
                  </Button>
                  <div className="text-[#745061] text-center font-made-tommy text-[14px] font-bold tracking-[0.14px]">
                    {challenge?.entry_fee
                      ? getPrizeString(
                          formatBigNumber(challenge?.entry_fee),
                          challenge?.currency
                        )
                      : "No"}{" "}
                    Entry Fee{" "}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TourDialog isOpen={openDialog} onClose={handlePay} />
      <PayDialog
        isPaying={isPaying}
        isOpen={openPayDialog}
        onClose={() => {
          setOpenPayDialog(false);
          setIsPaying(false);
        }}
        setIsPaying={setIsPaying}
      />
      <ChallengeConfirmationDialog
        openDialog={openConfirmationDialog}
        setOpenChanllengeDialog={setOpenConfirmationDialog}
        challenge={challenge}
        isLoading={isLoading}
        onEnterPlay={payFeeHandler}
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
            } catch {
              // console.error("Error adding bonus:", error);
            }
          }, 5000);
        }}
        freeEntryBonuses={freeEntryBonuses}
      />
    </>
  );
}
