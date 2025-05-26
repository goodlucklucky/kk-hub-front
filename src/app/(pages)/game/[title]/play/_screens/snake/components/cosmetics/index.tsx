"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import CosmeticCard from "./card";
import { TGameState } from "../../constants/Snake";
import { SnakeContext } from "../../contexts/snake-context";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { cn } from "@/app/_lib/utils";
import { Button } from "@/app/_components/ui/button";
import BoxMain from "@/app/(pages)/(default)/_components/BoxMain";

interface CosmeticsProps {
  isLoading?: boolean;
  setGameState: (_state: TGameState) => void;
}

export default function Cosmetics({ isLoading, setGameState }: CosmeticsProps) {
  const { skins } = useContext(SnakeContext);
  const router = useRouter();

  // useEffect(() => {
  //   const backButton = WebApp.BackButton;

  //   const handleBackClick = () => {
  //     router.push("/challenge");
  //   };

  //   // Force toggle visibility to ensure the event is sent
  //   backButton.hide();
  //   setTimeout(() => {
  //     backButton.onClick(handleBackClick);
  //     backButton.show();
  //   }, 100);

  //   return () => {
  //     backButton.offClick(handleBackClick);
  //     backButton.hide();
  //   };
  // }, [router]);

  return (
    <Dialog open>
      <DialogContent
        className="z-50 !mt-0"
        title={"Cosmetics"}
        onClose={() => {
          const searchParams = new URLSearchParams(window?.location?.search);
          searchParams?.set("step", "6");
          router?.push(`?${searchParams.toString()}`);

          setGameState("onboarding");
        }}
      >
        {/* <DialogContainer title="Cosmetics"> */}
        <BoxMain className="h-[70dvh] text-center text-[#5F3F57] text-lg font-[700] px-2 pb-6 flex flex-col gap-2">
          <DialogTitle>Select a skin for your Snake</DialogTitle>
          <div
            className={cn(
              "flex-1 bg-[#ddc2a7]",
              "bg-gradient-to-b from-[rgba(221,194,167,1)] to-[rgba(95,63,87,0)]",
              "rounded-2xl mb-2 overflow-auto"
            )}
          >
            <div className={cn("grid gap-2.5 gap-y-5 grid-cols-3 p-2.5")}>
              {skins?.map((skin) => (
                <CosmeticCard key={skin?.id} skin={skin} />
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Button
              disabled={isLoading}
              className="bg-green hover:bg-green/80 text-white text-xl font-bold btn-animate !shadow-[0_0.15rem] !shadow-[#2C7C4C] rounded-2xl"
              onClick={() => {
                setGameState("playing");
              }}
            >
              Play Now
            </Button>
          </div>
        </BoxMain>
        {/* </DialogContainer> */}
      </DialogContent>
    </Dialog>
  );
}
