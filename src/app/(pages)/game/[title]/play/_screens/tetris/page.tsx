"use client";

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { useState, useEffect, useCallback, useRef } from "react";
import TetrisRefreshIcon from "@/app/_assets/svg/tetris-refresh.svg";
import NeonMountainsVisualImage from "@/app/_assets/images/neon-mountains-visual.png";
import { useAudioPlayer } from "@/app/_hooks/use-audio";
import { arcadeClassicFont } from "@/app/_lib/fonts";
// Tetris piece definitions
const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: "#00f5ff",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#ffff00",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#a000f0",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00f000",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#f00000",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#0000f0",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#ffa500",
  },
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_BOARD = Array(BOARD_HEIGHT)
  .fill(null)
  .map(() => Array(BOARD_WIDTH).fill(0));

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPaused, setIsPaused] = useState(false);

  const gameLoopRef = useRef<NodeJS.Timeout>(null);
  const dropTimeRef = useRef(700);

  const movePieceSound = useAudioPlayer("/sounds/move-piece.mp3", sectionRef);
  const hardDropSound = useAudioPlayer("/sounds/hard-drop.mp3", sectionRef);
  const gameOverSound = useAudioPlayer("/sounds/game-over.mp3", sectionRef);

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

  const rotatePiece = (piece: Piece): Piece => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map((row) => row[index]).reverse()
    );
    return { ...piece, shape: rotated };
  };

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
    }
  }, [
    nextPiece,
    createPiece,
    getRandomPiece,
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
  }, [currentPiece, board, gameOver, isPaused, isValidMove]);

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

  // Initialize game
  useEffect(() => {
    setNextPiece(getRandomPiece());
    spawnNewPiece();
  }, [getRandomPiece, spawnNewPiece]);

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

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.position.y + y;
            const boardX = currentPiece.position.x + x;
            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="grid grid-cols-10">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-full h-6 flex items-center justify-center"
            style={{
              border: "0.5px solid #18181b",
              backgroundColor: cell ? cell : "transparent",
              boxShadow: cell
                ? "inset 0 0 0 1px rgba(255,255,255,0.3)"
                : "none",
            }}
          >
            {cell ? (
              <div
                className="w-5 h-5 rounded-sm"
                style={{
                  background: `linear-gradient(135deg, ${cell}, ${cell}dd)`,
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    ));
  };

  const renderPreviewPiece = (pieceType: string | null) => {
    if (!pieceType) return null;

    const tetromino = TETROMINOS[pieceType as keyof typeof TETROMINOS];
    return (
      <div className="flex flex-col items-center">
        {tetromino.shape.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={x}
                className="w-2 h-2"
                style={{
                  backgroundColor: cell ? tetromino.color : "transparent",
                }}
              >
                {cell ? (
                  <div
                    className="w-full h-full rounded-sm"
                    style={{
                      background: `linear-gradient(135deg, ${tetromino.color}, ${tetromino.color}dd)`,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={sectionRef}
      style={{
        backgroundImage: `url(${NeonMountainsVisualImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100dvh",
        minWidth: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
      className={`p-2 flex flex-col -z-10 ${arcadeClassicFont.className}`}
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
              {renderBoard()}
            </div>
          </div>
          {/* Right Panel */}
          <div className="w-[15%]">
            <div className="text-[8px] text-center font-bold mb-2 text-[#14FCEC]">
              NEXT PIECE
            </div>
            <div className="rounded-md bg-gradient-to-tr from-violet-400 via-purple-600 to-pink-400 p-0.5">
              <div className="bg-gray-900 p-2 rounded min-h-[40px] flex items-center justify-center">
                {renderPreviewPiece(nextPiece)}
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
        {gameOver ? (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Game Over</h2>
              <p className="mb-4">Final Score: {score}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-500"
              >
                Play Again
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
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
