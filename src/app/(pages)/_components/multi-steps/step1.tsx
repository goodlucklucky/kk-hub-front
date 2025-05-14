import { CashIcon, KeyIcon, StarIcon, UsdIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import { useEffect, useState } from "react";
import { SnakeIcon } from "@/app/_assets/svg/snake";
import Button from "@/app/_components/shared/button";
import Link from "next/link";
import cup from "@assets/images/cup.png";
import Image from "next/image";

export function Step1Top() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "text-golden-bright mx-8 bg-[url(/images/board_3.png)] bg-cover bg-center h-24 pt-2 drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
          " -mb-5 z-40 text-2xl text-center font-bumper-sticker"
        )}
      >
        <small className="text-[16px]">legendary games</small>
        <br />
        <span className=" text-[18px]">with crypto rewards</span>
      </div>
      <div className="text-golden-bright relative font-bold px-5">
        <div className=" bg-[url(/images/board.png)] bg-cover rounded-4xl px-2.5 py-3.5">
          <div className="bg-light rounded-3xl border-3 border-[#5F3F57]">
            <div className="py-2 flex items-center justify-center gap-2">
              <Image src={cup} alt="cup"/>
              <h3 className=" font-made-tommy  text-[#5F3F57]">Recent Wins</h3>
            </div>
            <div className="bg-light w-full rounded-3xl rounded-t p-0.5 contain-content">
              <table className="w-full rounded-b-2xl rounded-t-sm contain-content">
                <tbody>
                  {[
                    {
                      Icon: SnakeIcon,
                      key: "snake",
                      name: "Koko Snake",
                      prize: { amount: 27.82, currency: "USD" },
                    },
                    {
                      Icon: SnakeIcon,
                      key: "snake",
                      name: "Koko Snake",
                      prize: { amount: 1011.4, currency: "USD" },
                    },
                    {
                      Icon: SnakeIcon,
                      key: "snake",
                      name: "Koko Snake",
                      prize: { amount: 50.49, currency: "USD" },
                    },
                    {
                      Icon: SnakeIcon,
                      key: "snake",
                      name: "Koko Snake",
                      prize: { amount: 122.5, currency: "USD" },
                    },
                    {
                      Icon: SnakeIcon,
                      key: "snake",
                      name: "Koko Snake",
                      prize: { amount: 498.05, currency: "USD" },
                    },
                  ]?.map(({ Icon, name, prize }, index) => (
                    <tr
                      key={index}
                      className={cn(
                        "text-golden-brown",
                        index % 2 != 0 ? "bg-[#EED1B8]" : "bg-[#E3BEAA]",
                        "[&_td]:p-0.5 [&_td]:px-2"
                      )}
                    >
                      <td>{Icon && <Icon />}</td>
                      <td className="w-full">{name}</td>
                      <td className="whitespace-nowrap bg-amber-500/15 text-golden-dark flex gap-2 items-center">
                        <UsdIcon className="text-green-800" /> {prize?.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Step1Bottom() {
  return (
    <div className="flex flex-col w-full justify-between">
      <div className="px-3">
        <div
          className={cn(
            "bg-gradient-to-b from-golden-bright to-golden-brown",
            "p-0.5 rounded-2xl contain-content grid",
            "-mx-1 mb-4 shadow-sm font-bumper-sticker"
          )}
        >
          <div
            className={cn(
              "bg-[url(/images/board_2.png)] bg-cover bg-center rounded-2xl p-2 w-full",
              "flex gap-2 justify-center"
            )}
          >
            <CashIcon className="z-20" />
            <p
              className={cn(
                "text-center font-bumper-sticker font-[400] text-[18px] leading-[20px]",
                "text-[#FFD093] drop-shadow-[0_2px_0_#6B340A]"
              )}
            >
              Ever made Memecoin money
              <br />
              playing Snake?!
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Link
          href={"/home"}
          className="bg-gradient-to-b from-golden-bright to-golden-brown mx-4 p-0.5 rounded-4xl"
        >
          <div className=" bg-[url(/images/board_2.png)] bg-cover bg-center rounded-4xl p-3">
            <div>
              <Button
                className={cn(
                  "flex gap-2 items-center justify-center rounded-full font-bold w-full"
                )}
              >
                <KeyIcon />
                <span className="drop-shadow-md text-[20px]">Enter Now</span>
              </Button>
            </div>
          </div>
        </Link>
        <p className="text-green-light flex gap-1 justify-center items-center my-4 font-bumper-sticker">
          <StarIcon />
          <span>the Most Rewarding Mini-Gaming Platform</span>
        </p>
      </div>
    </div>
  );
}
