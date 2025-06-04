"use client";

import { Chessboard } from "react-chessboard";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";
import profile2 from "@assets/images/chess-profile-2.png";
import profile1 from "@assets/images/chess-profile-1.jpg";
import message from "@assets/svg/message.svg";
import otherdraw from "@assets/svg/otherdraw.svg";
import redign from "@assets/svg/resign.svg";
import { useGameStore } from "./utils/useChessGameStore";
// import { NavBar } from "@/app/(pages)/(default)/_components/xp/bar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAiMove } from "./hooks/useAiMove";
import {
  darkSquareBack,
  dropAreaBack,
  whiteSquareBack,
} from "./constants/colors";
import RenderCaptured from "./components/renderCaptured";
import { DefaultPieces } from "./components/piecesIcons";
import Avatar from "./components/avatar";
import { useGeneral } from "@/app/_providers/generalProvider";
import useDummyUser from "./hooks/useDummyUser";
import useTimer from "./hooks/useTimer";
import { ChessProvider } from "./contexts/chess-context";
import GameOver from "./components/game-over";
import { DRAW_SCORE, LOSE_SCORE, WIN_SCORE } from "./constants/numbers";
import {
  ChallengeStatusEnum,
  IPostScoreResultsDetails,
  useGetChallenge,
  usePayFee,
  usePostScore,
} from "@/../services/game/challenges";
import { useThirdweb } from "@/app/(pages)/(default)/_context/thirdwebContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { availableBalance } from "@/app/_utils/number";
import { trackEvent } from "@/app/_lib/mixpanel";
import toast from "react-hot-toast";
import { gameKeys } from "../../../tournaments/constants/gameKeys";

export default function ChessPlayScreen() {
  const {
    game,
    actions,
    highlightedSquares,
    moves,
    capturedPieces,
    gameOutcome,
    isGameOver,
    time,
  } = useGameStore();
  useAiMove({ actions, game, moves });

  const { user, sessionId, myScore } = useGeneral();
  const dummyUser = useDummyUser();
  const game_turn = game?.turn();
  const activeUser = useMemo(
    () =>
      game_turn === "w"
        ? {
            ...user,
            name: user?.username?.startsWith("0x")
              ? `${user?.username?.slice(0, 4)}...${user?.username?.slice(-4)}`
              : user?.username,
          }
        : {
            ...dummyUser,
            name: dummyUser?.name?.startsWith("0x")
              ? `${dummyUser?.name?.slice(0, 4)}...${dummyUser?.name?.slice(-4)}`
              : dummyUser?.name,
          },
    [game_turn, user, dummyUser]
  );

  const { formattedTime } = useTimer();

  const whiteCaptured = useMemo(
    () => capturedPieces.filter((p) => p.color === "b").map((p) => p.piece), // black pieces captured by white
    [capturedPieces]
  );

  const blackCaptured = useMemo(
    () => capturedPieces.filter((p) => p.color === "w").map((p) => p.piece), // white pieces captured by black
    [capturedPieces]
  );

  const files = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];

  const onDrop = useCallback(
    (source: string, target: string) => {
      const move = { from: source, to: target };
      return actions.makeMove(move);
    },
    [actions]
  );

  const gameOverLag = useMemo(() => {
    if (isGameOver) {
      setTimeout(() => {
        return true;
      }, 3000); // Wait for 3 seconds
    }
    return false;
  }, [isGameOver]);

  const {
    balance: { refresh: refreshBalance },
  } = useThirdweb();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
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

  const score = useMemo(() => {
    return gameOutcome?.result === "checkmate"
      ? gameOutcome?.winner === "white"
        ? WIN_SCORE
        : LOSE_SCORE
      : DRAW_SCORE;
  }, [gameOutcome]);

  const { mutateAsync: postScore, isPending } = usePostScore();
  const { mutateAsync: payFee } = usePayFee({
    onSuccess: async () => {
      try {
        await Promise.all([await refreshBalance?.()]);
      } catch {
        // error
      }
    },
  });

  const [gameOverDetails, setGameOverDetails] =
    useState<IPostScoreResultsDetails>();

  const isSubmittingRef = useRef(false);

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

  const handlePlayAgain = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      actions?.resetGame();
      if (
        challenge?.data?.entry_fee != null &&
        !challenge?.data?.score_summary?.paid
      ) {
        setTimeout(async () => {
          await Promise.all([await refreshBalance?.()]);
        }, 5000);
      }
    } catch {
      // console.error("Error while restarting game:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    actions,
    challenge?.data?.entry_fee,
    challenge?.data?.score_summary?.paid,
    refreshBalance,
  ]);

  const hasHandledGameOver = useRef(false);

  useEffect(() => {
    if (isGameOver && !hasHandledGameOver.current) {
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

    if (!isGameOver) hasHandledGameOver.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver]);

  useEffect(() => {
    if (challenge?.data?.id) {
      const entry_fee = Number(challenge?.data?.entry_fee) || 0;
      const paid = Number(challenge?.data?.score_summary?.paid) || 0;
      const challengeId = challenge?.data?.id;

      if (!paid && source == "invite") {
        if (entry_fee && entry_fee >= score)
          router?.replace(`/game/${title}/tournaments/${challengeId}`);
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
    title,
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
      router?.replace(`/game/${title}/tournaments`);
    }
  }, [challenge?.data, challengeError?.message, router, source, title]);

  return (
    <ChessProvider>
      <div className="w-screen h-dvh bg-[url(/images/bg-chess-board.png)] bg-center bg-no-repeat pb-10 flex flex-col">
        {/* import of this file not found (UNCOMMENT IF CREATED THEN IMPORT IT) */}
        {/* <Navbar title={"Casual chess"} /> */}
        <div className=" bg-[url(/images/bg-chess-board2.png)] bg-center bg-no-repeat bg-[length:100%_100%] max-h-[80%] p-3 w-[92%] mx-[4%] my-auto">
          <h3 className="text-[#5F3F57] text-center font-made-tommy text-[22px] font-bold">
            Casual
          </h3>
          <div className={cn("grid grid-cols-3 gap-4 mx-5 my-4")}>
            <Avatar
              {...{
                name: user?.username || "Kokomon",
                level: 1,
                image: user?.photo_url || profile2.src,
              }}
            />
            <Avatar
              {...{
                name: formattedTime,
                image: activeUser?.photo_url || profile2.src,
              }}
              Bottom={() => (
                <p className="text-[#8A7D6B] text-center text-[12px] border-1 bg-white/20 border-[#BABABA] rounded-2xl px-2">
                  {activeUser?.name}'s Move
                </p>
              )}
            />
            <Avatar
              {...{
                name: dummyUser?.name,
                level: dummyUser?.level,
                image: dummyUser?.photo_url || profile1.src,
              }}
            />
          </div>

          {/* Chessboard with coordinate labels */}
          <div
            className={cn(
              "mx-2 py-2 px-1.5",
              "rounded-2xl",
              "bg-[rgba(221,194,167,1)] bg-gradient-to-b from-[rgba(95,63,87,0.4)] to-[rgba(95,63,87,0.15)]"
            )}
          >
            <RenderCaptured
              pieces={blackCaptured}
              color="white"
              className="gap-0"
            />
            <div className="flex justify-center rounded-xl shadow-lg bg-black/50 ">
              <div className="relative w-full px-1">
                {/* Top coordinate labels (A-H) */}
                <div className="flex justify-center items-center h-4">
                  <div className="flex w-full px-2">
                    {files.map((letter) => (
                      <div key={letter} className="flex-1 text-center">
                        <span className=" font-extralight text-[10px] text-white rounded">
                          {letter}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-stretch">
                  {/* Left rank numbers (8-1) */}
                  <div className="flex flex-col h-auto">
                    {ranks.map((number) => (
                      <div
                        key={number}
                        className="flex items-center justify-center flex-1"
                        // style={{ height: "33.75px" }}
                      >
                        <span className="font-extralight text-[10px] text-white rounded mr-1">
                          {number}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Chessboard */}
                  {/* <div className="rounded-xl shadow-lg p-4 bg-black/50"> */}
                  <Chessboard
                    customPieces={DefaultPieces}
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    onPieceDragBegin={(_, square) =>
                      actions?.onPieceClick(square)
                    }
                    // onPieceClick={(_, square) => actions?.onPieceClick(square)}
                    onSquareClick={(square) => actions?.onPieceClick(square)}
                    // boardWidth={270}
                    showBoardNotation={false}
                    customDarkSquareStyle={{ backgroundColor: darkSquareBack }}
                    customLightSquareStyle={{
                      backgroundColor: whiteSquareBack,
                    }}
                    customSquareStyles={highlightedSquares}
                    customBoardStyle={{
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                    customDropSquareStyle={{ backgroundColor: dropAreaBack }}
                  />
                  {/* </div> */}

                  {/* Right rank numbers (8-1) */}
                  <div className="flex flex-col ml-1 h-auto">
                    {ranks.map((number) => (
                      <div
                        key={number}
                        className="flex items-center justify-center flex-1"
                      >
                        <span className="font-extralight text-[10px] text-white rounded">
                          {number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom coordinate labels (A-H) */}
                <div className="flex justify-center items-center h-4 w-full">
                  <div className="flex px-2 w-full">
                    {files.map((letter) => (
                      <div key={letter} className="flex-1 text-center">
                        <span className="font-extralight text-[10px] text-white rounded">
                          {letter}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <RenderCaptured
              pieces={whiteCaptured}
              color="black"
              className="gap-0"
            />
          </div>

          {/* Game controls */}
          <div
            className={cn(
              "p-[3px] mt-7 mb-8",
              "rounded-2xl",
              "bg-gradient-to-r from-[#F7D8B7] to-[#EBC6A8]"
            )}
          >
            <div
              className={cn(
                "bg-[#DDC2A7]",
                "rounded-xl",
                "p-1 pr-7",
                "text-black flex justify-between items-center"
              )}
            >
              <div className=" bg-[#EED1B8] flex items-center gap-1 rounded-lg text-[#5F3F57] text-center text-[10px] font-made-tommy font-bold px-2 w-fit h-[28px]">
                <Image
                  src={otherdraw}
                  width={14}
                  height={14}
                  alt="other draw"
                />
                <p>Offer Draw</p>
              </div>
              <div className=" bg-[#491F36B2] flex items-center p-2 gap-1 rounded-xl font-made-tommy text-[7px] w-fit text-[#D7BCA3] font-[700] h-[15px]">
                <Image src={redign} alt="redign-icon" />
                <p>Redign</p>
              </div>
              <div className=" flex items-center">
                <Image src={message} width={18} height={16} alt="msg-icon" />
                <p className=" h-[15px] text-[9px] text-[#D7BCA3] font-made-tommy font-semibold rounded-lg bg-[#491F36B2] w-fit px-2.5">
                  chat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isGameOver && gameOverLag && (
        <GameOver
          yourScore={score}
          challenge={challenge?.data}
          gameOverDetails={gameOverDetails}
          isPending={isPending}
          isLoading={isLoading}
          resetGame={actions.resetGame}
          canPlayAgain={status?.isAvailable}
          refetchChallenge={refetchChallenge}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </ChessProvider>
  );
}
