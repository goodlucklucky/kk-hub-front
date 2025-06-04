import { useMemo } from "react";
import { TETROMINOS } from "../constants";

export function PreviewPiece({ pieceType }: { pieceType: string | null }) {
  const tetromino = useMemo(
    () => TETROMINOS[pieceType as keyof typeof TETROMINOS],
    [pieceType]
  );

  if (!pieceType) return null;
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
}
