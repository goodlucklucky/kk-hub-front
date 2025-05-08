"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { XpBar } from "../_components/xp-bar";
import PageTitleBanner from "@/app/_components/shared/page-title-banner";
import Spinner from "@/app/_components/spinner";

import WithdrawDialog from "../_components/dialogs/withdraw-dialog";
import MoreSpinsDialog from "../_components/dialogs/more-dialog";

//import utils
import { formatBigNumber, shuffleArray } from "@/app/_utils/number";
import { cn } from "@/app/_lib/utils";
import { spinnerProbability, SpinnerItem } from "./spinner-config";

//import images
import flashingEffect from "@assets/images/flashing-effect.png";
import spinnerBack from "@assets/images/spinner-back.png";
import usdt from "@assets/images/usdt.png";
import spinBtn from "@assets/images/spin-btn.png";
import moreBtn from "@assets/images/more-btn.png";

interface SpinnerSegment {
  value: number;
  element: JSX.Element;
  color?: string;
}

export default function SpinPage() {
  const [loading, setLoading] = useState(false);
  const [spinsList, setSpinsList] = useState<SpinnerItem[]>(spinnerProbability);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [moreSpinsDialog, setMoreSpinsDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [totalSpins, setTotalSpins] = useState(3);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEndSpin = useCallback(async (_result: number) => {
    setTotalSpins((prev) => Math.max(0, prev - 1));
    // setOpenReward(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Only shuffle on client-side
    setSpinsList(shuffleArray(spinnerProbability));
  }, []);

  const getSpinNumber = useCallback(async (): Promise<number | undefined> => {
    const random = Math.random() * 100;
    let cumulativeProb = 0;

    for (const item of spinsList) {
      cumulativeProb += item.prob;
      if (random <= cumulativeProb) {
        return item.kokos;
      }
    }

    return undefined; // Return undefined instead of 1 to match Spinner component's interface
  }, [spinsList]);

  const handleSpinEnd = useCallback((result: number) => {
    // Handle spin end logic here
    console.log("Spin ended with result:", result);
  }, []);

  const segments: SpinnerSegment[] = spinsList.map((one) => ({
    value: one.kokos,
    element: (
      <div
        key={one.kokos}
        className="flex flex-col text-center font-bold text-white"
      >
        <span className="text-xl">
          {one.type === "USDT" && "$"}
          {formatBigNumber(one.value, 3)}
        </span>
        {one.type === "USDT" ? (
          <Image
            src={usdt}
            alt="usdt"
            width={800}
            height={800}
            priority
            className="size-10 mx-auto"
          />
        ) : one.type === "kokos" ? (
          <p className="flex flex-col font-semibold text-xs 2xs:text-sm xs:text-base">
            <span>KOKO</span>
            <small>POINTS</small>
          </p>
        ) : (
          <p>SPIN</p>
        )}
      </div>
    ),
  }));

  const handleClick = useCallback(
    (handelClick: () => void) => {
      if (totalSpins > 0 && !loading && isClient) {
        setLoading(true);
        handelClick();
      }
    },
    [totalSpins, loading, isClient]
  );

  return (
    <>
      <XpBar currentXp={745} maxXp={3250} />
      <div className={cn("flex flex-col flex-1 h-full items-center gap-y-5")}>
        <Image
          src={spinnerBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="lazy"
          priority={false}
        />
        <Image
          src={flashingEffect}
          alt="flashing-effect"
          className="absolute top-[17%] opacity-0"
          style={{
            animation: loading ? "flashing 1s ease" : "",
          }}
        />
      </div>
      <div className="my-auto fixed top-26 xs:top-28 sm:top-30 bottom-28 flex flex-col justify-center items-center w-full">
        <PageTitleBanner
          className={`relative m-0 top-6 mx-auto ${
            loading ? "push-effect" : ""
          }`}
          titleBanner={
            <p className="text-center text-2xl leading-5">
              KOKO
              <br />
              spinner
            </p>
          }
          spinner
        />
        <Spinner
          className="p-2 pb-0 max-w-[45ch] mx-auto w-[95%]"
          segments={segments}
          getTargetNumber={getSpinNumber}
          onSpinEnd={handleSpinEnd}
        >
          {({ handelClick, isSpinning }) => (
            <div className="flex flex-col gap-y-4 bg-[url(/images/board_2.png)] bg-[length:100%_100%] bg-center rounded-4xl p-3 -mt-8 2xs:-mt-4 shadow-md">
              <div
                className="flex justify-center relative items-center h-9"
                onClick={() => {
                  if (loading || isSpinning || totalSpins <= 0) return;
                  handleClick(handelClick);
                }}
              >
                <Image
                  src={spinBtn}
                  alt="spin-btn"
                  className="absolute top-0 left-0 z-0"
                  width={750}
                  height={750}
                />
                <span className="text-[#715F16] font-made-tommy font-extrabold text-lg z-10">
                  Spin
                </span>
              </div>
              <div className="flex justify-center relative -top-[3px] items-center h-9">
                <Image
                  src={moreBtn}
                  alt="spin-btn"
                  className="absolute top-0 left-0 z-0"
                  width={800}
                  height={800}
                />
                <span className="text-[#715F16] font-made-tommy font-extrabold text-lg z-10">
                  Get More Spins
                </span>
              </div>
            </div>
          )}
        </Spinner>
      </div>
      <WithdrawDialog
        isOpen={withdrawDialog}
        onClose={() => setWithdrawDialog(false)}
      />
      <MoreSpinsDialog
        isOpen={moreSpinsDialog}
        onClose={() => setMoreSpinsDialog(false)}
      />
    </>
  );
}
