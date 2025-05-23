"use client";

import { EyeIcon, PlayIcon, UsdIcon } from "@/app/_assets/svg/etc";
import React, { useEffect, useState } from "react";

function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function LivePreview() {
  const [totalPrizes, setTotalPrizes] = useState(101039.03);
  const [gamesPlayed, setGamesPlayed] = useState(757493);

  // total prizes
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const update = () => {
      setTotalPrizes((prev) =>
        Number((prev + Math.random() * 100 + 10).toFixed(2))
      );
      setGamesPlayed((prev) => prev + Math.floor(Math.random() * 4) + 1);

      const delay = Math.random() * 3000 + 1000;
      timeout = setTimeout(update, delay);
    };

    update();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="text-golden-bright relative font-bold px-[6%] pb-[calc(5%_+_20px)]">
      <div className="flex items-center justify-center gap-2 -mt-2">
        <EyeIcon className="text-grape" />
        <h3 className="text-center text-grape text-xl">Live Overview</h3>
      </div>
      <div className="bg-light rounded-b-2xl rounded-t contain-content mt-1.5">
        <div className="w-full rounded-b-2xl rounded-t-sm contain-content text-center bg-golden-bright text-golden-dark border-2 border-[#FFF0D6]">
          <div className="bg-golden-dark/15 py-2">
            <p className="flex gap-2 items-center justify-center text-lg font-bold">
              <UsdIcon className="size-6" />
              <span>{formatNumber(totalPrizes, 2)}</span>
            </p>
            <p className="font-semibold">Total Prizes</p>
          </div>
          <div className="py-2">
            <p className="flex gap-2 items-center justify-center text-lg font-bold">
              <PlayIcon className="size-5" />
              <span>{formatNumber(gamesPlayed)}</span>
            </p>
            <p className="font-semibold">Games Played</p>
          </div>
        </div>
      </div>
    </div>
  );
}
