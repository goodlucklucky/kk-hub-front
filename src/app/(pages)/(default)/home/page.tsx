import React from "react";
import Image from "next/image";
import _ from "lodash";

//import components
import XpBar from "../_components/xp-bar";
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
import forestBack from '@assets/images/forest-back.png';
import mainBack from '@assets/images/main-back.png';

export default function HomePage() {
  const groupedGames = Object.entries(_?.groupBy(games, (game) => game?.type));

  return (
    <>
      <XpBar />
      <div className={cn("")}>
        <Image src={mainBack} alt="main-back" className="absolute inset-0 w-full h-full -z-10 object-cover object-center" loading='lazy' />
        <Image src={forestBack} alt="main-back" className="absolute top-[1125px]inset-0 w-full h-full -z-10 rotate-180" loading='lazy' />
        <Gifts />

        <div className={cn("rounded-2xl contain-content relative", "mx-2")}>

          <div className="grid grid-cols-2 text-center bg-golden-brown font-bumper-sticker text-xl">
            <div className="py-2 bg-white text-golden-brown flex justify-center">
              <div className="flex gap-x-2 items-center">
                <GameIcon />
                <span>PLAY</span>
              </div>
            </div>
            <div className="py-2 text-white flex justify-center">
              <div className="flex gap-x-2 items-center">
                <StarIcon />
                <span>FAVOURITES</span>
              </div>
            </div>
          </div>
          <div className="bg-white/40 pt-1 divide-y divide-golden-brown/30">
            {groupedGames?.slice(0, 2)?.map(([type, games]) => (
              <GamesCard
                key={type}
                Icon={typeIcons?.[type]}
                title={type}
                items={games?.map((game) => ({
                  title: game?.name,
                  image: game?.image,
                  link: `/games/${game?.page}/`,
                }))}
              />
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 mx-2 mt-2">
            <Chat />
            <AddToHome />
          </div>
        </div>
      </div>
    </>
  );
}
