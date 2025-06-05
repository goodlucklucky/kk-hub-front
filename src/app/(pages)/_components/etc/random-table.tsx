"use client";

import { UsdIcon } from "@/app/_assets/svg/etc";
import { SnakeIcon } from "@/app/_assets/svg/snake";
import { cn } from "@/app/_lib/utils";
import React, { useEffect, useState } from "react";

type PrizeRow = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  key: string;
  name: string;
  prize: {
    amount: number;
    currency: string;
  };
};

const gameNameList = ["Koko Snake", "Flappy Dunk", "Koko Spinner", "Daily Raffle"]

export default function RandomTable() {
  // Function to generate a random prize row
  const generateRandomRow = (): PrizeRow => {
    const amount = parseFloat((Math.random() * 100 + 10).toFixed(2));
    const randomGameName = gameNameList[Math.floor(Math.random() * gameNameList.length)];
    return {
      Icon: SnakeIcon,
      key: "snake",
      name: randomGameName,
      prize: { amount, currency: "USD" },
    };
  };

  const [rows, setRows] = useState<PrizeRow[]>([
    generateRandomRow(),
    generateRandomRow(),
    generateRandomRow(),
    generateRandomRow(),
  ]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const addRowAtRandomInterval = () => {
      setRows((prev) => [generateRandomRow(), ...prev.slice(0, 3)]);
      const delay = (Math.random() * 2 + 1) * 1000;
      timeout = setTimeout(addRowAtRandomInterval, delay);
    };

    addRowAtRandomInterval();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <table className="w-full rounded-b-2xl rounded-t-sm contain-content">
      <tbody>
        {rows.map(({ Icon, name, prize }, index) => (
          <tr
            key={index}
            className={cn(
              "text-golden-brown",
              index % 2 !== 0 ? "bg-[#EED1B8]" : "bg-[#E3BEAA]",
              "[&_td]:p-0.5 [&_td]:px-2"
            )}
          >
            <td>{Icon && <Icon />}</td>
            <td className="w-full">{name}</td>
            <td className="whitespace-nowrap bg-amber-500/15 text-golden-dark flex gap-2 items-center min-w-[100px]">
              <UsdIcon className="text-green-800" /> {prize.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
