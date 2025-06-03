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
    levelList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    requiredXpList: [0, 80, 165, 255, 350, 450, 555, 665, 780, 900],
  },
  {
    rank: "pearl",
    icon: rankPearl,
    levelList: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    requiredXpList: [
      1025, 1155, 1290, 1435, 1585, 1740, 1905, 2075, 2255, 2445, 2640, 2845,
      3060, 3285, 3520, 3285, 3520,
    ],
  },
  {
    rank: "silver",
    icon: rankSilver,
    levelList: [
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
      44, 45, 46, 47, 48, 49, 50,
    ],
    requiredXpList: [
      3765, 4025, 4295, 4580, 4875, 5185, 5510, 5850, 6205, 6575, 6965, 7370,
      7795, 8240, 8705, 9195, 9705, 10240, 10800, 11385, 12000, 12640, 13310,
      14015, 14750,
    ],
  },
  {
    rank: "gold",
    icon: rankGold,
    levelList: [
      51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
      69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
      87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    ],
    requiredXpList: [
      15520, 16325, 17170, 18055, 18980, 19950, 20965, 22025, 23135, 24300,
      25515, 26790, 28125, 29520, 30980, 32510, 34110, 35790, 37545, 39385,
      41310, 43325, 45435, 47645, 49960, 52380, 54915, 57570, 60350, 63260,
      66305, 69495, 72835, 76330, 79990, 83825, 87840, 92045, 96445, 101055,
      105880, 110930, 116220, 121760, 127560, 133635, 139995, 146655, 153630,
      160935,
    ],
  },
  {
    rank: "platinum",
    icon: rankPlatinum,
    levelList: [
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
      116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130,
      131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145,
      146, 147, 148, 149, 150,
    ],
    requiredXpList: [
      168580, 176590, 184975, 193755, 202950, 212580, 222665, 233225, 244280,
      255860, 267985, 280685, 293980, 307905, 322485, 337755, 353745, 370490,
      388025, 406390, 425620, 445760, 466850, 488940, 512070, 536295, 561665,
      588230, 616050, 645185, 675700, 707655, 741120, 776165, 812865, 851300,
      891555, 933710, 977855, 1024090, 1072510, 1123215, 1176320, 1231935,
      1290175, 1351170, 1415050, 1481950, 1552010, 1625380,
    ],
  },
  {
    rank: "diamond",
    icon: rankDiamond,
    levelList: [
      151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165,
      166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180,
      181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195,
      196, 197, 198, 199, 200,
    ],
    requiredXpList: [
      1702220, 1782690, 1866965, 1955225, 2047660, 2144465, 2245845, 2352020,
      2463210, 2579660, 2701615, 2829335, 2963095, 3103180, 3249885, 3403530,
      3564440, 3732955, 3909440, 4094270, 4287840, 4490560, 4702865, 4925210,
      5158070, 5401940, 5657345, 5924825, 6204955, 6498330, 6805575, 7127350,
      7464345, 7817275, 8186895, 8573990, 8979390, 9403965, 9848615, 10314295,
      10801995, 11312760, 11847675, 12407890, 12994595, 13609045, 14252555,
      14926495, 15632305, 16371495,
    ],
  },
  {
    rank: "black",
    icon: rankBlack,
    levelList: [
      201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215,
      216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230,
      231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245,
      246, 247, 248, 249, 250,
    ],
    requiredXpList: [
      17145645, 17956405, 18805505, 19694760, 20626070, 21601425, 22622905,
      23692690, 24813070, 25986435, 27215290, 28502260, 29850095, 31261670,
      32740005, 34288250, 35909720, 37607870, 39386330, 41248900, 43199555,
      45242465, 47381990, 49622695, 51969370, 54427030, 57000920, 59696535,
      62519635, 65476250, 68572690, 71815575, 75211825, 78768695, 82493780,
      86395040, 90480800, 94759790, 99241150, 103934450, 108849710, 113997435,
      119388610, 125034755, 130947925, 137140755, 143626465, 150418905,
      157532585, 164982700,
    ],
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
                  <div className="flex justify-around text-[#5F3F57] text-center font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] py-2">
                    <p className="flex-4">Rank</p>
                    <p className="flex-2">Level</p>
                    <p className="flex-4">XP Required</p>
                  </div>
                  <div className="bg-[#E3BEAA] w-full p-2 overflow-y-auto max-h-[50vh] rounded-b-[5px] border-t border-[#BE9F96]">
                    <div className="bg-[#EED1B8] w-full rounded-[4px]">
                      <table className="w-full text-[#5F3F57] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] [&_td]:p-2 [&_td]:py-1 [&_td]:border [&_td]:border-[#CFAC99] [&_td:nth-child(1)]:w-[40%] [&_td:nth-last-child(2)]:w-[20%] [&_td:nth-last-child(1)]:w-[40%] [&_td:nth-last-child(1)]:text-right">
                        {xpLevels.map((title) => (
                          <>
                            {title.levelList.map((level, index) => (
                              <tr key={title.rank + index}>
                                {index === 0 && (
                                  <td
                                    className="font-bumper-sticker font-normal align-top"
                                    rowSpan={title.levelList.length}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Image
                                        src={title.icon}
                                        alt={title.rank}
                                        className="w-[30px] h-[30px]"
                                      />
                                      {title.rank}
                                    </div>
                                  </td>
                                )}
                                <td key={index}>{level}</td>
                                <td key={index + "xp"}>
                                  {formatNumber(title.requiredXpList[index])}
                                </td>
                              </tr>
                            ))}
                          </>
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
