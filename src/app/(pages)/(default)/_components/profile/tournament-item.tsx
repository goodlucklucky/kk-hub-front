import React, { useCallback } from "react";
import Image from "next/image";
import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/_contexts/appContext";

interface TournamentItemProps {
  alt?: string;
  color: string;
  icon?: StaticImageData;
  title: string;
  score?: string | number;
  message: string;
  path?: string;
}

const TournamentItem: React.FC<TournamentItemProps> = ({
  alt = "tour-item-icon",
  color,
  icon,
  title,
  score = 0,
  message,
  path = "/#",
}) => {
  const router = useRouter();
  const { setIsProfileOpen } = useApp();

  const handleClick = useCallback(() => {
    router.push(path);
    setIsProfileOpen(false);
  }, [router, setIsProfileOpen, path]);

  return (
    <div
      onClick={handleClick}
      className="rounded-[6px] border border-[#D7BDA4] bg-neutral-500 w-full h-[60px] flex-shrink-0 overflow-hidden shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)]"
    >
      <div
        className="w-full h-[36px] flex justify-between items-center px-2"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-x-1 flex-1">
          {icon && <Image alt={alt} src={icon} />}
          <p className="text-[#FFF4E6] text-[14px] font-made-tommy font-bold leading-normal tracking-[0.14px] whitespace-nowrap overflow-auto line-clamp-1 flex-1">
            {title}
          </p>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="w-[69px] h-[18px] flex-shrink-0 rounded-[5px] flex items-center justify-center bg-[#FFFFFFA0]">
            <p
              className="font-made-tommy text-center text-[14px] font-semibold leading-normal tracking-[0.14px]"
              style={{ color: `color-mix(in srgb, ${color}, #333)` }}
            >
              {score ? score + " PTS" : "No Score"}
            </p>
          </div>
          <CustomRightArrow color="#FFF4E6" />
        </div>
      </div>
      <div className="w-full h-[24px] bg-[#F5DDC4] flex items-center px-2">
        <p className="text-[rgba(116,80,97,0.80)] font-made-tommy text-[12px] font-bold leading-normal tracking-[0.12px] whitespace-nowrap truncate">
          {message}
        </p>
      </div>
    </div>
  );
};

export default TournamentItem;
