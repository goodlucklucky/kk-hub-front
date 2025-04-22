"use client";

//import modules
import { useState } from "react";
import Image from "next/image";

//import utils
import { cn } from "@/app/_lib/utils";

//import assets
import profile from "@assets/images/profile.svg";
import edit from "@assets/svg/edit.svg";
import rightArrow from "@assets/svg/right-arrow.svg";
import topup from "@assets/svg/topup.svg";
import topupwhite from "@assets/svg/topup-white.svg";
import social from "@assets/svg/social.svg";
import socialClick from "@assets/svg/social-click.svg";
import starscore from "@assets/svg/star-score.svg";
import starscoreClick from "@assets/svg/star-score-click.svg";
import inventory from "@assets/svg/inventory.svg";
import inventoryClick from "@assets/svg/inventory-click.svg";
import { DollarIcon, DollarScoreIcon } from "@/app/_assets/svg/dollar";
import { TopArrow } from "@/app/_assets/svg/top-arrow";
//import components
import Social from "../_components/profile/social";
import NavigationButton from "../_components/profile/navigateBtn";
import Button from "@/app/_components/shared/button";
import TabButton from "@/app/_components/profile/tab-button";
import { CustomRightArrow, RightArrow } from "@/app/_assets/svg/right-arrow";

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState("social");

  const renderComponent = () => {
    switch (activeComponent) {
      case "social":
        return (
          <Social />
        );
      case "scores":
        return (
          <div className="w-[328px] h-full flex flex-col gap-2">
            <div className="w-full justify-between bg-[#EED1B8] rounded-[10px] flex items-center gap-2 px-3 py-2.5">
              <div className="flex gap-2 items-center">
                <DollarScoreIcon />
                <span className="text-[#5F3F57] font-small font-bumper-sticker text-[18px]/[28px]">
                  All Time Earnings
                </span>
              </div>
              <div className="bg-[#917377] rounded-[3px] shadow-[inset_0px_2px_0px_0px_rgba(0,0,0,0.20)] h-[28px] flex items-center justify-end px-1 gap-1">
                <DollarIcon />
                <span className="text-[#FFE4D4] font-made-tommy text-[18px] leading-[28px] font-bold drop-shadow-[0px_1px_0px_rgba(0,0,0,0.20)]">
                  235.50
                </span>
              </div>
            </div>
            <div className="w-full justify-between bg-[#EED1B8] rounded-[10px] flex flex-col items-center gap-1 px-3 py-2.5">
              <div className="flex gap-2 items-center w-full">
                <TopArrow />
                <span className="text-[#5F3F57] font-small font-bumper-sticker text-[18px]/[28px] ">
                  Your Current Scores
                </span>
              </div>
              <div className="rounded-[14px] border border-[#F7D8B7] bg-[#DDC2A7] bg-gradient-to-b from-[rgba(95,63,87,0.20)] to-transparent shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)] p-1.5 flex gap-1.5">
                <TabButton label="Daily" isActive={true} />
                <TabButton label="Weekly" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="p-2 px-4 w-[160px] rounded-full bg-[#91737754] flex text-[14px] text-[#653F56] font-made-tommy font-semibold items-center justify-between">
                Previous Results
                <CustomRightArrow color='#653F5654' />
              </div>
              <div className="p-2 px-4 w-[160px] rounded-full bg-[#A2BAA6] flex text-[14px] text-[#126529] font-made-tommy font-semibold items-center justify-between">
                Previous Results
                <CustomRightArrow color='#12652980' />
              </div>
            </div>
            <div className="w-full flex-1 overflow-y-auto rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] p-2 max-h-[250px]">
              <div className="w-full flex flex-col gap-2 bg-[#EED1B8] rounded-[22px] p-3 overflow-y-auto">

                <div className="w-full flex flex-col justify-between items-center">
                  <div className="rounded-t-[6px] bg-[#ECB56E] w-full flex items-center justify-between text-[#745061] text-[14px] font-made-tommy font-semibold px-3 py-2">Koko Raffle <CustomRightArrow color="#917377" /></div>
                  <div className="w-full rounded-b-[6px] bg-[#E3BEAA] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[#745061] text-[12px] font-made-tommy font-semibold px-3 py-1">Numbers drawn. Check your ticket!</div>
                </div>

                <div className="w-full flex flex-col justify-between items-center">
                  <div className="rounded-t-[6px] bg-[#E99F8C] w-full flex items-center justify-between text-[#745061] text-[14px] font-made-tommy font-semibold px-3 py-2">Snake: $0.25 Tournament <CustomRightArrow color="#917377" /></div>
                  <div className="w-full rounded-b-[6px] bg-[#D7BDA4] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[#745061] text-[12px] font-made-tommy font-semibold px-3 py-1">
                    Current Estimated Earnings: $100
                  </div>
                </div>

                <div className="w-full flex flex-col justify-between items-center">
                  <div className="rounded-t-[6px] bg-[#D49FC4] font-semibold w-full flex items-center justify-between text-[#745061] text-[14px] font-made-tommy px-3 py-2">
                    Flappy Dunk: $10 1v1
                    <CustomRightArrow color="#917377" />
                  </div>
                  <div className="w-full rounded-b-[6px] bg-[#E99F8C] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[#853834] text-[12px] font-made-tommy font-semibold px-3 py-1">
                    Improve your Score to qualify for a prize!
                  </div>
                </div>

                <div className="w-full flex flex-col justify-between items-center">
                  <div className="rounded-t-[6px] bg-[#B5C2C9] font-semibold w-full flex items-center justify-between text-[#745061] text-[14px] font-made-tommy px-3 py-2">
                    50 KOKO Entry Tournament
                    <CustomRightArrow color="#917377" />
                  </div>
                  <div className="w-full rounded-b-[6px] bg-[#D7BDA4] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[#745061] text-[12px] font-made-tommy font-semibold px-3 py-1">
                    Improve your Score to qualify for a prize!
                  </div>
                </div>

                <div className="w-full flex flex-col justify-between items-center">
                  <div className="rounded-t-[6px] bg-[#B5D48E] font-semibold w-full flex items-center justify-between text-[#745061] text-[14px] font-made-tommy px-3 py-2">
                    $10 Challenge
                    <CustomRightArrow color="#917377" />
                  </div>
                  <div className="w-full rounded-b-[6px] bg-[#D7BDA4] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.16)] text-[#745061] text-[12px] font-made-tommy font-semibold px-3 py-1">
                    Improve your Score to qualify for a prize!
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      case "inventory":
        return <div>Inventory Component</div>;
      default:
        return <Social />;
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px]" />
      <div className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-10 bottom-12 w-[100S%] z-50 border-2 border-[#FAC485] rounded-3xl mx-3 p-2">
        <div className="flex justify-between items-center gap-x-3 bg-[#F5D6B1] rounded-2xl p-4 shadow-md border-2 border-[#A96415]">
          <Image alt="profile-image" src={profile} className=" w-[70px] h-[70px]" />
          <div className="flex-1">
            <div className=" bg-[#CDAA98] flex justify-between items-center rounded-md w-full p-0.5 border-[2px] border-[#CDAA98]">
              <p className=" text-[#5F3F57] font-bumper-sticker text-[18px]/[28px] pl-2 py-0.5">
                McKOKOMON118
              </p>
              <div className=" bg-[#917377] w-[34px] h-full p-[3.7px] rounded">
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
              <div className="flex gap-1.5 items-center py-1 px-2">
                <p className=" text-[#917377] text-md font-made-tommy font-semibold">
                  Rank
                </p>
                <p className="text-[#D9B8A3] bg-[#5F3F57] rounded-md h-fit text-sm font-semibold font-made-tommy px-0.5">
                  SILVER
                </p>
              </div>
              <div className=" bg-[#917377] w-[34px] p-[3.7px] m-[0.7px] rounded flex items-center justify-center">
                <Image alt="edit-icon" src={rightArrow} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-[9px] py-3 bg-[#F5D6B1] rounded-2xl shadow-md border-2 border-[#A96415]">
          <div className="flex justify-center gap-1 items-center ">
            <Image src={topup} alt="top-up" className=" h-4 w-5" />
            <p className=" text-[#917377] text-md font-made-tommy font-semibold">
              Top up your wallet for more fun!
            </p>
          </div>
          <Button
            onClick={() => setActiveComponent("social")}
            className={cn(
              "flex gap-1 items-center justify-center rounded-md font-bold w-full py-[2px]"
            )}
          >
            <Image src={topupwhite} alt="top-up" className=" h-4 w-5" />
            <span className="drop-shadow-md text-[16px]">VIEW WALLET</span>
          </Button>
        </div>
        <div className="bg-[#F5D6B1] rounded-2xl p-3 shadow-md border-2 border-[#A96415] flex-1 flex flex-col">
          <div className="flex justify-center gap-1.5">
            <NavigationButton
              icon={activeComponent === "social" ? socialClick : social}
              label="Social"
              isActive={activeComponent === "social"}
              onClick={() => setActiveComponent("social")}
            />
            <NavigationButton
              icon={activeComponent === "scores" ? starscoreClick : starscore}
              label="Scores"
              isActive={activeComponent === "scores"}
              onClick={() => setActiveComponent("scores")}
            />
            <NavigationButton
              icon={activeComponent === "inventory" ? inventoryClick : inventory}
              label="Inventory"
              isActive={activeComponent === "inventory"}
              onClick={() => setActiveComponent("inventory")}
            />
          </div>
          <div className="mt-3 rounded-2xl flex-1">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
}
