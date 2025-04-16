"use client";

import React, { useMemo } from "react";
import { Step1Bottom, Step1Top } from "./step1";
import { cn } from "@/app/_lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Step2Bottom, Step2Top } from "./step2";
import { Step3Bottom, Step3Top } from "./step3";
import Image from "next/image";

const Steps = [
  { Top: Step1Top, Bottom: Step1Bottom },
  { Top: Step2Top, Bottom: Step2Bottom },
  { Top: Step3Top, Bottom: Step3Bottom },
];

export default function MultiSteps(_: Readonly<{ children?: React.ReactNode }>) {
  const params = useSearchParams();
  const router = useRouter();
  const step = useMemo(() => Number(params?.get("open1")) || 0, [params]);

  const Top = useMemo(() => Steps?.[step]?.Top || Steps?.[0]?.Top, [step]);
  const Bottom = useMemo(
    () => Steps?.[step]?.Bottom || Steps?.[0]?.Bottom,
    [step]
  );

  return (
    <div className="flex-1 flex flex-col">
      <Top key={`top-${step}`} />
      <div
        className={cn(
          "bg-gradient-to-b from-golden-bright to-golden-brown scale-90",
          "p-0.5 rounded-2xl contain-content grid",
          "m-15 mx-auto w-[min(80dvw,100%)] max-w-[40ch] shadow-xl"
        )}
      >
        <div
          className={cn(
            "bg-background rounded-[0.875rem] text-golden-bright",
            "p-1 flex gap-2 [&>*]:flex-1 relative overflow-hidden"
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
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))'
              }}
            />
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "bg-gradient-to-b from-gold-light to-gold",
                "h-5 rounded-lg contain-content",
                index == step && "bg-gold-dark",
                "border-2 border-solid border-gold-darker"
              )}
              disabled={index == step}
              onClick={() => router?.push(`?open1=${index}`)}
            >
              {index == step && (
                <svg
                  width="39"
                  height="16"
                  viewBox="0 0 39 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-full w-auto"
                >
                  <path
                    d="M0 5C0 2.23858 2.23858 0 5 0L16.5 0L38.5 16H5C2.23858 16 0 13.7614 0 11V5Z"
                    fill="#FFD649"
                    fillOpacity="0.5"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
      <Bottom key={`bottom-${step}`} />
    </div>
  );
}
