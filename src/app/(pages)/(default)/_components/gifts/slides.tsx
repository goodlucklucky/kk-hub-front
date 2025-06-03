import React, { useContext } from "react";
import { cn } from "@/app/_lib/utils";
import { RightArrow2 } from "@/app/_assets/svg/right-arrow";
import { DailyBarge } from "./barge";
import DayBarge from "./day-barge";
import { useBonusCompletion } from "../../../../../../services/bonus";
import { GeneralContext } from "@/app/_providers/generalProvider";
import useTimeLeft from "@/app/_hooks/useTimeLeft";

interface SlideProps {
  setIsOpen?: () => void;
  setIsMinting?: (isMinting: boolean) => void;
  type: "daily" | "invite" | "og" | "nft";
  value?: number;
  onClick?: () => void;
}

const SlideContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    className={cn(
      "flex-1 flex",
      "rounded-b-[20px]",
      "bg-[url('/images/claim-back.png')] w-[330px] bg-cover bg-no-repeat bg-center",
      "shadow-[0px_2px_2px_0px_rgba(62,36,105,0.20)]",
      "font-bumper-sticker",
      "h-[77px] w-full px-2"
    )}
  >
    <div
      className={cn(
        "flex-1 flex",
        "rounded-b-[15px]",
        "border border-[#A96415]",
        "bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1]",
        "shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)]",
        "font-bumper-sticker",
        "h-[72px] w-full",
        "flex justify-center items-end px-2 pb-1"
      )}
    >
      {children}
    </div>
  </div>
);

export const GiftSlide: React.FC<SlideProps> = ({
  setIsOpen,
  setIsMinting,
  type,
  // value,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.();
    setIsOpen?.();
    setIsMinting?.(true);
  };
  const { sessionId } = useContext(GeneralContext);
  const { data: completionStatusData } = useBonusCompletion({ sessionId });
  const timeLeft = useTimeLeft();

  const getSlideContent = () => {
    switch (type) {
      case "daily":
        return (
          <>
            <div className="flex-1 h-[57px] bg-[#CDAA98] rounded-l-[7px] min-w-[270px]">
              <div
                className={cn(
                  "flex gap-2 rounded-md w-fit px-2",
                  "-mt-1 -ml-1 ",
                  "bg-[#653F56] shadow-[0_0.25ch_rgba(0,0,0,0.2)]",
                  "text-[#E3BEAA]"
                )}
              >
                <p className="2xs:pt-0.5">daily claim</p>
                <DailyBarge>
                  <span>
                    {(() => {
                      const now = new Date();
                      now.setHours(now.getHours() + (timeLeft?.hours || 0));
                      now.setMinutes(
                        now.getMinutes() + (timeLeft?.minutes || 0)
                      );
                      now.setSeconds(
                        now.getSeconds() + (timeLeft?.seconds || 0)
                      );
                      // Format as MM/DD
                      return `${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
                    })()}
                  </span>
                </DailyBarge>
                <DailyBarge>
                  <span>
                    {(() => {
                      const now = new Date();
                      now.setHours(now.getHours() + (timeLeft?.hours || 0));
                      now.setMinutes(
                        now.getMinutes() + (timeLeft?.minutes || 0)
                      );
                      now.setSeconds(
                        now.getSeconds() + (timeLeft?.seconds || 0)
                      );
                      // Format as HH:MM
                      return now.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    })()}
                  </span>
                </DailyBarge>
              </div>
              <div className={cn("px-1 py-2 text-green-dark", "flex gap-2")}>
                <DayBarge checked />
                <DayBarge />
                <DayBarge />
              </div>
            </div>
            <RightArrow2
              className="h-[57px] w-fit block"
              color="#917377"
              onClick={handleClick}
            />
          </>
        );

      case "invite":
        return (
          <>
            <div className="flex-1 h-[57px] bg-[#D9B8A3] rounded-l-[7px] min-w-[270px]">
              <div
                className={cn(
                  "flex gap-2 rounded-md w-fit px-2",
                  "-mt-1 -ml-1 ",
                  "bg-[#27A459] shadow-[0_0.25ch_rgba(0,0,0,0.2)]",
                  "text-[#FFD093]"
                )}
              >
                <p className="2xs:pt-0.5">Invite Friends, Earn $$$!</p>
              </div>
              <div className="text-[#653F56] font-made-tommy text-[11px] font-bold leading-[14px] bg-[#CDAC9A] rounded-[3px] mx-2 mt-[3px] p-[1px]">
                Invite friends to earn Spins and a lifetime revenue share of all
                fees they generate!
              </div>
            </div>
            <RightArrow2
              className="h-[57px] w-fit block"
              color="#27A459"
              onClick={handleClick}
            />
          </>
        );

      case "og":
        return (
          <>
            <div className="flex-1 h-[57px] bg-[#CDAA98] rounded-l-[7px] min-w-[270px]">
              <div
                className={cn(
                  "flex gap-2 rounded-md w-fit px-2",
                  "-mt-1 -ml-1 ",
                  "bg-[var(--color-blue)] shadow-[0_0.25ch_rgba(0,0,0,0.2)]",
                  "text-white"
                )}
              >
                <p className="2xs:pt-0.5">CLAIM OG</p>
              </div>
              <div className="text-[var(--color-golden-brown)] font-made-tommy text-[11px] font-bold leading-[14px] bg-[var(--color-blown-dark)] rounded-[3px] mx-1 mt-[3px] p-[1px]">
                <span>Complete 3 tasks to secure Kokomo OG status</span>
                <div
                  className={cn(
                    "flex-1 rounded-4xl h-2 mt-[3px]",
                    "bg-gradient-to-b from-[#5F3F5700] to-[#74506199] shadow-[0_2px_0_0_#00000033] border-2 border-[#8B6971]"
                  )}
                >
                  <div
                    className={cn(
                      "h-full rounded-l-4xl",
                      // "bg-gradient-to-b from-[#4E3BB600] to-[#4E3BB6D0]"
                      "bg-[#A291FF]"
                    )}
                    style={{
                      width: `${
                        (Number(
                          completionStatusData?.completionPercentage || 0
                        ) /
                          3) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <RightArrow2
              className="h-[57px] w-fit block"
              color="var(--color-blue)"
              arrowColor="#ffffff"
              onClick={handleClick}
            />
          </>
        );

      case "nft":
        return (
          <>
            <div className="flex-1 h-[57px] bg-[var(--color-blown-dark)] rounded-l-[7px] min-w-[270px]">
              <p
                className={cn(
                  "flex gap-2 rounded-md w-fit px-2",
                  "-mt-1 -ml-1 ",
                  "bg-[var(--color-yellow)] shadow-[0_0.25ch_rgba(0,0,0,0.2)]",
                  "text-[var(--color-golden-brown)]",
                  "2xs:pt-0.5"
                )}
              >
                FREE KOKOMO NFT!
              </p>
              <div className="text-[var(--color-golden-brown)] font-made-tommy text-[12px] font-bold leading-[14px] bg-[var(--color-blown-dark)] rounded-[3px] mx-2 mt-[3px] p-[1px]">
                Claim your free welcome gift - a Kokomo Collectible NFT!
              </div>
            </div>
            <RightArrow2
              className="h-[57px] w-fit block"
              color="var(--color-yellow)"
              arrowColor="var(--color-golden-brown)"
              onClick={handleClick}
            />
          </>
        );
    }
  };

  return <SlideContainer>{getSlideContent()}</SlideContainer>;
};
