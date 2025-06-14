"use client";

import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
//import components
import Gifts from "../../(default)/_components/gifts";

//import utils
import { cn } from "@/app/_lib/utils";

//import images
import forestBack from "@assets/images/forest-back.png";
import mainBack from "@assets/images/main-back.png";
import MintDialog from "../../(default)/_components/dialogs/mint-dialog";
import BankDialog from "../../(default)/_components/dialogs/bank-dialog";
import ProfileDialog from "../../(default)/_components/dialogs/profile-dialog";
import ChatDialog from "../../(default)/_components/dialogs/chat-dialog";
import { useApp } from "@/app/_contexts/appContext";
import Footer from "../../(default)/_components/layout/footer";
import { Button } from "@/app/_components/ui/button";
import { QuestionMarkIcon, MsgIcon } from "@/app/_assets/svg/template";
import { PlusIcon } from "@/app/_assets/svg/plus";
import { useRouter, useParams } from "next/navigation";
import { games_contents } from "@/constants/games_contents";

export default function HomePage() {
  const {
    isBankingOpen,
    setIsBankingOpen,
    isProfileOpen,
    setIsProfileOpen,
    isChatOpen,
    setIsChatOpen,
  } = useApp();

  const [isMinting, setIsMinting] = useState(false);
  const [isMintDialogOpen, setIsMintDialogOpen] = useState(false);

  const handleMintDialogToggle = useCallback(() => {
    setIsMintDialogOpen((prev) => !prev);
  }, []);

  const handleMintDialogClose = useCallback(() => {
    setIsMintDialogOpen(false);
  }, []);

  const router = useRouter();
  const { title } = useParams();

  const game = useMemo(() => {
    return games_contents?.find((game) => game?.key === title);
  }, [title]);

  const wallpaper = useMemo(() => {
    return game?.wallpaper?.home || mainBack?.src;
  }, [game?.wallpaper?.home]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col flex-1 h-full items-center gap-y-3 xs:gap-y-5"
        )}
      >
        <Image
          src={wallpaper}
          alt="Main background"
          className="absolute inset-0 w-full h-full -z-10 object-cover object-center"
          loading="lazy"
          priority={false}
          width={900}
          height={1080}
        />
        {game?.wallpaper?.home2 && (
          <Image
            src={forestBack}
            alt="Forest background"
            className="absolute inset-0 w-full h-[555px] top-[70px] -z-10 rotate-180"
            loading="lazy"
            priority={false}
          />
        )}
        <Gifts setIsOpen={handleMintDialogToggle} setIsMinting={setIsMinting} />

        <div
          className={cn(
            "rounded-2xl flex-1 relative h-full w-full flex flex-col",
            "mx-4 mb-5"
          )}
        >
          <div className="w-full relative h-[100px]">
            <div className="absolute -right-1 p-[2px] bg-gradient-to-b from-[#FAC485] to-[#8B4B4F] rounded-[19px_0px_0px_19px]">
              <div className="bg-[url(/images/wood-texture.png)] bg-cover bg-center bg-no-repeat rounded-[17px_0px_0px_17px] h-[100px] w-[50px] flex flex-col justify-center items-center">
                <Button className="bg-[url(/images/yellow-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-11 m-1">
                  <div className="w-5 h-5">
                    <QuestionMarkIcon />
                  </div>
                </Button>
                <Button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="bg-[url(/images/purple-btn-bg.png)] bg-cover bg-center bg-no-repeat w-10 h-11 m-1"
                >
                  <div className="w-5 h-5">
                    <MsgIcon />
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex-1 px-2 flex flex-col gap-y-2 justify-end items-center relative">
            {game?.wallpaper?.homeFront && (
              <Image
                src={game?.wallpaper?.homeFront}
                alt={`${title} home`}
                className={cn(
                  "absolute bottom-10 left-1/2 -translate-x-1/2 z-1 w-[250px] h-[250px]",
                  title === "flappy" && "bottom-20"
                )}
                width={250}
                height={250}
              />
            )}
            <div className="rounded-[10px] border border-[#CED0DF] bg-[#B1B5CC] backdrop-blur-[12.5px] flex justify-center items-center h-10 w-full gap-x-1 z-10">
              <PlusIcon className="w-5 h-5" />
              <p className="z-10 uppercase text-white text-center font-bumper-sticker text-[18px] font-normal [text-shadow:0px_2px_0px_rgba(0,0,0,0.20)]">
                Add to home screen
              </p>
            </div>
            <Button
              onClick={() => router.push(`/game/${title}/tournaments`)}
              className="bg-[url(/images/board.png)] bg-[length:100%_100%] bg-center rounded-[200px] p-3 pt-4 pb-2 h-20 w-full shadow-md flex justify-center items-center z-10"
            >
              <div className="bg-[url(/images/cyan-btn-bg.png)] h-full w-full bg-[length:100%_100%] bg-stretch bg-center bg-no-repeat flex justify-center relative items-center">
                <p className="-mt-[10px] text-[#F4FFFF] text-center font-bumper-sticker text-[28px] font-normal [text-shadow:0px_2px_0px_rgba(0,0,0,0.20)] z-10">
                  Play {game?.contents?.homePlay || ""} now
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <MintDialog
        isMinting={isMinting}
        isOpen={isMintDialogOpen}
        onClose={handleMintDialogClose}
        // setIsMinting={setIsMinting}
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
      <Footer footerCategory="game" />
    </>
  );
}
