"use client";

//import modules
import { useState } from "react";
import Image from "next/image";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import profile from "@assets/images/profile.svg";
import edit from "@assets/svg/edit.svg";
import leftAllow from "@assets/svg/left-arrow.svg";
import topup from "@assets/svg/topup.svg";
import topupwhite from "@assets/svg/topup-white.svg";
import social from "@assets/svg/social.svg";
import starscore from "@assets/svg/star-score.svg";
import inventory from "@assets/svg/inventory.svg";
import { TelegramIcon } from "@/app/_assets/svg/telegram";
import { MailIcon } from "@/app/_assets/svg/mail";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import { XIcon } from "@/app/_assets/svg/x";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import { DollarIcon } from "@/app/_assets/svg/dollar";
import { CopyIcon } from "@/app/_assets/svg/copy";
import { ShareIcon } from "@/app/_assets/svg/share";

import coinbase from "@assets/svg/coinbase.svg";
import metamask from "@assets/svg/metamask.svg";

//import components
import Button from "@/app/_components/shared/button";

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState("social");

  const renderComponent = () => {
    switch (activeComponent) {
      case "social":
        return (
          <div className="bg-[#E3BEAA] rounded-[7px] px-2 py-3 flex flex-col gap-2">
            <span className="text-[#653F56] font-bumper-sticker text-xl font-normal pl-2">
              CONNECT
            </span>
            <div className="flex flex-col p-2 bg-[#EED1B8] rounded-[15px] gap-1.5">
              <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
                <TelegramIcon />
                <div className="flex gap-2 items-center">
                  <span className="text-[#745061] font-made-tommy text-[14px] font-medium tracking-[0.14px]">
                    @Player_616
                  </span>
                  <CloseSocialIcon />
                </div>
              </div>
              <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
                <XIcon />
                <Button className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm">
                  <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                    Connect
                  </span>
                </Button>
              </div>
              <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
                <MailIcon />
                <div className="flex gap-2 items-center">
                  <span className="text-[#745061] font-made-tommy text-[14px] font-medium tracking-[0.14px]">
                    Player_616@email.com
                  </span>
                  <CloseSocialIcon />
                </div>
              </div>
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                  <WalletIcon />
                  <div className="flex gap-1.5 bg-[#7A5B6940] rounded-[5px] p-0.5 px-1">
                    <Image src={coinbase} alt="wallet" />
                    <Image src={metamask} alt="wallet" />
                  </div>
                </div>
                <Button className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm">
                  <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                    Connect
                  </span>
                </Button>
              </div>
            </div>
            <span className="text-[#653F56] font-bumper-sticker text-xl font-normal pl-2">
              REFERRALS
            </span>
            <div className="flex justify-between gap-2">
              <Button className="w-full flex gap-1 items-center justify-center">
                <CopyIcon />
                <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                  COPY LINK
                </span>
              </Button>
              <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#24BE62] to-[#1AB257]">
                <ShareIcon />
                <span className="text-white font-bumper-sticker font-medium text-base tracking-[0.32px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                  SHARE
                </span>
              </Button>
            </div>
            <span className="text-[#745061] font-made-tommy text-[14px] font-semibold pl-1">
              Recieve 5% of all the volume fees your friends generate -forever!
            </span>
            <div className="flex flex-col p-2 bg-[#EED1B8] rounded-[15px] gap-1.5">
              <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
                <span className="text-[#653F56] font-made-tommy text-[18px] font-semibold tracking-[0.14px]">
                  Friends Invited
                </span>
                <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1">
                  <span className="text-[#FFE4D4] font-made-tommy text-[18px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
                    13
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-[#653F56] font-made-tommy text-[18px] leading-[28px] font-semibold tracking-[0.14px]">
                  Revenue Share
                </span>
                <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1 gap-1">
                  <DollarIcon />
                  <span className="text-[#FFE4D4] font-made-tommy text-[18px] leading-[28px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
                    235.50
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "scores":
        return <div>Scores Component</div>;
      case "inventory":
        return <div>Inventory Component</div>;
      default:
        return <div>Social Component</div>;
    }
  };

  return (
    <>
      <div className="absolute  top-0 left-0 bg-black/80 w-full h-full" />
      <div className="bg-[url(/images/board_2.png)] bg-cover bg-center fixed top-10 bottom-12 w-[100S%] z-50 border-2 border-[#FAC485] rounded-3xl mx-3 p-2">
        <div className=" flex gap-5 items-center bg-[#F5D6B1] rounded-2xl p-5 shadow-md border-2 border-[#A96415]">
          <Image alt="profile-image" src={profile} className=" w-20 h-20" />
          <div className=" w-full">
            <div className=" bg-[#CDAA98] flex justify-between rounded-md w-full p-0.5">
              <p className=" text-[#5F3F57] font-bumper-sticker text-xl pl-2 py-1">
                McKOKOMON118
              </p>
              <div className=" bg-[#917377] w-[34px] p-[3.7px] m-[0.7px] rounded">
                <Image alt="edit-icon" src={edit} />
              </div>
            </div>
            <div className=" bg-[#CDAA98] flex rounded-md w-full p-0.5 mt-1.5">
              <div className="flex gap-1.5 items-center py-1 px-2 border-r-2 border-[#DDB7A2]">
                <p className=" text-[#917377] text-md font-made-tommy font-semibold">
                  Level
                </p>
                <p className="text-[#D9B8A3] bg-[#5F3F57] rounded-md h-fit text-sm font-semibold font-made-tommy px-0.5">
                  26
                </p>
              </div>
              <div className="flex gap-1.5 items-center py-1 px-2 border-r-2 border-[#DDB7A2]">
                <p className=" text-[#917377] text-md font-made-tommy font-semibold">
                  Rank
                </p>
                <p className="text-[#D9B8A3] bg-[#5F3F57] rounded-md h-fit text-sm font-semibold font-made-tommy px-0.5">
                  SILVER
                </p>
              </div>
              <div className=" bg-[#917377] w-[34px] p-[3.7px] m-[0.7px] rounded">
                <Image alt="edit-icon" src={leftAllow} />
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-[#F5D6B1]  rounded-2xl p-5 mt-3 shadow-md border-2 border-[#A96415]">
          <div className=" flex justify-center gap-1 items-center ">
            <Image src={topup} alt="top-up" className=" h-4 w-5" />
            <p className=" text-[#917377] text-md font-made-tommy font-semibold">
              Top up your wallet for more fun!
            </p>
          </div>
          <Button
            onClick={() => setActiveComponent("social")}
            className={cn(
              "flex gap-2 items-center justify-center rounded-md font-bold w-full"
            )}
          >
            <Image src={topupwhite} alt="top-up" className=" h-4 w-5" />
            <span className="drop-shadow-md">Enter Now</span>
          </Button>
        </div>
        <div className=" bg-[#F5D6B1]  rounded-2xl p-3 mt-3 shadow-md border-2 border-[#A96415]">
          <div className=" flex justify-between gap-1.5">
            <Button
              onClick={() => setActiveComponent("social")}
              className={cn(
                " bg-[#653F56] drop-shadow-none flex gap-0.5 items-center justify-center rounded-lg font-bold w-full h-7"
              )}
            >
              <Image src={social} alt="social" className=" h-4 w-5" />
              <span className="drop-shadow-md text-[#E3BEAA] font-made-tommy">
                Social
              </span>
            </Button>
            <Button
              onClick={() => setActiveComponent("scores")}
              className={cn(
                " bg-[#E3BEAA] border-2 border-[#91737733] drop-shadow-none flex gap-0.5 items-center justify-center rounded-lg font-bold w-full h-7"
              )}
            >
              <Image src={starscore} alt="starscore" className=" h-4 w-5" />
              <span className="drop-shadow-md text-[#745061] font-made-tommy">
                Scores
              </span>
            </Button>
            <Button
              onClick={() => setActiveComponent("inventory")}
              className={cn(
                " bg-[#E3BEAA] border-2 border-[#91737733] drop-shadow-none flex gap-0.5 items-center justify-center rounded-lg font-bold w-full h-7"
              )}
            >
              <Image src={inventory} alt="inventory" width={20} height={24} />
              <span className="drop-shadow-md text-[#745061] font-made-tommy">
                Inventory
              </span>
            </Button>
          </div>
          <div className="bg-[#E3BEAA] mt-3 rounded-2xl">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
}
