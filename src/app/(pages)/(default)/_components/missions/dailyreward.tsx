import { ClockIcon, PlayIcon, TickIcon } from "@/app/_assets/svg/etc";
import { ProgressBar } from "./progress";
import Image from "next/image";
import pet1 from "@assets/images/pet1.png";
import { StarIcon } from "@/app/_assets/svg/etc";
import Button from "@/app/_components/shared/button";
import { GiftIcon } from "@/app/_assets/svg/etc";

const DailyRewardSection = ({ currentXp }: { currentXp: number }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bumper-sticker text-[18px] font-light text-[#653F56] tracking-[0.32px]">
          {" "}
          DESCRIPTION{" "}
        </p>

        {currentXp < 3 && (
          <div className="rounded-lg bg-[#E3BEAA] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.20)] px-2 ">
            <div className="flex gap-2 items-center">
              <ClockIcon className="size-5" />
              <p className="font-bumper-sticker text-[18px] font-light text-[#653F56]">
                {" "}
                23:39:01{" "}
              </p>
            </div>
          </div>
        )}
        {currentXp == 3 && (
          <div className="rounded-lg bg-[#568262] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.20)] px-2 ">
            <div className="flex gap-2 items-center">
              <TickIcon className="size-6" fill="#FDE8C6" />
              <p className="font-bumper-sticker text-[18px] font-light text-[#FDE8C6]">
                {" "}
                COMPLETED{" "}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-[#E3BEAA] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.20)] p-3 mb-3">
        <p className="font-made-tommy text-[15px] font-bold text-[#653F56] opacity-80 whitespace-pre-wrap break-all">
          Mission description or objectives goes here{" "}
        </p>
      </div>

      <div className="grid grid-cols-[1.5fr_2fr] gap-2">
        <div>
          <p className="font-bumper-sticker text-[18px] font-light text-[#653F56] tracking-[0.32px]">
            {" "}
            PROGRESS{" "}
          </p>
          <div className="rounded-lg bg-[#E3BEAA] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.20)] p-3 mb-3">
            <p className="font-made-tommy text-[18px] font-bold text-[#653F56] opacity-80 whitespace-pre-wrap break-words">
              Koko Snake Played{" "}
            </p>
            <ProgressBar
              currentXp={currentXp}
              maxXp={3}
              progressColor={{ from: "#653F56", to: "#653F56" }}
              bgColor={{ from: "#BE9F96", to: "#BE9F96" }}
            />
          </div>
        </div>
        <div>
          <p className="font-bumper-sticker text-[18px] font-light text-[#653F56] tracking-[0.32px]">
            {" "}
            REWARD{" "}
          </p>
          <div className="rounded-lg bg-[#E3BEAA] shadow-[inset_0_2px_0_0_rgba(0,0,0,0.20)] p-3">
            <div className="flex gap-2 items-start">
              <Image
                src={pet1}
                alt="Pet1"
                width={75}
                height={75}
                className="object-contain flex-1"
              />
              <div>
                <p className="font-made-tommy text-[18px] font-bold text-[#653F56] opacity-80 whitespace-wrap break-words">
                  {" "}
                  Lootbox{" "}
                </p>
                <span className="bg-[#C03F21] text-white text-xs font-bold px-2 py-0.5 rounded">
                  Tier 2
                </span>
                <div>
                  <StarIcon className="size-4 opacity-50 mb-1 translate-x-13" />
                  <StarIcon className="size-6 -mt-3 mb-1" />
                  <StarIcon className="size-3 opacity-40 translate-x-10 mb-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentXp < 3 && (
        <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#653f56] to-[#653f56] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] mt-2 p-2">
          <PlayIcon color="#e3beaa" className="w-5 h-5" />
          <span className="text-[#e3beaa] font-bumper-sticker font-normal text-[20px] tracking-wider shadow-[0px_1px_0px_rgba(0, 0, 0, 0.20)]">
            START
          </span>
        </Button>
      )}
      {currentXp == 3 && (
        <Button className="w-full flex gap-1 items-center justify-center bg-gradient-to-b from-[#653f56] to-[#653f56] drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blown-light),_black_25%)] mt-2 p-2">
          <GiftIcon className="w-5 h-5" />
          <span className="text-[#e3beaa] font-bumper-sticker font-normal text-[20px] tracking-wider shadow-[0px_1px_0px_rgba(0, 0, 0, 0.20)]">
            CLAIM REWARD
          </span>
        </Button>
      )}
    </>
  );
};

export default DailyRewardSection;
