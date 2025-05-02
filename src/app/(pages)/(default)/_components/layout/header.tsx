'use client';

//import modules
import React, { useCallback, useState } from "react";
import Image from "next/image";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import { SnakeItalicIcon } from "@/app/_assets/svg/snake";
import headerBack from '@assets/images/header-back.png';
import { KIcon } from "@/app/_assets/svg/etc";
import kokoLog from '@/app/_assets/images/koko-logo.png'
import BankDialog from "../dialogs/bank-dialog";
import ProfileDialog from "../dialogs/profile-dialog";

export default function Header() {
  const [isBankDialogOpen, setIsBankDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const handleBankDialogToggle = useCallback(() => {
    setIsBankDialogOpen(prev => !prev);
  }, []);

  const handleProfileDialogToggle = useCallback(() => {
    setIsProfileDialogOpen(prev => !prev);
  }, []);

  return (
    <header
      className={cn(
        "flex justify-between items-center gap-4 h-[75px] px-2 z-10",
      )}
    >
      <div
        className={cn(
          "flex rounded-[10px] text-lg",
          "bg-yellow-2 text-golden-darker font-bold text",
          "[&>div]:drop-shadow-[0_0.2ch_rgba(0,0,0,0.2)] shadow-[0_0.2ch] shadow-black/20",
        )}
        onClick={handleBankDialogToggle}
      >
        <div className="flex items-center gap-2 p-2">
          <SnakeItalicIcon className="size-8" />
          <p>105.04</p>
        </div>
        <div className="w-px bg-golden-darker/20" />
        <div className="flex items-center gap-2 p-2">
          <KIcon className="size-8" />
          <p>93.44</p>
        </div>
      </div>
      <div
        className={cn(
          "flex flex-col",
          "relative w-14 h-[75px]"
        )}
        onClick={handleProfileDialogToggle}
      >
        <Image src={kokoLog} alt="koko-logo" width={54} height={72} className="absolute w-[54px] h-[72px] top-0 right-0 inset-0 object-cover object-center rounded-b-md" />
        <span className="px-1.5 text-[10px] font-bold text-yellow-2 absolute bottom-1 right-0 ">
          LVL 100</span>
      </div>
      <Image src={headerBack} alt="header-back" width={75} height={75} className="absolute w-full inset-0 -z-8 h-[75px]" />
      <BankDialog
        isOpen={isBankDialogOpen}
        onClose={handleBankDialogToggle}
      />
      <ProfileDialog
        isOpen={isProfileDialogOpen}
        onClose={handleProfileDialogToggle}
      />
    </header>
  );
}
