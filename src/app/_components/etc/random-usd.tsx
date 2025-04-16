"use client";

import { cn } from "@/app/_lib/utils";
import React from "react";

export default function RandomUsd() {
  return (
    <div className="font-bumper-sticker">
      {Array.from({ length: 8 }).map((_, index) => {
        const isLeft = index % 2 == 0;
        const bottom = 0.5 + index * 1.5;
        const colors = [
          "var(--color-green-dark)",
          "var(--color-yellow-dark)",
          "var(--color-white)",
        ];
        const sizeRange = [1.5, 1.8];

        return (
          <span
            key={index}
            className={cn("absolute font-bold")}
            style={{
              [isLeft ? "left" : "right"]: `-${Math.random() * 1}rem`,
              bottom: `${bottom}rem`,
              rotate: `${isLeft ? "-" : ""}25deg`,
              color: colors?.[Math.floor(Math.random() * colors.length)],
              fontSize: `${
                sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
              }rem`,
            }}
          >
            $
          </span>
        );
      })}
    </div>
  );
}
