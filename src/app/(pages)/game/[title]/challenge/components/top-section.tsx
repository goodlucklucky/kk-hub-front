"use client";

import Image from "next/image";
import React from "react";
import SoundPlaying from "@/app/_assets/images/sound-playing.svg";
import SoundMuted from "@/app/_assets/images/sound-muted.svg";
import { useGeneral } from "@/app/_providers/generalProvider";
import { cn } from "@/app/_lib/utils";
import { ConnectButton } from "@/app/_components/shared/connect-button";
import { trackEvent } from "@/app/_lib/mixpanel";
// import HelpModal from "../../(home)/_components/help-modal";

export default function TopSection({
  customActions,
  className,
}: {
  customActions?: React.ReactNode;
  className?: string;
}) {
  const {
    myScore,
    isLoadingMyScore,
    // isMuted, handleToggleMute
  } = useGeneral();

  return (
    <section
      className={cn(
        `flex flex-wrap gap-2 -mx-3 justify-between px-4`,
        className
      )}
    >
      <article className="text-golden-brown font-semibold space-y-1 text-xs">
        <p>Your Total Balance</p>
        <p className="p-1 px-2 rounded-full bg-golden-brown text-white min-w-32 w-fit">
          <span className={"flex items-center gap-2 justify-between w-full"}>
            <span>
              {isNaN(Number(myScore))
                ? myScore
                : Intl.NumberFormat().format(Number(myScore))}
            </span>

            {isLoadingMyScore && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline size-4 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                  opacity={0.5}
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
        </p>
      </article>
      {customActions ? (
        <div className="flex flex-wrap gap-2">{customActions}</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {/* <HelpModal>
            <ConnectButton
              size="sm"
              color="#FFC734"
              className="!px-[0.7rem] w-10 h-[43px]"
              onClick={() => {
                saveAction("home_help_button_click");
                saveMixpanel("help button click");
              }}
            >
              <Image
                src={question}
                alt="question"
                width={20}
                height={20}
                className="size-4 p-0"
              />
            </ConnectButton>
          </HelpModal> */}
          <ConnectButton
            size="sm"
            color="#FFC734"
            className="w-10 h-[43px]"
            onClick={() => {
              // handleToggleMute?.();
              trackEvent("sound button click");
            }}
          >
            <Image
              // src={isMuted ? SoundMuted : SoundPlaying}
              // key={isMuted ? `SoundMuted` : `SoundPlaying`}
              src={SoundMuted || SoundPlaying}
              key={`SoundPlaying`}
              alt="volume"
              width={20}
              height={20}
              className="size-6 p-0"
            />
          </ConnectButton>
        </div>
      )}
    </section>
  );
}
