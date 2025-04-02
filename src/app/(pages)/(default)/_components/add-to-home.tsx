import { cn } from "@/app/_lib/utils";
import React from "react";

export default function AddToHome() {
  return (
    <div
      className={cn(
        "bg-white/40 text-golden-brown rounded-2xl p-2 pr-6 font-bumper-sticker",
        "grid gap-2 relative"
      )}
    >
      <div
        className={cn(
          "size-9 p-2 bg-golden-brown rounded-xl",
          "flex items-center justify-center text-2xl text-white/60"
        )}
      >
        +
      </div>
      <p>
        Add to
        <br />
        Home
        <br />
        Screen
      </p>
      <p className="absolute bg-red text-white text-xs -top-1 -right-1 rounded-md px-1">
        +10 XP
      </p>
    </div>
  );
}
