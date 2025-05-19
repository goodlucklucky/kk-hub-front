"use client";

import React from "react";
import { XpBar } from "./bar";
import { useGeneral } from "@/app/_providers/generalProvider";

export default function UserXp() {
  const { userXp } = useGeneral();

  return (
    <XpBar currentXp={userXp?.xp ?? 0} maxXp={userXp?.level?.maxXp ?? 0} />
  );
}
