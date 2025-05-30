import { Chess } from "chess.js";

export function convertChessJsToJsChessEngine(chess: Chess): {
  pieces: { [square: string]: string };
  turn: "white" | "black";
} {
  const pieces: { [square: string]: string } = {};
  const board = chess.board();

  const files = "abcdefgh";
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const square = `${files[file].toUpperCase()}${8 - rank}`;
      const piece = board[rank][file];
      if (piece) {
        const pieceChar =
          piece.color === "w"
            ? piece.type.toUpperCase()
            : piece.type.toLowerCase();
        pieces[square] = pieceChar;
      }
    }
  }

  return {
    pieces,
    turn: chess.turn() === "w" ? "white" : "black",
  };
}
