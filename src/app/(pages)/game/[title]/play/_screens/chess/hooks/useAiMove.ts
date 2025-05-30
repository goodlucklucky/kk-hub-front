import { useCallback, useEffect, useRef } from "react";
import { Game } from "js-chess-engine";
import { GameStateActions } from "../utils/useChessGameStore";
import { Chess, Square } from "chess.js";
import { convertChessJsToJsChessEngine } from "../utils/convertChessJsToJsChessEngine";

type TProps = {
  game: Chess;
  actions: GameStateActions;
  moves: string[];
};

export function useAiMove({ game, actions, moves }: TProps) {
  const previousMovesCount = useRef(moves?.length);

  const makeAiMove = useCallback(() => {
    try {
      // console.log("Triggering AI move");
      actions?.setComputerThinking(true);

      // console.log("Current game state:", game?.fen());

      const boardConfig = convertChessJsToJsChessEngine(game);

      // AI only moves when it's black's turn
      if (boardConfig.turn !== "black") {
        // console.warn("Not AI's turn. Skipping AI move.");
        return;
      }

      // console.log("chessEngine", Game, aiMove);

      const aiGame = new Game({
        boardConfiguration: boardConfig,
        pieces: boardConfig.pieces,
        turn: boardConfig.turn,
      });

      // console.log("Board config for AI move:", boardConfig);

      const aiMoveResult = aiGame.aiMove(3);
      // console.log("AI move result:", aiMoveResult);

      const from = Object.keys(aiMoveResult)[0];
      const to = aiMoveResult[from];

      // const fromRank = parseInt(from[1]);
      const toRank = parseInt(to[1]);
      const piece = game.get(from as Square)?.type;
      const promotionNeeded = piece === "p" && (toRank === 1 || toRank === 8);

      const moveDetails = {
        from: from?.toLowerCase(),
        to: to?.toLowerCase(),
        promotion: promotionNeeded ? "q" : undefined,
      };

      // console.log("Move details:", moveDetails);

      actions.makeMove(moveDetails);

      // if (!moveSucceeded) {
      //   console.error("Invalid move", {
      //     aiMoveResult,
      //     boardConfig,
      //     attemptedMove: moveDetails,
      //   });
      // }
    } catch {
      // console.error("Error making AI move", {
      //   move: error,
      //   boardState: game.fen(),
      // });
    } finally {
      actions?.setComputerThinking(false);
    }
  }, [game, actions, game?.fen()]);

  useEffect(() => {
    if (moves.length > previousMovesCount.current) {
      // Player just made a move
      // Trigger AI move after delay
      setTimeout(() => {
        makeAiMove();
      }, 500);
    }
    previousMovesCount.current = moves.length;
  }, [moves.length, makeAiMove]);

  return { makeAiMove };
}
