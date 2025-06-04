import React, { useMemo } from "react";

interface BoardProps {
  board: string[][];
  currentPiece: {
    shape: number[][];
    position: { x: number; y: number };
    color: string;
  } | null;
  BOARD_HEIGHT: number;
  BOARD_WIDTH: number;
}

export function TetrisBoard({
  board,
  currentPiece,
  BOARD_HEIGHT,
  BOARD_WIDTH,
}: BoardProps) {
  const displayBoard = useMemo(() => {
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
    return displayBoard;
  }, [board, currentPiece]);

  return (
    <>
      {displayBoard.map((row, y) => (
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
      ))}
    </>
  );
}
