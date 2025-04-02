import Button from "@/app/_components/shared/button";
import { cn } from "@/app/_lib/utils";
import React from "react";

export default function Chat() {
  return (
    <div className={cn("relative rounded-2xl border-2 border-golden p-1", "flex justify-center")}>
      <div
        className={cn(
          "grid gap-4 p-3 py-5 bg-blown-light",
          "max-h-32 h-full overflow-auto",
          "rounded-xl border-2 border-golden"
        )}
      >
        <Card />
        <Card />
      </div>
      <Button className="px-2 absolute -bottom-2">Open Chat</Button>
    </div>
  );
}

function Card() {
  return (
    <div
      className={cn(
        "rounded-lg bg-golden-brown/10 text-golden",
        "border-2 border-golden font-"
      )}
    >
      <p
        className={cn(
          "rounded-md -mt-3 -ml-1 w-fit pl-3 pr-1 bg-yellow-2 ",
          "border-2 border-golden font-bumper-sticker"
        )}
      >
        lecoconut
      </p>
      <p className="p-2 pt-1 font-medium">
        writes something smart that takes two lines
      </p>
    </div>
  );
}
