"use client";

import React, { useCallback, useContext } from "react";
import {
  ISpin,
  useClaimDaily,
  useDailySpins,
} from "../../../../../../services/spins";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "@/app/_components/ui/dialog";
import { ConnectButton } from "@/app/_components/shared/connect-button";
import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";
import BoxMain from "../BoxMain";
import ShareButtons from "../profile/share-buttons";
import toast from "react-hot-toast";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { useBuySpins } from "../../../../../../services/koko";

const btnStyle = cn(
  `w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]`
);

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
          Get More Spins
        </ConnectButton>
      </DialogTrigger>
      <DialogContent title="More Spins" containerClassName="h-full">
        <BoxMain className="flex flex-col gap-2 text-golden-darker font-medium">
          <div className="text-center">
            <p className="text-sm text-golden-brown/70">
              Your Total Spins: {spins?.total || 0}
            </p>
            <p>Want more Spins?</p>
          </div>
          <div>
            <p className="bg-[#E3BEAA] p-3 rounded-t-xl border-0 border-b-2 border-solid border-black/15">
              Claim Your Daily Free Spin
            </p>
            <div className="bg-[#E3BEAA] p-3 rounded-b-xl border-0 border-t-2 border-solid border-white/60">
              <Button
                onClick={handleClaim}
                disabled={!dailySpins || (dailySpins?.data?.length || 0) > 0}
                className={cn(btnStyle)}
              >
                Claim for Free
              </Button>
            </div>
          </div>
          <div>
            <p className="bg-[#E3BEAA] p-3 rounded-t-xl border-0 border-b-2 border-solid border-black/15">
              Invite a Friend and get 1 Spin and +3,000 Bonus 🥥
            </p>
            {/* <div className="bg-[#E3BEAA] flex flex-wrap gap-3 p-3 rounded-b-xl border-0 border-t-2 border-solid border-white/60">
              <ShareButtons
              shareName="spinner_inviteTG_click"
              copyName="spinner_copyLink_click"
            />
            </div> */}
            <ShareButtons className="bg-[#E3BEAA] grid grid-cols-2 gap-3 p-3 rounded-b-xl border-0 border-t-2 border-solid border-white/60" />
          </div>
          <div>
            <p className="bg-[#E3BEAA] p-3 rounded-t-xl border-0 border-b-2 border-solid border-black/15">
              Buy a Spin for $0.25
            </p>
            <div className="bg-[#E3BEAA] p-3 rounded-b-xl border-0 border-t-2 border-solid border-white/60">
              <Button
                onClick={() => (myScore || 0) >= 25000 && handleBuySpins?.()}
                disabled={(myScore || 0) < 25000}
                className={cn(btnStyle)}
              >
                Buy Spin
              </Button>
            </div>
          </div>
        </BoxMain>
      </DialogContent>
    </Dialog>
  );
}
