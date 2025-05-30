"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SnakeProvider } from "../contexts/snake-context";
import Image from "next/image";
import BackgroundImg from "../assets/snake-game-bg.png";
import BackgroundLeaf from "../assets/Background_InGame_Layer.png";
import { useGeneral } from "@/app/_providers/generalProvider";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { trackEvent } from "@/app/_lib/mixpanel";
import { useGameStore } from "../store/game-store";
import { ScoreBoard } from "../components/score-board";
import dynamic from "next/dynamic";
import GameOver from "../components/game-over";
import Onboarding from "../components/onboarding";
import Cosmetics from "../components/cosmetics";
import { availableBalance } from "@/app/_utils/number";
import {
  ChallengeStatusEnum,
  IPostScoreResultsDetails,
  useGetChallenge,
  usePayFee,
  usePostScore,
} from "@/../services/game/challenges";
import { gameKeys } from "../../../../tournaments/constants/gameKeys";

const GameBoardV2 = dynamic(() => import("../components/game-board-2"), {
  ssr: false,
});

export default function SnakePlayScreen() {
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasMoved, setHasMoved] = useState<boolean>(false);
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const { score, time, gameState, setTime, resetGame, setGameState } =
    useGameStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    sessionId,
    myScore,
    refreshMyScore,
    // refreshChallengesPlayed,
    // retention,
  } = useGeneral();
  const [isLoading, setIsLoading] = useState(false);
  const challenge_id = useMemo(
    () => searchParams.get("challenge_id"),
    [searchParams]
  );
  const source = useMemo(() => searchParams.get("source"), [searchParams]);

  const params = useParams();
  const title = useMemo(() => params?.title, [params?.title]);
  const gameKey = useMemo(
    () => gameKeys[title as keyof typeof gameKeys],
    [title]
  );
  const {
    data: challenge,
    error: challengeError,
    refetch: refetchChallenge,
  } = useGetChallenge(
    challenge_id!,
    sessionId,
    ChallengeStatusEnum.ACTIVE,
    gameKey
  );

  const { mutateAsync: postScore, isPending } = usePostScore();
  const { mutateAsync: payFee } = usePayFee({
    onSuccess: async () => {
      try {
        await Promise.all([await refreshMyScore?.()]);
      } catch {
        // error
      }
    },
  });
  const hasHandledGameOver = useRef(false);

  const [gameOverDetails, setGameOverDetails] =
    useState<IPostScoreResultsDetails>();

  const status = useMemo(() => {
    const chall = challenge?.data;
    // check if active
    const is_active = chall?.is_active;

    const currentBalance = availableBalance(
      { kokos: myScore || 0 },
      chall?.currency
    );

    // check balance
    const balanceAvailable =
      !chall?.entry_fee || (currentBalance || 0) >= chall?.entry_fee;

    // check attempt limit
    const attemptLimit =
      !chall?.max_participations ||
      chall?.max_participations >
        (chall?.score_summary?.total_attempts || 0) + 1;

    const isAvailable = is_active && balanceAvailable && attemptLimit;
    return { isAvailable, is_active, balanceAvailable, attemptLimit };
  }, [challenge?.data, myScore]);

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isNewUser) setGameState("onboarding");
  }, [isNewUser, setGameState]);

  useEffect(() => {
    if (challenge?.data?.id) {
      const attempts =
        Number(challenge?.data?.score_summary?.participationCount) || 0;
      const maxAttempts =
        Number(challenge?.data?.max_participations) || Infinity;
      const additional =
        Number(challenge?.data?.score_summary?.freeEntryBonus) || 0;
      const challengeId = challenge?.data?.id;

      if (attempts >= maxAttempts && additional <= 0)
        router?.replace(`/challenge/${challengeId}`);
    }
  }, [
    challenge?.data?.id,
    challenge?.data?.max_participations,
    challenge?.data?.score_summary?.freeEntryBonus,
    challenge?.data?.score_summary?.participationCount,
    router,
  ]);

  useEffect(() => {
    if (challenge?.data?.id) {
      const entry_fee = Number(challenge?.data?.entry_fee) || 0;
      const paid = Number(challenge?.data?.score_summary?.paid) || 0;
      const challengeId = challenge?.data?.id;

      if (!paid && source == "invite") {
        if (entry_fee && entry_fee >= score)
          router?.replace(`/challenge/${challengeId}`);
        else payFee({ sessionId, id: challengeId });
      }
    }
  }, [
    challenge?.data?.entry_fee,
    challenge?.data?.id,
    challenge?.data?.score_summary?.paid,
    payFee,
    router,
    score,
    sessionId,
    source,
  ]);

  useEffect(() => {
    if (
      (challenge?.data && !challenge?.data?.id) ||
      (!challenge?.data && !!challengeError?.message)
    ) {
      toast.error(
        <div className="text-center">
          <p>Sorry, Challenge not found</p>
          {source == "invite" && (
            <i className="font-semibold text-sm">
              (Check if the link is collect)
            </i>
          )}
        </div>,
        { duration: 6000 }
      );
      router?.replace(`/challenge`);
    }
  }, [challenge?.data, challengeError?.message, router, source]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === "playing" && isMoved)
      interval = setInterval(() => setTime(time + 1), 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, time, setTime, isMoved]);

  useEffect(() => {
    if (gameState === "playing" && !hasMoved) {
      // mixpanel?.track?.("Game Start", {
      //   sessionId,
      //   challenge_id,
      // });
    }
  }, [gameState, hasMoved, sessionId, challenge_id]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const isSubmittingRef = useRef(false);

  const handelMatchEnd = useCallback(async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    try {
      const data = await postScore({
        challenge_id: challenge?.data?.id || "",
        score,
        sessionId,
        status: "active",
        details: { play_time: time, scores: score },
      });
      // mixpanel?.track();
      setGameOverDetails?.(data?.details || {});
      // refreshChallengesPlayed?.();
    } catch {
      // console.log(error);
    } finally {
      isSubmittingRef.current = false;
    }
  }, [
    challenge?.data?.id,
    postScore,
    // refreshChallengesPlayed,
    score,
    sessionId,
    time,
  ]);

  useEffect(() => {
    if (gameState === "gameOver" && !hasHandledGameOver.current) {
      handelMatchEnd?.();
      hasHandledGameOver.current = true;
      isSubmittingRef.current = false;

      trackEvent?.("Game Over", {
        score,
        time,
        sessionId,
        challenge: { name: challenge?.data?.name, id: challenge?.data?.id },
      });
    }

    if (gameState !== "gameOver") hasHandledGameOver.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  useEffect(() => {
    const preventTouchBehavior = (e: TouchEvent) => e.preventDefault();

    document.addEventListener("touchmove", preventTouchBehavior, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventTouchBehavior);
    };
  }, []);

  // useEffect(() => {
  //   // Ensure Telegram WebApp is ready
  //   WebApp.ready();

  //   // Disable closing or minimizing
  //   WebApp.disableClosingConfirmation();

  //   return () => {
  //     WebApp.enableClosingConfirmation(); // Cleanup
  //   };
  // }, []);

  return (
    <SnakeProvider>
      <div>
        <Image
          alt="Background"
          src={BackgroundImg}
          className="absolute w-full h-[100dvh]"
        />
        <div className="px-6 py-6 space-y-2 h-[100dvh] grid grid-rows-[auto_minmax(0,1fr)] gap-2">
          <ScoreBoard
            gameOverDetails={gameOverDetails}
            score={score}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            time={formatTime(time)}
            bestTime={formatTime(
              challenge?.data?.score_summary?.minScoreToBeat || 0
            )}
          />
          <GameBoardV2
            key={gameState}
            setHasMoved={setHasMoved}
            hasMoved={hasMoved}
            isMuted={isMuted}
            setIsMoved={setIsMoved}
            retention={
              // retention?.day
              0
            }
          />
        </div>
        {gameState === "gameOver" && (
          <GameOver
            yourScore={score}
            challenge={challenge?.data}
            gameOverDetails={gameOverDetails}
            isPending={isPending}
            isLoading={isLoading}
            setGameState={setGameState}
            canPlayAgain={status?.isAvailable}
            refetchChallenge={refetchChallenge}
            onPlayAgain={async () => {
              if (isLoading) return;
              setIsLoading(true);
              try {
                resetGame();
                setHasMoved(false);
                setIsNewUser(false);
                if (
                  challenge?.data?.entry_fee != null &&
                  !challenge?.data?.score_summary?.paid
                ) {
                  setTimeout(async () => {
                    await Promise.all([await refreshMyScore?.()]);
                  }, 5000);
                }
              } catch {
                // console.error("Error while restarting game:", error);
              } finally {
                setIsLoading(false);
              }
            }}
          />
        )}
        <Image
          alt="Background Leaf"
          src={BackgroundLeaf}
          className="fixed -bottom-11 max-w-fit w-[130%] left-1/2 -translate-x-1/2 pointer-events-none"
        />
        {gameState === "onboarding" && (
          <Onboarding setGameState={setGameState} />
        )}
        {gameState === "cosmetics" && (
          <Cosmetics isLoading={isLoading} setGameState={setGameState} />
        )}
      </div>
    </SnakeProvider>
  );
}
