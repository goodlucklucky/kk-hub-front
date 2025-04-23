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
//import components
import Social from "../_components/profile/social";
import NavigationButton from "../_components/profile/navigateBtn";
import Button from "@/app/_components/shared/button";
import lootbox1 from "@assets/images/loot1.png";
import lootbox2 from "@assets/images/loot2.png";
import lootbox3 from "@assets/images/loot3.png";
import lootbox4 from "@assets/images/loot4.png";
import pet1 from "@assets/images/pet1.png";
import pet2 from "@assets/images/pet2.png";
import pet3 from "@assets/images/pet3.png";
import pet4 from "@assets/images/pet4.png";
import InventorySection from "../_components/profile/inventory-section";
import EarningsSection from "../_components/profile/earnings-section";
import CurrentScores from "../_components/profile/current-scores";
import PreviousResults from "../_components/profile/previous-results";
import TournamentItem from "../_components/profile/tournament-item";

const lootboxes = [
  {
    id: 1,
    title: "LOOTBOX",
    name: 'Tier 1',
    image: lootbox1,
    badge: 4,
    nameColor: '#745162',
    titleColor: '#745162'
  },
  {
    id: 2,
    title: "LOOTBOX",
    name: 'Tier 2',
    image: lootbox2,
    badge: 4,
    nameColor: '#126529',
    titleColor: '#745162'
  },
  {
    id: 3,
    title: "LOOTBOX",
    name: 'Tier 3',
    image: lootbox3,
    badge: 4,
    nameColor: '#3C2BA0',
    titleColor: '#745162'
  },
  {
    id: 4,
    title: "LOOTBOX",
    name: 'Tier 4',
    image: lootbox4,
    badge: 1,
    nameColor: '#3C2BA0',
    titleColor: '#745162'
  },
]

const pets = [
  {
    id: 1,
    title: "OG NFT",
    name: 'NFT',
    image: pet1,
    nameColor: '#853834',
    titleColor: '#853834'
  },
  {
    id: 2,
    title: "COLLECTIBLE",
    name: 'NFT',
    image: pet2,
    nameColor: '#853834',
    titleColor: '#853834'
  },
  {
    id: 3,
    title: "SLUG",
    name: 'NFT',
    image: pet3,
    nameColor: '#71335E',
    titleColor: '#71335E'
  },
  {
    id: 4,
    title: "FERRET",
    name: 'NFT',
    image: pet4,
    nameColor: '#608532',
    titleColor: '#608532'
  },
]

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
          <div className="h-full flex flex-col gap-2">
            <EarningsSection amount="235.50" />
            <CurrentScores
              activeTab="daily" 
              onTabChange={(tab) => console.log(tab)} 
            />
            <PreviousResults 
              leftColor="#653F5654" 
              rightColor="#12652980" 
            />
            <div className="w-full flex-1 overflow-y-auto rounded-[7px] border-2 border-[#CDAA98] bg-[#E3BEAA] shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.20)] p-2 max-h-[240px]">
              <div className="w-full flex flex-col gap-2 bg-[#EED1B8] rounded-[22px] p-3 overflow-y-auto">
                <TournamentItem
                  title="Koko Raffle"
                  message="Numbers drawn. Check your ticket!"
                  bgColor="bg-[#ECB56E]"
                  messageBgColor="bg-[#E3BEAA]"
                />
                <TournamentItem
                  title="Snake: $0.25 Tournament"
                  message="Current Estimated Earnings: $100"
                  bgColor="bg-[#E99F8C]"
                  messageBgColor="bg-[#D7BDA4]"
                />
                <TournamentItem
                  title="Flappy Dunk: $10 1v1"
                  message="Improve your Score to qualify for a prize!"
                  bgColor="bg-[#D49FC4]"
                  messageBgColor="bg-[#E99F8C]"
                  messageTextColor="#853834"
                />
                <TournamentItem
                  title="50 KOKO Entry Tournament"
                  message="Improve your Score to qualify for a prize!"
                  bgColor="bg-[#B5C2C9]"
                  messageBgColor="bg-[#D7BDA4]"
                />
                <TournamentItem
                  title="$10 Challenge"
                  message="Improve your Score to qualify for a prize!"
                  bgColor="bg-[#B5D48E]"
                  messageBgColor="bg-[#D7BDA4]"
                />
              </div>
            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="h-[453px] bg-[#E3BEAA] rounded-[7px] p-2 flex flex-col gap-2 overflow-y-scroll">
            <InventorySection
              title="Lootboxes"
              count={13}
              items={lootboxes}
              itemPadding="px-2 py-2"
              itemWidth={50}
              itemHeight={50}
            />
            <InventorySection
              title="Items & Koko Pets"
              count={10}
              items={pets}
              itemPadding="px-1 pt-1 pb-1"
              itemWidth={58}
              itemHeight={58}
            />
             <InventorySection
              title="Items & Koko Pets"
              count={10}
              items={pets}
              itemPadding="px-1 pt-1 pb-1"
              itemWidth={58}
              itemHeight={58}
            />
          </div>
        );
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
              <p className=" text-[#5F3F57] font-bumper-sticker text-lg/[28px] pl-2 py-0.5">
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
