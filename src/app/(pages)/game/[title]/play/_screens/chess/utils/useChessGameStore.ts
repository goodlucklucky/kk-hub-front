"use client";

import { create } from "zustand";
import { Chess, Move, Square } from "chess.js";
import {
  activeAreaBack,
  isCanBeNext,
  isCaptureBack,
} from "../constants/colors";

interface ChessMove {
  from: string;
  to: string;
  promotion?: string;
}

export type TGameState =
  | "ongoing"
  | "checkmate"
  | "draw"
  | "stalemate"
  | "insufficient"
  | "threefold";

type GameOutcome =
  | { result: "ongoing" }
  | { result: "checkmate"; winner: "white" | "black" }
  | { result: "draw" | "stalemate" | "insufficient" | "threefold" };

export type GameStateActions = {
  makeMove: (move: ChessMove) => boolean;
  undoMove: () => void;
  resetGame: () => void;
  setComputerThinking: (thinking: boolean) => void;
  clearError: () => void;
  onPieceClick: (square: Square) => void;
};

interface GameState {
  game: Chess;
  moves: string[];
  time: number;
  bestTime: number;
  startTime: number;
  setTime: (time: number) => void;
  setBestTime: (time: number) => void;
  setStartTime: (startTime: number) => void;
  isComputerThinking: boolean;
  // gameState: TGameState;
  gameOutcome: GameOutcome;
  isGameOver: boolean;
  currentError: string | null;
  highlightedSquares: { [square: string]: React.CSSProperties };
  capturedPieces: { piece: string; color: "w" | "b"; atMove: number }[];
  selectedSquare: Square | null;
  actions: GameStateActions;
}

function highlightSquares(legalMoves: Move[], square: Square) {
  try {
    const highlights: { [square: string]: React.CSSProperties } = {};
    legalMoves.forEach((move) => {
      const isCapture = move?.isCapture() || move.isEnPassant();
      highlights[move.to] = {
        background: isCapture ? isCaptureBack : isCanBeNext,
      };
    });

    // Highlight selected square
    highlights[square] = {
      background: activeAreaBack,
    };

    return highlights;
  } catch {
    return null;
  }
}

export const useGameStore = create<GameState>((set, get) => ({
  game: new Chess(),
  moves: [],
  time: 0,
  bestTime: 0,
  startTime: Date.now(),
  isComputerThinking: false,
  highlightedSquares: {},
  capturedPieces: [],
  // gameState: "ongoing",
  gameOutcome: { result: "ongoing" },
  isGameOver: false,
  selectedSquare: null,
  currentError: null,
  setTime: (time) => set({ time }),
  setStartTime: (startTime) => set({ startTime: startTime }),
  setBestTime: (time) => set({ bestTime: time }),
  actions: {
    onPieceClick: (square: Square) => {
      const { game, selectedSquare, actions } = get();

      if (selectedSquare === square) {
        set({ selectedSquare: null, highlightedSquares: {} });
        return;
      }

      if (selectedSquare) {
        const legalMoves = game.moves({
          square: selectedSquare,
          verbose: true,
        });

        const targetMove = legalMoves.find((m) => m.to === square);
        if (targetMove) {
          actions.makeMove({
            from: selectedSquare,
            to: square,
            promotion: targetMove.promotion ?? undefined,
          });
          return;
        }
      }

      const legalMoves = game.moves({ square, verbose: true });
      if (legalMoves.length === 0) {
        set({ selectedSquare: null, highlightedSquares: {} });
        return;
      }

      const highlights = highlightSquares(legalMoves, square);
      set({
        selectedSquare: square,
        highlightedSquares: highlights ?? {},
        currentError: null,
      });
    },

    makeMove: (move) => {
      let success = false;
      set((state) => {
        try {
          const { game, actions } = state;

          actions.clearError();

          const captured = game.get(move.to as Square);
          const result = game.move(move);
          if (!result) throw new Error("Invalid move");

          const capturedPieces = result.captured
            ? [
                ...state.capturedPieces,
                {
                  piece: captured?.type || "",
                  color: captured?.color as "w" | "b",
                  atMove: state.moves.length + 1,
                },
              ]
            : state.capturedPieces;

          let gameOutcome: GameOutcome = { result: "ongoing" };
          let isGameOver = false;

          if (game.isCheckmate()) {
            const winner = game.turn() === "w" ? "black" : "white";
            gameOutcome = { result: "checkmate", winner };
            isGameOver = true;
          } else if (game.isStalemate()) {
            gameOutcome = { result: "stalemate" };
            isGameOver = true;
          } else if (game.isInsufficientMaterial()) {
            gameOutcome = { result: "insufficient" };
            isGameOver = true;
          } else if (game.isThreefoldRepetition()) {
            gameOutcome = { result: "threefold" };
            isGameOver = true;
          } else if (game.isDraw()) {
            gameOutcome = { result: "draw" };
            isGameOver = true;
          }

          success = true;
          return {
            game,
            moves: [...state.moves, result.san],
            capturedPieces,
            currentError: null,
            selectedSquare: null,
            highlightedSquares: {},
            gameOutcome,
            isGameOver,
          };
        } catch (error) {
          return {
            ...state,
            currentError:
              error instanceof Error ? error.message : "Invalid move",
          };
        }
      });
      return success;
    },

    undoMove: () =>
      set((state) => {
        const newMoves = state.moves.slice(0, -1);
        const newGame = new Chess();
        const newCaptured: GameState["capturedPieces"] = [];

        newMoves.forEach((san, idx) => {
          // const prevFen = newGame.fen();
          const moveResult = newGame.move(san);
          if (moveResult?.captured) {
            newCaptured.push({
              piece: moveResult.captured,
              color: moveResult.color === "w" ? "b" : "w",
              atMove: idx + 1,
            });
          }
        });

        return {
          game: newGame,
          moves: newMoves,
          capturedPieces: newCaptured,
          highlightedSquares: {},
          selectedSquare: null,
          currentError: null,
          isComputerThinking: false,
        };
      }),

    resetGame: () =>
      set({
        game: new Chess(),
        moves: [],
        capturedPieces: [],
        currentError: null,
        isComputerThinking: false,
        selectedSquare: null,
        highlightedSquares: {},
        gameOutcome: { result: "ongoing" },
        isGameOver: false,
      }),

    setComputerThinking: (thinking) => set({ isComputerThinking: thinking }),
    clearError: () => set({ currentError: null }),
  },
}));
