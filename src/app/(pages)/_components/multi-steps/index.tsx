"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

import { cn } from "@/app/_lib/utils";
import { Step1Bottom, Step1Top } from "./step1";
import { Step2Bottom, Step2Top } from "./step2";
import { Step3Bottom, Step3Top } from "./step3";

const Steps = [
  { Top: Step1Top, Bottom: Step1Bottom, duration: 8000 },
  { Top: Step2Top, Bottom: Step2Bottom, duration: 12000 },
  { Top: Step3Top, Bottom: Step3Bottom, duration: 8000 },
];

export default function MultiSteps() {
  const [step, setStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Function to go to the next step
  const goToNextStep = useCallback(() => {
    const nextStep = (step + 1) % Steps.length;
    setSlideDirection("right");
    setStep(nextStep);
  }, [step]);

  // Handle going to a specific step
  const goToStep = useCallback(
    (newStep: number) => {
      if (newStep === step) return;

      setSlideDirection(newStep > step ? "right" : "left");
      // Special case for going from last to first
      if (step === Steps.length - 1 && newStep === 0) {
        setSlideDirection("right");
      }
      // Special case for going from first to last
      if (step === 0 && newStep === Steps.length - 1) {
        setSlideDirection("left");
      }

      setStep(newStep);
    },
    [step]
  );

  // Set up auto-advancing timer
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextStep();
    }, Steps[step].duration);
    setTimerId(timer);

    return () => clearTimeout(timer);
  }, [step, slideDirection, goToNextStep]);

  // Get current components
  const Top = Steps[step].Top;
  const Bottom = Steps[step].Bottom;

  return (
    <div className="relative w-full flex flex-col flex-1 h-full overflow-x-hidden">
      <div
        key={`top-${step}`}
        className={cn(
          "w-full",
          slideDirection === "right"
            ? "animate-slideInRight"
            : "animate-slideInLeft",
          "flex-1 flex flex-col justify-between overflow-x-hidden"
        )}
      >
        <div className="flex flex-1 flex-col justify-evenly relative">
          {step === 1 ? (
            <Step2Top clearTimer={() => timerId && clearTimeout(timerId)} />
          ) : (
            <Top />
          )}

          {/* Indicator pills */}
          <div
            className={cn(
              "bg-gradient-to-b from-golden-bright to-golden-brown scale-90",
              "p-0.5 rounded-2xl contain-content grid",
              "2xs:mt-5 2xs:mb-5 mx-auto w-[min(80dvw,100%)] max-w-[40ch] shadow-xl",
              "relative z-10"
            )}
          >
            <div
              className={cn(
                "bg-[url(/images/board_2.png)] rounded-2xl bg-cover bg-center text-golden-bright",
                "p-1 flex gap-2 [&>*]:flex-1"
              )}
            >
              {/* {Masking wood texture} */}
              <div className="absolute inset-0">
                <Image
                  src="/images/wood-texture.png"
                  alt="Wood texture"
                  fill
                  className="object-cover object-center"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))",
                  }}
                />
              </div>
              {Array.from({ length: 3 }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "bg-gradient-to-b from-gold-light to-gold",
                    "h-5 rounded-lg contain-content",
                    index != step && "opacity-30",
                    "border-2 border-solid border-gold-darker",
                    "relative z-10"
                  )}
                  disabled={index === step}
                  onClick={() => goToStep(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-visible">
          <Bottom />
        </div>
      </div>
    </div>
  );
}
