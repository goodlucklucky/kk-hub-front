"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import TetrisRefreshIcon from "@/app/_assets/svg/tetris-refresh.svg";
import NeonMountainsVisualImage from "@/app/_assets/images/neon-mountains-visual.png";
import { useAudioPlayer } from "@/app/_hooks/use-audio";
import { arcadeClassicFont } from "@/app/_lib/fonts";
import { TetrisBoard } from "./components/board";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  EMPTY_BOARD,
  TETROMINOS,
} from "./constants";
import { PreviewPiece } from "./components/previewNext";
import { cn } from "@/app/_lib/utils";
import { TetrisProvider } from "./contexts/tetris-context";
import GameOver from "./components/game-over";
import {
  ChallengeStatusEnum,
  IPostScoreResultsDetails,
  useGetChallenge,
  usePostScore,
} from "@/../services/game/challenges";
import { useParams, useSearchParams } from "next/navigation";
import { useGeneral } from "@/app/_providers/generalProvider";
import { gameKeys } from "../../../tournaments/constants/gameKeys";
import { useThirdweb } from "@/app/(pages)/(default)/_context/thirdwebContext";
import { availableBalance } from "@/app/_utils/number";
import useTimer from "../chess/hooks/useTimer";
// Tetris piece definitions

interface Position {
  x: number;
  y: number;
}

interface Piece {
  shape: number[][];
  color: string;
  position: Position;
}

export default function TetrisGame() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<string>("I");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOverDetails, setGameOverDetails] =
    useState<IPostScoreResultsDetails>();

  const { time } = useTimer();

  const gameLoopRef = useRef<NodeJS.Timeout>(null);
  const isSubmittingRef = useRef(false);
  const dropTimeRef = useRef(700);

  const movePieceSound = useAudioPlayer("/sounds/move-piece.mp3", sectionRef);
  const hardDropSound = useAudioPlayer("/sounds/hard-drop.mp3", sectionRef);
  const gameOverSound = useAudioPlayer("/sounds/game-over.mp3", sectionRef);

  const { sessionId, myScore } = useGeneral();
  const searchParams = useSearchParams();
  const challenge_id = useMemo(
    () => searchParams.get("challenge_id"),
    [searchParams]
  );

  const params = useParams();
  const title = useMemo(() => params?.title, [params?.title]);
  const gameKey = useMemo(
    () => gameKeys[title as keyof typeof gameKeys],
    [title]
  );

  const {
    balance: { refresh: refreshBalance },
  } = useThirdweb();

  const {
    data: challenge,
    // error: challengeError,
    refetch: refetchChallenge,
  } = useGetChallenge(
    challenge_id!,
    sessionId,
    ChallengeStatusEnum.ACTIVE,
    gameKey
  );
  const { mutateAsync: postScore, isPending } = usePostScore();

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
  }, [challenge?.data?.id, postScore, score, sessionId, time]);

  const getRandomPiece = useCallback((): string => {
    const pieces = Object.keys(TETROMINOS);
    return pieces[Math.floor(Math.random() * pieces.length)];
  }, []);

  const createPiece = useCallback((type: string): Piece => {
    const tetromino = TETROMINOS[type as keyof typeof TETROMINOS];
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      position: {
        x:
          Math.floor(BOARD_WIDTH / 2) -
          Math.floor(tetromino.shape[0].length / 2),
        y: 0,
      },
    };
  }, []);

  const rotatePiece = useCallback((piece: Piece): Piece => {
    const rotated = piece?.shape?.[0]?.map?.((_, index) =>
      piece?.shape?.map((row) => row[index]).reverse()
    );
    return { ...piece, shape: rotated };
  }, []);

  const isValidMove = useCallback(
    (piece: Piece, newBoard: number[][]): boolean => {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const newX = piece.position.x + x;
            const newY = piece.position.y + y;

            if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
              return false;
            }

            if (newY >= 0 && newBoard[newY][newX]) {
              return false;
            }
          }
        }
      }
      return true;
    },
    []
  );

  const placePiece = useCallback(
    (piece: Piece, gameBoard: number[][]): number[][] => {
      const newBoard = gameBoard.map((row) => [...row]);

      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const boardY = piece.position.y + y;
            const boardX = piece.position.x + x;
            if (boardY >= 0) {
              newBoard[boardY][boardX] = piece.color as unknown as number;
            }
          }
        }
      }

      return newBoard;
    },
    []
  );

  const clearLines = useCallback(
    (gameBoard: number[][]): { newBoard: number[][]; linesCleared: number } => {
      const newBoard = gameBoard.filter((row) =>
        row.some((cell) => cell === 0)
      );
      const linesCleared = BOARD_HEIGHT - newBoard.length;

      while (newBoard.length < BOARD_HEIGHT) {
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
      }

      return { newBoard, linesCleared };
    },
    []
  );

  const spawnNewPiece = useCallback(() => {
    const newPiece = createPiece(nextPiece);
    setCurrentPiece(newPiece);
    setNextPiece(getRandomPiece());

    if (!isValidMove(newPiece, board)) {
      gameOverSound.play();
      setGameOver(true);
      handelMatchEnd?.();
    }
  }, [
    nextPiece,
    createPiece,
    getRandomPiece,
    handelMatchEnd,
    board,
    isValidMove,
    gameOverSound,
  ]);

  const movePiece = useCallback(
    (dx: number, dy: number, playSound = false) => {
      if (!currentPiece || gameOver || isPaused) return;
      if (playSound) {
        movePieceSound.play();
      }

      const newPiece = {
        ...currentPiece,
        position: {
          x: currentPiece.position.x + dx,
          y: currentPiece.position.y + dy,
        },
      };

      if (isValidMove(newPiece, board)) {
        setCurrentPiece(newPiece);
      } else if (dy > 0) {
        // Piece hit bottom, place it
        const newBoard = placePiece(currentPiece, board);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);

        setBoard(clearedBoard);
        setScore((prev) => prev + linesCleared * 100 * level);

        spawnNewPiece();
      }
    },
    [
      currentPiece,
      board,
      gameOver,
      isPaused,
      isValidMove,
      placePiece,
      clearLines,
      level,
      spawnNewPiece,
      movePieceSound,
    ]
  );

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotatedPiece = rotatePiece(currentPiece);
    if (isValidMove(rotatedPiece, board)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, board, gameOver, isPaused, isValidMove, rotatePiece]);

  const hardDrop = useCallback(
    (playSound = false) => {
      if (!currentPiece || gameOver || isPaused) return;

      if (playSound) {
        hardDropSound.play();
      }

      let dropDistance = 0;
      let testPiece = { ...currentPiece };

      while (isValidMove(testPiece, board)) {
        dropDistance++;
        testPiece = {
          ...testPiece,
          position: { ...testPiece.position, y: testPiece.position.y + 1 },
        };
      }

      movePiece(0, dropDistance - 1);
    },
    [
      currentPiece,
      board,
      gameOver,
      isPaused,
      isValidMove,
      movePiece,
      hardDropSound,
    ]
  );

  const reset = useCallback(() => {
    setBoard(EMPTY_BOARD);
    setGameOver(false);
    setIsPaused(false);
    setCurrentPiece(null);
    setScore(0);
    setLevel(1);

    const next = getRandomPiece();
    setNextPiece(next);

    setGameOver(false);
    spawnNewPiece();
  }, [spawnNewPiece, getRandomPiece]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    gameLoopRef.current = setInterval(() => {
      movePiece(0, 1);
    }, dropTimeRef.current);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [movePiece, gameOver, isPaused]);

  // // Initialize game
  useEffect(() => {
    setNextPiece(getRandomPiece());
    spawnNewPiece();
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          movePiece(-1, 0, true);
          break;
        case "ArrowRight":
          e.preventDefault();
          movePiece(1, 0, true);
          break;
        case "ArrowDown":
          e.preventDefault();
          movePiece(0, 1, true);
          break;
        case "ArrowUp":
          e.preventDefault();
          rotatePieceHandler();
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
        case "c":
        case "C":
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [movePiece, rotatePieceHandler, hardDrop, gameOver]);

  const handlePlayAgain = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      reset?.();
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
    reset,
    isLoading,
    challenge?.data?.entry_fee,
    challenge?.data?.score_summary?.paid,
    refreshBalance,
  ]);

  return (
    <TetrisProvider>
      <div
        ref={sectionRef}
        style={{
          backgroundImage: `url(${NeonMountainsVisualImage?.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100%",
          minWidth: "100dvw",
          position: "relative",
          overflow: "hidden",
        }}
        className={cn(`p-2 flex flex-col z-10 ${arcadeClassicFont.className}`)}
      >
        <div
          style={{
            background: "transparent",
          }}
          className="relative z-10 backdrop-blur-md flex-1 h-full  border-purple-700 border-2 rounded-xl flex flex-col items-center p-2"
        >
          <div className="border-2 rounded-md mb-2 px-6 py-1 mx-auto border-[rgba(255,_55,_212,_1)]">
            <h2
              style={{ WebkitTextStroke: "1px sky" }}
              className="text-2xl text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-blue-500 to-pink-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-bold "
            >
              TETRIS
            </h2>
          </div>
          <div className="flex space-x-2 w-full">
            {/* Left panel */}
            <div className="w-[15%]">
              <div className="text-[8px] text-center font-bold mb-2">SCORE</div>
              <div className="rounded-md bg-gradient-to-tr from-violet-400 via-purple-600 to-pink-400 p-0.5">
                <div className="bg-gray-900 p-2 rounded min-h-[40px] flex items-center justify-center">
                  <span className="text-yellow-600 tabular-nums">{score}</span>
                </div>
              </div>
            </div>
            {/* Game board */}
            <div className="w-[70%] rounded border-2 border-purple-600/60">
              <div className="bg-zinc-900/40 backdrop-blur-sm p-px rounded">
                {/* {renderBoard()} */}
                <TetrisBoard
                  board={board}
                  currentPiece={currentPiece}
                  BOARD_HEIGHT={BOARD_HEIGHT}
                  BOARD_WIDTH={BOARD_WIDTH}
                />
              </div>
            </div>
            {/* Right Panel */}
            <div className="w-[15%]">
              <div className="text-[8px] text-center font-bold mb-2 text-[#14FCEC]">
                NEXT PIECE
              </div>
              <div className="rounded-md bg-gradient-to-tr from-violet-400 via-purple-600 to-pink-400 p-0.5">
                <div className="bg-gray-900 p-2 rounded min-h-[40px] flex items-center justify-center">
                  {/* {renderPreviewPiece(nextPiece)} */}
                  <PreviewPiece pieceType={nextPiece} />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex my-auto items-center justify-between w-full">
            <div className="relative">
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button
                  className="bg-zinc-800 active:bg-zinc-950 transition-all active:ring-black flex items-center justify-center ring-inset ring-2 ring-zinc-700 rounded-full size-10 text-white"
                  onClick={() => rotatePieceHandler()}
                >
                  <Chevron className="rotate-180" />
                </button>
                <div></div>
                <button
                  className="bg-zinc-800 active:bg-zinc-950 transition-all active:ring-black flex items-center justify-center ring-inset ring-2 ring-zinc-700 rounded-full size-10 text-white"
                  onClick={() => movePiece(-1, 0, true)}
                >
                  <Chevron className="rotate-90" />
                </button>
                <button
                  className="bg-zinc-800 active:bg-zinc-950 transition-all active:ring-black flex items-center justify-center ring-inset ring-2 ring-zinc-700 rounded-full size-10 text-white"
                  onClick={() => hardDrop(true)}
                >
                  <Chevron />
                </button>
                <button
                  className="bg-zinc-800 hover:bg-zinc-950 flex items-center justify-center ring-inset ring-2 ring-zinc-700 rounded-full size-10 text-white"
                  onClick={() => movePiece(1, 0, true)}
                >
                  <Chevron className="rotate-270" />
                </button>
              </div>
            </div>
            <button className="cursor-pointer" onClick={rotatePieceHandler}>
              <Image
                src={TetrisRefreshIcon}
                alt="shuffle tetris piece"
                width={96}
                height={96}
                className="w-24 h-24 object-cover object-center"
              />
            </button>
          </div>

          {/* Game Over */}
          {/* {gameOver ? (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Game Over</h2>
                <p className="mb-4">Final Score: {score}</p>
                <Button
                  onClick={reset}
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  Play Again
                </Button>
              </div>
            </div>
          ) : null} */}
          {gameOver && (
            <GameOver
              yourScore={score}
              challenge={challenge?.data}
              gameOverDetails={gameOverDetails}
              isPending={isPending}
              isLoading={isLoading}
              resetGame={reset}
              canPlayAgain={status?.isAvailable}
              refetchChallenge={refetchChallenge}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </div>
      </div>
    </TetrisProvider>
  );
}

const Chevron = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 18 15"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.04199 10.8757L17.542 1.62207V5.36847L9.04199 14.6221L0.541992 5.36847V1.62207L9.04199 10.8757Z"
      fill="#ADADAD"
    />
    <path
      d="M17.542 5.29973L17.4467 5.40336L9.29915 14.3394L9.04199 14.6221L8.78483 14.3394L0.63728 5.40336L0.541992 5.29973V0.62207L9.04199 9.94559L17.542 0.62207V5.29973ZM17.1884 1.53947L9.04199 10.4744L0.895586 1.53947V5.15723L9.04199 14.0921L17.1884 5.15723V1.53947Z"
      fill="#ADADAD"
    />
  </svg>
);
