"use client";

import Slider from "react-slick";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { UseQueryResult } from "@tanstack/react-query";
// import CloseButton from "@/_assets/icons/Button_Close.png";
import { IChallenge } from "@/../services/game/challenges";
import { ICheckUserBonus2 } from "../services/bonus";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import BoxMain from "@/app/(pages)/(default)/_components/BoxMain";
import { Button } from "@/app/_components/ui/button";
import { formatBigNumber } from "@/app/_utils/number";

export const bonusNames = [
  "redeem-tweet-1-free-entry",
  "redeem-follow-1-free-entry",
  "redeem-join-channel-1-free-entry",
  "redeem-join-chat-1-free-entry",
  "redeem-follow-boss-1-free-entry",
];

export function ChallengeBonusDialog({
  open,
  isLoading,
  setOpen,
  onTweet,
  freeEntryBonuses,
}: {
  challenge: IChallenge | undefined;
  open: boolean;
  isLoading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onTweet?: (_userBonus: ICheckUserBonus2["data"]) => void;
  freeEntryBonuses?: UseQueryResult<ICheckUserBonus2, Error>[];
}) {
  const onClaim = useCallback(
    (link: string, userBonus?: ICheckUserBonus2["data"]) => {
      try {
        window.open(link, "_blank");

        if (onTweet) onTweet(userBonus!);
        setOpen(false);
      } catch {
        // console.log(error);
      }
    },
    [onTweet, setOpen]
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 10,
    autoplay: false,
    arrows: false,
    appendDots: (dots: React.ReactNode[]) => (
      <div
        style={{
          position: "absolute",
          top: "70%",
          bottom: "unset",
          transform: "translateY(-50%)",
        }}
      >
        <ul
          style={{
            margin: "0px",
            padding: "0px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {dots.map((dot, index) => (
            <Fragment key={index}>{dot}</Fragment>
          ))}
        </ul>
      </div>
    ),
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent
        // size={"xl"}
        containerClassName="w-full flex gap-2 overflow-hidden h-full items-center justify-center !max-w-[86vw]"
        onInteractOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
      >
        <BoxMain className="text-center">
          <DialogTitle className="text-center font-[400] text-[26px] text-[#491F36] font-bumper-sticker tracking-[0.26px]">
            IT&apos;S YOUR LUCKY DAY!
          </DialogTitle>
          <Slider {...sliderSettings}>
            {freeEntryBonuses?.map((item, index) => (
              <ChallengeBonusCard
                key={item?.data?.data?.bonusId || index}
                item={item}
                onClaim={onClaim}
                isLoading={isLoading}
              />
            ))}
          </Slider>
        </BoxMain>
        {/* <Image
          onClick={() => setOpen(false)}
          src={CloseButton}
          alt="Close button"
          width={86}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[58%] z-[1000]"
        /> */}
      </DialogContent>
    </Dialog>
  );
}

export function ChallengeBonusCard({
  item,
  onClaim,
  isLoading,
}: {
  item: UseQueryResult<ICheckUserBonus2, Error>;
  onClaim: (_link: string, _userBonus?: ICheckUserBonus2["data"]) => void;
  isLoading: boolean;
}) {
  const data = useMemo(() => item?.data?.data, [item?.data?.data]);
  const isPending = useMemo(
    () => item?.isLoading || item?.isFetching || item?.isPending,
    [item?.isFetching, item?.isLoading, item?.isPending]
  );

  const link = useMemo(() => {
    if (data?.bonus?.details?.tweet)
      return `https://x.com/compose/post?text=${data?.bonus?.details?.tweet}`;
    else return data?.bonus?.details?.link;
  }, [data?.bonus?.details?.link, data?.bonus?.details?.tweet]);

  const isDisabled = useMemo(
    () => isLoading || isPending,
    [isLoading, isPending]
  );
  const isClaimed = useMemo(() => data?.status == "claimed", [data?.status]);

  return (
    <div className="px-1">
      <div className="bg-[#EED1B8] overflow-none p-2 rounded-3xl my-2 space-y-2 w-full">
        <div
          className="bg-[#FCEAD0] rounded-2xl p-2 bg-no-repeat bg-center aspect-video w-full flex items-center justify-center"
          style={{
            backgroundImage:
              "radial-gradient(50% 50% at 50% 50%, rgb(255 221 127) 0%, rgba(255, 193, 0, 0) 100%)",
            backgroundSize: "12rem 12rem",
          }}
        >
          <Image
            src={item?.data?.data?.bonus?.details?.image || ""}
            alt="Tweet"
            width={200}
            height={200}
            className="w-36 rounded-xl bg-[fff0da4f]"
          />
        </div>
        <div className="bg-[#FCEAD080] p-2 rounded-2xl pb-8">
          <div className="text-[18px] text-[#745061] font-bold text-center">
            Have a Free Entry on us 🎁
          </div>
          <div className="text-[14px] text-[#5F3F57] font-bold text-center">
            {data?.bonus?.description}
          </div>
        </div>
        <div className="bg-[#E3BEAA] rounded-2xl p-2 space-y-2">
          <Button
            className={`bg-green px-14 font-extrabold text-white h-8 w-full rounded-xl hover:bg-emerald-500 shadow-[0_0.15rem] shadow-[#2C7C4C] ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isDisabled || isClaimed}
            onClick={() => onClaim(link!, data)}
          >
            {isClaimed
              ? "Claimed"
              : isDisabled
                ? "Loading..."
                : `${data?.bonus?.details?.buttonContent}`}
          </Button>
          <p className="text-[14px] text-[#745061] font-bold text-center">
            {formatBigNumber(
              data?.bonus?.details?.redeem?.["challenge-entries"]?.free || 0
            )}{" "}
            Free Entry
          </p>
        </div>
      </div>
    </div>
  );
}
