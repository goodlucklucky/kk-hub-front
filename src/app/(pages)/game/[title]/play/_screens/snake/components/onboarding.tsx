"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import EggImage from "../assets/egg-initial.png";
import Collide from "../assets/collide.png";
import SwipeImage from "../assets/swipe-image.png";
import Money from "../assets/money.png";
import Prize from "../assets/prize.png";
import OnboardingBoard from "../assets/onboarding-board.png";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SnakeContext } from "../contexts/snake-context";
import { TGameState } from "../constants/Snake";
import { Button } from "@/app/_components/ui/button";

interface OnboardingProps {
  setGameState: (_state: TGameState) => void;
}

const ONBOARDING_DATA = [
  { src: EggImage, height: 56, alt: "Egg Food" },
  { src: Collide, height: 56, alt: "Collide" },
  { src: SwipeImage, height: 56, alt: "SwipeImage" },
  { src: Money, height: 56, alt: "Money" },
  { src: Prize, height: 56, alt: "Prize" },
];

const Onboarding = ({ setGameState }: OnboardingProps) => {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const searchParams = useSearchParams();
  const { snakeSkinFeatureLoading } = useContext(SnakeContext);

  useEffect(() => {
    ONBOARDING_DATA.forEach((item) => {
      const img = new window.Image();
      img.src = item.src.src;
    });
  }, []);

  const handleTouch = () => {
    if (isTransitioning) return; // Prevent touch during transition
    if (onboardingStep === 5) {
      setGameState("playing");
      return;
    }

    // Prevent further touches and start fade-out
    setIsTransitioning(true);
    setIsFading(true);
    setTimeout(() => {
      setIsFading(false);
      setOnboardingStep((prev) => prev + 1);
      setIsTransitioning(false); // Allow interaction after the transition
    }, 300); // Match this with the CSS transition duration
  };

  // get default step
  useEffect(() => {
    const stepString = searchParams?.get("step");
    const step = Number(stepString) || 0;
    if (step == 6) {
      setOnboardingStep(5);
      setTimeout(() => {
        setGameState("playing");
      }, 2000);
      return;
    }
    if (step < 0 || step > 5) return;
    setOnboardingStep(step);
  }, [searchParams, setGameState]);

  return (
    <div className="fixed inset-0 z-40">
      <div className="fixed inset-0 bg-[#4D4D4D] opacity-90"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[2px] w-[276px] mx-auto bg-center bg-no-repeat bg-[rgba(0,0,0,0.3)] rounded-[24px] backdrop-blur-sm"
        style={{
          backgroundImage: `url(${OnboardingBoard.src})`,
          backgroundSize: "100% 100%",
          boxShadow:
            "0px 2px 0px 0px rgba(0, 0, 0, 0.20), 0px 6px 0px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        <div
          className={`bg-[rgba(0,0,0,0.6)] px-3 py-2 rounded-t-[22px] ${
            onboardingStep === 5 && "rounded-b-[22px]"
          }`}
        >
          <div
            className={`transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {onboardingStep === 5 ? (
              <div className="py-2 flex flex-col gap-6 pb-6">
                <div className="text-center text-white text-xl font-bold pt-5">
                  Ready?🤑
                </div>
                {snakeSkinFeatureLoading ? (
                  <div className="text-center text-white text-xl font-bold pt-5">
                    Loading...
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => handleTouch()}
                      className={`p-0 py-1 h-auto flex-1 flex gap-1 !rounded-lg hover:bg-green/80 text-white font-bold btn-animate rounded-[10px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%] w-full`}
                    >
                      Start!
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center relative p-3 h-[95px]">
                  {ONBOARDING_DATA.map((data, index) => (
                    <Image
                      alt={data.alt}
                      key={index}
                      src={data.src}
                      layout="intrinsic"
                      height={data.height}
                      priority={onboardingStep === 0}
                      className={`${index !== onboardingStep && "hidden"}`}
                    />
                  ))}
                </div>
                <div className="h-[66px]">
                  {onboardingStep === 0 ? (
                    <div className="text-center">
                      <p className="text-white text-base font-bold leading-[22px]">
                        Navigate the Snake to eat Eggs and climb the Tournament
                        leaderboard!
                      </p>
                    </div>
                  ) : onboardingStep === 1 ? (
                    <p className="text-center text-white text-base font-bold leading-[22px]">
                      Don&apos;t let the Snake collide with itself or hit the
                      wall!
                    </p>
                  ) : onboardingStep === 2 ? (
                    <p className="text-center text-white text-base font-bold leading-[22px]">
                      Swipe or use the controls to direct the Snake.
                    </p>
                  ) : onboardingStep === 3 ? (
                    <p className="text-center text-white text-base font-bold leading-[22px]">
                      Every player’s Entry Fees go into a Prize Pot.
                      <br /> More Players = Bigger Prizes!
                    </p>
                  ) : (
                    <p className="text-center text-white text-base font-bold leading-[22px]">
                      At the end of the day, players
                      <br /> are ranked and the highest
                      <br /> Scores win from the Pot!
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          {onboardingStep < 5 && (
            <div className="flex items-center justify-center mt-3 mb-1 gap-3">
              {ONBOARDING_DATA.map((_, index) => (
                <div
                  key={index}
                  className={`${
                    index === onboardingStep
                      ? "w-[8px] h-[8px] rounded-full border-2 border-[#D9DCC7]"
                      : "w-[6px] h-[6px] rounded-full bg-[#D9DCC7]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        {onboardingStep < 5 && (
          <div className="flex p-3 gap-3 rounded-b-[22px]">
            <Button
              onClick={() => setOnboardingStep(5)}
              className={`p-0 py-1 h-auto flex-1 flex gap-1 !rounded-lg hover:bg-[#00000033] text-white font-bold btn-animate !shadow-[0_1px] bg-[#00000033] !shadow-[#0000004D]`}
            >
              Skip
            </Button>
            <Button
              onClick={() => handleTouch()}
              className={`p-0 py-1 h-auto flex-1 flex gap-1 !rounded-lg hover:bg-green/80 text-white font-bold btn-animate rounded-[10px] border border-[#24BE62] bg-gradient-to-b from-[#24BE62] from-10% to-[#1AB257] to-[201.67%]`}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
