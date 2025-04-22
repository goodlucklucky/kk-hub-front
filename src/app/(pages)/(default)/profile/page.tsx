"use client";

import Image from "next/image";
import profile from "@assets/images/profile.svg";
import edit from "@assets/svg/edit.svg";
import leftAllow from "@assets/svg/left-arrow.svg";
import topup from "@assets/svg/topup.svg";
import topupwhite from "@assets/svg/topup-white.svg";
import social from "@assets/svg/social.svg";
import starscore from "@assets/svg/star-score.svg";
import inventory from "@assets/svg/inventory.svg";
import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";
import { useState } from "react";
export default function Profile() {
  const [activeComponent, setActiveComponent] = useState("social");

  const renderComponent = () => {
    switch (activeComponent) {
      case "social":
        return <div>Social Component</div>;
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
      <div className="bg-[url(/images/board_2.png)] bg-cover bg-center fixed top-20 bottom-12 w-[94%] z-50 border-2 border-[#FAC485] rounded-3xl mx-3 p-2">
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
