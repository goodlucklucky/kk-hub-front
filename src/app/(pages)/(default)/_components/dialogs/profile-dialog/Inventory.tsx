"use client";

import React, { useMemo } from "react";
import InventorySection from "../../profile/inventory-section";

import lootbox1 from "@assets/images/loot1.png";
import lootbox2 from "@assets/images/loot2.png";
import lootbox3 from "@assets/images/loot3.png";
import lootbox4 from "@assets/images/loot4.png";
import classicNft from "@assets/images/CLASSIC.png";
import pet2 from "@assets/images/pet2.png";
import pet3 from "@assets/images/pet3.png";
import pet4 from "@assets/images/pet4.png";
import { useLootboxes } from "@/../services/bonus/lootboxes";
import { useGeneral } from "@/app/_providers/generalProvider";
import { useAirdrop } from "@/../services/nft";
import { useCollectables } from "../../../../../../../services/nft/collectables";

export default function Inventory() {
  const { sessionId } = useGeneral();
  const { data: lootboxData } = useLootboxes({ sessionId });
  const { data: airdropData } = useAirdrop({ sessionId });
  const { data: collectableData } = useCollectables(sessionId);

  const airdropCount = useMemo(
    () => airdropData?.data?.length,
    [airdropData?.data?.length]
  );

  const lootboxes = useMemo(
    () =>
      [
        {
          id: 1,
          title: "LOOTBOX",
          name: "Tier 1",
          image: lootbox1,
          badge: lootboxData?.tier_one || 0,
          nameColor: "#745162",
          titleColor: "#745162",
        },
        {
          id: 2,
          title: "LOOTBOX",
          name: "Tier 2",
          image: lootbox2,
          badge: lootboxData?.tier_two || 0,
          nameColor: "#126529",
          titleColor: "#745162",
        },
        {
          id: 3,
          title: "LOOTBOX",
          name: "Tier 3",
          image: lootbox3,
          badge: lootboxData?.tier_three || 0,
          nameColor: "#3C2BA0",
          titleColor: "#745162",
        },
        {
          id: 4,
          title: "LOOTBOX",
          name: "Tier 4",
          image: lootbox4,
          badge: lootboxData?.tier_four || 0,
          nameColor: "#3C2BA0",
          titleColor: "#745162",
        },
      ]?.filter((one) => (one?.badge || 0) > 0),
    [
      lootboxData?.tier_one,
      lootboxData?.tier_two,
      lootboxData?.tier_three,
      lootboxData?.tier_four,
    ]
  );

  const pets = useMemo(() => {
    return [
      {
        id: 1,
        title: "OG NFT",
        name: "NFT",
        image: classicNft,
        nameColor: "#853834",
        titleColor: "#853834",
        badge: airdropCount || 0,
      },
      {
        id: 2,
        title: "COLLECTIBLE",
        name: "NFT",
        image: pet2,
        nameColor: "#853834",
        titleColor: "#853834",
        badge: collectableData?.total || 0,
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
    ]?.filter((one) => (one?.badge || 0) > 0);
  }, [airdropCount, collectableData?.total]);

  return (
    <div className="w-full bg-[#E3BEAA] rounded-[7px] p-2 flex flex-col gap-2 overflow-y-scroll">
      <InventorySection
        title="Lootboxes"
        count={lootboxData?.total || 0}
        items={lootboxes}
        itemPadding="px-2 py-2"
        itemWidth={50}
        itemHeight={50}
      />
      <InventorySection
        title="Items & Koko Pets"
        count={pets?.reduce((acc, pet) => acc + (pet?.badge || 0), 0) || 0}
        items={pets}
        itemPadding="px-1 pt-1 pb-1"
        itemWidth={58}
        itemHeight={58}
      />
      {/* <InventorySection
        title="Items & Koko Pets"
        count={10}
        items={pets}
        itemPadding="px-1 pt-1 pb-1"
        itemWidth={58}
        itemHeight={58}
      /> */}
    </div>
  );
}
