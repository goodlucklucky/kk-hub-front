"use client";

import Spinner from "@/app/_components/spinner";
import { formatBigNumber, shuffleArray } from "@/app/_utils/number";
import { useCallback, useMemo, useState, useEffect } from "react";
import { spinnerProbability, TSpinner } from "./probabilities";
import { SpinWheelIcon } from "@/app/_assets/svg/etc";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { cn } from "@/app/_lib/utils";
import Button from "@/app/_components/shared/button";
import Image from "next/image";
import spinBtn from "@assets/images/spin-btn.png";
import spinModal from "@assets/images/spin-modal.png";
import spinModalBlur from "@assets/images/spin-modal-blur.png";
import pet2 from "@assets/images/pet2.png";
import usdtIcon from "@assets/images/usdt.png";
import { useRouter } from "next/navigation";

interface SpinnerBoxProps {
  clearTimer?: () => void;
}

export default function SpinnerBox({ clearTimer }: SpinnerBoxProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalSpins, setTotalSpins] = useState(3);
  const [openReward, setOpenReward] = useState(false);
  const [, setReward] = useState<TSpinner | null>(null);

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

  const handleEndSpin = useCallback(async () => {
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
        if (clearTimer) clearTimer();
      }
    },
    [totalSpins, loading, isClient, clearTimer]
  );

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Spinner
        className="p-2 pb-0 max-w-[45ch] mx-auto"
        segments={spinsList.map((one) => ({
          value: one.kokos,
          element: (
            <div className="flex flex-col text-center font-bold text-white">
              <span className="text-xl">
                {one.type === "USDT" ? "$" : ""}
                {one.type === "NFT" ? "NFT" : formatBigNumber(one.value, 3)}
              </span>
              {one.type === "USDT" ? (
                <Image
                  src={usdtIcon}
                  alt="usdt"
                  className="size-10 mx-auto rounded-full"
                />
              ) : one.type === "NFT" ? (
                <Image
                  src={pet2}
                  alt="nft"
                  className="size-10 mx-auto rounded-full"
                />
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
          <div
            className="bg-[url(/images/board_2.png)] bg-[length:100%_100%] bg-center rounded-4xl p-3 -mt-4 h-16 shadow-md"
            onClick={() => {
              if (loading || isSpinning || totalSpins <= 0) return;
              handleClick(handelClick);
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
          </div>
        )}
      </Spinner>
      <Dialog open={openReward} onOpenChange={handleCloseReward}>
        <DialogContent
          className="text-golden-brown text-center gap-2 mx-auto flex justify-center flex-col"
          titleClassName="opacity-0"
          title={"You've Won!"}
          containerClassName={cn(
            "flex flex-col gap-1 relative",
            "font-bold p-4"
          )}
        >
          <Image
            src={spinModal}
            alt="spin modal"
            className="absolute top-0 pl-0 left-0 right-0 w-full -z-10 h-full"
          />
          <div className="text-[#491F36] font-[400] text-center font-bumper-sticker text-[26px] tracking-[0.26px] lowercase pt-1">
            You've Won!
          </div>
          <div className="flex flex-col w-full bg-[#EED1B8] rounded-[22px] p-2 flex-1 relative gap-y-2">
            <div className="relative">
              <Image
                src={spinModalBlur}
                alt="spin modal blur"
                className="top-2 w-full"
              />
              <div className="flex justify-center items-center w-full h-[154px] z-10 absolute top-1/2 -translate-y-1/2">
                <Image
                  src={pet2}
                  alt="pet"
                  className="w-25 h-25 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] rounded-[5px]"
                />
              </div>
            </div>
            <div className="bg-blown-light rounded-xl p-2">
              <div className="flex justify-center items-center">
                <p className="text-[#491F36] font-made-tommy text-[18px] font-bold tracking-[0.18px] pr-1">
                  Mamba Snake Skin
                </p>
                <div className="rounded-[5px] bg-[#853834] h-[18px] text-[#F5DDC4] font-made-tommy text-[14px] font-bold tracking-[0.14px] px-1 leading-[18px]">
                  NFT
                </div>
              </div>
              <p className="text-[#745061] font-made-tommy text-[14px] font-bold tracking-[0.14px]">
                Log In to Claim!
              </p>
            </div>
            <div
              className={cn(
                "rounded-xl p-2",
                "flex flex-col gap-2",
                "bg-[#E3BEAA] rounded-[14px]"
              )}
            >
              <Button
                className="rounded-[8px] bg-gradient-to-b from-[#A291FF] from-10% to-[#856FFF] to-[201.67%]"
                onClick={() => {
                  router.push("/home");
                }}
              >
                <span className="text-[#EFF6FF] font-made-tommy text-[20px] font-extrabold tracking-[0.4px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                  Enter Now
                </span>
              </Button>
              <Button
                className={cn(
                  "rounded-[6px] bg-gradient-to-r from-[#FBB600] from-[0.16%] to-[#FFCE36] to-[100%]",
                  "drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-yellow),_black_25%)]",
                  "text-[#A16B33] font-made-tommy text-[20px] font-extrabold tracking-[0.4px]",
                  "flex gap-2 items-center justify-center text-center"
                )}
              >
                <SpinWheelIcon className="size-5" />
                <span>Share Tweet for 1 Spin</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
