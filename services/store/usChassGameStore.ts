import { create } from "zustand";
import { Chess } from "chess.js";

interface ChessMove {
  from: string;
  to: string;
  promotion?: string;
}

interface GameState {
  game: Chess;
  moves: string[];
  isComputerThinking: boolean;
  currentError: string | null;
  actions: {
    makeMove: (move: ChessMove) => boolean;
    undoMove: () => void;
    resetGame: () => void;
    setComputerThinking: (thinking: boolean) => void;
    clearError: () => void;
  };
}

export const useGameStore = create<GameState>((set) => ({
  game: new Chess(),
  moves: [],
  isComputerThinking: false,
  currentError: null,
  actions: {
    makeMove: (move) => {
      let success = false;
      set((state) => {
        try {
          const result = state.game.move(move); // mutate directly
          if (!result) throw new Error("Invalid move");

          success = true;
          return {
            game: state.game, // same instance
            moves: [...state.moves, result.san],
            currentError: null,
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
        if (state.moves.length === 0) {
          return {
            ...state,
            currentError: "Nothing to undo",
          };
        }
        // Rebuild the game from scratch, omitting the last move
        const newGame = new Chess();
        const newMoves = state.moves.slice(0, -1);
        newMoves.forEach((san) => {
          newGame.move(san);
        });
        return {
          game: newGame,
          moves: newMoves,
          currentError: null,
          isComputerThinking: false,
        };
      }),
    resetGame: () =>
      set({
        game: new Chess(),
        moves: [],
        currentError: null,
        isComputerThinking: false,
      }),
    setComputerThinking: (thinking) => set({ isComputerThinking: thinking }),
    clearError: () => set({ currentError: null }),
  },
}));
