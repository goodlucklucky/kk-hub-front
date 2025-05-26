"use client";

import Image from "next/image";

import Button from "@/app/_components/shared/button";

import { TelegramIcon } from "@/app/_assets/svg/telegram";
import { MailIcon } from "@/app/_assets/svg/mail";
import { WalletIcon } from "@/app/_assets/svg/wallet";
import { XIcon } from "@/app/_assets/svg/x";
import { CloseSocialIcon } from "@/app/_assets/svg/close-social";
import { DollarIcon } from "@/app/_assets/svg/dollar";

import coinbase from "@assets/svg/coinbase.svg";
import metamask from "@assets/svg/metamask.svg";
import { useContext } from "react";
import { GeneralContext } from "@/app/_providers/generalProvider";
import ShareButtons from "./share-buttons";

export default function Social() {
  const { user } = useContext(GeneralContext);

  return (
    <div className="bg-[#E3BEAA] rounded-[7px] p-2 flex flex-col gap-2 h-full">
      <p className="text-[#653F56] font-bumper-sticker text-xl font-normal pl-2 -mb-2">
        Connect
      </p>
      <div className="flex flex-col p-2 bg-[#EED1B8] rounded-[15px] gap-1.5">
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <TelegramIcon />
          {(user as any)?.telegram ? (
            <div className="flex gap-2 items-center">
              <span className="text-[#745061] font-made-tommy text-[14px] font-medium tracking-[0.14px]">
                @Player_616
              </span>
              <CloseSocialIcon />
            </div>
          ) : (
            <Button className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm">
              <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Connect
              </span>
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <XIcon />
          {user?.twitterUsername ? (
            <div className="flex gap-2 items-center">
              <span className="text-[#745061] font-made-tommy text-[14px] font-medium tracking-[0.14px]">
                @Player_616
              </span>
              <CloseSocialIcon />
            </div>
          ) : (
            <Button className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm">
              <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Connect
              </span>
            </Button>
          )}
        </div>
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <MailIcon />
          {user?.email ? (
            <div className="flex gap-2 items-center">
              <span className="text-[#745061] font-made-tommy text-[14px] font-medium tracking-[0.14px]">
                Player_616@email.com
              </span>
              <CloseSocialIcon />
            </div>
          ) : (
            <Button className="px-2 py-[3px] bg-gradient-to-b from-[#24BE62] to-[#1AB257] rounded-sm">
              <span className="text-[#EFF6FF] font-made-tommy text-xs font-extrabold tracking-[0.12px] drop-shadow-[0px_1px_0px_rgba(62,36,105,0.20)]">
                Connect
              </span>
            </Button>
          )}
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
      <p className="text-[#653F56] font-bumper-sticker text-xl font-normal pl-2 -mb-2">
        REFERRALS
      </p>
      <ShareButtons />
      <span className="text-[#745061] font-made-tommy text-[14px] leading-[16px] font-semibold pl-1 mt-1">
        Receive 5% of all the volume fees your friends generate - forever!
      </span>
      <div className="flex flex-col p-2 bg-[#EED1B8] rounded-[15px] gap-1.5 mt-1">
        <div className="flex gap-2 items-center justify-between pb-1 border-b-1 border-[#7450612e]">
          <span className="text-[#653F56] font-made-tommy text-[18px] font-semibold tracking-[0.14px]">
            Friends Invited
          </span>
          <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1">
            <span className="text-[#FFE4D4] font-made-tommy text-[18px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
              {user?.referrals?.length || 0}
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
}
