'use client';

//import modules
import Image from "next/image";
import Link from "next/link";
import React from "react";

//import components
import { TrophyIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";

//import assets
import { RightArrow } from '@assets/svg/right-arrow';
import { WarIcon } from "@/app/_assets/svg/war";
import { CupIcon } from "@/app/_assets/svg/cup";

//interface
export type TItems = {
  title?: string;
  soon?: string;
  image?: string;
  link?: string;
  isNew?: boolean;
  number?: number;
};

export type TGamesCardProps = {
  title: string;
  Icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
  items?: TItems[];
};

export default function GamesCard({
  title = "Games",
  Icon = TrophyIcon,
  items = [],
}: TGamesCardProps) {
  return (
    <div className={cn("p-2", title === "Games" ? "space-y-1" : "")}>
      <div className="">
        <p className="flex items-center gap-2 text-white font-extrabold text-[18px]">
          <span className="bg-black/20 backdrop-blur-[25px] px-1.5 rounded-t-[5px] shadow-[0_2px_0_0_#00000033]">{title}</span>
        </p>
        {
          title === "Games" ?
            <div className="rounded-[11px] rounded-tl-none w-full flex justify-center gap-x-1 items-center bg-black/33 backdrop-blur-[25px] text-[18px]/[28px] font-bold p-1">
              <div className="text-[#8893A8] bg-white rounded-[7px] w-[20%] text-center">All</div>
              <div className="text-white rounded-[7px] w-[50%] text-center flex justify-center items-center bg-[#653F56] backdrop-blur-[25px] gap-x-2"><CupIcon />Tournaments</div>
              <div className="text-white rounded-[7px] w-[30%] text-center flex justify-center items-center bg-[#653F56] backdrop-blur-[25px] gap-x-2"><WarIcon />PvP</div>
            </div>
            :
            null
        }
      </div>


      <div className={cn("flex gap-2 p-1 bg-black/40 backdrop-blur-[25px]", title === "Games" ? "rounded-lg" : "rounded-b-lg rounded-tr-lg")}>
        {(
          [
            ...items,
            ...Array.from({ length: 4 }).fill({ soon: true }),
          ] as TItems[]
        )
          ?.slice(0, 4)
          .map((one, index) =>
            one?.soon ? (
              <CommingSoonCard key={index} />
            ) : (
              <GameItemCard
                title={one?.title || ""}
                image={one?.image}
                link={one?.link}
                isNew={one?.isNew}
                number={one?.number}
                key={index}
              />
            )
          )}
        <div className="flex justify-center items-center w-9 bg-[#B1B5CCA8] border border-[#B1B5CC] rounded-r-lg">
          <RightArrow />
        </div>
      </div>

    </div>
  );
}

export type TGameItemCardProps = Omit<TItems, "soon">;

export function GameItemCard({ title, image, link, isNew, number }: TGameItemCardProps) {
  return (
    <Link href={link || "#"} className="rounded-lg w-[70px] relative overflow-hidden">
      {number && <p className="absolute top-0 right-0 bg-red-light px-1 text-white text-[10px] rounded-bl-lg">{number}</p>}
      {isNew && <p className="absolute top-0 right-1 bg-red-light px-1 text-white text-[10px] rounded-sm">New</p>}
      <div className="bg-white/20">
        {image && (
          <Image
            src={`${image}`}
            alt={`${title}`}
            className="object-cover size-full"
            height={70}
            width={70}
          />
        )}
      </div>
      <p
        className={cn(
          "h-5 flex justify-center items-center w-full text-white",
          "text-center text-[11px]/[20px] font-bold line-clamp-1 absolute bottom-0 rounded-b-lg",
          "bg-[#653F5680] backdrop-blur-[25px]"
        )}
      >
        {title}
      </p>
    </Link>
  );
}

export function CommingSoonCard() {
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center bg-black/20 w-[70px] h-[70px]",
        "text-center text-sm font-bumper-sticker text-golden-bright"
      )}
    >
      <p>
        COMMING
        <br />
        SOON
      </p>
    </div>
  );
}
