//import modules
import React from "react";
import Slider from "react-slick";

//import utils
// import { cn } from "@/app/_lib/utils";

//import components
import { GiftSlide } from "./slides";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/_contexts/appContext";

//import assets
// import { RightArrow2 } from "@/app/_assets/svg/right-arrow";

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
  appendDots: (dots: any) => (
    <div>
      {dots}
    </div>
  ),
};

export default function Gifts({ setIsOpen, setIsMinting }: GiftsProps) {
  const { isProfileOpen, setIsProfileOpen, isTaskOpen, setIsTaskOpen } = useApp();
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-3 pl-0 w-[335px]">
      {/* <GiftBarge /> */}
      <div className="w-full">
        <Slider {...settings}>
          <GiftSlide type="daily" onClick={() => router.push("/claim")} />
          <GiftSlide type="invite" onClick={() => setIsProfileOpen(!isProfileOpen)} />
          <GiftSlide type="og" onClick={() => router.push("/tasks")} />
          <GiftSlide type="nft" setIsOpen={setIsOpen} setIsMinting={setIsMinting} />
        </Slider>
      </div>
    </div>
  );
}
