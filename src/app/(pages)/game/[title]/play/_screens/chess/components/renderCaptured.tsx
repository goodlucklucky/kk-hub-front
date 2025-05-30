import { cn } from "@/app/_lib/utils";
import React from "react";
import { DefaultPieces } from "./piecesIcons";

export function GetPiece({
  piece,
  color = "w",
}: {
  piece: string;
  color?: string;
}) {
  // console.log(piece, color);

  return DefaultPieces[
    `${color?.[0]?.toLowerCase?.()}${piece?.toUpperCase()}`
  ]?.({ className: "translate-y-0.5 -m-1 -mx-2" });
}

export default function RenderCaptured({
  pieces,
  color = "w",
  className,
}: {
  className?: string;
  color?: string;
  pieces: string[];
}) {
  return (
    <div className={cn("flex gap-4 min-h-8", className)}>
      {pieces.map((p, i) => (
        <GetPiece key={i} piece={p} color={color} />
      ))}
    </div>
  );
}
