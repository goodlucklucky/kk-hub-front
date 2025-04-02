import { TrophyIcon } from "@/app/_assets/svg/etc";
import { cn } from "@/app/_lib/utils";
import React from "react";

export type TItems = {
  title?: string;
  soon?: string;
};

export type TGamesCardProps = {
  title: string;
  Icon: (props: React.ComponentProps<"svg">) => React.JSX.Element;
  items?: TItems[];
};

export default function GamesCard({
  title = "Tournaments",
  Icon = TrophyIcon,
  items = [],
}: TGamesCardProps) {
  return (
    <div className="p-2 space-y-2">
      <div className="flex justify-between">
        <p className="flex items-center gap-2 px-1 text-golden-brown font-bold">
          <Icon />
          <span>{title}</span>
        </p>
        <button
          className={cn(
            "bg-golden-brown rounded-2xl font-bumper-sticker px-3",
            "flex items-center gap-2"
          )}
        >
          <span>VIEW ALL</span>
          <span>&gt;</span>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 py-1">
        {(
          [
            ...items,
            ...Array.from({ length: 4 }).fill({ soon: true }),
          ] as TItems[]
        )
          ?.slice(0, 4)
          .map((one, index) =>
            one?.soon ? (
              <CommingSoonCard key={index} />
            ) : (
              <GameItemCard title={one?.title || ""} key={index} />
            )
          )}
      </div>
    </div>
  );
}

export type TGameItemCardProps = {
  title: string;
};

export function GameItemCard({ title }: TGameItemCardProps) {
  return (
    <div className="rounded-lg contain-content">
      <div className="aspect-square bg-white/20"></div>
      <p
        className={cn(
          "bg-golden-brown/30 p-1 px-1.5",
          "text-center text-xs font-bold line-clamp-1"
        )}
      >
        {title}
      </p>
    </div>
  );
}

export function CommingSoonCard() {
  return (
    <div
      className={cn(
        "rounded-lg flex items-center justify-center bg-golden-brown/25",
        "text-center text-sm font-bumper-sticker text-golden-bright"
      )}
    >
      <p>
        COMMING
        <br />
        SOON
      </p>
    </div>
  );
}
