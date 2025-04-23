'use client';

import React, { useState, useCallback } from "react";
import Image from "next/image";
import _ from "lodash";
//import components
import { NavBar } from "../_components/xp-bar";
import CosmeticCard from "../_components/store/cosmetic-card";
import DiscountBadge from "../_components/store/discount-badge";

//import utils
import { cn } from "@/app/_lib/utils";

//import icons
import item from "@assets/svg/item-star.svg";
import itemClick from "@assets/svg/item-star-click.svg";
import starscore from "@assets/svg/star-score.svg";
import starscoreClick from "@assets/svg/star-score-click.svg";
import inventory from "@assets/svg/inventory.svg";
import inventoryClick from "@assets/svg/inventory-click.svg";

//import images
import forestBack from '@assets/images/forest-back.png';
import mainBack from '@assets/images/main-back.png';
import cosmetic from '@assets/images/cosmetics.png';

import MintDialog from "../_components/dialogs/mint-dialog";
import NavigationButton from "../_components/profile/navigateBtn";


export default function HomePage() {
  const [activeComponent, setActiveComponent] = useState("featured");

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
      <NavBar />
      <div className={cn("flex flex-col flex-1 h-full items-center gap-y-5")}>
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
        <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-32 bottom-25 w-[95%] mx-auto z-50 border-2 border-[#FAC485] rounded-3xl p-2 right-0 left-0">
          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col">
            <div className="flex justify-center gap-1.5">
              <NavigationButton
                icon={activeComponent === "featured" ? starscoreClick : starscore}
                label="Featured"
                isActive={activeComponent === "featured"}
                onClick={() => setActiveComponent("featured")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
              />
              <NavigationButton
                icon={activeComponent === "items" ? itemClick : item}
                label="Items"
                isActive={activeComponent === "items"}
                onClick={() => setActiveComponent("items")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
              />
              <NavigationButton
                icon={activeComponent === "kokitos" ? inventoryClick : inventory}
                label="Kokitos"
                isActive={activeComponent === "kokitos"}
                onClick={() => setActiveComponent("kokitos")}
                className="shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)]"
              />
            </div>
          </div>
          <div className="bg-[#F5D6B1] rounded-2xl p-3 py-2.5 shadow-md border-2 border-[#A96415] flex flex-col flex-1 overflow-y-auto gap-2">
            <div className="w-full flex gap-x-1">
              <NavigationButton
                label="COSMETICS"
                isActive={true}
                onClick={() => setActiveComponent("social")}
                className="rounded-full !text-sm !font-normal font-bumper-sticker"
              />
              <NavigationButton
                label="BUNDLES"
                isActive={false}
                onClick={() => setActiveComponent("social")}
                className="rounded-full !text-sm !font-normal font-bumper-sticker"

              />
              <NavigationButton
                label="COLLECTIBLES"
                isActive={false}
                onClick={() => setActiveComponent("social")}
                className="rounded-full !text-sm !font-normal font-bumper-sticker"
              />
            </div>
            <div className="w-full flex-1 overflow-y-auto rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] p-2 pt-3">
              <div className="w-full flex flex-col gap-2 bg-[#EED1B8] rounded-[22px] p-3 px-1 overflow-y-auto">
                <div className="flex justify-start items-center">
                  <span className="text-[#5F3F57] text-[22px] font-bumper-sticker font-normal px-1">COSMETOCS</span>
                  <DiscountBadge discount={-20} />
                </div>
                <div className="justify-between items-center flex-wrap grid grid-cols-3 gap-1">
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                    showInfo={true}
                    isHot={true}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                  <CosmeticCard
                    image={cosmetic}
                    title="SLUG"
                    subtitle="SKIN"
                    price={2.99}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <MintDialog
        isMinting={isMinting}
        isOpen={isMintDialogOpen}
        onClose={handleMintDialogClose}
        setIsMinting={setIsMinting}
      />
    </>
  );
}
