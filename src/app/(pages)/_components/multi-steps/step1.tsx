import { CashIcon, KeyIcon, StarIcon, TrophyIcon, UsdIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import { useEffect, useState } from "react";
import RandomUsd from "@/app/_components/etc/random-usd";
import { SnakeIcon } from "@/app/_assets/svg/snake";
import Button from "@/app/_components/shared/button";
import Link from "next/link";
import Image from "next/image";
import PanelHolder from "@assets/images/panel-holder.png"
import PanelHome from "@assets/images/panel-home.png"

export function Step1Top() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;
  return (
    <>
      <section className="relative z-20">
        <Image src={PanelHolder} alt="panel-holder" width={338} height={103} className="absolute -top-[10px] left-1/2 -translate-x-1/2 bg-contain bg-no-repeat bg-center" priority/>
        <h2
          className={cn(
            "text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
            "mb-8 text-2xl text-center font-bumper-sticker"
          )}
      >
        <small className="tracking-wider">legendary games</small>
        <br />
        <span className="tracking-wider">with crypto rewards</span>
      </h2>
      </section>
      <section className="relative">
      <Image src={PanelHome} alt="panel-home" width={1062} height={362} className="absolute -top-[30px] left-1/2 -translate-x-1/2 bg-contain bg-no-repeat bg-center" priority/>
        {/* { Bottom blur effect} */}
        <div className="absolute -bottom-0 rounded-b-2xl left-1/2 -translate-x-1/2 w-[90%] h-[20%] bg-[linear-gradient(180deg,rgba(225,199,175,0)_0%,#E1C7AF_100%)] pointer-events-none z-20" />

        <div className="text-golden-bright px-4.5 relative font-bold">
          <div className="flex items-center justify-center gap-2 -mt-1">
            <TrophyIcon className="text-grape"/>
            <h3 className="text-center text-grape text-xl">Recent Wins</h3>
          </div>
          <div className="bg-light w-full rounded-b-2xl rounded-t p-0.5 contain-content overflow-y-auto h-[160px] mt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                  {
                    Icon: SnakeIcon,
                    key: "snake",
                    name: "Koko Snake",
                    prize: { amount: 498.05, currency: "USD" },
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
                      index % 2 != 0 ? "bg-blown-light" : "bg-blown-dark",
                      "[&_td]:py-1 [&_td]:px-2"
                    )}
                  >
                    <td>{Icon && <Icon />}</td>
                    <td className="w-full text-left">{name}</td>
                    <td className="whitespace-nowrap bg-amber-500/15 text-golden-dark flex gap-2 items-center">
                      <UsdIcon className="text-green-800" /> {prize?.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <RandomUsd />
        </div>
      </section>
    </>
  );
}

export function Step1Bottom() {
  return (
    <>
      <div
        className={cn(
          "bg-gradient-to-b from-golden-bright to-golden-brown",
          "p-0.5 rounded-2xl contain-content grid",
          "-mx-1 shadow-sm font-bumper-sticker"
        )}
      >
        <div
          className={cn(
            "bg-background rounded-[0.875rem] p-1",
            "flex gap-2 justify-center",
            "relative overflow-hidden"
          )}
        >
          {/* {Masking wood texture} */}
          <div className="absolute inset-0">
            <Image
              src="/images/wood-texture.png"
              alt="Wood texture"
              fill
              className="object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,1))'
              }}
            />
          </div>
          
          <CashIcon className="z-20"/>
          <p
            className={cn(
              "text-center font-bumper-sticker",
              "drop-shadow-[0_0.2ch_var(--color-golden-darker)] text-golden-bright"
            )}
          >
            Ever made Memecoin money
            <br />
            playing Snake?!
          </p>
        </div>
      </div>
      <Link href={"/home"} className="mx-8 mt-auto">
        <Button
          className={cn(
            "flex gap-2 items-center justify-center rounded-2xl font-bold w-full"
          )}
        >
          <KeyIcon />
          <span className="drop-shadow-md">Enter Now</span>
        </Button>
      </Link>
      <p className="text-green-light flex gap-1 justify-center items-center my-4 font-bumper-sticker">
        <StarIcon />
        <span>the Most Rewarding Mini-Gaming Platform</span>
      </p>
    </>
  );
}
