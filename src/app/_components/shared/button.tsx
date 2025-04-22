import { cn } from "@/app/_lib/utils";
import React from "react";

type TButtonProps = React.ComponentProps<"button">;

export default function Button({ ...props }: TButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "text-white font-bold text-[12px]",
        "bg-gradient-to-b from-blue-light to-blue",
        "rounded-lg p-1",
        "drop-shadow-[0_0.3ch_color-mix(in_srgb,_var(--color-blue),_black_25%)]",
        props?.className
      )}
    />
  );
}
