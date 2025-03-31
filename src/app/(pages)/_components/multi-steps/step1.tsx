import { CashIcon, KeyIcon, StarIcon, UsdIcon } from "@assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React, { useEffect, useState } from "react";
import RandomUsd from "@/app/_components/etc/random-usd";
import { SnakeIcon } from "@/app/_assets/svg/snake";

export function Step1Top() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;
  return (
    <>
      <h2
        className={cn(
          "text-golden-bright drop-shadow-[0_0.2ch_var(--color-golden-darker)]",
          "mb-8 text-2xl text-center font-bumper-sticker"
        )}
      >
        <small>legendary games</small>
        <br />
        <span>with crypto rewards</span>
      </h2>
      <div className="text-golden-bright px-8 relative font-bold">
        <h3 className="text-center">Recent Wins</h3>
        <div className="bg-light w-full rounded-b-2xl rounded-t p-0.5 contain-content">
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
              ]?.map(({ key, Icon, name, prize }, index) => (
                <tr
                  key={index}
                  className={cn(
                    "text-golden-brown",
                    index % 2 != 0
                      ? "bg-amber-500/10"
                      : "bg-yellow-700/20",
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
        <RandomUsd />
      </div>
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
          "mx-4 shadow-sm font-bumper-sticker"
        )}
      >
        <div
          className={cn(
            "bg-background rounded-[0.875rem] p-2",
            "flex gap-2 justify-center"
          )}
        >
          <CashIcon />
          <p
            className={cn(
              "text-center",
              "drop-shadow-[0_0.2ch_var(--color-golden-darker)] text-golden-bright"
            )}
          >
            Ever made Memecoin money
            <br />
            playing Snake?!
          </p>
        </div>
      </div>
      <button
        className={cn(
          "text-white flex gap-2 items-center justify-center",
          "mx-8 mt-auto p-2 rounded-2xl font-bold",
          "bg-gradient-to-b from-blue-light to-blue"
        )}
      >
        <KeyIcon />
        <span className="drop-shadow-md">Enter Now</span>
      </button>
      <p className="text-green-light flex gap-1 justify-center items-center my-4 font-bumper-sticker">
        <StarIcon />
        <span>the Most Rewarding Mini-Gaming Platform</span>
      </p>
    </>
  );
}
