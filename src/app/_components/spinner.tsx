"use client";

import Image from "next/image";
import React, {
  CSSProperties,
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import spinnerImage from "@assets/images/spinning-wheel-v3.png";
import ativoImage from "@assets/images/spinning-ativo.png";
import { cn } from "@/app/_lib/utils";
import toast from "react-hot-toast";

interface ISpinnerProps {
  segments?: {
    value: number;
    color?: string;
    element?: JSX.Element | string;
  }[];
  getTargetNumber?: () => Promise<number | undefined>;
  onSpinEnd?: (_result: number) => void;
  color1?: string;
  color2?: string;
  className?: string;
  children?: (_props: {
    isSpinning: boolean;
    handelClick: () => void;
  }) => React.ReactNode;
}

function Spinner({
  segments = [...Array(10)],
  getTargetNumber,
  onSpinEnd,
  children,
  className,
}: ISpinnerProps) {
  const [targetRotation, setTargetRotation] = useState(0);
  const [baseRotation, setBaseRotation] = useState(0);
  const isSpinning = useRef(false);
  const [hasSpin, setHasSpin] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toTarget, setToTarget] = useState(-1);
  const segmentsLength = useMemo(() => segments?.length, [segments?.length]);
  const randomSpins = 10;

  const spinWheel = useCallback(
    (target: number) => {
      const segmentsLength = segments?.length;
      const segmentAngle = 360 / segmentsLength;

      isSpinning.current = true;

      let finalRotation: number;
      if (target !== undefined) {
        const targetIndex = segments?.findIndex((one) => one?.value == target);
        finalRotation = 360 - (targetIndex + 3) * segmentAngle;
      } else {
        const randomSegment = Math.floor(Math.random() * segmentsLength);
        finalRotation = 360 - randomSegment * segmentAngle;
      }

      setTargetRotation((_p) => finalRotation + randomSpins * 360 + 15);

      setTimeout(() => {
        isSpinning.current = false;
        setHasSpin(true);
        setToTarget(-1);
        setBaseRotation(finalRotation);
        setTargetRotation((p) => p - 15);

        const result =
          (((360 - (finalRotation % 360)) / segmentAngle) % segmentsLength) + 1;

        setTimeout(() => setIsPushing(true), 500);
        setIsPushing(false);
        setTimeout(() => onSpinEnd?.(Math.round(result)), 2000);
      }, 5000);
    },
    [segments, onSpinEnd]
  );

  const handelClick = useCallback(async () => {
    isSpinning.current = true;
    setHasSpin(false);
    setIsLoading(true);

    const requestTime = Date.now();
    const target = await getTargetNumber?.();

    const timer: NodeJS.Timeout = setInterval(() => {
      const elapsedTime = Date.now() - requestTime;
      const degree =
        (baseRotation + ((randomSpins * 360) / 5000) * elapsedTime) % 360;

      const targetRotationDegree =
        baseRotation <= 0 ? 360 + baseRotation : baseRotation;
      const temp = 15;
      if (
        degree > targetRotationDegree - temp &&
        degree < targetRotationDegree - temp + 4
      ) {
        if (target && target >= 0) setToTarget(target);
        else {
          isSpinning.current = false;
          setIsLoading(false);
          setHasSpin(false);
          toast?.error("Something went wrong, please try again");
        }
        if (timer) clearInterval(timer);
      }
    }, 1);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [baseRotation, getTargetNumber]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const spin = () => {
      if (toTarget > 0) {
        setIsLoading(false);
        spinWheel(toTarget);
        if (interval) clearInterval(interval);
      }
    };

    if (isSpinning.current && !hasSpin) interval = setInterval(spin, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [hasSpin, spinWheel, toTarget]);

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center pointer-events-none relative contain-content",
        className
      )}
    >
      <Image
        src={ativoImage}
        alt="alivo"
        width={800}
        height={800}
        objectFit="contain"
        priority
        className="size-10 absolute top-2 z-[3]"
        style={{
          animation: isPushing ? "pushingTopEffect 1s ease" : "",
        }}
      />

      <div
        style={{
          // backgroundImage: `url(/images/Wheel_Border.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          padding: "11px 13px 14px 14px",
          zIndex: "2",
          animation: isPushing ? "scaleEffect 1s ease" : "",
        }}
      >
        <div
          style={
            {
              "--base-rotation": `${baseRotation}deg`,
              "--target-rotation": `${targetRotation}deg`,
              transform: `rotate(${baseRotation}deg)`,
              transformOrigin: "center",
              transition: isLoading ? "none" : "transform 0.5s linear",
              animation: isSpinning.current
                ? isLoading
                  ? "custom-spin 0.5s linear infinite"
                  : "rotate-to-target 5s cubic-bezier(0.250, 0.250, 0.625, 1.020) forwards"
                : "vibration 0.4s ease-in-out",
            } as CSSProperties
          }
          className={`z-[2] relative drop-shadow-[0_0_5px_#000]`}
        >
          <Image
            src={spinnerImage}
            alt="spinner"
            width={800}
            height={800}
            objectFit="cover"
            priority
            className="rotate-[18deg] w-screen"
          />
          <div className="absolute inset-0 size-full flex items-center justify-center">
            {segments.map((one, index) => {
              const angle = (index / segmentsLength) * 360;
              const startAngle = (angle * Math.PI) / 180;
              const endAngle = ((angle + 360 / segmentsLength) * Math.PI) / 180;
              const midAngle = (startAngle + endAngle) / 2;

              return (
                <div
                  key={index}
                  className="text-center h-full absolute mx-auto pt-[8%]"
                  style={{
                    transform: `rotate(${(midAngle * 180) / Math.PI + 90}deg)`,
                  }}
                >
                  {one?.element || one?.value || index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <section
        className="relative rounded-3xl p-1 mt-auto w-full -translate-y-2 z-[1] pointer-events-auto"
        style={{
          animation: isPushing ? "pushingDownEffect 1s ease" : "",
        }}
      >
        <div className="p-4 text-golden-brown space-y-4 z-10">
          {children?.({ isSpinning: isSpinning.current, handelClick })}
        </div>
      </section>
    </div>
  );
}

export default Spinner;
