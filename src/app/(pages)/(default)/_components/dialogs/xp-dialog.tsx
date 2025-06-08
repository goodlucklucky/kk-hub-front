"use client";

//import modules
import Image from "next/image";

//import components
import { Dialog, DialogPortal } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";

//import assets
import { CloseIcon } from "@/app/_assets/svg/close";
import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { formatNumber } from "@/app/_utils/number";
import rankSapphire from "@/app/_assets/svg/rank_sapphire.svg";
import rankPearl from "@/app/_assets/svg/rank_pearl.svg";
import rankSilver from "@/app/_assets/svg/rank_silver.svg";
import rankGold from "@/app/_assets/svg/rank_gold.svg";
import rankPlatinum from "@/app/_assets/images/rank_platinum.png";
import rankDiamond from "@/app/_assets/svg/rank_diamond.svg";
import rankBlack from "@/app/_assets/svg/rank_black.svg";

//interface
interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  wasProfileOpen: boolean;
  setWasProfileOpen: (isOpen: boolean) => void;
  setIsProfileOpen: (isOpen: boolean) => void;
}

const xpLevels = [
  {
    rank: "sapphire",
    icon: rankSapphire,
    level: "1-10",
  },
  {
    rank: "pearl",
    icon: rankPearl,
    level: "11-25",
  },
  {
    rank: "silver",
    icon: rankSilver,
    level: "26-50",
  },
  {
    rank: "gold",
    icon: rankGold,
    level: "51-100",
  },
  {
    rank: "platinum",
    icon: rankPlatinum,
    level: "101-150",
  },
  {
    rank: "diamond",
    icon: rankDiamond,
    level: "151-200",
  },
  {
    rank: "black",
    icon: rankBlack,
    level: "201-250",
  },
];

const XpDialog = ({ isOpen, onClose, wasProfileOpen, setWasProfileOpen, setIsProfileOpen }: ProfileDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <div className="absolute top-0 left-0 w-full h-full bg-black/75 backdrop-blur-[2.5px] z-10" />

        <div className="fixed h-full left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="bg-[url(/images/board_2.png)] flex flex-col gap-1 bg-cover bg-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-h-[95%] z-50 border-2 border-[#FAC485] rounded-3xl mx-auto p-2">
            <div className="flex justify-center items-center w-full absolute -bottom-5 right-0">
              <CloseIcon onClick={onClose} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                {wasProfileOpen && (
                  <Button
                    className="w-[35px] h-[35px] rounded-[7px] border border-[#A15A24] bg-gradient-to-b from-[#FFD093] to-[#FFC880] shadow-[0_2px_0_0_#6B340A] p-1"
                    onClick={() => {
                      setWasProfileOpen(false);
                      setIsProfileOpen(true);
                      onClose();
                    }}
                  >
                    <RightArrow
                      color="#6B340A"
                      className="w-[11px] h-[17px] rotate-180"
                    />
                  </Button>
                )}
                <h1 className="pl-2 text-[28px] font-normal text-[#491F36] uppercase tracking-[0.56px] font-bumper-sticker">
                  KOKOMO LEVELS
                </h1>
              </div>
              <div className="w-full p-2 rounded-[15px] border border-[#A96415] bg-gradient-to-b from-[#FDE9C7] to-[#F5D6B1] shadow-[0_2px_0_0_rgba(0,0,0,0.20)]">
                <p className="text-[#5F3F57] font-made-tommy text-[12px] font-bold leading-normal tracking-[0.12px] px-3 py-2">
                  Play games, complete tasks and collect inventory items to gain
                  Kokomo XP. Earn rewards every time you complete a Level!
                </p>
                <div className="rounded-[7px] border-2 border-[#CDAA98] bg-[#CFAC99]">
                  <div className="flex justify-around text-[#5F3F57] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] py-2">
                    <p>Rank</p>
                    <p>Level</p>
                  </div>
                  <div className="bg-[#E3BEAA] w-full p-2 overflow-y-auto max-h-[50vh] rounded-b-[5px] border-t border-[#BE9F96]">
                    <div className="bg-[#EED1B8] w-full rounded-[4px]">
                      <table className="w-full text-[#5F3F57] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] [&_td]:p-2 [&_td]:py-1 [&_td]:border [&_td]:border-[#CFAC99]">
                        {xpLevels.map((title) => (
                          <tr key={title.rank}>
                            <td className="font-bumper-sticker font-normal">
                              <div className="flex items-center gap-2">
                                <Image
                                  src={title.icon}
                                  alt={title.rank}
                                  className="w-[30px] h-[30px]"
                                />
                                {title.rank}
                              </div>
                            </td>
                            <td>{title.level}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default XpDialog;
