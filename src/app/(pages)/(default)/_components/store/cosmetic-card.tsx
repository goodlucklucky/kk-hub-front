import React from "react";
import Image, { StaticImageData } from "next/image";

import { DollarIcon } from "@/app/_assets/svg/dollar";
import { HotIcon } from "@/app/_assets/svg/hot";

interface CosmeticCardProps {
  image: StaticImageData | string;
  title: string;
  subtitle: string;
  price: number;
  showInfo?: boolean;
  isHot?: boolean;
  onClick?: () => void;
}

const CosmeticCard: React.FC<CosmeticCardProps> = ({
  image,
  title,
  subtitle,
  price,
  showInfo = false,
  isHot = false,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col gap-1 rounded-[10px] border border-[rgba(145,115,119,0.20)] bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)] p-1 relative"
      onClick={onClick}
    >
      <Image
        src={image}
        width={100}
        height={100}
        alt={title}
        className="aspect-[2/1.5] object-contain"
      />
      {isHot && (
        <div className="absolute top-2 -right-0.5 rounded-[3px] bg-[#ED4721] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)] flex gap-1 font-made-tommy text-[12px]/[10px] font-medium text-white px-1 py-0.5 pt-1">
          <HotIcon />
          Hot
        </div>
      )}
      <div className="flex flex-col justify-center items-center py-0.5 gap-0 bg-[#E3BEAA] rounded-[5px] relative">
        <div className="text-[#5F3F57] text-[12px]/[14px] font-bumper-sticker font-normal px-2 text-center pt-0.5">
          {title}
        </div>
        <div className="text-[#5F3F57] text-[12px]/[14px] font-bumper-sticker font-normal px-2 text-center">
          {subtitle}
        </div>
        {showInfo && (
          <div className="absolute top-0 right-0 bg-[#917377] rounded-full w-[15px] h-[15px] flex items-center justify-center text-[#E3BEAA] text-[10px]/[15px] font-made-tommy font-medium pl-[1px]">
            i
          </div>
        )}
      </div>
      <div className="bg-[#917377] rounded-[5px] flex items-center justify-center gap-x-1 py-1">
        <DollarIcon />
        <span className="text-[#F7DAB5] font-made-tommy font-bold text-[15px]/[15px]">
          {price?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CosmeticCard;
