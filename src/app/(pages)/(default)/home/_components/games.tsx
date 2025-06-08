import { CustomRightArrow } from "@/app/_assets/svg/right-arrow";
import { cn } from "@/app/_lib/utils";
import Image from "next/image";

const BackBar = () => {
  return (
    <div className="flex bg-[rgba(0,0,0,0.20)] backdrop-blur-[12.5px] -mt-1 w-full items-center gap-x-2">
      <div
        className={cn(
          "border border-1 border-[#CED0DF] bg-[#B1B5CC] backdrop-blur-[12.5px]",
        "aspect-square p-2 h-[32px] z-1",
        "flex items-center justify-center",
        "cursor-pointer"
      )}
    >
        <CustomRightArrow className="w-[14px] h-[21px] rotate-180" />
      </div>
      <p className="flex-1 text-[#FFF] text-shadow-[0px_2px_0px_rgba(0,0,0,0.20)] text-tommy-soft text-[18px] font-bold leading-normal">All Games</p>
    </div>
  );
}

const GameCard = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <div className="flex items-cetner rounded-[8px] border border-[#B1B5CC] bg-[rgba(177,181,204,0.66)] shadow-[0px_2px_0px_0px_rgba(0,0,0,0.20)]">
      <div className="w-[58px] h-[58px] rounded-l-[7px] bg-[rgba(255,255,255,0.15)]">
        <Image src={image} alt={title} width={50} height={50} className="m-auto" />
      </div>
    </div>
  )
}

export default function GamesView({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <div className="flex flex-col">
      <BackBar />
      <div className="w-full p-2">
        <div className="grid grid-cols-2 gap-2 p-2 rounded-[12px] border border-[#B1B5CC] bg-[rgba(0,0,0,0.33)] backdrop-blur-[12.5px] shadow-[inset_0px_3px_0px_0px_rgba(0,0,0,0.20)]">
          <GameCard title={title} image={image} />
          <GameCard title={title} image={image} />
          <GameCard title={title} image={image} />
          <GameCard title={title} image={image} />
          <GameCard title={title} image={image} />
        </div>
      </div>
    </div>
  );
}
