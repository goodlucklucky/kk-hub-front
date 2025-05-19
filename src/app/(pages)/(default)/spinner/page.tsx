"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { formatBigNumber, shuffleArray } from "@/app/_utils/number";
import { spinnerProbability } from "./spinner-config";
import {
  TRandom,
  useRandomSpin,
  useSpins,
} from "../../../../../services/spins";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { ConnectButton } from "@/app/_components/shared/connect-button";
import PageTitleBanner from "../_components/spinner/page-title-banner";
import Spinner from "@/app/_components/spinner";
import MoreSpins from "../_components/daily-login-spinner/more-spins";
import { Button } from "@/app/_components/ui/button";
import { XpBar } from "../_components/xp/bar";

//import images
import flashingEffect from "@assets/images/flashing-effect.png";
import spinnerBack from "@assets/images/spinner-back.png";
import usdt from "@assets/images/usdt.png";
import UserXp from "../_components/xp";

type TReward = "kokos" | "USDT" | "spin";

interface SpinnerSegment {
  value: number;
  element: JSX.Element;
  color?: string;
}

export default function KokoSpinner() {
  const { sessionId, addMyScore, addMyUsdt } = useContext(GeneralContext);
  const [updatedScore, setUpdateScore] = useState("");
  const [loading, setLoading] = useState(false);
  const [isGrayingOut, setIsGrayingout] = useState(false);
  const spinsList = useMemo(() => shuffleArray(spinnerProbability), []);
  const [, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [openReward, setOpenReward] = useState(false);

  const [randomTarget, setRandomTarget] = useState<TRandom>();

  const { data: spins, refetch } = useSpins({ sessionId });
  const { mutateAsync: getRandomTarget } = useRandomSpin({});

  const addScore = useCallback(
    async (amount: number = 0) => {
      try {
        addMyScore?.(amount);
      } catch {
        // console.error(error);
      }
    },
    [addMyScore]
  );

  const addUsdt = useCallback(
    async (amount: number = 0) => {
      try {
        addMyUsdt?.(amount);
      } catch {
        // console.error(error);
      }
    },
    [addMyUsdt]
  );

  const handleBonus = useCallback(async () => {
    setLoading(true);
    setTimeout(() => setIsGrayingout(true), 1000);
    const reward = randomTarget?.type as TReward;

    try {
      if (reward == "USDT") {
        setOpenReward(true);
        setUpdateScore(randomTarget?.value + " USDT");
        await addUsdt?.(randomTarget?.value);
      }
      if (reward == "kokos") {
        setUpdateScore((randomTarget?.value ?? 0) / 1000 + "K");
        await addScore?.(randomTarget?.value);
      }
      if (reward == "spin") {
        setUpdateScore("1 SPIN");
      }

      await refetch?.();
    } catch {
      // error
    } finally {
      setLoading(false);
      setIsGrayingout(false);
    }
  }, [addScore, addUsdt, randomTarget?.type, randomTarget?.value, refetch]);

  const getSpinNumber = useCallback(async () => {
    try {
      const spin = await getRandomTarget({ sessionId });
      setRandomTarget(spin?.data?.selected);
      return spin?.data?.selected?.kokos;
    } catch {
      return -1;
    }
  }, [getRandomTarget, sessionId]);

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

  return (
    <div className="bg-contain bg-center flex flex-col flex-1">
      <div
        className="absolute top-10 left-8 z-[101] text-[32px] text-white font-bold opacity-0"
        style={{
          animation: isGrayingOut ? "showingRewardsEffect 2s ease" : "",
        }}
      >
        +{updatedScore}
      </div>
      <div
        className="absolute w-[100vw] h-[100vh] top-0"
        style={{ animation: isGrayingOut ? "grayoutEffect 2s ease" : "" }}
      />
      <UserXp />
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
      <div className="my-auto flex-1 flex flex-col justify-center">
        <div className=" flex justify-center">
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
        </div>
        <Spinner
          className="p-2 pb-0 max-w-[45ch] mx-auto w-[95%]"
          segments={segments}
          getTargetNumber={getSpinNumber}
          onSpinEnd={handleBonus}
        >
          {({ handelClick, isSpinning }) => (
            <div className="relative bg-cover bg-center grid gap-4 p-4 pb-6">
              <ConnectButton
                className="w-full justify-center"
                onClick={handelClick}
                disabled={
                  loading || isSpinning || (spins?.data?.total || 0) <= 0
                }
              >
                Spin ({spins?.data?.total || 0})
              </ConnectButton>
              <MoreSpins spins={spins?.data} refresh={refetch} />
              <Image
                width={300}
                height={200}
                src={"/images/board-2.png"}
                alt="spinning-effect"
                className="absolute size-full -z-[1]"
              />
            </div>
          )}
        </Spinner>
      </div>
      <Dialog open={openReward} onOpenChange={setOpenReward}>
        <DialogContent
          className="text-golden-brown text-center"
          containerClassName="h-full flex flex-col gap-2 p-2 pt-0"
        >
          <DialogTitle className="font-bold text-xl">
            Prize Withdrawals
          </DialogTitle>
          <div className="bg-[#E3BEAA] rounded-lg p-4 text-center font-semibold flex-1 flex flex-col gap-2 items-center mb-2">
            <p>Min Withdrawal = 10 USDT</p>
            <p className="text-golden-brown/70">Check back at 10 USDT</p>
          </div>
          <Button
            onClick={() => setOpenReward(false)}
            className={`py-2 h-auto w-full rounded-md hover:bg-green/80 text-white font-bold btn-animate !shadow-[0_0.15rem] bg-green !shadow-[#2C7C4C]`}
          >
            Back to Spinner
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
