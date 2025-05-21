import Image from "next/image";

import ChallengeTabDailyIconSelected from "@/app/_assets/images/Icon_ChallengeTab_Daily_Selected.png";
import ChallengeTabDailyIconUnselected from "@/app/_assets/images/Icon_ChallengeTab_Daily_Unselected.png";
import ChallengeTabWeeklyIconUnselected from "@/app/_assets/images/Icon_ChallengeTab_Weekly_Unselected.png";
import ChallengeTabWeeklyIconSelected from "@/app/_assets/images/Icon_ChallengeTab_Weekly_Selected.png";
import LightIcon from "@/app/_assets/images/light-icon.png";
import { BoxHeader, BoxLink } from "./board-structure";

const ChallengeTab = ({ tab }: { tab: string }) => {
  return (
    <BoxHeader className="relative grid-cols-3 items-center h-[40px] gap-0 z-10 rounded-full border border-[#F7D8B7] bg-gradient-to-b from-[rgba(95,63,87,0.20)] to-[rgba(95,63,87,0)] bg-[#DDC2A7] shadow-[inset_0px_2px_0px_0px_rgba(95,63,87,0.20)]">
      <BoxLink
        href=""
        isActive={tab == "prev_coming_soon"}
        className="flex items-center text-xs justify-center gap-1 h-7 rounded-full"
        activeButtonClassName="border border-[#D1AB8D] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]"
      >
        {tab === "prev_coming_soon" ? (
          <>
            <Image alt="light-icon" src={LightIcon} width={10} />
            Coming Soon!
          </>
        ) : (
          <>
            <Image alt="light-icon" src={LightIcon} width={10} />
            <div className="bg-[#491F36B2] text-[7px] text-white font-normal leading-tight rounded-full px-3 py-1">
              Coming Soon!
            </div>
          </>
        )}
      </BoxLink>
      <BoxLink
        href="?tab=daily"
        isActive={tab == "daily"}
        className="flex items-center text-md justify-center gap-1 h-7 rounded-full"
        activeButtonClassName="border border-[#D1AB8D] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]"
      >
        {tab === "daily" ? (
          <>
            <Image
              alt="daily-selected"
              src={ChallengeTabDailyIconSelected}
              width={24}
            />
            Daily
          </>
        ) : (
          <>
            <Image
              alt="daily-unselected"
              src={ChallengeTabDailyIconUnselected}
              width={24}
            />
            <div className="bg-[#491F36B2] text-[7px] text-white font-normal leading-tight rounded-full px-3 py-1">
              Daily
            </div>
          </>
        )}
      </BoxLink>
      <BoxLink
        href=""
        isActive={tab == "coming_soon"}
        className="flex items-center text-[10px] justify-center gap-1 h-7 rounded-full"
        activeButtonClassName="border border-[#D1AB8D] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]"
      >
        {tab === "coming_soon" ? (
          <>
            <Image
              alt="weekly-selected"
              src={ChallengeTabWeeklyIconSelected}
              width={20}
            />
            Coming Soon!
          </>
        ) : (
          <>
            <Image
              alt="weekly-unselected"
              src={ChallengeTabWeeklyIconUnselected}
              width={20}
            />
            <div className="bg-[#491F36B2] text-[7px] text-white font-normal leading-tight rounded-full px-3 py-1">
              Coming Soon!
            </div>
          </>
        )}
      </BoxLink>
    </BoxHeader>
  );
};

export default ChallengeTab;
