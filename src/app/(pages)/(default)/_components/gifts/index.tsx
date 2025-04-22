//import modules
import React from "react";
import Slider from "react-slick";

//import utils
// import { cn } from "@/app/_lib/utils";

//import components
import { GiftSlide } from "./slides";

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
  return (
    <div className="flex items-center justify-center gap-3 pl-0 w-[335px]">
      {/* <GiftBarge /> */}
      <div className="w-full">
        <Slider {...settings}>
          <GiftSlide type="daily" />
          <GiftSlide type="invite" />
          <GiftSlide type="og" />
          <GiftSlide type="nft" setIsOpen={setIsOpen} setIsMinting={setIsMinting} />
        </Slider>
      </div>
    </div>
  );
}
