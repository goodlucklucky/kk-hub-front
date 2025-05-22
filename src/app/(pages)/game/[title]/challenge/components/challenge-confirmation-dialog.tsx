"use client";

import { Dispatch, SetStateAction } from "react";
import { formatBigNumber } from "@/app/_utils/number";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import BoxMain from "@/app/(pages)/(default)/_components/BoxMain";
import { Button } from "@/app/_components/ui/button";
import { IChallenge } from "@/../services/game/challenges";

const ChallengeConfirmationDialog = ({
  challenge,
  openDialog,
  isLoading,
  setOpenChanllengeDialog,
  onEnterPlay,
}: {
  challenge: IChallenge | undefined;
  openDialog: boolean;
  isLoading: boolean;
  setOpenChanllengeDialog: Dispatch<SetStateAction<boolean>>;
  onEnterPlay: () => void;
}) => {
  return (
    <Dialog
      open={openDialog}
      onOpenChange={setOpenChanllengeDialog}
      modal={true}
    >
      <DialogContent
        // size={"md"}
        containerClassName="w-full flex gap-2 h-full items-center justify-center"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <BoxMain>
          <div className="text-center">
            <div className="text-center font-extrabold text-[20px] text-[#5F3F57]">
              Ready to Win Kokos?🥥
            </div>
            <div className="bg-[#E3BEAA] overflow-none py-4 rounded-3xl px-8 my-2">
              <div className="text-[16px] text-[#745061] font-bold text-center">
                Confirm Tournament Entry Fee
              </div>
              <div className="text-[20px] text-[#745061] font-bold text-center">
                {`${formatBigNumber(challenge?.entry_fee || 0)}🥥`}
              </div>
              <div className="text-[10px] text-[#5F3F57] text-opacity-75 font-bold text-center">
                (Pay once to get Unlimited Attempts)
              </div>
            </div>
            <Button
              className={`bg-green px-14 font-extrabold text-white h-8 rounded-xl hover:bg-emerald-500 shadow-[0_0.15rem] shadow-[#2C7C4C] ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              onClick={() => onEnterPlay()}
            >
              {isLoading ? "Loading..." : "Enter Now!"}
            </Button>
          </div>
        </BoxMain>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeConfirmationDialog;
