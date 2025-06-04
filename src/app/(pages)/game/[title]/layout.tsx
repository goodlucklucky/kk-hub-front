"use client";

import React, { useMemo } from "react";
import Header from "@/app/(pages)/(default)/_components/layout/header";
import { cn } from "@/app/_lib/utils";
import { ChallengesProvider } from "./tournaments/challengesContext";
import { useParams } from "next/navigation";
import { games_contents } from "@/constants/games_contents";
import { ThirdWeb } from "@/app/_providers/thirdWebProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { title } = useParams();
  const game = useMemo(
    () => games_contents.find((g) => g?.key == title),
    [title]
  );

  return (
    <ThirdWeb>
      <div className={cn("min-h-dvh flex flex-col h-full max-h-dvh")}>
        <Header hideBack={game?.wallpaper?.hideHeaderImage} />
        <ChallengesProvider>
          <main className="grow flex flex-col">{children}</main>
        </ChallengesProvider>
      </div>
    </ThirdWeb>
  );
}
