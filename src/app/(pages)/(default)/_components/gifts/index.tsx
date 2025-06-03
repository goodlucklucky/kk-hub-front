//import modules
import React, { useContext, useMemo } from "react";
import Slider from "react-slick";

//import components
import { GiftSlide } from "./slides";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { useBonusCompletion } from "../../../../../../services/bonus";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/_contexts/appContext";
import { useActiveAccount } from "thirdweb/react";
import { useAirdropNft } from "../../../../../../services/nft";

//interface
interface GiftsProps {
  setIsOpen: () => void;
  setIsMinting: (isMinting: boolean) => void;
}

//custom react carousel settings
const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  infinite: true,
  fade: true,
  autoplay: true,
  autoplaySpeed: 4000,
  appendDots: (dots: any) => <div>{dots}</div>,
};

export default function Gifts({ setIsOpen, setIsMinting }: GiftsProps) {
  const { sessionId } = useContext(GeneralContext);
  const { isProfileOpen, setIsProfileOpen } = useApp();
  const account = useActiveAccount();
  const { mutateAsync: claimAirDrop } = useAirdropNft();

  const { data: completionStatus } = useBonusCompletion({ sessionId });
  const router = useRouter();

  const ogCount = useMemo(
    () =>
      completionStatus?.bonuses?.filter(
        (one) =>
          one?.status === "active" &&
          [
            "follow_twitter",
            "telegram_community",
            "invite_3_friends",
          ]?.includes(one?.bonusName)
      )?.length || 0,
    [completionStatus?.bonuses]
  );

  const processMint = async () => {
    setIsMinting(true);
    await claimAirDrop({
      wallet: `${account?.address}`,
      sessionId,
      type: "welcome",
    });
    setIsMinting(false);
  };

  return (
    <div className="flex items-center justify-center gap-3 pl-0 w-[335px]">
      {/* <div className="w-full"> */}
      <Slider {...settings} className="w-full">
        <GiftSlide type="daily" onClick={() => router.push("/claim")} />
        <GiftSlide
          type="invite"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        />
        <GiftSlide
          type="og"
          value={ogCount}
          onClick={() => router.push("/tasks")}
        />
        <GiftSlide
          type="nft"
          setIsOpen={setIsOpen}
          setIsMinting={processMint}
        />
      </Slider>
      {/* </div> */}
    </div>
  );
}
