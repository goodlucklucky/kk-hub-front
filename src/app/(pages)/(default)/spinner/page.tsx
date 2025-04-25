'use client';

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { XpBar } from "../_components/xp-bar";
import PageTitleBanner from "@/app/_components/shared/page-title-banner";
import Spinner from "@/app/_components/spinner";

//import utils
import { formatBigNumber, shuffleArray } from "@/app/_utils/number";
import { cn } from "@/app/_lib/utils";

//import images
import flashingEffect from '@assets/images/flashing-effect.png';
import spinnerBack from '@assets/images/spinner-back.png';
import usdt from '@assets/images/usdt.png';
import spinBtn from '@assets/images/spin-btn.png';
import moreBtn from '@assets/images/more-btn.png';
import WithdrawDialog from "../_components/dialogs/withdraw-dialog";
import MoreSpinsDialog from "../_components/dialogs/more-dialog";

export const spinnerProbability = [
  {
    kokos: 1,
    prob: 75.0,
    type: "kokos",
    value: 10000,
  },
  {
    kokos: 2,
    prob: 15.0,
    type: "kokos",
    value: 25000,
  },
  {
    kokos: 3,
    prob: 7.8,
    type: "kokos",
    value: 50000,
  },
  {
    kokos: 4,
    prob: 0.085,
    type: "USDT",
    value: 0.1,
  },
  {
    kokos: 5,
    prob: 0.035,
    type: "USDT",
    value: 0.25,
  },
  {
    kokos: 6,
    prob: 0.00125,
    type: "USDT",
    value: 1,
  },
  {
    kokos: 7,
    prob: 0.000025,
    type: "USDT",
    value: 5,
  },
  {
    kokos: 7,
    prob: 0.00000025,
    type: "USDT",
    value: 10,
  },
  {
    kokos: 9,
    prob: 0.000000015,
    type: "USDT",
    value: 50,
  },
  {
    kokos: 10,
    prob: 2.0,
    type: "spin",
    value: 1,
  },
];

export default function SpinPage() {
  const [loading, setLoading] = useState(false);
  const [spinsList, setSpinsList] = useState(spinnerProbability);
  const [withdrawDialog, setWithdrawDialog] = useState(false);
  const [moreSpinsDialog, setMoreSpinsDialog] = useState(true);

  useEffect(() => {
    // Only shuffle on client-side
    setSpinsList(shuffleArray(spinnerProbability));
  }, []);

  const getSpinNumber = useCallback(async () => {
    const random = Math.random() * 100;
    let cumulativeProb = 0;

    for (const item of spinsList) {
      cumulativeProb += item.prob;
      if (random <= cumulativeProb) {
        return item.kokos;
      }
    }

    return 1; // Default fallback
  }, [spinsList]);

  return (
    <>
      <XpBar currentXp={745} maxXp={3250} />
      <div className={cn("flex flex-col flex-1 h-full items-center gap-y-5")}>
        <Image
          src={spinnerBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading='lazy'
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
      <div className="my-auto">
        <PageTitleBanner
          className={`relative m-0 top-6 mx-auto ${loading ? "push-effect" : ""
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
          className="p-2 pb-0 pt-4"
          segments={spinsList?.map((one) => ({
            value: one.kokos,
            element: (
              <div className="flex flex-col text-center font-bold text-white">
                <span className="text-xl">
                  {one?.type == "USDT" && "$"}
                  {formatBigNumber(one?.value, 3)}
                </span>
                {one?.type == "USDT" ? (
                  <Image
                    src={usdt}
                    alt="usdt"
                    width={800}
                    height={800}
                    priority
                    className="size-10 mx-auto"
                  />
                ) : one?.type == "kokos" ? (
                  <p className="flex flex-col font-semibold">
                    <span>KOKO</span>
                    <small>POINTS</small>
                  </p>
                ) : (
                  <p>SPIN</p>
                )}
              </div>
            ),
          }))}
          getTargetNumber={getSpinNumber}
          onSpinEnd={() => { }}
        >
          {({ handelClick, isSpinning }) => (
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-center relative items-center h-9">
                <Image src={spinBtn} alt="spin-btn" className="absolute top-0 left-0 -z-10" width={800} height={800} />
                <span className="text-[#715F16] font-made-tommy font-extrabold text-lg">Spin</span>
              </div>
              <div className="flex justify-center relative -top-[3px] items-center h-9">
                <Image src={moreBtn} alt="spin-btn" className="absolute top-0 left-0 -z-10" width={800} height={800} />
                <span className="text-[#715F16] font-made-tommy font-extrabold text-lg">
                  Get More Spins
                </span>
              </div>
            </div>
          )}
        </Spinner>
      </div>
      <WithdrawDialog isOpen={withdrawDialog} onClose={() => setWithdrawDialog(false)} />
      <MoreSpinsDialog isOpen={moreSpinsDialog} onClose={() => setMoreSpinsDialog(false)} />
    </>
  );
}
