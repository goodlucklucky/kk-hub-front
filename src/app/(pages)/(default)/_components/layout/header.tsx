"use client";

//import modules
import React from "react";
import Image from "next/image";
import { useApp } from "@/app/_contexts/appContext";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import { SnakeItalicIcon } from "@/app/_assets/svg/snake";
import headerBack from "@assets/images/header-back.png";
import kokoLogBg from "@/app/_assets/svg/koko-logo-bg.svg";
import profileAvatar from "@/app/_assets/images/profile-avatar.png";
import monkeyIcon from "@/app/_assets/images/monkey-icon.png";
import ogIcon from "@/app/_assets/images/og-icon.png";
import starIcon from "@/app/_assets/images/star-icon.png";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { useThirdweb } from "../../_context/thirdwebContext";
import { formatNumber } from "@/app/_utils/number";
import UserXp from "../xp";
import ProfileDialog from "../dialogs/profile-dialog";
import BankDialog from "../dialogs/bank-dialog";
import { useGeneral } from "@/app/_providers/generalProvider";

function KokoLogo({
  isMonkey = false,
  isOG = false,
  isStar = false,
  level = 0,
}: {
  isMonkey: boolean;
  isOG: boolean;
  isStar: boolean;
  level: number;
}) {
  return (
    <>
      {isOG && (
        <Image
          src={ogIcon}
          alt="og-icon"
          width={25}
          height={15}
          className="absolute w-[25px] h-[15px] top-[8px] left-[-14.5px]"
        />
      )}
      <Image
        src={kokoLogBg}
        alt="koko-logo-bg"
        width={45}
        height={72}
        className="absolute w-[45px] h-[72px] top-0 left-1/2 -translate-x-1/2 right-0 inset-0 object-cover object-center rounded-b-md"
      />
      <Image
        src={profileAvatar}
        alt="profile-avatar"
        width={55}
        height={55}
        className="absolute w-[55px] h-[55px] top-1 left-1/2 -translate-x-1/2"
      />
      {isMonkey && (
        <Image
          src={monkeyIcon}
          alt="monkey-icon"
          width={20}
          height={20}
          className="absolute w-[20px] h-[20px] top-[32px] left-[6px]"
        />
      )}
      {isStar && (
        <Image
          src={starIcon}
          alt="og-icon"
          width={20}
          height={20}
          className="absolute w-[20px] h-[20px] top-[4px] right-0"
        />
      )}
      <span className="text-[10px] font-bold text-yellow-2 absolute -bottom-7 right-0 w-full text-center">
        LVL {level}
      </span>
    </>
  );
}

export default function Header({ hideBack = false }: { hideBack?: boolean }) {
  const {
    balance: { total },
  } = useThirdweb();
  const { isBankingOpen, setIsBankingOpen, isProfileOpen, setIsProfileOpen } =
    useApp();
  const { userXp } = useGeneral();
  return (
    <>
      <header className={cn("[&>*]:z-3 relative z-2")}>
        {!hideBack && (
          <Image
            src={headerBack}
            alt="header-back"
            width={75}
            height={50}
            className="absolute size-full inset-0 !-z-[1]"
          />
        )}
        <div className="flex justify-between items-center gap-4 h-[45px] z-10">
          <div
            className={cn(
              "flex rounded-[0px_5px_5px_0px] text-lg",
              "bg-yellow-2 text-golden-darker font-bold",
              "[&>div:not(:has(svg))]:shadow-[0_0.2ch] [&>div:not(:has(svg))]:shadow-black/20"
            )}
            onClick={() => setIsBankingOpen(!isBankingOpen)}
          >
            <div className="flex items-center gap-2 px-2 py-1">
              <SnakeItalicIcon className="size-[22px] drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)]" />
              <p className="drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)]">
                {formatNumber(total || 0, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </p>
              <RightArrow
                className="size-[13px]"
                color="#CCA11A"
                shadow={false}
              />
            </div>
          </div>
          <div
            className={cn(
              "flex flex-col",
              "relative w-[64px] h-[45px] overflow-visible"
            )}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <KokoLogo
              isMonkey={true}
              isOG={true}
              isStar={true}
              level={Number(userXp?.level.name || "0")}
            />
          </div>
        </div>
      </header>
      <UserXp />
      <ProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(!isProfileOpen)}
      />
      <BankDialog
        isOpen={isBankingOpen}
        onClose={() => setIsBankingOpen(!isBankingOpen)}
      />
    </>
  );
}
