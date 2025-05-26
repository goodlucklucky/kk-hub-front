"use client";

//import modules
import Image, { StaticImageData } from "next/image";
import React from "react";

//import components
// import { TrophyIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";

//import assets
import { RightArrow } from "@assets/svg/right-arrow";

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
  handlePreviewDialogToggle: (data: {
    title: string;
    link: string;
    image: string | StaticImageData;
    description: string;
    msg: string;
  }) => void;
};

export default function GamesCard({
  title = "Games",
  // Icon = TrophyIcon,
  items = [],
  handlePreviewDialogToggle,
}: TGamesCardProps) {
  return (
    <div className="p-2 py-0.5 2xs:py-1">
      <div className="">
        <p className="flex items-center gap-2 text-white font-extrabold text-[18px]">
          <span className="bg-black/20 backdrop-blur-[25px] px-1.5 rounded-t-[5px] shadow-[0_2px_0_0_#00000033]">
            {title}
          </span>
        </p>
      </div>

      <div
        className={cn(
          "flex gap-2 p-1 bg-black/40 backdrop-blur-[25px]",
          "rounded-b-lg rounded-tr-lg"
        )}
      >
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
                handlePreviewDialogToggle={handlePreviewDialogToggle}
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

export type TGameItemCardProps = Omit<TItems, "soon"> & {
  handlePreviewDialogToggle: (data: {
    title: string;
    link: string;
    image: string | StaticImageData;
    description: string;
    msg: string;
  }) => void;
};

export function GameItemCard({
  title,
  image,
  link,
  isNew,
  number,
  handlePreviewDialogToggle,
}: TGameItemCardProps) {
  return (
    <div
      className="rounded-lg w-[70px] relative overflow-hidden"
      onClick={() =>
        handlePreviewDialogToggle({
          title: title || "",
          link: link || "",
          image: image || "",
          description: "Ever made memecoin money playing Snake?!",
          msg: "Win $ playing classic Snake in Tournaments, PvP, and more!",
        })
      }
    >
      {number && (
        <p className="absolute top-0 right-0.5 bg-red-light px-1 text-white text-[10px] rounded-lg">
          {number}
        </p>
      )}
      {isNew && (
        <div className="absolute top-0 right-0.5 bg-red-light px-1 text-white text-[10px] rounded-sm font-made-tommy">
          New
        </div>
      )}
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
    </div>
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
        COMING
        <br />
        SOON
      </p>
    </div>
  );
}
