import { TimerIcon } from "@assets/svg/etc";
import React from "react";
import SpinnerBox from "../spinner/box";
import PageTitleBanner from "@/app/_components/shared/page-title-banner";

interface Step2TopProps {
  clearTimer?: () => void;
}

export function Step2Top({ clearTimer }: Step2TopProps) {
  return (
    <div>
      <PageTitleBanner
        className={`relative top-6 mx-auto -mt-6`}
        titleBanner={
          <p className="text-center text-[22px] leading-5 text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]">
            KOKO
            <br />
            spinner
          </p>
        }
        spinner
      />
      {clearTimer && <SpinnerBox clearTimer={clearTimer} />}
    </div>
  );
}

export function Step2Bottom() {
  const [timeLeft, setTimeLeft] = React.useState(300); // 5 minutes in seconds

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      <div className="bg-black/60 rounded-t-2xl pt-2 px-4 2xs:p-4 2xs:px-8 text-green-light font-bumper-sticker">
        <p className="flex gap-2 items-center w-fit 2xs:pb-2 2xs:mb-2 border-b-2 border-b-current/40">
          <TimerIcon />
          <span className="font-bumper-sticker font-light text-[22px]">{formattedTime}</span>
        </p>
        <p className="">
          <span className="font-bumper-sticker font-light text-[18px]">surprise! grab your free spin now!</span>
          <br />
          <small className="text-white font-made-tommy font-light text-[14px]">
            Rewards won apply for new users only.
          </small>
        </p>
      </div>
    </>
  );
}
