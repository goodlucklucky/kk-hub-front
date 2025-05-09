'use client';

import React, { useState, useCallback } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { XpBar } from "../_components/xp-bar";
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
import MintDialog from "../_components/dialogs/mint-dialog";
import BankDialog from "../_components/dialogs/bank-dialog";
import ProfileDialog from "../_components/dialogs/profile-dialog";
import ChatDialog from "../_components/dialogs/chat-dialog";
import { useApp } from "@/app/_contexts/appContext";

export default function HomePage() {
  const { isBankingOpen, setIsBankingOpen, isProfileOpen, setIsProfileOpen, isChatOpen, setIsChatOpen } = useApp();

  const groupedGames = Object.entries(_.groupBy(games, (game) => game?.type));

  const [isMinting, setIsMinting] = useState(false);
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);


  const handleMintDialogToggle = useCallback(() => {
    setIsMintDialogOpen(prev => !prev);
  }, []);

  const handleMintDialogClose = useCallback(() => {
    setIsMintDialogOpen(false);
  }, []);

  return (
    <>
      <XpBar currentXp={745} maxXp={3250} />
      <div className={cn("flex flex-col flex-1 h-full items-center gap-y-3 xs:gap-y-5")}>
        <Image
          src={mainBack}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading='lazy'
          priority={false}
        />
        <Image
          src={forestBack}
          alt="Forest background"
          className="absolute inset-0 w-full h-[505px] top-[115px] -z-10 rotate-180"
          loading='lazy'
          priority={false}
        />
        <Gifts
          setIsOpen={handleMintDialogToggle}
          setIsMinting={setIsMinting}
        />

        <div className={cn("rounded-2xl flex-1 relative h-full", "mx-2")}>
          <div className="grid grid-cols-2 text-center bg-golden-brown font-bumper-sticker text-sm xs:text-xl rounded-tr-2xl rounded-tl-2xl">
            <div className="py-1.5 bg-white text-golden-brown flex justify-center rounded-tl-2xl">
              <div className="flex gap-x-2 items-center">
                <GameIcon />
                <span>PLAY</span>
              </div>
            </div>
            <div className="py-1.5 text-white flex justify-center">
              <div className="flex gap-x-2 items-center">
                <StarIcon />
                <span>FAVOURITES</span>
              </div>
            </div>
          </div>

          <div className="bg-[#000000]/20 pt-1 rounded-b-2xl">
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
              />
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Chat />
            <AddToHome />
          </div>
        </div>
      </div>
      <MintDialog
        isMinting={isMinting}
        isOpen={isMintDialogOpen}
        onClose={handleMintDialogClose}
        setIsMinting={setIsMinting}
      />
       <BankDialog
        isOpen={isBankingOpen}
        onClose={() => setIsBankingOpen(!isBankingOpen)}
      />
      <ProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(!isProfileOpen)}
      />
      <ChatDialog
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(!isChatOpen)}
      />
    </>
  );
}
