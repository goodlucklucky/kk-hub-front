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
import rankPlatinum from "@/app/_assets/svg/rank_sapphire.svg";
import rankDiamond from "@/app/_assets/svg/rank_diamond.svg";
import rankBlack from "@/app/_assets/svg/rank_black.svg";

//interface
interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const xpLevels = [
  {
    rank: "sapphire",
    icon: rankSapphire,
    levelList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    requiredXpList: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450],
  },
  {
    rank: "pearl",
    icon: rankPearl,
    levelList: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    requiredXpList: [
      500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150,
      1200,
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
      1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800,
      1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400,
      2450,
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
      2500, 2550, 2600, 2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000, 3050,
      3100, 3150, 3200, 3250, 3300, 3350, 3400, 3450, 3500, 3550, 3600, 3650,
      3700, 3750, 3800, 3850, 3900, 3950, 4000, 4050, 4100, 4150, 4200, 4250,
      4300, 4350, 4400, 4450, 4500, 4550, 4600, 4650, 4700, 4750, 4800, 4850,
      4900, 4950,
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
      5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450, 5500, 5550,
      5600, 5650, 5700, 5750, 5800, 5850, 5900, 5950, 6000, 6050, 6100, 6150,
      6200, 6250, 6300, 6350, 6400, 6450, 6500, 6550, 6600, 6650, 6700, 6750,
      6800, 6850, 6900, 6950, 7000, 7050, 7100, 7150, 7200, 7250, 7300, 7350,
      7400, 7450,
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
      7500, 7550, 7600, 7650, 7700, 7750, 7800, 7850, 7900, 7950, 8000, 8050,
      8100, 8150, 8200, 8250, 8300, 8350, 8400, 8450, 8500, 8550, 8600, 8650,
      8700, 8750, 8800, 8850, 8900, 8950, 9000, 9050, 9100, 9150, 9200, 9250,
      9300, 9350, 9400, 9450, 9500, 9550, 9600, 9650, 9700, 9750, 9800, 9850,
      9900, 9950,
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
      10000, 10050, 10100, 10150, 10200, 10250, 10300, 10350, 10400, 10450,
      10500, 10550, 10600, 10650, 10700, 10750, 10800, 10850, 10900, 10950,
      11000, 11050, 11100, 11150, 11200, 11250, 11300, 11350, 11400, 11450,
      11500, 11550, 11600, 11650, 11700, 11750, 11800, 11850, 11900, 11950,
      12000, 12050, 12100, 12150, 12200, 12250, 12300, 12350, 12400, 12450,
    ],
  },
];

const XpDialog = ({ isOpen, onClose }: ProfileDialogProps) => {
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
              <div className="flex items-center gap-2">
                <Button className="w-[35px] h-[35px] rounded-[7px] border border-[#A15A24] bg-gradient-to-b from-[#FFD093] to-[#FFC880] shadow-[0_2px_0_0_#6B340A] p-1">
                  <RightArrow
                    color="#6B340A"
                    className="w-[11px] h-[17px] rotate-180"
                  />
                </Button>
                <h1 className="text-[28px] font-normal text-[#491F36] uppercase tracking-[0.56px] font-bumper-sticker">
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
