"use client";

import Spinner from "@/app/_components/spinner";
import { formatBigNumber, shuffleArray } from "@/app/_utils/number";
import { useCallback, useMemo, useState, useEffect } from "react";
import { spinnerProbability, TSpinner } from "./probabilities";
import { SpeakerIcon, UsdIcon } from "@/app/_assets/svg/etc";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { cn } from "@/app/_lib/utils";
import Button from "@/app/_components/shared/button";

export default function SpinnerBox() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalSpins, setTotalSpins] = useState(3);
  const [openReward, setOpenReward] = useState(false);
  const [reward, setReward] = useState<TSpinner | null>(null);

  const spinsList = useMemo(() => {
    if (isClient) return shuffleArray(spinnerProbability);

    return [];
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSpinNumber = useCallback(async () => {
    if (!isClient) return 0;

    const randomIndex = Math.floor(Math.random() * spinsList?.length);
    setReward(spinsList[randomIndex]);
    return spinsList[randomIndex]?.kokos;
  }, [isClient, spinsList]);

  const handleEndSpin = useCallback(async (_result: number) => {
    setTotalSpins((prev) => Math.max(0, prev - 1));
    setOpenReward(true);
    setLoading(false);
  }, []);

  const handleCloseReward = useCallback((bool: boolean) => {
    setOpenReward(bool);
    if (!bool) setReward(null);
  }, []);

  const handleClick = useCallback(
    (handelClick: () => void) => {
      if (totalSpins > 0 && !loading && isClient) {
        setLoading(true);
        handelClick();
      }
    },
    [totalSpins, loading, isClient]
  );

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Spinner
        className="p-2 pb-0 -mb-10 max-w-[45ch] mx-auto"
        segments={spinsList.map((one) => ({
          value: one.kokos,
          element: (
            <div className="flex flex-col text-center font-bold text-white">
              <span className="text-xl">
                {one.type === "USDT" ? "$" : ""}
                {formatBigNumber(one.value, 3)}
              </span>
              {one.type === "USDT" ? (
                <UsdIcon className="size-10 mx-auto" />
              ) : one.type === "kokos" ? (
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
        onSpinEnd={handleEndSpin}
      >
        {({ handelClick, isSpinning }) => (
          <div className=" bg-[url(/images/board_2.png)] bg-cover bg-center rounded-4xl p-3">
            <Button
              onClick={() => handleClick(handelClick)}
              disabled={loading || isSpinning || totalSpins <= 0}
              className={cn(
                "flex bg-[#DDDB0A] gap-2 items-center justify-center rounded-2xl font-bold w-full"
              )}
            >
              <span className="drop-shadow-md text-[#715F16CC]">Spin</span>
            </Button>
          </div>
        )}
      </Spinner>
      <Dialog open={openReward} onOpenChange={handleCloseReward}>
        <DialogContent
          className="text-golden-brown text-center gap-2"
          title="YOU'VE WON"
          titleClassName="font-bumper-sticker"
          containerClassName={cn("flex flex-col gap-2", "font-bold")}
        >
          <div className="bg-blown-light rounded-xl p-2 aspect-[2/1]"></div>
          <div className="bg-blown-light/50 rounded-xl p-2 text-golden-darker">
            <p>
              {formatBigNumber(reward?.value || 0)} {reward?.type}
            </p>
            <p className="opacity-60">Log In to Claim!</p>
          </div>
          <div
            className={cn(
              "bg-blown-dark rounded-xl p-2",
              "flex flex-col gap-2"
            )}
          >
            <Button className="">Enter Now</Button>
            <Button
              className={cn(
                "bg-gradient-to-r from-yellow-dark to-yellow",
                "drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-yellow),_black_25%)]",
                "text-golden-dark",
                "flex gap-2 items-center justify-center"
              )}
            >
              <SpeakerIcon className="size-5" />
              <span>Share Tweet for 1 Spin</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
