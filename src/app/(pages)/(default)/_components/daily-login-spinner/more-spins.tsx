"use client";

import React, { useCallback, useContext } from "react";
import Image from "next/image";
import {
  ISpin,
  useClaimDaily,
  useDailySpins,
} from "../../../../../../services/spins";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger, DialogClose } from "@/app/_components/ui/dialog";
import { ConnectButton } from "@/app/_components/shared/connect-button";
import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";
import ShareButtons from "../profile/share-buttons";
import toast from "react-hot-toast";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { useBuySpins } from "../../../../../../services/koko";

//import assets
import banner from "@assets/images/header-board.png";

//import icons
import { CloseIcon } from "@/app/_assets/svg/close";
import itemStar from "@assets/svg/item-star-green.svg";

export default function MoreSpins({
  spins,
  refresh,
}: {
  spins?: ISpin;
  refresh?: (_: any) => Promise<any>;
}) {
  const { sessionId, addMyScore, myScore } = useContext(GeneralContext);
  const { data: dailySpins } = useDailySpins({ sessionId });
  const { mutateAsync: claim } = useClaimDaily({
    sessionId,
    onSuccess: refresh,
  });
  // const { saveAction } = useActions();
  const { mutateAsync: buySpins } = useBuySpins({
    onSuccess: () => {
      addMyScore?.(-25000);
      toast?.success("Spin successfully purchased!");
      refresh?.({});
    },
  });

  const handleClaim = useCallback(async () => {
    try {
      // saveAction("spinner_dailyFreeSpin_claim");
      await claim();
    } catch {
      // console.error(e);
      toast?.error("Come back tomorrow for another free Spin!");
    }
  }, [claim]);

  const handleBuySpins = useCallback(async () => {
    try {
      // saveAction("spinner_buySpin_click");
      await buySpins({ amount: 25000, sessionId });
    } catch (e: any) {
      toast?.error(e?.message || "Buy Spins Failed");
    }
  }, [buySpins, sessionId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ConnectButton
          className="w-full justify-center text-sm font-extrabold"
          color="#A1C41F"
          // onClick={() => {
          //   saveAction("spinner_getMoreSpins_click");
          // }}
        >
          <div className="flex items-center gap-1">
            <Image
              src={itemStar}
              alt="star"
              width={14}
              height={14}
              className="mr-1 inline-block text-[#A1C41F]"
            />
            Get More Spins
          </div>
        </ConnectButton>
      </DialogTrigger>
      <DialogContent title="More Spins" containerClassName="h-full">
        <div className="fixed h-full left-[50%] top-[80%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[2.5px]" />
          <div className="bg-[url(/images/board_2.png)] flex flex-col gap-2 bg-cover bg-center fixed w-[95%] top-1/2 -translate-y-1/2 z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0">
            <div className="w-full h-16 flex justify-center items-center absolute -top-10">
              <Image
                src={banner}
                alt="banner"
                className={cn(
                  "w-36 h-16 scale-x-[1.5] absolute z-10 pointer-events-none mx-auto",
                )}
              />
              <span className="text-[#491F36] text-center [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px] font-normal leading-normal tracking-[0.56px] lowercase z-20">
                MORE SPINS
              </span>
            </div>
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <DialogClose asChild>
                <CloseIcon />
              </DialogClose>
            </div>
            <div className="bg-[#F5D6B1] rounded-2xl p-3 py-6 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto gap-2">
              <div className="flex flex-col gap-y-1">
                <div className="flex justify-center items-center gap-1">
                  <span className="text-[#8F6E75] text-center font-made-tommy text-[16px] font-bold leading-normal">
                    Your Total Spins
                  </span>
                  <span className="text-[#FCE7C5] text-center font-made-tommy text-[16px] font-bold leading-[20px] bg-[#8F6E75] w-5 h-5 rounded-[5px]">
                    {spins?.total || 0}
                  </span>
                </div>
                <span className="text-[#745061] text-center font-made-tommy text-[16px] font-bold leading-normal">
                  Want more Spins?
                </span>
              </div>
              <div className="flex flex-col justify-center items-center rounded-[14px] bg-[#E3BEAA]">
                <div className="w-full py-1.5 border-b-1 border-b-[#EBD8BE]">
                  <span className="text-[#745061] text-center font-made-tommy text-[14px] font-bold leading-normal px-3">
                    Claim Your Daily Free Spins
                  </span>
                </div>
                <div className="w-full rounded-b-[14px] p-[10px] bg-[#7450611A]">
                  <Button
                    onClick={handleClaim}
                    disabled={!dailySpins || (dailySpins?.data?.length || 0) > 0}
                    className='rounded-[4px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center'
                  >
                    <span className='text-white text-sm font-bold py-[1px]'>Claim for Free</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center rounded-[14px] bg-[#E3BEAA]">
                <div className="w-full py-1.5 border-b-1 border-b-[#EBD8BE] text-[#745061] font-made-tommy text-[14px] font-bold leading-normal px-3">
                  Invite a Friend = 3 Spins and +5,000 Bonus 🥥
                </div>
                <ShareButtons className="w-full rounded-b-[14px] p-[10px] bg-[#7450611A] flex gap-x-1" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col justify-center items-center rounded-[14px] bg-[#E3BEAA]">
                  <div className="w-full py-1.5 border-b-1 border-b-[#EBD8BE]">
                    <span className="text-[#745061] text-center font-made-tommy text-[14px] font-bold leading-normal px-3">
                      Buy a Spin for $0.25
                    </span>
                  </div>
                  <div className="w-full rounded-b-[14px] p-[10px] bg-[#7450611A]">
                    <Button
                      onClick={() => (myScore || 0) >= 25000 && handleBuySpins?.()}
                      disabled={(myScore || 0) < 25000}
                      className='rounded-[4px] bg-gradient-to-b from-[#24BE62] from-[10%] to-[#1AB257] to-[201.67%] py-[3px] w-full flex gap-x-1 items-center justify-center'
                    >
                      <span className='text-white text-sm font-bold py-[1px]'>Buy Spin</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
