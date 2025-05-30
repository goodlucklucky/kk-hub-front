// import RewardSpinSrc from "@/_assets/spin-reward.png";
import spinner from "@assets/images/spinner.png";
import lootbox from "@assets/images/lootbox1.png";

import RewardMegaSrc from "@/app/_assets/images/mega-reward.png";
import RewardChestSrc from "@assets/images/chest-lock.png";
// import { CheckIcon } from "@/app/_assets/svg/check";
import usdtIcon from "@assets/images/usdt.png";
import { StaticImageData } from "next/image";
import {
  TDailyRewardType,
  TRewards,
} from "../../../../../services/spins/daily";

export const getRewardData = (type: TDailyRewardType) => {
  switch (type) {
    case TDailyRewardType.CHEST:
      return { image: RewardChestSrc, text: "Koko Chest" };
    case TDailyRewardType.SPINS:
      return { image: spinner, text: "Spins" };
    case TDailyRewardType.LOOT_BOX:
      return { image: lootbox, text: "Lootbox" };
    case TDailyRewardType.MEGA:
      return { image: RewardMegaSrc, text: "" };
  }
};

export const getRewardLabel = (type: string, value: number) => {
  const valueText = value > 1 ? value : "";

  if (type == TDailyRewardType.SPINS) return `🎁 ${valueText} Spins`;
  if (type == TDailyRewardType.LOOT_BOX) return `🎁 ${valueText} Loot box`;
  else if (type?.toLowerCase()?.includes("skin"))
    return `🎁 ${valueText} ${type}`;
  else if (type == "whitelist")
    return `🎁 ${valueText ? `${valueText}x` : ""} Mystery WL`;
  else if (type == "USDT") return `🎁 ${value} USDT`;
  else if (type == TDailyRewardType.CHEST) return "🎁 Koko Chest";
};

export const getRewardContent = (
  type: string,
  value: number,
  rewards: TRewards[]
): { img: string | StaticImageData; label?: string } => {
  const label = getRewardLabel(type, value);

  if (type === TDailyRewardType.SPINS) return { img: spinner, label };
  if (type === TDailyRewardType.LOOT_BOX) return { img: lootbox, label };
  if (type === TDailyRewardType.MEGA) {
    const labels = rewards
      ?.map(({ type, value: amount }) => getRewardLabel(type, amount))
      .join(" + ");
    return { img: RewardMegaSrc, label: labels };
  }
  if (type === "skin") return { img: "/images/snakes/Slug/skin.png", label };

  if (type === "whitelist") {
    return { img: "/images/store/kokomon.png", label };
  }
  if (type === "USDT") return { img: usdtIcon, label };

  const typeData = rewards?.filter(
    (one) => !one?.type?.toLowerCase()?.includes("spin")
  )?.[0];
  if (rewards.length === 0) {
    return {
      img: "/images/store/kokomon.png",
      label,
    };
  }
  return getRewardContent(typeData?.type, typeData?.value, []);
};
