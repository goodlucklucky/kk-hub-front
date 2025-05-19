import React from "react";
import Image from "next/image";
import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface ResultsItemProps {
  alt: string;
  color: string;
  scoreColor: string;
  icon: StaticImageData;
  title: string;
  score: string;
  detail: string;
  path: string;
}

const ResultsItem: React.FC<ResultsItemProps> = ({
  alt,
  color,
  scoreColor,
  icon,
  title,
  score,
  detail,
  path,
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(path);
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-[6px] border border-[#D7BDA4] w-full h-[60px] flex-shrink-0 overflow-hidden shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)]"
    >
      <div
        className="w-full h-[36px] flex justify-between items-center px-2"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-x-1">
          <Image alt={alt} src={icon} />
          <p className="text-[#FFF4E6] text-[14px] font-made-tommy font-bold leading-normal tracking-[0.14px] whitespace-nowrap">
            {title}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <div
            className="w-[69px] h-[18px] flex-shrink-0 rounded-[5px] flex items-center justify-center"
            style={{ backgroundColor: scoreColor }}
          >
            <p
              className="font-made-tommy text-center text-[14px] font-bold leading-normal tracking-[0.14px]"
              style={{ color }}
            >
              {score}
            </p>
          </div>
          <CustomRightArrow color="#FFF4E6" />
        </div>
      </div>
      <div className="w-full h-[24px] bg-[#F5DDC4] flex items-center px-2">
        <p className="text-[rgba(116,80,97,0.80)] font-made-tommy text-[12px] font-bold leading-normal tracking-[0.12px]">
          {detail}
        </p>
      </div>
    </div>
  );
};

export default ResultsItem;
