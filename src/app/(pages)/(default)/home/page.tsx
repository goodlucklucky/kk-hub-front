import { TrophyIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";
import XpBar from "../_components/xp-bar";
import Gifts from "../_components/gifts";
import GamesCard from "../_components/games/card";
import AddToHome from "../_components/add-to-home";
import Chat from "../_components/chat";

export default function HomePage() {
  return (
    <>
      <XpBar />
      <Gifts />
      <div className={cn("rounded-2xl contain-content", "mx-2")}>
        <div className="grid grid-cols-2 text-center bg-golden-brown font-bumper-sticker">
          <div className="py-2">
            <span>GAMES</span>
          </div>
          <div className="py-2">
            <span>FAVOURITES</span>
          </div>
        </div>
        <div className="bg-white/40 pt-1 divide-y divide-golden-brown/30">
          <GamesCard
            Icon={TrophyIcon}
            title="Tournaments"
            items={[{ title: "Koko Snake" }, { title: "Koko Snake" }]}
          />
          <GamesCard
            Icon={TrophyIcon}
            title="Tournaments"
            items={[{ title: "One Million One" }]}
          />
        </div>
      </div>
      <div className="grid grid-cols-[1fr_auto] gap-2 mx-2 mt-2">
        <Chat />
        <AddToHome />
      </div>
    </>
  );
}
