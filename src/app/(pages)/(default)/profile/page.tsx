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

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState("social");

  const renderComponent = () => {
    switch (activeComponent) {
      case "social":
        return (
          <Social />
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
        <div className="bg-[#F5D6B1] rounded-2xl p-3 shadow-md border-2 border-[#A96415] flex-1">
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
          <div className="bg-[#E3BEAA] mt-3 rounded-2xl">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
}
