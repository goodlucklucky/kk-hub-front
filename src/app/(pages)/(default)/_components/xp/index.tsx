"use client";

import React from "react";
import { XpBar, BackHomeBar } from "./bar";
import { useGeneral } from "@/app/_providers/generalProvider";
import { useApp } from "@/app/_contexts/appContext";
import XpDialog from "../dialogs/xp-dialog";
import { usePathname } from "next/navigation";

export default function UserXp() {
  const { userXp } = useGeneral();
  const { isXpOpen, setIsXpOpen } = useApp();
  const [hasFooter, setHasFooter] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const footer = document.querySelector('footer');
    setHasFooter(!!footer);
  }, [pathname]);

  return (
    <>
      {hasFooter ? (
        <XpBar currentXp={userXp?.xp ?? 0} maxXp={userXp?.level?.maxXp ?? 0} onClick={() => setIsXpOpen(true)} />
      ) : (
        <BackHomeBar />
      )}
      <XpDialog isOpen={isXpOpen} onClose={() => setIsXpOpen(!isXpOpen)} />
    </>
  );
}
