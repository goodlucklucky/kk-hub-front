"use client";

import React, { useState, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import _ from "lodash";
//import components
import Gifts from "../_components/gifts";
import GamesCard from "../_components/games/card";
import AddToHome from "../_components/add-to-home";
import Chat from "../_components/chat";

//import utils
import { games } from "@/constants/games";
import { typeIcons } from "@/app/_constants/types";
import { cn } from "@/app/_lib/utils";

//import icons
import { GameIcon } from "@assets/svg/game";
import { StarIcon } from "@/app/_assets/svg/star";

//import images
import forestBack from "@assets/images/forest-back.png";
import mainBack from "@assets/images/main-back.png";
import MintDialog from "../_components/dialogs/mint-dialog";
import PreviewDialog from "../_components/dialogs/preview-dialog";

export default function HomePage() {
  const groupedGames = Object.entries(_.groupBy(games, (game) => game?.type));

  const [tabOpen, setTabOpen] = useState<"play" | "favourites">("play");
  const [isMinting, setIsMinting] = useState(false);
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    link: string;
    image: string | StaticImageData;
    description: string;
    msg: string;
  }>({
    title: "",
    link: "",
    image: "",
    description: "",
    msg: "",
  });

  const handlePreviewDialogToggle = useCallback(
    (data: {
      title: string;
      link: string;
      image: string | StaticImageData;
      description: string;
      msg: string;
    }) => {
      setIsPreviewOpen(true);
      setPreviewData(data);
    },
    []
  );

  const handleMintDialogToggle = useCallback(() => {
    setIsMintDialogOpen((prev) => !prev);
  }, []);

  const handleMintDialogClose = useCallback(() => {
    setIsMintDialogOpen(false);
  }, []);

  return (
    <>
      <div
        className={cn(
          "flex flex-col flex-1 h-full items-center gap-y-3 xs:gap-y-5"
        )}
      >
        <Image
          src={mainBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="lazy"
          priority={false}
        />
        <Image
          src={forestBack}
          alt="Forest background"
          className="absolute inset-0 w-full h-[555px] top-[70px] -z-10 rotate-180"
          loading="lazy"
          priority={false}
        />
        <Gifts setIsOpen={handleMintDialogToggle} setIsMinting={setIsMinting} />

        <div
          className={cn(
            "rounded-2xl flex-1 relative h-full flex flex-col justify-evenly ",
            "mx-2"
          )}
        >
          <div>
            <div className="grid grid-cols-2 text-center bg-golden-brown font-bumper-sticker text-sm 2xs:text-xl rounded-tr-2xl rounded-tl-2xl">
              <div
                className={cn(
                  "py-1.5 flex justify-center rounded-tl-2xl",
                  tabOpen === "play"
                    ? "bg-white text-golden-brown"
                    : "bg-golden-brown text-white"
                )}
                onClick={() => setTabOpen("play")}
              >
                <div className="flex gap-x-2 items-center">
                  <GameIcon fill={tabOpen === "play" ? "#5F3F57" : "#FFF"} />
                  <span>PLAY</span>
                </div>
              </div>
              <div
                className={cn(
                  "py-1.5 flex justify-center rounded-tr-2xl",
                  tabOpen === "favourites"
                    ? "bg-white text-golden-brown"
                    : "bg-golden-brown text-white"
                )}
                onClick={() => setTabOpen("favourites")}
              >
                <div className="flex gap-x-2 items-center">
                  <StarIcon
                    fill={tabOpen === "favourites" ? "#5F3F57" : "#FFF"}
                  />
                  <span>FAVOURITES</span>
                </div>
              </div>
            </div>
            <div className="bg-[#000000]/20 py-1 rounded-b-2xl">
              {groupedGames?.slice(0, 2)?.map(([type, games]) => (
                <GamesCard
                  key={type}
                  Icon={typeIcons?.[type]}
                  title={type}
                  items={games?.map((game) => ({
                    title: game?.name,
                    image: game?.image,
                    isNew: game?.isNew,
                    number: game?.number,
                    link: `${game?.page}/`,
                  }))}
                  handlePreviewDialogToggle={handlePreviewDialogToggle}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-1 mb-2 2xs:mt-2">
            <Chat />
            <AddToHome />
          </div>
        </div>
      </div>
      <MintDialog
        isMinting={isMinting}
        isOpen={isMintDialogOpen}
        onClose={handleMintDialogClose}
      />
      <PreviewDialog
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(!isPreviewOpen)}
        title={previewData?.title}
        link={previewData?.link}
        image={previewData?.image}
        description={previewData?.description}
        msg={previewData?.msg}
      />
    </>
  );
}
