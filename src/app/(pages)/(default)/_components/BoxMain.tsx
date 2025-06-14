import { cn } from "@/app/_lib/utils";
import React from "react";

export default function BoxMain({
  children,
  className,
  boxClassName,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  boxClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "bg-[url(/images/board_2.png)] -mb-4 bg-contain rounded-2xl p-1",
        boxClassName
      )}
    >
      <div
        className={cn("p-4 rounded-xl bg-[#F5D6B1]", className)}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}
