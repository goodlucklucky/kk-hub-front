import Image from "next/image";
import { cn } from "@/app/_lib/utils";
import banner from "@assets/images/header-board.png";

interface DialogHeaderProps {
  showWinner: boolean;
  isClaiming: boolean;
}

export const DialogHeader = ({ showWinner, isClaiming }: DialogHeaderProps) => {
  return (
    <div className="w-full h-16 flex justify-center items-center absolute -top-10">
      <Image
        src={banner}
        alt="banner"
        className={cn(
          "w-36 h-16 scale-x-[1.5] absolute z-10 pointer-events-none mx-auto"
        )}
      />
      <span className="text-[#491F36] text-center [-webkit-text-stroke:1px_rgba(217,127,79,0.40)] font-bumper-sticker text-[25px] font-normal leading-normal tracking-[0.56px] lowercase z-20">
        {!showWinner ? "Daily koko" : isClaiming ? "Prize!" : "Daily Draw"}
      </span>
    </div>
  );
};
