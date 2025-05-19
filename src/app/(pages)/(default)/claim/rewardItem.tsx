import Image from "next/image";
import CollectedIcon from "@assets/images/collected.png";
import RewardStarBg from "@assets/images/reward-star.png";
import RewardBoard from "@assets/images/reward-board.png";
import RewardBoardCollected from "@assets/images/reward-board-collected.png";
import RewardBoardMega from "@assets/images/reward-board-mega.png";
import { cn } from "@/app/_lib/utils";

export default function RewardItem({
  img,
  collected,
  day,
  isActive,
  name,
  isMegaReward,
  onClickCollect,
}: {
  img: any;
  collected?: boolean;
  day: string;
  name?: string;
  isActive?: boolean;
  isMegaReward?: boolean;
  onClickCollect?: () => void;
}) {
  return (
    <div
      className={`${isMegaReward ? "col-span-3" : isActive ? "p-0" : "p-1"}`}
    >
      <div
        className={`relative flex flex-col justify-between ${
          isActive ? "p-2" : "p-1"
        } pb-2 ${isMegaReward ? "mt-1" : isActive ? "pt-9 mt-6" : "pt-8 mt-6"}`}
        style={{
          backgroundImage: `url(${
            isMegaReward
              ? RewardBoardMega.src
              : isActive
                ? RewardBoard.src
                : collected
                  ? RewardBoardCollected.src
                  : RewardBoard.src
          })`,
          backgroundSize: "100% 100%",
        }}
      >
        {isMegaReward && (
          <Image
            src={RewardStarBg}
            alt="mega reward bg"
            width={1065}
            height={446}
            className="w-full absolute top-1/2 -translate-y-1/2 left-0 z-[100]"
          />
        )}

        <Image
          src={img}
          alt="rewards"
          className={cn(
            `absolute z-[10] object-contain`,
            isMegaReward
              ? "w-[150px] h-[150px] top-[35px] -translate-y-1/2 -left-[30px] rotate-[-16.56deg]"
              : "left-1/2 -translate-x-1/2 -translate-y-1/2 top-2 w-[80px] h-[80px]"
          )}
        />
        {!collected && (
          <div
            className={`w-full text-white text-center text-[14px] leading-[15px] flex justify-center items-center ${
              isMegaReward ? "" : "absolute top-0 left-0"
            } h-[25px] rounded-t-md`}
          >
            {isMegaReward ? "Mega Reward" : ""}
          </div>
        )}
        <div className="py-[2px]">
          <p
            className={`text-[14px] px-1 leading-[12px] text-center ${
              collected ? "text-[#7d5a61]" : "text-[#653F56]"
            } font-[800] font-made-tommy my-1 min-h-[24px] flex flex-col justify-center ${
              isMegaReward &&
              "!text-[12px] !leading-[14px] !text-left !justify-start pl-[90px]"
            }`}
          >
            {isMegaReward
              ? "Keep the streak to win something special..."
              : name}
          </p>
          {isActive ? (
            <div
              className="text-[14px] leading-[12px] text-center text-white py-2 rounded bg-[#D85331] font-[800] font-made-tommy shadow-[#7c1817] shadow cursor-pointer relative z-[1000]"
              onClick={onClickCollect}
            >
              Collect!
            </div>
          ) : (
            <div className="text-[14px] leading-[12px] text-center text-[#D8CBCC] py-2 rounded bg-[#a17a76] font-[800] font-made-tommy flex justify-center relative z-[10]">
              {collected ? (
                // <CheckIcon color="#E0BEA4" className="w-4 h-4 pb-0.5" />
                <Image
                  src={CollectedIcon}
                  alt="collected"
                  className="w-[16px] h-[1\2px]"
                />
              ) : (
                day
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
