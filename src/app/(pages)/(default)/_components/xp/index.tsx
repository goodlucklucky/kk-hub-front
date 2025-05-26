"use client";

import React from "react";
import { XpBar } from "./bar";
import { useGeneral } from "@/app/_providers/generalProvider";
import { useApp } from "@/app/_contexts/appContext";
import XpDialog from "../dialogs/xp-dialog";

export default function UserXp() {
  const { userXp } = useGeneral();
  const { isXpOpen, setIsXpOpen } = useApp();

  return (
    <>
      <XpBar currentXp={userXp?.xp ?? 0} maxXp={userXp?.level?.maxXp ?? 0} onClick={() => setIsXpOpen(true)} />
      <XpDialog isOpen={isXpOpen} onClose={() => setIsXpOpen(!isXpOpen)} />
    </>
  );
}
