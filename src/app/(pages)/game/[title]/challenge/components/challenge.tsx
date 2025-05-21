"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import NextIcon from "@/app/_assets/images/Icon_NextPageArrow.png";
import ChallengeTab from "./challenge-tab";
import ChallengeBox from "./challenge-box";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/app/_components/ui/dialog";
import BoxMain from "@/app/(pages)/(default)/_components/BoxMain";
import { trackEvent } from "@/app/_lib/mixpanel";

type ChallengeTab = "prev_coming_soon" | "daily" | "coming_soon";

type ChallengeProps = { initialTab: ChallengeTab };

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (): TimeLeft | null => {
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setUTCDate(now.getUTCDate() + 1);
  nextMidnight.setUTCHours(0, 0, 0, 0);

  const difference = nextMidnight.getTime() - now.getTime();

  if (difference > 0) {
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return null;
};

const Challenge = ({ initialTab }: ChallengeProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );
  const router = useRouter();
  // const heightRatio = useScreenHeightRatio(761);

  const tabs = useMemo(() => ["prev_coming_soon", "daily", "coming_soon"], []);
  const tab = useMemo<ChallengeTab>(() => {
    return tabs.includes(initialTab) ? initialTab : "daily";
  }, [initialTab, tabs]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Dialog open={true} modal={false}>
      <DialogContent
        className="!overflow-visible !px-[10px] !top-[60%] space-y-2 z-[40]"
        onInteractOutside={(e) => e.preventDefault()}
        // challengeModal
        // heightRatio={heightRatio}
        onClose={(e) => {
          console.log("close");
          
          e?.preventDefault();
          router.back();
        }}
      >
        <BoxMain className="space-y-2 px-[10px]">
          <DialogHeader>
            <p className="text-center gap-2 font-bold text-2xl text-[#5F3F57]">
              Challenge
            </p>
          </DialogHeader>
          <ChallengeTab tab={tab} />

          <button
            onClick={() => {
              router.push(`/challenge/result-details`);
              trackEvent(`Challenge Results Details`);
            }}
            className="flex justify-between items-center rounded-3xl w-full p-[6px] pl-4 bg-[#E3BEAA] text-sm text-[#745061] font-semibold"
          >
            Previous Results{" "}
            <Image alt="next-page-icon" width={10} src={NextIcon} />
          </button>
          <BoxMain
            // hideClose={true}
            className="bg-[#5F3F5733] rounded-2xl rounded-b-xl p-2 max-h-[440px]"
          >
            <ChallengeBox />
          </BoxMain>
          {timeLeft && (
            <div className="text-white text-xs font-semibold text-center h-8 rounded-t-xl p-2 rounded-b-3xl bg-[#A970B5]">
              🎁 Prizes distributed in {timeLeft.hours}h {timeLeft.minutes}m{" "}
              {timeLeft.seconds}s
            </div>
          )}
        </BoxMain>
      </DialogContent>
    </Dialog>
  );
};

export default Challenge;
