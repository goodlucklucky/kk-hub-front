"use client";

import Spinner from "@/app/_components/spinner";
import { formatBigNumber, shuffleArray } from "@/app/_utils/number";
import { useCallback, useMemo, useState, useEffect } from "react";
import { spinnerProbability, TSpinner } from "./probabilities";
import { SpeakerIcon, UsdIcon } from "@/app/_assets/svg/etc";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { cn } from "@/app/_lib/utils";
import Button from "@/app/_components/shared/button";
import Image from "next/image";
import spinBtn from '@assets/images/spin-btn.png';
import spinModal from '@assets/images/spin-modal.png';
import spinModalBlur from '@assets/images/spin-modal-blur.png';
import pet2 from '@assets/images/pet2.png';

export default function SpinnerBox() {
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalSpins, setTotalSpins] = useState(3);
  const [openReward, setOpenReward] = useState(true);
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
          <div className="bg-[url(/images/board_2.png)] bg-[length:100%_100%] bg-center rounded-4xl p-3 -mt-4 h-16 shadow-md"
            onClick={() => {
              if (loading || isSpinning || totalSpins <= 0) return;
              handleClick(handelClick)
            }}
          >
            {/* <Button
              onClick={() => handleClick(handelClick)}
              disabled={loading || isSpinning || totalSpins <= 0}
              className={cn(
                "flex bg-[#DDDB0A] gap-2 items-center justify-center rounded-2xl font-bold w-full"
              )}
            >
              <span className="drop-shadow-md text-[#715F16CC]">Spin</span>
              </Button> */}
            <div className="flex justify-center relative items-center h-9">
              <Image src={spinBtn} alt="spin-btn" className="absolute top-0 left-0 z-0" width={750} height={750} />
              <span className="text-[#715F16] font-made-tommy font-extrabold text-lg z-10">Spin</span>
            </div>
          </div>
        )}
      </Spinner>
      <Dialog open={openReward} onOpenChange={handleCloseReward}>
        <DialogContent
          className="text-golden-brown text-center gap-2 mx-auto flex justify-center flex-col"
          titleClassName="opacity-0"
          title={"You Won!"}
          containerClassName={cn("flex flex-col gap-1 relative", "font-bold p-4 h-[433px]")}
        >
          <Image src={spinModal} alt="spin banner" className="absolute top-0 pl-0 left-0 -z-10" />
          <div className="text-[#491F36] text-center font-bumper-sticker text-[26px] font-normal leading-normal tracking-[0.26px] lowercase pt-1">
            You Won!
          </div>
          <div className="flex flex-col w-full bg-[#EED1B8] rounded-[22px] p-2 mb-2 flex-1 relative">
            <Image src={spinModalBlur} alt="spin banner" className="-mt-2 absolute top-2" />
            <div className="flex justify-center items-center w-full h-[154px] z-10">
              <Image src={pet2} alt="pet" className="w-25 h-25 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[5px]" />
            </div>
            <div className="bg-blown-light rounded-xl p-2 text-golden-darker mt-3">
              <p className="text-[#491F36] font-made-tommy text-[18px] font-bold leading-normal tracking-[0.18px]">
                Kokomo Collectible
              </p>
              <p className="opacity-60">Log In to Claim!</p>
            </div>
            <div
              className={cn(
                "rounded-xl p-2",
                "flex flex-col gap-2 mt-2",
                "bg-[#E3BEAA] rounded-[14px]"
              )}
            >
              <Button className="rounded-[8px] bg-gradient-to-b from-[#A291FF] from-10% to-[#856FFF] to-[201.67%]">
                <span className="text-[#EFF6FF] font-made-tommy text-[17px] font-extrabold tracking-[0.4px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                  Enter Now
                </span>
              </Button>
              <Button
                className={cn(
                  "rounded-[6px] bg-gradient-to-r from-[#FBB600] from-[0.16%] to-[#FFCE36] to-[100%]",
                  "drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-yellow),_black_25%)]",
                  "text-[#7D4000] font-made-tommy text-[17px] font-extrabold tracking-[0.4px] drop-shadow-[0px_1px_0px_rgba(186,135,0,0.20)]",
                  "flex gap-2 items-center justify-center text-center"
                )}
              >
                <SpeakerIcon className="size-5" />
                <span>Share Tweet for 1 Spin</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
