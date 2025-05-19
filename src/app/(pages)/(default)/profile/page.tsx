"use client";

//import modules
import { useContext, useState } from "react";
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
import { useRouter } from "next/navigation";
import { GeneralContext } from "@/app/_providers/generalProvider";
import { Scores } from "../_components/profile/scores";

const lootboxes = [
  {
    id: 1,
    title: "LOOTBOX",
    name: "Tier 1",
    image: lootbox1,
    badge: 4,
    nameColor: "#745162",
    titleColor: "#745162",
  },
  {
    id: 2,
    title: "LOOTBOX",
    name: "Tier 2",
    image: lootbox2,
    badge: 4,
    nameColor: "#126529",
    titleColor: "#745162",
  },
  {
    id: 3,
    title: "LOOTBOX",
    name: "Tier 3",
    image: lootbox3,
    badge: 4,
    nameColor: "#3C2BA0",
    titleColor: "#745162",
  },
  {
    id: 4,
    title: "LOOTBOX",
    name: "Tier 4",
    image: lootbox4,
    badge: 1,
    nameColor: "#3C2BA0",
    titleColor: "#745162",
  },
];

const pets = [
  {
    id: 1,
    title: "OG NFT",
    name: "NFT",
    image: pet1,
    nameColor: "#853834",
    titleColor: "#853834",
  },
  {
    id: 2,
    title: "COLLECTIBLE",
    name: "NFT",
    image: pet2,
    nameColor: "#853834",
    titleColor: "#853834",
  },
  {
    id: 3,
    title: "SLUG",
    name: "NFT",
    image: pet3,
    nameColor: "#71335E",
    titleColor: "#71335E",
  },
  {
    id: 4,
    title: "FERRET",
    name: "NFT",
    image: pet4,
    nameColor: "#608532",
    titleColor: "#608532",
  },
];

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState("social");
  const router = useRouter();
  const { user } = useContext(GeneralContext);
  // const { data } = useGetATH(sessionId);

  // console.log("Data***********", data);

  const renderComponent = () => {
    switch (activeComponent) {
      case "social":
        return <Social />;
      case "scores":
        return <Scores />;
      case "inventory":
        return (
          <div className="w-full bg-[#E3BEAA] rounded-[7px] p-2 flex flex-col gap-2 overflow-y-scroll">
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
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px]"
        onClick={() => router?.back()}
      />
      <div
        className="bg-[url(/images/board_2.png)] flex flex-col gap-3 bg-cover bg-center fixed top-10 w-[95%] max-h-[720px] z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2 right-0 left-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center gap-x-3 bg-[#F5D6B1] rounded-2xl p-4 shadow-md border-2 border-[#A96415]">
          <Image alt="profile-image" src={profile} className="size-[70px]" />
          <div className="flex-1 overflow-auto">
            <div className=" bg-[#CDAA98] flex justify-between items-center rounded-md w-full p-0.5 border-[2px] border-[#CDAA98]">
              <p className=" text-[#5F3F57] font-bumper-sticker text-lg/[28px] pl-2 py-0.5 line-clamp-1 break-words">
                {user?.username || "KOKOMON118"}
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
            onClick={() => router.push("/banking")}
            className={cn(
              "flex gap-1 items-center justify-center rounded-md font-bold w-full py-[2px]"
            )}
          >
            <Image src={topupwhite} alt="top-up" className=" h-4 w-5" />
            <span className="drop-shadow-md text-[16px]">VIEW WALLET</span>
          </Button>
        </div>
        <div className="bg-[#F5D6B1] rounded-2xl p-3 shadow-md border-2 border-[#A96415] flex-1 flex flex-col overflow-y-auto">
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
              icon={
                activeComponent === "inventory" ? inventoryClick : inventory
              }
              label="Inventory"
              isActive={activeComponent === "inventory"}
              onClick={() => setActiveComponent("inventory")}
            />
          </div>
          <div className="mt-3 rounded-2xl flex flex-1 overflow-y-auto">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  );
}
